#!/usr/bin/env python3
"""Discover web sources that may add or update records in the archaeology atlas."""

from __future__ import annotations

import argparse
import calendar
import hashlib
import html
import json
import re
import sys
import time
import unicodedata
from dataclasses import asdict, dataclass, field
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_VAULT = ROOT / "vault"
DEFAULT_OUTPUT = ROOT / "tmp" / "data" / "web-source-candidates.json"
USER_AGENT = "ElSalvadorArchaeologyAtlas/1.0 (source discovery; contact via repository)"

DEFAULT_QUERIES = (
    "arqueologia",
    "prehispanico",
    "hallazgo",
    "entierro",
    "osamenta",
    "vestigios",
    "excavacion",
    "rescate",
)

SOURCE_LABELS = {
    "cultura": "Ministerio de Cultura de El Salvador",
    "utec": "Repositorio UTEC",
    "ues": "Repositorio Institucional de la Universidad de El Salvador",
}

WORDPRESS_API = "https://www.cultura.gob.sv/wp-json/wp/v2/posts"
UTEC_API = "https://repositorio.utec.edu.sv/server/api/discover/search/objects"
UES_API = "https://repositorio.ues.edu.sv/server/api/discover/search/objects"

URL_RE = re.compile(r"https?://[^\s<>()\[\]{}\"']+")
FRONTMATTER_TITLE_RE = re.compile(r'^title:\s*["\']?(.*?)["\']?\s*$', re.MULTILINE)

TERM_WEIGHTS = {
    "sitio arqueologico": 6,
    "hallazgo arqueologico": 6,
    "hallazgos arqueologicos": 6,
    "rescate arqueologico": 6,
    "descubrimiento arqueologico": 6,
    "vestigios arqueologicos": 5,
    "investigacion arqueologica": 4,
    "investigaciones arqueologicas": 4,
    "materiales arqueologicos": 4,
    "patrimonio arqueologico": 3,
    "excavacion": 3,
    "excavaciones": 3,
    "prospeccion": 3,
    "entierro": 4,
    "enterramiento": 4,
    "osamenta": 5,
    "tumba": 3,
    "pecio": 4,
    "prehispanico": 2,
    "prehispanica": 2,
    "arqueologia": 1,
    "arqueologico": 1,
    "arqueologica": 1,
}


class TextExtractor(HTMLParser):
    """Extract readable text from the limited HTML returned by source APIs."""

    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)

    def text(self) -> str:
        return re.sub(r"\s+", " ", " ".join(self.parts)).strip()


@dataclass
class Candidate:
    source: str
    source_label: str
    source_id: str
    source_type: str
    title: str
    url: str
    published: str | None
    modified: str | None
    matched_terms: list[str]
    score: int
    review_priority: str
    review_status: str
    vault_matches: list[str]
    snippets: list[str]
    text: str
    content_sha256: str
    discovered_by: list[str] = field(default_factory=list)


@dataclass(frozen=True)
class VaultInventory:
    urls: dict[str, tuple[str, ...]]
    paper_titles: dict[str, tuple[str, ...]]


def plain_text(value: str) -> str:
    parser = TextExtractor()
    parser.feed(html.unescape(value or ""))
    return parser.text()


def normalized_text(value: str) -> str:
    value = unicodedata.normalize("NFKD", value.casefold())
    value = "".join(character for character in value if not unicodedata.combining(character))
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def canonical_url(value: str) -> str:
    """Normalize a public URL for coverage comparisons without changing its target."""
    cleaned = html.unescape(value).rstrip(".,;:!?)\"]}'")
    try:
        parsed = urlsplit(cleaned)
    except ValueError:
        return cleaned.casefold().rstrip("/")
    host = (parsed.hostname or "").casefold()
    if host.startswith("www."):
        host = host[4:]
    path = re.sub(r"/+", "/", parsed.path).rstrip("/")
    query = f"?{parsed.query}" if parsed.query else ""
    return f"{host}{path}{query}"


def build_vault_inventory(vault: Path) -> VaultInventory:
    urls: dict[str, set[str]] = {}
    titles: dict[str, set[str]] = {}
    for path in sorted(vault.rglob("*.md")):
        relative = path.relative_to(vault).as_posix()
        contents = path.read_text(errors="replace")
        for raw_url in URL_RE.findall(contents):
            urls.setdefault(canonical_url(raw_url), set()).add(relative)
        if path.parent.name == "Papers":
            match = FRONTMATTER_TITLE_RE.search(contents)
            if match:
                titles.setdefault(normalized_text(match.group(1)), set()).add(relative)
    return VaultInventory(
        urls={key: tuple(sorted(values)) for key, values in urls.items()},
        paper_titles={key: tuple(sorted(values)) for key, values in titles.items()},
    )


