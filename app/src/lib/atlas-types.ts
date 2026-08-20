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
