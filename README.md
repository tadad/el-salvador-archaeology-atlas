# El Salvador Archaeology, Ethnohistory, and Legend Corpus

This is an El Salvador-centered, multilingual discovery corpus covering
archaeological sites and cultures, Indigenous history, colonial encounters,
oral traditions, folklore, legendary people and places, disputed claims, and
the history of archaeological investigation.

Guatemala, Honduras, Nicaragua, Belize, southern Mexico, Costa Rica, and the
Pacific maritime sphere appear only when a subject or source materially
illuminates El Salvador, its present territory, or the peoples and networks
connected to it. This is not intended as a general corpus of Central American
legends.

Spanish and Indigenous-language sources are preferred. English and other
languages are retained when they provide important primary documentation or
strong scholarship. Wikipedia is used as a discovery map; citation trails are
followed toward chronicles, field reports, archival documents, theses,
catalogues, peer-reviewed research, heritage agencies, and other stronger
sources.

## Start here

- [Interactive excavation atlas](app/) — a Next.js map of terrestrial and
  maritime archaeological investigations with coordinates, narrative site
  summaries, and direct links to cited PDF pages
- [Field guide](FIELD-GUIDE.md) — curated orientation and high-value research
  leads
- [Source-derived leads](SOURCE-DERIVED-LEADS.md) — sites, artifacts, historical
  problems, and traditions surfaced by the downloaded literature even when
  Wikipedia coverage is weak or absent
- [Searchable PDF text](sources/markdown/INDEX.md) — page-addressable Markdown
  for all 123 PDFs, using embedded text and targeted multilingual OCR
- [Topic index](INDEX.md) — generated inventory of discovery records
- [Sources](sources/INDEX.md) — downloaded and linked primary/strong secondary
  material
- [Schema](SCHEMA.md) — record fields, evidence labels, and inclusion rules
- [`topics/`](topics/) — one Markdown discovery record per subject

## Scope rule

Every included record must satisfy at least one of these conditions:

1. It is located in present-day El Salvador.
2. It concerns a people, polity, tradition, artifact, or event documented in
   El Salvador.
3. It is a regional subject necessary to interpret Salvadoran material.
4. A primary or strong secondary source centered elsewhere contains material
   specifically relevant to El Salvador.

Regional context without a concrete Salvadoran connection is excluded.

## Cautions

- `unassessed` means discovered, not verified.
- A colonial text is primary evidence for what its author wrote, not automatic
  proof that its description of Indigenous history is accurate.
- A real archaeological site can have separate legendary or nationalist claims
  attached to it; those claims require their own evidence assessment.
- Folklore recorded in the twentieth century may preserve older elements, but
  age and continuity should not be assumed without evidence.
- Modern country borders do not map neatly onto pre-Hispanic cultural regions.

## Maintenance

The downloadable PDF archive is not committed to Git. Every Markdown
derivative records the original source URL, SHA-256 hash, and zero-based PDF
page markers, while `_data/` retains the corpus manifests. This keeps the
research provenance reproducible without making application deployments clone
hundreds of megabytes of duplicate source files.

The current searchable mirror covers all 6,198 PDF pages. Each derivative
records its source URL and hash, preserves PDF page boundaries, and labels each
page as embedded text, OCR, or unrecognized. Treat the text as a discovery aid
and check the PDF before exact quotation or interpreting tables and figures.

Run the atlas locally with:

```bash
cd app
npm install
npm run dev
```
