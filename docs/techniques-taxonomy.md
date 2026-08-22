# Archaeological investigation technique tags

The atlas uses one `techniques` array of plain-string tags. These seventeen
broad categories describe methods explicitly applied to a mapped site or to
material recovered from it.

```yaml
techniques:
  - "pedestrian-survey"
  - "mapping-surveying"
  - "excavation"
```

An empty `techniques: []` means that the Place description and its cited
sources do not securely document one of the controlled techniques. It does not
mean that the site has never been investigated.

## Controlled tags

| ID | Public label | Includes |
| --- | --- | --- |
| `pedestrian-survey` | Pedestrian survey | Walkovers, reconnaissance, site inspections, and systematic transects. |
| `surface-collection` | Surface collection | Systematic or selective collection of artifacts visible on the ground surface. |
| `excavation` | Excavation | Test pits, trenches, controlled excavation, and rescue or salvage excavation. |
| `mapping-surveying` | Mapping & surveying | GPS/GNSS, total-station, topographic, planimetric, and architectural mapping. |
| `aerial-satellite-imagery` | Aerial & satellite imagery | Aerial, helicopter, drone, satellite, and Google Earth imagery used to investigate a site. |
| `lidar-laser-scanning` | LiDAR & laser scanning | Airborne, terrestrial, or handheld LiDAR and laser-scanning documentation. |
| `detailed-visual-documentation` | Detailed visual documentation | Photogrammetry, 3D models, digital reconstruction, systematic photography, and rock-art tracing. |
| `geophysical-survey` | Geophysical survey | GPR, magnetometry, magnetic gradiometry, electrical conductivity, susceptibility, and resistivity. |
| `gis-spatial-analysis` | GIS & spatial analysis | GIS mapping, viewsheds, least-cost paths, settlement modeling, and archaeoastronomical analysis. |
| `underwater-survey` | Underwater survey | Diving, submerged-site reconnaissance, underwater recording, and archaeological recovery. |
| `archival-historical-research` | Archival & historical research | Archival documents, historical maps, cadastral records, registries, ethnohistory, and toponymy. |
| `oral-history-ethnography` | Oral history & ethnography | Interviews, oral traditions, community testimony, and ethnographic observation. |
| `artifact-analysis` | Artifact analysis | Ceramic and lithic analysis, typology, use-wear, iconography, and technological study. |
| `archaeometry-compositional-analysis` | Archaeometry & compositional analysis | NAA, XRF, XRD, FTIR, SEM, microscopy, pigment analysis, and material sourcing. |
| `chronometric-dating` | Chronometric dating | Radiocarbon and AMS dating, Bayesian chronology, obsidian hydration, and comparable absolute dating methods. |
| `bioenvironmental-analysis` | Bioenvironmental analysis | Plant, pollen, phytolith, faunal, human-remains, osteological, paleopathological, and isotope analysis. |
| `geoarchaeology` | Geoarchaeology | Soil, sediment, tephra, stratigraphic, micromorphological, and depositional analysis. |

## Assignment rules

1. Assign a tag only when a Place description or its cited source documents
   the method at that site or on material recovered from it.
2. Do not infer excavation from a burial, architecture from mapping, or
   underwater survey from a site's present inundation.
3. Planned but unused methods do not qualify. For example, Ciudad Vieja does
   not receive GPR merely because it was considered there.
4. Tags can overlap. Drone photogrammetry can support both
   `aerial-satellite-imagery` and `detailed-visual-documentation`; AMS work on
   human remains can support `chronometric-dating` and
   `bioenvironmental-analysis`.
5. Routine photographs do not qualify as detailed visual documentation unless
   photography, tracing, photogrammetry, or 3D recording formed a stated
   investigative method.
6. The atlas derives **Not described** from an empty array. It is not an
   eighteenth tag.

Assignments come from explicit method statements in the curated Place study
histories and focused checks of their linked Paper records. A paper's general
discussion of a technique is not enough; the source must connect the method to
the mapped site or to material recovered there.

## Scope note

The reviewed El Salvador papers document no site-specific deployment of
thermal, hyperspectral, or multispectral field imaging. FTIR is laboratory
spectroscopy and belongs under `archaeometry-compositional-analysis`, not
thermal imaging.
