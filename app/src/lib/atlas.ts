import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { AtlasData, AtlasPlace, CoordinateMethod, TaxonomyEntry } from "@/lib/atlas-types";

type StoredCoordinatePrecision = "published" | "landmark" | "approx";

const coordinateMethodByPrecision: Record<StoredCoordinatePrecision, CoordinateMethod> = {
  published: "published",
  landmark: "mapped",
  approx: "reconstructed",
};
const allowedCoordinatePrecisions = new Set(Object.keys(coordinateMethodByPrecision));
let atlasCache: AtlasData | undefined;

function vaultRoot(): string {
  const candidates = [path.resolve(process.cwd(), "..", "vault"), path.resolve(process.cwd(), "vault")];
  const match = candidates.find((candidate) => fs.existsSync(path.join(candidate, "Places")));
  if (!match) throw new Error(`Could not locate the Obsidian vault from ${process.cwd()}`);
  return match;
}

function markdownFiles(directory: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(directory, entry.name));
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function optionalYear(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function wikiLabel(value: string): string {
  const match = value.match(/^\[\[([^|\]]+)(?:\|([^\]]+))?\]\]$/);
  if (!match) throw new Error(`Expected an Obsidian link, received ${value}`);
  return match[2] || path.basename(match[1].split("#", 1)[0]);
}

function wikiTarget(value: string): string {
  const match = value.match(/^\[\[([^|\]]+)(?:\|[^\]]+)?\]\]$/);
  if (!match) throw new Error(`Expected an Obsidian link, received ${value}`);
  return match[1].split("#", 1)[0];
}

function stripLeadingTitle(markdown: string): string {
  return markdown.replace(/^\s*# [^\n]+\n+/, "").trimStart();
}

function webMarkdown(markdown: string): string {
  return markdown.replace(
    /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,
    (_match, target: string, label: string | undefined) => {
      const [filename, heading] = target.split("#", 2);
      const display = label || path.basename(filename);
      if (!filename.startsWith("Papers/")) return display;
      const slug = filename.slice("Papers/".length);
      const anchor = heading?.match(/^Page (\d+)$/)?.[1];
      return `[${display}](/sources/papers/${encodeURIComponent(slug)}${anchor ? `#page-${anchor}` : ""})`;
    },
  );
}

function taxonomy(directory: string, type: "period" | "culture"): TaxonomyEntry[] {
  return markdownFiles(directory)
    .map((filename) => {
      const parsed = matter(fs.readFileSync(filename, "utf8"));
      if (parsed.data.type !== type) throw new Error(`Expected ${type} record in ${filename}`);
      return {
        id: String(parsed.data[`${type}_id`] || path.basename(filename, ".md")),
        name: String(parsed.data.name || path.basename(filename, ".md")),
        description: stripLeadingTitle(parsed.content).trim(),
        sortOrder: Number(parsed.data.sort_order || 0),
      };
    })
    .sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name));
}

function placeRecord(filename: string): AtlasPlace | null {
  const parsed = matter(fs.readFileSync(filename, "utf8"));
  if (parsed.data.type !== "place") throw new Error(`Expected place record in ${filename}`);
  if (parsed.data.atlas !== true) return null;

  const id = String(parsed.data.place_id || path.basename(filename, ".md"));
  const coordinatePrecision = String(parsed.data.coordinate_precision);
  const lat = Number(parsed.data.latitude);
  const lon = Number(parsed.data.longitude);
  if (!allowedCoordinatePrecisions.has(coordinatePrecision)) {
    throw new Error(`Invalid coordinate precision on ${id}`);
  }
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error(`Invalid atlas coordinate on ${id}`);
  // `papers` contains only vault Paper entities. External-only citations stay
  // as direct links in the Place body's Sources section.
  for (const paper of strings(parsed.data.papers)) {
    const target = wikiTarget(paper);
    if (!target.startsWith("Papers/") || !fs.existsSync(path.join(vaultRoot(), `${target}.md`))) {
      throw new Error(`Broken Paper link ${paper} on ${id}`);
    }
  }

  return {
    id,
    name: String(parsed.data.name || id),
    lat,
    lon,
    coordinateMethod: coordinateMethodByPrecision[coordinatePrecision as StoredCoordinatePrecision],
    kind: String(parsed.data.place_kind || "Place"),
    basis: String(parsed.data.coordinate_basis || "Not documented"),
    note: String(parsed.data.coordinate_note || ""),
    periods: strings(parsed.data.periods).map(wikiLabel),
    cultures: strings(parsed.data.cultures).map(wikiLabel),
    latestStudyYear: optionalYear(parsed.data.latest_study_year),
    latestStudyLabel: parsed.data.latest_study_label ? String(parsed.data.latest_study_label) : null,
    lastFieldworkYear: optionalYear(parsed.data.last_fieldwork_year),
    lastFieldworkLabel: parsed.data.last_fieldwork_label
      ? String(parsed.data.last_fieldwork_label)
      : optionalYear(parsed.data.last_fieldwork_year)?.toString() ?? null,
    body: webMarkdown(stripLeadingTitle(parsed.content)),
  };
}

function validateAtlas(data: AtlasData): void {
  const ids = new Set<string>();
  const periodNames = new Set(data.periods.map((entry) => entry.name));
  const cultureNames = new Set(data.cultures.map((entry) => entry.name));
  for (const place of data.places) {
    if (ids.has(place.id)) throw new Error(`Duplicate place_id: ${place.id}`);
    ids.add(place.id);
    for (const period of place.periods) {
      if (!periodNames.has(period)) throw new Error(`Unknown period ${period} on ${place.id}`);
    }
    for (const culture of place.cultures) {
      if (!cultureNames.has(culture)) throw new Error(`Unknown culture ${culture} on ${place.id}`);
    }
  }
}

export function getAtlasData(): AtlasData {
  if (atlasCache) return atlasCache;
  const root = vaultRoot();
  const data = {
    places: markdownFiles(path.join(root, "Places"))
      .map(placeRecord)
      .filter((place): place is AtlasPlace => place !== null),
    periods: taxonomy(path.join(root, "Periods"), "period"),
    cultures: taxonomy(path.join(root, "Cultures"), "culture"),
  };
  validateAtlas(data);
  atlasCache = data;
  return data;
}
