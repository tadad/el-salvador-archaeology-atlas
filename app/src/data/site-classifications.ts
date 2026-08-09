export const periodOrder = [
  "Preclassic",
  "Classic",
  "Postclassic",
  "Colonial",
  "Modern / Maritime",
] as const;

export type Period = (typeof periodOrder)[number];

export const cultureOrder = [
  "Maya-related",
  "Nahua / Pipil-related",
  "Cotzumalhuapa tradition",
  "Eastern Salvadoran / Lenca-related",
  "Colonial Spanish / Indigenous",
  "Maritime / Industrial",
] as const;

export type Culture = (typeof cultureOrder)[number];

export type SiteClassification = {
  periods: Period[];
  cultures: Culture[];
  /** Latest field excavation, survey, recording, or condition-assessment year documented by the cited corpus. */
  lastInvestigatedYear: number | null;
  /** Used when a project endpoint or "active as of" date is more honest than a bare year. */
  lastInvestigatedLabel?: string;
};

export const periodDescriptions: Record<Period, string> = {
  Preclassic: "Broadly before 250 CE; local phase boundaries vary.",
  Classic: "Broadly 250–900 CE; local phase boundaries vary.",
  Postclassic: "Broadly 900–1524 CE, ending with the Spanish invasion.",
  Colonial: "Spanish colonial period, broadly 1524–1821.",
  "Modern / Maritime": "Post-independence terrestrial or maritime archaeology.",
};

export const cultureDescriptions: Record<Culture, string> = {
  "Maya-related":
    "Material or settlement traditions discussed within the southeastern Maya sphere.",
  "Nahua / Pipil-related":
    "Nahua/Pipil-associated contexts or closely related Early Postclassic traditions.",
  "Cotzumalhuapa tradition":
    "Late Classic Pacific-coast material associated with the Cotzumalhuapa sphere.",
  "Eastern Salvadoran / Lenca-related":
    "Eastern Salvadoran traditions often discussed in relation to Lenca populations; the label is intentionally cautious.",
  "Colonial Spanish / Indigenous":
    "Colonial contexts produced through interaction among Spanish, Indigenous, African, and mixed communities.",
  "Maritime / Industrial":
    "Historic shipping, machinery, port, and industrial material.",
};

/**
 * Source-grounded browsing metadata keyed to digs.ts IDs. Empty arrays and
 * null years are deliberate: the papers do not support a responsible bucket.
 * Cultural tags describe archaeological affinities, not fixed ethnic identity.
 */
