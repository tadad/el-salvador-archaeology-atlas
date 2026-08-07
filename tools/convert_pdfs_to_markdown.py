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
SOURCES = ROOT / "sources"
OUTPUT = SOURCES / "markdown"
DATA = ROOT / "_data"
TEMP = ROOT / "tmp" / "pdfs"
DEFAULT_TESSDATA = ROOT / "tools" / "tessdata"
MANIFEST = DATA / "text-extraction-manifest.json"
MIN_LETTERS = 80
MIN_WORDS = 16


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
                rows_by_path[local_path] = row
    return rows_by_path


def output_path(source: Path) -> Path:
    return OUTPUT / source.stem / f"{source.stem}.md"


def yaml_string(value: object) -> str:
    return json.dumps(str(value or ""), ensure_ascii=False)


def render_markdown(record: dict, pages: list[str], methods: list[str]) -> str:
    title = re.sub(r"\s+", " ", record["title"]).strip() or Path(record["source_path"]).stem
    lines = [
        "---",
        f"title: {yaml_string(title)}",
        f"source_pdf: {yaml_string(record['source_path'])}",
        f"source_url: {yaml_string(record['source_url'])}",
        f"source_sha256: {yaml_string(record['source_sha256'])}",
        f"pages: {record['pages']}",
        f"extraction_status: {yaml_string(record['status'])}",
        f"ocr_mode: {yaml_string(record['ocr_mode'])}",
        f"ocr_language: {yaml_string(record['ocr_language'])}",
        f"ocr_dpi: {record['ocr_dpi']}",
        f"generated: {yaml_string(record['generated'])}",
        "---",
        "",
        f"# {title}",
        "",
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
    return "\n".join(lines).rstrip() + "\n"


def convert_one(
    source: Path,
    metadata: dict,
    ocr_mode: str,
    tessdata: Path,
    language: str,
    dpi: int,
) -> dict:
    relative = source.relative_to(SOURCES)
    destination = output_path(source)
    source_hash = metadata.get("sha256") or sha256_file(source)
    record = {
        "source_path": f"sources/{relative.as_posix()}",
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
        payload = render_markdown(record, pages, methods)
        partial = destination.with_name(f"{destination.name}.part")
        try:
            partial.write_text(payload, encoding="utf-8")
            partial.replace(destination)
        finally:
            partial.unlink(missing_ok=True)
    except Exception as exc:
        record["error"] = str(exc)
    return record


def write_index(records: list[dict]) -> None:
    complete = sum(record["status"] == "complete" for record in records)
    partial = sum(record["status"] == "partial" for record in records)
    errors = sum(record["status"] == "error" for record in records)
    total_pages = sum(record.get("pages", 0) for record in records)
    ocr_pages = sum(record.get("ocr_pages", 0) for record in records)
    empty_pages = sum(record.get("empty_pages", 0) for record in records)
    lines = [
        "# Searchable PDF Text Corpus", "",
        "This directory mirrors every source PDF as page-addressable Markdown.",
        "Embedded text is used when adequate; deficient pages are OCRed in `auto` mode.",
        "Always check the source PDF before exact quotation or relying on tables and page layout.", "",
        f"- Documents: {len(records)}",
        f"- Pages: {total_pages}",
        f"- Complete: {complete}",
        f"- Partial: {partial}",
        f"- Errors: {errors}",
        f"- OCR-derived pages: {ocr_pages}",
        f"- Unrecognized or non-text pages: {empty_pages}", "",
        "## Documents", "",
    ]
    for record in sorted(records, key=lambda item: item["output_path"]):
        destination = Path(record["output_path"]).relative_to("sources/markdown").as_posix()
        details = f"{record.get('pages', 0)} pages; {record['status']}; {record.get('ocr_pages', 0)} OCR"
        lines.append(f"- [{record['title']}](<{destination}>) - {details}")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "INDEX.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


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


def main() -> int:
    args = parse_args()
    TEMP.mkdir(parents=True, exist_ok=True)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    DATA.mkdir(parents=True, exist_ok=True)
    if args.ocr == "auto" and not args.tessdata.exists():
        raise SystemExit(f"OCR data directory does not exist: {args.tessdata}")

    metadata = source_metadata()
    all_sources = sorted(SOURCES.rglob("*.pdf"))
    sources = all_sources
    if args.match:
        sources = [source for source in sources if args.match.lower() in str(source).lower()]
    if args.limit is not None:
        sources = sources[: args.limit]

    prior = {}
    if MANIFEST.exists():
        prior = {
            row["source_path"]: row
            for row in json.loads(MANIFEST.read_text(encoding="utf-8"))
        }
    selected_keys = {f"sources/{source.relative_to(SOURCES).as_posix()}" for source in sources}
    # A targeted rerun updates only the selected documents while retaining the
    # rest of an existing full-corpus manifest and index.
    results = [
        row for source_key, row in prior.items()
        if source_key not in selected_keys and (ROOT / row.get("output_path", "")).exists()
    ]
    pending = []
    for source in sources:
        relative = source.relative_to(SOURCES).as_posix()
        source_key = f"sources/{relative}"
        previous = prior.get(source_key)
        expected_hash = metadata.get(relative, {}).get("sha256")
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
                metadata.get(source.relative_to(SOURCES).as_posix(), {}),
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
    write_index(results)
    failures = [record for record in results if record["status"] == "error"]
    print(f"wrote {len(results)} records; errors: {len(failures)}", flush=True)
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
