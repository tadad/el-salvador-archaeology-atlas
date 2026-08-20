# Web source discovery

The atlas uses a review queue to find source material outside the local PDF
archive. The queue includes government notices and repository records because
site discoveries, rescue work, declarations, and project updates often appear
there before they appear in an academic paper.

Run a complete crawl of the supported sources:

```bash
python3 tools/discover_web_sources.py
```

The command writes two ignored files:

- `tmp/data/web-source-candidates.json` retains source metadata, matched text,
  content hashes, and links to matching vault records.
- `tmp/data/web-source-candidates.md` orders new candidates by evidence score
  for reading and review. It includes high- and medium-priority candidates and
  omits low-priority query matches from the reading queue.

Use `--since YYYY-MM-DD` for a recent-publication pass. Use repeated `--source`
or `--query` options to narrow a run. For example:

```bash
python3 tools/discover_web_sources.py \
  --source cultura \
  --since 2025-01-01
```

Some repository records publish only a year or year-month. The date filter
keeps a partial date when its possible date range overlaps the requested
period.

The default run covers these machine-readable sources:

| Source | Interface | Material |
| --- | --- | --- |
| Ministerio de Cultura | WordPress REST API | Notices, discoveries, rescue work, declarations, and research updates |
| UTEC repository | DSpace REST API | Papers, theses, reports, abstracts, and subject metadata |

The UES DSpace adapter is available with `--source ues`. Network timeouts from
that repository are recorded as source failures, and results from the other
adapters remain usable.

## Review policy

Discovery does not create atlas records. A reviewer follows each source link,
checks names and consequential claims against the original page or PDF, and
then chooses one of three outcomes:

1. Add a Place for a documented locality that is absent from the atlas.
2. Add a cited study or discovery event to an existing Place.
3. Reject the candidate as an event announcement, generic heritage story, or
   duplicate that adds no evidence.

Short notices normally belong as citations in a Place record. Substantive
papers belong in `vault/Papers/` and use the PDF processing workflow. A notice
can support the existence of a reported find without establishing its extent,
chronology, cultural attribution, or precise location.

Public coordinates must follow `coordinate_precision`, `coordinate_basis`,
`coordinate_note`, and `location_visibility`. Burial locations, private
parcels, and vulnerable sites may require a public landmark proxy or a
generalized marker.

## Source expansion order

Add adapters in this order. Prefer APIs, OAI-PMH, RSS, and sitemaps over HTML
scraping because they support incremental retrieval and stable identifiers.

1. The national Transparency Portal's `Resoluciones ejecutoriadas` collection
   for the Ministry of Culture. Its Dirección de Arqueología PDF bundles
   contain inspection locations, project names, surface-survey results, nearby
   Atlas registration numbers, and protection decisions. The bundles can be
   tens of megabytes, so an adapter should cache each file by checksum, split
   it at resolution headings, and suppress standard no-find language.
2. Ministerio de Medio Ambiente environmental-review records. Project files
   can contain archaeological inspections and rescue requirements that never
   become papers.
3. Universidad de El Salvador DSpace and OAI-PMH endpoints. The supplied
   DSpace adapter needs operational monitoring because the host can time out.
4. Diario Oficial records for cultural-property declarations, associations,
   regulations, and formal notices.
5. Salvadoran news sitemaps and RSS feeds. Store URLs, dates, bylines, short
   match context, and content hashes. Do not archive full copyrighted article
   text in the repository.
6. Archived FUNDAR, CONCULTURA, and former government pages through the
   Internet Archive. Preserve the original URL and snapshot date.
7. Regional publication indexes such as Asociación Tikal and institutional
   journals that expose OAI-PMH or issue metadata.

Each new adapter must produce the same candidate fields, retry source failures
without blocking other adapters, and compare canonical URLs and titles with
the vault before adding work to the review queue.