def evidence_terms(text: str) -> tuple[list[str], int]:
    normalized = f" {normalized_text(text)} "
    terms = [term for term in TERM_WEIGHTS if f" {term} " in normalized]
    return terms, sum(TERM_WEIGHTS[term] for term in terms)


def evidence_snippets(text: str, terms: Iterable[str], radius: int = 180) -> list[str]:
    sentences = re.split(r"(?<=[.!?])\s+", text)
    snippets: list[str] = []
    for term in terms:
        for sentence in sentences:
            if term not in normalized_text(sentence):
                continue
            snippet = sentence.strip()
            if len(snippet) > radius * 2:
                normalized_sentence = normalized_text(snippet)
                index = normalized_sentence.find(term)
                start = max(0, index - radius)
                end = min(len(snippet), index + len(term) + radius)
                snippet = snippet[start:end].strip()
            if snippet and all(snippet not in existing for existing in snippets):
                snippets.append(snippet)
            break
        if len(snippets) == 4:
            break
    return snippets


def review_priority(status: str, score: int) -> str:
    if status != "needs_review":
        return "represented"
    if score >= 8:
        return "high"
    if score >= 3:
        return "medium"
    return "low"


def review_coverage(
    url: str, title: str, source_type: str, inventory: VaultInventory
) -> tuple[str, list[str]]:
    matches = set(inventory.urls.get(canonical_url(url), ()))
    if matches:
        return "represented_by_url", sorted(matches)
    if source_type == "paper":
        matches.update(inventory.paper_titles.get(normalized_text(title), ()))
        if matches:
            return "represented_by_title", sorted(matches)
    return "needs_review", []


def request_json(url: str, timeout: float, retries: int = 2) -> tuple[Any, dict[str, str]]:
    last_error: Exception | None = None
    for attempt in range(retries + 1):
        request = Request(url, headers={"Accept": "application/json", "User-Agent": USER_AGENT})
        try:
            with urlopen(request, timeout=timeout) as response:
                headers = {key.casefold(): value for key, value in response.headers.items()}
                return json.load(response), headers
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
            last_error = error
            if attempt < retries:
                time.sleep(0.5 * (2**attempt))
    assert last_error is not None
    raise last_error


def paginate_wordpress(query: str, timeout: float, max_pages: int | None) -> Iterable[dict[str, Any]]:
    page = 1
    while True:
        url = f"{WORDPRESS_API}?{urlencode({'search': query, 'per_page': 100, 'page': page, '_fields': 'id,date,modified,link,title,excerpt,content'})}"
        payload, headers = request_json(url, timeout)
        yield from payload
        total_pages = int(headers.get("x-wp-totalpages", "1"))
        if page >= total_pages or (max_pages is not None and page >= max_pages):
            break
        page += 1


def wordpress_candidate(
    item: dict[str, Any], query: str, inventory: VaultInventory
) -> Candidate:
    title = plain_text(item.get("title", {}).get("rendered", ""))
    body = plain_text(item.get("content", {}).get("rendered", ""))
    excerpt = plain_text(item.get("excerpt", {}).get("rendered", ""))
    text = re.sub(r"\s+", " ", " ".join(part for part in (title, excerpt, body) if part)).strip()
    terms, score = evidence_terms(text)
    url = item.get("link", "")
    status, matches = review_coverage(url, title, "notice", inventory)
    return Candidate(
        source="cultura",
        source_label=SOURCE_LABELS["cultura"],
        source_id=str(item.get("id", "")),
        source_type="notice",
        title=title,
        url=url,
        published=item.get("date"),
        modified=item.get("modified"),
        matched_terms=terms,
        score=score,
        review_priority=review_priority(status, score),
        review_status=status,
        vault_matches=matches,
        snippets=evidence_snippets(text, terms),
        text=text,
        content_sha256=hashlib.sha256(text.encode()).hexdigest(),
        discovered_by=[query],
    )


def metadata_values(item: dict[str, Any], field_name: str) -> list[str]:
    metadata = item.get("metadata", {})
    return [entry.get("value", "") for entry in metadata.get(field_name, []) if entry.get("value")]


