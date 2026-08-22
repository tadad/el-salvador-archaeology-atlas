# “What was found here” tags

The atlas uses one `finds` array of plain-string tags. These sixteen broad
categories support map filtering without implying more precision than the
sources provide.

```yaml
finds:
  - "ceramics"
  - "lithics-stone-tools"
  - "architecture"
```

An empty `finds: []` means that the Place description and its cited public
sources do not describe evidence that supports one of these tags. Every mapped
Place receives the field after manual review.

## Controlled tags

| ID | Public label | Apply when the cited source describes |
| --- | --- | --- |
| `architecture` | Architecture | Buildings, structures, foundations, floors, walls, platforms, terraces, paving, hydraulic works, or other constructed features. |
| `ceramics` | Ceramics | Pottery, sherds, vessels, figurines, censers, ceramic instruments, pipes, bricks, tiles, or other fired-clay objects. |
| `mounds-pyramids` | Mounds & pyramids | Artificial mounds, pyramids, or mound groups. Do not infer this tag from a place name. |
| `burials-human-remains` | Burials & human remains | Burials, graves, cemeteries, urn burials, human bone, teeth, skeletons, crypts, catacombs, or burial vaults. |
| `lithics-stone-tools` | Lithics & stone tools | Obsidian, chipped stone, ground stone, blades, flakes, points, manos, metates, or other stone artifacts and production debris. |
| `industrial-works-machinery` | Industrial works & machinery | Indigo works, ironworks, coffee mills, production installations, industrial machinery, or vessel machinery. |
| `agriculture-cultivation` | Agriculture & cultivation | Paleofields, cultivated surfaces, agricultural terraces, furrows, ridges, planting positions, or preserved crops. |
| `plazas-ballcourts` | Plazas & ballcourts | Plazas, courts, ballcourts, or architecture explicitly arranged around such spaces. |
| `historical-materials` | Historical materials | Colonial or Republican-period glass, majolica, porcelain, metalwork, bottles, pipes, tiles, inscriptions, or comparable portable material. |
| `shipwreck-vessel-remains` | Shipwrecks & vessel remains | Confirmed physical remains of wrecked watercraft, hulls, boilers, propulsion systems, anchors, rigging, superstructure, or wreckage. Documentary losses without located remains do not qualify. |
| `middens-refuse` | Middens & refuse | Middens, refuse pits, trash deposits, or other concentrated discard. |
| `shell-faunal-bone` | Shell, faunal & bone remains | Mollusc shell, faunal remains, animal bone or teeth, worked bone, worked shell, or food remains. Human remains use the burial tag. |
| `fire-features` | Fire features | Hearths, fire pits, ovens, kilns, burned features, charcoal-bearing features, or clearly described burned destruction deposits. |
| `stone-sculpture-monuments` | Stone sculpture & monuments | Stone sculpture, statues, carved heads, potbellies, stelae, carved plaques, altars, monoliths, or other carved stone monuments. |
| `rock-art` | Rock art | Petroglyphs, pictographs, rock paintings, cupules, painted hands, or other deliberate images on living rock or boulders. |
| `jade-greenstone` | Jade & greenstone | Jade, jadeite, greenstone, or piedra verde objects. Green obsidian remains a lithics tag. |

## Assignment rules

1. Prefer false negatives to false positives. Assign a tag only when the Place
   description or its cited source states the evidence.
2. Do not infer finds from site names, periods, cultural assignments,
   architecture typical of a period, or objects known only from nearby sites.
3. Broad source language receives a broad tag. “Archaeological material” alone
   does not support any tag.
4. Tags can overlap. A shell midden can receive `middens-refuse` and
   `shell-faunal-bone`; a stone mound around a plaza can receive
   `architecture`, `mounds-pyramids`, and `plazas-ballcourts`.
5. Reported but unlocated ship losses receive no physical-find tag until wreck
   remains are confirmed.
6. The atlas filter derives **Not described** from an empty array. It is not a
   seventeenth tag.

## Research basis

The controlled list comes from a manual review of all 231 mapped Place
descriptions and focused checks of their linked Paper records. Consequential
category distinctions were checked against the original PDFs and their
one-based page numbers.

The vocabulary also follows the broad separation used by
[FISH Terminologies](https://heritage-standards.org.uk/fish-vocabularies/)
between objects, built features, evidence, monuments, materials, and maritime
remains. UNESCO similarly distinguishes underwater sites, structures,
artifacts, human remains, vessels and vessel parts, and cargo in the
[2001 Underwater Cultural Heritage Convention](https://www.unesco.org/en/legal-affairs/convention-protection-underwater-cultural-heritage).
