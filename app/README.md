# El Salvador Archaeology Atlas

An interactive map of the excavation and maritime archaeology locations
identified in the El Salvador corpus. Every site links to the cited source PDF
and page. Site records distinguish the latest field investigation from later
collection analysis, archival synthesis, and reinterpretation, and expose the
full documented study history instead of substituting publication dates for
field seasons.

## Run it

```bash
cd central-america-el-salvador/app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The map uses OpenStreetMap tiles and needs an internet connection for the
basemap. Source buttons open the original PDFs hosted by FUNDAR, Cultura,
Asociación Tikal, UES, UTEC, FAMSI, and other source repositories. The raw PDF
archive is intentionally not part of the Git repository; original URLs and
file hashes remain recorded in the corpus manifests and Markdown derivatives.
