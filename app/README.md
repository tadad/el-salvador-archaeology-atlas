# El Salvador Archaeology Atlas

An interactive map built from the Place records in the Obsidian vault. Every
place links to locally mirrored Paper records and exact source pages; citations
that are not mirrored remain direct external links. Place documents distinguish
the latest field investigation from later collection analysis, archival
synthesis, and reinterpretation instead of substituting publication dates for
field seasons.

The web wiki is also vault-driven. At build time it discovers every top-level
vault folder containing Markdown records with a `type` property, then generates
the collection index, record pages, properties, Obsidian links, and backlinks.
New ontology types and fields do not require a new React page or stylesheet.

## Run it

```bash
cd central-america-el-salvador/app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run lidar:download` mirrors the 2014 10 m LiDAR-derived DEM tile pyramid
for zoom levels 7 through 14 into `public/lidar/dem-2014-elevation-v1`. The
downloader converts the source grayscale raster to a blue-low, red-high
elevation ramp, resumes partial downloads, and verifies that every response is
a PNG before it is saved. The colorized tile pyramid is versioned so clean
deployments include it; the source grayscale cache remains ignored. The app
serves these tiles from its own origin with immutable cache headers.
OpenStreetMap remains available through the Streets toggle and requires an
internet connection.

Source buttons open the original PDFs hosted by FUNDAR, Cultura, Asociación
Tikal, UES, UTEC, FAMSI, and other source repositories. The raw PDF archive is
intentionally not part of the Git repository; original URLs and file hashes
remain recorded in the corpus manifests and Markdown derivatives.
