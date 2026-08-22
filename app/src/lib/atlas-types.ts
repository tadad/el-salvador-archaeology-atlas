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
};
