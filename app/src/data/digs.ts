export type Precision = "published" | "landmark" | "approx";

export type SourceRef = {
  file: string;
  pages: string;
  href: string;
  originalUrl: string;
  format?: "pdf" | "web";
  /** Site-specific guidance explaining exactly what the cited passage supports. */
  citationNote?: string;
};

export type Dig = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  precision: Precision;
  kind: string;
  basis: string;
  note: string;
  sources: SourceRef[];
};

const publisherUrls: Record<string, string> = {
  "2012-escamilla-fowler-practica-arqueologia.pdf":
    "https://www.asociaciontikal.com/wp-content/uploads/2017/03/036_Escamilla_y_Fowler.pdf",
  "2007-erquicia-los-gavilanes.pdf":
    "https://www.asociaciontikal.com/wp-content/uploads/2017/01/50.06_-_Erquicia.pdf",
  "1994-amaroli-hermes-velasquez-antiguo-cuscatlan.pdf":
    "https://www.asociaciontikal.com/wp-content/uploads/2016/11/46.93-Amaroli-et-al..pdf",
  "1998-coladan-pinturas-rupestres-oriente.pdf":
    "https://www.asociaciontikal.com/wp-content/uploads/2016/11/43.97_-_Elisenda.pdf",
  "anales-53.pdf":
    "https://www.cultura.gob.sv/download/revista-anales-53/?wpdmdl=3359",
  "anales-54.pdf":
    "https://www.cultura.gob.sv/download/revista-anales-54/?wpdmdl=3364",
  "anales-55.pdf":
    "https://www.cultura.gob.sv/download/revista-anales-55/?wpdmdl=3454",
  "anales-56.pdf":
    "https://www.cultura.gob.sv/download/revista-anales-56/?wpdmdl=3459",
  "identidades-18-arqueologia.pdf":
    "https://www.cultura.gob.sv/download/revista-identidades-18-2/?wpdmdl=89649",
  "anales-57-58.pdf":
    "https://www.cultura.gob.sv/download/revista-anales-57-y-58/?wpdmdl=3464",
};

function source(
  collection: "fundar" | "institutional",
  file: string,
  pages: string,
  firstPage: number,
): SourceRef {
  const remoteUrl =
    collection === "fundar"
      ? `https://fundar.org.sv/referencias/${file}`
      : publisherUrls[file];

  if (!remoteUrl) {
    throw new Error(`Missing publisher URL for ${file}`);
  }

  return {
    file,
    pages,
    href: `${remoteUrl}#page=${firstPage}`,
    originalUrl: "",
    format: "pdf",
  };
}

const fundar = (file: string, pages: string, firstPage = 1) =>
  source("fundar", file, pages, firstPage);

const institutional = (file: string, pages: string, firstPage: number) =>
  source("institutional", file, pages, firstPage);

function externalPdf(
  file: string,
  pages: string,
  url: string,
  firstPage = 1,
): SourceRef {
  return {
    file,
    pages,
    href: `${url}#page=${firstPage}`,
    originalUrl: "",
    format: "pdf",
  };
}

const uesMaritimeThesis = (
  pages: string,
  firstPage: number,
): SourceRef =>
  externalPdf(
    "patrimonio-cultural-subacuatico-el-salvador.pdf",
    pages,
    "https://repositorio.ues.edu.sv/server/api/core/bitstreams/3bd54975-6616-482c-8241-411538a74cbc/content",
    firstPage,
  );

const utecColonReport = (pages: string, firstPage: number): SourceRef =>
  externalPdf(
    "2013-gallardo-ss-colon.pdf",
    pages,
    "https://revistas.utec.edu.sv/index.php/koot/article/download/770/1350",
    firstPage,
  );

const utecSanBlasReport = (pages: string, firstPage: number): SourceRef =>
  externalPdf(
    "2012-gallardo-ss-san-blas.pdf",
    pages,
    "https://repositorio.utec.edu.sv/server/api/core/bitstreams/3adbbb73-749f-4b36-ae43-058b9ebb45ab/content",
    firstPage,
  );

const easternAtlas = (pages: string, firstPage: number): SourceRef =>
  externalPdf(
    "2007-ichon-urbanismo-arquitectura-oriente.pdf",
    pages,
    "https://www.famsi.org/reports/07070es/07070esCapitulos1y4.pdf",
    firstPage,
  );

const utecBallcourts = (pages: string, firstPage: number): SourceRef =>
  externalPdf(
    "2017-canchas-juego-pelota-oriente.pdf",
    pages,
    "https://biblioteca.utec.edu.sv/siab/virtual/tesis/941001110.pdf",
    firstPage,
  );

const utecSanLorenzo = (pages: string, firstPage: number): SourceRef =>
  externalPdf(
    "2016-loma-china-proyecto-san-lorenzo.pdf",
    pages,
    "https://biblioteca.utec.edu.sv/siab/virtual/tesis/941000733.pdf",
    firstPage,
  );

const utecConcheros = (pages: string, firstPage: number): SourceRef =>
  externalPdf(
    "asanyamba-concheros-golfo-fonseca.pdf",
    pages,
    "https://biblioteca.utec.edu.sv/siab/virtual/tesis/87502.pdf",
    firstPage,
  );

function web(file: string, url: string): SourceRef {
  return {
    file,
    pages: "Web source",
    href: url,
    originalUrl: "",
    format: "web",
  };
}

const anales56 = (pages: string, firstPage: number) =>
  institutional(
    "anales-56.pdf",
    pages,
    firstPage,
  );

const identidades18 = (pages: string, firstPage: number) =>
  institutional(
    "identidades-18-arqueologia.pdf",
    pages,
    firstPage,
  );

const elCaballitoPdf: SourceRef = {
  ...identidades18(
    "PDF pp. 89, 99, 107–108 (printed pp. 89, 99, 107–108), abstract, fig. 1, El Caballito entry, and route model",
    89,
  ),
  citationNote:
    "PDF p. 89 places the article’s study sites in the Early Postclassic (800–1200 CE), but this is a regional synthesis rather than a presentation of site-specific dating evidence. PDF p. 99, fig. 1, maps Caballito only at regional scale. PDF p. 107 places the site on top of Loma El Caballito at about 500 m above sea level, reports its discovery by the Costa del Bálsamo project in 2012, describes its landscape boundaries, and records ten mounds in two groups with at least four small plazas. It also notes a burned patch whose pre-Hispanic or modern origin is uncertain. PDF pp. 107–108 present modeled least-cost routes. The article provides no reproducible coordinate, controlled excavation, artifact inventory, or site-specific dating evidence.",
};

const texisioPdf: SourceRef = {
  ...identidades18(
    "PDF pp. 89, 99, 108 (printed pp. 89, 99, 108), abstract, fig. 1, and Texisio entry",
    89,
  ),
  citationNote:
    "PDF p. 89 places the article’s study sites in the Early Postclassic (800–1200 CE), but this is a regional synthesis rather than site-specific dating evidence. PDF p. 99, fig. 1, maps Texisio only at regional scale. PDF p. 108 places the site on the upper part of Cerro Texisio at about 281 m above sea level in Teotepeque, reports its discovery by the Costa del Bálsamo project in 2012, describes its landscape boundaries, records three mounds forming a small plaza, and presents modeled least-cost routes. The article provides no reproducible coordinate, controlled excavation, artifact inventory, or site-specific dating evidence.",
};

const cerroDeUlataPdf: SourceRef = {
  ...identidades18(
    "PDF pp. 89, 99, 109–110 (printed pp. 89, 99, 109–110), abstract, fig. 1, Cerro de Ulata entry, and route model",
    89,
  ),
  citationNote:
    "PDF p. 89 places the article’s study sites in the Early Postclassic (800–1200 CE), but this is a regional synthesis. PDF p. 99, fig. 1, maps Cerro de Ulata only at 1:100,000 scale. PDF p. 109 places it in Teotepeque at about 410 m above sea level; says the Izalco Project first described and mapped it; attributes it to the Guazapa phase from settlement pattern and ceramics; and records at least 25 mounds in eastern and western groups along two north–south ridge axes. PDF pp. 109–110 present modeled least-cost routes. The article provides no reproducible coordinate, controlled excavation, site boundary, or artifact inventory.",
};

const cerroDeUlataProjectHistoryPdf: SourceRef = {
  ...externalPdf(
    "2012-escamilla-fowler-practica-arqueologia.pdf",
    "PDF p. 6 (printed p. 432), Project Izalco history",
    "https://www.asociaciontikal.com/wp-content/uploads/2017/03/036_Escamilla_y_Fowler.pdf",
    6,
  ),
  citationNote:
    "PDF p. 6 (printed p. 432) dates the Izalco Project to 1988 and describes its regional survey in Sonsonate, Ahuachapán, and La Libertad. Read with the Cerro de Ulata entry in Identidades 18, this supports 1988 as the documented year of the project’s mapping; this page does not name Cerro de Ulata or give a site coordinate.",
};

const cerroDeUlataLootingPdf: SourceRef = {
  ...fundar(
    "testimony1.pdf",
    "PDF p. 13, Cerro de Ulata photograph and caption",
    13,
  ),
  citationNote:
    "PDF p. 13 photographs and captions a looters’ trench through Cerro de Ulata’s main pyramid. The testimony does not date the photograph or document a controlled excavation.",
};

const jicalapaPdf: SourceRef = {
  ...identidades18(
    "PDF pp. 89, 99, 110–111 (printed pp. 89, 99, 110–111), abstract, fig. 1, Jicalapa entry, and fig. 3 route model",
    89,
  ),
  citationNote:
    "PDF p. 89 places the article's study area in the Early Postclassic (800–1200 CE), but does not present site-specific dating evidence for Jicalapa. PDF p. 99, fig. 1, locates Jicalapa only on a 1:100,000 regional map. PDF p. 110 places the site south of modern Jicalapa on the upper part of Cerro La Nancera at about 475 m above sea level, reports its discovery by the Costa del Bálsamo project in 2010, describes its landscape limits, and records 18 structures—15 mounds in three groups on three terraces—plus some rectangular platform edges and stone alignments. PDF p. 111, fig. 3 and accompanying text, presents modeled least-cost routes. The article provides no reproducible coordinate, controlled excavation, artifact inventory, or site-specific dating evidence.",
};

const letreroDelDiabloPdf: SourceRef = {
  ...identidades18(
    "PDF pp. 89, 99, 111–112 (printed pp. 89, 99, 111–112), abstract, fig. 1, and El Letrero del Diablo entry",
    89,
  ),
  citationNote:
    "PDF p. 89 frames the regional study in the Early Postclassic (800–1200 CE), but does not independently date El Letrero del Diablo. PDF p. 99, fig. 1, maps the site only at 1:100,000 scale. PDF pp. 111–112 place it in Jicalapa municipality at about 140 m above sea level and on the east side of Quebrada Iscacuyo, also called El Cacao. PDF p. 112 describes a 50 × 8.5 m rock wall whose west-facing petroglyphs cover 10 × 2.7 m; reports mostly geometric designs, fewer anthropomorphic and zoomorphic figures, and an interpreted stylized representation of Tláloc; records damage from chalk and red and white oil paint; and documents GigaPan photography and a digital panoramic mosaic. The article gives no reproducible coordinate, site boundary, controlled excavation, site-specific occupation date, cultural assignment, or date for the photographic recording.",
};

const elLetreroChiltiupanPdf: SourceRef = {
  ...identidades18(
    "PDF pp. 89, 99, 113 (printed pp. 89, 99, 113), abstract, fig. 1, and El Letrero entry",
    89,
  ),
  citationNote:
    "PDF p. 89 frames the regional study in the Early Postclassic (800–1200 CE), but does not independently date El Letrero or its carvings. PDF p. 99, fig. 1, maps the site only at 1:100,000 scale. PDF p. 113 places it at about 400 m above sea level on Finca Guadalupe Arriba in Cuervo Abajo, Chiltiupán, near the confluence of the Pájaro León and El Zonte rivers; reports its discovery by the Costa del Bálsamo project; describes a 15 × 12 m rock with an east-facing 3 × 2 m carved area; lists geometric, anthropomorphic, and zoomorphic motifs, including an interpreted stylized Tláloc; records a small rectangular platform about 200 m north and digital photography of the carvings; and describes damage. The article gives no reproducible coordinate, site boundary, controlled excavation, site-specific occupation date, cultural assignment, discovery or recording year, or evidence that the platform was used repeatedly for ceremonies.",
};

const miramarTamaniquePdf: SourceRef = {
  ...identidades18(
    "PDF pp. 89, 99, 104, 115–116 (printed pp. 89, 99, 104, 115–116), abstract, figs. 1–2, Miramar entry, and route model",
    89,
  ),
  citationNote:
    "PDF p. 89 includes Miramar's study area in a regional Early Postclassic (800–1200 CE) and Nahua-Pipil synthesis, but provides no site-specific dating evidence. PDF p. 99, fig. 1, maps Miramar only at 1:100,000 scale. PDF p. 104, fig. 2, presents a LiDAR image of the site. PDF pp. 115–116 place Miramar in Tamanique on a high, narrow part of Loma El Cabro in Cooperativa Acahuaspán, about 1 km northwest of Peñón El Cabro and about 605 m above sea level; describe fourteen mounds, five of them apparently forming a small plaza, with the rest aligned along the narrow ridge; and present modeled least-cost routes. The source gives no reproducible coordinate, controlled excavation, site-specific artifact inventory, site-specific date, or date for Miramar's recording or LiDAR analysis.",
};

const elPanteoncitoPdf: SourceRef = {
  ...identidades18(
    "PDF pp. 89, 99, 116–117 (printed pp. 89, 99, 116–117), abstract, fig. 1, and El Panteoncito entry",
    89,
  ),
  citationNote:
    "PDF p. 89 frames the article as a regional Early Postclassic (800–1200 CE) study, but provides no site-specific dating evidence for El Panteoncito. PDF p. 99, fig. 1, maps the site only at 1:100,000 scale. PDF pp. 116–117 place it on the upper, northern sector of Loma El Cabro in Cooperativa San Isidro, about 1.5 km north of Miramar and at about 610 m above sea level; describe 35 structures divided into seven mound groups along two ridge axes; and present modeled least-cost routes. The article provides no reproducible coordinate, controlled excavation, artifact inventory, site-specific date, or date for the site's recording.",
};

const teopanPdf: SourceRef = {
  ...fundar(
    "teopan.pdf",
    "PDF pp. 1–2 (printed pp. 51–52), Location and Discovery, figs. 1–3, and preliminary dating",
    1,
  ),
  citationNote:
    "PDF p. 1 (printed p. 51), Location and Discovery and fig. 1, places the site near the shore of Isla Teopán, reports that construction exposed an archaeological deposit in early 1996, and says a potbelly sculpture remained at the site with at least one metre of soil over its battered head. It also reports surface sherds from the Late Preclassic Chul and Caynac complexes. PDF p. 2 (printed p. 52) says preliminary ceramic dating and other reported finds—four mushroom stones and several Bolinas figurines—accord with a Late Preclassic date; describes the sculpture; and identifies it as a woman. The article proposes a broader interpretation of potbelly sculptures as pregnant women, but documents no controlled excavation, site boundary, geodetic coordinate, or complete find context.",
};

const historicalSurvey = (pages: string, firstPage: number) =>
  externalPdf(
    "2009-erquicia-sitios-arqueologicos-historicos.pdf",
    pages,
    "https://www.asociaciontikal.com/wp-content/uploads/2017/01/011_-_Erquicia-2.08.pdf",
    firstPage,
  );

const atapascoHistoricalSurveyPdf: SourceRef = {
  ...historicalSurvey(
    "PDF pp. 4–5 (printed pp. 154–155) and PDF pp. 18–19 (Atapasco registration form)",
    4,
  ),
  citationNote:
    "PDF p. 4 (printed p. 154) places Atapasco 2 km north of Quezaltepeque, publishes the site coordinate, and summarizes documentary references to a Dominican ironworks in 1746 and indigo production later in the eighteenth century. PDF p. 5 (printed p. 155) describes foundations, walls, retaining walls, channels, columns, water-drop and holding basins, wall niches, and other hydraulic features interpreted as parts of the ironworks. PDF p. 18, the rendered first registration-form page, confirms the coordinate and gives a registration date of November 1, 2007. PDF p. 19 assigns the remains to the seventeenth and eighteenth centuries and records a plan and photographs. The source documents no controlled excavation, structure-by-structure date, or evidence that the surveyed remains belong to the later coffee-processing estate mentioned in the historical discussion.",
};

const sanMiguelIngenioPdf: SourceRef = {
  ...historicalSurvey(
    "PDF pp. 2–3, 5–6 (printed pp. 152–153, 155–156), project methodology and San Miguel Ingenio entry",
    5,
  ),
  citationNote:
    "PDF pp. 2–3 (printed pp. 152–153) date the first PAHES field phase to August–December 2007 and describe exploratory field visits, surface collection, photography, location recording, preliminary mapping, description, and archaeological reconnaissance; they do not identify which of these methods was applied individually at San Miguel Ingenio. PDF p. 5 (printed p. 155) places the site 10.2 km east of Metapán, publishes its coordinate, cautiously suggests operation from the last quarter of the eighteenth century and continuity through the late nineteenth century, and begins a description of its channels and architectural remains. PDF p. 6 (printed p. 156) continues the list of foundations, walls, retaining walls, channels, columns, water-drop and holding basins, and wall niches; records modern construction over the remains; and places the river about 10 m south. The source documents no controlled excavation, furnace or workshop, ore-processing evidence, labor organization, or date for an individual structure.",
};

const ingenioElRosarioPdf: SourceRef = {
  ...historicalSurvey(
    "PDF pp. 2–3, 6 (printed pp. 152–153, 156), project field phase and methodology and El Rosario entry",
    2,
  ),
  citationNote:
    "PDF pp. 2–3 (printed pp. 152–153) date the first PAHES field phase to August–December 2007 and describe exploratory field visits, surface collection, photography, location recording, preliminary mapping, description, and archaeological reconnaissance; they do not identify which methods were applied individually at El Rosario. PDF p. 6 (printed p. 156) places El Rosario 7.5 km east of Metapán, publishes its coordinate, describes the ironworks and surviving hacienda house, and documents operation in 1858–1861. It says an earlier history is unresolved, describes a main water channel, basin, foundations, walls, retaining walls, columns, water-control features, and wall niches, and places Río El Rosario about 20 m south. The source documents no controlled excavation, secure construction date, site boundary, labor organization, or subsurface evidence.",
};

const ostuaHistoricalSurveyPdf: SourceRef = {
  ...historicalSurvey(
    "PDF pp. 2–3, 8–9, 17 (printed pp. 152–153, 158–159, 167), project field phase and methodology, Ostúa entry, and fig. 5",
    2,
  ),
  citationNote:
    "PDF p. 2 (printed p. 152) dates the first PAHES field phase to August–December 2007 and says all nine sites in the phase were visited. PDF p. 3 (printed p. 153) lists the project's general methods, but does not say which methods were applied specifically at Ostúa. PDF p. 8 (printed p. 158) places Ostúa at Hacienda Ostúa in Caserío San Jerónimo and publishes the site coordinate; it also warns that much of the site's received history is speculative. PDF p. 9 (printed p. 159) leaves flooding in 1734–1740 and seismic destruction in 1733 as unresolved alternatives, and documents the church facade and the base of an atrial cross about 20 m west while describing additional foundations only as probable. PDF p. 17 (printed p. 167), fig. 5, photographs the facade. The source documents no controlled excavation, site boundary, secure abandonment date, or confirmed remains of the surrounding town.",
};

const santaMariaMagdalenaTacubaPdf: SourceRef = {
  ...historicalSurvey(
    "PDF pp. 2, 9–10, 17 (printed pp. 152, 159–160, 167), project field phase, Santa María Magdalena de Tacuba entry, and fig. 6",
    9,
  ),
  citationNote:
    "PDF p. 2 (printed p. 152) dates the first PAHES field phase to August–December 2007 and says all nine sites in the phase were visited. PDF p. 9 (printed p. 159) places the ruins opposite Tacuba's central park, publishes their coordinate, reports an archival account that the first church was built about 1705 and furnished by 1769, and attributes its destruction in 1773 to the Santa Marta earthquake. PDF p. 10 (printed p. 160) describes surviving lateral walls and the former sacristy and baptistery rooms. PDF p. 17 (printed p. 167), fig. 6, photographs the ruins. The source does not identify which project methods were used specifically at Tacuba and documents no controlled excavation, site boundary, later modification around the plaza, or archaeological evidence for the cultural identity of the church's builders or users.",
};

const beneficioRioClaroPdf: SourceRef = {
  ...historicalSurvey(
    "PDF pp. 2–3, 11 (printed pp. 152–153, 161), project field phase and methodology and Beneficio Río Claro entry",
    2,
  ),
  citationNote:
    "PDF p. 2 (printed p. 152) dates the first PAHES field phase to August–December 2007 and says all nine sites in the phase were visited. PDF p. 3 (printed p. 153) lists project-wide field methods but does not identify which were used specifically at Río Claro. PDF p. 11 (printed p. 161) places the site at Finca Río Claro about 2 km north of Quezaltepeque, publishes its coordinate, and describes a coffee-mill structure with machinery, basins, channels, drying patios, and administrative structures. Its historical discussion associates Río Claro with the introduction of wet coffee processing and turbine-powered pulpers and describes the complex as significant from the late nineteenth century onward, but does not establish that the early turbine survives or date individual features. The source documents no controlled excavation or site boundary.",
};

const ingenioSantaGertrudisPdf: SourceRef = {
  ...historicalSurvey(
    "PDF pp. 2–3, 7 (printed pp. 152–153, 157), project field phase and methodology and Santa Gertrudis entry",
    2,
  ),
  citationNote:
    "PDF pp. 2–3 (printed pp. 152–153) date the first PAHES field phase to August–December 2007 and describe exploratory field visits, surface collection, photography, location recording, preliminary mapping, description, and archaeological reconnaissance; they do not identify which methods were applied individually at Santa Gertrudis. PDF p. 7 (printed p. 157) places Santa Gertrudis 8.5 km southeast of Metapán, publishes its coordinate, documents the ironworks as operating in 1768, and says an 1807 inventory listed the ironworks and hacienda without establishing whether it was operating then. The page describes a main water channel and basin, foundations, walls, retaining walls, other water-control channels, wall niches, and the hacienda house, and calls the remains badly damaged. The source documents no controlled excavation, secure construction or abandonment date, site boundary, artifact inventory, or evidence for the labor force's cultural identity.",
};

const longyear = (pages: string, firstPage: number) =>
  fundar("longyear.pdf", pages, firstPage);

const atalayaPdf = externalPdf(
  "atalaya-acajutla.pdf",
  "Article pp. 133–184",
  "https://repositorio.ues.edu.sv/bitstreams/3d2bc1ba-9ae1-4b55-b0c8-00d68cd72248/download",
  1,
);

const atalayaEarlyResearchPdf: SourceRef = {
  ...fundar(
    "haberland_sequences.pdf",
    "PDF pp. 1–3 (printed pp. 21–23), fieldwork summary, fig. 1, and Atiquizaya-complex discussion",
    1,
  ),
  citationNote:
    "PDF p. 1 (printed p. 21) summarizes Haberland’s 1953–1954 and 1958 field trips, surface collections at about 150 localities, and occasional non-stratigraphic tests, but does not identify which work occurred at Atalaya. PDF p. 2 (printed p. 22), fig. 1, places Atalaya only on a small-scale national map. PDF pp. 2–3 (printed pp. 22–23) tentatively include Atalaya in the Atiquizaya complex because some material and decorative traits match, despite missing features such as extensive grooving; the complex is placed around 1000–700 BCE. The article does not publish a reproducible Atalaya coordinate, site boundary, or Atalaya-specific artifact inventory.",
};

const atalayaReviewPdf: SourceRef = {
  ...fundar(
    "casasola_panorama.pdf",
    "PDF p. 3 (printed pp. 716–717), western El Salvador research overview",
    3,
  ),
  citationNote:
    "PDF p. 3 (printed pp. 716–717) reviews Haberland’s work near Atiquizaya and Acajutla, lists Atalaya in Sonsonate among Middle Formative sites, and says its material relates to the Providencia and Conchas phases. This secondary review does not provide a site coordinate, boundary, excavation method, or artifact inventory.",
};

const chalchuapaPdf = externalPdf(
  "chalchuapa-architecture.pdf",
  "PDF pp. 3–5",
  "https://www.asociaciontikal.com/wp-content/uploads/2017/01/19-_Shione.05_-_Digital.pdf",
  3,
);

const amulungaReferencePdf: SourceRef = {
  ...externalPdf(
    "2007-erquicia-los-gavilanes.pdf",
    "PDF p. 1 (printed p. 854), Chalchuapa archaeological-site list",
    "https://www.asociaciontikal.com/wp-content/uploads/2017/01/50.06_-_Erquicia.pdf",
    1,
  ),
  citationNote:
    "PDF p. 1 (printed p. 854) lists Amulunga among the archaeological sites of the Chalchuapa zone. It does not give an Amulunga-specific coordinate, boundary, occupation date, cultural assignment, investigation, architecture, or artifact inventory.",
};

