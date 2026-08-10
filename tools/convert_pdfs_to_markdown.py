#!/usr/bin/env python3
"""Create a page-addressable Markdown mirror of the corpus PDFs.

Embedded PDF text is preferred. In ``auto`` OCR mode, pages without enough
usable embedded text are rendered with Poppler and passed through Tesseract.
Every output records its source path, source hash, extraction method, and page
coverage so downstream agents can judge the text appropriately.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VAULT = ROOT / "vault"
PDF_ROOT = VAULT / "Attachments" / "PDFs"
OUTPUT = VAULT / "Papers"
DATA = ROOT / "_data"
TEMP = ROOT / "tmp" / "pdfs"
DEFAULT_TESSDATA = ROOT / "tools" / "tessdata"
MANIFEST = DATA / "text-extraction-manifest.json"
MIN_LETTERS = 80
MIN_WORDS = 16
OCR_START = "<!-- ocr:start -->"
OCR_END = "<!-- ocr:end -->"
MANAGED_PROPERTIES = {
    "title",
    "source_pdf",
    "pdf",
    "source_url",
    "source_sha256",
    "pages",
    "extraction_status",
    "embedded_pages",
    "ocr_pages",
    "unrecognized_pages",
    "ocr_mode",
    "ocr_language",
    "ocr_dpi",
    "generated",
}


def command(args: list[str], timeout: int = 600) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        args,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        timeout=timeout,
    )


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        while chunk := handle.read(1024 * 1024):
            digest.update(chunk)
    return digest.hexdigest()


def verify_catalog_hash(metadata: dict, source_hash: str) -> None:
    catalog_hash = metadata.get("sha256")
    if catalog_hash and catalog_hash != source_hash:
        raise ValueError(
            f"catalog SHA-256 does not match attachment: {catalog_hash} != {source_hash}"
        )


def clean_text(text: str) -> str:
    text = text.replace("\x00", "").replace("\r\n", "\n").replace("\r", "\n")
    text = "\n".join(line.rstrip() for line in text.splitlines())
    return re.sub(r"\n{4,}", "\n\n\n", text).strip()


def usable(text: str) -> bool:
    letters = sum(character.isalpha() for character in text)
    words = len(re.findall(r"[^\W\d_]{2,}", text, flags=re.UNICODE))
    return letters >= MIN_LETTERS and words >= MIN_WORDS


def pdf_pages(path: Path) -> int:
    result = command(["pdfinfo", str(path)], timeout=120)
    if result.returncode:
        raise RuntimeError(result.stderr.strip() or "pdfinfo failed")
    match = re.search(r"^Pages:\s+(\d+)\s*$", result.stdout, re.MULTILINE)
    if not match:
        raise RuntimeError("pdfinfo did not report a page count")
    return int(match.group(1))


def embedded_pages(path: Path, page_count: int) -> tuple[list[str], str]:
    result = command(["pdftotext", "-layout", "-enc", "UTF-8", str(path), "-"], timeout=900)
    if result.returncode:
        raise RuntimeError(result.stderr.strip() or "pdftotext failed")
    pages = result.stdout.split("\f")
    if pages and not pages[-1].strip():
        pages.pop()
    pages = [clean_text(page) for page in pages]
    if len(pages) < page_count:
        pages.extend([""] * (page_count - len(pages)))
    elif len(pages) > page_count:
        pages = pages[: page_count - 1] + [clean_text("\n".join(pages[page_count - 1 :]))]
    return pages, result.stderr.strip()


def ocr_page(
    source: Path,
    page_number: int,
    work: Path,
    tessdata: Path,
    language: str,
    dpi: int,
) -> tuple[str, str]:
    prefix = work / f"page-{page_number:05d}"
    render = command(
        [
            "pdftoppm", "-f", str(page_number), "-l", str(page_number),
            "-r", str(dpi), "-gray", "-png", "-singlefile", str(source), str(prefix),
        ],
        timeout=600,
    )
    if render.returncode:
        raise RuntimeError(render.stderr.strip() or "pdftoppm failed")
    image = prefix.with_suffix(".png")
    if not image.exists():
        raise RuntimeError("pdftoppm did not produce a page image")
    try:
        result = command(
            [
                "tesseract", str(image), "stdout", "--tessdata-dir", str(tessdata),
                "-l", language, "--psm", "3", "-c", "preserve_interword_spaces=1",
            ],
            timeout=900,
        )
    finally:
        image.unlink(missing_ok=True)
    if result.returncode:
        raise RuntimeError(result.stderr.strip() or "tesseract failed")
    return clean_text(result.stdout), result.stderr.strip()


def source_metadata() -> dict[str, dict]:
    rows_by_path: dict[str, dict] = {}
    for manifest in sorted(DATA.glob("*-manifest.json")):
        if manifest.name == MANIFEST.name:
            continue
        for row in json.loads(manifest.read_text(encoding="utf-8")):
            local_path = row.get("local_path", "")
            if row.get("status") == "downloaded" and local_path.lower().endswith(".pdf"):
                path = Path(local_path)
                parts = path.parts
                if parts[:3] == ("vault", "Attachments", "PDFs"):
                    key = Path(*parts[3:]).as_posix()
                elif parts and parts[0] == "sources":
                    # Accept legacy manifests while the vault migration is in flight.
                    key = Path(*parts[1:]).as_posix()
                else:
                    continue
                rows_by_path[key] = row
    return rows_by_path


def output_path(source: Path) -> Path:
    return OUTPUT / f"{source.stem}.md"


def normalize_prior_record(row: dict) -> dict:
    """Normalize pre-vault extraction rows before retention comparisons."""

    normalized = dict(row)
    source = Path(str(normalized.get("source_path", "")))
    if source.parts and source.parts[0] == "sources":
        source = Path("vault", "Attachments", "PDFs", *source.parts[1:])
        normalized["source_path"] = source.as_posix()
        normalized["output_path"] = f"vault/Papers/{source.stem}.md"
        normalized["source_link"] = Path(
            os.path.relpath(source, Path(normalized["output_path"]).parent)
        ).as_posix()
    return normalized


def yaml_string(value: object) -> str:
    return json.dumps(str(value or ""), ensure_ascii=False)


def frontmatter_blocks(markdown: str) -> list[tuple[str | None, list[str]]]:
    """Return top-level YAML property blocks from an existing note.

    This deliberately avoids parsing YAML values: preserving their original text
    keeps Obsidian links, lists, comments, and formatting intact without adding a
    non-stdlib YAML dependency.
    """
    lines = markdown.splitlines()
    if not lines or lines[0].strip() != "---":
        return []
    try:
        end = next(index for index, line in enumerate(lines[1:], 1) if line.strip() == "---")
    except StopIteration:
        return []

    blocks: list[tuple[str | None, list[str]]] = []
    key_pattern = re.compile(r"^([A-Za-z_][A-Za-z0-9_-]*):(?:\s|$)")
    for line in lines[1:end]:
        match = key_pattern.match(line)
        if match:
            blocks.append((match.group(1), [line]))
        elif blocks:
            blocks[-1][1].append(line)
        else:
            blocks.append((None, [line]))
    return blocks


def body_without_frontmatter(markdown: str) -> str:
    lines = markdown.splitlines(keepends=True)
    if not lines or lines[0].strip() != "---":
        return markdown
    for index, line in enumerate(lines[1:], 1):
        if line.strip() == "---":
            return "".join(lines[index + 1 :]).lstrip("\n")
    return markdown


def replace_generated_region(existing_body: str, title: str, generated: str) -> str:
    """Replace generated OCR while retaining every user-authored body section."""

    start_count = existing_body.count(OCR_START)
    end_count = existing_body.count(OCR_END)
    if start_count != end_count or start_count > 1:
        raise ValueError("existing note has an invalid OCR marker pair")
    if start_count == 1:
        start = existing_body.index(OCR_START)
        end = existing_body.index(OCR_END)
        if start >= end:
            raise ValueError("existing note has an invalid OCR marker pair")
        before = existing_body[:start]
        after = existing_body[end + len(OCR_END) :]
        return (
            before.rstrip()
            + "\n\n"
            + OCR_START
            + "\n"
            + generated
            + "\n"
            + OCR_END
            + after
        ).strip()

    if existing_body.strip():
        raise ValueError(
            "existing note has no OCR markers; refusing to infer which body text is generated"
        )
    before = f"# {title}\n\n## Notes"
    return f"{before}\n\n{OCR_START}\n{generated}\n{OCR_END}".strip()


def render_generated_region(record: dict, pages: list[str], methods: list[str]) -> str:
    lines = [
        "## Provenance",
        "",
        f"- Source PDF: [{Path(record['source_path']).name}](<{record['source_link']}>)",
        f"- Original URL: {record['source_url'] or 'Not recorded'}",
        f"- Source SHA-256: `{record['source_sha256']}`",
        f"- Extraction: {record['embedded_pages']} embedded-text pages; {record['ocr_pages']} OCR pages; {record['empty_pages']} pages with no detected text",
        "- Caution: This is machine-extracted text. Consult the PDF for layout, images, tables, spelling, and exact quotation.",
        "",
        "## Extracted text",
        "",
    ]
    for page_number, (text, method) in enumerate(zip(pages, methods), 1):
        lines += [f"## Page {page_number}", "", f"_Extraction method: {method}._", ""]
        lines += [text if text else "_[No machine-readable text detected on this page.]_", ""]
    return "\n".join(lines).rstrip()


def render_markdown(
    record: dict,
    pages: list[str],
    methods: list[str],
    existing: str = "",
) -> str:
    title = re.sub(r"\s+", " ", record["title"]).strip() or Path(record["source_path"]).stem
    source_path = Path(record["source_path"])
    try:
        vault_path = source_path.relative_to("vault").as_posix()
    except ValueError as exc:
        raise ValueError(f"source path is outside vault: {source_path}") from exc
    managed_lines = [
        f"title: {yaml_string(title)}",
        f"pdf: {yaml_string(f'[[{vault_path}]]')}",
        f"source_url: {yaml_string(record['source_url'])}",
        f"source_sha256: {yaml_string(record['source_sha256'])}",
        f"pages: {record['pages']}",
        f"extraction_status: {yaml_string(record['status'])}",
        f"embedded_pages: {record['embedded_pages']}",
        f"ocr_pages: {record['ocr_pages']}",
        f"unrecognized_pages: {record['empty_pages']}",
        f"ocr_mode: {yaml_string(record['ocr_mode'])}",
        f"ocr_language: {yaml_string(record['ocr_language'])}",
    ]
    if record.get("ocr_dpi"):
        managed_lines.append(f"ocr_dpi: {record['ocr_dpi']}")
    managed_lines.append(f"generated: {record['generated']}")
    preserved_blocks = [
        lines
        for key, lines in frontmatter_blocks(existing)
        if key is None or key not in MANAGED_PROPERTIES
    ]
    frontmatter = ["---", *managed_lines]
    for block in preserved_blocks:
        frontmatter.extend(block)
    frontmatter.extend(["---", ""])

    generated = render_generated_region(record, pages, methods)
    body = replace_generated_region(body_without_frontmatter(existing), title, generated)
    return "\n".join(frontmatter) + "\n" + body.rstrip() + "\n"


def convert_one(
    source: Path,
    metadata: dict,
    source_hash: str,
    ocr_mode: str,
    tessdata: Path,
    language: str,
    dpi: int,
) -> dict:
    relative = source.relative_to(PDF_ROOT)
    destination = output_path(source)
    record = {
        "source_path": f"vault/Attachments/PDFs/{relative.as_posix()}",
        "output_path": destination.relative_to(ROOT).as_posix(),
        "source_sha256": source_hash,
        "source_bytes": source.stat().st_size,
        "source_url": metadata.get("url") or metadata.get("download_url") or metadata.get("item_url") or "",
        "title": metadata.get("title") or metadata.get("citation") or source.stem,
        "creator": metadata.get("creator") or metadata.get("author") or "",
        "ocr_mode": ocr_mode,
        "ocr_language": language if ocr_mode == "auto" else "",
        "ocr_dpi": dpi if ocr_mode == "auto" else 0,
        "generated": date.today().isoformat(),
        "status": "error",
        "error": "",
    }
    try:
        verify_catalog_hash(metadata, source_hash)
        count = pdf_pages(source)
        pages, extraction_warning = embedded_pages(source, count)
        methods = ["embedded text" if text else "none" for text in pages]
        ocr_errors = []
        if ocr_mode == "auto":
            with tempfile.TemporaryDirectory(dir=TEMP, prefix="ocr-") as temporary:
                work = Path(temporary)
                for index, embedded in enumerate(pages):
                    if usable(embedded):
                        continue
                    try:
                        ocr_text, warning = ocr_page(
                            source, index + 1, work, tessdata, language, dpi
                        )
                        if len(ocr_text) > len(embedded):
                            pages[index] = ocr_text
                            methods[index] = "OCR"
                        if warning:
                            ocr_errors.append(f"page {index + 1}: {warning}")
                    except Exception as exc:
                        ocr_errors.append(f"page {index + 1}: {exc}")
        embedded_count = sum(method == "embedded text" for method in methods)
        ocr_count = sum(method == "OCR" for method in methods)
        empty_count = sum(not text for text in pages)
        record.update(
            {
                "pages": count,
                "embedded_pages": embedded_count,
                "ocr_pages": ocr_count,
                "empty_pages": empty_count,
                "status": "complete" if empty_count == 0 else "partial",
                "warnings": [x for x in [extraction_warning, *ocr_errors] if x],
                "source_link": Path(os.path.relpath(source, destination.parent)).as_posix(),
            }
        )
        destination.parent.mkdir(parents=True, exist_ok=True)
        existing = destination.read_text(encoding="utf-8") if destination.exists() else ""
        payload = render_markdown(record, pages, methods, existing)
        partial = destination.with_name(f"{destination.name}.part")
        try:
            partial.write_text(payload, encoding="utf-8")
            partial.replace(destination)
        finally:
            partial.unlink(missing_ok=True)
    except Exception as exc:
        record["status"] = "error"
        record["error"] = str(exc)
    return record


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ocr", choices=("auto", "never"), default="auto")
    parser.add_argument("--ocr-language", default="spa+eng")
    parser.add_argument("--tessdata", type=Path, default=DEFAULT_TESSDATA)
    parser.add_argument("--dpi", type=int, default=250)
    parser.add_argument("--workers", type=int, default=3)
    parser.add_argument("--match", help="Only convert source paths containing this text")
    parser.add_argument("--limit", type=int, help="Only convert the first N matching PDFs")
    parser.add_argument("--force", action="store_true")
    return parser.parse_args()


def retained_prior_records(
    prior: dict[str, dict],
    selected_keys: set[str],
    all_source_keys: set[str],
    targeted: bool,
) -> list[dict]:
    if not targeted:
        return []
    return [
        row
        for source_key, row in prior.items()
        if source_key not in selected_keys
        and source_key in all_source_keys
        and (ROOT / row.get("output_path", "")).exists()
    ]


def main() -> int:
    args = parse_args()
    TEMP.mkdir(parents=True, exist_ok=True)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    DATA.mkdir(parents=True, exist_ok=True)
    if args.ocr == "auto" and not args.tessdata.exists():
        raise SystemExit(f"OCR data directory does not exist: {args.tessdata}")

    metadata = source_metadata()
    all_sources = sorted(PDF_ROOT.rglob("*.pdf"))
    stems: dict[str, list[Path]] = {}
    for source in all_sources:
        stems.setdefault(source.stem, []).append(source)
    collisions = {stem: paths for stem, paths in stems.items() if len(paths) > 1}
    if collisions:
        details = "; ".join(
            f"{stem}: {', '.join(str(path.relative_to(PDF_ROOT)) for path in paths)}"
            for stem, paths in sorted(collisions.items())
        )
        raise SystemExit(f"PDF filename stems must be unique for flat paper notes: {details}")
    sources = all_sources
    if args.match:
        sources = [source for source in sources if args.match.lower() in str(source).lower()]
    if args.limit is not None:
        sources = sources[: args.limit]
    actual_hashes = {source: sha256_file(source) for source in sources}
    hash_mismatches = []
    for source in sources:
        relative = source.relative_to(PDF_ROOT).as_posix()
        catalog_hash = metadata.get(relative, {}).get("sha256")
        if catalog_hash and catalog_hash != actual_hashes[source]:
            hash_mismatches.append(
                f"{relative}: catalog {catalog_hash} != attachment {actual_hashes[source]}"
            )
    if hash_mismatches:
        raise SystemExit("catalog SHA-256 mismatch:\n" + "\n".join(hash_mismatches))

    prior = {}
    if MANIFEST.exists():
        normalized_prior = [
            normalize_prior_record(row)
            for row in json.loads(MANIFEST.read_text(encoding="utf-8"))
        ]
        prior = {row["source_path"]: row for row in normalized_prior}
    selected_keys = {
        f"vault/Attachments/PDFs/{source.relative_to(PDF_ROOT).as_posix()}"
        for source in sources
    }
    # A targeted rerun updates only selected documents. A full run reconciles
    # the manifest exactly to the attachment inventory, pruning removed or
    # renamed sources instead of retaining stale records.
    targeted = args.match is not None or args.limit is not None
    all_source_keys = {
        f"vault/Attachments/PDFs/{source.relative_to(PDF_ROOT).as_posix()}"
        for source in all_sources
    }
    results = retained_prior_records(prior, selected_keys, all_source_keys, targeted)
    pending = []
    for source in sources:
        relative = source.relative_to(PDF_ROOT).as_posix()
        source_key = f"vault/Attachments/PDFs/{relative}"
        previous = prior.get(source_key)
        expected_hash = actual_hashes[source]
        if (
            not args.force
            and previous
            and previous.get("ocr_mode") == args.ocr
            and previous.get("ocr_language") == (args.ocr_language if args.ocr == "auto" else "")
            and previous.get("ocr_dpi") == (args.dpi if args.ocr == "auto" else 0)
            and previous.get("source_sha256") == expected_hash
            and output_path(source).exists()
        ):
            results.append(previous)
        else:
            pending.append(source)

    with ThreadPoolExecutor(max_workers=max(1, args.workers)) as executor:
        futures = {
            executor.submit(
                convert_one,
                source,
                metadata.get(source.relative_to(PDF_ROOT).as_posix(), {}),
                actual_hashes[source],
                args.ocr,
                args.tessdata,
                args.ocr_language,
                args.dpi,
            ): source
            for source in pending
        }
        for number, future in enumerate(as_completed(futures), 1):
            record = future.result()
            results.append(record)
            print(
                f"[{number}/{len(pending)}] {record['status']}: "
                f"{record['source_path']} ({record.get('pages', 0)} pages, "
                f"{record.get('ocr_pages', 0)} OCR)",
                flush=True,
            )

    results.sort(key=lambda item: item["source_path"])
    MANIFEST.write_text(json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    failures = [record for record in results if record["status"] == "error"]
    print(f"wrote {len(results)} records; errors: {len(failures)}", flush=True)
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
