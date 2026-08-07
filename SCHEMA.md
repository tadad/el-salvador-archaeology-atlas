# Record Schema and Evidence Taxonomy

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
