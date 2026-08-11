export type Precision = "published" | "landmark" | "approx";

export type AtlasPlace = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  precision: Precision;
  precisionLabel: string;
  precisionShortLabel: string;
  precisionDescription: string;
  kind: string;
  basis: string;
  note: string;
  periods: string[];
  cultures: string[];
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
};
