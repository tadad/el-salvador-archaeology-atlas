# Archaeological Site Description Audit

Use this guide to review and correct the existing map records. The task is to make each description shorter, more accurate, and easier to verify. Do not expand a sparse source into a detailed archaeological story.

## Required outcome

For each record:

1. Verify every claim against the cited source.
2. Remove or correct unsupported claims.
3. Add a better source only when it directly supports the record.
4. Cite the smallest relevant page range.
5. Rewrite the public description in plain language.
6. Preserve uncertainty. Unknown information stays unknown.

Review and correct existing records. Do not add speculative details, reconstruct missing fieldwork, or infer a culture or date from the site's location.

## Files to inspect

Each site may have information in several files:

- `app/src/data/digs.ts`: name, coordinates, precision, type, marker explanation, and sources.
- `app/src/data/site-stories.ts`: summary, date, investigation method, and discoveries.
- `app/src/data/site-classifications.ts`: period, culture, and latest documented field-investigation year.
- `app/src/data/site-study-history.ts`: chronological fieldwork, recording, analysis, synthesis, and reinterpretation events.

All regions, including the western expansion, use these same three canonical
datasets. Do not create a region-specific data module.

Search for the stable site ID in every data file before editing it.

### Protect the edit scope

Record the site's current fields before editing. Treat that working-tree text
as the baseline, even when the repository already has uncommitted changes.
Edit only the requested stable site ID. Do not alter neighboring records or
revert unrelated work. Inspect the final diff and confirm that every changed
line belongs to the requested audit.

### Use the local source corpus

The source PDFs and their Markdown derivatives are already stored locally. Use
the local corpus for research instead of downloading another copy of a report
or generating a new text extraction.

Resolve a cited source in this order:

1. Read the source `file` value in the site record and search for that basename
   under `sources/` and `sources/markdown/`.
2. If the basename does not match, search `sources/**/INDEX.md` and other local
   source indexes by title, author, and year.
3. Search filename variants and related parts of the same publication. When a
   report is divided into chapters, volumes, appendices, or parts, identify and
   search every local derivative in that source family.
4. Use the Markdown derivative for discovery and reading. Trace useful passages
   to the corresponding PDF under `sources/` before relying on the claim.
5. Use the PDF only for final verification of consequential claims,
   quotations, names, dates, diacritics, tables, captions, maps, or other
   layout that Markdown may not preserve.

If basename, index, title-author-year, filename-variant, and source-family
searches do not resolve the local files, stop and report the missing mapping.
Do not continue with broad web research, download a replacement, or generate a
new text extraction.

Public citation links may still point to the publisher or a reliable mirror,
but the audit itself should use the existing local files.

## Audit process

### 1. List the claims

Treat each field as a set of factual claims:

- What is the place?
- When was it occupied or investigated?
- How was it investigated?
- What was found?
- What does the coordinate represent?
- Which period and culture filters are supported?

Do not evaluate the paragraph as a whole. Verify each sentence separately.

### 2. Find the source passage

Search the local Markdown derivatives first. Search spelling variants, historical names, diacritics, Spanish and English terms, and plausible OCR errors. Do not download or re-parse a PDF as a substitute for this discovery step.

Use the Markdown only to locate evidence. Trace the result to the corresponding local PDF and inspect the relevant page. Check nearby text, headings, legends, footnotes, tables, and introductory warnings. A sentence in an excavation report carries different weight from a sentence in a compiled site list.

Render every evidence page that contains a map, table, photograph, excavation
slate, legend, caption, or other graphical information. Do not rely on OCR for
dates, locality labels, unit numbers, table structure, or map symbols. Render
other scanned pages whenever typography or layout affects the claim.

### 3. Classify the evidence

Assign each claim one status:

- **Directly supported:** the source states or demonstrates the claim.
- **Cautious inference:** the source supports the inference, and the public text labels it as possible or approximate.
- **Context only:** the source supplies historical or regional background but does not prove the site's archaeology.
- **Unsupported:** the source does not establish the claim. Remove it.
- **Contradicted:** a better source conflicts with the claim. Correct it and cite the better source.

Silence is not evidence. If a short inventory entry does not mention architecture, do not claim that investigators proved architecture was absent. Say that no architecture is described.

### 4. Search for corroboration

Search the rest of the local corpus before concluding that a one-line entry is the only evidence. Prefer field reports, excavation reports, survey reports, official inventories, and contemporary technical publications.

Do not merge similarly named sites. Confirm the municipality, department, alternate names, and geographic setting before using a second source.

### 5. Rewrite to the evidence

Write for a reader who knows nothing about the publications or archaeologists. Keep author names and publication history in the citation notes unless a name is necessary to understand the site.

Use these limits:

- **Overview:** one or two short sentences.
- **When:** one short sentence.
- **How it was investigated:** one or two short sentences.
- **What archaeologists found:** one or two short sentences.

Use direct language:

- `No excavation is documented.`
- `The published source does not identify the object.`
- `Pre-Hispanic, otherwise undated.`
- `The marker represents the modern town center; the archaeological location is unknown.`

Avoid filler, researcher biographies, publication chronology, and interpretations that do not help a general reader understand the evidence.

## Site and investigation labels

Use a label that matches the evidence:

- **Excavated site:** a source documents controlled excavation.
- **Surveyed site:** field survey identifies a bounded or reproducible archaeological place.
- **Find locality:** portable archaeological material was reported or verified, but no site boundary or excavation is documented.
- **Potential archaeological locality:** a report indicates possible remains, but the location or character of the evidence is poorly documented.
- **Historical or archival lead:** the record survives in an inventory or card whose reliability cannot be confirmed.

Do not call every record a dig. A find, report, town-scale lead, and excavated site are different kinds of evidence.

## Coordinate precision

Precision describes the archaeological location, not the accuracy of the modern basemap.

- **Published:** the archaeological source publishes a reproducible coordinate for the relevant site or investigated area.
- **Landmark:** the archaeological place itself can be tied to a specific mapped landmark, structure, island, cave, or project area.
- **Approximate:** only a town, municipality, river corridor, hacienda, or broad area is known.

A precise coordinate for a modern town center is still approximate when the reported remains could be anywhere around the town.

## Citation requirements

Every source should include:

- A working link to the PDF or source page.
- The PDF page number.
- The printed page number when it differs from the PDF page.
- The relevant section, table, figure, appendix, or entry.
- A `citationNote` stating exactly what the passage supports and what remains unknown.

Before adding a source URL or helper, search the data files for the same
filename, title, or publication. Reuse the established publisher link or mirror
when it works. Confirm that the final URL opens the cited document and page in a
browser or returns the expected source format.

Example:

```text
PDF p. 42 (printed p. 31), “Hallazgos” classification
```

Use the smallest page range that contains the evidence. Do not cite an entire report or a broad range when the relevant information is one sentence.

Markdown page separators use zero-based PDF indexes. Public PDF links and
`PDF p.` citations use one-based PDF page numbers. Convert the marker, verify it
against the rendered PDF, and record the printed page number separately when
it differs.

Label historical background as context. Do not present it as evidence for a pre-Hispanic date, culture, excavation, or artifact.

## Data rules

- Leave period and culture arrays empty when the sources do not support an assignment.
- Use the latest documented field visit, survey, excavation, site recording, or condition assessment for `lastInvestigatedYear`.
- Record every substantiated study in `site-study-history.ts`, distinguishing fieldwork, formal recording, collection analysis, archival synthesis, condition assessment, and reinterpretation.
- A later analysis or reinterpretation belongs in the study history and may become the atlas's “Latest study,” but it does not replace the separate last-field-investigation value.
- Do not use a publication year as an investigation or study year merely because it appears in a title or citation. Count it only when the source itself constitutes a substantive new analysis, synthesis, or reinterpretation, and label that activity explicitly.
- Preserve ranges, “by” dates, decades, and uncertainty in the display label. Use the endpoint only for ordering and filtering; do not present it as an exact field season.
- Do not identify pottery, burials, architecture, tools, or other finds unless a source names them.
- Do not infer excavation methods from generic language such as “investigated” or “registered.”
- Do not turn a regional interpretation into a site-specific conclusion.
- Do not add claims because they sound archaeologically plausible.

## Final check

Before finishing a record, confirm:

- Every public sentence has a source and page.
- The description distinguishes observation, inference, and context.
- Unsupported detail has been removed. It has not been softened into vague wording.
- The site label matches the documented work.
- Coordinate precision matches the archaeological evidence.
- Unknown dates, cultures, methods, and finds remain unknown.
- Source links open the relevant page.
- The description is understandable without knowing the researchers or publications.
- The final diff changes only the requested stable site ID and any strictly
  necessary source reference for that site.
- `npm run typecheck` and `npm run build` pass in `app/`.

Report which claims were removed or corrected and which uncertainties remain. The goal is a defensible map record, not a complete story where the sources do not provide one.

## Delegated audit closeout

When a parent agent delegates a single-site audit, the subagent should finish
the evidence review and edit before running validation. Run `git diff --check`,
`npm run typecheck`, and `npm run build` once on the final edit. Return the claim
matrix, before-and-after text, changed fields, remaining uncertainties, and
validation results to the parent. The parent owns structured autoreview and
Martian closeout unless the delegation explicitly assigns those tasks to the
subagent.
