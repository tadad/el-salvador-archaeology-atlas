import { westernSiteClassifications } from "./western-sites";

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
  /** Latest field excavation, survey, or site-recording year documented by the cited corpus. */
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
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 2011,
    lastInvestigatedLabel: "Active as of 2011",
  },
  "cara-sucia": {
    periods: ["Preclassic", "Classic"],
    cultures: ["Cotzumalhuapa tradition"],
    lastInvestigatedYear: 1983,
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
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 1990,
  },
  "iglesia-caluco": {
    periods: ["Colonial"],
    cultures: ["Nahua / Pipil-related", "Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 1995,
  },
  "asuncion-izalco": {
    periods: ["Colonial"],
    cultures: ["Nahua / Pipil-related", "Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 1989,
  },
  "los-gavilanes": {
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 2005,
  },
  tazumal: {
    periods: ["Classic", "Postclassic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 2012,
  },
  "ciudad-nuevo-tazumal": {
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 2003,
  },
  "casa-blanca": {
    periods: ["Preclassic", "Classic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 2000,
    lastInvestigatedLabel: "1995–2000 project",
  },
  "el-trapiche-e3-7": {
    periods: ["Preclassic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 1978,
  },
  "templo-santiago-apostol": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 1999,
  },
  "asuncion-ahuachapan": {
    periods: ["Colonial", "Modern / Maritime"],
    cultures: ["Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 2003,
  },
  "finca-san-rafael": {
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 2006,
  },
  "san-andres-campana": {
    periods: ["Preclassic", "Classic", "Postclassic"],
    cultures: ["Maya-related", "Nahua / Pipil-related"],
    lastInvestigatedYear: 2014,
  },
  "joya-de-ceren": {
    periods: ["Classic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 2011,
    lastInvestigatedLabel: "Active as of 2011",
  },
  "el-cambio": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2006–2007 season",
  },
  "nuevo-lourdes-poniente": {
    periods: ["Preclassic", "Classic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: null,
  },
  chanmico: {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2006,
  },
  "antiguo-cuscatlan-avenida-navas": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1987,
  },
  madreselva: {
    periods: ["Classic", "Postclassic"],
    cultures: ["Maya-related", "Nahua / Pipil-related"],
    lastInvestigatedYear: 1993,
    lastInvestigatedLabel: "By the 1993 report",
  },
  "sitio-c-la-viuda": {
    periods: ["Classic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 1996,
  },
  "hacienda-tula": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
  },
  "club-internacional": {
    periods: ["Classic"],
    cultures: ["Maya-related"],
    lastInvestigatedYear: 1939,
    lastInvestigatedLabel: "1939 construction discovery",
  },
  "cerro-zapote-san-jacinto": {
    periods: ["Preclassic"],
    cultures: [],
    lastInvestigatedYear: 1926,
  },
  "basilica-el-pilar": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 2003,
  },
  "cihuatan-p7": {
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 2002,
    lastInvestigatedLabel: "2001–2002 project",
  },
  carranza: {
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 2002,
  },
  "las-marias-tlaloc": {
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 2002,
  },
  "ciudad-vieja": {
    periods: ["Colonial"],
    cultures: ["Colonial Spanish / Indigenous"],
    lastInvestigatedYear: 2005,
    lastInvestigatedLabel: "Latest cited field season: 2005",
  },
  "santa-maria": {
    periods: ["Postclassic"],
    cultures: ["Nahua / Pipil-related"],
    lastInvestigatedYear: 1976,
  },
  "hacienda-colima": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1974,
  },
  "la-cienaga-santa-barbara": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1977,
    lastInvestigatedLabel: "By the 1974–1977 campaign",
  },
  "hacienda-los-flores": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1977,
    lastInvestigatedLabel: "By the 1974–1977 campaign",
  },
  "el-tanque-el-morrito": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1977,
    lastInvestigatedLabel: "By the 1974–1977 campaign",
  },
  "cerron-grande-unnamed": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1977,
    lastInvestigatedLabel: "1974–1977 rescue campaign",
  },
  "paraiso-basin": {
    periods: ["Preclassic", "Classic"],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "loma-china": {
    periods: ["Postclassic"],
    cultures: [],
    lastInvestigatedYear: 1983,
    lastInvestigatedLabel: "1982–1983 rescue",
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
  },
  "wreck-anden": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2011,
  },
  "wreck-ss-colon": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2011,
  },
  "wreck-ss-columbus": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2010,
  },
  "wreck-cheribon": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2005,
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
  },
  "wreck-kirkdale": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2012,
  },
  "wreck-brucklay-castle": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2013,
    lastInvestigatedLabel: "2013 search; wreck not relocated",
  },
  "wreck-ss-honduras": {
    periods: ["Modern / Maritime"],
    cultures: ["Maritime / Industrial"],
    lastInvestigatedYear: 2014,
  },
  "los-llanitos": {
    periods: [],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 1942,
  },
  quelepa: {
    periods: ["Preclassic", "Classic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 1969,
    lastInvestigatedLabel: "1967–1969 project",
  },
  "casa-quemada": {
    periods: ["Classic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 2013,
  },
  "el-chaparral": {
    periods: ["Classic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 2013,
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
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2006–2007 survey",
  },
  "salto-el-coyote": {
    periods: ["Classic", "Postclassic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2006–2007 survey",
  },
  "el-cacao": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2006–2007 survey",
  },
  "brisas-de-jiquilisco": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2006–2007 testing",
  },
  "la-florida-jiquilisco": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2006–2007 testing",
  },
  "el-astillero": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1983,
    lastInvestigatedLabel: "1981–1983 rescue campaign",
  },
  "el-jocotal": {
    periods: ["Classic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 1983,
  },
  "sitio-carolina": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2003,
  },
  "fumarolas-agua-caliente": {
    periods: ["Classic"],
    cultures: ["Eastern Salvadoran / Lenca-related"],
    lastInvestigatedYear: 2009,
    lastInvestigatedLabel: "2008–2009 dam-impact survey",
  },
  "gruta-espiritu-santo": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1996,
    lastInvestigatedLabel: "1996 regional rock-art inventory",
  },
  "valle-san-juan-tronconera": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1972,
    lastInvestigatedLabel: "1966–1972 investigation",
  },
  asanyamba: {
    periods: ["Classic"],
    cultures: [],
    lastInvestigatedYear: 1981,
    lastInvestigatedLabel: "1977–1981 fieldwork",
  },
  "la-rama-rio-gualacho": {
    periods: ["Classic", "Postclassic"],
    cultures: [],
    lastInvestigatedYear: 1955,
  },
  "chinameca-burial": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: null,
  },
  "el-espinal": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "Revisited in the 2006–2007 atlas survey",
  },
  "san-ildefonso-site": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2006–2007 atlas survey",
  },
  "san-jose-jucuaran": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2007,
    lastInvestigatedLabel: "2006–2007 atlas survey",
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
  },
  "quebrada-las-marias": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1954,
  },
  "el-rosario-morazan": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1954,
  },
  gualococti: {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1954,
  },
  "los-bonetes": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1972,
    lastInvestigatedLabel: "1954 survey; registered again in 1972",
  },
  miracapa: {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1972,
  },
  "conchagua-vieja": {
    periods: ["Colonial"],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "1941–1942 survey",
  },
  "teca-conchaguita": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "1941–1942 survey",
  },
  "el-carrizal-nueva-esparta": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "1941–1942 survey",
  },
  yucuaiquin: {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1942,
    lastInvestigatedLabel: "1941–1942 survey",
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
    lastInvestigatedLabel: "1996 regional rock-art inventory",
  },
  "abrigo-los-fierros": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1996,
    lastInvestigatedLabel: "1996 regional rock-art inventory",
  },
  "plan-de-la-montana": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2003,
  },
  "vividores-zacatillo": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2002,
  },
  "zacatillo-midden": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2002,
  },
  "playitas-zacatillo": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2002,
  },
  "laguna-meanguera": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2002,
  },
  "isla-periquito": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 1978,
  },
  "el-rico-manzanilla": {
    periods: [],
    cultures: [],
    lastInvestigatedYear: 2000,
    lastInvestigatedLabel: "July 2000 survey",
  },
  ...westernSiteClassifications,
};

export const knownInvestigationYears = Object.values(siteClassifications)
  .map((classification) => classification.lastInvestigatedYear)
  .filter((year): year is number => year !== null);

export const investigationYearBounds = {
  min: Math.min(...knownInvestigationYears),
  max: Math.max(...knownInvestigationYears),
};