const rioPampeExpeditionPdf: SourceRef = {
  ...longyear(
    "PDF p. 11 (printed p. 3), expedition dates and scope",
    11,
  ),
  citationNote:
    "PDF p. 11 (printed p. 3) dates Longyear’s El Salvador expedition to September 1941–April 1942 and describes reconnaissance as part of its field program. It does not identify the dates of the Pampe visit more precisely.",
};

const rioPampeSitePdf: SourceRef = {
  ...longyear(
    "PDF pp. 24–25 (printed pp. 17–18), Pampe Group entry and fig. 6",
    24,
  ),
  citationNote:
    "PDF pp. 24–25 (printed pp. 17–18) and fig. 6 place the Pampe Group on Finca San Marcos and nearby land on the south bank of the Río Pampe, along both sides of a cart track. The report describes a heavily damaged rectangular terraced base, two stone-walled plazas, adobe-and-scoria construction, uncertain low hillocks, and surface sherds. It reports no carved stone or complete pottery vessels and provides no controlled excavation, secure occupation date, cultural assignment, geodetic coordinate, or site boundary.",
};

const vergelesDelEdenPdf: SourceRef = {
  ...externalPdf(
    "2007-erquicia-los-gavilanes.pdf",
    "PDF pp. 3, 13 (printed pp. 856, 866), Vergeles del Edén summary and conclusion",
    "https://www.asociaciontikal.com/wp-content/uploads/2017/01/50.06_-_Erquicia.pdf",
    3,
  ),
  citationNote:
    "PDF p. 3 (printed p. 856) says Fabio Amador conducted an archaeological test at the Vergeles del Edén cemetery in 1995. It quotes his 1996 report describing a rectilinear construction of stone rows with earth mortar, abundant obsidian debitage, and many projectile points; the quoted interpretation of tool production and migration is tentative. PDF p. 13 (printed p. 866) treats the Vergeles structure as contemporary with Early Postclassic remains at Los Gavilanes, Cementerio Jardín, and Tazumal B1-2. This secondary source publishes no coordinate, site boundary, test dimensions, stratigraphy, or absolute date for Vergeles del Edén.",
};

const sanDiegoGuijaPdf: SourceRef = {
  ...longyear(
    "PDF pp. 11, 29 (printed pp. 1, 22), expedition dates and San Diego entry with fig. 14",
    29,
  ),
  citationNote:
    "PDF p. 11 (printed p. 1) dates Longyear’s El Salvador expedition to September 1941–April 1942. PDF p. 29 (printed p. 22) places San Diego on both sides of the Santa Ana–Metapán highway, north and east of the hacienda house; fig. 14 maps ten numbered mounds and marks earlier excavations in Mounds 1 and 10. The text describes low, eroded mounds, exposed boulder-and-adobe construction, five complete pottery vessels, manos, and one carved worked-stone object. One polychrome bowl was apparently associated with a burial, but the report does not identify who made the earlier excavations, when they occurred, or whether they were controlled. It also gives no reproducible coordinate, secure occupation date, or cultural assignment.",
};

const igualtepequeLongyearPdf: SourceRef = {
  ...longyear(
    "PDF p. 28 (printed p. 21), Isla Igualtepeque entry and fig. 13",
    28,
  ),
  citationNote:
    "PDF p. 28 (printed p. 21) maps two mounds in a walled plaza, approach terraces, and shoreline carvings. It says the west side of Mound 1 had been partly excavated before publication, exposing a stair and terrace, but does not identify who did that work, when it occurred, or whether it was controlled. The 1942 survey recorded at least 200 human, animal, and geometric carvings, pottery, one fragmentary figurine, broken circular stone objects, metate fragments, and mano fragments. The source publishes no geodetic coordinate or secure occupation date.",
};

const igualtepequeReportPdf: SourceRef = {
  ...fundar(
    "igualtepeque.pdf",
    "PDF pp. 1, 3, site summary, figs. 1–2, and rock-art chronology caution",
    1,
  ),
  citationNote:
    "PDF p. 1 identifies Igualtepeque, or Cerro de las Figuras, as a Lake Güija peninsula that becomes an island at high water; maps the locality; describes terraces, platforms, a pyramid, and a wall across the peninsula; reports more than 200 shoreline carvings; and assigns the architecture to the Guazapa phase (900–1200 CE) from construction details and diagnostic ceramics. PDF p. 3 cautions that an Early Postclassic date for the carvings is only an initial assumption because their style does not match known Guazapa-phase or other identified styles.",
};

const igualtepequeRockArtPdf: SourceRef = {
  ...anales56(
    "PDF pp. 77–78 (printed pp. 77–78), abstract and introduction",
    77,
  ),
  citationNote:
    "PDF p. 77 reports a 2013 inventory of Igualtepeque’s rock carvings and relates many designs to a last known Nahua-Pipil occupation dated 900–1525. PDF p. 78 says no archaeological excavation had been conducted at the site or in the rock-art area and emphasizes that the carvings remain difficult to date. This conflicts with the older report’s wording that part of Mound 1 had been excavated; because neither source documents a controlled excavation, the public label remains ‘Surveyed site.’",
};

const elChahuiteReferencePdf: SourceRef = {
  ...anales56(
    "PDF pp. 27, 40 (printed pp. 27, 40), Zapotitán Valley site list and bibliography entry",
    27,
  ),
  citationNote:
    "PDF p. 27 (printed p. 27) lists El Chahuite among archaeological sites in the Zapotitán Valley but gives no location, boundary, date, features, or finds. PDF p. 40 (printed p. 40) cites a 2001 undergraduate thesis whose title concerns ceramic analysis before and after the San Andrés/Boquerón eruption at El Chahuite. The article does not reproduce the thesis’s field methods or results, and the thesis itself is not present in the local corpus.",
};

const sanLuisPdf = externalPdf(
  "2015-chalchuapa-san-luis.pdf",
  "Excavation methodology and results",
  "https://www.asociaciontikal.com/wp-content/uploads/2020/09/43-Lopez-et-al.pdf",
  1,
);

const fincaRositaPdf = externalPdf(
  "finca-rosita-santa-ana.pdf",
  "Introduction and fieldwork chapters",
  "https://biblioteca.utec.edu.sv/siab/virtual/tesis/941000713.pdf",
  1,
);

const phaseTwoHistoricalPdf = externalPdf(
  "2010-erquicia-sitios-historicos-fase-2.pdf",
  "Site descriptions",
  "https://www.mesoweb.com/Simposio/pdf/23/Erquicia.2010.pdf",
  1,
);

const fincaSanJorgePdf = externalPdf(
  "finca-san-jorge-las-aradas.pdf",
  "Survey and settlement analysis",
  "https://biblioteca.utec.edu.sv/siab/virtual/tesis/66794.pdf",
  1,
);

const southernAhuachapanSurveySource = atalayaPdf;

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