def dspace_candidate(
    item: dict[str, Any], source: str, query: str, inventory: VaultInventory
) -> Candidate:
    title_values = metadata_values(item, "dc.title")
    title = title_values[0] if title_values else item.get("name", "")
    uuid = item.get("uuid", "")
    uri_values = metadata_values(item, "dc.identifier.uri")
    url = uri_values[0] if uri_values else f"{urlsplit(UTEC_API if source == 'utec' else UES_API).scheme}://{urlsplit(UTEC_API if source == 'utec' else UES_API).netloc}/items/{uuid}"
    published_values = metadata_values(item, "dc.date.issued")
    modified_values = metadata_values(item, "dc.date.updated")
    text_fields = (
        [title]
        + metadata_values(item, "dc.description.abstract")
        + metadata_values(item, "dc.description")
        + metadata_values(item, "dc.subject")
    )
    text = re.sub(r"\s+", " ", " ".join(text_fields)).strip()
    terms, score = evidence_terms(text)
    status, matches = review_coverage(url, title, "paper", inventory)
    return Candidate(
        source=source,
        source_label=SOURCE_LABELS[source],
        source_id=uuid,
        source_type="paper",
        title=title,
        url=url,
        published=published_values[0] if published_values else None,
        modified=modified_values[0] if modified_values else None,
        matched_terms=terms,
        score=score,
        review_priority=review_priority(status, score),
        review_status=status,
        vault_matches=matches,
        snippets=evidence_snippets(text, terms),
        text=text,
        content_sha256=hashlib.sha256(text.encode()).hexdigest(),
        discovered_by=[query],
    )


def paginate_dspace(
    endpoint: str, query: str, timeout: float, max_pages: int | None
) -> Iterable[dict[str, Any]]:
    page = 0
    while True:
        url = f"{endpoint}?{urlencode({'query': query, 'size': 100, 'page': page})}"
        payload, _headers = request_json(url, timeout)
        result = payload.get("_embedded", {}).get("searchResult", {})
        objects = result.get("_embedded", {}).get("objects", [])
        for result_object in objects:
            item = result_object.get("_embedded", {}).get("indexableObject")
            if item and item.get("type") == "item":
                yield item
        page_data = result.get("page", {})
        total_pages = int(page_data.get("totalPages", 1))
        if page + 1 >= total_pages or (max_pages is not None and page + 1 >= max_pages):
            break
        page += 1


def merge_candidate(target: dict[str, Candidate], candidate: Candidate) -> None:
    key = f"{candidate.source}:{candidate.source_id or canonical_url(candidate.url)}"
    existing = target.get(key)
    if existing is None:
        target[key] = candidate
        return
    existing.discovered_by = sorted(set(existing.discovered_by + candidate.discovered_by))


def crawl_source(
    source: str,
    queries: tuple[str, ...],
    inventory: VaultInventory,
    timeout: float,
    max_pages: int | None,
) -> list[Candidate]:
    candidates: dict[str, Candidate] = {}
    if source == "cultura":
        for query in queries:
            for item in paginate_wordpress(query, timeout, max_pages):
                merge_candidate(candidates, wordpress_candidate(item, query, inventory))
    else:
        endpoint = UTEC_API if source == "utec" else UES_API
        for query in queries:
            for item in paginate_dspace(endpoint, query, timeout, max_pages):
                merge_candidate(candidates, dspace_candidate(item, source, query, inventory))
    return list(candidates.values())


def candidate_in_date_range(candidate: Candidate, since: date | None) -> bool:
    if since is None or not candidate.published:
        return True
    try:
        return date.fromisoformat(candidate.published[:10]) >= since
    except ValueError:
        month_match = re.match(r"^(\d{4})-(\d{2})$", candidate.published)
        if month_match:
            year, month = map(int, month_match.groups())
            try:
                latest_possible = date(year, month, calendar.monthrange(year, month)[1])
            except ValueError:
                return True
            return latest_possible >= since
        year_match = re.match(r"^(\d{4})$", candidate.published)
        return year_match is None or date(int(year_match.group(1)), 12, 31) >= since


