export type SiteStory = {
  overview: string;
  dates: string;
  fieldwork: string;
  discoveries: string;
};

/**
 * Plain-language editorial summaries keyed to the stable IDs in digs.ts.
 * These describe what the cited papers actually support; sparse and grouped
 * records say so rather than turning an approximate map point into a false site.
 */
export const siteStories: Record<string, SiteStory> = {
  "apaneca-habel": {
    overview:
      "A historical account of a grave opened at Apaneca. The precise location is unknown.",
    dates:
      "The cited sources do not date the grave or its objects.",
    fieldwork:
      "Habel witnessed the grave being opened; the sources do not document controlled excavation or its exact location.",
    discoveries:
      "The account lists carved jades, pottery objects, a double-profile head carved on a stone slab, and a polished gray stone object described at the time as a ‘sacrificial yoke.’",
  },
  "santa-leticia": {
    overview:
      "A pre-Hispanic archaeological site in the Cordillera Apaneca-Ilamatepec. A 1977 project investigated Santa Leticia through reconnaissance and excavation.",
    dates:
      "The cited synthesis dates the site’s ‘potbellied’ sculptures to the Late Preclassic but does not date the site’s full occupation.",
    fieldwork:
      "The 1977 project used regional reconnaissance and an excavation program intended to establish a ceramic and chronological sequence. It also produced a topographic site map.",
    discoveries:
      "The sources report Late Preclassic ‘potbellied’ sculptures and fragmentary Bolinas-type figurines. The latter came mainly from surface, structural-fill, mixed, or secondary deposits; no specimen inventory or excavation-unit context is given.",
  },
  "ataco-las-sepulturas": {
    overview:
      "Ataco is an excavated pre-Hispanic site with a mapped nuclear zone. The cited source does not publish its precise location or connect it to the name Las Sepulturas.",
    dates:
      "The project reported Preclassic and Postclassic evidence. Reconnaissance, mapping, and exploratory excavation took place in 2006–2007; work continued under new direction from 2008.",
    fieldwork:
      "Researchers carried out archaeological reconnaissance, mapped the site's nuclear zone for the first time, and opened exploratory excavations.",
    discoveries:
      "The later project studied jaguar heads and their spatial distribution. A 2025 synthesis also reports fragments of Bolinas-type figurines in structural fill, but gives no specimen count, unit, or primary depositional context.",
  },
  "san-isidro-sonsonate": {
    overview:
      "A large Middle-to-Late Preclassic monumental center in Sonsonate. Its largest visible mound, Cerrito 1, faces the smaller Trapiche 3 structure across a plaza on an axis about 15° north of west.",
    dates:
      "Ceramic typology and radiocarbon assays date the Cerrito 1 figurine stratum to 410–380 BCE. The cited article documents PASI fieldwork in 2018, the 2022 tableau excavation, and vestiges of an earlier offering discovered in 2024.",
    fieldwork:
      "Excavation around the Cerrito 1 summit exposed the deposit less than 0.5 m below the surface. Objects had to be documented and removed day by day, and two bullhorn-tree roots crossed the context, so the authors treat its reconstructed arrangement cautiously. Photogrammetry mapped the site center; ploughing had brought a plain stela to the surface of Trapiche 3 in 2018.",
    discoveries:
      "Five complete Bolinas-type figures occupied just over 0.6 m²: three approximately 30 cm cream-paste figures with string-adjustable heads and two smaller orange-brown figures about 18 and 10 cm tall. Four represent females; one may be the first complete male of the type and bears facial tattoo or scarification. The offering also held two polished jade disks, two stacks of serving vessels, and a smashed tripod metate. Other Cerrito 1 fill contained many figurine fragments and a hollow torso into which the smallest tableau figure fits. The authors propose puppet-like performance and a termination or dedicatory rite, but explicitly mark intentional breakage, funerary meaning, identities, feeding, birth imagery, and political reconstruction as hypotheses.",
  },
  "chalchuapa-bolinas-figurines": {
    overview:
      "A regional evidence point for Bolinas-type figurine fragments somewhere within greater Chalchuapa; the 2025 article does not assign them to a particular component site.",
    dates:
      "The Bolinas tradition is broadly Middle and Late Preclassic. The article does not date the Chalchuapa specimens or the work that recovered them.",
    fieldwork:
      "The article synthesizes earlier Chalchuapa research rather than reporting new fieldwork. Most cited fragments came from surface, structural fill, mixed deposits, or other secondary contexts.",
    discoveries:
      "Fragmentary Bolinas-type figurines are reported, without a specimen count or component-site attribution. In a separate comparison, the authors cite Chalchuapa as evidence that monumental building can occur in communal rather than ruler-centered contexts.",
  },
  "zapotitan-valley-bolinas-figurines": {
    overview:
      "A broad regional lead for Bolinas-type figurine fragments reported somewhere in the Zapotitán Valley; it is not a single archaeological site.",
    dates:
      "The Bolinas tradition is broadly Middle and Late Preclassic. The article provides no specimen-level date for the valley finds.",
    fieldwork:
      "The 2025 article summarizes earlier valley research and does not identify a site, excavation unit, or field date.",
    discoveries:
      "Fragmentary Bolinas-type figurines are reported primarily from surface, structural-fill, mixed, or secondary deposits. The source does not connect them specifically to Joya de Cerén, San Andrés, or another mapped valley site.",
  },
  "cara-sucia": {
    overview:
      "An excavated pre-Hispanic site on El Salvador’s western coastal plain. Its documented sequence includes Late Preclassic and Late/Terminal Classic occupations.",
    dates:
      "The sequence includes Late Preclassic and Late/Terminal Classic occupations; a Terminal Classic facet of the Tamasha phase is dated to 800–950 CE.",
    fieldwork:
      "A 1982–1983 project used ceramic analysis and radiocarbon dates to define the site’s sequence; excavations are also documented.",
    discoveries:
      "The Terminal Classic facet included Motagua-style fine-paste pigment flasks, moldmade cylindrical vessels, fine-orange vessels similar to the Altar group, and copper.",
  },
  "el-carmen": {
    overview:
      "An excavated mound on an arm of the Estero El Zapote. The excavators interpreted its compacted-clay floors, ovens, storage pits, and refuse deposits as evidence of domestic use.",
    dates:
      "Early Preclassic (called Early Formative in the report), with a corrected and calibrated average radiocarbon age of 1590 ± 150 BCE. Fieldwork ran from May 23 to June 17, 1988.",
    fieldwork:
      "The team excavated 32 m² in 2 × 2 m units, using arbitrary 25 cm levels and natural levels where cultural features allowed.",
    discoveries:
      "Excavation defined seven construction stages and exposed three features interpreted as high-temperature ovens, 12 storage pits, and possibly two more. Pit fills included burned-clay fragments with shell impressions, charred seeds, and bone.",
  },
  "el-eden": {
    overview:
      "The report identifies El Edén on land of Cooperativa Nueva York but gives no site boundary or archaeological coordinate. Its pottery was later than El Carmen’s Early Preclassic occupation.",
    dates:
      "Middle to Late Preclassic, based on pottery; fieldwork took place in May–June 1988.",
    fieldwork:
      "Investigators surveyed, collected surface material, cleaned looter-trench profiles, and excavated one 2 × 1 metre test pit in arbitrary 25 cm levels.",
    discoveries:
      "The test pit yielded eroded pottery, a prismatic obsidian blade, charcoal, obsidian, bone, and a metate fragment. The report identifies Middle Preclassic fugitive-polychrome sherds but notes that the second and third lots were disturbed.",
  },
  "el-zapote-san-isidro": {
    overview:
      "An excavated site on a small flat area of El Zapote mountain within Cooperativa San Isidro. Three elongated mounds enclose a small plaza on a leveled terrace.",
    dates:
      "Postclassic, but the report could not determine whether the occupation was early or late within that period. The site was registered in 2011 and excavated January 7–11, 2013.",
    fieldwork:
      "Investigators recorded 896 total-station points and opened three test pits across the plaza and the bases of two mounds.",
    discoveries:
      "Excavation documented earthen-and-stone construction and fill used to level the terrace. Pottery, obsidian, and stone objects were recovered, but the limited ceramic sample did not support a specific type or narrower date.",
  },
  "tacuscalco-los-cerritos": {
    overview:
      "An excavated archaeological site in the Nahulingo area. The cited sources do not publish its boundaries or precise location.",
    dates:
      "Investigations are documented in 1990 and 2004–2005. The cited pages do not date the site's occupation or burials.",
    fieldwork:
      "The 1990 project included mapping, surface collection, and excavation. A 2004–2005 project conducted archaeological sounding and osteological study in the Tacuscalco–Los Cerritos/Ruiz sector.",
    discoveries:
      "A later review reports three multiple burials. The cited pages do not describe the individuals or associated objects.",
  },
  "iglesia-caluco": {
    overview:
      "A colonial church at Caluco where archaeological excavation and topographic survey are documented.",
    dates:
      "Colonial period. Archaeological fieldwork is documented in 1994 and 1995.",
    fieldwork:
      "Excavation covered the church and adjacent areas in 1994. The program continued in 1995 and included a topographic survey.",
    discoveries:
      "The cited synthesis does not report what the excavations found.",
  },
  "asuncion-izalco": {
    overview:
      "The ruins of Izalco’s colonial Iglesia de la Asunción, tested archaeologically in 1989.",
    dates:
      "The report places the church’s construction before 1586 and its destruction in the 1773 Santa Marta earthquake. The ruins continued to be used for burials afterward.",
    fieldwork:
      "A two-week August sounding opened 18 test units in seven operations, covering more than 40 square meters. Burials prevented some units from reaching sterile deposits.",
    discoveries:
      "The sounding identified paving, terraces, a wall-base reinforcement, a possible atrium floor, and a refuse deposit containing Indigenous-tradition pottery, majolica, glass bottles, Ming porcelain, and food remains. Eleven burials were exposed.",
  },
  "los-gavilanes": {
    overview:
      "An excavated Early Postclassic site on a proposed housing parcel east of Chalchuapa. Investigators documented two pre-Hispanic structures.",
    dates:
      "About 900–1200 CE. Fieldwork ran from June through August 2005.",
    fieldwork:
      "Investigators surveyed the parcel, collected surface material, and excavated test pits. The report describes six excavation operations.",
    discoveries:
      "Structure 2 had stone foundations, cobbled and burned-earth floors, and a stone-lined feature with burning traces that the authors tentatively linked to copal. Finds included two fragments identified as a Xipe Totec effigy, Plumbate and Nicoya/Papagayo pottery, and a green obsidian blade attributed to Pachuca, Mexico.",
  },
  tazumal: {
    overview:
      "An excavated monumental precinct at Chalchuapa centered on Mounds 1 and 2.",
    dates:
      "The cited publications document Late Classic architecture and an Early Postclassic addition dated to about 900–1200 CE.",
    fieldwork:
      "Exploratory excavation and transit mapping examined Mounds 1 and 2 in April–May 1942. After part of Structure B1-2 collapsed in 2004, later projects combined excavation, restoration, topographic survey, and study of architectural development through 2012.",
    discoveries:
      "Excavation recorded repeated rebuilding of Mound 1, four post-construction burials, stone and obsidian objects, and distinct early and later pottery deposits.",
  },
  "ciudad-nuevo-tazumal": {
    overview:
      "An excavated Postclassic site, also called El Cuje, northeast of Tazumal and south of Laguna Cuscachapa.",
    dates:
      "The recorded architecture was assigned to the Postclassic. Archaeological sounding took place from 2001 to 2003.",
    fieldwork:
      "The cited synthesis reports archaeological sounding but does not describe its methods.",
    discoveries:
      "Across an area of about ten manzanas, investigators recorded one circular, two long, one polygonal, two semi-oval, and four square platforms, plus eight foundations. The source says the architecture was built with stone and mud.",
  },
  "casa-blanca": {
    overview:
      "An excavated mound group at the northeastern edge of Chalchuapa, part of which is protected within Casa Blanca Archaeological Park.",
    dates:
      "Late Preclassic, Early Classic, and Postclassic components are reported.",
    fieldwork:
      "Longyear made a cursory inspection in 1942 and reported that two mounds had already been partly excavated. A 1995–2000 project excavated, mapped, and restored some structures.",
    discoveries:
      "Longyear counted sixteen mounds, described adobe-and-stone construction, and recorded ceramics, vessels with burned human bones, and stone sculptures. The 1995–2000 project reported a burial with offerings and three Plumbate vessels associated with Structure 2.",
  },
  "el-trapiche-e3-7": {
    overview:
      "Mound E3-7 is an excavated part of El Trapiche in Chalchuapa. Researchers reported 33 burials within the mound.",
    dates:
      "One documented burial is assigned to the Late Preclassic Caynac phase, 100 BCE–100 CE. Rescue excavation took place in 1977–1978.",
    fieldwork:
      "Manuel López and William Fowler excavated mound E3-7. The cited summaries do not describe the excavation methods.",
    discoveries:
      "The 33 individuals had been buried within the mound. Fowler interpreted the context as human sacrifice; a later study says the bodies were prone with hands and feet tied and were placed collectively in three successive events.",
  },
  "templo-santiago-apostol": {
    overview:
      "A historic church in Chalchuapa where the national Department of Archaeology conducted an investigation.",
    dates:
      "The investigation took place in 1998–1999. The cited summary does not date the church or any archaeological deposits.",
    fieldwork:
      "The summary says that Claudia Ramírez directed the investigation's second phase, but it does not identify the field methods.",
    discoveries:
      "The cited summary does not describe architectural features, deposits, or objects from the investigation.",
  },
  "asuncion-ahuachapan": {
    overview:
      "Excavation inside and around this colonial church documented Late Preclassic deposits beneath the church and its later fill.",
    dates:
      "The lower deposit is dated to the Late Preclassic, 400 BCE–250 CE. Fieldwork took place from October 14 to 25, 1985.",
    fieldwork:
      "Archaeologists excavated 12 test pits in the nave and outside the church to examine the subsurface, reported cavities, and foundation details.",
    discoveries:
      "They recorded 26 burials. A compact lower layer contained Late Preclassic ceramics and possibly two constructions; overlying church fill contained historic burials and some Protohistoric and Historic ceramics.",
  },
  "finca-san-rafael": {
    overview:
      "An excavated Postclassic site at Finca San Rafael in Chalchuapa, where a brief published summary reports structures, domestic groups, and terraces.",
    dates:
      "The site is assigned to the Postclassic period. Archaeological testing took place in February 2006.",
    fieldwork:
      "The synthesis reports archaeological testing before a proposed housing development but does not describe the methods.",
    discoveries:
      "Investigators recorded about nine structures organized into two domestic groups, together with terraces. The synthesis does not identify recovered objects.",
  },
  "san-andres-campana": {
    overview:
      "An excavated monumental center in the Zapotitán valley, with an acropolis, a north plaza, and Structure 5, known as La Campana.",
    dates:
      "Material spans the Middle Preclassic through the Early Postclassic; the site reached its apogee in the Late Classic (600–900 CE).",
    fieldwork:
      "The Carnegie project made small excavations across the principal group and investigated several structures, a court, and a mound. Later work included two trenches beside La Campana and Mound B.",
    discoveries:
      "Excavations documented adobe-and-plaster monuments, successive construction episodes, volcanic ash and floors, pottery, figurines, obsidian, and carved stone.",
  },
  "joya-de-ceren": {
    overview:
      "A Middle/Late Classic village buried by a volcanic eruption, where excavations exposed structures and cultivated fields.",
    dates:
      "The park history dates the burial to about 640 CE; geophysical work took place in 1979–1980, and excavation began in 1989.",
    fieldwork:
      "Investigators used geophysical methods, including magnetic resistance and radar, before beginning excavation.",
    discoveries:
      "Excavations exposed several structures and cultivated fields. Research reported in 2011 also documented a variety of crops.",
  },
  "el-cambio": {
    overview:
      "An excavated site in San Juan Opico, in the Zapotitán valley, with documented funerary contexts.",
    dates:
      "The compiled bibliography names Preclassic burials; a later article reports one excavated individual as Early Postclassic (900–1250 CE).",
    fieldwork:
      "A 2006–2007 excavation recorded burial contexts, positions, funerary pattern, and associated objects. A 2008 osteological study examined remains from the excavations.",
    discoveries:
      "The sources describe burials and associated objects but do not provide a complete catalog. One later-studied cranium had intentional tabular-erect shaping.",
  },
  "nuevo-lourdes-poniente": {
    overview:
      "An excavated site west of Urbanización Nuevo Lourdes Extensión in Colón. The 2013 work documented three primary burials whose pits cut through the Ilopango TBJ deposit.",
    dates:
      "Terminal Preclassic ceramic activity and Late Classic burial contexts are documented. The three human-bone samples calibrated to 678–862, 688–864, and 651–764 CE (2 sigma).",
    fieldwork:
      "The 2013 investigation excavated the three burials and analyzed a human-bone sample from each by AMS radiocarbon dating.",
    discoveries:
      "The burials had offerings, and stone slabs or adobe blocks bounded parts of the graves. Separately reported Terminal Preclassic ceramic material included mammiform supports and Usulután decoration combined with a red band.",
  },
  chanmico: {
    overview:
      "A poorly documented pre-Hispanic archaeological site reported north of Laguna Chanmico. The published sources do not define its location or extent.",
    dates: "Pre-Hispanic, otherwise undated.",
    fieldwork:
      "The accessible sources identify Chanmico as documented and cite an investigation report, but they do not describe the fieldwork.",
    discoveries:
      "The accessible sources provide no site-specific find list. A historical report of pottery fragments on the lake's northern shore is not securely tied to this site.",
  },
  "antiguo-cuscatlan-avenida-navas": {
    overview:
      "A buried Middle Preclassic site exposed by utility work in Antiguo Cuscatlán. The excavated portion was cautiously interpreted as residential.",
    dates:
      "The ceramic assignment places the occupation around 900–650 BCE, within the Middle Preclassic.",
    fieldwork:
      "A 1987 rescue investigation documented the utility trench and excavated one 2 × 1 m test pit from the trench floor.",
    discoveries:
      "Investigators recorded at least seven burials; no artifacts were associated with them. The cultural layer also contained pottery, obsidian, burned earth, charcoal, floor segments, and stones interpreted as an earth oven.",
  },
  madreselva: {
    overview:
      "A rescue-excavated site within the Madre Selva development in Antiguo Cuscatlán. The report documents a Late Classic village and two Postclassic groups of structures.",
    dates:
      "The cited report dates the documented occupations to 600–1524 CE: Late Classic (600–900) and Postclassic (900–1524). Rescue activity is documented in 1992.",
    fieldwork:
      "A development-led rescue program excavated the site. One Postclassic structure was dismantled and reassembled nearby as construction advanced.",
    discoveries:
      "Late Classic remains included wattle-and-daub dwellings, refuse pits, and burials near houses, commonly with ceramic vessels. Postclassic excavations recorded a three-structure plaza and a four-mound group; arrowheads lay beside the foundations of burned buildings.",
  },
  "sitio-c-la-viuda": {
    overview:
      "A site in Ciudad Nuevo Cuscatlán known as Site C or La Viuda. The accessible source identifies an internal report on rescue excavations but does not reproduce its findings.",
    dates:
      "Listed in a table of reports on pre-Hispanic burials; otherwise undated. The internal report is dated 1996.",
    fieldwork:
      "The report title identifies rescue excavations. The accessible review does not state the excavation units, methods, or fieldwork dates.",
    discoveries:
      "The table says the report covers archaeological and stratigraphic context, funerary pattern, osteological analysis, and associated objects, but it does not publish the results.",
  },
  "hacienda-tula": {
    overview:
      "A small archaeological locality on a flat ridge called La Sabana at Hacienda Tula. Three low rises were visible in 1942; two contained pottery-bearing volcanic ash, but the report concluded that their mound-like shape did not reflect constructed architecture.",
    dates:
      "No absolute occupation date was established. Ceramic comparison suggested only that the deposit was roughly contemporaneous with late Tazumal and Campana–San Andrés.",
    fieldwork:
      "The site was visited in March 1942. Boggs dug one test trench to sterile soil in each of the two largest rises and compared the recovered pottery with other Salvadoran collections.",
    discoveries:
      "Sherds occurred in the lower part of a volcanic-ash layer. A fragmentary perforated black-scoria object described as a ‘club head’ was the only stone implement, and no complete vessel was excavated.",
  },
  "club-internacional": {
    overview:
      "A compact deposit of pre-Hispanic objects exposed during basement construction in central San Salvador in 1939. The objects lay within the uppermost volcanic-ash stratum.",
    dates:
      "Pre-Hispanic. Boggs tentatively compared the pottery association with late 9th-cycle Maya styles; the deposit itself was not directly dated.",
    fieldwork:
      "Construction workers exposed the deposit. Boggs relied on the contractor’s description of the layers and catalogued the recovered objects; no controlled excavation is documented.",
    discoveries:
      "The collection included pottery vessels and sherds, a small pottery head, and what Boggs tentatively identified as a peccary tusk.",
  },
  "cerro-zapote-san-jacinto": {
    overview:
      "An excavated locality on Cerro Zapote where archaeological material occurred both in buried humus and in the volcanic ash above it.",
    dates:
      "The lower deposit was later assigned to the Middle–Late Formative; a 1975 synthesis also lists Cerro El Zapote among Postclassic sites, but the mixed upper deposit is not securely dated.",
    fieldwork:
      "In January 1926, investigators excavated beside a road across the hill above the Río Acelhuate, opposite Finca Modelo. The report gives no coordinate or trench dimensions.",
    discoveries:
      "The excavation recovered a pottery head, numerous sherds, and fragments of obsidian blades. The upper ash also yielded a mixed assemblage that the report could not separate securely.",
  },
  "basilica-el-pilar": {
    overview:
      "El Pilar is a historical church in San Vicente where an archaeological investigation was reported in 2003.",
    dates:
      "The reported investigation dates to 2003; the finds included cultural materials identified only as Colonial-period.",
    fieldwork:
      "The published summary calls the work an investigation but does not describe its methods or extent.",
    discoveries:
      "The summary lists catacombs, architectural features, and Colonial-period cultural materials; it gives no artifact inventory or construction sequence.",
  },
  "cihuatan-p7": {
    overview:
      "Structure P-7 is Cihuatán’s principal pyramid, within the city’s western ceremonial center. Limited excavation documented its construction and a burned terminal deposit.",
    dates:
      "Sparse diagnostic pottery is consistent with the Early Postclassic Guazapa phase, about 900–1200 CE. The focused investigation ran from 2001 to 2002.",
    fieldwork:
      "Researchers made a new topographic survey, excavated stratigraphic units along the pyramid’s western side, and reopened part of the western stair exposed in 1929.",
    discoveries:
      "Excavators documented six stepped core terraces, tuff-block facing, a stone platform at the western stair, and partial lava-block paving. Burned rubble at the pyramid’s foot indicates that its use ended in fire.",
  },
  carranza: {
    overview:
      "Carranza is an excavated settlement near the southern end of Cihuatán. Rescue work focused on a low platform damaged by decades of sugarcane cultivation.",
    dates:
      "Pottery from Structure 1 dates to the Early Postclassic (900–1200 CE), possibly 950–1100 CE. Excavation began in 2002, with continuing work reported in 2004.",
    fieldwork:
      "A six-week rescue excavation used 39 units to expose all of Structure 1, an area of 182 square metres. Later excavation investigated an offering in front of Structure 2.",
    discoveries:
      "Nearly 100 fragments of a large ceramic Xipe Tótec figure were recovered mainly from Structure 1's central chamber. In front of Structure 2, excavators found a second near-life-sized figure in an offering with more than 500 ceramic vessels and abundant obsidian blades.",
  },
  "las-marias-tlaloc": {
    overview:
      "A limited rescue excavation about 80 metres west of Las Marías’ principal pyramid exposed part of a buried structure and a deposit of unusually large Tláloc-bottle fragments.",
    dates:
      "A site-wide assessment tentatively dates Las Marías to 900–1200 CE. The rescue excavation ran from July 12 to 20, 2002, but the unit was not independently dated.",
    fieldwork:
      "After a resident found sherds while planting, archaeologists opened one 2 × 2 metre unit. They excavated three levels to a maximum depth of 40 centimetres and stopped at a cobbled surface beside rows of tuff blocks.",
    discoveries:
      "The unit contained fragments from at least three oversized Tláloc bottles, a few vessel sherds, and pieces of prismatic obsidian blades. The report considered ritual use and a terminal destruction event possible, but said both interpretations required more excavation.",
  },
  "ciudad-vieja": {
    overview:
      "Ciudad Vieja is the archaeological site of the first stable settlement of the Villa de San Salvador, an early colonial town about 10 kilometres south of Suchitoto.",
    dates:
      "Founded in 1528 and probably abandoned in 1545, although the abandonment may have been later. Archaeological work began in 1996, with multiple field seasons from 2000 through 2005.",
    fieldwork:
      "A local summary says Ciudad Vieja was excavated from 1996 to 2005. The cited passages do not describe the excavation methods.",
    discoveries:
      "The cited passages do not provide a site-specific inventory of structures or artifacts.",
  },
  "santa-maria": {
    overview:
      "A Guazapa-phase settlement in the Cerrón Grande reservoir, with a principal pyramid and an I-shaped ballcourt. Most of the site is underwater at higher reservoir levels, and severe erosion was documented in 2003.",
    dates:
      "Early Postclassic, about 900–1200 CE. Registered in 1974, mapped and excavated in 1976, and revisited in 2002 and 2003.",
    fieldwork:
      "The 1976 team mapped 15 structures, fully excavated Structure A-1, and opened 43 test units. A 2003 low-water visit recorded exposed remains with GPS, measurements, and photographs.",
    discoveries:
      "The 1976 plan showed a principal pyramid and an I-shaped ballcourt on a large artificial platform. Information from Santa María and Cihuatán helped define the Guazapa phase, especially its ceramic complex.",
  },
  "hacienda-colima": {
    overview:
      "An archaeological locality at Hacienda Colima documented by the title of a 1974 Cerrón Grande rescue-excavation report.",
    dates:
      "The cited source documents excavation in 1974; the occupation period is unknown.",
    fieldwork:
      "The report title confirms rescue excavation, but the cited bibliography gives no field methods.",
    discoveries:
      "The cited bibliography does not describe any finds.",
  },
  "la-cienaga-santa-barbara": {
    overview:
      "A Classic-period ritual center in the north-central Lempa region. The cited sources identify the archaeological place as Hacienda Santa Bárbara; they do not establish La Ciénaga as an alternate name.",
    dates:
      "Classic period. The cited syntheses do not give a site-specific fieldwork date.",
    fieldwork:
      "The Cerrón Grande project used survey and associated excavation, but the cited syntheses do not describe a Santa Bárbara-specific operation or site boundary.",
    discoveries:
      "Santa Bárbara is associated with Copador-related wares, some stuccoed vessels with Maya motifs, and other artifacts related to the Copán–Quiriguá area. The cited pages do not document a mound count or an excavation of Mound 20.",
  },
  "hacienda-los-flores": {
    overview:
      "A Late Preclassic center in the Paraíso Basin identified during the Cerrón Grande rescue project.",
    dates:
      "Late Preclassic Dulce Nombre phase, about 400 BCE–250 CE.",
    fieldwork:
      "The rescue project identified a circular Mound 10 at Los Flores. The cited sources do not describe site-specific methods or give a fieldwork year.",
    discoveries:
      "A later synthesis describes Los Flores as a ritual-administrative center for a substantial Late Preclassic population. No site-specific artifact list is provided on the cited pages.",
  },
  "el-tanque-el-morrito": {
    overview:
      "A Classic-period ritual center at Hacienda El Morrito in the north-central Lempa region.",
    dates:
      "Classic period. A 1976 publication reports the excavation, but the cited sources do not state when fieldwork occurred.",
    fieldwork:
      "A preliminary report title documents excavations of Mound 3. The cited syntheses provide no site-specific methods, boundary, or excavation coordinate.",
    discoveries:
      "El Tanque is associated with Copador-related wares, some stuccoed vessels with Maya motifs, and artifacts related to the Copán–Quiriguá area. The cited pages do not give a Mound 3 find list.",
  },
  "cerron-grande-unnamed": {
    overview:
      "A project-area marker for the Cerrón Grande archaeological rescue program. It is not the location of a single site.",
    dates:
      "The rescue program ran from 1974 to 1977. The cited page gives no occupation dates for the individual sites.",
    fieldwork:
      "The program identified 22 previously unknown sites and excavated nine before inundation. The cited page says an intensive survey was not possible.",
    discoveries:
      "The cited page does not name or locate the nine excavated sites or describe their finds.",
  },
  "paraiso-basin": {
    overview:
      "A regional marker for excavation evidence from the Paraíso Basin. It does not represent a single archaeological site or trench.",
    dates:
      "Pre-Hispanic, otherwise undated. The cited review discusses estimates for the Ilopango eruption, not a basin-wide occupation span.",
    fieldwork:
      "A 1999 dissertation used excavation data from the Paraíso Basin and Nuevo Cuscatlán, ceramic study, and regional comparison. The cited review does not name the excavation locations or describe field methods.",
    discoveries:
      "The review provides no site- or context-specific find inventory. It says the combined evidence contributed to reassessing the date of the Ilopango eruption.",
  },
  "loma-china": {
    overview:
      "An excavated Early Postclassic site of four mounds on a terrace beside the Lempa River in the San Lorenzo reservoir area.",
    dates:
      "Early Postclassic. The study dates the start of the Loma China phase to about 900–1000 CE but gives no site-specific end date; rescue work took place in 1982–1983.",
    fieldwork:
      "Investigators surveyed the reservoir area and excavated three of Loma China’s four mounds. The published study reconstructs the work from surviving field maps, interviews, and the artifact collection.",
    discoveries:
      "Structure B held a central flexed burial with four mosaic-covered sandstone plaques; ceramic vessels, green-obsidian blades, and other objects were interpreted as offerings. Two other excavated structures contained multiroom building remains.",
  },
  "san-lorenzo-unnamed": {
    overview:
      "A collective marker for five excavated sites in the San Lorenzo reservoir zone whose individual names and positions remain incomplete. They belong to a much larger archaeological landscape surveyed before flooding.",
    dates:
      "Pre-Hispanic occupations of more than one period; the rescue project ran from 1981 to 1983.",
    fieldwork:
      "Survey registered more than eighty sites across roughly one hundred square kilometres and selected eight for excavation. Loma China, El Astillero, and El Jocotal can now be mapped separately.",
    discoveries:
      "The regional program demonstrated dense settlement in a landscape later transformed by the reservoir. Five excavations remain grouped rather than being assigned invented names or coordinates.",
  },
  "nueva-esperanza": {
    overview:
      "An excavated site in the Nueva Esperanza community of Bajo Lempa, with burials preserved in a lacustrine setting and archaeological deposits beneath Ilopango ash.",
    dates:
      "The reported burials were dated by ceramics and stratigraphy to the Late Preclassic (400 BCE–250 CE) and Early Classic (250–400 CE).",
    fieldwork:
      "The 2011 excavation documented a stratigraphic profile and recovered human bone and charcoal samples. A later osteological study examined Burials 2–4 while their analysis was still in progress.",
    discoveries:
      "Burials 2–4 included a child, a young adult man with filed teeth and a rotated canine, and an adult woman without third molars and with a possibly filed canine. Another excavated woman was buried beneath the ash with 19 ceramic offerings.",
  },
  "wreck-anden": {
    overview:
      "The remains of a Peruvian diesel freighter stranded just off Barra de Santiago. Large broken sections still connect a modern beach landscape to a destructive Pacific storm.",
    dates:
      "The ship grounded during the September 1982 storm; it represents late twentieth-century maritime history.",
    fieldwork:
      "Maritime researchers inventoried the wreck from the shore and shallow water and matched the visible remains to documentary accounts.",
    discoveries:
      "The hull broke into several large sections, some reportedly visible at low tide. This is archaeological recording of a recent wreck, not a conventional soil excavation.",
  },
  "wreck-ss-colon": {
    overview:
      "A Pacific Mail steamship whose surviving machinery lies on the beach at Acajutla. The wreck records the era when steam traffic tied El Salvador’s coffee economy to international ports.",
    dates:
      "Built and operated in the nineteenth-century steamship era; struck Punta Remedios and was driven ashore in 1904.",
    fieldwork:
      "Researchers combined archival vessel history, measured inspection of the exposed engine remains, photography, and GPS recording.",
    discoveries:
      "Heavy engine components survive about 200 metres southeast of the Río Sensunapán mouth. Their identity and position allow the documentary loss account to be anchored to a physical site.",
  },
  "wreck-ss-columbus": {
    overview:
      "A steamship wreck on the reef at Los Cóbanos, now part of a dense cluster of historic losses around Punta Remedios.",
    dates:
      "Historic steamship era; the consulted public sources do not give a sufficiently secure loss year for this summary.",
    fieldwork:
      "Maritime surveys recorded the wreck at roughly twenty feet depth, but no public GPS position was recovered for this atlas.",
    discoveries:
      "Submerged machinery and structural remains identify a sizeable steam vessel on the reef. The marker is deliberately placed in the reported reef sector rather than presented as a dive coordinate.",
  },
  "wreck-cheribon": {
    overview:
      "The wreck of the steamship Cheribon at Punta Remedios in the Los Cóbanos protected area, one of several vessels lost on this hazardous reef.",
    dates:
      "Wrecked in 1882. Surveyed as part of modern inventories of El Salvador’s submerged cultural heritage.",
    fieldwork:
      "Researchers used diver observation, documentary identification, and GPS to register the surviving machinery and wreck scatter.",
    discoveries:
      "Engine components remain in shallow water and can project above the surface during exceptionally low tide, making the industrial character of the wreck readily visible.",
  },
  "wreck-ss-douglas": {
    overview:
      "A coffee-carrying steamship lost southwest of Punta Remedios and long known under both Douglas and Sakkarah. It is one of El Salvador’s best-documented protected underwater sites.",
    dates:
      "Struck the reef and sank in 1890. Surveyed in the 2000s and declared the country’s first protected submerged archaeological site in 2011.",
    fieldwork:
      "Divers mapped and photographed machinery and hull remains across survey points at about fifteen to thirty-five feet depth, then connected them with shipping records.",
    discoveries:
      "The wreck preserves boilers, engine and structural components together with the story of a coffee cargo lost on an international route. Its survey helped establish underwater-heritage practice in El Salvador.",
  },
  "wreck-ss-san-blas": {
    overview:
      "A steamship scattered across the rocky eastern end of Playa San Blas. The long debris field shows how surf and salvage can spread a wreck far beyond the point where a ship first grounded.",
    dates:
      "Grounded in 1901. Modern archaeological documentation includes a dedicated 2012 report.",
    fieldwork:
      "Researchers walked and mapped the intertidal remains, recorded major machinery with GPS, and reconstructed the vessel history from archival sources.",
    discoveries:
      "Engine and structural sections extend for roughly 200 metres east–west near the Río Comasagua mouth. The largest engine section supplies the mapped coordinate.",
  },
  "pecio-psj-1": {
    overview:
      "PSJ-1 is an excavated wreck at the eastern end of the San Juan del Gozo peninsula. Its vessel name and construction date remain unknown.",
    dates:
      "Recorded and excavated in 2012. The sources classify the wreck as a steamship but give no construction or loss date.",
    fieldwork:
      "Investigators partially excavated the exposed mast during an August 2012 visit. In November they opened four 2 × 2 m pits; one exposed the mast base before groundwater at 1.10 m halted excavation.",
    discoveries:
      "The initial visit documented a riveted iron fragment and confirmed that it was part of a mast. The four-pit excavation exposed its lower portion, but the report could not date or name the vessel.",
  },
  "wreck-kirkdale": {
    overview:
      "A sailing-ship wreck east of the Bocana El Bajón near Isla San Sebastián, known to local fishers as El Guirdalia before documentary research tied it to Kirkdale.",
    dates:
      "Historic sailing-vessel era; documented archaeologically in modern maritime surveys.",
    fieldwork:
      "Divers recorded the site at roughly sixty to sixty-five feet depth, took a GPS position, and compared its construction and local name with archival loss records.",
    discoveries:
      "The submerged hull and fittings preserve a sailing vessel rather than the steam machinery common at several other mapped wrecks. The local fishing name helped guide researchers to the site.",
  },
  "wreck-brucklay-castle": {
    overview:
      "A barque reported lost on the Jiquilisco bar. It is mapped here as a documentary search area because researchers have not securely relocated the physical wreck.",
    dates:
      "Abandoned on the bar in 1896; its exact modern archaeological location remains unconfirmed.",
    fieldwork:
      "The record comes from archival research and regional reconnaissance, not a verified dive on identified wreckage.",
    discoveries:
      "No confirmed remains can yet be assigned to Brucklay Castle. The useful result is a bounded historical lead near Bocana El Bajón, clearly distinguished from a surveyed coordinate.",
  },
  "wreck-ss-honduras": {
    overview:
      "The wreck of SS Honduras lies offshore from the San Juan del Gozo peninsula on a sandbank near the El Bajón outlet. The published article describes the area but does not print the recorded GPS coordinate.",
    dates:
      "Built in 1871 and wrecked on April 25, 1886. Archaeologists identified and recorded the site in 2014.",
    fieldwork:
      "Guided by a local fisher, investigators made three dives, inspected the wreck, and selectively recovered objects for identification. They compared the remains and objects with historical records.",
    discoveries:
      "Researchers recorded the bow, a boiler, shaft, propeller, pipes, and cables. A marked 1876 Limoges porcelain butter dish, the wreck's location, and historical research supported its identification as SS Honduras.",
  },
  "los-llanitos": {
    overview:
      "About a dozen small mounds were arranged around a plaza and an excavated ballcourt south of San Miguel.",
    dates:
      "The ceramic complex was tentatively placed around 1100–1200 CE; excavation ran February 3–March 13, 1942.",
    fieldwork:
      "The 1942 project mapped the mound group, concentrated excavation on the ballcourt, and investigated three other mounds.",
    discoveries:
      "Excavation documented pumice-block walls set in adobe mortar, stone slabs facing the ballcourt, pottery, obsidian, and caches in two mounds.",
  },
  quelepa: {
    overview:
      "An excavated archaeological center about 8 kilometres northwest of San Miguel. A 1973 account describes a ceremonial center covering more than half a square kilometre.",
    dates:
      "The later project summary dates the analyzed sequence from about 500 BCE to about 1000 CE. Excavation ran from 1967 through 1969.",
    fieldwork:
      "The program excavated at Quelepa and based the regional sequence mainly on ceramic and architectural analysis.",
    discoveries:
      "The excavated ceramics and architecture were used to establish an archaeological sequence for eastern El Salvador.",
  },
  "casa-quemada": {
    overview:
      "A roughly 9-hectare Late Classic settlement on a natural platform beside the Torola River. The 2013 project recorded 18 structures and three plazas.",
    dates:
      "Late Classic, about 600–900 CE. Preliminary excavation took place in 2009, followed by rescue excavation in 2013.",
    fieldwork:
      "In 2009, investigators opened test pits and trenches at Structure 6 and two plaza areas. In 2013, archaeologists worked across the site, excavating 14 of the 18 structures and all three plazas.",
    discoveries:
      "Excavators documented stone-and-earth architecture, fragmentary ceramics, obsidian, metate fragments, and a fired pit interpreted as a ceramic-firing oven.",
  },
  "el-chaparral": {
    overview:
      "An excavated locality on a steep part of the Torola River's south bank. It has retaining walls on three terraces, but their exact date is unknown.",
    dates:
      "The walls postdate Late Classic material beneath them and may be colonial. Excavation ran from January 16 to February 15, 2013.",
    fieldwork:
      "Twelve test pits, mostly 2 × 2 metres, sampled the roughly 100 × 50 metre locality and its three terraces.",
    discoveries:
      "Excavators documented poorly preserved walls and a semicircular feature. Ceramics, chipped stone, metates, and grinding stones were mostly in secondary deposits and did not establish the walls' date.",
  },
  "el-chiquirin": {
    overview:
      "A shell midden with stone walls and a burial at Punta El Chiquirín, about 150 metres from the Gulf of Fonseca shore.",
    dates:
      "Radiocarbon and ceramic studies suggest a Late Classic main occupation, about 600–900 CE. Rescue work ran from late 2002 into early 2003.",
    fieldwork:
      "After an accidental discovery, archaeologists mapped the site and opened six 1 × 1 metre units, later extending the excavation around the burial.",
    discoveries:
      "The excavation documented three stone walls filled with shells and a secondary burial. The burial had nine ceramic vessels, red pigment, and volcanic-rock fragments.",
  },
  "la-laguneta": {
    overview:
      "A sizeable settlement beside the Río Don Gaspar near the Lempa, organized around a plaza and an I-shaped ballcourt. Its architecture places public ceremony within the densely occupied San Lorenzo reservoir landscape.",
    dates:
      "Late Classic to Early Postclassic, approximately 600–1200 CE. Modern test excavation formed part of the 2006–2007 eastern El Salvador atlas project.",
    fieldwork:
      "Researchers mapped the visible architecture, documented the ballcourt, and opened test excavations to establish construction and chronology.",
    discoveries:
      "The survey recorded more than twenty structures around a central plaza, including the ballcourt. Excavated ceramics connected the architectural plan to the Late Classic–Early Postclassic occupation of the upper Lempa region.",
  },
  "salto-el-coyote": {
    overview:
      "A compact settlement near the San Lorenzo reservoir whose paired mounds form a ballcourt. It adds a second ceremonial ballgame setting to the Estanzuelas–San Ildefonso cluster.",
    dates:
      "Late Classic to Early Postclassic, broadly 600–1200 CE. Investigated during the 2006–2007 eastern atlas field campaign.",
    fieldwork:
      "The atlas team mapped the site and used test excavations to sample deposits associated with its plaza and ballcourt architecture.",
    discoveries:
      "Researchers documented an I-shaped ballcourt and associated mounds, with ceramic material used to place the community in the later first millennium and opening centuries of the second.",
  },
  "el-cacao": {
    overview:
      "An archaeological settlement on sloping ground in the Uluazapa area of San Miguel department. The mapped remains cover roughly ten hectares around a central plaza.",
    dates:
      "Late Classic, approximately 600–900/1000 CE. The site was mapped and test-excavated in 2007.",
    fieldwork:
      "Researchers mapped the site and opened four test pits.",
    discoveries:
      "They documented about ten low structures and four additional architectural features around the plaza. The ceramic study assigns four groups found at El Cacao to the Lepa phase.",
  },
  "brisas-de-jiquilisco": {
    overview:
      "A coastal settlement a few kilometres inland from Jiquilisco Bay. Its testing helps connect the bay’s estuarine resources with the communities that occupied the adjacent plain.",
    dates:
      "Pre-Hispanic; investigated during the 2006–2007 eastern atlas project. The cited section does not justify a tighter phase assignment.",
    fieldwork:
      "The team excavated twenty test pits across the site after locating it during regional survey.",
    discoveries:
      "The pits established subsurface occupation and produced ceramic evidence for comparison across the Jiquilisco region. The report treats the collective sample, rather than one spectacular object, as the principal result.",
  },
  "la-florida-jiquilisco": {
    overview:
      "A settlement south of the coastal highway in the Jiquilisco district, selected as one of the eastern atlas project’s intensive test sites.",
    dates:
      "Pre-Hispanic; tested in the 2006–2007 project. The accessible atlas section does not provide a securely narrowed occupation span.",
    fieldwork:
      "Thirty-six test pits made La Florida one of the more extensively sampled localities in the atlas field program.",
    discoveries:
      "The excavation documented buried occupation across the site and recovered ceramics for regional comparison. Its importance lies in the breadth of the sample and the settlement evidence it preserved.",
  },
  "el-astillero": {
    overview:
      "A multi-structure settlement in the San Lorenzo dam zone, investigated before the reservoir covered it. It was one of the project’s substantial rescue samples rather than a single isolated mound.",
    dates:
      "Pre-Hispanic, with rescue work carried out from 1981 to 1983 before inundation.",
    fieldwork:
      "Archaeologists investigated most of the site’s sixteen registered structures as part of the San Lorenzo rescue project.",
    discoveries:
      "Excavation documented a planned settlement with architecture, ceramics, and activity deposits. The project map now preserves the site’s former relationship to the Lempa and reservoir tributaries.",
  },
  "el-jocotal": {
    overview:
      "A Late Classic settlement in Cantón El Tecomatal, built around a plaza and paired mounds interpreted as a ballcourt. Unlike several nearby rescue sites, it remained outside the reservoir’s inundation zone.",
    dates:
      "Late Classic, approximately 600–900 CE. Six structures were excavated in 1983 during the San Lorenzo project.",
    fieldwork:
      "The project mapped ten structures and excavated six, including architectural contexts around the plaza and possible ballcourt.",
    discoveries:
      "The work exposed platforms, plaza organization, ceramics, and a formal ballcourt arrangement, revealing a small community with public architecture in the upper Lempa landscape.",
  },
  "sitio-carolina": {
    overview:
      "A riverside archaeological locality on the north bank of the Río Torola, no more than 200 m northeast of Fumarolas / Agua Caliente. The later survey reported no visible structures or mounds.",
    dates:
      "A 2003 investigator tentatively attributed a small lithic sample to the Archaic, while the 2008–2009 survey proposed a Late Classic occupation (600–900 CE); neither assignment is independently dated in the cited article.",
    fieldwork:
      "A 2003 study placed nine test pits on the north side of the river. The 2008–2009 project later conducted surface survey on both banks.",
    discoveries:
      "The test pits produced only a small lithic sample. The later survey recorded low-density surface obsidian, chert, ground-stone fragments, and coarse domestic pottery.",
  },
  "fumarolas-agua-caliente": {
    overview:
      "A roughly 3-hectare archaeological locality on the north bank of the Río Torola. The survey reported no visible structures.",
    dates:
      "The article assigns the site to the Late Classic (600–900 CE), but does not report absolute dating.",
    fieldwork:
      "A 2008–2009 dam-impact project conducted systematic surface survey in the reservoir area. The cited sources do not document excavation at this site.",
    discoveries:
      "Surface finds included grinding-stone fragments, manos, a metate, and obsidian flakes. The survey found no pottery.",
  },
  "gruta-espiritu-santo": {
    overview:
      "A large painted and engraved rock shelter in an ignimbrite formation near Corinto. The report describes human figures, hands, animals, and geometric signs in several colors.",
    dates:
      "The rock art remains undated. Ceramic identifications include tentative Late Preclassic and Late Postclassic surface finds and a test-pit type assigned to about 625–1000 CE; the deeper lithics were only broadly described as preceramic.",
    fieldwork:
      "Nine test pits were excavated in 1977; two were stopped at shallow depth by large rocks. In 1996, a regional project photographed the paintings, traced a sample, and collected surface artifacts in front of the shelter.",
    discoveries:
      "The test pits contained ceramics and obsidian and chert artifacts. The 1996 surface collection included 12 potsherds and 270 flaked-stone pieces.",
  },
  "valle-san-juan-tronconera": {
    overview:
      "Erosion exposed a series of subterranean features in La Tronconera ravine at Hacienda Valle San Juan. Investigators interpreted them as probable ovens, but their use remains uncertain.",
    dates:
      "Radiocarbon and archaeomagnetic samples place the features and nearby activity around the beginning of the Common Era.",
    fieldwork:
      "Beginning in 1966, investigators examined the eroded ravine profiles, excavated archaeological deposits, and traced the features' relationships to ancient ground surfaces and nearby refuse.",
    discoveries:
      "More than a dozen bell-shaped or cylindrical features were recorded with burned walls and bases, burned stones, and charcoal. Pottery firing was considered and rejected because the features lacked a basal opening for airflow.",
  },
  asanyamba: {
    overview:
      "A major shell-midden complex beside Estero El Chapernalito in the Gulf of Fonseca. Dense deposits record generations of fishing, shellfish gathering, cooking, and settlement in a mangrove-estuary environment.",
    dates:
      "Principally Late Classic, with fieldwork from 1977 to 1981 and later study of the excavated collections.",
    fieldwork:
      "Teams mapped and excavated midden deposits, sampled stratigraphy, and analyzed ceramics, shell, animal bone, and other remains from multiple operations.",
    discoveries:
      "Thick shell layers, pottery, tools, faunal remains, and domestic debris documented intensive coastal subsistence. The assemblage also showed exchange and cultural connections across the Gulf of Fonseca.",
  },
  "la-rama-rio-gualacho": {
    overview:
      "Two profiles near Puerto El Triunfo preserved human footprints and pottery in buried layers.",
    dates:
      "Investigated in 1955. A later synthesis tentatively dated the La Rama footprints to about 1500 BCE or earlier and Gualacho to no later than 1000 BCE; pottery from nearby La Rama mounds was tentatively dated around AD 1200.",
    fieldwork:
      "Researchers cut into the road banks at La Rama to expose footprints and documented a stratigraphic profile at Río Gualacho. They also examined pottery collected from a nearby mound excavated by the landowner in 1953.",
    discoveries:
      "La Rama preserved human and animal tracks beneath the surface and a few sherds in its upper layer. The lowest Río Gualacho layer contained parts of two vessels and sherds, mostly orange ware, with rare Usulután-style negative painting.",
  },
  "chinameca-burial": {
    overview:
      "Entierro 1 de Chinameca is an individual burial found fortuitously; its exact findspot and discovery date are not published.",
    dates:
      "The associated mini-incensario suggests either the Terminal Late Classic (AD 700–900) or Early Postclassic (AD 900–1200).",
    fieldwork:
      "A 2015 paleopathology project examined the remains held by the Department of Archaeology; the report does not document a controlled excavation. The burial had already been disturbed by its finders and exposed to rain for two days.",
    discoveries:
      "The burial included a mini-incensario with a serpent-shaped zoomorphic handle. The study documented bilobed cranial modeling, caries, enamel hypoplasia, and ante-mortem tooth loss.",
  },
  "el-espinal": {
    overview:
      "A mapped architectural site east of the Lempa within the wider San Lorenzo project landscape. It remained outside the reservoir’s flooded zone.",
    dates:
      "Pre-Hispanic; registered in the 1981–1983 rescue survey and revisited in the 2006–2007 eastern atlas study.",
    fieldwork:
      "Researchers mapped visible architecture and compared its plan with other eastern Salvadoran sites; the cited sources do not document a broad excavation campaign here.",
    discoveries:
      "The principal evidence is the surviving arrangement of mounds and platforms. It broadens the architectural sample beyond the sites selected for excavation.",
  },
  "san-ildefonso-site": {
    overview:
      "A mound-and-plaza site associated with San Ildefonso, part of the dense archaeological landscape overlooking the upper Lempa.",
    dates:
      "Pre-Hispanic; registered during San Lorenzo investigations and described architecturally in the 2006–2007 eastern atlas.",
    fieldwork:
      "The atlas project documented the layout and surface architecture; the cited section does not establish an intensive excavation program.",
    discoveries:
      "Researchers recorded an elevated plaza and associated mounds, evidence for planned public space in the San Ildefonso locality.",
  },
  "san-jose-jucuaran": {
    overview:
      "A small group of isolated mounds in the coastal uplands west of Jucuarán, showing that settlement extended beyond the better-known river valleys and Gulf shore.",
    dates:
      "Pre-Hispanic; documented during the 2006–2007 eastern atlas project. No narrow phase is supported by the cited summary.",
    fieldwork:
      "Regional reconnaissance located and described the mounds; the atlas does not report a full excavation program at this site.",
    discoveries:
      "The visible mounds establish a built pre-Hispanic presence in the estate landscape. The record remains architectural and survey-based.",
  },
  "pozo-el-amate": {
    overview:
      "A terrace southwest of Jocoaitique where a 1954 survey recorded surface obsidian chips.",
    dates:
      "Visited between June 29 and July 2, 1954. The source does not date the obsidian chips.",
    fieldwork:
      "Haberland reported material visible on the surface; no excavation is documented.",
    discoveries:
      "Numerous obsidian chips were found, but none was a recognizable tool. Three weathered sherds found elsewhere on the terrace were judged modern.",
  },
  "pueblo-viejo-perquin": {
    overview:
      "A surveyed lithic locality on a high hill north of the road between Jocoaitique and Perquín.",
    dates:
      "The site was visited in 1954; the cited report does not date the lithic material.",
    fieldwork:
      "During the June 29–July 2 reconnaissance, artifacts were recovered from cattle tracks on the hill. No controlled excavation is documented.",
    discoveries:
      "Investigators recovered a few obsidian chips and a fragment of a large, roughly bifacially chipped point or knife.",
  },
  "quebrada-las-marias": {
    overview:
      "A surveyed lithic locality near Quebrada Las Marías, about 1 km east of the main road south of Perquín.",
    dates:
      "The site was visited in 1954; the cited report does not date the lithic material.",
    fieldwork:
      "During the June 29–July 2 reconnaissance, artifacts were recovered from wash cuts and from soil as deep as 10 cm. No controlled excavation is documented.",
    discoveries:
      "Investigators recovered more than 100 obsidian pieces, including eight small points and small end scrapers. The field notes did not include descriptions or drawings of these objects.",
  },
  "el-rosario-morazan": {
    overview:
      "An obsidian find locality on the plaza of El Rosario village.",
    dates:
      "Visited during a June 29–July 2, 1954 reconnaissance; the finds are undated.",
    fieldwork:
      "Obsidian was collected from the surface. No controlled excavation is documented.",
    discoveries:
      "The report lists 63 obsidian pieces, mostly small chips. Three were worked tools or fragments: two unifacial points or point fragments and one bifacial point-or-knife tip; a quartz chip was also found.",
  },
  gualococti: {
    overview:
      "A find locality at Gualococti where stone artifacts were gathered from the banks of the main road.",
    dates:
      "The finds were recorded during the June 29–July 2, 1954 reconnaissance; the cited report does not date them.",
    fieldwork:
      "Investigators gathered about 40 stone pieces from the road banks. No controlled excavation is documented.",
    discoveries:
      "Two pieces were quartz-like chips and the rest were obsidian. One obsidian fragment was interpreted as the possible tip of a knife or leaf-shaped point.",
  },
  "los-bonetes": {
    overview:
      "A surveyed hill with two mesa-like tops on the Honduran frontier north of Carolina. Archaeological material was recorded in the saddle and on the northern top.",
    dates:
      "The archaeological material is undated. The site was surveyed in 1954 and entered on a departmental site card in 1972.",
    fieldwork:
      "Los Bonetes was inspected during the June 29–July 2, 1954 reconnaissance. The report describes surface finds but no controlled excavation.",
    discoveries:
      "Field notes recorded many obsidian chips, blades, a point, and very few sherds in the 701 m saddle. Obsidian chips were also found on the 740 m northern top.",
  },
  miracapa: {
    overview:
      "A Department of Archaeology record names Miracapa east of Carolina and reports archaeological remains without describing them.",
    dates:
      "The cited source does not date the remains or the record.",
    fieldwork:
      "The cited source does not document a field visit, survey, or excavation at Miracapa.",
    discoveries:
      "Archaeological remains were reported, but their type and location are not specified.",
  },
  "conchagua-vieja": {
    overview:
      "A ridge site on northeastern Isla Conchagüita with numerous stone house mounds and the standing walls of a colonial church.",
    dates:
      "The church was in use by June 22, 1586. The other remains are undated; the report only describes some painted pottery as evidence of an earlier culture.",
    fieldwork:
      "Longyear visited and studied the site during the report’s fall–winter 1941–42 reconnaissance, describing visible ruins and surface artifacts. No controlled excavation is documented.",
    discoveries:
      "The report describes stone house mounds, church walls, a plaza with a cross-stand, and surface potsherds, metates, and obsidian blades. Sherds and obsidian were also visible in trail banks near the beach.",
  },
  "teca-conchaguita": {
    overview:
      "Teca is a reported site near the north shore of Isla Conchagüita. Longyear saw low terraces and stone mounds from a boat but did not visit the site.",
    dates:
      "The community was occupied in 1586; the cited source does not date the visible terraces and stone mounds.",
    fieldwork:
      "During his 1941–1942 reconnaissance, Longyear observed Teca from a boat and plotted it on a schematic island map. No excavation or surface collection is documented.",
    discoveries:
      "Several low terraces and poorly preserved stone mounds were visible in a cleared area. The source reports no artifacts.",
  },
  "el-carrizal-nueva-esparta": {
    overview:
      "A compiled site-list entry identifies El Carrizal with the town then called Nueva Esparta and reports artifacts there. The entry’s typography indicates that the locality was field-confirmed, but the record does not locate the finds within the town.",
    dates:
      "The artifacts are undated; the source does not document when they were found or examined.",
    fieldwork:
      "The source indicates that the locality was visited by Lothrop, Boggs, or Longyear, but does not identify which investigator, the date, or the method. No controlled excavation is documented.",
    discoveries:
      "Obsidian, greenstone, and pottery artifacts were reported. No quantities, forms, contexts, or associated architecture are described.",
  },
  yucuaiquin: {
    overview:
      "A potential archaeological locality somewhere in or around modern Yucuaiquín. An early report stated that the town stood over pre-Hispanic remains, and a later survey verified an unspecified archaeological find. The cited sources document no excavation or site boundary.",
    dates:
      "Pre-Hispanic, otherwise undated; reported by 1926 and field-checked in 2006–2008.",
    fieldwork:
      "No excavation is documented. Researchers reported the locality and later field-checked it, but the published sources provide no investigation details.",
    discoveries:
      "An unspecified portable archaeological find. No structures, pottery types, burials, or excavated deposits are described.",
  },
  "cueva-del-toro": {
    overview:
      "A painted rock shelter on the west side of the same ignimbrite massif as Gruta del Espíritu Santo. The 1996 study described about ten or fewer paintings, almost all human figures.",
    dates:
      "Undated. The author tentatively compared the paintings with those at Gruta del Espíritu Santo but did not establish their period.",
    fieldwork:
      "Researchers photographed the paintings and traced the four most visible examples in 1996. They also collected two flint flakes from the surface; no excavation is documented.",
    discoveries:
      "The paintings use shades of red ochre. Nearly all depict human figures, several with headdresses; one may combine human and bird features.",
  },
  "paredon-las-figuras": {
    overview:
      "A painted volcanic rock wall about 7 km north of Corinto. The published visit was brief, and the report calls for more detailed study.",
    dates:
      "Undated. The report does not assign the paintings to a period.",
    fieldwork:
      "During the 1996 regional project, the team made a short description and photographed the paintings; no excavation is documented.",
    discoveries:
      "Most paintings are human figures and red; the one identified animal is a red-and-white serpent. The paintings are more than 1 m in size and were in poor condition from natural erosion and nearby human activity.",
  },
  "abrigo-los-fierros": {
    overview:
      "A roughly triangular rock shelter in volcanic tuff documented by the Corinto regional study. It opens south, with most paintings on the east wall near the entrance.",
    dates:
      "Undated. The report suggests that the paintings probably predate the local introduction of cattle but does not assign them to an archaeological period.",
    fieldwork:
      "During the 1996 regional project, the team made a brief description and photographed the paintings; no excavation is documented.",
    discoveries:
      "Most images represent animals. The report identifies a red human figure, a yellow hand, a green monkey with yellow around it, two crabs, possible human-animal figures, signs, and red dots; green is the predominant color.",
  },
  "plan-de-la-montana": {
    overview:
      "A mainland archaeological site on the west side of the Gulf of Fonseca with at least 17 shell middens.",
    dates: "The source gives no occupational date.",
    fieldwork:
      "The cited synthesis documents the 2003 registration but does not describe the methods or report excavation.",
    discoveries:
      "At least 17 shell middens with ceramics and stone artifacts. The source gives no artifact types or contexts.",
  },
  "vividores-zacatillo": {
    overview:
      "A reported archaeological locality on Isla Zacatillo. A published synthesis identifies Vividores as having one shell midden.",
    dates:
      "Undated. The published passage does not assign Vividores to an archaeological period.",
    fieldwork:
      "The synthesis attributes the report to Esteban Gómez but gives no site-specific field method or visit date. The cited passage does not document excavation.",
    discoveries:
      "One shell midden is reported. The passage does not describe its contents, size, density, or function.",
  },
  "zacatillo-midden": {
    overview:
      "A published synthesis reports one unnamed archaeological site with a shell midden on Isla Zacatillo, separately from Vividores and Playitas.",
    dates:
      "Undated. The source does not assign the unnamed site to an archaeological period.",
    fieldwork:
      "The synthesis attributes the report to Esteban Gómez but gives no site-specific field method or visit date. No excavation is documented.",
    discoveries:
      "One shell midden is reported. The source does not describe its contents, size, density, function, or associated artifacts.",
  },
  "playitas-zacatillo": {
    overview:
      "A reported archaeological locality on Isla Zacatillo. A published synthesis identifies Playitas as having two shell middens.",
    dates:
      "Undated. The published passage does not assign Playitas to an archaeological period.",
    fieldwork:
      "The synthesis attributes the report to Esteban Gómez but gives no site-specific field method or visit date. The cited passage does not document excavation.",
    discoveries:
      "Two shell middens are reported. The passage does not describe their contents, size, density, or function.",
  },
  "laguna-meanguera": {
    overview:
      "A reported archaeological locality on Isla Meanguera. A published synthesis identifies Laguna as having one shell midden.",
    dates:
      "Undated. The published passage does not assign Laguna to an archaeological period.",
    fieldwork:
      "The synthesis attributes the report to Esteban Gómez but gives no site-specific field method or visit date. No excavation is documented.",
    discoveries:
      "One shell midden is reported. The source does not describe its contents, size, density, function, or associated artifacts.",
  },
  "isla-periquito": {
    overview:
      "A pre-Hispanic shell midden reported on Isla Periquito in the Gulf of Fonseca.",
    dates:
      "A 1983 map labels El Periquito as Classic, but it does not explain the dating evidence.",
    fieldwork:
      "A published synthesis links the record to a 1978 Pacific-coast survey but gives no site-specific method. No excavation is documented.",
    discoveries:
      "Only a pre-Hispanic shell midden is reported. The sources do not describe its contents, size, associated artifacts, or function.",
  },
  "el-rico-manzanilla": {
    overview:
      "Two shell middens were identified in the El Rico area; the source places one in Estero Manzanilla.",
    dates:
      "The article discusses them among pre-Hispanic shell-midden precedents but gives no site-specific dating evidence.",
    fieldwork:
      "Fabio Amador identified the two middens during an archaeological reconnaissance in July 2000. No excavation is documented.",
    discoveries:
      "The source reports only the two shell middens. It does not describe their deposits, contents, size, or associated artifacts.",
  },
  "atalaya-acajutla": {
    overview: "Atalaya is a coastal Sonsonate find locality whose ceramic material was compared with the Atiquizaya complex. The published local evidence is preliminary and does not define the site’s size or boundaries.",
    dates: "Haberland tentatively placed the Atiquizaya complex around 1000–700 BCE and suggested that Atalaya belonged to the same time level.",
    fieldwork: "Haberland’s 1953–1954 and 1958 surveys collected surface material at about 150 localities and sometimes dug non-stratigraphic tests, but the article does not say which work was done at Atalaya.",
    discoveries: "Atalaya shared some material and decorative traits with the Atiquizaya complex but lacked others, including extensive grooving. The article provides no Atalaya-specific artifact inventory.",
  },
  "atiquizaya-haberland": {
    overview: "An excavated site near Atiquizaya defined an early ceramic complex for western El Salvador. The published map marks only the town-scale locality, and the excavation parcel is unknown.",
    dates: "Haberland tentatively dated the Atiquizaya complex to about 1000–700 BCE, within the Middle Preclassic.",
    fieldwork: "A later review reports excavation near Atiquizaya. Haberland’s synthesis identifies 1958 as the latest field season but does not say whether work at this site used surface collection, a test trench, or a pit.",
    discoveries: "Reported ceramic finds include spouts with oval openings, figurines with movable arms, and one decorated bowl-rim sherd. Haberland interpreted the bowl sherd as an import related to the Providencia phase of highland Guatemala.",
  },
  "barra-ciega": {
    overview: "Barra Ciega is a ceramic find locality east of Acajutla. Its surface collection contained material assigned to more than one period.",
    dates: "Sources assign material to the Middle Preclassic Atiquizaya complex and the Postclassic Cihuatán phase, but no stratified chronology was established.",
    fieldwork: "A mixed surface collection was studied; no excavation at Barra Ciega is documented. Agricultural disturbance prevented a secure reading of the deposits.",
    discoveries: "The sources report pottery similar to the Atiquizaya complex and sherds assigned to the Cihuatán phase, but give no site-specific artifact inventory.",
  },
  "penate": {
    overview: "A Postclassic neighborhood within greater Chalchuapa, composed of thirteen elongated platforms and one circular structure.",
    dates: "Most strongly associated with the Postclassic, particularly the later occupation of Chalchuapa; investigated in 1969.",
    fieldwork: "Sharer’s project mapped the platform group and partially excavated Structures C1-8 and C1-9.",
    discoveries: "The excavated platforms had two stone-and-earth terraces with vertical slab facings, showing substantial architecture outside the protected monumental parks.",
  },
  "laguna-cuzcachapa": {
    overview: "A volcanic crater lake embedded within ancient Chalchuapa, where settlement, water access and ritual activity developed together.",
    dates: "Occupation began early in the Preclassic and continued through later parts of Chalchuapa’s history.",
    fieldwork: "The University of Pennsylvania project excavated cultural deposits in 1969 and returned for limited work in 1970.",
    discoveries: "Stratified ceramics and lakeshore deposits supplied one of Chalchuapa’s longest sequences and helped establish how early settlement expanded around a dependable water source.",
  },
  "laguna-seca-chalchuapa": {
    overview: "A low residential landscape around a former crater immediately east of Tazumal, part of Chalchuapa’s continuous settlement rather than a separate ceremonial center.",
    dates: "Material spans multiple periods of Chalchuapa’s occupation.",
    fieldwork: "The Pennsylvania project conducted limited excavation in 1970 and catalogued platforms and deposits across the area.",
    discoveries: "House-platform remains and ceramics demonstrated that dense residential occupation linked the better-known monumental groups.",
  },
  "las-victorias-chalchuapa": {
    overview: "An extensive residential sector of Chalchuapa that once continued southward past Laguna Cuzcachapa toward Laguna Seca.",
    dates: "Evidence extends from the Preclassic into the Postclassic.",
    fieldwork: "National and Pennsylvania teams explored the group; the 1969 project excavated deposits and mapped a landscape of more than ninety residential platforms.",
    discoveries: "Low house platforms, ceramics and the well-known Las Victorias carved stone show that ordinary residences and public symbolism occupied the same broad urban landscape.",
  },
  "cementerio-jardin": {
    overview: "A salvage-excavated locality about 700 m southeast of the main Tazumal group.",
    dates: "Surface material includes Late Preclassic, Late Classic and Early Postclassic remains; the excavated building belongs to the Early Postclassic component.",
    fieldwork: "In 1985, a salvage project used test-unit transects and then exposed 80 m² around stone-and-adobe remains. Parts of the building remained unexcavated.",
    discoveries: "The excavation exposed a multiroom building with floors and burned debris, along with ceramic vessels and censers, a greenstone plaque, a ceramic flute and obsidian artifacts. Its function remains unknown.",
  },
  "vergeles-del-eden": {
    overview: "An archaeological test at the Vergeles del Edén cemetery identified a pre-Hispanic construction and obsidian-working debris.",
    dates: "A later summary treats the structure as contemporary with Early Postclassic remains elsewhere in Chalchuapa, but reports no direct or absolute date from this test.",
    fieldwork: "In 1995, Fabio Amador conducted an archaeological test. The available summary does not give its dimensions, location within the cemetery, or stratigraphy.",
    discoveries: "The test exposed a rectilinear construction of stone rows with earth mortar, abundant obsidian debitage, and many projectile points. The original investigator tentatively interpreted the finds as evidence of tool production.",
  },
  "finca-rosita": {
    overview: "A major Preclassic center beneath modern Santa Ana, organized around two plazas and large earthen pyramids.",
    dates: "Middle–Late Preclassic, abandoned before or around the early centuries CE; first registered in 1983.",
    fieldwork: "Salvage and systematic field projects in the late 1990s and early 2000s mapped the ceremonial core and recovered controlled ceramic samples.",
    discoveries: "Six principal structures include a roughly thirteen-metre-high pyramid and another about ten metres high, demonstrating a substantial center independent of nearby Chalchuapa.",
  },
  "san-diego-guija": {
    overview: "A group of at least ten low mounds lay around the Santa Ana–Metapán highway near Hacienda San Diego.",
    dates: "Pre-Hispanic, otherwise undated.",
    fieldwork: "Longyear documented and mapped the mound group during his 1941–1942 expedition. Earlier small excavations had cut into Mounds 1 and 10, but the report does not identify who conducted them or how.",
    discoveries: "Exposed areas showed boulders set in adobe mortar. Five complete pottery vessels, several manos, and one carved stone object were reported; one polychrome bowl was apparently associated with a burial.",
  },
  "igualtepeque": {
    overview: "Igualtepeque occupies a Lake Güija peninsula that becomes an island at high water. Published surveys describe architecture across the peninsula and more than 200 shoreline rock carvings.",
    dates: "The architecture is assigned to the Guazapa phase (900–1200 CE). Many carvings have been related to a Nahua-Pipil occupation, but the carvings have not been directly dated.",
    fieldwork: "A 1942 survey mapped the architecture and recorded at least 200 carvings. The west side of Mound 1 had already been partly exposed, but no controlled excavation is documented; a 2013 team inventoried the rock carvings.",
    discoveries: "Reports describe two mounds in a walled plaza, approach terraces, a stair, pottery, worked-stone fragments, and carvings of human, animal, and geometric forms.",
  },
  "el-zonte-burials": {
    overview: "Two burials were reported from a private beachfront parcel at El Zonte. The source describes Burial 1’s later osteological analysis but supplies little detail about Burial 2.",
    dates: "Burial 1 is tentatively dated to the Late Classic (600–900 CE) through associated material. The cited source does not date Burial 2.",
    fieldwork: "Burial 1 was found accidentally and lost its original archaeological context. In 1998 Roberto Gallardo archaeologically excavated Burial 2, but the cited source does not describe the excavation method.",
    discoveries: "The later study identifies Burial 1 as a young adult man with bilobed cranial modification, dental disease, and Schmorl’s nodes. The cited source does not describe Burial 2’s remains or associated finds.",
  },
  "el-chahuite": {
    overview: "A 2016 article lists El Chahuite as an archaeological site in the Zapotitán Valley. It provides no site description or boundary.",
    dates: "The article gives no occupation date. Its bibliography cites a 2001 thesis about ceramics associated with times before and after the San Andrés/Boquerón volcanic deposit.",
    fieldwork: "The thesis title indicates ceramic analysis, but the article does not describe excavation, collection, or stratigraphy at El Chahuite.",
    discoveries: "The cited article describes no site-specific structures, artifacts, burials, or other finds.",
  },
  "san-luis-chalchuapa": {
    overview: "A newly defined component of the Chalchuapa archaeological zone, investigated where modern development threatened buried occupation.",
    dates: "Materials represent more than one period in Chalchuapa’s three-thousand-year sequence; the reported project was conducted by 2015.",
    fieldwork: "The project divided the tract into four sectors and opened at least 67 planned 2 × 1 metre pits, with additional extensions around cultural features.",
    discoveries: "Buried deposits and features expanded the recognized Chalchuapa zone beyond the ten better-known areas and demonstrated archaeological survival under undeveloped parcels.",
  },
  "amulunga": {
    overview: "A published overview lists Amulunga among the archaeological sites of the Chalchuapa zone but provides no site description.",
    dates: "The cited source does not assign Amulunga to a period.",
    fieldwork: "No Amulunga-specific investigation is documented in the cited source.",
    discoveries: "The cited source does not describe any remains or finds from Amulunga.",
  },
  "rio-pampe": {
    overview: "A heavily damaged archaeological group on the south bank of the Río Pampe, recorded on Finca San Marcos and nearby land.",
    dates: "Pre-Hispanic, otherwise undated in the cited sources.",
    fieldwork: "Longyear documented the group during a 1941–1942 reconnaissance expedition. No Pampe-specific excavation or testing is documented in the cited sources.",
    discoveries: "The report describes a rectangular terraced base, two plazas with stone walls, adobe-and-scoria construction, and surface pottery sherds.",
  },
  "el-caballito": {
    overview: "A ten-mound archaeological site on top of Loma El Caballito, about 500 m above sea level, in Teotepeque.",
    dates: "The cited synthesis includes El Caballito among Early Postclassic sites (800–1200 CE), but it presents no site-specific dating evidence.",
    fieldwork: "The Costa del Bálsamo project reported discovering the site in 2012. The cited article maps the locality and models least-cost routes; it reports no excavation.",
    discoveries: "The source describes four mounds around one small plaza and six more mounds in pairs forming at least three small plazas. It also notes a burned patch, but says its age and cause are uncertain.",
  },
  "texisio": {
    overview: "A three-mound archaeological site on the upper part of Cerro Texisio, about 281 m above sea level, in Teotepeque.",
    dates: "The cited synthesis includes Texisio among Early Postclassic sites (800–1200 CE), but it presents no site-specific dating evidence.",
    fieldwork: "The Costa del Bálsamo project reported discovering the site in 2012. The cited article maps the locality and models least-cost routes; it reports no excavation.",
    discoveries: "The source describes three mounds forming a small plaza. It provides no artifact inventory.",
  },
  "cerro-de-ulata": {
    overview: "Cerro de Ulata is a surveyed mound settlement in Teotepeque, divided into eastern and western groups along two north–south ridge axes.",
    dates: "The Izalco Project attributed the site to the Guazapa phase of the Early Postclassic from its settlement pattern and ceramics.",
    fieldwork: "The Izalco Project first described and mapped the site in 1988. A later study modeled routes and visibility; no controlled excavation is documented.",
    discoveries: "The survey recorded at least 25 mounds: at least 11 in the eastern group and 14 in the western group, with several small plazas. A later photograph documents a looters’ trench through the main pyramid.",
  },
  "jicalapa-site": {
    overview: "Jicalapa is a ridge-top archaeological site south of the modern town, with structures divided among three terrace groups.",
    dates: "The article discusses Jicalapa within an Early Postclassic (800–1200 CE) regional study, but gives no site-specific dating evidence.",
    fieldwork: "The Costa del Bálsamo project discovered the site in 2010 and documented its surface architecture. A later study modeled possible routes; no controlled excavation is documented.",
    discoveries: "The account records 18 structures, including 15 mostly low mounds, as well as some rectangular platform edges and stone alignments. One mound is associated with a rock bearing a concave depression.",
  },
  "letrero-del-diablo": {
    overview: "El Letrero del Diablo is a petroglyph site on a rock wall beside Quebrada Iscacuyo, also called El Cacao, in Jicalapa municipality.",
    dates: "The source discusses the site within an Early Postclassic (800–1200 CE) regional study, but gives no independent date for the carvings.",
    fieldwork: "The project photographed all reported petroglyphs with a GigaPan system and assembled a digital panoramic mosaic. No controlled excavation is documented.",
    discoveries: "The 50 × 8.5 m wall has a west-facing carved area measuring 10 × 2.7 m, with mostly geometric designs and fewer anthropomorphic and zoomorphic figures; the source interprets one carving as a stylized Tláloc. It also reports damage from chalk and red and white oil paint.",
  },
  "el-letrero-chiltiupan": {
    overview: "El Letrero is a petroglyph site on Finca Guadalupe Arriba in Chiltiupán, near the confluence of the Pájaro León and El Zonte rivers.",
    dates: "The article discusses the site within an Early Postclassic (800–1200 CE) regional study, but gives no independent date for the carvings.",
    fieldwork: "The Costa del Bálsamo project discovered the site, registered a nearby platform, and photographed the carvings digitally. No controlled excavation is documented, and the source does not date this work.",
    discoveries: "The 15 × 12 m rock has an east-facing carved area measuring 3 × 2 m, with circles, spirals, cupules, and fewer human and animal figures; the source interprets one carving as a stylized Tláloc. A small rectangular platform was recorded about 200 m north, but its use is not established.",
  },
  "zinacantan-cinacantan": {
    overview: "Zinacantan is a mapped mound settlement on Cerro Pueblo Viejo in Tamanique. The 2007 survey identifies nearby Cerro Redondo as the probable peñol described in accounts of the 1538 battle, but that identification is not certain.",
    dates: "Ceramics suggest a likely Late Postclassic occupation, while a longer span from the Early through Late Postclassic remains possible; documents place a battle at Cinacantan in 1538 and the community under encomienda in 1548.",
    fieldwork: "Fowler discovered the site in 1989; Fowler, Gallardo, and Hamilton later registered it. Hamilton georeferenced and mapped three sectors with a total station in 2001–2002, and PAHES registered the historical site during its 2007 field season.",
    discoveries: "Hamilton mapped 26 mounds in three sectors, including at least seven small plazas; a low wall bounds the southern sector. No controlled excavation is documented in these sources.",
  },
  "miramar-tamanique": {
    overview: "Miramar is a fourteen-mound archaeological site on a high, narrow part of Loma El Cabro in Tamanique's Cooperativa Acahuaspán.",
    dates: "The cited synthesis includes Miramar in a regional Early Postclassic study (800–1200 CE), but it presents no site-specific dating evidence.",
    fieldwork: "The article illustrates Miramar with a LiDAR image, maps it regionally, and models least-cost routes. It does not state when the site was recorded or document excavation.",
    discoveries: "The source describes mounds 1–2 m high: five apparently form a small plaza at the southeast end, while the others are aligned northwest–southeast along the narrow plateau. It cautiously suggests that some structures may have served as observation points.",
  },
  "el-panteoncito": {
    overview: "El Panteoncito is a 35-structure site on the upper, northern sector of Loma El Cabro in Cooperativa San Isidro, Tamanique. The source divides its mounds into seven groups along two intersecting ridge axes.",
    dates: "The article treats El Panteoncito within an Early Postclassic (800–1200 CE) regional study, but it presents no site-specific dating evidence.",
    fieldwork: "The publication maps the site regionally, describes its mound groups, and uses GIS to model routes from four departure points. It does not document controlled excavation or state when the site was recorded.",
    discoveries: "The source reports 35 structures in seven mound groups, including several small plazas and three isolated mounds. Groups C, F, and G include a low circular platform west of the mounds.",
  },
  "isla-el-cajete": {
    overview: "An archaeological site occupies dry ground on Isla El Cajete in the Barra de Santiago mangroves. The 1983 report describes visible mounds, including one formal plaza, across the island’s western half.",
    dates: "Most collected ceramics were tentatively associated with the Early Postclassic Guazapa complex, then dated about 900–1200 CE; the report allows later occupation and notes sparse possible Late Classic evidence.",
    fieldwork: "In 1983, investigators sketched visible mounds with a compass and tape and collected surface pottery and obsidian. The report documents no controlled excavation.",
    discoveries: "The report records rectangular earthen mounds, some faced with cut talpuja blocks and stucco, plus pottery, obsidian blades and cores, manos, and tripod metates.",
  },
  "isla-teopan-coatepeque": {
    overview: "Construction near the shore of Isla Teopán exposed an archaeological deposit and a monumental potbelly sculpture in early 1996.",
    dates: "Surface ceramics and other reported finds support a Late Preclassic date for the site.",
    fieldwork: "An inspection identified Chul- and Caynac-complex sherds on the surface after construction exposed the deposit. The article documents no controlled excavation and gives only limited context for the sculpture.",
    discoveries: "The report lists the sculpture, four mushroom stones, Bolinas figurines, and ceramics. Amaroli identified the sculpture as a woman and proposed that potbelly sculptures represented pregnant women.",
  },
  "piedra-sellada": {
    overview: "Piedra Sellada is a large engraved boulder at the bottom of the Río Guayapa valley in El Imposible National Park.",
    dates: "The available source does not date the carvings. Investigators visited the boulder in November 2007.",
    fieldwork: "The 2007 visit examined the boulder and its immediate surroundings, and Philippe Costa drew the petroglyphs from digital photographs. The authors state that they did not conduct reconnaissance because the visit was brief and informal; no excavation is documented.",
    discoveries: "The source confirms petroglyphs on the boulder but does not describe individual motifs on the available page.",
  },
  "azacualpa-guija": {
    overview: "Azacualpa is a three-group mound complex on a flat bluff above the northeast shore of Lake Güija.",
    dates: "The report does not date the site. Longyear documented it during his 1941–1942 expedition.",
    fieldwork: "Longyear mapped the three groups. He reported no excavation in Groups I or II and earlier holes in the east and west sides of Group III’s Mound 8; no controlled excavation is documented.",
    discoveries: "The maps and text record a plaza, mounds, and low platforms. Group III’s mounds had volcanic-stone terrace walls over boulder-and-adobe cores, and Mound 8 retained part of a lime-plaster floor.",
  },
  "el-congo-el-bigote": {
    overview: "Seven mounds, locally called the Siete Príncipes, extended west for about 2.5 km from near the El Congo railroad station.",
    dates: "The report provides no occupation date or cultural assignment.",
    fieldwork: "A May 1942 visit documented the mounds’ positions and some dimensions. An earlier opening into one mound exposed adobe construction, but the report does not identify who made it or document a controlled excavation.",
    discoveries: "The report describes seven mounds and adobe construction exposed by the earlier opening. A monumental stone head kept near the railroad station was said to come from the town’s outskirts, but its exact findspot and relationship to the mound group were unknown.",
  },
  "isla-teotipa-guija": {
    overview: "Teotipa, also called Tipa Adentro, is a small island in Lake Güija where pottery and stone objects had been reported by 1944.",
    dates: "The report gives no occupation date or cultural assignment.",
    fieldwork: "The report does not document a visit, survey, or excavation on Teotipa; it relays earlier reports of objects from the island.",
    discoveries: "Pottery and stone objects were reported without descriptions or findspots. Reported indications of ruins concerned the nearby Tipa Afuera peninsula, not Teotipa itself.",
  },
  "finca-potosi": {
    overview: "A broad find locality on Finca Potosí, where a report lists pottery vessels, figurines, stone objects and pictographs.",
    dates: "Undated; the report gives no period or cultural assignment.",
    fieldwork: "The report records objects found at various places on the finca and pictographs observed in a deep ravine. It documents no excavation or bounded survey.",
    discoveries: "Pottery vessels, figurines and stone objects were reported; the ravine pictographs were said to resemble those on Igualtepeque Island.",
  },
  "santa-teresa-santa-ana": {
    overview: "About twelve mounds were recorded in the coffee plantation at Finca Santa Teresa, including one described as among El Salvador’s largest.",
    dates: "The report gives no occupation date or cultural assignment.",
    fieldwork: "Boggs’s 1940–1942 western field surveys included a visit to Santa Teresa, but the exact year is not stated. The report explicitly says no excavation had been done.",
    discoveries: "Surface finds included figurine fragments and sculptured stone heads. An eroded mound section indicated adobe construction.",
  },
  "texistepeque-group-1": {
    overview: "A reported mound group north of Texistepeque and east of the highway to Metapán.",
    dates: "Undated; the report gives no occupation date or cultural assignment.",
    fieldwork: "The western reconnaissance records a visit sometime in 1940–1942 and describes the group, but gives no site-specific visit date or field methods.",
    discoveries: "About ten mounds were reported, including three about 15 m square and 5.5 m high. None appeared to have been excavated.",
  },
  "texistepeque-group-2": {
    overview: "A reported mound group about 2 km south of Texistepeque, east of the highway to Metapán.",
    dates: "Undated; the report gives no occupation date or cultural assignment.",
    fieldwork: "The western survey visited and described the group sometime in 1940–1942, but gives no site-specific visit date or field methods.",
    discoveries: "Five or six mounds were reported. Mounds 1 and 2 were about 5.5–6 m high; a small house stood on Mound 1, but the rest of the site appeared undisturbed.",
  },
  "copapayo": {
    overview: "Three mounds were recorded in a cleared field near the former Copapayo railroad station and Santa Tecla–Sonsonate highway.",
    dates: "Undated; the report gives no occupation date or cultural assignment.",
    fieldwork: "Boggs’s western survey visited and described Copapayo sometime in 1940–1942, but gives no site-specific visit date or field methods. The report includes a sketch map; no controlled excavation is documented.",
    discoveries: "The report records three mounds, one fairly large, and numerous potsherds on the surrounding surface.",
  },
  "los-lagartos-miahuacan": {
    overview: "At least nine mounds and several smaller rises were recorded around Río Los Lagartos. Their identification with conquest-era Miahuacan or Mahuaclan is tentative.",
    dates: "Undated; the report gives no occupation date or cultural assignment.",
    fieldwork: "Boggs’s western survey visited, described, and sketch-mapped Los Lagartos sometime in 1940–1942. No controlled excavation is documented.",
    discoveries: "The two tallest mounds were about 6–7 m high. Long cultivation had turned up much pottery, but no construction was exposed.",
  },
  "atapasco": {
    overview: "Atapasco is the surveyed remains of a historic hacienda and water-powered ironworks about 2 km north of Quezaltepeque.",
    dates: "The registration form assigns the remains to the seventeenth and eighteenth centuries. Documentary context mentions a Dominican ironworks at Atapasco in 1746, but does not date individual structures.",
    fieldwork: "PAHES registered the site on November 1, 2007, with coordinates, a plan and photographs. No controlled excavation is documented.",
    discoveries: "The report describes foundations, walls, retaining walls, channels, columns, water-drop and holding basins, wall niches, and other hydraulic features interpreted as parts of the former ironworks.",
  },
  "san-miguel-ingenio": {
    overview: "San Miguel Ingenio preserves the surveyed remains of a water-powered ironworks about 10 km east of Metapán.",
    dates: "Documentary evidence cautiously suggests operation from the last quarter of the eighteenth century, with continuity into the late nineteenth century.",
    fieldwork: "PAHES recorded the site during its August–December 2007 field phase, publishing a coordinate and describing the standing remains. No controlled excavation is documented.",
    discoveries: "The report describes foundations, walls, retaining walls, channels, columns, water-drop and holding basins, and wall niches. Modern houses had been built over some older structures.",
  },
  "ingenio-el-rosario-metapan": {
    overview: "El Rosario is a surveyed water-powered ironworks complex 7.5 km east of Metapán, with a surviving hacienda house.",
    dates: "Operation is documented in 1858–1861; a possible eighteenth-century history remains unresolved.",
    fieldwork: "PAHES visited and documented El Rosario during its August–December 2007 field phase, publishing a coordinate and description. The report does not specify site-specific methods and documents no controlled excavation.",
    discoveries: "The report describes a main water channel and basin, foundations, walls, retaining walls, columns, water-control features, and wall niches, along with the hacienda house. Río El Rosario lies about 20 m south of the recorded remains.",
  },
  "ingenio-santa-gertrudis": {
    overview: "Santa Gertrudis preserves the surveyed remains of a water-powered ironworks and an associated hacienda house about 8.5 km southeast of Metapán.",
    dates: "The ironworks was documented as operating in 1768. An 1807 inventory listed the ironworks and hacienda, but the report says its operating status then is uncertain.",
    fieldwork: "PAHES visited Santa Gertrudis during its August–December 2007 field phase and published a coordinate and description. The report does not identify site-specific methods and documents no controlled excavation.",
    discoveries: "The report describes a main water channel and basin, foundations, walls, retaining walls, other water-control channels, wall niches, and the hacienda house. It calls the remains badly damaged.",
  },
  "ostua": {
    overview: "Ostúa preserves the facade of a colonial church and the base of an atrial cross about 20 m west.",
    dates: "The report presents 1733 earthquake damage and flooding between 1734 and 1740 as unresolved explanations for the town's abandonment.",
    fieldwork: "PAHES visited and registered Ostúa during its August–December 2007 field phase; the report does not identify which project methods were used at this site.",
    discoveries: "The report documents the church facade and atrial-cross base; further wall foundations nearby are described only as probable.",
  },
  "santa-maria-magdalena-tacuba": {
    overview: "Santa María Magdalena de Tacuba is a ruined colonial church facing Tacuba’s central park.",
    dates: "The report says the first church was built about 1705, was furnished by 1769, and collapsed in the 1773 Santa Marta earthquake.",
    fieldwork: "PAHES visited and registered the ruins during its August–December 2007 field phase. The report publishes a coordinate and description but does not identify which project methods were used at this site.",
    discoveries: "The report records surviving lateral walls and the former sacristy and baptistery rooms.",
  },
  "beneficio-rio-claro": {
    overview: "A surveyed historic coffee mill on Finca Río Claro, about 2 km north of Quezaltepeque.",
    dates: "The report associates the complex with coffee production from the late nineteenth century through the time of the 2007 survey; it does not date individual features.",
    fieldwork: "PAHES visited and documented Río Claro during its August–December 2007 field phase. The report lists project-wide methods but does not say which were used here, and it documents no controlled excavation.",
    discoveries: "The report describes a coffee-mill structure with machinery, basins, channels, drying patios, and administrative structures. Its historical discussion attributes turbine-powered wet processing to Río Claro, but does not establish that the early equipment survives.",
  },
  "ingenio-san-francisco-paula": {
    overview: "A northern Metapán ironworks also known as El Brujo, part of the district’s colonial furnace network.",
    dates: "Colonial, with later rural reuse of the landscape.",
    fieldwork: "The second PAHES phase located, photographed, measured and historically contextualized the industrial remains.",
    discoveries: "Ruined furnace and hydraulic components add another production center to the unusually concentrated Metapán iron industry.",
  },
  "ingenio-el-carmen-metapan": {
    overview: "A water-powered ironworks north of Metapán whose surviving walls supported a detailed reconstruction of the production building.",
    dates: "Colonial iron industry.",
    fieldwork: "Researchers combined measured architecture, comparison with Iberian ironworks and digital three-dimensional reconstruction.",
    discoveries: "The building plan clarifies how furnace, water power, work areas and roofed industrial space operated as one mechanical system.",
  },
  "ingenio-san-rafael-metapan": {
    overview: "Another component of the Metapán ironworking district, located east of town in the San Rafael canton.",
    dates: "Colonial.",
    fieldwork: "PAHES registered surviving architecture and compared it with the better-preserved regional ironworks.",
    discoveries: "Industrial masonry and landscape position expand the mapped production network beyond the three first-phase furnaces.",
  },
  "antigua-iglesia-guaymango": {
    overview: "The archaeological remains of Guaymango’s earlier colonial church within the modern town.",
    dates: "Colonial.",
    fieldwork: "The second PAHES campaign identified and architecturally documented the historic church location.",
    discoveries: "Buried and standing construction traces preserve an earlier phase of the town’s ecclesiastical landscape.",
  },
  "antiguo-nejapa-la-fuente": {
    overview: "A candidate location for old Nejapa in the Río Sucio landscape, abandoned after the 1658 El Playón eruption disrupted the settlement.",
    dates: "Colonial, especially the sixteenth and seventeenth centuries.",
    fieldwork: "Archaeologists combined pedestrian survey with geophysical testing to look for buried settlement remains.",
    discoveries: "Surface and subsurface anomalies support a buried colonial community near the old water source, although the town plan remains incomplete.",
  },
  "chuchucato": {
    overview: "A large Zapotitán Valley site threatened by subdivision, centered on a broad platform supporting a pyramid.",
    dates: "Pre-Hispanic; the available corpus does not securely narrow the occupation beyond the valley’s Classic–Postclassic sequence.",
    fieldwork: "FUNDAR documented and denounced development impacts in 2009; the accessible sources do not describe a broad controlled excavation.",
    discoveries: "A monumental platform, pyramid and additional mound demonstrate a substantial center outside the protected San Andrés park.",
  },
  "shuteca": {
    overview: "A Late Classic residential site beside the Shuteca River, partly destroyed when a municipal recreation center was built.",
    dates: "Late Classic, approximately 600–900 CE; recorded in 2007.",
    fieldwork: "FUNDAR recorded exposed remains and notified the national archaeology authority that salvage investigation was needed.",
    discoveries: "Domestic occupation debris survived beside the construction damage, showing that the Sonsonate urban landscape overlays ordinary Classic-period households as well as monumental centers.",
  },
  "finca-san-jorge-las-aradas": {
    overview: "Two related Santa Ana survey areas studied to compare how pre-Hispanic communities distributed architecture across the interior valley.",
    dates: "Pre-Hispanic, with ceramics used to distinguish occupation phases; project fieldwork was reported in 2011.",
    fieldwork: "Researchers mapped topography and archaeological features, collected surface material and compared settlement patterns between San Jorge and Las Aradas.",
    discoveries: "Mounds, artifact scatters and terrain relationships show settlement extending well beyond Santa Ana’s best-known monumental sites.",
  },
  "san-benito-ahuachapan-survey": {
    overview: "One of the named archaeological localities revisited or registered during the 2007 survey of southern Ahuachapán’s coastal plain.",
    dates: "Preclassic material was the survey’s principal concern; visited in 2007.",
    fieldwork: "Pedestrian reconnaissance and GPS recording placed the site within a network of early coastal settlements.",
    discoveries: "Surface artifacts contributed to the comparison of Atalaya with settlements extending west toward the Guatemalan frontier; the cited summary gives no excavation inventory.",
  },
  "el-mapache-ahuachapan": {
    overview: "A newly registered site from the 2007 reconnaissance of the southern Ahuachapán coastal plain.",
    dates: "Preclassic survey context; recorded in 2007.",
    fieldwork: "Surveyors identified surface cultural material and registered the locality by GPS.",
    discoveries: "The site added another point to the dense early-settlement network surrounding Atalaya, although no controlled excavation is summarized.",
  },
  "el-escondido-ahuachapan": {
    overview: "A named archaeological locality newly registered during the 2007 southern Ahuachapán survey.",
    dates: "Preclassic survey context; recorded in 2007.",
    fieldwork: "Pedestrian reconnaissance located and registered surface material.",
    discoveries: "The occurrence helped demonstrate that early settlement was distributed across the coastal plain rather than concentrated only at Cara Sucia and Atalaya.",
  },
  "el-poeta-campesino": {
    overview: "One of five sites newly registered by the 2007 reconnaissance program south of the Apaneca highlands.",
    dates: "Preclassic survey context; recorded in 2007.",
    fieldwork: "Surveyors walked the coastal plain and documented surface artifacts with GPS.",
    discoveries: "Its material became part of the regional comparison used to place Atalaya within a broader early farming and foraging landscape.",
  },
  "tres-cerritos-nueva-york": {
    overview: "A three-mound locality registered in the Nueva York cooperative landscape west of Atalaya.",
    dates: "Preclassic survey context; recorded in 2007.",
    fieldwork: "The reconnaissance program identified the mound cluster and registered its surface material.",
    discoveries: "Three low elevations and associated artifacts supplied a settlement-form comparison with the larger coastal centers.",
  },
  "la-palma-ahuachapan-survey": {
    overview: "A previously known site revisited during the 2007 survey between the Pacific plain and the Apaneca foothills.",
    dates: "Preclassic survey context; revisited in 2007.",
    fieldwork: "Pedestrian survey and surface recording linked the locality to the new coastal-site inventory.",
    discoveries: "Surface artifacts helped bridge early settlements on the plain with those on the first highland slopes.",
  },
  "el-molino-burials": {
    overview: "A 1985 registration card reports archaeological material and possible burials in eastern Santa Ana near Cerro Tecana.",
    dates: "The card tentatively assigns the material to the Middle Preclassic.",
    fieldwork: "The evidence survives as a registration-card entry summarized in a later publication. No controlled excavation is documented.",
    discoveries: "The card reports ceramic fragments, figurines, six or eight burials, metates, and manos in a 50 × 50 m area up to 2 m deep. The publication warns that card reports are unverified and that reported bones may not have been human.",
  },
  "aguachapio-burial": {
    overview: "A registration card lists Aguachapio in Jujutla and reports at least three low mounds and a possible burial.",
    dates: "The card assigns the locality to the Late Preclassic and is dated February 24, 1986.",
    fieldwork: "The publication reproduces a registration-card summary; it does not document controlled excavation.",
    discoveries: "Reported finds include pottery, a plano-convex handstone and obsidian. The publication warns that these card records are not independently verified.",
  },
  "nueva-york-burial": {
    overview: "A 1986 registration card lists Nueva York in Jujutla and reports a burial.",
    dates: "The card labels the burial Classic period; it gives no narrower date.",
    fieldwork: "The evidence survives as a registration-card entry summarized in a later publication. No controlled excavation is documented.",
    discoveries: "The card reports only a Classic-period burial. It does not describe the context, body treatment or associated objects, and the publication warns that card reports are not independently verified.",
  },
  "tacachol-burial": {
    overview: "A 1986 registration card lists Tacachol in Jujutla and reports a three-metre-high T-shaped elevation damaged by intensive looting.",
    dates: "The card assigns the locality to the Late Preclassic and is dated February 24, 1986.",
    fieldwork: "The evidence survives as a registration-card entry summarized in a later publication. No controlled excavation is documented.",
    discoveries: "The card reports bone fragments, shovel-shaped teeth, pottery, grinding-stone fragments, obsidian and mollusc remains. The publication warns that such card reports are not independently verified and that not all reported bones were osteologically analyzed.",
  },
  "la-caseta-burial": {
    overview: "A 1986 registration card lists La Caseta in San Francisco Menéndez and reports two four-metre mounds and a funerary urn.",
    dates: "The card assigns material to the Late Preclassic and Late Classic and is dated February 24, 1986.",
    fieldwork: "The evidence survives as a registration-card entry summarized in a later publication. No controlled excavation is documented.",
    discoveries: "The card reports a lidded urn with an individual's remains, some vessels and copper bells, and says the area was looted around 1980–1982. The publication warns that such card reports are not independently verified and that many reported bones were not osteologically analyzed.",
  },
  "cangrejera-burials": {
    overview: "A 1975 archaeology-department card lists Cangrejera in San Juan Opico.",
    dates: "The card reports Middle and Late Preclassic ceramics and is dated January 14, 1975.",
    fieldwork: "The evidence survives as a registration-card entry summarized in a later publication. No controlled excavation or osteological analysis is documented.",
    discoveries: "The card reports 46 skeletons, three mounds and five use floors in Mound 1, with burials mainly between floors 3 and 4. It also lists ceramics, domestic metates and jadeite but says the artifacts were not associated with the burials; the publication warns that card reports are not independently verified.",
  },
  "san-diego-sonsonate-burials": {
    overview: "A sparse archaeology-department card names San Diego and reports burials excavated in 1960. The published table gives no location.",
    dates: "The table gives no archaeological period. It dates the card only to the 1980s and reports excavation in 1960.",
    fieldwork: "The evidence survives as a registration-card entry recorded by Manuel López and reproduced in a later publication. No excavation method or field report is documented.",
    discoveries: "The card reports burials but gives no count, context, body treatment or associated objects. The publication warns that registration-card reports are not independently verified.",
  },
  "la-joya-singuil": {
    overview: "A published table preserves an archaeology-department registration-card entry named La Joya (Singüil) in Santa Ana.",
    dates: "Unknown; the entry supplies neither a cultural period nor an investigation date.",
    fieldwork: "The evidence is limited to an archival table entry. No fieldwork method or reproducible location is published.",
    discoveries: "No finds are described for this entry.",
  },
  "bolinas-1": {
    overview: "Finca Bolinas was a private ranch about 6 km south of Chalchuapa where 95 clay figurines were reportedly found around the mid-twentieth century. An archival registration-card entry named Bolinas 1 may refer to the same locality, but the sources do not prove that identification.",
    dates: "The figurine type is associated regionally with the Middle and Late Preclassic. The archival card broadly labels Bolinas 1 Preclassic and Classic; neither source dates the discovery or deposit securely.",
    fieldwork: "The circumstances and context of the Finca Bolinas discovery are uncertain, while the archival table gives no method or coordinate. The reconstructed marker follows only the article's statement that the ranch lay about 6 km south of Chalchuapa.",
    discoveries: "The collection contains 93 figures interpreted as female and two possibly male. They vary from a few centimetres to more than 20 cm in height, use cream or reddish-brown paste, commonly retain white or orange slip, and often show elaborate hair, jewellery, or clothing. Some had string-articulated heads or limbs. Punctate eye treatment loosely unifies the broad Bolinas category, but the collection is not a secure in-situ tableau.",
  },
  "san-jose-la-majada": {
    overview: "An archival table preserves a minimally documented archaeological lead named San José la Majada in Sonsonate Department.",
    dates: "Unknown; the entry has no date or cultural period.",
    fieldwork: "The table identifies a recorder but does not describe a survey, excavation, or other fieldwork.",
    discoveries: "The entry tentatively asks whether the locality was a cemetery, but gives no evidence that confirms this interpretation.",
  },
  "centa-ciudad-arce": {
    overview: "An archaeology-department registration card reports a funerary locality named CENTA in Ciudad Arce. The later publication warns that card reports are not independently verified.",
    dates: "The card tentatively suggests a Postclassic date and is dated 20 January 1975; no field-investigation date is documented.",
    fieldwork: "Stanley Boggs is named as the recorder, but the table does not describe excavation, recovery, survey or another fieldwork method.",
    discoveries: "The card reports three urns and a cemetery at depths of 1.20 and 1.80 metres. It does not describe associated objects or the urns' arrangement.",
  },
  "el-primo-colon": {
    overview: "An archaeology-department registration card preserves an unverified lead named El Primo in Colón municipality.",
    dates: "The card tentatively asks whether the reported find was Classic and is dated 6 May 1987; no field-investigation date is documented.",
    fieldwork: "José Retana is named as the recorder, but the table does not describe excavation, recovery, survey, or another fieldwork method.",
    discoveries: "The card tentatively asks whether there was a lidded funerary urn with a jar beside it. The publication does not independently verify either object or describe its context.",
  },
  "monolit-lourdes": {
    overview: "An archaeology-department registration card preserves an unverified burial lead named Monolit near Lourdes.",
    dates: "The card assigns the reported burials to the Classic period and is dated 1991; no field-investigation date is documented.",
    fieldwork: "Paul Amaroli is named as the recorder, but the table does not describe excavation, recovery, survey, or another fieldwork method.",
    discoveries: "The card reports burials but gives no burial count, grave construction, associated objects, or osteological analysis. The publication warns that card reports are not independently verified.",
  },
};
