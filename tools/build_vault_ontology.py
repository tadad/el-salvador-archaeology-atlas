#!/usr/bin/env python3
"""Build and validate the Author/Paper ontology in the Obsidian vault.

The local JSON files under ``tmp/data`` retain normalized identities and
bibliographic classification. This tool renders those records as Obsidian
properties while preserving user-managed properties and note bodies.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "tmp" / "data"
VAULT = ROOT / "vault"
PAPERS = VAULT / "Papers"
AUTHORS = VAULT / "Authors"
EXTRACTION_MANIFEST = DATA / "text-extraction-manifest.json"
AUTHORS_DATA = DATA / "authors.json"
PAPER_AUTHORS_DATA = DATA / "paper-authors.json"
PAPER_METADATA_DATA = DATA / "paper-metadata.json"
OCR_START = "<!-- ocr:start -->"
OCR_END = "<!-- ocr:end -->"
AUTHOR_KINDS = {"person", "organization"}
WORK_TYPES = {
    "article",
    "book",
    "conference-paper",
    "journal-issue",
    "map",
    "poster",
    "report",
    "testimony",
}
COLLECTION_DIRECTORIES = {
    "FUNDAR": "fundar",
    "Institutional": "institutional",
    "Public domain": "public-domain",
}

FRONTMATTER = re.compile(r"\A---\n(?P<yaml>.*?)\n---(?:\n|\Z)", re.DOTALL)
PROPERTY = re.compile(r"^(?P<key>[A-Za-z_][A-Za-z0-9_-]*):(?:\s.*)?$")


def yaml_string(value: object) -> str:
    return json.dumps(str(value), ensure_ascii=False)


def yaml_scalar(key: str, value: object) -> list[str]:
    if value is None:
        return [f"{key}:"]
    if isinstance(value, bool):
        return [f"{key}: {'true' if value else 'false'}"]
    if isinstance(value, (int, float)):
        return [f"{key}: {value}"]
    return [f"{key}: {yaml_string(value)}"]


def yaml_list(key: str, values: Iterable[object]) -> list[str]:
    items = list(values)
    if not items:
        return [f"{key}: []"]
    return [f"{key}:", *(f"  - {yaml_string(value)}" for value in items)]


def yaml_date(key: str, value: object) -> list[str]:
    text = str(value)
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", text):
        raise ValueError(f"{key} is not an ISO date: {text}")
    return [f"{key}: {text}"]


def split_property_blocks(yaml_text: str) -> tuple[dict[str, list[str]], list[list[str]]]:
    """Split flat Obsidian YAML into top-level property blocks.

    Unknown material is retained verbatim. The vault schema intentionally uses
    flat properties because Obsidian does not expose nested YAML consistently.
    """

    blocks: dict[str, list[str]] = {}
    anonymous: list[list[str]] = []
    current: list[str] = []
    current_key: str | None = None

    def finish() -> None:
        nonlocal current, current_key
        if not current:
            return
        if current_key is None:
            anonymous.append(current)
        else:
            blocks[current_key] = current
        current = []
        current_key = None

    for line in yaml_text.splitlines():
        match = PROPERTY.match(line)
        if match and not line.startswith((" ", "\t")):
            finish()
            current_key = match.group("key")
        current.append(line)
    finish()
    return blocks, anonymous


def merge_frontmatter(
    text: str,
    managed: list[tuple[str, list[str]]],
    defaults: list[tuple[str, list[str]]] | None = None,
) -> str:
    match = FRONTMATTER.match(text)
    old_blocks: dict[str, list[str]] = {}
    anonymous: list[list[str]] = []
    body = text
    if match:
        old_blocks, anonymous = split_property_blocks(match.group("yaml"))
        body = text[match.end() :]

    managed_keys = {key for key, _ in managed}
    lines = ["---"]
    for _, block in managed:
        lines.extend(block)
    for key, block in defaults or []:
        if key not in old_blocks and key not in managed_keys:
            lines.extend(block)
            managed_keys.add(key)
    for block in anonymous:
        lines.extend(block)
    for key, block in old_blocks.items():
        if key not in managed_keys:
            lines.extend(block)
    lines.extend(["---", ""])
    return "\n".join(lines) + "\n" + body.lstrip("\n")


def ensure_paper_regions(text: str) -> str:
    """Validate the editable Notes and generated OCR regions."""

    start_count = text.count(OCR_START)
    end_count = text.count(OCR_END)
    if start_count != end_count or start_count > 1:
        raise ValueError("paper has an invalid OCR marker pair")
    if start_count == 1:
        if text.index(OCR_START) >= text.index(OCR_END):
            raise ValueError("paper has an invalid OCR marker pair")
        return text
    raise ValueError("paper has no OCR markers; refusing to infer generated body boundaries")


def load_json(path: Path) -> object:
    return json.loads(path.read_text(encoding="utf-8"))


def paper_id(record: dict[str, object]) -> str:
    return Path(str(record["output_path"])).stem


def author_link(author: dict[str, object]) -> str:
    return f"[[Authors/{author['id']}|{author['name']}]]"


def pdf_link(record: dict[str, object]) -> str:
    source = Path(str(record["source_path"]))
    try:
        relative = source.relative_to("vault")
    except ValueError as exc:
        raise ValueError(f"source path is outside vault: {source}") from exc
    return f"[[{relative.as_posix()}]]"


def render_author_note(author: dict[str, object], existing: str = "") -> str:
    managed = [
        ("type", yaml_scalar("type", "author")),
        ("author_id", yaml_scalar("author_id", author["id"])),
        ("name", yaml_scalar("name", author["name"])),
        ("sort_name", yaml_scalar("sort_name", author["sort_name"])),
        ("author_kind", yaml_scalar("author_kind", author["kind"])),
        ("aliases", yaml_list("aliases", author.get("aliases", []))),
    ]
    body = existing or f"# {author['name']}\n"
    return merge_frontmatter(body, managed)


def render_paper_note(
    record: dict[str, object],
    relation: dict[str, object],
    metadata: dict[str, object],
    authors_by_id: dict[str, dict[str, object]],
    existing: str,
) -> str:
    pid = paper_id(record)
    existing = ensure_paper_regions(existing)

    def links(role: str) -> list[str]:
        return [author_link(authors_by_id[author_id]) for author_id in relation.get(role, [])]

    managed: list[tuple[str, list[str]]] = [
        ("type", yaml_scalar("type", "paper")),
        ("paper_id", yaml_scalar("paper_id", pid)),
        ("title", yaml_scalar("title", record["title"])),
        ("authors", yaml_list("authors", links("authors"))),
    ]
    for role in ("contributors", "editors", "translators"):
        values = links(role)
        # Empty blocks still mark canonical properties as managed, allowing a
        # later registry edit to remove obsolete role links from an old note.
        managed.append((role, yaml_list(role, values) if values else []))
    managed.extend(
        [
            ("creator_raw", yaml_scalar("creator_raw", relation["creator_raw"])),
            ("publication_year", yaml_scalar("publication_year", metadata.get("publication_year"))),
        ]
    )
    publication_date = metadata.get("publication_date")
    managed.append(
        (
            "publication_date",
            yaml_date("publication_date", publication_date) if publication_date else [],
        )
    )
    managed.extend(
        [
            ("work_type", yaml_scalar("work_type", metadata["work_type"])),
            ("languages", yaml_list("languages", metadata["languages"])),
            ("collection", yaml_scalar("collection", metadata["collection"])),
            ("pdf", yaml_scalar("pdf", pdf_link(record))),
            # Remove the pre-vault repository path property. `pdf` is the
            # canonical Obsidian attachment link.
            ("source_pdf", []),
            ("source_url", yaml_scalar("source_url", record["source_url"])),
            ("source_sha256", yaml_scalar("source_sha256", record["source_sha256"])),
            ("pages", yaml_scalar("pages", record["pages"])),
            ("extraction_status", yaml_scalar("extraction_status", record["status"])),
            ("embedded_pages", yaml_scalar("embedded_pages", record["embedded_pages"])),
            ("ocr_pages", yaml_scalar("ocr_pages", record["ocr_pages"])),
            ("unrecognized_pages", yaml_scalar("unrecognized_pages", record["empty_pages"])),
            ("ocr_mode", yaml_scalar("ocr_mode", record["ocr_mode"])),
            ("ocr_language", yaml_scalar("ocr_language", record["ocr_language"])),
        ]
    )
    ocr_dpi = record.get("ocr_dpi")
    managed.append(("ocr_dpi", yaml_scalar("ocr_dpi", ocr_dpi) if ocr_dpi else []))
    managed.append(("generated", yaml_date("generated", record["generated"])))
    defaults = [("review_status", yaml_scalar("review_status", "unreviewed"))]
    return merge_frontmatter(existing, managed, defaults)


def validate(
    records: list[dict[str, object]],
    authors: list[dict[str, object]],
    paper_authors: dict[str, dict[str, object]],
    paper_metadata: dict[str, dict[str, object]],
) -> list[str]:
    errors: list[str] = []
    pids = [paper_id(record) for record in records]
    author_ids = [str(author["id"]) for author in authors]
    if len(pids) != len(set(pids)):
        errors.append("paper ids are not unique")
    if len(author_ids) != len(set(author_ids)):
        errors.append("author ids are not unique")
    for author in authors:
        aid = str(author.get("id", ""))
        if not aid or author.get("kind") not in AUTHOR_KINDS:
            errors.append(f"{aid or '<missing author id>'}: invalid author kind")
        for field in ("name", "sort_name"):
            if not isinstance(author.get(field), str) or not author[field].strip():
                errors.append(f"{aid or '<missing author id>'}: invalid {field}")
        aliases = author.get("aliases")
        if not isinstance(aliases, list) or not all(isinstance(value, str) for value in aliases):
            errors.append(f"{aid or '<missing author id>'}: aliases must be a string list")
    expected = set(pids)
    for name, actual in (
        (PAPER_AUTHORS_DATA.name, set(paper_authors)),
        (PAPER_METADATA_DATA.name, set(paper_metadata)),
    ):
        if actual != expected:
            errors.append(
                f"{name} keys differ from papers: missing={sorted(expected - actual)!r}; "
                f"extra={sorted(actual - expected)!r}"
            )
    known_authors = set(author_ids)
    records_by_pid = {paper_id(record): record for record in records}
    for pid, relation in paper_authors.items():
        related = {
            str(author_id)
            for role in ("authors", "contributors", "editors", "translators")
            for author_id in relation.get(role, [])
        }
        if not relation.get("authors"):
            errors.append(f"{pid}: no authors")
        if unknown := related - known_authors:
            errors.append(f"{pid}: unknown author ids {sorted(unknown)!r}")
        if relation.get("creator_raw") != records_by_pid[pid].get("creator"):
            errors.append(f"{pid}: creator_raw differs from extraction creator")
    for pid, metadata in paper_metadata.items():
        record = records_by_pid[pid]
        year = metadata.get("publication_year")
        if year is not None and (type(year) is not int or not 1000 <= year <= 2100):
            errors.append(f"{pid}: invalid publication_year")
        publication_date = metadata.get("publication_date")
        if publication_date is not None:
            if not isinstance(publication_date, str) or not re.fullmatch(
                r"\d{4}-\d{2}-\d{2}", publication_date
            ):
                errors.append(f"{pid}: invalid publication_date")
            elif year is not None and int(publication_date[:4]) != year:
                errors.append(f"{pid}: publication date/year mismatch")
        if metadata.get("work_type") not in WORK_TYPES:
            errors.append(f"{pid}: invalid work_type")
        languages = metadata.get("languages")
        if not isinstance(languages, list) or not languages or not all(
            isinstance(language, str) and re.fullmatch(r"[a-z]{2}", language)
            for language in languages
        ):
            errors.append(f"{pid}: languages must be nonempty ISO 639-1 codes")
        collection = metadata.get("collection")
        source_parts = Path(str(record.get("source_path", ""))).parts
        expected_directory = COLLECTION_DIRECTORIES.get(str(collection))
        if expected_directory is None:
            errors.append(f"{pid}: invalid collection")
        elif len(source_parts) < 4 or source_parts[:3] != (
            "vault",
            "Attachments",
            "PDFs",
        ) or source_parts[3] != expected_directory:
            errors.append(f"{pid}: collection does not match attachment directory")

        if record.get("output_path") != f"vault/Papers/{pid}.md":
            errors.append(f"{pid}: invalid output_path")
        if Path(str(record.get("source_path", ""))).stem != pid:
            errors.append(f"{pid}: source filename does not match paper id")
        if not re.fullmatch(r"[0-9a-f]{64}", str(record.get("source_sha256", ""))):
            errors.append(f"{pid}: invalid source_sha256")
        counts = [record.get(field) for field in ("pages", "embedded_pages", "ocr_pages", "empty_pages")]
        if not all(type(value) is int and value >= 0 for value in counts):
            errors.append(f"{pid}: invalid extraction page counts")
        elif counts[0] == 0 or sum(counts[1:]) != counts[0]:
            errors.append(f"{pid}: extraction page counts do not sum to pages")
        if record.get("status") not in {"complete", "partial"}:
            errors.append(f"{pid}: invalid extraction status")
        if record.get("ocr_mode") not in {"auto", "always", "never"}:
            errors.append(f"{pid}: invalid ocr_mode")
    return errors


def desired_files() -> dict[Path, str]:
    records = load_json(EXTRACTION_MANIFEST)
    authors = load_json(AUTHORS_DATA)
    paper_authors = load_json(PAPER_AUTHORS_DATA)
    paper_metadata = load_json(PAPER_METADATA_DATA)
    if not isinstance(records, list) or not isinstance(authors, list):
        raise TypeError("manifest and authors data must be arrays")
    if not isinstance(paper_authors, dict) or not isinstance(paper_metadata, dict):
        raise TypeError("paper relationship and metadata data must be objects")

    errors = validate(records, authors, paper_authors, paper_metadata)
    if errors:
        raise ValueError("\n".join(errors))

    authors_by_id = {str(author["id"]): author for author in authors}
    output: dict[Path, str] = {}
    for author in authors:
        path = AUTHORS / f"{author['id']}.md"
        existing = path.read_text(encoding="utf-8") if path.exists() else ""
        output[path] = render_author_note(author, existing)
    for record in records:
        pid = paper_id(record)
        path = PAPERS / f"{pid}.md"
        if not path.exists():
            raise FileNotFoundError(path)
        existing = path.read_text(encoding="utf-8")
        output[path] = render_paper_note(
            record,
            paper_authors[pid],
            paper_metadata[pid],
            authors_by_id,
            existing,
        )
    return output


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check", action="store_true", help="report stale generated ontology notes without writing"
    )
    args = parser.parse_args()
    try:
        output = desired_files()
    except (FileNotFoundError, KeyError, TypeError, ValueError) as exc:
        print(exc, file=sys.stderr)
        return 1

    stale = [
        path
        for path, text in output.items()
        if not path.exists() or path.read_text(encoding="utf-8") != text
    ]
    existing = set(AUTHORS.glob("*.md")) | set(PAPERS.glob("*.md"))
    obsolete = sorted(existing - set(output))
    if args.check:
        for path in stale:
            print(path.relative_to(ROOT))
        for path in obsolete:
            print(f"obsolete: {path.relative_to(ROOT)}")
        return 1 if stale or obsolete else 0

    if obsolete:
        for path in obsolete:
            print(f"obsolete ontology note: {path.relative_to(ROOT)}", file=sys.stderr)
        print(
            "refusing to delete obsolete notes automatically; reconcile or remove them explicitly",
            file=sys.stderr,
        )
        return 1

    AUTHORS.mkdir(parents=True, exist_ok=True)
    for path, text in output.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        if not path.exists() or path.read_text(encoding="utf-8") != text:
            path.write_text(text, encoding="utf-8")
    print(f"wrote {len(output)} ontology notes ({len(stale)} changed)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
