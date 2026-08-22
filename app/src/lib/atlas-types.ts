export type CoordinateMethod = "published" | "mapped" | "reconstructed";
export type LocationStatus = "located" | "approximate";

export const locationStatusOrder: readonly LocationStatus[] = ["located", "approximate"];

export const locationStatusMeta: Record<
  LocationStatus,
  { label: string; description: string }
> = {
  located: {
    label: "Located",
    description:
      "Anchored to a source-published coordinate or a known mapped reference point.",
  },
  approximate: {
    label: "Approximate",
    description: "A best-fit area reconstructed from the cited sources.",
  },
};

export const coordinateMethodMeta: Record<
  CoordinateMethod,
  { label: string; description: string }
> = {
  published: {
    label: "Source-published coordinate",
    description: "The coordinate is printed in or calculated directly from a cited source.",
  },
  mapped: {
    label: "Mapped reference point",
    description:
      "The marker is fixed to a known site, park, building, community, or geographic feature.",
  },
  reconstructed: {
    label: "Reconstructed estimate",
    description: "The marker is a best-fit placement derived from the source description.",
  },
};

export function locationStatusFor(method: CoordinateMethod): LocationStatus {
  return method === "reconstructed" ? "approximate" : "located";
}

export const findsTaxonomy = [
  {
    id: "architecture",
    name: "Architecture",
    description: "Buildings, walls, foundations, floors, terraces, platforms, and other constructed features.",
    sortOrder: 1,
  },
  {
    id: "ceramics",
    name: "Ceramics",
    description: "Pottery vessels, sherds, figurines, and other fired-clay objects.",
    sortOrder: 2,
  },
  {
    id: "mounds-pyramids",
    name: "Mounds & pyramids",
    description: "Earthen or masonry mounds, pyramids, and monumental raised structures.",
    sortOrder: 3,
  },
  {
    id: "burials-human-remains",
    name: "Burials & human remains",
    description: "Graves, tombs, funerary deposits, and human skeletal remains.",
    sortOrder: 4,
  },
  {
    id: "lithics-stone-tools",
    name: "Lithics & stone tools",
    description: "Chipped stone, ground stone, obsidian, projectile points, and stone tools.",
    sortOrder: 5,
  },
  {
    id: "industrial-works-machinery",
    name: "Industrial works & machinery",
    description: "Historic production works, mills, machinery, boilers, engines, and related equipment.",
    sortOrder: 6,
  },
  {
    id: "agriculture-cultivation",
    name: "Agriculture & cultivation",
    description: "Cultivated fields, planting beds, agricultural terraces, and preserved crops or plants.",
    sortOrder: 7,
  },
  {
    id: "plazas-ballcourts",
    name: "Plazas & ballcourts",
    description: "Formal plazas, courtyards, ballcourts, and structures that define them.",
    sortOrder: 8,
  },
  {
    id: "historical-materials",
    name: "Historical materials",
    description: "Colonial or Republican-period artifacts and deposits, including glass and metalwork.",
    sortOrder: 9,
  },
  {
    id: "shipwreck-vessel-remains",
    name: "Shipwrecks & vessel remains",
    description: "Located wreck sites, hull remains, vessel fittings, and associated watercraft remains.",
    sortOrder: 10,
  },
  {
    id: "middens-refuse",
    name: "Middens & refuse",
    description: "Middens, dumps, refuse deposits, and concentrated domestic waste.",
    sortOrder: 11,
  },
  {
    id: "shell-faunal-bone",
    name: "Shell, faunal & bone remains",
    description: "Shell, animal bone, teeth, and other faunal remains.",
    sortOrder: 12,
  },
  {
    id: "fire-features",
    name: "Fire features",
    description: "Hearths, ovens, kilns, burned features, and clearly identified destruction deposits.",
    sortOrder: 13,
  },
  {
    id: "stone-sculpture-monuments",
    name: "Stone sculpture & monuments",
    description: "Carved stone sculpture, stelae, altars, monuments, and other worked ceremonial stones.",
    sortOrder: 14,
  },
  {
    id: "rock-art",
    name: "Rock art",
    description: "Petroglyphs, pictographs, and other imagery made on rock surfaces.",
    sortOrder: 15,
  },
  {
    id: "jade-greenstone",
    name: "Jade & greenstone",
    description: "Jade, jadeite, greenstone ornaments, and worked greenstone objects.",
    sortOrder: 16,
  },
] as const satisfies readonly TaxonomyEntry[];