export const digs: Dig[] = [
  {
    id: "apaneca-habel",
    name: "Apaneca (Habel grave account)",
    lat: 13.8589,
    lon: -89.804,
    precision: "approx",
    kind: "Find locality",
    basis: "Apaneca town center; the sources do not locate the grave",
    note: "Habel witnessed a grave being opened at Apaneca; controlled excavation is not documented.",
    sources: [
      {
        ...fundar(
          "spinden1915.pdf",
          "PDF pp. 5, 38 (printed pp. 450, 480)",
          5,
        ),
        citationNote:
          "Spinden reports that Habel described a grave opened at Apaneca and, more specifically, says that Habel witnessed the opening. The reported finds were carved jades, several pottery objects, a double-profile head carved on a stone slab, and a polished gray stone object described at the time as a ‘sacrificial yoke.’ These pages do not date or locate the grave and do not document controlled excavation.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 76 (printed p. 75), Appendix D: Department of Ahuachapán",
          76,
        ),
        citationNote:
          "Longyear’s compiled site list places Apaneca 16 km northwest of Ahuachapán, separately reports mounds west of town, and says only ‘Excavation here by Habel.’ It does not identify the grave’s position, date, or method.",
      },
    ],
  },
  {
    id: "santa-leticia",
    name: "Santa Leticia",
    lat: 13.8504,
    lon: -89.797,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate Apaneca-area marker; the cited source publishes no coordinate",
    note: "A 1977 project included reconnaissance, excavation, and topographic mapping; the source does not locate individual units or publish a reproducible site coordinate.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 4 (printed p. 430), 1970s research history",
          4,
        ),
        citationNote:
          "The synthesis identifies Santa Leticia in the Cordillera Apaneca-Ilamatepec and reports a 1977 project with regional reconnaissance and an excavation program intended to obtain a ceramic and chronological sequence. It says the project produced a topographic site map and dated the ‘potbellied’ sculptures to the Late Preclassic. It does not publish a coordinate, locate excavation units, date the site’s full occupation, or provide an artifact inventory.",
      },
    ],
  },
  {
    id: "ataco-las-sepulturas",
    name: "Ataco",
    lat: 13.87,
    lon: -89.849,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate Ataco-area marker; the cited source publishes no coordinate",
    note: "The point does not represent a published archaeological coordinate.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 9 (printed p. 435), recent-projects summary",
          9,
        ),
        citationNote:
          "The synthesis reports that the Ataco Archaeological Project began in 2006–2007 with reconnaissance, the first mapping of the site's nuclear zone, and exploratory excavations. It says the project continued under new direction from 2008, addressing Preclassic and Postclassic cultural dynamics and studying jaguar heads and their spatial distribution. It does not publish a coordinate, connect the site to the name Las Sepulturas, describe mounds or public architecture, or provide an artifact inventory or excavation results.",
      },
    ],
  },
  {
    id: "cara-sucia",
    name: "Cara Sucia",
    lat: 13.7792,
    lon: -90.0358,
    precision: "approx",
    kind: "Excavated site",
    basis: "Western coastal plain; the cited pages publish no reproducible coordinate",
    note: "Approximate Cara Sucia-area marker; it does not represent a published archaeological coordinate.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 5 (printed p. 431), 1980s research summary",
          5,
        ),
        citationNote:
          "The synthesis reports a 1982–1983 archaeological project at Cara Sucia and says ceramic analysis and radiocarbon dates defined two principal occupations: Late Preclassic and the end of the Classic period. It places the site only on El Salvador's western coast and does not publish a coordinate, describe the site's size or architecture, or provide an artifact inventory.",
      },
      {
        ...fundar(
          "earliest_pipil.pdf",
          "PDF p. 8 (printed p. 6), Late Classic cultural regions",
          8,
        ),
        citationNote:
          "The study identifies Cara Sucia as the easternmost Cotzumalhuapa site and reports that excavations revealed a Terminal Classic facet of the local Tamasha phase, dated 800–950 CE. It lists Motagua-style fine-paste pigment flasks, moldmade cylindrical vessels, fine-orange vessels similar to the Altar group, and copper in this facet. It says the ethnic affiliation of the Cotzumalhuapa culture remains unresolved.",
      },
    ],
  },
  {
    id: "el-carmen",
    name: "El Carmen",
    lat: 13.72,
    lon: -90.068,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate marker reconstructed from the report’s Figure 1 and landscape description",
    note: "The report places the mound on an arm of the Estero El Zapote, 3 km from the Pacific coast and about 20 km from Guatemala, but publishes no coordinate.",
    sources: [
      {
        ...fundar(
          "carmen.pdf",
          "PDF p. 3 (printed p. 1), site setting and description",
          3,
        ),
        citationNote:
          "The report places El Carmen on an arm of the Estero El Zapote, 3 km from the Pacific and about 20 km from Guatemala. It describes a 3 m-high mound measuring 50 × 60 m at its base and says work ran from May 23 to June 17. It does not publish a coordinate.",
      },
      {
        ...fundar("carmen.pdf", "PDF p. 28, Figure 1 locality map", 28),
        citationNote:
          "Figure 1 schematically maps El Carmen between the estuary and the nearby uplands. It has a scale and north arrow but no coordinate grid, so it supports only an approximate marker.",
      },
      {
        ...fundar(
          "carmen.pdf",
          "PDF pp. 4–8 (printed pp. 2–6), excavation methods and results",
          4,
        ),
        citationNote:
          "The report documents 32 m² of excavation in 2 × 2 m units, using arbitrary 25 cm levels and natural levels where cultural features allowed. It identifies seven construction stages, three possible ovens, 12 storage pits and possibly two more, compacted-clay floors, and refuse deposits. The authors interpret the mound as domestic and cautiously suggest an extended residence for one or more family groups.",
      },
      {
        ...fundar(
          "carmen.pdf",
          "PDF p. 9 (printed p. 7), radiocarbon dating",
          9,
        ),
        citationNote:
          "Four radiocarbon determinations and the ceramics place the occupation in the Early Formative (Early Preclassic). The report gives a corrected, calibrated average of 1590 ± 150 BCE and treats the phase assignment as preliminary.",
      },
    ],
  },
  {
    id: "el-eden",
    name: "El Edén",
    lat: 13.725,
    lon: -90.058,
    precision: "approx",
    kind: "Excavated site",
    basis: "Cooperativa Nueva York; the report publishes no site boundary or coordinate",
    note: "Approximate area marker; it does not represent a published archaeological coordinate.",
    sources: [
      {
        ...fundar(
          "carmen.pdf",
          "PDF pp. 4–5 (printed pp. 2–3), project scope and site comparison",
          4,
        ),
        citationNote:
          "The report places El Edén on land of Cooperativa Nueva York and says the May–June 1988 project conducted small test excavations, survey, surface collection, and looter-trench cleaning there. It says the pottery from these investigations was later than El Carmen's and belonged mostly to the Middle and Late Preclassic. It does not publish an archaeological coordinate or site boundary.",
      },
      {
        ...fundar(
          "carmen.pdf",
          "PDF p. 8 (printed p. 6), ‘El Edén’",
          8,
        ),
        citationNote:
          "The El Edén section documents one 2 × 1 m test pit excavated in arbitrary 25 cm levels and cleaning between 2.00 and 2.25 m in a looter trench. It reports eroded pottery, a prismatic obsidian blade, charcoal, obsidian, bone, fugitive-polychrome Middle Preclassic sherds, and a metate fragment; the second and third test-pit lots were disturbed. The section provides no site dimensions or coordinate.",
      },
    ],
  },
  {
    id: "el-zapote-san-isidro",
    name: "El Zapote (Cooperativa San Isidro)",
    lat: 13.7227,
    lon: -89.8417,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate point reconstructed from Figure 1 and the site description",
    note: "The report places the site on a small flat area at 400 m elevation within Cooperativa San Isidro. Figure 1 labels the site on a broad regional image but does not state a site coordinate.",
    sources: [
      {
        ...institutional(
          "anales-54.pdf",
          "PDF p. 44 (printed p. 44), introduction, site description, and Figure 1",
          44,
        ),
        citationNote:
          "The text identifies El Zapote (Atlas code 18-22) within Cooperativa San Isidro, says it was registered in 2011, and describes three elongated mounds around a small plaza on a probably artificial terrace. Figure 1 labels El Zapote on a broad regional image. Although its Google Earth footer displays a cursor coordinate, the figure does not identify that readout as the archaeological location, so it supports only an approximate marker.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF pp. 45–46 (printed pp. 45–46), additional features and field methods",
          45,
        ),
        citationNote:
          "Later visits identified a possible fourth mound and two small, altered platforms. The 2013 team cleared the site, recorded 896 total-station points, and opened three test pits at the plaza and mound bases.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF pp. 47–48 (printed pp. 47–48), stratigraphy and construction",
          47,
        ),
        citationNote:
          "The excavations documented fill used to level the uneven terrain and structures built with earthen cores and rows of stone. The report says the surface finish and full form of some features remain unknown because of erosion and limited excavation.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF pp. 49–51 (printed pp. 49–51), Table 1 and ceramic discussion",
          49,
        ),
        citationNote:
          "Table 1 inventories pottery, obsidian, and stone objects from excavation and surface collection. The following discussion stresses that the ceramic sample is limited and that broader excavation is needed.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF pp. 52–53 (printed pp. 52–53), ceramic comparisons",
          52,
        ),
        citationNote:
          "The author compares recurring ceramic traits but says the limited sample cannot establish whether they represent different types, variants of one type, or any specific ceramic type. The proposed ritual use of the site is also presented as an interpretation, not a confirmed function.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF pp. 54–56 (printed pp. 54–56), ‘Temporalidad’ and conclusions",
          54,
        ),
        citationNote:
          "The report places the Cooperativa San Isidro sites in the Postclassic but says the evidence is insufficient to decide between an Early or Late Postclassic occupation. It does not establish a cultural attribution for El Zapote.",
      },
    ],
  },
  {
    id: "tacuscalco-los-cerritos",
    name: "Tacuscalco–Los Cerritos",
    lat: 13.7026,
    lon: -89.7216,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate Nahulingo-area marker; the cited sources publish no coordinate",
    note: "Research included mapping, surface collection, excavation, and later work on burial contexts; the point is not a published archaeological coordinate.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 7 (printed p. 432), 1990 research summary",
          7,
        ),
        citationNote:
          "The synthesis reports that the 1990 Tacuscalco investigation included mapping, surface collection, and excavation. It does not publish a coordinate, describe the site plan or finds, date the occupation, or assign a cultural affiliation.",
      },
      {
        ...institutional(
          "anales-56.pdf",
          "PDF p. 48 (printed p. 47), burial-project review; PDF pp. 56–57 (printed pp. 55–56), Table 2",
          48,
        ),
        citationNote:
          "The review says that three multiple burials were found at Tacuscalco–Los Cerritos in work involving Sally Graver in 2005. Table 2 identifies a 2004–2005 preliminary sounding in the Tacuscalco–Los Cerritos/Ruiz sector with osteological study and a 2006 thesis on dating burials from that sector. These pages do not state the burials' date, describe the individuals or associated objects, or publish a coordinate.",
      },
    ],
  },
  {
    id: "iglesia-caluco",
    name: "Iglesia de Caluco",
    lat: 13.725,
    lon: -89.6609,
    precision: "approx",
    kind: "Excavated site",
    basis: "Modern Caluco church landmark; the cited source publishes no archaeological coordinate",
    note: "The point marks the modern parish church, not a published excavation coordinate.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 6 (printed p. 432), historical-archaeology summary",
          6,
        ),
        citationNote:
          "The synthesis reports excavation at the colonial church of San Pablo y San Pedro (Iglesia de Caluco) and adjacent areas in 1994, followed in 1995 by a topographic survey and continued excavation. It does not publish a coordinate, describe the excavation methods or findings, or establish a site-specific cultural attribution.",
      },
    ],
  },
  {
    id: "asuncion-izalco",
    name: "Iglesia de la Asunción, Izalco",
    lat: 13.7461,
    lon: -89.6749,
    precision: "landmark",
    kind: "Excavated site",
    basis: "Mapped footprint of the Iglesia de la Asunción ruins",
    note: "The point marks the documented church ruins; the report publishes no geographic coordinate.",
    sources: [
      {
        ...fundar(
          "asuncion_izalco.pdf",
          "PDF p. 2, title page; PDF pp. 15–17 (printed pp. 12–14), excavation scope; PDF pp. 46–47 (printed pp. 43–44), results summary; PDF p. 79, Figure 10 site plan",
          15,
        ),
        citationNote:
          "The title page dates the report to September 1989, and printed p. 12 says the sounding lasted two weeks in August. Printed pp. 13–14 describe a non-exhaustive sounding of 18 test units in seven operations, totaling more than 40 square meters, and explain that burials limited excavation depth. Printed pp. 43–44 summarize the architectural features, refuse deposit, and 11 burials. Figure 10 maps the ruins and excavation locations but gives no geographic coordinate.",
      },
    ],
  },
  {
    id: "los-gavilanes",
    name: "Los Gavilanes",
    lat: 13.9809,
    lon: -89.6674,
    precision: "published",
    kind: "Excavated site",
    basis: "Mean of the published coordinates for Operations 2–5",
    note: "Operation 1’s coordinates conflict with its stated Chalchuapa lot location, so the marker uses the coherent published coordinates for Operations 2–5.",
    sources: [
      {
        ...institutional(
          "2007-erquicia-los-gavilanes.pdf",
          "PDF p. 5 (printed p. 857), site setting and investigation methods",
          5,
        ),
        citationNote:
          "Documents surface collection and test excavation from June through August 2005 on a proposed housing parcel east of Chalchuapa.",
      },
      {
        ...institutional(
          "2007-erquicia-los-gavilanes.pdf",
          "PDF pp. 8–9 (printed pp. 860–861), Operations 1–4 and Structures 1–2",
          8,
        ),
        citationNote:
          "Publishes coordinates for Operations 1–4, dates Structure 2 to 900–1200 CE, and describes the two stone-founded structures. Operation 1’s coordinate is inconsistent with the stated Chalchuapa location.",
      },
      {
        ...institutional(
          "2007-erquicia-los-gavilanes.pdf",
          "PDF pp. 11–13 (printed pp. 863–865), Structure 2 features and recovered materials",
          11,
        ),
        citationNote:
          "Publishes the Operation 5 coordinate and describes the stone-lined burned feature, ceramic groups, obsidian objects, and two fragments identified as a Xipe Totec effigy; the copal-burning interpretation is explicitly tentative.",
      },
    ],
  },
  {
    id: "tazumal",
    name: "Tazumal",
    lat: 13.9796,
    lon: -89.6744,
    precision: "landmark",
    kind: "Excavated site",
    basis: "Tazumal Archaeological Park",
    note: "The marker represents the archaeological-park landmark; the cited archaeological sources do not publish this coordinate.",
    sources: [
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 58 (printed p. 56), Appendix C, ‘II. Tazumal’",
          58,
        ),
        citationNote:
          "Documents the April–May 1942 exploratory excavation of Mounds 1 and 2, including the five-foot recording grid and transit mapping.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF pp. 61–63 (printed pp. 59–61), architecture, stone objects, burials, and pottery",
          61,
        ),
        citationNote:
          "Describes repeated rebuilding of Mound 1, stone and obsidian finds, four post-construction burials, and stratigraphically distinct Early and Later Phase pottery deposits. The publication warns that further excavation was needed to refine the sequence.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 73 (printed p. 71), dating summary and ethnic-identification warning",
          73,
        ),
        citationNote:
          "Summarizes Classic and Postclassic dating evidence while warning that the ethnic evidence is contradictory and does not securely identify Tazumal as Pipil or Pokoman Maya. This supports leaving the culture filter empty.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 81 (printed p. 80), Department of Santa Ana site list",
          81,
        ),
        citationNote:
          "Places Tazumal east of Chalchuapa beside the modern cemetery. It does not publish the marker coordinate.",
      },
      {
        ...institutional(
          "2007-erquicia-los-gavilanes.pdf",
          "PDF p. 2 (printed p. 855), ‘El Postclásico en Chalchuapa’",
          2,
        ),
        citationNote:
          "Describes remodeling from the Late Classic into the Early Postclassic and dates Structure B1-2 to about 900–1200 CE. Its proposed population identity is an interpretation, not a secure site-wide cultural attribution.",
      },
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF pp. 8–9 (printed pp. 434–435), ‘Recientes investigaciones’",
          8,
        ),
        citationNote:
          "Reports the partial 2004 collapse of Structure B1-2, archaeological and restoration work in 2005–2006, and Tazumal project stages in 2004–2008 and 2010–2012 focused on topographic survey and architectural development.",
      },
    ],
  },
  {
    id: "ciudad-nuevo-tazumal",
    name: "Nuevo Tazumal (El Cuje)",
    lat: 13.9796,
    lon: -89.6687,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate point reconstructed from published relative locations",
    note: "The source places Nuevo Tazumal northeast of Tazumal, south of Laguna Cuscachapa, and about 200 m southwest of Los Gavilanes, but publishes no coordinate for Nuevo Tazumal.",
    sources: [
      {
        ...institutional(
          "2007-erquicia-los-gavilanes.pdf",
          "PDF p. 3 (printed p. 856), Nuevo Tazumal summary",
          3,
        ),
        citationNote:
          "Identifies Nuevo Tazumal with El Cuje, places it northeast of Tazumal and south of Laguna Cuscachapa, and reports archaeological sounding in 2001–2003. It assigns the recorded stone-and-mud architecture to the Postclassic and lists the platform forms and foundations across an area of about ten manzanas. It does not describe the sounding methods or publish a coordinate.",
      },
      {
        ...institutional(
          "2007-erquicia-los-gavilanes.pdf",
          "PDF pp. 7–8, 11, 13 (printed pp. 860–861, 864, 866), Los Gavilanes coordinates and relative location",
          7,
        ),
        citationNote:
          "Publishes coherent coordinates for Los Gavilanes Operations 2–5 and states that Los Gavilanes is 200 m northeast of Nuevo Tazumal. These data support only an approximate reconstruction of the Nuevo Tazumal marker, not a published site coordinate.",
      },
    ],
  },
  {
    id: "casa-blanca",
    name: "Casa Blanca",
    lat: 13.9889,
    lon: -89.6721,
    precision: "landmark",
    kind: "Excavated site",
    basis: "Casa Blanca Archaeological Park",
    note: "The marker identifies the archaeological park, not a source-published coordinate for an individual mound.",
    sources: [
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 24 (printed p. 17), ‘Casa Blanca Group’ and Figure 6",
          24,
        ),
        citationNote:
          "Longyear places the group at the northeast corner of Chalchuapa, maps it in Figure 6, and reports his cursory 1942 inspection. He counted 16 mounds, described adobe-and-stone construction, noted that two mounds had already been partly excavated, and recorded surface ceramics, vessels with burned human bones, and stone sculptures.",
      },
      {
        ...fundar(
          "parks.pdf",
          "PDF p. 2, ‘Casa Blanca’",
          2,
        ),
        citationNote:
          "The park summary identifies Casa Blanca as a pyramid group on the edge of Chalchuapa, reports Late Preclassic and Early Classic occupation, and says it officially opened as an archaeological park in 2004. It does not publish a site coordinate or assign a culture.",
      },
      {
        ...institutional(
          "2007-erquicia-los-gavilanes.pdf",
          "PDF p. 3 (printed p. 855), Casa Blanca project summary",
          3,
        ),
        citationNote:
          "The summary dates the interdisciplinary project to 1995–2000 and reports Postclassic features: a burial with offerings east of Pyramid 5 and three Plumbate vessels associated with the final construction stage of Structure 2.",
      },
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 7 (printed p. 433), Japanese project section",
          7,
        ),
        citationNote:
          "The review says the five-year project began in 1995 and conducted excavation and restoration of some park structures, multidisciplinary research, and precise mapping. It does not itself establish the site's occupation dates or a culture assignment.",
      },
    ],
  },
  {
    id: "el-trapiche-e3-7",
    name: "El Trapiche (mound E3-7)",
    lat: 13.9958,
    lon: -89.6697,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate marker within the El Trapiche sector",
    note: "The cited pages identify mound E3-7 at El Trapiche but do not publish a coordinate.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 4 (printed p. 430), El Trapiche E3-7 summary",
          4,
        ),
        citationNote:
          "This page reports Fowler's 1977–1978 rescue excavation of mound E3-7, 33 people buried within it, and Fowler's interpretation of the context as human sacrifice. It does not provide a date or coordinate for the mound.",
      },
      {
        ...institutional(
          "anales-56.pdf",
          "PDF p. 60 (printed p. 60), “El Entierro 78-8B-SA-1 de El Trapiche”",
          60,
        ),
        citationNote:
          "This case study identifies one of the 33 burials as Late Preclassic Caynac (100 BCE–100 CE), names Manuel López and William Fowler as the 1977–1978 excavators, and summarizes the placement that supported the sacrifice interpretation. The date is stated for this burial, not for every deposit in the mound.",
      },
    ],
  },
  {
    id: "templo-santiago-apostol",
    name: "Templo Santiago Apóstol",
    lat: 13.9859,
    lon: -89.6801,
    precision: "landmark",
    kind: "Potential archaeological locality · historic church investigation",
    basis: "Mapped Santiago Apóstol church landmark; the archaeological source gives no coordinate",
    note: "A national synthesis reports an investigation in 1998–1999 but gives no methods or results.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 7 (printed p. 433), historical-archaeology overview",
          7,
        ),
        citationNote:
          "This page reports that the national Department of Archaeology investigated Templo Santiago Apóstol in Chalchuapa in 1998–1999 and that Claudia Ramírez directed the second phase. It does not describe the field method, finds, the church's date, or a coordinate.",
      },
    ],
  },
  {
    id: "asuncion-ahuachapan",
    name: "Nuestra Señora de la Asunción, Ahuachapán",
    lat: 13.919,
    lon: -89.848,
    precision: "landmark",
    kind: "Excavated site",
    basis: "Mapped church landmark; the archaeological source gives no coordinate",
    note: "The 1985 project excavated inside and immediately outside the church.",
    sources: [
      {
        ...fundar(
          "asuncion_ahuachapan.pdf",
          "PDF pp. 3–7, 15 (printed pp. 1–5, 13), introduction, methods, stratigraphy, burials, and ceramics",
          3,
        ),
        citationNote:
          "The report identifies the colonial church, describes a ten-day field project in October 1985, and documents 12 archaeological test pits in the nave and exterior. It reports 26 burials and a compact lower layer containing Late Preclassic ceramics (400 BCE–250 CE) and possibly two constructions, overlain by probable church fill with historic burials and some Protohistoric and Historic ceramics. PDF p. 15 tentatively dates the Protohistoric group to about 1200–1700 CE. The report does not publish a coordinate. These pages do not support the former claims about 2002–2003 rescue work, a 1944 uprising deposit, arms, or ammunition.",
      },
    ],
  },
  {
    id: "finca-san-rafael",
    name: "Finca San Rafael, Chalchuapa",
    lat: 13.9815,
    lon: -89.6635,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate marker in Chalchuapa; the cited synthesis gives no coordinate or parcel location",
    note: "A 2007 synthesis reports archaeological testing at Finca San Rafael in February 2006.",
    sources: [
      {
        ...institutional(
          "2007-erquicia-los-gavilanes.pdf",
          "PDF p. 3 (printed p. 856), Chalchuapa research summary",
          3,
        ),
        citationNote:
          "The synthesis reports archaeological testing at the place known as Finca San Rafael in February 2006, before a proposed housing development. It records about nine structures organized into two domestic groups and terraces, assigned by the investigation to the Postclassic period. It does not publish a coordinate, locate the parcel, describe the testing methods or recovered material, or support a cultural affiliation.",
      },
    ],
  },
  {
    id: "san-andres-campana",
    name: "San Andrés (Campana San Andrés)",
    lat: 13.8006,
    lon: -89.3891,
    precision: "landmark",
    kind: "Excavated site",
    basis: "San Andrés archaeological-site landmark; the cited sources publish no coordinate",
    note: "The marker identifies the known archaeological site, not a coordinate published in the cited reports.",
    sources: [
      {
        ...fundar(
          "dimick_1941.pdf",
          "PDF pp. 2–3 (printed pp. 298–299), Carnegie fieldwork summary",
          2,
        ),
        citationNote:
          "The contemporary summary places Campana San Andrés in the Río Sucio valley and documents small excavations across the principal group, deeper work in Structures 1–4 and 8, a test pit, and a trench. It describes adobe-and-plaster monumental construction, successive building episodes, pottery, stone sculpture, a stone yoke, and plumbate sherds. It gives no coordinate and treats the duration of occupation as undetermined.",
      },
      {
        ...institutional(
          "anales-56.pdf",
          "PDF pp. 26–27 (printed pp. 26–27), site summary and fig. 1",
          26,
        ),
        citationNote:
          "The 2016 article places San Andrés between the Sucio and Agua Caliente rivers; identifies the Acropolis, North Plaza, and Structure 5 (La Campana); and dates site material from the Middle Preclassic through Early Postclassic, with a Late Classic apogee. Figure 1 is a site plan but does not publish a coordinate.",
      },
      {
        ...institutional(
          "anales-56.pdf",
          "PDF pp. 30–31 (printed pp. 30–31), trenches 1–2 and fig. 3",
          30,
        ),
        citationNote:
          "The article documents a 4 × 2 m trench beside Structure 5 and another trench beside Mound B. It reports volcanic ash, floors, pottery, figurines, obsidian, and other archaeological material in these contexts.",
      },
      {
        ...institutional(
          "anales-56.pdf",
          "PDF pp. 28, 39 (printed pp. 28, 39), research history and references",
          28,
        ),
        citationNote:
          "The research history lists multiple projects at San Andrés. Its latest specifically named field season is the 2012 San Andrés Archaeological Project, identified in the bibliography through a 2014 publication; the article does not date the two trenches it presents.",
      },
    ],
  },
  {
    id: "joya-de-ceren",
    name: "Joya de Cerén",
    lat: 13.8275,
    lon: -89.3562,
    precision: "landmark",
    kind: "Excavated site",
    basis:
      "Marker is tied to the named archaeological park; the cited sources do not publish a coordinate or site boundary",
    note:
      "Geophysical survey in 1979–1980 preceded an excavation program begun in 1989.",
    sources: [
      {
        ...fundar(
          "parks.pdf",
          "PDF p. 2, Joya de Cerén park history",
          2,
        ),
        citationNote:
          "The park history identifies Joya de Cerén as a Middle/Late Classic site buried by a volcanic eruption around 640 CE and documents excavation and its 1993 opening as an archaeological park. It does not publish a coordinate or site boundary.",
      },
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 5 (printed p. 431), Joya de Cerén project summary",
          5,
        ),
        citationNote:
          "The synthesis reports geophysical work in 1979–1980, including magnetic resistance and radar, followed by excavation beginning in 1989. It says subsequent seasons excavated structures and cultivated fields. It does not publish a site coordinate.",
      },
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 9 (printed p. 435), recent investigations",
          9,
        ),
        citationNote:
          "The paper, presented at the 2011 symposium, reports the project as continuing and says it documented village daily life and crop diversity during the Classic period.",
      },
    ],
  },
  {
    id: "el-cambio",
    name: "El Cambio",
    lat: 13.8077,
    lon: -89.3571,
    precision: "approx",
    kind: "Excavated site",
    basis:
      "OpenStreetMap archaeological-site geometry; the cited publications identify only San Juan Opico in the Zapotitán valley",
    note:
      "The point follows the mapped site geometry, but the cited archaeological publications do not provide a reproducible coordinate.",
    sources: [
      {
        ...institutional(
          "anales-56.pdf",
          "PDF pp. 54, 59 (printed pp. 54, 59), Table 2 and review of El Cambio burial work",
          54,
        ),
        citationNote:
          "Table 2 lists the 2006–2007 excavation report and describes its coverage as archaeological context, burial position, funerary pattern, and associated objects. Page 59 places El Cambio in San Juan Opico and reports a later osteological study of excavated burials. Neither page publishes a coordinate.",
      },
      {
        ...institutional(
          "identidades-18-arqueologia.pdf",
          "PDF pp. 269, 274 (printed pp. 269, 274), El Cambio cranium and Image 4 discussion",
          269,
        ),
        citationNote:
          "The article identifies an El Cambio cranium from a funerary context and reports tabular-erect cranial shaping. Citing the 2006–2007 excavation report, it dates that individual to the Early Postclassic (900–1250 CE); this date should not be generalized to every burial at the site.",
      },
    ],
  },
  {
    id: "nuevo-lourdes-poniente",
    name: "Nuevo Lourdes Poniente",
    lat: 13.729,
    lon: -89.389,
    precision: "approx",
    kind: "Excavated site",
    basis:
      "Approximate roadside marker; the source places the site west of Urbanización Nuevo Lourdes Extensión, Cantón Lourdes, Colón",
    note: "A 2013 investigation documented three primary burials whose pits cut through the Ilopango TBJ deposit; the sources publish no coordinate or site boundary.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 167–168, 172 (printed pp. 167–168, 172), ‘Nuevo Lourdes,’ ‘Método,’ and post-Ilopango discussion",
          167,
        ),
        citationNote:
          "Printed pp. 167–168 locate Nuevo Lourdes west of Urbanización Nuevo Lourdes Extensión, date the investigation to 2013, describe three primary burials with offerings whose pits began at the Late Classic occupation level and cut through the TBJ deposit, and identify AMS radiocarbon analysis of the human-bone samples. Printed p. 172 gives the three 2-sigma calibrated ranges. The article publishes no coordinate or site boundary.",
      },
      {
        ...institutional(
          "anales-56.pdf",
          "PDF pp. 35, 37 (printed pp. 35, 37), discussion of Terminal Preclassic ceramics and repopulation",
          35,
        ),
        citationNote:
          "Printed p. 35 reports Terminal Preclassic ceramic activity at Nuevo Lourdes Poniente, including mammiform supports and Usulután decoration combined with a red band, based on a personal communication. Printed p. 37 summarizes the three bone samples and cautiously infers that settlement began before the earliest dated death; that repopulation estimate is an interpretation, not a direct radiocarbon date.",
      },
    ],
  },
  {
    id: "chanmico",
    name: "Chanmico",
    lat: 13.795,
    lon: -89.344,
    precision: "approx",
    kind: "Potential archaeological locality",
    basis: "Approximate marker north of Laguna Chanmico",
    note: "The sources place the archaeological site north of the lake but publish no coordinate or boundary.",
    sources: [
      {
        ...externalPdf(
          "2014-erquicia-estadistica-1854-arqueologia.pdf",
          "PDF p. 6 (printed p. 213), discussion of archaeological places around Laguna Chanmico",
          "https://www.asociaciontikal.com/wp-content/uploads/2017/07/Simp27-18-Erquicia.pdf",
          6,
        ),
        citationNote:
          "Printed p. 213 identifies Chanmico as one of several pre-Hispanic archaeological sites around the lake and places it north of Laguna Chanmico. It does not publish a coordinate, site boundary, date range, field method, or site-specific find list; the pottery fragments reported historically on the lake's northern shore are not explicitly assigned to this site.",
      },
      {
        ...institutional(
          "anales-56.pdf",
          "PDF p. 27 (printed p. 27), San Andrés and brief research background",
          27,
        ),
        citationNote:
          "Printed p. 27 lists Chanmico among archaeological sites in the Zapotitán Valley and cites a separate Chanmico investigation article. This passage does not describe the investigation, finds, chronology, or exact location.",
      },
    ],
  },
  {
    id: "antiguo-cuscatlan-avenida-navas",
    name: "Antiguo Cuscatlán (Avenida Navas)",
    lat: 13.67218,
    lon: -89.23927,
    precision: "published",
    kind: "Excavated site",
    basis: "Published site coordinate, corroborated by the report’s Avenida Navas / Pasaje 4 locality map",
    note: "The coordinate is converted from N13°40.331′ / W89°14.356′, published in a later study of the same 1987 rescue.",
    sources: [
      {
        ...fundar(
          "milpas.pdf",
          "PDF pp. 7–8, ‘La Tefra Cuzcatan’",
          7,
        ),
        citationNote:
          "PDF p. 7 publishes the site coordinate N13°40.331′ / W89°14.356′ and summarizes the 1987 utility-trench rescue, the cautiously interpreted residential context, burials, and dispersed pottery, obsidian, burned earth, and charcoal. PDF p. 8 assigns the Jerónimo, Coquiama, and Cutumay ceramic groups to the Colos complex, dated about 900–650 BCE. The report does not define the site’s full boundary.",
      },
      {
        ...fundar(
          "antiguo_preclasico.pdf",
          "PDF pp. 1, 3, introduction and burials",
          1,
        ),
        citationNote:
          "PDF p. 1 locates the discovery in a storm-water trench along Pasaje 4 at Avenida Navas, dates the investigation to 1987, and describes the cultural layer and its principal features. PDF p. 3 reports at least seven burials in a ten-metre trench segment and explicitly says no artifacts were associated with the burials.",
      },
      {
        ...fundar(
          "antiguo_preclasico.pdf",
          "PDF p. 6, Feature 4 and artifacts",
          6,
        ),
        citationNote:
          "The report documents a 2 × 1 m test pit excavated about 40 cm below the existing trench floor and gives an initial description of the recovered pottery and other artifacts. It does not describe a broader excavation grid.",
      },
      {
        ...fundar(
          "antiguo_preclasico.pdf",
          "PDF p. 11, Figure 1 locality map",
          11,
        ),
        citationNote:
          "Figure 1 places the find section within the storm-water trench on Pasaje 4 immediately south of Avenida Navas. It provides a scale and north arrow but no geographic coordinate; the coordinate comes from the later Milpas study.",
      },
    ],
  },
  {
    id: "madreselva",
    name: "Madreselva",
    lat: 13.6669,
    lon: -89.251,
    precision: "landmark",
    kind: "Excavated site",
    basis: "Madre Selva development; Figure 2 maps two structure groups by modern streets",
    note: "The marker represents the mapped development area, not a published geographic coordinate for an excavation unit.",
    sources: [
      {
        ...institutional(
          "1994-amaroli-hermes-velasquez-antiguo-cuscatlan.pdf",
          "PDF pp. 2–3 (printed pp. 528–529); Figure 2 on PDF p. 8 (printed p. 534)",
          2,
        ),
        citationNote:
          "PDF pp. 2–3 locate the rescue program in the Madre Selva development, date two occupations to the Late Classic and Postclassic, and describe the village, burials, and two Postclassic structure groups. Figure 2 maps the structure groups by named streets but publishes no geographic coordinate. The ethnic association proposed for the Late Classic population is explicitly preliminary.",
      },
      {
        ...institutional(
          "identidades-18-arqueologia.pdf",
          "PDF p. 47 (printed p. 47), 1992 Madre Selva rescue account",
          47,
        ),
        citationNote:
          "The retrospective account dates rescue activity at the Postclassic Madre Selva site to 1992 and reports that one structure, called the Palacio de Madre Selva, was dismantled and reassembled nearby. It does not date the site's Late Classic occupation or provide an excavation coordinate.",
      },
    ],
  },
  {
    id: "sitio-c-la-viuda",
    name: "Sitio C ‘La Viuda’",
    lat: 13.648,
    lon: -89.268,
    precision: "approx",
    kind: "Excavated site",
    basis: "Ciudad Nuevo Cuscatlán; the cited source gives no parcel location or coordinate",
    note: "A later review identifies a 1996 internal report on rescue excavations at Site C but does not reproduce the excavation results or locate the site.",
    sources: [
      {
        ...institutional(
          "anales-56.pdf",
          "PDF p. 54 (printed p. 54), Table 2",
          54,
        ),
        citationNote:
          "Table 2 lists a 1996 CONCULTURA report on rescue excavations at Site C (La Viuda) in Ciudad Nuevo Cuscatlán, jurisdiction of Antiguo Cuscatlán, La Libertad. The table categorizes the report as covering archaeological and stratigraphic context, funerary pattern, osteological analysis, and associated objects. It does not reproduce the results, assign a period or culture, state the fieldwork date or methods, or publish a parcel location or coordinate.",
      },
    ],
  },
  {
    id: "hacienda-tula",
    name: "Hacienda Tula",
    lat: 13.571,
    lon: -89.268,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate San José Villanueva marker; the report gives route directions but no coordinate",
    note: "This point represents the described hacienda ridge, not a published archaeological coordinate.",
    sources: [
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 18 (printed p. 11), Part II: ‘Tula’",
          18,
        ),
        citationNote:
          "The reconnaissance entry places Tula on Hacienda Tula in the jurisdiction of San José Villanueva, on a flat ridge locally called La Sabana. It reports three small rises, sparse surface sherds, and a March 1942 visit, but publishes no coordinate.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF pp. 55–56 (printed pp. 53–54), Appendix C: ‘I. Tula’",
          55,
        ),
        citationNote:
          "Boggs reports one test trench to sterile soil in each of the two largest rises. Sherds occurred in the lower part of a volcanic-ash layer; the only stone implement was a fragmentary perforated black-scoria object described as a ‘club head,’ and no complete vessel was excavated. The report concludes that the rises’ mound-like appearance did not reflect constructed architecture and interprets the deposit as one brief occupation during an eruption.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 58 (printed p. 56), Appendix C: ‘Discussion’",
          58,
        ),
        citationNote:
          "Ceramic comparison suggested that Hacienda Tula was roughly contemporaneous with late Tazumal and Campana–San Andrés. The report says the regional ceramic chronology was not securely defined, so it does not support a firm period or culture assignment.",
      },
    ],
  },
  {
    id: "club-internacional",
    name: "Club Internacional",
    lat: 13.6979,
    lon: -89.1906,
    precision: "approx",
    kind: "Find locality",
    basis:
      "Reported approximately 20 m north of 2a Calle Oriente and 35 m east of 2a Avenida Sur",
    note: "The marker approximates the report’s street offsets; the source gives no coordinate or archaeological boundary.",
    sources: [
      {
        ...fundar(
          "boggs_club.pdf",
          "PDF pp. 1–2 (printed pp. 238–239), discovery and stratigraphy",
          1,
        ),
        citationNote:
          "Boggs reports that basement workers found a compact deposit of pre-Hispanic objects in 1939. The contractor supplied the street offsets and described the deposit as lying at the base of, but within, the upper volcanic-ash stratum. The report publishes no coordinate, site boundary, or controlled excavation.",
      },
      {
        ...fundar(
          "boggs_club.pdf",
          "PDF p. 7 (printed p. 244), collection inventory",
          7,
        ),
        citationNote:
          "The inventory describes pottery, a small pottery head, and an object Boggs identified tentatively as a peccary tusk.",
      },
      {
        ...fundar(
          "boggs_club.pdf",
          "PDF pp. 9–10 (printed pp. 246–247), ceramic comparison and dating",
          9,
        ),
        citationNote:
          "Boggs tentatively compares the Club Internacional pottery association with late 9th-cycle Maya styles. He explicitly says that the ethnic attribution of one relevant polychrome style could not be proved, so the source does not support a culture assignment.",
      },
    ],
  },
  {
    id: "cerro-zapote-san-jacinto",
    name: "Cerro Zapote, San Jacinto",
    lat: 13.676,
    lon: -89.189,
    precision: "approx",
    kind: "Excavated site",
    basis:
      "Road across Cerro Zapote above the Río Acelhuate, opposite Finca Modelo",
    note: "Approximate hill-area marker; the excavation report includes a section sketch but no coordinate, and the historical road location has not been tied to the modern street network.",
    sources: [
      {
        ...fundar(
          "lothrop_pottery_types.pdf",
          "PDF pp. 16–17 (printed pp. 172–173), excavation location and results",
          16,
        ),
        citationNote:
          "Lothrop reports that a place on Cerro Zapote was selected in January 1926 where remains occurred in buried humus and in the overlying ash. He locates the excavation beside a road across the hill above the Río Acelhuate, opposite Finca Modelo, and records a pottery head, numerous sherds, and obsidian-blade fragments. Figure 3 is a section sketch, not a coordinate map.",
      },
      {
        ...fundar(
          "lothrop_pottery_types.pdf",
          "PDF p. 19 (printed p. 175), lower-deposit pottery and figurine",
          19,
        ),
        citationNote:
          "The primary report describes a modeled pottery head, a figurine recovered by Jorge Lardé from the same lower layer, and thick-walled sherds with orange wash, incised lines or grooves, and parallel-line painted decoration. Its period and culture terminology is historical and should not be treated as a modern cultural attribution.",
      },
      {
        ...fundar(
          "lothrop_pottery_types.pdf",
          "PDF p. 29 (printed p. 185), mixed upper-ash assemblage",
          29,
        ),
        citationNote:
          "Lothrop records figurines, plumbate or glazed ware, and vessels with Tlaloc heads in the upper ash, while warning that the upper materials could not be separated with the methods then used. The page does not establish a single date or culture for that mixed deposit.",
      },
      {
        ...fundar(
          "casasola_panorama.pdf",
          "PDF p. 4 (printed p. 719), central-region chronology",
          4,
        ),
        citationNote:
          "Casasola assigns the Cerro Zapote lower finds to the Middle–Late Formative and separately lists Cerro El Zapote among central-region Postclassic sites. The synthesis does not securely date the mixed upper deposit or assign the full site to one culture.",
      },
    ],
  },
  {
    id: "basilica-el-pilar",
    name: "Iglesia El Pilar",
    lat: 13.643,
    lon: -88.7853,
    precision: "landmark",
    kind: "Historical church · archaeological investigation",
    basis: "Standing El Pilar church in San Vicente",
    note:
      "A 2003 investigation documented catacombs, architectural features, and Colonial-period cultural materials; the published summary does not state the field method.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          'PDF p. 7 (printed p. 433), historical-archaeology section',
          7,
        ),
        citationNote:
          "Records a 2003 investigation at Iglesia El Pilar in San Vicente and lists catacombs, architectural features, and Colonial-period cultural materials; it does not describe the field method.",
      },
      {
        ...institutional(
          "anales-57-58.pdf",
          'PDF p. 290 (printed p. 290), "Algunas iglesias construidas durante la época colonial"',
          290,
        ),
        citationNote:
          "Identifies the church of El Pilar in the city of San Vicente as one of the first churches declared a colonial-church national monument in 1953; it does not discuss the 2003 investigation.",
      },
    ],
  },
  {
    id: "cihuatan-p7",
    name: "Cihuatán (Structure P-7)",
    lat: 13.9806,
    lon: -89.1645,
    precision: "published",
    kind: "Excavated site",
    basis:
      "Published WGS84 UTM coordinate for project Datum A-2001, converted to WGS84",
    note:
      "The marker represents survey datum A-2001 southwest of P-7, not the pyramid center; the report estimates the GPS error at about 15 m.",
    sources: [
      {
        ...fundar(
          "P7.pdf",
          "PDF pp. 4–5 (printed pp. 1–2), summary and introduction",
          4,
        ),
        citationNote:
          "Identifies P-7 as Cihuatán’s principal pyramid, reports the 2001–2002 investigation, and summarizes the limited excavations, documented architecture, and burned debris. The broader city description is context, not evidence that this marker represents all of Cihuatán.",
      },
      {
        ...fundar(
          "P7.pdf",
          "PDF pp. 15–17 (printed pp. 12–14), topographic survey and excavation methods",
          15,
        ),
        citationNote:
          "PDF p. 15 publishes WGS84 UTM 16N coordinates 266186 E / 1546646 N for Datum A-2001 and estimates about 15 m GPS error. The plan on PDF p. 16 places that datum southwest of P-7, so the coordinate is not the pyramid center. PDF p. 17 describes the stratigraphic excavation units and stair-cleaning area.",
      },
      {
        ...fundar(
          "P7.pdf",
          "PDF p. 55 (printed p. 52), dating and terminal burning",
          55,
        ),
        citationNote:
          "Describes the chronological evidence as sparse but consistent with the Early Postclassic Guazapa phase (900–1200 CE), names the diagnostic ceramic groups, and reports abundant burned terminal debris. Warfare is presented only as a possible cause, not a demonstrated event.",
      },
    ],
  },
  {
    id: "carranza",
    name: "Carranza",
    lat: 13.9468,
    lon: -89.1694,
    precision: "published",
    kind: "Excavated site",
    basis:
      "Published NAD27 UTM 16N coordinate for local Datum A, transformed to WGS84",
    note:
      "The marker represents the local survey datum, not a structure center; the report estimates about 5 m GPS error, and reconnaissance did not establish the site's limits.",
    sources: [
      {
        ...fundar(
          "carranza1.pdf",
          "PDF p. 5, survey datum and preliminary reconnaissance",
          5,
        ),
        citationNote:
          "Publishes NAD27 UTM 16N coordinates 265619 E / 1542711 N for local Datum A and estimates about 5 m GPS error. The same page says reconnaissance had not established the site's limits and documents rescue excavation beginning on March 12, 2002.",
      },
      {
        ...fundar(
          "carranza2.pdf",
          "PDF p. 4 (printed p. 1), summary and introduction",
          4,
        ),
        citationNote:
          "Places Carranza near the southern end of Cihuatán, reports two low structures and additional structures damaged by decades of sugarcane cultivation, and summarizes the Structure 1 rescue and ceramic Xipe Tótec fragments. It does not establish the site's full limits.",
      },
      {
        ...fundar(
          "carranza2.pdf",
          "PDF pp. 8–11 (printed pp. 5–8), excavation and findings",
          8,
        ),
        citationNote:
          "Documents six weeks of work in 39 units totaling 182 square meters, the complete exposure of Structure 1, its stair and three chambers, nearly 100 fragments of a large ceramic figure identified as Xipe Tótec, and pottery dating to 900–1200 CE, possibly 950–1100 CE.",
      },
      {
        ...fundar(
          "xipe3.pdf",
          "PDF p. 1 (printed p. 24), second Xipe Tótec figure",
          1,
        ),
        citationNote:
          "Reports continuing Carranza excavations and a second near-life-sized ceramic Xipe Tótec figure, dismembered and buried in an offering in front of Structure 2 with more than 500 ceramic vessels and abundant obsidian blades. The April 2004 publication does not state the field dates.",
      },
    ],
  },
  {
    id: "las-marias-tlaloc",
    name: "Las Marías (Tláloc deposit)",
    lat: 13.9259,
    lon: -89.2675,
    precision: "published",
    kind: "Excavated site",
    basis: "Published WGS84 UTM 16N coordinate for the 2002 find and excavation",
    note: "The marker is the reported find spot and excavation unit, about 80 m west of Las Marías’ principal pyramid.",
    sources: [
      {
        ...fundar(
          "tlalocreport.pdf",
          "PDF pp. 1–3, find location and rescue excavation",
          1,
        ),
        citationNote:
          "PDF p. 1 places the find about 80 m west of the principal pyramid. PDF p. 2 publishes WGS84 UTM 16N 254999 E / 1540700 N and dates the excavation to July 12–20, 2002. PDF p. 3 describes the 2 × 2 m unit, excavation methods, three levels, and maximum depth of 40 cm.",
      },
      {
        ...fundar(
          "tlalocreport.pdf",
          "PDF pp. 5–8, buried construction and artifacts",
          5,
        ),
        citationNote:
          "Documents the exposed tuff-block construction and cobbled surface, fragments representing at least three unusually large Tláloc bottles, a few vessel sherds, and prismatic obsidian-blade fragments. Ritual use and a terminal destruction event are explicitly described as speculative; the excavation did not establish either interpretation.",
      },
      {
        ...fundar(
          "lasmariasurgencia.pdf",
          "PDF p. 1, tentative site date and cultural interpretation",
          1,
        ),
        citationNote:
          "A 2000 assessment tentatively dates Las Marías to 900–1200 CE and interprets it as a Pipil satellite of Cihuatán. These are site-wide interpretations, not an independent date or cultural identification for the 2002 excavation unit.",
      },
    ],
  },
  {
    id: "ciudad-vieja",
    name: "Ciudad Vieja",
    lat: 13.8594,
    lon: -89.0325,
    precision: "approx",
    kind: "Excavated site",
    basis:
      "Approximate marker; a cited summary places the site about 10 km south of Suchitoto but publishes no coordinate",
    note:
      "Excavation is documented for 1996–2005; the cited passages do not describe the methods or finds.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 7 (printed p. 433), Ciudad Vieja project summary",
          7,
        ),
        citationNote:
          "This summary identifies Ciudad Vieja as the first stable settlement of the Villa de San Salvador, founded in 1528 and probably abandoned in 1545 or later. It says archaeological investigation began in 1996 and records multiple field seasons from 2000 through 2005, but publishes no coordinate, method, or find inventory.",
      },
      {
        ...fundar(
          "parks.pdf",
          "PDF p. 28, ‘A Sixth Park?’",
          28,
        ),
        citationNote:
          "The park summary places Ciudad Vieja about 10 km south of Suchitoto and states that it was excavated from 1996 to 2005. It describes an early colonial town inhabited by Spaniards and Mexican Indigenous auxiliaries, but gives no coordinate or excavation details; its 1525 start date conflicts with the 1528 foundation date in the project summary and is not used here.",
      },
    ],
  },
  {
    id: "santa-maria",
    name: "Santa María",
    lat: 14.0236,
    lon: -89.0241,
    precision: "published",
    kind: "Excavated site",
    basis: "Published WGS84 UTM coordinate for the principal pyramid, converted to latitude and longitude",
    note: "The marker represents the principal pyramid, not the full site boundary.",
    sources: [
      {
        ...fundar(
          "drowned.pdf",
          "PDF pp. 3–5 (printed pp. 1–3), introduction and previous studies",
          3,
        ),
        citationNote:
          "The report identifies Santa María as a Guazapa-phase settlement, summarizes its 1974 registration, 1976 mapping and excavation, and 2002–2003 visits, and publishes a WGS84 UTM coordinate for the principal pyramid. The coordinate locates that structure rather than the site boundary.",
      },
      {
        ...fundar(
          "drowned.pdf",
          "PDF p. 7 (printed p. 5), updated site description",
          7,
        ),
        citationNote:
          "The 2003 low-water visit recorded exposed structures with GPS, measurements, and photographs and documented severe reservoir erosion. The report does not establish that all remains are permanently submerged.",
      },
    ],
  },
  {
    id: "hacienda-colima",
    name: "Hacienda Colima",
    lat: 14.0494,
    lon: -89.1388,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate Hacienda Colima locality marker",
    note: "The cited bibliography identifies a 1974 excavation at Hacienda Colima but does not publish the archaeological location; the marker is approximate.",
    sources: [
      {
        ...fundar(
          "drowned.pdf",
          "PDF p. 30 (printed p. 28), Crane reference",
          30,
        ),
        citationNote:
          "The reference title documents rescue excavations conducted at Hacienda Colima in 1974 as Project No. 2 of the Cerrón Grande program. It does not provide a coordinate, period, methods, or finds.",
      },
    ],
  },
  {
    id: "la-cienaga-santa-barbara",
    name: "Hacienda Santa Bárbara",
    lat: 14.0667,
    lon: -89.1,
    precision: "approx",
    kind: "Find locality",
    basis: "Approximate Hacienda Santa Bárbara locality; the cited archaeological sources publish no coordinate",
    note: "The marker is approximate and does not represent a documented site boundary. A bibliography mentions La Ciénaga separately from Hacienda Santa Bárbara and nearby sites, so this record does not treat those names as aliases.",
    sources: [
      {
        ...fundar(
          "frontier.pdf",
          "PDF p. 8 (printed p. 292), Classic-period regional discussion",
          8,
        ),
        citationNote:
          "The synthesis identifies Santa Bárbara as a ritual center in the north-central Lempa region and reports Copador-related wares, some stuccoed vessels with Maya motifs, and other artifacts related to the Copán–Quiriguá area. It gives no coordinate, site boundary, fieldwork date, or excavation details.",
      },
      {
        ...fundar(
          "bruhns.pdf",
          "PDF p. 20 (printed p. 10), Cerrón Grande salvage-project summary",
          20,
        ),
        citationNote:
          "The summary places Hacienda Santa Bárbara among the Classic-period sites investigated by the Cerrón Grande survey and associated excavations and reports quantities of Copador and related polychromes and other Maya- and Mayoid-related wares. It says settlement information from the operations is scanty and does not provide Santa Bárbara-specific methods or dates.",
      },
      {
        ...fundar(
          "drowned.pdf",
          "PDF p. 30 (printed p. 28), references",
          30,
        ),
        citationNote:
          "The bibliography lists a 1976 report on investigations at Hacienda Santa Bárbara and a separate 1991 report title covering La Ciénaga, Hacienda Santa Bárbara, and nearby sites. The bibliography does not establish that La Ciénaga and Hacienda Santa Bárbara are alternate names for one site.",
      },
    ],
  },
  {
    id: "hacienda-los-flores",
    name: "Hacienda Los Flores",
    lat: 14.0306,
    lon: -89.0472,
    precision: "approx",
    kind: "Surveyed site",
    basis:
      "Approximate Los Flores marker; the cited pages publish no reproducible site coordinate.",
    note:
      "The sources identify a Late Preclassic center with a circular Mound 10, but do not establish its present condition.",
    sources: [
      {
        ...fundar(
          "roundreport.pdf",
          "PDF p. 2 (printed p. 2), comparison of circular structures",
          2,
        ),
        citationNote:
          "The report identifies Los Flores Mound 10 as a circular Late Preclassic structure discovered during the Cerrón Grande rescue. It gives no Los Flores coordinate, fieldwork date, or investigation method.",
      },
      {
        ...fundar(
          "kelley_1988.pdf",
          "PDF p. 23 (printed p. 9), Paraíso Basin culture history",
          23,
        ),
        citationNote:
          "The synthesis places Los Flores in the Late Preclassic Dulce Nombre phase (ca. 400 BCE–250 CE) and describes it as a ritual-administrative center for a substantial basin population. It does not publish a site coordinate or site-specific field methods.",
      },
    ],
  },
  {
    id: "el-tanque-el-morrito",
    name: "El Tanque / Hacienda El Morrito",
    lat: 14.043,
    lon: -89.03,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate Hacienda El Morrito-area marker; the cited sources publish no archaeological coordinate",
    note: "The point does not represent a documented site boundary or excavation location.",
    sources: [
      {
        ...fundar(
          "frontier.pdf",
          "PDF p. 8 (printed p. 292), Classic-period regional discussion",
          8,
        ),
        citationNote:
          "The synthesis identifies El Tanque as a nucleated ritual center in north-central El Salvador where Copador-related wares, stuccoed vessels with Maya motifs, and other artifacts related to the Copán–Quiriguá area were present. It gives no coordinate, site boundary, fieldwork date, or operation details.",
      },
      {
        ...fundar(
          "bruhns.pdf",
          "PDF p. 20 (printed p. 10), Cerrón Grande salvage-project summary",
          20,
        ),
        citationNote:
          "The summary places El Tanque among the Classic-period sites investigated by the Cerrón Grande survey and associated excavations. It reports quantities of Copador and related polychromes and other Maya- and Mayoid-related wares at El Tanque, Santa Bárbara, and Colima collectively, and says settlement information from the operations is scanty. It provides no site-specific fieldwork date or coordinate.",
      },
      {
        ...fundar(
          "drowned.pdf",
          "PDF p. 30 (printed p. 28), Fowler reference",
          30,
        ),
        citationNote:
          "The bibliography lists a 1976 preliminary report on excavations of Mound 3 at El Tanque, Hacienda El Morrito. The entry establishes the place name and excavation subject, but it does not state when fieldwork occurred or describe methods or finds.",
      },
    ],
  },
  {
    id: "cerron-grande-unnamed",
    name: "Cerrón Grande rescue project area",
    lat: 14.05,
    lon: -89.015,
    precision: "approx",
    kind: "Regional rescue-project summary",
    basis: "Approximate Cerrón Grande reservoir-area marker",
    note: "The point represents the broad rescue-project area, not any one of the 22 identified sites or nine excavated sites.",
    sources: [
      {
        ...fundar(
          "drowned.pdf",
          "PDF p. 23 (printed p. 21), project-impact assessment",
          23,
        ),
        citationNote:
          "The retrospective reports that the 1974–1977 Cerrón Grande rescue program identified 22 previously unknown sites and excavated nine before inundation. It does not name or locate those nine sites, provide occupation dates, describe site-specific methods or finds, or support an aggregate of exactly four unnamed sites.",
      },
    ],
  },
  {
    id: "paraiso-basin",
    name: "Paraíso Basin excavation evidence",
    lat: 14.061,
    lon: -89.067,
    precision: "approx",
    kind: "Regional excavation evidence",
    basis:
      "Approximate Paraíso Basin marker; the cited review publishes no excavation coordinate or evidence-area boundary",
    note:
      "This is a regional evidence marker, not a single archaeological site or trench.",
    sources: [
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          'PDF p. 8 (printed p. 434), “Recientes investigaciones”',
          8,
        ),
        citationNote:
          "The review says a 1999 dissertation used excavation data from the Paraíso Basin and Nuevo Cuscatlán, ceramic study, and regional comparison to propose an early-fifth-century date for the Ilopango eruption. It also reports a separate radiocarbon estimate of 408–536 CE. The page does not identify the basin excavation locations, fieldwork dates or methods, context stratigraphy, artifact inventories, or coordinates.",
      },
    ],
  },
  {
    id: "loma-china",
    name: "Loma China",
    lat: 13.674,
    lon: -88.503,
    precision: "approx",
    kind: "Excavated site",
    basis: "Lower Lempa River / San Lorenzo reservoir area; the published maps provide no reproducible coordinate",
    note: "Approximate reservoir-area marker. A 1988 account says the site may not have been completely inundated.",
    sources: [
      {
        ...fundar(
          "earliest_pipil.pdf",
          "PDF pp. 13–15 (printed pp. 11–13), ‘The Loma China Site’",
          13,
        ),
        citationNote:
          "The account places Loma China beside the lower Lempa River in the San Lorenzo reservoir area, describes the 1982–1983 salvage work, and says three of four mounds were excavated. It documents multiroom structures, a central flexed burial in Structure B, four mosaic-covered sandstone plaques, ceramic vessels, green-obsidian blades, and other objects interpreted as offerings. The author warns that the project results had not been adequately studied and reconstructed the site from field maps, interviews, and the artifact collection.",
      },
      {
        ...fundar(
          "earliest_pipil.pdf",
          "PDF p. 32 (printed p. 30), ‘Tazumal and Loma China: Summary and Interpretation’",
          32,
        ),
        citationNote:
          "The study defines an Early Postclassic Loma China phase beginning around 900–1000 CE and describes Loma China as a single-component site. It does not provide a site-specific end date, so it does not support the former 900–1200 CE range.",
      },
      {
        ...fundar(
          "earliest_pipil.pdf",
          "PDF pp. 48, 53, figs. 1 and 6",
          48,
        ),
        citationNote:
          "Figure 1 gives only Loma China’s general position in El Salvador; Figure 6 sketches four mounds beside the Lempa River but supplies no coordinate or scale. These maps support only an approximate reservoir-area marker, not the plotted latitude and longitude. The text on PDF p. 15 says the site may not have been completely inundated.",
      },
    ],
  },
  {
    id: "san-lorenzo-unnamed",
    name: "San Lorenzo rescue: 5 unnamed sites",
    lat: 13.682,
    lon: -88.515,
    precision: "approx",
    kind: "Grouped excavation locations",
    basis: "San Lorenzo rescue reservoir area",
    note: "Eight sites were excavated in the 1981–1983 rescue. Loma China, El Astillero, and El Jocotal are now mapped separately; five remain grouped because their records are incomplete.",
    sources: [
      institutional("2012-escamilla-fowler-practica-arqueologia.pdf", "PDF p. 5", 5),
      utecSanLorenzo("PDF pp. 86–87", 101),
    ],
  },
  {
    id: "nueva-esperanza",
    name: "Nueva Esperanza",
    lat: 13.3307,
    lon: -88.688,
    precision: "approx",
    kind: "Excavated site",
    basis: "Nueva Esperanza community point, Bajo Lempa",
    note: "The marker represents the modern community center; the publications place the archaeological site in Nueva Esperanza but provide no reproducible coordinate.",
    sources: [
      {
        ...institutional(
          "anales-56.pdf",
          "PDF pp. 66–68 (printed pp. 66–68), Nueva Esperanza burials 2–4 and fig. 4",
          66,
        ),
        citationNote:
          "PDF p. 66 places the modern community about 4.7 km east of the Lempa River in the Bajo Lempa area of Jiquilisco and attributes the comparatively good bone preservation to the lacustrine setting, but publishes no site coordinate. PDF p. 67 dates Burials 2–4 by ceramics and stratigraphy to the Late Preclassic (400 BCE–250 CE) and Early Classic (250–400 CE) and identifies a child, a young adult man, and an adult woman. PDF pp. 67–68 describe their dental traits; fig. 4 illustrates them. The article says the burial analysis was still in progress.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 165–166 (printed pp. 165–166), Nueva Esperanza stratigraphy and 2011 samples",
          165,
        ),
        citationNote:
          "PDF p. 165 places the site in Bajo Lempa, Usulután, beneath about 2 m of primary and secondary Tierra Blanca Joven deposits. It documents a woman buried with 19 ceramic offerings and fig. 2 shows the stratigraphy of Pozo 1 in the 2011 season. PDF p. 166 identifies two charcoal samples from archaeological layers in that same excavation. These pages do not publish a reproducible site coordinate or describe a settlement boundary.",
      },
    ],
  },
  {
    id: "wreck-anden",
    name: "Anden",
    lat: 13.6852,
    lon: -90.0005,
    precision: "landmark",
    kind: "Maritime archaeology · diesel freighter",
    basis: "OpenStreetMap wreck geometry, matching the paper’s location about 50 m southwest of the Barra de Santiago beach",
    note: "The Peruvian freighter grounded during the September 1982 storm and broke into several large sections. The papers report that parts remain visible at low tide.",
    sources: [
      institutional("anales-53.pdf", "PDF pp. 16–17", 16),
      uesMaritimeThesis("PDF p. 32", 32),
    ],
  },
  {
    id: "wreck-ss-colon",
    name: "SS Colón",
    lat: 13.597969,
    lon: -89.83975,
    precision: "published",
    kind: "Maritime archaeology · steamship wreck",
    basis: "13°35′52.69″ N, 89°50′23.10″ W printed in Gallardo’s dedicated site report",
    note: "The surviving engine remains lie on Acajutla beach roughly 200 m southeast of the Río Sensunapán mouth. The ship struck Punta Remedios in 1904 before being driven onto the beach.",
    sources: [
      institutional("anales-53.pdf", "PDF pp. 16–17", 16),
      utecColonReport("PDF p. 7", 7),
    ],
  },
  {
    id: "wreck-ss-columbus",
    name: "SS Columbus",
    lat: 13.5515,
    lon: -89.828,
    precision: "approx",
    kind: "Maritime archaeology · steamship wreck",
    basis: "Punta Remedios reef at Los Cóbanos, estimated from Anales 53 Figure 1 between SS Colón and the published Cheribon position",
    note: "The wreck lies on the Los Cóbanos reef at about 20 feet depth. No public GPS coordinate was recovered, so this marker represents the mapped reef sector rather than a surveyed point.",
    sources: [
      institutional("anales-53.pdf", "PDF pp. 16–17", 16),
      uesMaritimeThesis("PDF pp. 40–41", 40),
    ],
  },
  {
    id: "wreck-cheribon",
    name: "Cheribon",
    lat: 13.532806,
    lon: -89.829194,
    precision: "published",
    kind: "Maritime archaeology · steamship wreck",
    basis: "13°31′58.1″ N, 89°49′45.1″ W reported as the GPS position",
    note: "The 1882 steamship wreck is catalogued at Punta Remedios in the Los Cóbanos protected area. Parts of its engine can emerge above the surface during very low tide.",
    sources: [
      institutional("anales-53.pdf", "PDF pp. 16–17", 16),
      uesMaritimeThesis("PDF p. 42", 42),
    ],
  },
  {
    id: "wreck-ss-douglas",
    name: "SS Douglas (Sakkarah)",
    lat: 13.4983,
    lon: -89.81095,
    precision: "published",
    kind: "Maritime archaeology · steamship wreck",
    basis: "13°29.898′ N, 89°48.657′ W reported for survey point ‘Douglas 1’",
    note: "The wreck lies about 2.5 km southwest of Punta Remedios at roughly 15–35 feet depth. It sank with a cargo of coffee after striking the reef in 1890.",
    sources: [
      institutional("anales-53.pdf", "PDF pp. 16–17", 16),
      uesMaritimeThesis("PDF p. 44", 44),
    ],
  },
  {
    id: "wreck-ss-san-blas",
    name: "SS San Blas",
    lat: 13.484108,
    lon: -89.358117,
    precision: "published",
    kind: "Maritime archaeology · steamship wreck",
    basis: "13°29′02.79″ N, 89°21′29.22″ W, the GPS position of the largest engine section",
    note: "The remains extend roughly 200 m east–west at the rocky eastern end of Playa San Blas, near the Río Comasagua mouth. The steamer grounded there in 1901.",
    sources: [
      institutional("anales-53.pdf", "PDF pp. 16–17", 16),
      utecSanBlasReport("PDF p. 4", 4),
    ],
  },
  {
    id: "pecio-psj-1",
    name: "Pecio PSJ-1",
    lat: 13.1738,
    lon: -88.4783,
    precision: "published",
    kind: "Excavated site",
    basis:
      "13°10′25.6″ N, 88°28′41.7″ W published for the wreck at the east end of the San Juan del Gozo peninsula",
    note:
      "A 2012 visit confirmed a riveted iron mast fragment. Four 2 × 2 m pits later exposed the mast base; groundwater halted excavation at 1.10 m.",
    sources: [
      {
        ...institutional(
          "anales-55.pdf",
          'PDF pp. 47–49, abstract, “Identificación,” “Ubicación,” and “Excavaciones arqueológicas”',
          47,
        ),
        citationNote:
          "The abstract identifies archaeological excavation and classifies the work as steamship, industrial, and maritime archaeology. The article documents the August 2012 visit, the published coordinate, and the November excavation of four 2 × 2 m pits. It identifies the exposed iron feature as a mast, says groundwater halted excavation, and states that neither the vessel name nor its construction date could be determined.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 16–17, maritime-wreck overview and Figure 2 registered-wreck table",
          16,
        ),
        citationNote:
          "The overview describes the registered wrecks as maritime archaeological sites. The table lists PSJ-1 at Jiquilisco as a steamship wreck registered in 2012, while leaving its construction date, tonnage, and loss date unknown.",
      },
    ],
  },
  {
    id: "wreck-kirkdale",
    name: "Kirkdale",
    lat: 13.17,
    lon: -88.443889,
    precision: "published",
    kind: "Maritime archaeology · sailing ship wreck",
    basis: "13°10′12.0″ N, 88°26′38.0″ W reported as the GPS position",
    note: "The wreck lies east of the Bocana El Bajón near Isla San Sebastián at roughly 60–65 feet depth. Local fishers called the site ‘El Guirdalia.’",
    sources: [
      institutional("anales-53.pdf", "PDF pp. 16–17", 16),
      uesMaritimeThesis("PDF p. 52", 52),
    ],
  },
  {
    id: "wreck-brucklay-castle",
    name: "Brucklay Castle",
    lat: 13.155,
    lon: -88.444,
    precision: "approx",
    kind: "Maritime archaeology · sailing ship wreck",
    basis: "Offshore near the Bocana El Bajón bar, estimated from the loss account and Anales 53 Figure 1",
    note: "The barque was abandoned on the Jiquilisco bar in 1896. The registry explicitly says the wreck had not been precisely visited or located, so this is a search-area marker, not a confirmed wreck position.",
    sources: [
      institutional("anales-53.pdf", "PDF pp. 16–18", 16),
      uesMaritimeThesis("PDF p. 56", 56),
    ],
  },
  {
    id: "wreck-ss-honduras",
    name: "SS Honduras",
    lat: 13.142,
    lon: -88.472,
    precision: "approx",
    kind: "Surveyed site",
    basis:
      "Approximate area 3.5–4 km offshore from the San Juan del Gozo peninsula, on the sandbank west of the El Bajón outlet channel",
    note:
      "The article does not publish the recorded GPS coordinate; it says the coordinate is available from the Directorate of Archaeology. This marker is an approximate area based on the published description and Figure 4.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 15, 18–20, 35–38 (printed pp. 15, 18–20, 35–38), abstract, identification, location, site conditions, and recovered materials",
          15,
        ),
        citationNote:
          "The article documents diver inspection, selective object recovery, and historical research used to identify the wreck as SS Honduras. It gives the vessel's 1871 construction and April 25, 1886 loss dates; places the site about 3.5–4 km offshore on the sandbank west of the El Bajón outlet; states that the GPS coordinate is available from the Directorate of Archaeology rather than printing it; and describes the surviving machinery and recovered objects. Figure 4 supports only an approximate public marker.",
      },
    ],
  },
  {
    id: "los-llanitos",
    name: "Los Llanitos",
    lat: 13.3318,
    lon: -88.1979,
    precision: "approx",
    kind: "Excavated site",
    basis:
      "Approximate reconstruction: a pasture 500 m west of the road and about 1 km south of Los Llanitos village",
    note:
      "Longyear published relative distances and a sketch map, not a geodetic coordinate.",
    sources: [
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 20 (printed p. 13), Los Llanitos site entry",
          20,
        ),
        citationNote:
          "The site entry places Los Llanitos 22 km south of San Miguel, on the west side of the road to Playa de Cuca, in a pasture about 500 m west of the road and 1 km south of Los Llanitos village. It reports a ballcourt, a mound group, pottery, and stone but gives no coordinate.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF pp. 32–39 (printed pp. 27–34), Part III introduction and excavation results",
          32,
        ),
        citationNote:
          "The report maps about a dozen mounds, describes the plaza and ballcourt, and documents excavation from February 3 to March 13, 1942. It says most excavation focused on the ballcourt, with three other mounds investigated, and describes rough pumice-block walls set in adobe mortar, stone slabs, pottery, and obsidian. The author interpreted the uniform pottery and construction as evidence for one occupation period but did not assign an absolute date.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF pp. 46–47 (printed pp. 40–41), ‘Caches’",
          46,
        ),
        citationNote:
          "The cache section documents deposits in Mounds 2 and 7 containing pottery vessels and sherds, incense burners, stone slabs, and obsidian objects. It does not date the deposits.",
      },
      {
        ...fundar(
          "haberland_sequences.pdf",
          "PDF pp. 3, 7 (printed pp. 23, 27), Figure 2 and eastern-sequence discussion",
          3,
        ),
        citationNote:
          "Haberland's explicitly tentative sequence places the Los Llanitos ceramic complex around 1100–1200 CE. His discussion links it closely, but not identically, to the Lower Lempa ceramic complex and says Los Llanitos may be slightly later. This does not establish an ethnic identity.",
      },
    ],
  },
  {
    id: "quelepa",
    name: "Quelepa",
    lat: 13.5294,
    lon: -88.2217,
    precision: "approx",
    kind: "Excavated site",
    basis:
      "Archaeological zone about 8 km northwest of San Miguel; the cited sources publish no coordinate",
    note:
      "Excavation in 1967–1969 used ceramic and architectural evidence to establish a sequence for eastern El Salvador.",
    sources: [
      {
        ...fundar(
          "wyllys_flautas.pdf",
          "PDF p. 13 (printed p. 7), site and excavation summary",
          13,
        ),
        citationNote:
          "Andrews places the archaeological zone about 8 km northwest of San Miguel, describes a ceremonial center larger than half a square kilometre, and states that he excavated there from 1967 to 1969. The passage does not publish a coordinate; its preliminary chronology begins before 300 BCE.",
      },
      {
        ...institutional(
          "2012-escamilla-fowler-practica-arqueologia.pdf",
          "PDF p. 3 (printed p. 429), Quelepa project summary",
          3,
        ),
        citationNote:
          "This later summary dates the 1967–1969 excavation program and says its ceramic and architectural analysis established an eastern sequence spanning about 500 BCE to 1000 CE. It does not support a culture assignment or an exact marker coordinate.",
      },
    ],
  },
  {
    id: "casa-quemada",
    name: "Casa Quemada",
    lat: 13.8561,
    lon: -88.3249,
    precision: "published",
    kind: "Excavated site",
    basis: "Published Lambert E 572770 / N 304142, converted to WGS84",
    note:
      "The source publishes a Lambert position but does not name its datum; the converted WGS84 marker should be treated as approximate within the site.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 89 (printed p. 89), article summary",
          89,
        ),
        citationNote:
          "The summary places Casa Quemada on a natural platform beside the Torola River, reports an area of about 9 hectares, dates it to the Late Classic, and says the 2013 rescue excavated 14 of 18 structures and all three plazas.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 90 (printed p. 90), introduction and Figure 1",
          90,
        ),
        citationNote:
          "The source publishes Lambert E 572770 / N 304142 and a topographic plan. It does not identify the coordinate datum, so the WGS84 conversion is not an exact excavation-unit position.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 92 (printed p. 92), 2009 investigations",
          92,
        ),
        citationNote:
          "The site history documents 2009 test pits and trenches at Structure 6 and Plazas 1 and 1-a, and assigns the recovered material to 600–900 CE. The report preliminarily attributes the site to a pre-Lenca culture; this qualified statement is the sole basis for the cautious Eastern Salvadoran / Lenca-related filter.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 93–94 (printed pp. 93–94), excavation results",
          93,
        ),
        citationNote:
          "The results describe fragmentary ceramics, obsidian blades and flakes, four metate fragments, and samples of charcoal, soil, and burned clay. The artifacts came mainly from construction fill rather than primary deposits.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 109–111 (printed pp. 109–111), construction and ceramic-firing feature",
          109,
        ),
        citationNote:
          "The report describes stone-and-earth construction and interprets a fire-reddened pit as a ceramic-firing oven, while acknowledging that terminology for such open-pit features is debated.",
      },
    ],
  },
  {
    id: "el-chaparral",
    name: "El Chaparral",
    lat: 13.861,
    lon: -88.347,
    precision: "approx",
    kind: "Excavated site",
    basis: "South bank of the Torola in the dam-impact sector; no coordinate is published",
    note: "The excavation plan maps the terraces and test pits internally but has no geodetic grid. The marker is an approximate reconstruction from the riverside setting.",
    sources: [
      {
        ...institutional(
          "anales-54.pdf",
          "PDF p. 61 (printed p. 61), abstract and site setting",
          61,
        ),
        citationNote:
          "The report places the site on a steep part of the Torola's south bank in the hydroelectric-project impact area, documents its discovery during 2009 survey, and gives a minimum area of 5,000 m². It calls the terrace walls probably agricultural but chronologically uncertain; Late Classic material on the surface prompted excavation.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF pp. 65–67 (printed pp. 65–67), project history, Figure 1, and field methods",
          65,
        ),
        citationNote:
          "The site was registered as PACH-01-08 and measured about 100 × 50 m. Fieldwork ran from January 16 to February 15, 2013, and opened 12 test pits, mostly 2 × 2 m, across three terraces. Figure 1 is an internal topographic plan with no published coordinate or geodetic grid, so it supports only an approximate marker.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF p. 69 (printed p. 69), excavation results and photographs 1–2",
          69,
        ),
        citationNote:
          "The results describe poorly preserved construction: three walls and a semicircular feature on the upper terrace, two walls on the middle terrace, and one wall on the lower terrace. The limited associated stratigraphy and material prevented an exact chronology.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF pp. 75–76 (printed pp. 75–76), material study and photographs 3–4",
          75,
        ),
        citationNote:
          "The study inventoried 932 ceramic fragments, 120 lithic pieces, metates, grinding stones, charcoal samples, and a horseshoe. The ceramic material was sparse, eroded, and in secondary deposits; diagnostic Early and Late Classic sherds therefore do not provide a secure date for the walls.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF pp. 78–79 (printed pp. 78–79), interpretation and conclusions",
          78,
        ),
        citationNote:
          "The authors conclude that none of the ceramic or lithic material was in primary position and that the walls can be dated only after the Late Classic. They suggest, without establishing, a colonial date and agricultural function.",
      },
    ],
  },
  {
    id: "el-chiquirin",
    name: "El Chiquirín",
    lat: 13.2917,
    lon: -87.7795,
    precision: "landmark",
    kind: "Excavated site",
    basis: "Punta El Chiquirín coastal landmark",
    note: "The report places the site about 150 m from the beach but does not publish a coordinate for the investigated lot.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 43 (printed p. 43), abstract",
          43,
        ),
        citationNote:
          "The abstract identifies a 2002 rescue excavation at the El Chiquirín shell midden, reports three stone walls filled with mollusk shells and a burial with nine ceramic vessels, red pigment, and volcanic-rock fragments, and says radiocarbon and ceramic studies suggest a Late Classic main occupation.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 44–49 (printed pp. 44–49), rescue excavation and Figures 1–2",
          44,
        ),
        citationNote:
          "The report places the site at Punta Chiquirín about 150 m from the beach and dates the rescue to late 2002 and early 2003. It documents topographic mapping, six initial 1 × 1 m excavation units and later extensions, three stone walls, and a secondary burial with nine ceramic offerings, red pigment, and volcanic-rock fragments. The locality map and excavation plan do not publish a reproducible site coordinate. Ceramic comparison suggests, rather than proves, a Late Classic date of 600–900 CE.",
      },
    ],
  },
  {
    id: "la-laguneta",
    name: "La Laguneta",
    lat: 13.662477,
    lon: -88.475889,
    precision: "published",
    kind: "Pre-Hispanic settlement · test excavation",
    basis: "Registry digits printed as 13º66’2477”, 88º47’5889”; reconstructed as decimal degrees",
    note: "The reconstructed registry point agrees with the Río Don Gaspar/Lempa setting shown on the San Lorenzo project map.",
    sources: [
      easternAtlas("PDF pp. 45–47", 45),
      utecBallcourts("PDF pp. 64–65", 64),
    ],
  },
  {
    id: "salto-el-coyote",
    name: "Salto El Coyote",
    lat: 13.613986,
    lon: -88.539544,
    precision: "published",
    kind: "Pre-Hispanic settlement · test excavation",
    basis: "Registry digits printed as 13º61’3986”, 88º53’9544”; reconstructed as decimal degrees",
    note: "The registry-derived point is used because it fits the mapped landscape; the thesis printed the decimal digits in a nonstandard degree-minute-second form.",
    sources: [
      easternAtlas("PDF pp. 48–49", 48),
      utecBallcourts("PDF pp. 65–66", 65),
    ],
  },
  {
    id: "el-cacao",
    name: "El Cacao",
    lat: 13.56,
    lon: -88.1,
    precision: "approx",
    kind: "Excavated site",
    basis: "Uluazapa area in San Miguel department; the report withholds the exact site location",
    note: "Approximate regional marker. It does not represent an excavation-unit coordinate.",
    sources: [
      {
        ...easternAtlas(
          "PDF pp. 32, 45, 51 (printed pp. 21, 34, 40), ‘El Cacao’ and figs. 4.1, 4.10–4.12",
          51,
        ),
        citationNote:
          "PDF p. 51 identifies El Cacao in San Miguel department and documents a roughly 10-hectare site on sloping ground, a central plaza, about 10 structures, four additional architectural features, and four test units. The excavation photograph identifies Uluazapa and is dated 01-06-07. PDF p. 32 says the report does not publish specific site locations, while the map on PDF p. 45 supplies regional context only. These pages do not provide an occupation date, cultural affiliation, or site-specific ceramic chronology. The ceramic-count table on PDF p. 51 is headed ‘Salto El Cacao,’ apparently a title error; it appears within the El Cacao section and its units U1–U4 match the site map.",
      },
      {
        ...externalPdf(
          "2009-amador-atlas-arqueologico-oriente.pdf",
          "PDF p. 201 (printed p. 190), table 6.4: Fase Lepa",
          "https://www.ancientamericas.org/sites/default/files/07070esAmador01.pdf",
          201,
        ),
        citationNote:
          "Table 6.4 assigns four ceramic groups reported at El Cacao—Obrajuelo Ordinario, Púas Lolotique, Rojo sobre blanco Delirio, and Polícromo Campana—to the Late Classic Lepa phase, dated 600–900/1000 CE. This supports a Classic-period classification but not a specific cultural or ethnic attribution.",
      },
    ],
  },
  {
    id: "brisas-de-jiquilisco",
    name: "Brisas de Jiquilisco",
    lat: 13.33,
    lon: -88.535,
    precision: "approx",
    kind: "Coastal settlement · test-pit program",
    basis: "A few kilometres northeast of Bahía de Jiquilisco",
    note: "Twenty test pits were excavated. The report withholds a coordinate, so the point shows only the described coastal landscape.",
    sources: [easternAtlas("PDF pp. 51–52", 51)],
  },
  {
    id: "la-florida-jiquilisco",
    name: "La Florida (Jiquilisco)",
    lat: 13.35,
    lon: -88.585,
    precision: "approx",
    kind: "Pre-Hispanic settlement · test-pit program",
    basis: "Jiquilisco jurisdiction, south of the coastal highway",
    note: "Thirty-six test pits sampled the site. Its marker is deliberately broad because the atlas does not publish the protected location.",
    sources: [easternAtlas("PDF pp. 51–52", 51)],
  },
  {
    id: "el-astillero",
    name: "El Astillero",
    lat: 13.685,
    lon: -88.523,
    precision: "approx",
    kind: "San Lorenzo rescue excavation",
    basis: "Pre-inundation project map in the San Ildefonso reservoir sector",
    note: "Sixteen structures were investigated before inundation. The coordinate is reconstructed from the project map rather than a published GPS point.",
    sources: [
      easternAtlas("PDF p. 38", 38),
      utecSanLorenzo("PDF p. 86", 101),
    ],
  },
  {
    id: "el-jocotal",
    name: "El Jocotal",
    lat: 13.654,
    lon: -88.52,
    precision: "approx",
    kind: "Late Classic settlement · rescue excavation",
    basis: "Cantón El Tecomatal and the non-inundated San Lorenzo project map",
    note: "The point is fitted to the Tecomatal locality and source map; no archaeological GPS coordinate is printed.",
    sources: [
      easternAtlas("PDF pp. 38–39", 38),
      utecSanLorenzo("PDF pp. 87, 91", 102),
    ],
  },
  {
    id: "sitio-carolina",
    name: "Sitio Carolina",
    lat: 13.867,
    lon: -88.305,
    precision: "approx",
    kind: "Excavated site",
    basis:
      "Río Torola north bank, no more than 200 m northeast of Fumarolas / Agua Caliente",
    note:
      "Approximate marker reconstructed from the riverbank and Fumarolas relationship; the article publishes no coordinate.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 69 (printed p. 69), Carolina antecedent",
          69,
        ),
        citationNote:
          "The article summarizes a 2003 study that placed Carolina within 1 km east of Fumarolas / Agua Caliente, estimated its extent at about 6 km², and opened nine test pits on the north side of the river. It reports only a small lithic sample, tentatively attributed by that investigator to the Archaic. This is a secondary summary of the unpublished 2003 report.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 65 (printed p. 65), project summary",
          65,
        ),
        citationNote:
          "The article dates the regional archaeological survey and excavation project to 2008–2009. The page provides project context rather than site-specific findings for Carolina.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 71–72 (printed pp. 71–72), ‘Sitio Carolina’",
          71,
        ),
        citationNote:
          "The site entry places Carolina on the Río Torola’s north bank in Sector E, no more than 200 m northeast of Fumarolas / Agua Caliente, and estimates an area no greater than 5 hectares. It reports no visible structures or mounds, proposes a Late Classic date, and describes low-density surface obsidian, chert, ground-stone fragments, and coarse domestic pottery. It publishes no coordinate or independent dating evidence.",
      },
    ],
  },
  {
    id: "fumarolas-agua-caliente",
    name: "Fumarolas / Agua Caliente",
    lat: 13.866,
    lon: -88.307,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Río Torola north bank, less than 200 m southwest of Sitio Carolina",
    note: "Approximate marker reconstructed from the regional survey map and the stated relationship to Sitio Carolina; the sources publish no site coordinate.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 68 (printed p. 68), Figure 1 regional survey map",
          68,
        ),
        citationNote:
          "Figure 1 maps archaeological localities in the proposed inundation area but does not publish a site coordinate. It supports only an approximate marker.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 70–71 (printed pp. 70–71), ‘Sitio Fumarolas Agua Caliente’",
          70,
        ),
        citationNote:
          "The site entry places Fumarolas Agua Caliente in Sector E on the Río Torola’s north bank, estimates its area at about 3 hectares, and reports no visible structures. Surface survey found medium-density grinding-stone fragments, including manos and a metate, and obsidian flakes; no pottery was found. The article assigns the site to the Late Classic (600–900 CE) but provides no absolute date. The Carolina entry places that site no more than 200 m northeast of Fumarolas. No site-specific excavation is documented.",
      },
      {
        ...institutional(
          "anales-54.pdf",
          "PDF p. 65 (printed p. 65), project history and methods",
          65,
        ),
        citationNote:
          "The later project history reports systematic survey of the future reservoir area in November–December 2008 and January 2009, with preliminary excavation only in the event of qualifying finds. It does not state that Fumarolas Agua Caliente was excavated.",
      },
    ],
  },
  {
    id: "gruta-espiritu-santo",
    name: "Gruta del Espíritu Santo",
    lat: 13.821268,
    lon: -87.965133,
    precision: "landmark",
    kind: "Excavated site",
    basis: "Named rock shelter near Corinto",
    note: "The marker represents the shelter, not the 1977 test pits; the cited report says their exact locations and dimensions were not documented.",
    sources: [
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF p. 1 (printed p. 660), project history and 1996 methods",
          1,
        ),
        citationNote:
          "The report identifies the first visit in April 1995 and a ten-day regional rock-art project in April 1996, when the team photographed the paintings and traced about 10 percent of the representations.",
      },
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF pp. 2–4 (printed pp. 661–663), excavation summary, shelter description, and motif inventory",
          2,
        ),
        citationNote:
          "The report summarizes nine test pits excavated in 1977, notes that their exact locations and dimensions are unknown, describes the ignimbrite shelter and its paintings and engravings, and lists human figures, hands, animals, and geometric signs. It does not securely date the rock art.",
      },
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF pp. 5–6 (printed pp. 664–665), tracing method and surface collection",
          5,
        ),
        citationNote:
          "The project made 17 plastic tracings across the Corinto shelters, including three large tracings at Espíritu Santo, and collected 12 potsherds and 270 flaked-stone pieces in front of this shelter. The ceramic identifications are tentative and do not date the paintings.",
      },
    ],
  },
  {
    id: "valle-san-juan-tronconera",
    name: "Hacienda Valle San Juan / La Tronconera",
    lat: 13.3667,
    lon: -88.6167,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate Hacienda Valle San Juan locality",
    note: "The source names Hacienda Valle San Juan and La Tronconera ravine but publishes no archaeological coordinate or map. The marker is approximate.",
    sources: [
      {
        ...fundar(
          "boggs_hornos.pdf",
          "PDF p. 1 (printed p. 769), discovery and investigation history",
          1,
        ),
        citationNote:
          "The report places Hacienda Valle San Juan one kilometer from the sea on the Usulután coast. It says erosion exposed apparently human-made subterranean features in a deep ravine, prompting investigation soon after they were reported in June 1966, followed by observations and excavations in later years. It provides no coordinate or map.",
      },
      {
        ...fundar(
          "boggs_hornos.pdf",
          "PDF p. 2 (printed p. 770), ravine, stratigraphy, and feature forms",
          2,
        ),
        citationNote:
          "The report describes more than a dozen features, identifies the first and five others along the ravine locally called La Tronconera or El Fraile, and explains how exposed profiles showed their stratigraphic relationships. It identifies bell- or bottle-shaped and cylindrical forms; Figure 1 shows the ravine and excavation of an ancient refuse deposit.",
      },
      {
        ...fundar(
          "boggs_hornos.pdf",
          "PDF p. 3 (printed p. 771), interpretation and associated deposits",
          3,
        ),
        citationNote:
          "The report says the features' use remains open to debate. It interprets them as probable subterranean ovens because their bases and walls were deeply burned and some contained burned stones and charcoal, but explicitly rejects pottery firing and distilling because every feature lacked the basal opening needed for airflow. Nearby deposits contained pottery and a few obsidian knives.",
      },
      {
        ...fundar(
          "boggs_hornos.pdf",
          "PDF p. 4 (printed p. 772), radiocarbon and archaeomagnetic dates",
          4,
        ),
        citationNote:
          "Radiocarbon samples from charcoal in an oven and a nearby hearth, together with archaeomagnetic samples from burned oven clay, place the investigated activity around the beginning of the Common Era. The author treats the ovens and nearby refuse as probably contemporary; no cultural group is identified.",
      },
    ],
  },
  {
    id: "asanyamba",
    name: "Asanyamba / El Chapernalito",
    lat: 13.416,
    lon: -87.823,
    precision: "approx",
    kind: "Gulf shell middens · excavation",
    basis: "Source map east of Los Jiotes beside Estero El Chapernalito",
    note: "The point is georeferenced from the thesis map and named estuary; it is close enough for regional orientation, not site protection or navigation.",
    sources: [
      fundar("beaudry_asanyamba.pdf", "PDF pp. 1–8", 1),
      utecConcheros("PDF pp. 203, 218", 203),
    ],
  },
  {
    id: "la-rama-rio-gualacho",
    name: "La Rama / Río Gualacho",
    lat: 13.297,
    lon: -88.532,
    precision: "approx",
    kind: "Excavated site",
    basis: "La Rama was reported 4 km northeast of Puerto El Triunfo; the Río Gualacho profile was 2 km west of La Rama and 2 km north of the port",
    note: "One approximate marker represents two profiles reported 2 km apart; the article does not publish coordinates.",
    sources: [
      {
        ...fundar(
          "haberland_y_grebe.pdf",
          "PDF pp. 1–4 (printed pp. 282–285)",
          1,
        ),
        citationNote:
          "PDF pp. 1–2 (printed pp. 282–283) give the relative locations, describe the 1955 reconnaissance, cuts at La Rama, the Río Gualacho profile, and the archaeological material in each profile. PDF pp. 2–4 (printed pp. 283–285), figs. 2–4, document the footprints, stratigraphy, nearby mound collection, and pottery. The article's tentative dates were revised in Haberland's 1960 synthesis.",
      },
      {
        ...fundar(
          "haberland_sequences.pdf",
          "PDF p. 6 (printed p. 26)",
          6,
        ),
        citationNote:
          "PDF p. 6 (printed p. 26) explicitly calls the eastern sequence tentative, places the La Rama footprints around 1500 BCE or earlier, and dates Gualacho no later than 1000 BCE. It does not document a post-1955 visit to these profiles.",
      },
    ],
  },
  {
    id: "chinameca-burial",
    name: "Chinameca burial",
    lat: 13.512244,
    lon: -88.347967,
    precision: "approx",
    kind: "Find locality",
    basis: "Chinameca, San Miguel; the cited report does not publish the findspot",
    note: "The point marks modern Chinameca, not the burial's unknown location.",
    sources: [
      {
        ...institutional(
          "anales-56.pdf",
          "PDF pp. 60, 68–71 (printed pp. 60, 68–71)",
          60,
        ),
        citationNote:
          "PDF p. 60 identifies Entierro 1 de Chinameca among the remains selected for the 2015 paleopathology study and held by the Department of Archaeology. PDF pp. 68–69 describe the fortuitous, previously disturbed burial, its possible AD 700–1200 ceramic date, position, and osteological findings; fig. 5 on PDF p. 70 illustrates the remains and dental evidence; PDF p. 71 discusses caries and ante-mortem tooth loss. The report gives no findspot, discovery date, construction context, or controlled-excavation account.",
      },
    ],
  },
  {
    id: "el-espinal",
    name: "El Espinal",
    lat: 13.632,
    lon: -88.486,
    precision: "approx",
    kind: "Pre-Hispanic architectural site",
    basis: "Non-inundated San Lorenzo project map east of the Lempa",
    note: "The eastern atlas records architecture here but withholds a coordinate; this is a map-derived area point.",
    sources: [
      easternAtlas("PDF p. 37", 37),
      utecSanLorenzo("PDF p. 87", 102),
    ],
  },
  {
    id: "san-ildefonso-site",
    name: "San Ildefonso archaeological site",
    lat: 13.705595,
    lon: -88.559277,
    precision: "landmark",
    kind: "Pre-Hispanic architectural site",
    basis: "San Ildefonso town/locality named in the atlas",
    note: "The settlement landmark is used because the archaeological plaza and mound group lack a public coordinate.",
    sources: [easternAtlas("PDF p. 39", 39)],
  },
  {
    id: "san-jose-jucuaran",
    name: "San José Jucuarán",
    lat: 13.255,
    lon: -88.322,
    precision: "approx",
    kind: "Pre-Hispanic mound site",
    basis: "Hacienda San José area about 8 km west of Jucuarán",
    note: "The marker represents the named estate area; the isolated mounds were not published with GPS coordinates.",
    sources: [easternAtlas("PDF p. 40", 40)],
  },
  {
    id: "pozo-el-amate",
    name: "Pozo El Amate",
    lat: 13.8996,
    lon: -88.1648,
    precision: "approx",
    kind: "Surveyed site",
    basis: "About 1 km southwest of Jocoaitique",
    note: "The source locates the site on a terrace beside a brook but publishes no coordinate; this marker reconstructs its approximate position from the stated distance and direction.",
    sources: [
      {
        ...fundar(
          "haberland_morazan.pdf",
          "PDF pp. 1–2 (printed pp. 119–120), survey dates and Pozo El Amate site account",
          1,
        ),
        citationNote:
          "Supports the June 29–July 2, 1954 survey dates, location about 1 km southwest of Jocoaitique, terrace setting, and surface obsidian-chip report. It says no recognizable tools were present and treats the three sherds as modern; it does not establish a pre-Hispanic date.",
      },
    ],
  },
  {
    id: "pueblo-viejo-perquin",
    name: "Pueblo Viejo (Perquín)",
    lat: 13.94,
    lon: -88.16,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Hill 300 m north of the Perquín road, 2.1 km from Perquín and 10.4 km from Jocoaitique",
    note: "The marker reconstructs Haberland’s route distances; the report publishes no coordinate or site boundary.",
    sources: [
      {
        ...fundar(
          "haberland_morazan.pdf",
          "PDF pp. 1–2 (printed pp. 119–120), reconnaissance dates and Pueblo Viejo entry",
          1,
        ),
        citationNote:
          "PDF p. 1 (printed p. 119) dates the Morazán trip to June 29–July 2, 1954. PDF p. 2 (printed p. 120) places Pueblo Viejo on a high hill 300 m north of the road, 10.4 km from Jocoaitique and 2.1 km from Perquín, and describes the recovery of obsidian chips and a large point-or-knife fragment from cattle tracks. The report publishes no coordinate, site boundary, occupation date, or controlled excavation.",
      },
    ],
  },
  {
    id: "quebrada-las-marias",
    name: "Quebrada Las Marías",
    lat: 13.918,
    lon: -88.152,
    precision: "approx",
    kind: "Surveyed site",
    basis: "About 1 km east of the main road along the path to Arambala, near Quebrada Las Marías",
    note: "The marker reconstructs Haberland’s route description; the report publishes no coordinate or site boundary.",
    sources: [
      {
        ...fundar(
          "haberland_morazan.pdf",
          "PDF p. 1 and pp. 2–4 (printed pp. 119–122), reconnaissance dates, Fig. 1, and Quebrada Las Marías site account",
          1,
        ),
        citationNote:
          "PDF p. 1 (printed p. 119) dates the Morazán trip to June 29–July 2, 1954. PDF p. 2 (printed p. 120) locates the site near the path to Arambala, about 1 km east of the main road at a point 4.5 km south of Perquín. PDF pp. 2 and 4 (printed pp. 120 and 122) describe more than 100 obsidian pieces found exposed or buried up to 10 cm deep, including eight small points and small end scrapers. PDF p. 3 (printed p. 121), Fig. 1, provides only a regional sketch map. The report publishes no coordinate, site boundary, occupation date, pottery, or controlled excavation.",
      },
    ],
  },
  {
    id: "el-rosario-morazan",
    name: "El Rosario (Morazán)",
    lat: 13.86587,
    lon: -88.210534,
    precision: "landmark",
    kind: "Find locality",
    basis: "El Rosario village plaza",
    note: "The report places the finds on the plaza but publishes no archaeological coordinate or site boundary.",
    sources: [
      {
        ...fundar(
          "haberland_morazan.pdf",
          "PDF p. 1, pp. 3–4, and p. 7 (printed pp. 119, 121–122, and 125), reconnaissance dates, Figures 1–2, and El Rosario account",
          1,
        ),
        citationNote:
          "PDF p. 1 (printed p. 119) dates the Morazán trip to June 29–July 2, 1954. PDF pp. 3–4 (printed pp. 121–122) place El Rosario on the village plaza and report 63 obsidian pieces, mostly small chips, including two unifacial points or point fragments and one bifacial point-or-knife tip; one quartz chip was also found. PDF p. 7 (printed p. 125) states that the sites provided no indication of the finds’ age. The report publishes no archaeological coordinate, site boundary, pottery, or controlled excavation.",
      },
    ],
  },
  {
    id: "gualococti",
    name: "Gualococti",
    lat: 13.819171,
    lon: -88.210637,
    precision: "approx",
    kind: "Find locality",
    basis: "Modern Gualococti town point; the finds were gathered from the banks of the main road",
    note: "The report publishes no archaeological coordinate or site boundary, so the marker represents the town rather than the findspot.",
    sources: [
      {
        ...fundar(
          "haberland_morazan.pdf",
          "PDF p. 1 and pp. 4–5 (printed pp. 119 and 122–123), reconnaissance dates and Gualococti account",
          1,
        ),
        citationNote:
          "PDF p. 1 (printed p. 119) dates the Morazán trip to June 29–July 2, 1954. PDF pp. 4–5 (printed pp. 122–123) say that about 40 stone pieces were gathered from the banks of Gualococti’s main road; two were quartz-like chips, the rest were obsidian, and one was a fragment interpreted as the possible tip of a knife or leaf-shaped point. The report publishes no archaeological coordinate, site boundary, occupation date, pottery, or controlled excavation.",
      },
    ],
  },
  {
    id: "los-bonetes",
    name: "Los Bonetes",
    lat: 13.958,
    lon: -88.319,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Reported hill between two peaks near Quebrada Honda, 6 km northeast of Villa Carolina",
    note: "The reports provide relative locations and a schematic map but no archaeological coordinate, so the marker is approximate.",
    sources: [
      {
        ...fundar(
          "haberland_morazan.pdf",
          "PDF p. 1 (printed p. 119) and PDF p. 5 (printed p. 123), reconnaissance dates and Los Bonetes account",
          1,
        ),
        citationNote:
          "PDF p. 1 (printed p. 119) says the sites in the report were investigated during a June 29–July 2, 1954 trip. PDF p. 5 (printed p. 123) describes Los Bonetes as a hill with two mesa-like tops on the Honduran frontier north of Carolina. Field notes recorded many obsidian chips, blades, a point, and very few sherds in the 701 m saddle, plus obsidian chips on the 740 m northern top. The report gives no drawings or measurements and no descriptions or counts of the sherds; it documents no controlled excavation or occupation date.",
      },
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 67 (printed p. 67), archaeological background",
          67,
        ),
        citationNote:
          "This secondary account cites a 1972 Department of Archaeology site card that places Los Bonetes 6 km northeast of Villa Carolina, between two peaks near Quebrada Honda, in the municipalities of Carolina and San Antonio del Mosco. It does not state the 1972 field methods or publish an archaeological coordinate.",
      },
    ],
  },
  {
    id: "miracapa",
    name: "Miracapa",
    lat: 13.87,
    lon: -88.286,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Approximate area east of Carolina; the cited source publishes no archaeological coordinate",
    note: "The point is a broad locality marker, not a documented findspot or site boundary.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF pp. 67 and 69 (printed pp. 67 and 69), archaeological background",
          67,
        ),
        citationNote:
          "The source says that a Department of Archaeology record (card 39-2) names Miracapa east of Carolina and reports archaeological remains, but supplies no further references or technical specifications. The sentence begins on PDF p. 67 and resumes after the intervening map on PDF p. 69. It does not document a coordinate, site boundary, field visit, investigation date, period, culture, architecture, or artifact type.",
      },
    ],
  },
  {
    id: "conchagua-vieja",
    name: "Conchagua Vieja",
    lat: 13.238,
    lon: -87.757,
    precision: "landmark",
    kind: "Surveyed site",
    basis:
      "Named ridge site about 1 km inland on northeastern Isla Conchagüita",
    note: "The source maps the site schematically but publishes no coordinate; the marker is a landmark-level placement on the named ridge.",
    sources: [
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 16 and pp. 18–19 (printed pp. 9 and 11–12), Part II survey introduction and ‘Conchagua Vieja’ entry",
          16,
        ),
        citationNote:
          "PDF p. 16 (printed p. 9) dates Longyear’s eastern field surveys to fall and winter 1941–42 and explains that unstarred entries were visited and studied. PDF pp. 18–19 (printed pp. 11–12) place Conchagua Vieja on a ridge about 1 km inland on northeastern Isla Conchagüita; describe stone house mounds, standing walls of a colonial church, a plaza and cross-stand, surface potsherds, metates, and obsidian blades; and provide a schematic island map. The entry records Alonso Ponce preaching in the church on June 22, 1586, but does not date the other remains, publish a coordinate, or document controlled excavation.",
      },
    ],
  },
  {
    id: "teca-conchaguita",
    name: "Teca (Isla Conchagüita)",
    lat: 13.247,
    lon: -87.777,
    precision: "approx",
    kind: "Surveyed site",
    basis:
      "North side of Isla Conchagüita, about 100 m inland and a 2 km trail west of the landing",
    note: "The marker reconstructs Longyear’s shoreline description and schematic map; the source publishes no coordinate and states that its contours are approximate.",
    sources: [
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 19 (printed p. 12), ‘Teca’ entry and Figure 1",
          19,
        ),
        citationNote:
          "Longyear places Teca on the north side of Isla Conchagüita, about 100 m inland and 20 m above sea level, reached by a roughly 2 km trail west from the landing. He says he did not visit the site but saw from a boat several low terraces and poorly preserved stone mounds. Figure 1 marks Teca on a schematic island map whose contours are explicitly approximate. The entry identifies Teca as inhabited during Alonso Ponce’s 1586 visit, but it reports no artifacts, controlled excavation, archaeological coordinate, or date for the visible remains.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 16 (printed p. 9), Part II survey introduction",
          16,
        ),
        citationNote:
          "The introduction dates Longyear’s eastern El Salvador field surveys to fall and winter 1941–42. It explains that an asterisk marks entries not personally investigated; the Teca entry is asterisked and separately confirms that he did not visit it.",
      },
    ],
  },
  {
    id: "el-carrizal-nueva-esparta",
    name: "El Carrizal / Nueva Esparta",
    lat: 13.783564,
    lon: -87.835571,
    precision: "approx",
    kind: "Find locality",
    basis:
      "Nueva Esparta town center; the source identifies the town as former El Carrizal but gives no artifact findspot",
    note: "The point is a broad locality marker, not a documented findspot or site boundary.",
    sources: [
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 76 (printed p. 75), Appendix D introduction",
          76,
        ),
        citationNote:
          "The introduction explains that Appendix D combines three earlier published site lists with new sites encountered by Boggs and Longyear. It identifies ‘J. L.’ as Jorge Lardé, warns that most listed sites had not been visited by a competent investigator, and says confirmed localities are printed in bold. It does not state who confirmed each bold entry, when, or by what method.",
      },
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 79 (printed p. 78), Department of La Unión: ‘Carrizal (El)’",
          79,
        ),
        citationNote:
          "The boldface entry equates El Carrizal with the town then called Nueva Esparta and reports artifacts of obsidian, greenstone, and pottery. Its typography indicates that the locality was field-confirmed, but it gives no findspot, date, quantities, context, site boundary, field method, or evidence of excavation.",
      },
    ],
  },
  {
    id: "yucuaiquin",
    name: "Yucuaiquín",
    lat: 13.548302,
    lon: -88.001825,
    precision: "approx",
    kind: "Potential archaeological locality",
    basis: "Modern Yucuaiquín town center; published sources do not locate the reported remains",
    note: "Approximate town-center marker. The location of the reported remains is unknown.",
    sources: [
      {
        ...fundar(
          "longyear.pdf",
          "PDF p. 79 (printed p. 78), Appendix D: Department of La Unión",
          79,
        ),
        citationNote:
          "The boldfaced entry says only: “Yucuayquin. The town rests on pre-Columbian remains.” The Appendix preamble on PDF p. 76 explains that boldface marks confirmed localities, while warning that most entries in the compiled list were otherwise unvisited possibilities. No objects, dates, or field method are reported here.",
      },
      {
        ...externalPdf(
          "2009-amador-atlas-arqueologico-oriente.pdf",
          "PDF p. 42 (printed p. 31), ‘Hallazgos’ classification",
          "https://www.ancientamericas.org/sites/default/files/07070esAmador01.pdf",
          42,
        ),
        citationNote:
          "Yucuaiquín appears only in the list of field-verified hallazgos. The report defines this category as portable cultural material found fortuitously through modern digging, agriculture, or erosion. Such finds are often singular and lack associated architecture. The report does not identify the object found at Yucuaiquín.",
      },
      {
        ...institutional(
          "anales-55.pdf",
          "PDF p. 119, table 7: Pueblos y Villas de Nombre de Jesús Ereguaiquín",
          119,
        ),
        citationNote:
          "Historical context only. This is not evidence for the pre-Columbian find. The table records a parish-boundary dispute involving Yucuaiquín and Gotera that was resolved in the early nineteenth century.",
      },
    ],
  },
  {
    id: "cueva-del-toro",
    name: "Cueva del Toro",
    lat: 13.821,
    lon: -87.97,
    precision: "approx",
    kind: "Surveyed site",
    basis:
      "West side of the same ignimbrite massif as Gruta del Espíritu Santo",
    note:
      "The report gives only a relational location; the marker is approximate and does not represent a published coordinate.",
    sources: [
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF p. 1 (printed p. 660), project description",
          1,
        ),
        citationNote:
          "The author reports that a ten-day regional rock-art project in April 1996 located two new painted sites and photographed the paintings. This establishes the documented investigation year but does not date the paintings.",
      },
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF p. 4 (printed p. 663), ‘El abrigo rocoso del Toro’",
          4,
        ),
        citationNote:
          "The site-specific section places the shelter on the west side of the same ignimbrite massif as Gruta del Espíritu Santo and describes about ten or fewer red-ochre paintings, almost all human figures. Similarity to the Espíritu Santo paintings supports only a tentative same-period comparison, not a date.",
      },
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF pp. 5–6 (printed pp. 664–665), tracing method and surface materials",
          5,
        ),
        citationNote:
          "The report says the four most visible Cueva del Toro paintings were traced on transparent plastic sheets. It also records two micro-retouched flint flakes collected from the surface and interprets them as evidence of possible shelter occupation; no excavation is documented.",
      },
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF p. 10 (printed p. 669), fig. 3",
          10,
        ),
        citationNote:
          "Figure 3 illustrates a traced human figure with a headdress from Cueva del Toro.",
      },
    ],
  },
  {
    id: "paredon-las-figuras",
    name: "Paredón de Las Figuras",
    lat: 13.872,
    lon: -87.97,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Approximately 7 km north of Corinto",
    note: "The source gives distance and direction but no coordinate; the marker is an approximate search area.",
    sources: [
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF p. 1 (printed p. 660), project description",
          1,
        ),
        citationNote:
          "The report dates the ten-day regional project to April 1996 and says it located two new painted sites and photographed the paintings. Read with the site-specific passage on PDF p. 4, this supports the investigation year but not a date for the paintings.",
      },
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF p. 4 (printed p. 663), ‘Paredón de Las Figuras’",
          4,
        ),
        citationNote:
          "The site-specific passage places the volcanic rock wall about 7 km north of Corinto. It says the visit was brief and limited to a short description and photographs, then describes mostly human, predominantly red paintings, a red-and-white serpent, paintings over 1 m, and poor preservation. It gives no coordinate or date for the paintings.",
      },
    ],
  },
  {
    id: "abrigo-los-fierros",
    name: "Abrigo de Los Fierros",
    lat: 13.859,
    lon: -87.955,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Corinto regional rock-art study; no site-specific location published",
    note: "The report describes the shelter but gives no coordinate, distance, or direction; the marker is an approximate regional placement.",
    sources: [
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF p. 1 (printed p. 660), project description",
          1,
        ),
        citationNote:
          "The report dates the ten-day regional project to April 1996 and says it located two new painted sites and photographed the paintings. Read with the site-specific passage on PDF p. 5, this supports the visit year but not a date for the paintings.",
      },
      {
        ...institutional(
          "1998-coladan-pinturas-rupestres-oriente.pdf",
          "PDF pp. 4–5 (printed pp. 663–664), rapid-visit statement and ‘El Abrigo Rocoso de Los Fierros’",
          4,
        ),
        citationNote:
          "The site-specific passage describes the shelter, the location of its paintings, and their motifs and colors. The preceding paragraph says the visit was brief and limited to a short description and photographs. The report gives no site coordinate and only tentatively places the paintings before cattle were introduced locally.",
      },
    ],
  },
  {
    id: "plan-de-la-montana",
    name: "Plan de la Montaña",
    lat: 13.375,
    lon: -87.905,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Mainland on the west side of the Gulf of Fonseca; the source publishes no coordinate",
    note: "The marker is an approximate regional placement, not a published archaeological coordinate.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 45 (printed p. 45), regional research history",
          45,
        ),
        citationNote:
          "The synthesis says the Department of Archaeology registered Plan de la Montaña in 2003. It places the site on the mainland west side of the Gulf of Fonseca and reports at least 17 shell middens with ceramics and stone artifacts. It does not publish a coordinate, assign an occupational date, describe the recording methods, or document excavation.",
      },
    ],
  },
  {
    id: "vividores-zacatillo",
    name: "Vividores (Isla Zacatillo)",
    lat: 13.309,
    lon: -87.766,
    precision: "approx",
    kind: "Potential archaeological locality",
    basis: "Isla Zacatillo; the source gives no site-specific location",
    note: "The marker is an island-scale placement, not a published findspot or site boundary.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 45 (printed p. 45), ‘Antecedentes de concheros prehispánicos en El Salvador’",
          45,
        ),
        citationNote:
          "The synthesis says Esteban Gómez reported three archaeological sites with shell middens on Isla Zacatillo and identifies Vividores as having one midden. It gives no site-specific location, date, field method, artifact description, or excavation evidence; its cited 2002 report is a publication reference, not a documented investigation year.",
      },
    ],
  },
  {
    id: "zacatillo-midden",
    name: "Isla Zacatillo midden",
    lat: 13.304,
    lon: -87.76,
    precision: "approx",
    kind: "Potential archaeological locality",
    basis: "Isla Zacatillo; the source gives no site-specific location",
    note: "The marker is an island-scale offset for orientation, not a published archaeological location.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 45 (printed p. 45), ‘Antecedentes de concheros prehispánicos en El Salvador’",
          45,
        ),
        citationNote:
          "The synthesis says Esteban Gómez reported three archaeological sites with shell middens on Isla Zacatillo: Vividores, one unnamed site with one midden, and Playitas. It gives no site-specific location, date, field method, artifact description, or excavation evidence for the unnamed site; the cited 2002 report is a publication reference, not a documented investigation year.",
      },
    ],
  },
  {
    id: "playitas-zacatillo",
    name: "Playitas (Isla Zacatillo)",
    lat: 13.298,
    lon: -87.756,
    precision: "approx",
    kind: "Potential archaeological locality",
    basis: "Isla Zacatillo; the source gives no site-specific location",
    note: "The marker is an island-scale placement, not a published findspot or site boundary.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 45 (printed p. 45), ‘Antecedentes de concheros prehispánicos en El Salvador’",
          45,
        ),
        citationNote:
          "The synthesis says Esteban Gómez reported three archaeological sites with shell middens on Isla Zacatillo and identifies Playitas as having two middens. It gives no site-specific location, date, field method, artifact description, or excavation evidence; its cited 2002 report is a publication reference, not a documented investigation year.",
      },
    ],
  },
  {
    id: "laguna-meanguera",
    name: "Laguna (Isla Meanguera)",
    lat: 13.19,
    lon: -87.712,
    precision: "approx",
    kind: "Potential archaeological locality",
    basis: "Isla Meanguera; the source gives no site-specific location",
    note: "The marker is an island-scale placement, not a published findspot or site boundary.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 45 (printed p. 45), ‘Antecedentes de concheros prehispánicos en El Salvador’",
          45,
        ),
        citationNote:
          "The synthesis says Esteban Gómez reported one archaeological site on Isla Meanguera, Laguna, with a shell midden. It gives no site-specific location, archaeological date, field method, artifact description, or excavation evidence; its cited 2002 report is a publication reference, not a documented investigation year.",
      },
    ],
  },
  {
    id: "isla-periquito",
    name: "Isla Periquito midden",
    lat: 13.389876,
    lon: -87.848851,
    precision: "landmark",
    kind: "Surveyed site",
    basis: "Isla Periquito landmark; the sources publish no midden coordinate",
    note: "The marker identifies the island, not the shell midden’s position or footprint.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 44 (printed p. 44), ‘Antecedentes de concheros prehispánicos en El Salvador’",
          44,
        ),
        citationNote:
          "The synthesis says Anthony P. Andrews surveyed El Salvador’s Pacific coast in 1978 in search of pre-Hispanic salt-production centers and mentions a pre-Hispanic shell midden on Isla Periquito. It does not publish a site coordinate, describe the midden’s contents or extent, or document excavation.",
      },
      {
        ...fundar(
          "boggs_cayuco.pdf",
          "PDF p. 1 (printed p. 205), map of coastal archaeological sites",
          1,
        ),
        citationNote:
          "Boggs’s map plots El Periquito as a Classic-period coastal archaeological site. The small-scale map supports the broad location and period assignment but provides no site-specific coordinate, dating evidence, field method, or description of finds.",
      },
    ],
  },
  {
    id: "el-rico-manzanilla",
    name: "El Rico / Estero Manzanilla shell middens",
    lat: 13.442431,
    lon: -87.825208,
    precision: "landmark",
    kind: "Surveyed site",
    basis: "Estero Manzanilla landmark; the source publishes no midden coordinate",
    note: "The source places one of two El Rico-area middens in Estero Manzanilla. The marker identifies the estuary, not either midden’s exact position or extent.",
    sources: [
      {
        ...institutional(
          "anales-53.pdf",
          "PDF p. 45 (printed p. 45), ‘Antecedentes de concheros prehispánicos en El Salvador’",
          45,
        ),
        citationNote:
          "The synthesis says Fabio Amador conducted an archaeological reconnaissance in the Bay of La Unión in July 2000 and identified two shell middens in the El Rico area, one in Estero Manzanilla. It gives no site-specific coordinate, dating evidence, description of finds or deposits, or excavation evidence.",
      },
    ],
  },
  {
    id: "atalaya-acajutla",
    name: "Atalaya, Acajutla",
    lat: 13.609444,
    lon: -89.837081,
    precision: "approx",
    kind: "Find locality · Middle Preclassic ceramic comparison",
    basis: "Haberland’s small-scale national map places Atalaya on the Sonsonate coast; no reproducible coordinate is published",
    note: "Approximate regional marker retained from the prior record. It is not a documented site coordinate, and the cited local sources do not define the site’s boundaries.",
    sources: [atalayaEarlyResearchPdf, atalayaReviewPdf],
  },
  {
    id: "atiquizaya-haberland",
    name: "Atiquizaya locality (Haberland)",
    lat: 13.9769,
    lon: -89.7521,
    precision: "approx",
    kind: "Excavated site · Middle Preclassic ceramic complex",
    basis: "Haberland’s map places the locality only at town scale; a later review says the excavated site was near Atiquizaya",
    note: "Approximate marker at modern Atiquizaya. Neither cited source preserves the excavation parcel or a reproducible archaeological coordinate.",
    sources: [
      {
        ...fundar(
          "casasola_panorama.pdf",
          "PDF p. 3 (printed pp. 716–717), research overview and Middle Formative site summary",
          3,
        ),
        citationNote:
          "PDF p. 3 (printed p. 716) says Haberland excavated a site near Atiquizaya and another near Acajutla; printed p. 717 identifies Atiquizaya as a Middle Formative site in Ahuachapán whose material relates to the Providencia and Conchas phases. This secondary review gives no parcel, coordinate, excavation method, or artifact inventory.",
      },
      {
        ...fundar(
          "haberland_sequences.pdf",
          "PDF pp. 1–3 (printed pp. 21–23), fieldwork summary, figs. 1–2, and Atiquizaya-complex discussion",
          1,
        ),
        citationNote:
          "PDF p. 1 (printed p. 21) dates Haberland’s field seasons to 1953–1954 and 1958 and explains that the broader project used surface collection and occasional non-stratigraphic tests without identifying the method used at Atiquizaya. PDF p. 2 (printed p. 22) maps Atiquizaya only at national scale, names finds added by the latest season, and tentatively dates the complex to 1000–700 BCE through comparisons with Providencia and Conchas. PDF p. 3 (printed p. 23), fig. 2, charts the tentative placement. No site boundary or reproducible coordinate is published.",
      },
    ],
  },
  {
    id: "barra-ciega",
    name: "Barra Ciega",
    lat: 13.6205,
    lon: -89.884,
    precision: "approx",
    kind: "Mixed-period ceramic find locality",
    basis: "Broad placement east of Acajutla, following Haberland",
    note: "The archaeological source gives no reproducible coordinate or site boundary; the marker is an approximate coastal placement.",
    sources: [
      {
        ...fundar(
          "haberland_sequences.pdf",
          "PDF pp. 3–4 (printed pp. 23–24), Atiquizaya and Cihuatán complex discussions",
          3,
        ),
        citationNote:
          "PDF p. 3 (printed p. 23) places Barra Ciega east of Acajutla, reports material similar to the Atiquizaya complex, and says agricultural disturbance had mixed the deposits so extensively that excavation would be needed for usable stratigraphic data. PDF p. 4 (printed p. 24) lists Barra Ciega among western localities with scattered Cihuatán-complex material. The article gives no reproducible coordinate, site boundary, site-specific field date, or artifact inventory.",
      },
      {
        ...fundar(
          "casasola_panorama.pdf",
          "PDF p. 3 (printed p. 717), Middle Formative summary",
          3,
        ),
        citationNote:
          "PDF p. 3 (printed p. 717) identifies Barra Ciega in Sonsonate as a Middle Formative site and associates the sites discussed there with the Providencia and Conchas phases. This secondary summary does not document Barra Ciega’s location, field method, or finds in detail.",
      },
      {
        ...fundar(
          "haberland_marihua.pdf",
          "PDF p. 18 (printed p. 24), Barra Ciega surface-collection note",
          18,
        ),
        citationNote:
          "PDF p. 18 (printed p. 24) reports Cihuatán-phase sherds at Barra Ciega near Acajutla and says the surface collection was too mixed to characterize securely. It does not identify individual vessel forms or a field date for the collection.",
      },
    ],
  },
  {
    id: "penate",
    name: "Peñate",
    lat: 13.9889,
    lon: -89.6749,
    precision: "approx",
    kind: "Postclassic settlement · partial structure excavation",
    basis: "About 300 metres west of Casa Blanca, reconstructed from the Chalchuapa plan",
    note: "The marker is a site-area centroid; Peñate’s low platforms are dispersed through the modern city.",
    sources: [chalchuapaPdf],
  },
  {
    id: "laguna-cuzcachapa",
    name: "Laguna Cuzcachapa",
    lat: 13.983769,
    lon: -89.671391,
    precision: "landmark",
    kind: "Preclassic settlement and ritual landscape · excavation",
    basis: "Mapped Laguna Cuzcachapa crater-lake geometry",
    note: "The lake centroid anchors archaeological deposits concentrated around its margins, especially the northern shore.",
    sources: [fundar("casasola_panorama.pdf", "PDF pp. 3–4", 3), chalchuapaPdf],
  },
  {
    id: "laguna-seca-chalchuapa",
    name: "Laguna Seca, Chalchuapa",
    lat: 13.9781,
    lon: -89.668029,
    precision: "landmark",
    kind: "Chalchuapa residential zone · limited excavation",
    basis: "Mapped Laguna Seca crater landmark",
    note: "The marker identifies the former crater and surrounding residential area, not one excavation unit.",
    sources: [chalchuapaPdf, fundar("casasola_panorama.pdf", "PDF pp. 3–4", 3)],
  },
  {
    id: "las-victorias-chalchuapa",
    name: "Las Victorias, Chalchuapa",
    lat: 13.988251,
    lon: -89.665507,
    precision: "landmark",
    kind: "Multi-period residential zone · excavation and mapping",
    basis: "Modern Las Victorias neighborhood over the documented site area",
    note: "Urban growth has fragmented the original finca; the point marks the surviving neighborhood rather than a single platform.",
    sources: [chalchuapaPdf, longyear("PDF pp. 17, 24", 17)],
  },
  {
    id: "cementerio-jardin",
    name: "Cementerio Jardín",
    lat: 13.9748,
    lon: -89.673,
    precision: "approx",
    kind: "Excavated site",
    basis: "Approximate locality about 700 m southeast of the main Tazumal group",
    note: "The source gives an approximate distance and direction but no site coordinate or boundary; the marker is generalized.",
    sources: [
      {
        ...fundar(
          "earliest_pipil.pdf",
          "PDF p. 18 (printed p. 16), Chalchuapa research history",
          18,
        ),
        citationNote:
          "The investigator identifies Cementerio Jardín as one of two salvage projects conducted in 1985 and describes it as an extension of Tazumal’s latest occupation. This corrects the former investigation year of 1987.",
      },
      {
        ...fundar(
          "earliest_pipil.pdf",
          "PDF pp. 25–27 (printed pp. 23–25), ‘The Cementerio Jardín Locality’",
          25,
        ),
        citationNote:
          "The primary excavation account places the locality about 700 m southeast of the main Tazumal group; reports mixed Late Preclassic, Late Classic, and Early Postclassic surface material; and describes test-unit transects followed by an 80 m² exposure of a multiroom building. It lists ceramics, censers, a greenstone plaque, a ceramic flute, and obsidian artifacts, but says the building’s function cannot be assigned. The source gives no coordinate or site boundary.",
      },
      {
        ...fundar(
          "earliest_pipil.pdf",
          "PDF p. 52, fig. 5, excavated structure plan",
          52,
        ),
        citationNote:
          "Figure 5 is a simplified plan of the excavated Cementerio Jardín structure; it identifies wall footings and scoria-gravel floors and warns that the doorways are slightly conjectural.",
      },
      {
        ...fundar(
          "earliest_pipil.pdf",
          "PDF pp. 32–33 (printed pp. 30–31), phase summary and interpretation",
          32,
        ),
        citationNote:
          "The author assigns the component to the Loma China phase beginning around 900–1000 CE and relates that phase to the roots of the historic Pipil, supporting a cautiously worded cultural relationship rather than a fixed ethnic identification.",
      },
      {
        ...fundar(
          "earliest_pipil.pdf",
          "PDF p. 2, 2009 author’s note",
          2,
        ),
        citationNote:
          "The author’s retrospective note cautions that a direct Toltec link is less secure than scenarios involving intermediaries. The public description therefore omits the former claim about new construction concepts spreading from a Mexican intrusion.",
      },
    ],
  },
  {
    id: "vergeles-del-eden",
    name: "Vergeles del Edén",
    lat: 13.9727,
    lon: -89.6696,
    precision: "approx",
    kind: "Excavated site",
    basis: "Named cemetery in Chalchuapa; the report gives no coordinate, parcel, or site boundary",
    note: "Approximate marker retained from the prior record. It is not a published archaeological coordinate.",
    sources: [vergelesDelEdenPdf],
  },
  {
    id: "finca-rosita",
    name: "Finca Rosita",
    lat: 13.970495,
    lon: -89.561662,
    precision: "landmark",
    kind: "Preclassic civic-ceremonial center · salvage investigations",
    basis: "Mapped Finca Rosita locality in Santa Ana city",
    note: "The marker represents the nuclear site area; development and subdivision altered the original finca boundaries.",
    sources: [fincaRositaPdf],
  },
  {
    id: "san-diego-guija",
    name: "Hacienda San Diego, Lake Güija",
    lat: 14.265,
    lon: -89.469,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Northeast side of Volcán San Diego along the Santa Ana–Metapán highway",
    note: "Approximate marker reconstructed from Longyear’s route description and sketch map; the report gives no reproducible coordinate or site boundary.",
    sources: [sanDiegoGuijaPdf],
  },
  {
    id: "igualtepeque",
    name: "Igualtepeque / Cerro de las Figuras",
    lat: 14.245095,
    lon: -89.484395,
    precision: "landmark",
    kind: "Surveyed site",
    basis: "Cerro de las Figuras peninsula mapped in the 2006 site report",
    note: "The marker identifies the mapped peninsula, which the report describes as archaeological throughout; it becomes an island when the lake level rises.",
    sources: [igualtepequeLongyearPdf, igualtepequeReportPdf, igualtepequeRockArtPdf],
  },
  {
    id: "el-zonte-burials",
    name: "El Zonte burials",
    lat: 13.497788,
    lon: -89.440737,
    precision: "approx",
    kind: "Excavated site",
    basis: "El Zonte community; the private surf-center parcel is not mapped in the source",
    note: "The marker represents the community, not the exact burial location on private property.",
    sources: [
      {
        ...anales56(
          "PDF pp. 61, 63–64 (printed pp. 61, 63–64), El Zonte case study and fig. 2",
          61,
        ),
        citationNote:
          "PDF p. 61 places Burials 1 and 2 on the private Centro de Surf Horizonte parcel at El Zonte and says Roberto Gallardo archaeologically excavated Burial 2. PDF p. 63 says Burial 1 was an accidental find that lost its original context; tentatively dates it to 600–900 CE by associated material; and identifies the individual as a young adult man with bilobed cranial modification and several skeletal and dental conditions. PDF p. 64, fig. 2, illustrates those observations. The article publishes no parcel map, reproducible coordinate, excavation method, date for Burial 2, or inventory of Burial 2’s remains and associated finds.",
      },
    ],
  },
  {
    id: "el-chahuite",
    name: "El Chahuite",
    lat: 13.775,
    lon: -89.405,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Broad Zapotitán Valley placement; the cited article publishes no site coordinate",
    note: "The marker is a generalized valley placement, not a documented archaeological location.",
    sources: [elChahuiteReferencePdf],
  },
  {
    id: "san-luis-chalchuapa",
    name: "San Luis, Chalchuapa",
    lat: 13.9745,
    lon: -89.663,
    precision: "approx",
    kind: "Multi-period settlement · large test-pit program",
    basis: "Eastern Chalchuapa investigation area shown in the project plan",
    note: "The article maps the project internally; this marker is a reconstructed site-area centroid.",
    sources: [sanLuisPdf],
  },
  {
    id: "amulunga",
    name: "Amulunga",
    lat: 13.996391,
    lon: -89.657166,
    precision: "approx",
    kind: "Potential archaeological locality",
    basis: "Approximate modern Amulunga locality east of Chalchuapa",
    note: "The cited source names Amulunga but publishes no archaeological coordinate or site boundary; the marker is only a modern locality anchor.",
    sources: [amulungaReferencePdf],
  },
  {
    id: "rio-pampe",
    name: "Pampe Group",
    lat: 13.993515,
    lon: -89.678838,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Approximate Finca San Marcos area on the south bank of the Río Pampe",
    note: "Longyear maps the group only at regional scale and gives no coordinate or site boundary; the marker is an approximate area anchor.",
    sources: [rioPampeExpeditionPdf, rioPampeSitePdf],
  },
  {
    id: "el-caballito",
    name: "El Caballito",
    lat: 13.558,
    lon: -89.548,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Approximate summit marker on Loma El Caballito, west of the Río Mizata",
    note: "The article locates the archaeological site on the ridge and maps it only at regional scale; it publishes no reproducible coordinate, so the marker is approximate.",
    sources: [elCaballitoPdf],
  },
  {
    id: "texisio",
    name: "Texisio",
    lat: 13.5105,
    lon: -89.568,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Approximate marker on the upper part of Cerro Texisio, georeferenced from the published regional map",
    note: "The article maps Texisio only at regional scale and publishes no reproducible coordinate or site boundary, so the marker is approximate.",
    sources: [texisioPdf],
  },
  {
    id: "cerro-de-ulata",
    name: "Cerro de Ulata",
    lat: 13.524,
    lon: -89.548,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Regional map and published placement in Teotepeque at about 410 m above sea level",
    note: "Approximate marker retained from the prior record. The cited map is at 1:100,000 scale and does not publish a reproducible site coordinate or boundary.",
    sources: [
      cerroDeUlataPdf,
      cerroDeUlataProjectHistoryPdf,
      cerroDeUlataLootingPdf,
    ],
  },
  {
    id: "jicalapa-site",
    name: "Jicalapa",
    lat: 13.535,
    lon: -89.509,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Cerro La Nancera south of Jicalapa, shown only on a regional map",
    note: "The marker approximates the described ridge-top area; the source does not publish a reproducible coordinate.",
    sources: [jicalapaPdf],
  },
  {
    id: "letrero-del-diablo",
    name: "El Letrero del Diablo",
    lat: 13.505,
    lon: -89.507,
    precision: "approx",
    kind: "Surveyed site",
    basis: "East side of Quebrada Iscacuyo, also called El Cacao, shown only on a regional map",
    note: "The marker is an approximate canyon location retained from the prior record; the source does not publish a reproducible coordinate or site boundary.",
    sources: [letreroDelDiabloPdf],
  },
  {
    id: "el-letrero-chiltiupan",
    name: "El Letrero, Chiltiupán",
    lat: 13.552,
    lon: -89.468,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Finca Guadalupe Arriba near the confluence of the Río Pájaro León and Río El Zonte",
    note: "The marker is an approximate finca-scale placement retained from the prior record; the source maps the site only at 1:100,000 scale and publishes no reproducible coordinate or boundary.",
    sources: [elLetreroChiltiupanPdf],
  },
  {
    id: "zinacantan-cinacantan",
    name: "Zinacantan / Cinacantan",
    lat: 13.547528,
    lon: -89.394806,
    precision: "published",
    kind: "Surveyed site",
    basis: "13°32′51.1″ N, 89°23′41.3″ W published in the PAHES registration",
    note: "The report does not state whether its coordinate marks a site center or one of the two named elevations.",
    sources: [
      {
        ...identidades18(
          "PDF pp. 114–115 (printed pp. 114–115), Zinacantan entry",
          114,
        ),
        citationNote:
          "PDF p. 114 locates the settlement on Cerro Pueblo Viejo, distinguishes the nearby Cerro Redondo or peñol, reports Fowler's discovery in 1989 and later registration, and describes Hamilton's total-station mapping in 2001–2002: 26 mounds in three sectors, at least seven small plazas, and a low wall around Site 2. PDF p. 115 says ceramic analysis makes a Late Postclassic occupation probable but cannot rule out continuous occupation from the Early through Late Postclassic. The entry does not publish a coordinate or document controlled excavation.",
      },
      {
        ...historicalSurvey(
          "PDF pp. 2, 10–11 (printed pp. 152, 159–160), field season and Cinacantan entry",
          10,
        ),
        citationNote:
          "PDF p. 2 (printed p. 152) dates the PAHES first phase to August–December 2007 and describes its site visits and recording methods. PDF p. 10 (printed p. 159) publishes the coordinate, places Cinacantan on Cerro Redondo and Pueblo Viejo, recounts a documented battle in 1538, and reports that the community was under encomienda in 1548. PDF p. 11 (printed p. 160) describes Late Postclassic remains and plazas on the ridge and identifies Cerro Redondo as the probable peñol in the historical accounts; that identification is interpretive, not certain. These pages do not document controlled excavation.",
      },
    ],
  },
  {
    id: "miramar-tamanique",
    name: "Miramar, Tamanique",
    lat: 13.552,
    lon: -89.428,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Approximate marker on the high, narrow part of Loma El Cabro, about 1 km northwest of Peñón El Cabro",
    note: "The article maps Miramar only at 1:100,000 scale and publishes no reproducible coordinate, so the retained marker is approximate.",
    sources: [miramarTamaniquePdf],
  },
  {
    id: "el-panteoncito",
    name: "El Panteoncito",
    lat: 13.571,
    lon: -89.432,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Upper, northern sector of Loma El Cabro in Cooperativa San Isidro, about 1.5 km north of Miramar",
    note: "The article maps El Panteoncito only at 1:100,000 scale and publishes no reproducible coordinate, so the retained marker is approximate.",
    sources: [elPanteoncitoPdf],
  },
  {
    id: "isla-el-cajete",
    name: "Isla El Cajete",
    lat: 13.705055,
    lon: -90.00938,
    precision: "landmark",
    kind: "Surveyed site",
    basis: "Isla El Cajete landmark in the Barra de Santiago mangroves",
    note: "The marker represents the island, not an archaeological coordinate; the 1983 reconnaissance covered only its western half.",
    sources: [
      {
        ...fundar(
          "amaroli_elcajete.pdf",
          "PDF pp. 1–4, 10 (printed pp. 1–4; preliminary plan)",
          1,
        ),
        citationNote:
          "PDF pp. 1–2 document the 9 February 1983 reconnaissance of the island’s western half, a compass-and-tape sketch, and surface collection; they describe one formal plaza and mound construction. PDF pp. 3–4 describe the pottery and obsidian and tentatively associate most ceramics with the Guazapa complex, then dated about 900–1200 CE, while allowing later occupation and noting sparse possible Late Classic evidence. PDF p. 10 is the preliminary plan of 15 visible mounds. The report publishes no archaeological coordinate, controlled excavation, 2005 revisit, or ethnic attribution.",
      },
    ],
  },
  {
    id: "isla-teopan-coatepeque",
    name: "Isla Teopán, Lake Coatepeque",
    lat: 13.84417,
    lon: -89.56306,
    precision: "landmark",
    kind: "Surveyed site",
    basis: "Figure 1 maps the Teopán site near the island's southwest shore; the article publishes no geodetic coordinate",
    note: "The marker represents Isla Teopán rather than the exact 1996 construction exposure.",
    sources: [teopanPdf],
  },
  {
    id: "piedra-sellada",
    name: "Piedra Sellada, El Imposible",
    lat: 13.827,
    lon: -89.949,
    precision: "approx",
    kind: "Rock-art site · field documentation",
    basis: "Río Guayapa canyon in El Imposible, approximately 13 km northeast of Cara Sucia",
    note: "The marker represents the reported river valley; the source publishes no archaeological coordinate for the boulder.",
    sources: [
      {
        ...fundar(
          "yaca.pdf",
          "PDF p. 3 (printed p. 90), “Arte rupestre y asentamientos” opening page and fig. 1",
          3,
        ),
        citationNote:
          "PDF p. 3 places Piedra Sellada at the bottom of the Río Guayapa valley, about 13 km northeast of Cara Sucia, and reports a November 2007 visit that examined the engraved boulder and its immediate surroundings. It says Philippe Costa drew the petroglyphs from digital photographic documentation and explicitly states that no reconnaissance was conducted because the visit was brief and informal. The page publishes no archaeological coordinate, date, cultural attribution, excavation, or interpretation of individual motifs. The Yacatecuhtli discussion above the article title concerns a preceding article about Cihuatán, not Piedra Sellada.",
      },
    ],
  },
  {
    id: "azacualpa-guija",
    name: "Azacualpa, Lake Güija",
    lat: 14.258,
    lon: -89.49,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Bluff on the northeast shore of Lake Güija, north of Igualtepeque",
    note: "Approximate marker reconstructed from Longyear’s regional sketch map and shoreline description; the report gives no reproducible coordinate or site boundary.",
    sources: [
      {
        ...longyear(
          "PDF p. 11 (printed p. 1) and PDF pp. 26–28 (printed pp. 19–21), expedition dates, Lake Güija map, Azacualpa entry, and figs. 9–12",
          26,
        ),
        citationNote:
          "PDF p. 11 (printed p. 1) dates Longyear’s El Salvador expedition to September 1941–April 1942. PDF p. 26 (printed p. 19), fig. 9, maps Azacualpa at regional scale on the northeast shore of Lake Güija. PDF p. 27 (printed p. 20) places it on a bluff slightly east of north from Igualtepeque and maps three mound groups. The text reports a plaza, mounds, and low platforms in Group I; six certain low platforms in Group II; and eight numbered mounds in Group III, built with volcanic-stone terrace walls over boulder-and-adobe cores. PDF pp. 27–28 (printed pp. 20–21) state that Groups I and II had not been excavated and that only Mound 8 in Group III had prior digging. Mound 8 is described as a terraced temple substructure with holes on its east and west sides and a surviving lime-plaster floor. Local people supplied the account of that digging; the report does not identify who dug it, when, or whether it was controlled. The cited pages give no occupation date, cultural assignment, reproducible coordinate, or site boundary.",
      },
    ],
  },
  {
    id: "el-congo-el-bigote",
    name: "El Congo / El Bigote",
    lat: 13.905341,
    lon: -89.496389,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Modern El Congo town area; the seven mounds extended west for 2.5 km from near the railroad station",
    note: "Approximate town-area marker; the report gives no reproducible coordinate or site boundary, and the individual mounds are not georeferenced.",
    sources: [
      {
        ...longyear(
          "PDF pp. 26–27 (printed pp. 19–20), El Congo (El Bigote) Location and Data",
          26,
        ),
        citationNote:
          "PDF p. 26 (printed p. 19) identifies El Congo as a town southeast of Santa Ana and El Bigote as a nearby canton, but gives no coordinate. PDF p. 27 (printed p. 20) records seven mounds, locally called the Siete Príncipes, extending west for 2.5 km from near the railroad station; gives positions and dimensions for several mounds; reports an earlier summit opening that exposed adobe construction; and dates the writer’s visit to May 1942. The same page reports a monumental stone head near the station said to have come from the town’s outskirts, but does not establish its findspot or association with the mound group. The report provides no occupation date, cultural assignment, site boundary, controlled excavation, or map of this mound group.",
      },
    ],
  },
  {
    id: "isla-teotipa-guija",
    name: "Isla Teotipa, Lake Güija",
    lat: 14.247,
    lon: -89.512,
    precision: "landmark",
    kind: "Find locality",
    basis: "Teotipa Island (Tipa Adentro), mapped west of Igualtepeque in fig. 9",
    note: "The marker represents the mapped island, not a documented object findspot or archaeological site boundary.",
    sources: [
      {
        ...longyear(
          "PDF p. 26 (printed p. 19) and PDF p. 28 (printed p. 21), fig. 9 and Isla Teotipa entry",
          26,
        ),
        citationNote:
          "PDF p. 26 (printed p. 19), fig. 9, maps Teotipa Island west of Igualtepeque and labels it as a site in the Lake Güija zone. PDF p. 28 (printed p. 21) identifies the small island as Teotipa or Tipa Adentro and says pottery and stone objects had been reported from it. The same entry places reported indications of ruins on the separate Tipa Afuera peninsula. It documents no Teotipa field visit, excavation, object descriptions, findspots, occupation date, cultural assignment, reproducible coordinate, or site boundary.",
      },
    ],
  },
  {
    id: "finca-potosi",
    name: "Finca Potosí",
    lat: 13.946853,
    lon: -89.463165,
    precision: "approx",
    kind: "Find locality",
    basis: "Approximate modern El Potosí locality; the report locates finds only within Finca Potosí",
    note: "The marker is a proxy; the report publishes no archaeological coordinate or site boundary.",
    sources: [
      {
        ...longyear(
          "PDF pp. 28–29 (printed pp. 21–22), Potosí entry",
          28,
        ),
        citationNote:
          "PDF p. 28 (printed p. 21) locates Potosí on Finca Potosí about 20 km east-southeast of Santa Ana and gives only access and ownership details. PDF p. 29 (printed p. 22) reports pottery vessels, figurines, and stone objects found at various places on the finca, plus pictographs observed in a deep ravine. The entry provides no coordinate, site boundary, find context, chronological or cultural assignment, investigation date, or excavation evidence.",
      },
    ],
  },
  {
    id: "santa-teresa-santa-ana",
    name: "Finca Santa Teresa",
    lat: 13.971627,
    lon: -89.545494,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Approximate locality reconstructed from the historical finca and route description southeast of Santa Ana",
    note: "The marker is a proxy for Finca Santa Teresa; the report gives no reproducible archaeological coordinate or site boundary.",
    sources: [
      {
        ...longyear(
          "PDF p. 16 (printed p. 9) and PDF p. 29 (printed p. 22), reconnaissance scope and Santa Teresa entry",
          16,
        ),
        citationNote:
          "PDF p. 16 (printed p. 9) says Stanley Boggs conducted field surveys in western El Salvador in 1940–1942 and that unasterisked entries, including Santa Teresa, were visited and studied. PDF p. 29 (printed p. 22) places Finca Santa Teresa about 10 km southeast of Santa Ana and records about twelve mounds in its coffee plantation. It compares the largest with Mound 1 at El Trapiche, explicitly states that no excavation had been done, reports figurine fragments and sculptured stone heads on the surface, and says an eroded mound section indicated adobe construction. The report gives no reproducible coordinate, site boundary, exact Santa Teresa visit date, secure occupation date, or cultural assignment.",
      },
    ],
  },
  {
    id: "texistepeque-group-1",
    name: "Texistepeque Group I",
    lat: 14.1305,
    lon: -89.493,
    precision: "approx",
    kind: "Surveyed site",
    basis: "North side of Texistepeque, east of the Santa Ana–Metapán highway",
    note: "Approximate marker reconstructed from the report’s town-and-highway directions; no geodetic coordinate or site boundary is published.",
    sources: [
      {
        ...longyear(
          "PDF pp. 16, 29 (printed pp. 9, 22), Part II survey scope and Texistepeque Group I entry",
          29,
        ),
        citationNote:
          "PDF p. 16 (printed p. 9) says Stanley Boggs surveyed central and western El Salvador in 1940–1942 and that unstarred entries were visited and studied; Texistepeque Group I is unstarred, but no site-specific visit date is given. PDF p. 29 (printed p. 22) places Group I north of Texistepeque and east of the highway to Metapán; reports about ten mounds, including three about 15 m square and 5.5 m high; and says none appeared excavated. Figure 15 on that page is captioned for Group II, not Group I. The source gives no occupation date, cultural assignment, geodetic coordinate, site boundary, or visit methods for Group I.",
      },
    ],
  },
  {
    id: "texistepeque-group-2",
    name: "Texistepeque Group II",
    lat: 14.1065,
    lon: -89.489,
    precision: "approx",
    kind: "Surveyed site",
    basis: "About 2 km south of Texistepeque, east of the Santa Ana–Metapán highway",
    note: "Approximate marker reconstructed from the report’s distance-and-highway directions; no geodetic coordinate or site boundary is published.",
    sources: [
      {
        ...longyear(
          "PDF pp. 16, 29 (printed pp. 9, 22), Part II survey scope, Texistepeque Group II entry, and fig. 15",
          29,
        ),
        citationNote:
          "PDF p. 16 (printed p. 9) says Stanley Boggs surveyed central and western El Salvador in 1940–1942 and that unstarred entries were visited and studied; Texistepeque Group II is unstarred, but no site-specific visit date is given. PDF p. 29 (printed p. 22) and fig. 15 place Group II about 2 km south of Texistepeque, east of the Santa Ana–Metapán highway; record five or six mounds, with Mounds 1 and 2 about 5.5–6 m high; and note a small house on Mound 1 while the rest of the site appeared undisturbed. The source gives no occupation date, cultural assignment, geodetic coordinate, site boundary, visit methods, or controlled excavation.",
      },
    ],
  },
  {
    id: "copapayo",
    name: "Copapayo",
    lat: 13.753739,
    lon: -89.474786,
    precision: "approx",
    kind: "Surveyed site",
    basis: "South of the former Santa Tecla–Sonsonate highway, east of Río Copapayo, near the Copapayo railroad station",
    note: "Approximate marker reconstructed from the report’s road, stream, and station directions; no geodetic coordinate or site boundary is published.",
    sources: [
      {
        ...longyear(
          "PDF pp. 16, 30 (printed pp. 9, 23), Part II survey scope, Copapayo entry, and fig. 16",
          30,
        ),
        citationNote:
          "PDF p. 16 (printed p. 9) says Stanley Boggs surveyed central and western El Salvador in 1940–1942 and that unstarred entries were visited and studied; Copapayo is unstarred, but no site-specific visit date is given. PDF p. 30 (printed p. 23) and fig. 16 place the ruins south of the former Santa Tecla–Sonsonate highway, east of Río Copapayo, near the railroad station, and about 3 km east of Armenia. They record three mounds in a cleared field, one fairly large, and numerous potsherds on the surrounding surface. The source gives no occupation date, cultural assignment, geodetic coordinate, site boundary, site-specific visit methods, or controlled excavation evidence.",
      },
    ],
  },
  {
    id: "los-lagartos-miahuacan",
    name: "Los Lagartos / Miahuacan",
    lat: 13.735023,
    lon: -89.558453,
    precision: "approx",
    kind: "Surveyed site",
    basis: "Approximate Hacienda Los Lagartos area about 10 km west of Armenia, south of the former Santa Tecla–Sonsonate highway",
    note: "The report gives no reproducible coordinate or site boundary. It also calls the place Miahuacan, Mahuaclan, and Azacualpa, but its identification with conquest-era Miahuacan remains tentative.",
    sources: [
      {
        ...longyear(
          "PDF pp. 16, 30 (printed pp. 9, 23), Part II survey scope, Los Lagartos entry, and fig. 17",
          30,
        ),
        citationNote:
          "PDF p. 16 (printed p. 9) says Boggs surveyed western El Salvador in 1940–1942 and that unstarred entries were visited and studied. PDF p. 30 (printed p. 23) places Los Lagartos about 10 km west of Armenia, south of the Santa Tecla–Sonsonate highway, on a flat area north of Río Los Lagartos. It records at least seven mounds and smaller rises north and west of the river, two more mounds southeast of it, much pottery exposed by cultivation, and no exposed construction; fig. 17 sketch-maps the mound group. The source proposes that the ruins may be conquest-era Miahuacan or Mahuaclan but explicitly calls this identification tentative pending excavation. It gives no reproducible coordinate, site boundary, occupation date, cultural assignment, site-specific visit date, or controlled excavation.",
      },
    ],
  },
  {
    id: "atapasco",
    name: "Atapasco",
    lat: 13.855278,
    lon: -89.287444,
    precision: "published",
    kind: "Surveyed site",
    basis: "13°51′19.0″ N, 89°17′14.8″ W published by PAHES",
    note: "The published coordinate marks the surveyed Atapasco remains.",
    sources: [atapascoHistoricalSurveyPdf],
  },
  {
    id: "san-miguel-ingenio",
    name: "San Miguel Ingenio",
    lat: 14.331778,
    lon: -89.354056,
    precision: "published",
    kind: "Surveyed site",
    basis: "14°19′54.4″ N, 89°21′14.6″ W published by PAHES",
    note: "The published coordinate identifies the surveyed ironworks remains east of Metapán.",
    sources: [sanMiguelIngenioPdf],
  },
  {
    id: "ingenio-el-rosario-metapan",
    name: "Ingenio El Rosario, Metapán",
    lat: 14.353722,
    lon: -89.377556,
    precision: "published",
    kind: "Surveyed site",
    basis: "14°21′13.4″ N, 89°22′39.2″ W published by PAHES",
    note: "The published coordinate marks the surveyed ironworks and hacienda complex.",
    sources: [ingenioElRosarioPdf],
  },
  {
    id: "ingenio-santa-gertrudis",
    name: "Ingenio Santa Gertrudis",
    lat: 14.281139,
    lon: -89.390028,
    precision: "published",
    kind: "Surveyed site",
    basis: "14°16′52.1″ N, 89°23′24.1″ W published by PAHES",
    note: "The published coordinate marks the surveyed ironworks and hacienda remains.",
    sources: [ingenioSantaGertrudisPdf],
  },
  {
    id: "ostua",
    name: "Ostúa church ruins",
    lat: 14.316639,
    lon: -89.5625,
    precision: "published",
    kind: "Surveyed site",
    basis: "14°18′59.9″ N, 89°33′45.0″ W published by PAHES",
    note: "Published site coordinate; the report does not define a boundary.",
    sources: [ostuaHistoricalSurveyPdf],
  },
  {
    id: "santa-maria-magdalena-tacuba",
    name: "Santa María Magdalena de Tacuba",
    lat: 13.903028,
    lon: -89.931972,
    precision: "published",
    kind: "Surveyed site",
    basis: "13°54′10.9″ N, 89°55′55.1″ W published by PAHES",
    note: "Published coordinate for the church ruins facing Tacuba’s central park.",
    sources: [santaMariaMagdalenaTacubaPdf],
  },
  {
    id: "beneficio-rio-claro",
    name: "Beneficio Río Claro",
    lat: 13.850694,
    lon: -89.284083,
    precision: "published",
    kind: "Surveyed site",
    basis: "13°51′02.5″ N, 89°17′02.7″ W published by PAHES",
    note: "Published coordinate for the historic mill structure in Finca Río Claro.",
    sources: [beneficioRioClaroPdf],
  },
  {
    id: "ingenio-san-francisco-paula",
    name: "Ingenio San Francisco de Paula / El Brujo",
    lat: 14.414,
    lon: -89.445,
    precision: "approx",
    kind: "Colonial ironworks · historical survey",
    basis: "Approximately 9.3 km north of Metapán",
    note: "Distance-based placement from the second PAHES report.",
    sources: [phaseTwoHistoricalPdf],
  },
  {
    id: "ingenio-el-carmen-metapan",
    name: "Ingenio El Carmen, Metapán",
    lat: 14.377889,
    lon: -89.440333,
    precision: "published",
    kind: "Colonial ironworks · architectural survey",
    basis: "14°22′40.4″ N, 89°26′25.2″ W published in the industrial-heritage study",
    note: "Published site coordinate in Cantón El Panal.",
    sources: [phaseTwoHistoricalPdf, identidades18("PDF pp. 67–88", 67)],
  },
  {
    id: "ingenio-san-rafael-metapan",
    name: "Ingenio San Rafael, Metapán",
    lat: 14.332,
    lon: -89.382,
    precision: "approx",
    kind: "Colonial ironworks · historical survey",
    basis: "Cantón San Rafael, approximately 5.5 km east of Metapán",
    note: "Distance-and-locality placement from the PAHES description.",
    sources: [phaseTwoHistoricalPdf],
  },
  {
    id: "antigua-iglesia-guaymango",
    name: "Antigua Iglesia de Guaymango",
    lat: 13.749507,
    lon: -89.84557,
    precision: "landmark",
    kind: "Colonial church site · historical survey",
    basis: "Guaymango central locality",
    note: "The town landmark is used because the report does not print a separate church coordinate.",
    sources: [phaseTwoHistoricalPdf],
  },
  {
    id: "antiguo-nejapa-la-fuente",
    name: "Antiguo Nejapa / La Fuente",
    lat: 13.868,
    lon: -89.307,
    precision: "approx",
    kind: "Colonial town site · survey and geophysical testing",
    basis: "About 5 km northwest of Quezaltepeque, south of Río Sucio near Quebrada Chuchucato",
    note: "Landscape reconstruction from the second PAHES report.",
    sources: [phaseTwoHistoricalPdf],
  },
  {
    id: "chuchucato",
    name: "Chuchucato",
    lat: 13.743699,
    lon: -89.42218,
    precision: "landmark",
    kind: "Pre-Hispanic platform-and-pyramid site · threat documentation",
    basis: "Mapped Río Chuchucato corridor in the Zapotitán Valley",
    note: "The river is the stable public landmark; the development parcel is generalized.",
    sources: [anales56("PDF p. 27", 27), web("FUNDAR site-threat report", "https://fundar.org.sv/saqueo.html")],
  },
  {
    id: "shuteca",
    name: "Shuteca",
    lat: 13.704,
    lon: -89.718,
    precision: "approx",
    kind: "Late Classic domestic site · rescue assessment",
    basis: "Generalized Shuteca River corridor in Sonsonate",
    note: "FUNDAR’s public report identifies the river and municipal recreation project but no coordinate.",
    sources: [web("FUNDAR site-threat report", "https://fundar.org.sv/saqueo.html")],
  },
  {
    id: "finca-san-jorge-las-aradas",
    name: "Finca San Jorge / Las Aradas",
    lat: 14.18492,
    lon: -89.483285,
    precision: "landmark",
    kind: "Pre-Hispanic settlement-pattern survey",
    basis: "Published Finca San Jorge locality coordinate; Las Aradas lies in the same study corridor",
    note: "One marker represents the paired comparative survey areas, not every recorded feature.",
    sources: [fincaSanJorgePdf],
  },
  {
    id: "san-benito-ahuachapan-survey",
    name: "San Benito, southern Ahuachapán survey",
    lat: 13.800779,
    lon: -89.993571,
    precision: "landmark",
    kind: "Preclassic survey site",
    basis: "Mapped San Benito locality in San Francisco Menéndez",
    note: "The locality is known, but the 2007 archaeological survey did not publish a site centroid.",
    sources: [southernAhuachapanSurveySource],
  },
  {
    id: "el-mapache-ahuachapan",
    name: "El Mapache",
    lat: 13.79,
    lon: -89.955,
    precision: "approx",
    kind: "Preclassic survey site",
    basis: "Southern Ahuachapán coastal-plain survey area",
    note: "Broad placement only; the report names the site but does not publish its coordinate.",
    sources: [southernAhuachapanSurveySource],
  },
  {
    id: "el-escondido-ahuachapan",
    name: "El Escondido",
    lat: 13.765,
    lon: -89.975,
    precision: "approx",
    kind: "Preclassic survey site",
    basis: "Southern Ahuachapán coastal-plain survey area",
    note: "Broad regional placement; protected site coordinates were not printed.",
    sources: [southernAhuachapanSurveySource],
  },
  {
    id: "el-poeta-campesino",
    name: "El Poeta Campesino",
    lat: 13.775,
    lon: -89.91,
    precision: "approx",
    kind: "Preclassic survey site",
    basis: "Southern Ahuachapán coastal-plain survey area",
    note: "Generalized regional marker; the source does not publish the registry coordinate.",
    sources: [southernAhuachapanSurveySource],
  },
  {
    id: "tres-cerritos-nueva-york",
    name: "Tres Cerritos de Nueva York",
    lat: 13.73,
    lon: -90.04,
    precision: "approx",
    kind: "Preclassic survey site",
    basis: "Nueva York cooperative area on the southern Ahuachapán coastal plain",
    note: "Approximate cooperative-area marker; no mound-level coordinate is public in the cited article.",
    sources: [southernAhuachapanSurveySource],
  },
  {
    id: "la-palma-ahuachapan-survey",
    name: "La Palma, southern Ahuachapán",
    lat: 13.815,
    lon: -89.925,
    precision: "approx",
    kind: "Preclassic survey site",
    basis: "Southern Ahuachapán foothill survey area",
    note: "This is not La Palma in Chalatenango; the survey report gives only a regional placement.",
    sources: [southernAhuachapanSurveySource],
  },
  {
    id: "el-molino-burials",
    name: "El Molino burial record",
    lat: 13.985,
    lon: -89.546,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Reported 900 m southwest of Cerro Tecana and 300 m from Río El Molino",
    note: "Approximate marker derived from distances in a 1985 registration card; no site coordinate is published.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47–49, registration-card caveat and table 1, El Molino entry",
          47,
        ),
        citationNote:
          "PDF p. 47 says the archaeology-department cards are references that cannot be treated as verified because the reported remains were not available for physical examination and some bones may not have been human. PDF p. 48 identifies El Molino as card 10-32 dated September 11, 1985. PDF p. 49 places the reported area in eastern Santa Ana, 900 m southwest of Cerro Tecana and 300 m from Río El Molino; reports ceramic fragments, figurines, six or eight burials, metates, and manos in a 50 × 50 m area up to 2 m deep; and tentatively assigns the material to the Middle Preclassic. The source publishes no coordinate and documents no controlled excavation or independent verification of the finds.",
      },
    ],
  },
  {
    id: "aguachapio-burial",
    name: "Aguachapio burial record",
    lat: 13.703458,
    lon: -90.021777,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Jujutla municipality proxy; the card publishes no coordinate",
    note: "The marker is a generalized modern proxy, not a documented archaeological location.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47–49 (printed pp. 47–49), registration-card caveat and Table 1",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the registration cards vary with the recorder and finds, that reported bones were often not analyzed, and that the cards cannot be treated as independently verified. PDF p. 48 identifies Aguachapio as card 2-8 dated February 24, 1986. PDF p. 49 locates it only in Jujutla, Ahuachapán, assigns it to the Late Preclassic, and reports at least three low mounds, a possible burial, pottery, a plano-convex handstone, and obsidian. No coordinate or controlled excavation is documented.",
      },
    ],
  },
  {
    id: "nueva-york-burial",
    name: "Nueva York burial record",
    lat: 13.728,
    lon: -90.045,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Jujutla municipality proxy; the card publishes no coordinate",
    note: "The marker is a generalized modern proxy, not a documented archaeological location.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47–49 (printed pp. 47–49), registration-card caveat and Table 1",
          47,
        ),
        citationNote:
          "PDF p. 47 says the archaeology-department cards are references that cannot be treated as verified because the reported remains were not available for physical examination and some bones may not have been human. PDF p. 48 identifies Nueva York as a 1986 card registered by Paul Amaroli. PDF p. 49 locates the record only in Jujutla, Ahuachapán, and reports only a Classic-period burial. The source publishes no coordinate, excavation method, body treatment, or associated objects.",
      },
    ],
  },
  {
    id: "tacachol-burial",
    name: "Tacachol archival record",
    lat: 13.715,
    lon: -89.985,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Jujutla municipality proxy; the card publishes no coordinate",
    note: "The marker is a broad modern proxy, not a documented archaeological location.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47–49 (printed pp. 47–49), registration-card caveat and Table 1",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the registration cards vary with the recorder and finds, that not all reported bones were osteologically analyzed, and that the cards cannot be treated as independently verified. PDF p. 48 identifies Tacachol as card 2-9 dated February 24, 1986. PDF p. 49 locates it only in Jujutla, Ahuachapán, assigns it to the Late Preclassic, and reports a three-metre-high T-shaped elevation damaged by intensive looting, bone fragments, shovel-shaped teeth, pottery, grinding-stone fragments, obsidian, mollusc remains, large rocks, and an approximate area of 40,000 square metres. No coordinate, controlled excavation, or burial context is documented.",
      },
    ],
  },
  {
    id: "la-caseta-burial",
    name: "La Caseta archival record",
    lat: 13.78,
    lon: -90.02,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "San Francisco Menéndez municipality proxy; the card publishes no coordinate",
    note: "The marker is a generalized modern proxy, not a documented archaeological location.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47–49 (printed pp. 47–49), registration-card caveat and Table 1",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the registration cards vary with the recorder and finds, that reported bones were often not osteologically analyzed, and that the cards cannot be treated as independently verified. PDF p. 48 identifies La Caseta as card 2-10 dated February 24, 1986. PDF p. 49 locates it only in San Francisco Menéndez, Ahuachapán, and reports an approximate 100 × 400 m area, two four-metre mounds, looting around 1980–1982, a lidded funerary urn with an individual's remains, some vessels, copper bells, Late Preclassic and Late Classic material, and Izalco and Arambala classifications. No coordinate or controlled excavation is documented.",
      },
    ],
  },
  {
    id: "cangrejera-burials",
    name: "Cangrejera burial record",
    lat: 13.79,
    lon: -89.45,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "San Juan Opico municipality proxy; the card publishes no coordinate",
    note: "The marker is a generalized modern proxy, not a documented archaeological location.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47–49 (printed pp. 47–49), registration-card caveat and Table 1",
          47,
        ),
        citationNote:
          "PDF p. 47 says the archaeology-department cards are references that cannot be treated as verified because the reported remains were unavailable for physical or osteological examination. PDF p. 48 identifies Cangrejera as card 16-1, dated January 14, 1975, and registered by Stanley Boggs. PDF p. 49 locates it only in San Juan Opico, La Libertad, and reports 46 skeletons at Hacienda Cangrejera; three mounds by Quebrada Los Cangrejos; five use floors in Mound 1, with burials mainly between floors 3 and 4; Middle and Late Preclassic ceramics; domestic metates; and jadeite. It says the artifacts were not associated with the burials. The source publishes no coordinate, controlled excavation method, or osteological confirmation.",
      },
    ],
  },
  {
    id: "san-diego-sonsonate-burials",
    name: "San Diego archival burial record",
    lat: 13.718,
    lon: -89.72,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Unlocated; the published table leaves the San Diego location blank",
    note: "The marker is only a display proxy. The source does not place this record in Sonsonate or connect it with Hacienda San Diego at Lake Güija.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47, 50–51 (printed pp. 47, 50–51), registration-card caveat and Table 1",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the archaeology-department registration cards vary with the recorder and finds, that reported bones were often not osteologically analyzed, and that the cards cannot be treated as independently verified. PDF p. 50 identifies San Diego as a card recorded by Manuel López and dated only to the 1980s. PDF p. 51 reports burials excavated in 1960. The rendered table leaves San Diego’s location cell blank; the Sonsonate label aligns with the following Monte Rico entry, not San Diego. The source publishes no coordinate, archaeological date, burial count, excavation method, or associated objects.",
      },
    ],
  },
  {
    id: "la-joya-singuil",
    name: "La Joya (Singüil)",
    lat: 14.053288,
    lon: -89.631427,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Broad Santa Ana placement; the published table provides no reproducible archaeological location",
    note: "The marker is a generalized proxy, not a documented site coordinate.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47, 50–51 (printed pp. 47, 50–51), registration-card caveat and Table 1",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the archaeology-department cards contain variable information and cannot be treated as independently verified. PDF p. 50 lists La Joya (Singuil) as undated card 9-2, registered by Manuel López. PDF p. 51 supplies only Santa Ana as its location and gives no finds, period, fieldwork method or coordinate. The adjacent ‘Clásico y preclásico’ entry belongs to Bolinas 1, not La Joya.",
      },
    ],
  },
  {
    id: "bolinas-1",
    name: "Bolinas 1",
    lat: 14.05,
    lon: -89.55,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Broad Santa Ana placement; the table does not distinguish the city from the department",
    note: "The marker is a generalized proxy, not a documented archaeological location.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47, 50–51 (printed pp. 47, 50–51), registration-card caveat and Table 1",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the archaeology-department cards contain variable information and cannot be treated as independently verified. PDF p. 50 lists Bolinas 1 as undated card 10-7, registered by Stanley Boggs. The rendered table on PDF p. 51 places the entry only in Santa Ana and labels it ‘Clásico y preclásico.’ It gives no finds, fieldwork method, investigation date, or coordinate. The following Sonsonate ‘¿Cementerio?’ entry belongs to San José La Majada, not Bolinas 1.",
      },
    ],
  },
  {
    id: "san-jose-la-majada",
    name: "San José La Majada",
    lat: 13.849171,
    lon: -89.710931,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Modern San José La Majada locality; the archival entry gives only Sonsonate Department",
    note: "The marker represents the modern named locality, not a published archaeological coordinate. The archival table does not identify a parcel or site boundary.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47, 50–51 (printed pp. 47, 50–51), registration-card caveat and San José la Majada entry",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the archaeology-department cards contain variable information and cannot be treated as independently verified. PDF p. 50 lists San José la Majada as registration-card 10-19, without a date, and names Manuel López as recorder. The aligned row on PDF p. 51 gives only Sonsonate Department and tentatively asks whether the locality was a cemetery. The table provides no archaeological coordinate, fieldwork method, period, culture, or identified finds.",
      },
    ],
  },
  {
    id: "centa-ciudad-arce",
    name: "CENTA, Ciudad Arce",
    lat: 13.805752,
    lon: -89.403798,
    precision: "landmark",
    kind: "Historical or archival lead",
    basis: "Modern CENTA facility at Ciudad Arce; the archival table does not identify the discovery spot within the grounds",
    note: "The marker represents the named institution, not a published archaeological coordinate or site boundary.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47, 50–51 (printed pp. 47, 50–51), registration-card caveat and CENTA entry",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the archaeology-department registration cards contain variable information, that reported bones were often not osteologically analyzed, and that the cards cannot be treated as independently verified. PDF p. 50 lists CENTA as card 17-4, dated 20 January 1975, with Stanley Boggs as recorder. The aligned row on PDF p. 51 places it in Ciudad Arce, La Libertad, and reports three urns and a cemetery at depths of 1.20 and 1.80 m, with a tentative Postclassic attribution. The table gives no archaeological coordinate, fieldwork method, associated objects, or field-investigation date.",
      },
    ],
  },
  {
    id: "el-primo-colon",
    name: "El Primo, Colón",
    lat: 13.70951,
    lon: -89.353666,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Colón municipality near Río Los Chorros; the table gives an ambiguous 20 or 200 m offset without an origin or direction",
    note: "The marker is an approximate modern map placement, not a published archaeological coordinate or site boundary.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47, 50–51 (printed pp. 47, 50–51), registration-card caveat and El Primo entry",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the archaeology-department registration cards contain variable information, that reported bones were often not osteologically analyzed, and that the cards cannot be treated as verified because the reported remains are not physically available. PDF p. 50 lists El Primo as card 17-55, dated 6 May 1987, with José Retana as recorder. The aligned row on PDF p. 51 places it in Colón, La Libertad, near Río Los Chorros at an ambiguous distance of 20 or 200 m, and tentatively asks whether there was a lidded funerary urn with a jar beside it and whether it was Classic. The table gives no archaeological coordinate, site boundary, investigation method, or field-investigation date.",
      },
    ],
  },
  {
    id: "monolit-lourdes",
    name: "Monolit, Lourdes",
    lat: 13.728,
    lon: -89.37,
    precision: "approx",
    kind: "Historical or archival lead",
    basis: "Lourdes–Hacienda El Tránsito corridor, 450 m west of the road at kilometre 26.5; the table gives no coordinate",
    note: "The marker is an approximate reconstruction of the published route description, not a documented archaeological coordinate or site boundary.",
    sources: [
      {
        ...anales56(
          "PDF pp. 47, 50–51 (printed pp. 47, 50–51), registration-card caveat and Monolit entry",
          47,
        ),
        citationNote:
          "PDF p. 47 warns that the archaeology-department registration cards contain variable information, that reported bones were often not osteologically analyzed, and that the cards cannot be treated as independently verified. PDF p. 50 lists Monolit as card 17-56, dated 1991, with Paul Amaroli as recorder. The aligned row on PDF p. 51 places it toward Hacienda El Tránsito, 450 m west of the road at kilometre 26.5 and 500 m above sea level, and reports Classic-period burials. The table gives no archaeological coordinate, site boundary, fieldwork method, burial count, grave construction, associated objects, or field-investigation date.",
      },
    ],
  },
];
