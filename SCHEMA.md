# Record Schema and Evidence Taxonomy

## Vault ontology

The Obsidian vault models two record types. A Paper owns its links to canonical
Author records. Obsidian backlinks provide the reverse Author-to-Paper view, so
the relationship is stored once.

### Paper records

Paper notes live under `vault/Papers/`. Their bodies preserve the full OCR text
under one-based `## Page N` headings.

| Field | Meaning |
| --- | --- |
| `type` | Always `paper` |
| `paper_id` | Stable identifier derived from the archived PDF stem |
| `title` | Bibliographic title |
| `authors` | Links to canonical records under `vault/Authors/` |
| `editors` | Canonical Author links for explicitly identified editors |
| `translators` | Canonical Author links for explicitly identified translators |
| `creator_raw` | Unmodified contributor string from the source catalogue |
| `publication_year` | Four-digit year when the document has one publication year |
| `publication_date` | Exact ISO date when the catalogue supplies one |
| `work_type` | Bibliographic form such as `article`, `report`, or `book` |
| `languages` | ISO 639-1 document-language codes |
| `collection` | Acquisition collection |
| `pdf` | Vault-relative link to the archived PDF |
| `source_url` | Original download or repository URL |
| `source_sha256` | Checksum of the archived PDF |
| `pages` | PDF page count |
| `extraction_status` | `complete` or `partial` machine-text coverage |
| `embedded_pages` | Pages populated from embedded PDF text |
| `ocr_pages` | Pages populated through OCR |
| `unrecognized_pages` | Pages with no detected machine-readable text |
| `review_status` | Human review state; defaults to `unreviewed` |

`tools/convert_pdfs_to_markdown.py` generates extraction properties, the
extraction manifest, and the region between `<!-- ocr:start -->` and
`<!-- ocr:end -->`. `tools/build_vault_ontology.py` manages identity and
bibliographic properties and reconciles extraction properties from that
manifest. Both tools preserve other top-level properties, including future
`sites` links, and retain the editable `## Notes` section. They fail closed when
an existing Paper lacks one valid OCR marker pair, so ambiguous body text is
never replaced automatically.

### Author records

Author notes live under `vault/Authors/`.

| Field | Meaning |
| --- | --- |
| `type` | Always `author` |
| `author_id` | Stable canonical identity key |
| `name` | Preferred display name |
| `sort_name` | Name ordered for alphabetical sorting |
| `author_kind` | `person` or `organization` |
| `aliases` | Attested catalogue variants that resolve to this identity |

The normalized registries live in `_data/authors.json`,
`_data/paper-authors.json`, and `_data/paper-metadata.json`. Generated notes do
not replace those registries as the reproducible source of identity decisions.

## Topic discovery records

Topic records use YAML front matter so they remain readable as Markdown and
can later be imported into SQLite.

## Core fields

| Field | Meaning |
| --- | --- |
| `id` | Wikidata QID where available; otherwise a language/title key |
| `title` | Preferred title, normally Spanish first |
| `kind` | `site`, `culture`, `people`, `polity`, `artifact`, `person`, `event`, `tradition`, `legend`, `landscape`, `source-subject`, or `other` |
| `evidence` | Evidence assessment from the vocabulary below |
| `review_status` | `machine-discovered`, `partially-reviewed`, or `reviewed` |
| `countries` | Modern geographic tags; these do not imply ancient borders |
| `el_salvador_connection` | Why the record meets the corpus inclusion rule |
| `wikidata` | Wikidata entity URL, when available |
| `coordinates` | Article coordinates, which may be approximate |
| `wikipedia` | Language-to-article URL mapping |
| `discovered_from` | Categories, searches, or curated seeds that found it |
| `source_leads` | Promising external citations exposed during discovery |
| `retrieved` | Retrieval date |

## Evidence labels

- `archaeologically-corroborated`: material remains are documented by
  professional archaeology or a comparably strong institutional source.
- `historically-attested`: contemporary or near-contemporary documents support
  the historical core, without implying archaeological confirmation.
- `ethnohistorically-documented`: recorded in Indigenous, colonial,
  ethnographic, or oral-history sources that require contextual reading.
- `oral-tradition`: documented as a living or remembered community tradition;
  antiquity is not assumed.
- `legendary`: principally folklore, myth, a legendary person/place, or a
  supernatural narrative.
- `disputed`: a concrete interpretation is contested or rests on weak or
  ambiguous evidence.
- `obsolete-interpretation`: historically important scholarly claim no longer
  accepted in its original form.
- `debunked-or-pseudoscientific`: rejected by relevant scholarship or founded
  on fabrication or pseudoscience.
- `mixed`: distinct parts of the subject carry different evidence statuses.
- `unassessed`: included for breadth but not yet evaluated.

## Source levels

1. `primary`: manuscript, early printed account, artifact, map, field notes,
   excavation report, catalogue, photograph, dataset, or direct oral-history
   recording/transcription.
2. `strong-secondary`: peer-reviewed research, academic monograph, critical
   edition, thesis with original research, or synthesis by a museum, university,
   heritage body, or archaeological agency.
3. `discovery-secondary`: Wikipedia and other overviews useful for finding
   stronger material.
4. `weak-or-popular`: tourism, unsourced retellings, entertainment, and most
   general news; retained only to track reception or claim propagation.

## Regional relevance labels

- `direct`: located in or specifically about El Salvador.
- `cross-border`: concerns a cultural, linguistic, ecological, political, or
  trade network crossing El Salvador's modern borders.
- `source-mention`: a source centered elsewhere contains substantive Salvadoran
  material.
- `comparative`: necessary comparison for interpreting a specific Salvadoran
  record; use sparingly.