export const techniquesTaxonomy = [
  {
    id: "pedestrian-survey",
    name: "Pedestrian survey",
    description: "Walkovers, reconnaissance, site inspections, and systematic transects.",
    sortOrder: 1,
  },
  {
    id: "surface-collection",
    name: "Surface collection",
    description: "Systematic or selective collection of artifacts visible on the ground surface.",
    sortOrder: 2,
  },
  {
    id: "excavation",
    name: "Excavation",
    description: "Test pits, trenches, controlled excavation, and rescue or salvage excavation.",
    sortOrder: 3,
  },
  {
    id: "mapping-surveying",
    name: "Mapping & surveying",
    description: "GPS/GNSS, total-station, topographic, planimetric, and architectural mapping.",
    sortOrder: 4,
  },
  {
    id: "aerial-satellite-imagery",
    name: "Aerial & satellite imagery",
    description: "Aerial, helicopter, drone, satellite, and Google Earth imagery used to investigate a site.",
    sortOrder: 5,
  },
  {
    id: "lidar-laser-scanning",
    name: "LiDAR & laser scanning",
    description: "Airborne, terrestrial, or handheld LiDAR and laser-scanning documentation.",
    sortOrder: 6,
  },
  {
    id: "detailed-visual-documentation",
    name: "Detailed visual documentation",
    description: "Photogrammetry, 3D models, digital reconstruction, systematic photography, and rock-art tracing.",
    sortOrder: 7,
  },
  {
    id: "geophysical-survey",
    name: "Geophysical survey",
    description: "GPR, magnetometry, magnetic gradiometry, electrical conductivity, susceptibility, and resistivity.",
    sortOrder: 8,
  },
  {
    id: "gis-spatial-analysis",
    name: "GIS & spatial analysis",
    description: "GIS mapping, viewsheds, least-cost paths, settlement modeling, and archaeoastronomical analysis.",
    sortOrder: 9,
  },
  {
    id: "underwater-survey",
    name: "Underwater survey",
    description: "Diving, submerged-site reconnaissance, underwater recording, and archaeological recovery.",
    sortOrder: 10,
  },
  {
    id: "archival-historical-research",
    name: "Archival & historical research",
    description: "Archival documents, historical maps, cadastral records, registries, ethnohistory, and toponymy.",
    sortOrder: 11,
  },
  {
    id: "oral-history-ethnography",
    name: "Oral history & ethnography",
    description: "Interviews, oral traditions, community testimony, and ethnographic observation.",
    sortOrder: 12,
  },
  {
    id: "artifact-analysis",
    name: "Artifact analysis",
    description: "Ceramic and lithic analysis, typology, use-wear, iconography, and technological study.",
    sortOrder: 13,
  },
  {
    id: "archaeometry-compositional-analysis",
    name: "Archaeometry & compositional analysis",
    description: "NAA, XRF, XRD, FTIR, SEM, microscopy, pigment analysis, and material sourcing.",
    sortOrder: 14,
  },
  {
    id: "chronometric-dating",
    name: "Chronometric dating",
    description: "Radiocarbon and AMS dating, Bayesian chronology, obsidian hydration, and comparable absolute dating methods.",
    sortOrder: 15,
  },
  {
    id: "bioenvironmental-analysis",
    name: "Bioenvironmental analysis",
    description: "Plant, pollen, phytolith, faunal, human-remains, osteological, paleopathological, and isotope analysis.",
    sortOrder: 16,
  },
  {
    id: "geoarchaeology",
    name: "Geoarchaeology",
    description: "Soil, sediment, tephra, stratigraphic, micromorphological, and depositional analysis.",
    sortOrder: 17,
  },
] as const satisfies readonly TaxonomyEntry[];

export type AtlasPlace = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  coordinateMethod: CoordinateMethod;
  kind: string;
  basis: string;
  note: string;
  periods: string[];
  cultures: string[];
  finds: string[];
  techniques: string[];
  latestStudyYear: number | null;
  latestStudyLabel: string | null;
  lastFieldworkYear: number | null;
  lastFieldworkLabel: string | null;
  body: string;
};

export type TaxonomyEntry = {
  id: string;
  name: string;
  description: string;
  sortOrder: number;
};

export type AtlasData = {
  places: AtlasPlace[];
  periods: TaxonomyEntry[];
  cultures: TaxonomyEntry[];
  finds: readonly TaxonomyEntry[];
  techniques: readonly TaxonomyEntry[];
};
