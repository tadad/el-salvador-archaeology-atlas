export type Precision = "published" | "landmark" | "approx";

export type AtlasPlace = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  precision: Precision;
  kind: string;
  basis: string;
  note: string;
  periods: string[];
  cultures: string[];
  latestStudyYear: number | null;
  latestStudyLabel: string | null;
  latestStudyKind: string | null;
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
};

export const precisionMeta: Record<
  Precision,
  { label: string; shortLabel: string; description: string }
> = {
  published: {
    label: "Published coordinate",
    shortLabel: "Published",
    description: "A coordinate printed in or calculated directly from the source.",
  },
  landmark: {
    label: "Site or landmark",
    shortLabel: "Landmark",
    description: "A known site, church, estate, community, or mapped feature.",
  },
  approx: {
    label: "Approximate area",
    shortLabel: "Approximate",
    description: "A best-fit location reconstructed from the paper’s description.",
  },
};

export const studyKindLabels: Record<string, string> = {
  fieldwork: "Fieldwork",
  "site-recording": "Site recording",
  "collection-analysis": "Collection analysis",
  reinterpretation: "Reinterpretation",
  "condition-assessment": "Condition assessment",
  "archival-synthesis": "Archival synthesis",
  discovery: "Discovery",
};