export const siteClassifications: Record<string, SiteClassification> = {
  "apaneca-habel": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "santa-leticia": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1977,
  },
  "ataco-las-sepulturas": {
    periods: ["Preclassic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2011,
    lastInvestigatedLabel: "Project reported active at the 2011 symposium",
  },
  "san-isidro-sonsonate": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 2024,
    lastInvestigatedLabel: "2018–2024 PASI fieldwork documented in the cited article",
  },
  "chalchuapa-bolinas-figurines": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "zapotitan-valley-bolinas-figurines": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "cara-sucia": {
    periods: ["Preclassic", "Classic"],
    cultures: ["Cotzumalhuapa tradition"],
    lastInvestigatedYear: 1983,
    lastInvestigatedLabel: "1982–1983 archaeological project",
  },
  "el-carmen": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1988,
  },
  "el-eden": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1988,
  },
  "el-zapote-san-isidro": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2013,
  },
  "tacuscalco-los-cerritos": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel: "2004–2005 archaeological sounding",
  },
  "iglesia-caluco": {
    periods: ["Colonial"],
    cultures: [],
    lastInvestigatedYear: 1995,
    lastInvestigatedLabel: "Topographic survey and continued excavation",
  },
  "asuncion-izalco": {
    periods: ["Colonial"],
    cultures: ["Nahua / Pipil-related", "Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 1989,
    lastInvestigatedLabel: "Two-week archaeological sounding in August 1989",
  },
  "los-gavilanes": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel: "Survey and test excavation",
  },
  tazumal: {
    periods: ["Classic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2012,
    lastInvestigatedLabel: "Project reported active through 2012",
  },
  "ciudad-nuevo-tazumal": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2003,
    lastInvestigatedLabel: "Archaeological sounding, 2001–2003",
  },
  "casa-blanca": {
    periods: ["Preclassic", "Classic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "2008 Structure 5 and Mound 6 restoration-investigation",
  },
  "el-trapiche-e3-7": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1978,
    lastInvestigatedLabel: "1977–1978 rescue excavation",
  },
  "templo-santiago-apostol": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1999,
    lastInvestigatedLabel: "1998–1999 investigation reported in a national synthesis",
  },
  "asuncion-ahuachapan": {
    periods: ["Preclassic", "Postclassic", "Colonial"],
    cultures: [],
    lastInvestigatedYear: 2003,
    lastInvestigatedLabel: "2002–2003 rescue investigation",
  },
  "finca-san-rafael": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2006,
    lastInvestigatedLabel: "February 2006 archaeological testing",
  },
  "san-andres-campana": {
    periods: ["Preclassic", "Classic", "Postclassic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 2012,
    lastInvestigatedLabel: "Latest field season specifically named in the 2016 article",
  },
  "joya-de-ceren": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 2011,
    lastInvestigatedLabel: "Project reported ongoing at the 2011 symposium",
  },
  "el-cambio": {
    periods: ["Preclassic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2006–2007 excavation season",
  },
  "nuevo-lourdes-poniente": {
    periods: ["Preclassic", "Classic"],
    cultures: [],
    lastInvestigatedYear: 2013,
    lastInvestigatedLabel: "2013 archaeological investigation",
  },
  chanmico: {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "antiguo-cuscatlan-avenida-navas": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1987,
    lastInvestigatedLabel: "1987 rescue investigation",
  },
  madreselva: {
    periods: ["Classic", "Postclassic"],
    cultures: ["Maya-related", "Nahua / Pipil-related"],
    lastInvestigatedYear: 1992,
    lastInvestigatedLabel: "1992 rescue activity",
  },
  "sitio-c-la-viuda": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1996,
    lastInvestigatedLabel: "1996 rescue excavation and osteological study",
  },
  "hacienda-tula": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "1942 visit and test excavation",
  },
  "club-internacional": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "cerro-zapote-san-jacinto": {
    periods: ["Preclassic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: 1926,
    lastInvestigatedLabel: "1926 excavation",
  },
  "basilica-el-pilar": {
    periods: ["Colonial"],
    cultures: [],
    lastInvestigatedYear: 2003,
    lastInvestigatedLabel: "2003 investigation",
  },
  "cihuatan-p7": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2002,
    lastInvestigatedLabel: "2001–2002 project",
  },
  carranza: {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2004,
    lastInvestigatedLabel: "Excavations reported as continuing in April 2004",
  },
  "las-marias-tlaloc": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2002,
    lastInvestigatedLabel: "July 2002 rescue excavation",
  },
  "ciudad-vieja": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel: "Latest cited field season: 2005",
  },
  "santa-maria": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2003,
    lastInvestigatedLabel: "Latest documented field visit: May 2003",
  },
  "hacienda-colima": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1974,
    lastInvestigatedLabel: "Documented rescue excavation: 1974",
  },
  "la-cienaga-santa-barbara": {
    periods: ["Classic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 1976,
    lastInvestigatedLabel: "Santa Bárbara investigated by 1976; exact field year unstated",
  },
  "hacienda-los-flores": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1976,
    lastInvestigatedLabel: "Los Flores rescue subproject documented by 1976",
  },
  "el-tanque-el-morrito": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 1976,
    lastInvestigatedLabel: "Mound 3 excavation documented by 1976; exact field year unstated",
  },
  "cerron-grande-unnamed": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1977,
    lastInvestigatedLabel: "Rescue program reported as conducted in 1974–1977",
  },
  "paraiso-basin": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "loma-china": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 1983,
    lastInvestigatedLabel: "1980–1983 rescue project; narrower excavation dates conflict",
  },
  "san-lorenzo-unnamed": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1983,
    lastInvestigatedLabel: "1981–1983 rescue campaign",
  },
  "nueva-esperanza": {
    periods: ["Preclassic", "Classic"],
    cultures: [],
    lastInvestigatedYear: 2011,
    lastInvestigatedLabel: "2011 excavation season",
  },
  "wreck-anden": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2011,
  },
  "wreck-ss-colon": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2013,
    lastInvestigatedLabel: "Return inspection and documentation, January 10, 2013",
  },
  "wreck-ss-columbus": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2016,
    lastInvestigatedLabel: "Photographic field documentation, February 2016",
  },
  "wreck-cheribon": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2015,
    lastInvestigatedLabel: "2015 protected-area delimitation project",
  },
  "wreck-ss-douglas": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2011,
    lastInvestigatedLabel: "2005 registration; 2011 protection project",
  },
  "wreck-ss-san-blas": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2011,
  },
  "pecio-psj-1": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2012,
    lastInvestigatedLabel: "2012 visit and excavation",
  },
  "wreck-kirkdale": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2015,
    lastInvestigatedLabel: "Five investigative dives completed by 2015",
  },
  "wreck-brucklay-castle": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: null,
    lastInvestigatedLabel: "2013 search did not relocate the wreck; no confirmed site-investigation date",
  },
  "wreck-ss-honduras": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2014,
    lastInvestigatedLabel: "2014 identification and dive recording",
  },
  "los-llanitos": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Condition visit during the 2006–2008 Atlas project; exact year unstated",
  },
  quelepa: {
    periods: ["Preclassic", "Classic"],
    cultures: [],
    lastInvestigatedYear: 2017,
    lastInvestigatedLabel: "2017 aerial and ground documentation of the ballcourt",
  },
  "casa-quemada": {
    periods: ["Classic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 2013,
    lastInvestigatedLabel: "2013 rescue excavation",
  },
  "el-chaparral": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2013,
    lastInvestigatedLabel: "2013 rescue excavation",
  },
  "el-chiquirin": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 2003,
    lastInvestigatedLabel: "2002–2003 rescue",
  },
  "la-laguneta": {
    periods: ["Classic", "Postclassic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 2017,
    lastInvestigatedLabel: "2017 aerial and ground documentation of the ballcourt",
  },
  "salto-el-coyote": {
    periods: ["Classic", "Postclassic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Investigated during the 2006–2008 Atlas project; exact field season unstated",
  },
  "el-cacao": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2007 mapping and test excavation",
  },
  "brisas-de-jiquilisco": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Tested during the 2006–2008 Atlas project; exact field season unstated",
  },
  "la-florida-jiquilisco": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Tested during the 2006–2008 Atlas project; exact field season unstated",
  },
  "el-astillero": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Inundated site area assessed during the 2006–2008 Atlas project; exact year unstated",
  },
  "el-jocotal": {
    periods: ["Classic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Revisited during the 2006–2008 Atlas project; exact year unstated",
  },
  "sitio-carolina": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 2009,
    lastInvestigatedLabel: "2008–2009 surface survey",
  },
  "fumarolas-agua-caliente": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 2009,
    lastInvestigatedLabel: "2008–2009 regional surface survey",
  },
  "gruta-espiritu-santo": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1996,
    lastInvestigatedLabel: "1996 rock-art survey and surface collection",
  },
  "valle-san-juan-tronconera": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: null,
    lastInvestigatedLabel: "Initial 1966 investigation; later observations and excavations are documented but undated",
  },
  asanyamba: {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Condition visit during the 2006–2008 Atlas project; exact year unstated",
  },
  "la-rama-rio-gualacho": {
    periods: ["Preclassic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: 1955,
    lastInvestigatedLabel: "1955 geological and archaeological reconnaissance",
  },
  "chinameca-burial": {
    periods: ["Classic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "el-espinal": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Revisited during the 2006–2008 Atlas project; exact year unstated",
  },
  "san-ildefonso-site": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Recorded during the 2006–2008 Atlas project; exact year unstated",
  },
  "san-jose-jucuaran": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Recorded during the 2006–2008 Atlas project; exact year unstated",
  },
  "pozo-el-amate": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1954,
  },
  "pueblo-viejo-perquin": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1954,
    lastInvestigatedLabel: "Haberland reconnaissance, June 29–July 2, 1954",
  },
  "quebrada-las-marias": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1954,
    lastInvestigatedLabel: "Haberland reconnaissance, June 29–July 2, 1954",
  },
  "el-rosario-morazan": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1954,
    lastInvestigatedLabel: "Haberland reconnaissance, June 29–July 2, 1954",
  },
  gualococti: {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1954,
    lastInvestigatedLabel: "Haberland reconnaissance, June 29–July 2, 1954",
  },
  "los-bonetes": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1972,
    lastInvestigatedLabel:
      "1954 survey; 1972 departmental site-card registration (field methods not stated)",
  },
  miracapa: {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "conchagua-vieja": {
    periods: ["Colonial"],
    cultures: [],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel:
      "Investigated within Gómez’s 2002–2005 Conchagüita/Gulf-islands project; exact site season not stated",
  },
  "teca-conchaguita": {
    periods: ["Colonial"],
    cultures: [],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel:
      "Investigated within Gómez’s 2002–2005 Conchagüita/Gulf-islands project; exact site season not stated",
  },
  "el-carrizal-nueva-esparta": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  yucuaiquin: {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Field-verified during the 2006–2008 Atlas Oriente project",
  },
  "cueva-del-toro": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1996,
    lastInvestigatedLabel: "1996 regional rock-art inventory",
  },
  "paredon-las-figuras": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1996,
    lastInvestigatedLabel: "April 1996 rapid regional rock-art visit",
  },
  "abrigo-los-fierros": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1996,
    lastInvestigatedLabel: "April 1996 rapid regional rock-art visit",
  },
  "plan-de-la-montana": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2003,
    lastInvestigatedLabel: "2003 Department of Archaeology site registration",
  },
  "vividores-zacatillo": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel:
      "Investigated within Gómez’s 2002–2005 Gulf-islands project; exact site season not stated",
  },
  "zacatillo-midden": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel:
      "Investigated within Gómez’s 2002–2005 Gulf-islands project; exact site season not stated",
  },
  "playitas-zacatillo": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel:
      "Investigated within Gómez’s 2002–2005 Gulf-islands project; exact site season not stated",
  },
  "laguna-meanguera": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel:
      "Investigated within Gómez’s 2002–2005 Gulf-islands project; exact site season not stated",
  },
  "isla-periquito": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 1978,
    lastInvestigatedLabel: "1978 Pacific-coast survey reported in a secondary synthesis",
  },
  "el-rico-manzanilla": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2000,
    lastInvestigatedLabel: "July 2000 archaeological reconnaissance",
  },
  "atalaya-acajutla": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 2009,
    lastInvestigatedLabel: "Two technical inspections in 2009",
  },
  "atiquizaya-haberland": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1958,
    lastInvestigatedLabel: "Latest field season reported by Haberland",
  },
  "barra-ciega": {
    periods: ["Preclassic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "penate": {
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 1970,
    lastInvestigatedLabel: "Partial excavation during the 1968–1970 Chalchuapa project",
  },
  "laguna-cuzcachapa": {
    periods: ["Preclassic", "Classic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 1970,
    lastInvestigatedLabel: "Investigated during the 1968–1970 Chalchuapa project",
  },
  "laguna-seca-chalchuapa": {
    periods: ["Preclassic", "Classic", "Postclassic"],
    cultures: ["Maya-related", "Nahua / Pipil-related"],
    lastInvestigatedYear: 1970,
    lastInvestigatedLabel: "Investigated during the 1968–1970 Chalchuapa project",
  },
  "las-victorias-chalchuapa": {
    periods: ["Preclassic", "Classic", "Postclassic"],
    cultures: ["Maya-related", "Nahua / Pipil-related"],
    lastInvestigatedYear: 1970,
    lastInvestigatedLabel: "Investigated during the 1968–1970 Chalchuapa project",
  },
  "cementerio-jardin": {
    periods: ["Preclassic", "Classic", "Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 1985,
    lastInvestigatedLabel: "1985 salvage excavation",
  },
  "vergeles-del-eden": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 1995,
    lastInvestigatedLabel: "1995 archaeological test reported in a 2007 secondary summary",
  },
  "finca-rosita": {
    periods: ["Preclassic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 2003,
    lastInvestigatedLabel: "Four test pits excavated in 2003",
  },
  "san-diego-guija": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "Documented during Longyear’s September 1941–April 1942 expedition",
  },
  "igualtepeque": {
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 2021,
    lastInvestigatedLabel: "November 2020–February 2021 community survey and site reconnaissance",
  },
  "el-zonte-burials": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 1998,
    lastInvestigatedLabel: "Burial 2 archaeologically excavated",
  },
  "el-chahuite": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "san-luis-chalchuapa": {
    periods: ["Preclassic", "Classic", "Postclassic"],
    cultures: ["Maya-related", "Nahua / Pipil-related"],
    lastInvestigatedYear: 2014,
    lastInvestigatedLabel: "Excavation begun 2 April 2014",
  },
  "amulunga": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "rio-pampe": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "1941–1942 expedition; exact Pampe visit date not stated",
  },
  "el-caballito": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2012,
    lastInvestigatedLabel: "Site discovery reported for 2012; exact field dates and later visits not stated",
  },
  "texisio": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2012,
    lastInvestigatedLabel: "Site discovery reported for 2012; exact field dates and later visits not stated",
  },
  "cerro-de-ulata": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 1988,
    lastInvestigatedLabel: "Mapped by the Izalco Project",
  },
  "jicalapa-site": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2010,
    lastInvestigatedLabel: "Discovered by the Costa del Bálsamo project",
  },
  "letrero-del-diablo": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
    lastInvestigatedLabel: "Digital photographic recording documented, but not dated",
  },
  "el-letrero-chiltiupan": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
    lastInvestigatedLabel: "Discovery and digital photographic recording documented, but not dated",
  },
  "zinacantan-cinacantan": {
    periods: ["Postclassic", "Colonial"],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "PAHES first-phase field registration (August–December 2007)",
  },
  "miramar-tamanique": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "el-panteoncito": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "isla-el-cajete": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 1983,
    lastInvestigatedLabel: "1983 reconnaissance and surface collection",
  },
  "isla-teopan-coatepeque": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1996,
    lastInvestigatedLabel: "Construction exposure and surface-sherd inspection reported in early 1996",
  },
  "piedra-sellada": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "November 2007 informal visit and photographic documentation",
  },
  "azacualpa-guija": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2004,
    lastInvestigatedLabel: "Condition photographed by November 2004; exact visit date not stated",
  },
  "el-congo-el-bigote": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2004,
    lastInvestigatedLabel: "Excavated after 1978 and documented by 2004; exact season not stated",
  },
  "isla-teotipa-guija": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "Visited during Boggs’s 1940–1942 western survey; exact year not stated",
  },
  "finca-potosi": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "Visited during Boggs’s 1940–1942 western survey; exact year not stated",
  },
  "santa-teresa-santa-ana": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "Boggs’s western field surveys occurred in 1940–1942; the exact Santa Teresa visit year is not stated",
  },
  "texistepeque-group-1": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "Boggs’s western field surveys occurred in 1940–1942; the exact Texistepeque Group I visit year is not stated",
  },
  "texistepeque-group-2": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "Boggs’s western field surveys occurred in 1940–1942; the exact Texistepeque Group II visit year is not stated",
  },
  "copapayo": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "Boggs’s western field surveys occurred in 1940–1942; the exact Copapayo visit year is not stated",
  },
  "los-lagartos-miahuacan": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "Boggs’s western surveys occurred in 1940–1942; the exact Los Lagartos visit year is not stated",
  },
  "atapasco": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous", "Maritime / Industrial"],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "Registered by PAHES on November 1, 2007",
  },
  "san-miguel-ingenio": {
    periods: ["Colonial", "Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "Recorded during the August–December 2007 PAHES field phase",
  },
  "ingenio-el-rosario-metapan": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "Recorded during the August–December 2007 PAHES field phase",
  },
  "ingenio-santa-gertrudis": {
    periods: ["Colonial"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "Recorded during the August–December 2007 PAHES field phase",
  },
  "ostua": {
    periods: ["Colonial"],
    cultures: [],
    lastInvestigatedYear: 2007,
  },
  "santa-maria-magdalena-tacuba": {
    periods: ["Colonial"],
    cultures: [],
    lastInvestigatedYear: 2007,
  },
  "beneficio-rio-claro": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "Recorded during the August–December 2007 PAHES field phase",
  },
  "ingenio-san-francisco-paula": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous", "Maritime / Industrial"],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Mapped and recorded by PAHES in August 2008",
  },
  "ingenio-el-carmen-metapan": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous", "Maritime / Industrial"],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Mapped and recorded by PAHES in August 2008",
  },
  "ingenio-san-rafael-metapan": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous", "Maritime / Industrial"],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Mapped and recorded by PAHES in August 2008",
  },
  "antigua-iglesia-guaymango": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Recorded during the 2008 PAHES field phase",
  },
  "antiguo-nejapa-la-fuente": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 2008,
    lastInvestigatedLabel: "Revisited during the 2008 PAHES field phase",
  },
  "chuchucato": {
    periods: ["Classic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: 2009,
  },
  "shuteca": {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 2007,
  },
  "finca-san-jorge-las-aradas": {
    periods: ["Preclassic", "Classic"],
    cultures: [],
    lastInvestigatedYear: 2011,
  },
  "san-benito-ahuachapan-survey": { periods: ["Preclassic"], cultures: [], lastInvestigatedYear: 2007 },
  "el-mapache-ahuachapan": { periods: ["Preclassic"], cultures: [], lastInvestigatedYear: 2007 },
  "el-escondido-ahuachapan": { periods: ["Preclassic"], cultures: [], lastInvestigatedYear: 2007 },
  "el-poeta-campesino": { periods: ["Preclassic"], cultures: [], lastInvestigatedYear: 2007 },
  "tres-cerritos-nueva-york": { periods: ["Preclassic"], cultures: [], lastInvestigatedYear: 2007 },
  "la-palma-ahuachapan-survey": { periods: ["Preclassic"], cultures: [], lastInvestigatedYear: 2007 },
  "el-molino-burials": { periods: [], cultures: [], lastInvestigatedYear: 1985 },
  "aguachapio-burial": { periods: [], cultures: [], lastInvestigatedYear: 1986 },
  "nueva-york-burial": { periods: ["Classic"], cultures: [], lastInvestigatedYear: 1986 },
  "tacachol-burial": { periods: ["Preclassic"], cultures: [], lastInvestigatedYear: 1986 },
  "la-caseta-burial": { periods: ["Preclassic", "Classic"], cultures: [], lastInvestigatedYear: 1986 },
  "cangrejera-burials": { periods: ["Preclassic"], cultures: [], lastInvestigatedYear: 1975 },
  "san-diego-sonsonate-burials": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1989,
    lastInvestigatedLabel: "Registered sometime in the 1980s; the card also reports a 1960 excavation",
  },
  "la-joya-singuil": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "bolinas-1": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "san-jose-la-majada": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "centa-ciudad-arce": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1975,
    lastInvestigatedLabel: "Registration card dated January 20, 1975",
  },
  "el-primo-colon": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1987,
    lastInvestigatedLabel: "Registration card dated May 6, 1987",
  },
  "monolit-lourdes": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1991,
    lastInvestigatedLabel: "Registration card dated 1991",
  },
};
