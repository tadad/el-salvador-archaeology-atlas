# El Salvador Archaeology Atlas

This repository is an El Salvador-centered, multilingual research corpus and
public atlas. It connects archaeological places with source documents,
historical peoples, cultural classifications, and research history without
treating any one of those evidence types as interchangeable.

Regional material from Guatemala, Honduras, Nicaragua, Belize, southern
Mexico, Costa Rica, and the Pacific maritime sphere is included only when it
materially helps interpret El Salvador, its present territory, or connected
peoples and networks.

## Explore the project

- [`app/`](app/) contains the Next.js atlas, wiki, and public About page.
- [`vault/Home.md`](vault/Home.md) opens the Obsidian research vault.
- [`vault/Library.md`](vault/Library.md) indexes downloaded and linked sources.
- [`vault/Views/Papers.base`](vault/Views/Papers.base) provides a searchable
  view of locally archived papers.
- [`SITE-DESCRIPTION-AUDIT.md`](SITE-DESCRIPTION-AUDIT.md) defines the current
  site-description audit method.
- [`SITE-DESCRIPTION-AUDIT-CHECKLIST.md`](SITE-DESCRIPTION-AUDIT-CHECKLIST.md)
  tracks that audit while it is in progress.

The web application publishes every typed, top-level ontology collection in
the vault. It currently provides specialized readers for Paper and Author
records and generic pages for the rest of the graph.

## Scope and evidence

A record belongs in the corpus when it meets at least one condition:

1. It is located in present-day El Salvador.
2. It concerns a people, polity, tradition, artifact, or event documented in
   El Salvador.
3. It supplies regional context necessary to interpret Salvadoran material.
4. A strong source centered elsewhere contains material specifically relevant
   to El Salvador.

The corpus distinguishes observation, historical or oral report, and later
interpretation. A colonial text documents what its author wrote; it does not
automatically establish the accuracy of that description. A documented oral
tradition is evidence for a narrative and its recording context; claims about
its age or continuity require separate support. Archaeological styles and
historical ethnic identities also remain separate unless a source makes and
supports the connection.

Public coordinates follow the same principle. Each Place records whether its
marker is source-published, tied to a public landmark, or approximate. A
sensitive location may be generalized even when more precise information is
available.

## Knowledge graph

The vault models six linked record types:

- **Places** own links to Periods, Cultures, and directly supporting Papers.
- **Periods** provide controlled chronological facets.
- **Cultures** describe cautious archaeological traditions or classifications.
- **Peoples** represent historical or ethnolinguistic groups separately from
  material culture.
- **Papers** preserve bibliographic, extraction, and provenance data and own
  links to canonical Authors.
- **Authors** represent credited people and organizations.

Obsidian links provide reverse relationships through backlinks, so each edge
is stored once. Research events remain cited prose in Place records rather than
a separate record type.

## PDF processing

The PDF archive under `vault/Attachments/PDFs/` is intentionally ignored by
Git. Each generated Paper record preserves the original URL, SHA-256 checksum,
page count, extraction settings, and one-based `## Page N` headings. Processing
manifests and normalized metadata registries live under ignored `tmp/data/`.

Convert archived PDFs to Markdown:

```bash
python3 tools/convert_pdfs_to_markdown.py --ocr auto --ocr-language spa+eng --dpi 250
```

`--ocr auto` keeps usable embedded text and OCRs unreadable pages;
`--ocr never` disables OCR.
Generated Markdown is a discovery and reading aid. Verify quotations, names,
dates, diacritics, tables, and figures against the original PDF.

After changing normalized author, paper, or extraction metadata, render and
validate the ontology:

```bash
python3 tools/build_vault_ontology.py
python3 tools/build_vault_ontology.py --check
python3 -m unittest tests.test_vault_tools
```

The converter owns the region between `<!-- ocr:start -->` and
`<!-- ocr:end -->`. It preserves the editable `## Notes` section and fails
closed if an existing Paper has an ambiguous marker layout.

## Web development

```bash
cd app
npm install
npm run dev
```

Before shipping application changes, run:

```bash
npm run typecheck
npm run build
```