def render_markdown(payload: dict[str, Any]) -> str:
    lines = [
        "# Web source candidate review",
        "",
        f"Generated: {payload['generated_at']}",
        "",
        "This queue supports discovery. Verify every claim against the linked source before editing the vault.",
        "",
        "## Run summary",
        "",
        f"- Candidates: {payload['summary']['candidate_count']}",
        f"- Need review: {payload['summary']['needs_review_count']}",
        f"- High-priority review: {payload['summary']['high_priority_count']}",
        f"- Medium-priority review: {payload['summary']['medium_priority_count']}",
        f"- Represented in vault: {payload['summary']['represented_count']}",
    ]
    if payload["failures"]:
        lines.extend(("- Source failures:", *[f"  - {failure['source']}: {failure['error']}" for failure in payload["failures"]]))
    lines.extend(("", "## Candidates that need review", ""))
    candidates = [
        item for item in payload["candidates"] if item["review_priority"] in ("high", "medium")
    ]
    for item in candidates:
        date_label = item["published"][:10] if item["published"] else "undated"
        terms = ", ".join(item["matched_terms"]) or "query match only"
        lines.extend(
            (
                f"### [{item['title']}]({item['url']})",
                "",
                f"- Source: {item['source_label']}",
                f"- Type: {item['source_type']}",
                f"- Date: {date_label}",
                f"- Score: {item['score']}",
                f"- Priority: {item['review_priority']}",
                f"- Matched terms: {terms}",
            )
        )
        if item["snippets"]:
            lines.append(f"- Context: {item['snippets'][0]}")
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def write_report(
    output: Path,
    candidates: list[Candidate],
    failures: list[dict[str, str]],
    sources: tuple[str, ...],
    queries: tuple[str, ...],
) -> dict[str, Any]:
    candidates.sort(
        key=lambda item: (
            item.review_status != "needs_review",
            -item.score,
            item.published or "",
            item.title.casefold(),
        )
    )
    candidate_data = [asdict(candidate) for candidate in candidates]
    needs_review_count = sum(item.review_status == "needs_review" for item in candidates)
    high_priority_count = sum(item.review_priority == "high" for item in candidates)
    medium_priority_count = sum(item.review_priority == "medium" for item in candidates)
    payload = {
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "sources": list(sources),
        "queries": list(queries),
        "summary": {
            "candidate_count": len(candidates),
            "needs_review_count": needs_review_count,
            "high_priority_count": high_priority_count,
            "medium_priority_count": medium_priority_count,
            "represented_count": len(candidates) - needs_review_count,
            "failure_count": len(failures),
        },
        "failures": failures,
        "candidates": candidate_data,
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    output.with_suffix(".md").write_text(render_markdown(payload))
    return payload


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        action="append",
        choices=tuple(SOURCE_LABELS),
        help="Source adapter to run; repeat for more than one (default: cultura and utec)",
    )
    parser.add_argument(
        "--query",
        action="append",
        help="Discovery query; repeat for more than one (default: archaeology term set)",
    )
    parser.add_argument("--since", type=date.fromisoformat, help="Keep records published on or after YYYY-MM-DD")
    parser.add_argument("--vault", type=Path, default=DEFAULT_VAULT)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--timeout", type=float, default=20.0)
    parser.add_argument(
        "--max-pages",
        type=int,
        help="Limit pages fetched per query for testing; omit for a complete crawl",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    sources = tuple(dict.fromkeys(args.source or ("cultura", "utec")))
    queries = tuple(dict.fromkeys(args.query or DEFAULT_QUERIES))
    inventory = build_vault_inventory(args.vault)
    candidates: dict[str, Candidate] = {}
    failures: list[dict[str, str]] = []
    for source in sources:
        for query in queries:
            try:
                for candidate in crawl_source(
                    source, (query,), inventory, args.timeout, args.max_pages
                ):
                    merge_candidate(candidates, candidate)
            except Exception as error:  # Preserve successful queries and sources in the report.
                failures.append(
                    {
                        "source": source,
                        "query": query,
                        "error": f"{type(error).__name__}: {error}",
                    }
                )
    selected_candidates = [
        candidate
        for candidate in candidates.values()
        if candidate_in_date_range(candidate, args.since)
    ]
    payload = write_report(args.output, selected_candidates, failures, sources, queries)
    summary = payload["summary"]
    print(
        f"candidates={summary['candidate_count']} needs_review={summary['needs_review_count']} "
        f"priority={summary['high_priority_count'] + summary['medium_priority_count']} "
        f"represented={summary['represented_count']} failures={summary['failure_count']}"
    )
    print(f"json={args.output}")
    print(f"markdown={args.output.with_suffix('.md')}")
    return 2 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
