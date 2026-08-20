import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const sourceTemplate =
  "https://d3.snet.gob.sv/geoserver/gwc/service/wmts/rest/Datacube:DEM_LiDAR-2014_10m/Datacube:Modelo_Elevacion_Grises/EPSG:900913/EPSG:900913:{z}/{y}/{x}?format=image/png";
const bounds = {
  west: -90.140741735,
  south: 13.148755033,
  east: -87.673775302,
  north: 14.453935556,
};
const defaultMinZoom = 7;
const defaultMaxZoom = 14;
const defaultConcurrency = 8;
const maxAttempts = 3;
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const appDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const lidarDirectory = join(appDirectory, "public", "lidar");
const grayscaleCacheDirectory = join(lidarDirectory, "dem-2014");
const outputDirectory = join(lidarDirectory, "dem-2014-elevation-v1");
// The source style maps low elevation to 0 and high elevation to 255.
const elevationRamp = [
  { value: 0, color: [33, 79, 120] },
  { value: 32, color: [79, 134, 168] },
  { value: 64, color: [169, 198, 211] },
  { value: 91, color: [229, 223, 204] },
  { value: 128, color: [213, 138, 108] },
  { value: 182, color: [179, 68, 63] },
  { value: 255, color: [111, 29, 43] },
];

function readIntegerOption(name, fallback) {
  const optionIndex = process.argv.indexOf(name);
  if (optionIndex === -1) return fallback;

  const value = Number(process.argv[optionIndex + 1]);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${name} must be followed by a non-negative integer.`);
  }

  return value;
}

function longitudeToTileX(longitude, zoom) {
  return Math.floor(((longitude + 180) / 360) * 2 ** zoom);
}

function latitudeToTileY(latitude, zoom) {
  const radians = (latitude * Math.PI) / 180;
  return Math.floor(
    ((1 - Math.asinh(Math.tan(radians)) / Math.PI) / 2) * 2 ** zoom,
  );
}

function tilesForZoom(zoom) {
  const minX = longitudeToTileX(bounds.west, zoom);
  const maxX = longitudeToTileX(bounds.east, zoom);
  const minY = latitudeToTileY(bounds.north, zoom);
  const maxY = latitudeToTileY(bounds.south, zoom);
  const tiles = [];

  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) {
      tiles.push({ x, y, zoom });
    }
  }

  return tiles;
}

async function hasCompleteTile(path) {
  try {
    return (await stat(path)).size > pngSignature.length;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function tileUrl({ x, y, zoom }) {
  return sourceTemplate
    .replace("{z}", String(zoom))
    .replace("{x}", String(x))
    .replace("{y}", String(y));
}

function tilePath(directory, { x, y, zoom }) {
  return join(directory, String(zoom), String(x), `${y}.png`);
}

function colorForSourceValue(value) {
  const upperIndex = elevationRamp.findIndex((stop) => stop.value >= value);
  if (upperIndex <= 0) return elevationRamp[0].color;

  const lower = elevationRamp[upperIndex - 1];
  const upper = elevationRamp[upperIndex];
  const amount = (value - lower.value) / (upper.value - lower.value);

  return lower.color.map((channel, index) =>
    Math.round(channel + (upper.color[index] - channel) * amount),
  );
}

const elevationPalette = Array.from({ length: 256 }, (_, value) =>
  colorForSourceValue(value),
);

async function colorizeTile(body) {
  const { data, info } = await sharp(body)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let offset = 0; offset < data.length; offset += info.channels) {
    const [red, green, blue] = elevationPalette[data[offset]];
    data[offset] = red;
    data[offset + 1] = green;
    data[offset + 2] = blue;
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png({ palette: true, colours: 256 })
    .toBuffer();
}

async function readGrayscaleCache(tile) {
  const path = tilePath(grayscaleCacheDirectory, tile);
  if (!(await hasCompleteTile(path))) return null;

  const body = await readFile(path);
  return body.subarray(0, pngSignature.length).equals(pngSignature) ? body : null;
}

async function downloadTile(tile) {
  const destination = tilePath(outputDirectory, tile);

  if (await hasCompleteTile(destination)) return "skipped";

  await mkdir(dirname(destination), { recursive: true });
  const cachedBody = await readGrayscaleCache(tile);
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      let body = cachedBody;

      if (!body) {
        const response = await fetch(tileUrl(tile));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const contentType = response.headers.get("content-type") ?? "";
        if (!contentType.startsWith("image/png")) {
          throw new Error(`unexpected content type ${contentType || "unknown"}`);
        }

        body = Buffer.from(await response.arrayBuffer());
      }

      if (!body.subarray(0, pngSignature.length).equals(pngSignature)) {
        throw new Error("response does not have a PNG signature");
      }

      const temporaryDestination = `${destination}.part`;
      await writeFile(temporaryDestination, await colorizeTile(body));
      await rename(temporaryDestination, destination);
      return "downloaded";
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (attempt - 1)));
      }
    }
  }

  throw new Error(`Failed ${tile.zoom}/${tile.x}/${tile.y}: ${lastError?.message}`);
}

async function main() {
  const minZoom = readIntegerOption("--min-zoom", defaultMinZoom);
  const maxZoom = readIntegerOption("--max-zoom", defaultMaxZoom);
  const concurrency = readIntegerOption("--concurrency", defaultConcurrency);

  if (minZoom > maxZoom) throw new Error("--min-zoom cannot exceed --max-zoom.");
  if (concurrency === 0) throw new Error("--concurrency must be at least 1.");

  const tiles = [];
  for (let zoom = minZoom; zoom <= maxZoom; zoom += 1) {
    tiles.push(...tilesForZoom(zoom));
  }

  let nextIndex = 0;
  let downloaded = 0;
  let skipped = 0;
  const startedAt = Date.now();

  console.log(
    `Downloading ${tiles.length.toLocaleString()} tiles for zooms ${minZoom}–${maxZoom} to ${outputDirectory}`,
  );

  async function worker() {
    while (nextIndex < tiles.length) {
      const tileIndex = nextIndex;
      nextIndex += 1;
      const result = await downloadTile(tiles[tileIndex]);

      if (result === "downloaded") downloaded += 1;
      else skipped += 1;

      const complete = downloaded + skipped;
      if (complete % 100 === 0 || complete === tiles.length) {
        const elapsedSeconds = Math.max((Date.now() - startedAt) / 1000, 1);
        const rate = complete / elapsedSeconds;
        const remainingSeconds = (tiles.length - complete) / Math.max(rate, 0.01);
        console.log(
          `${complete.toLocaleString()}/${tiles.length.toLocaleString()} ` +
            `(${downloaded.toLocaleString()} downloaded, ${skipped.toLocaleString()} cached locally) ` +
            `~${Math.ceil(remainingSeconds / 60)} min remaining`,
        );
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  console.log("LiDAR tile download complete.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
