import { westernSiteStories } from "./western-sites";

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
      "An early, historically reported excavation somewhere around Apaneca. It belongs to the first generation of archaeological work in El Salvador, but the surviving corpus reference is closer to a bibliographic trace than a modern field report.",
    dates:
      "Pre-Hispanic material; the corpus citation does not preserve a secure occupation date. The investigation predates Longyear’s 1940s survey.",
    fieldwork:
      "Habel is credited with excavation near Apaneca, but the cited paper gives no trench plan, parcel, excavation dimensions, or recoverable field coordinate.",
    discoveries:
      "The accessible citation does not enumerate the objects or architecture recovered. This marker therefore records the history of investigation, not a reconstructed assemblage.",
  },
  "santa-leticia": {
    overview:
      "A major highland settlement on the Santa Leticia estate, best known for three monumental ‘potbellied’ stone sculptures. The site helped establish that western El Salvador supported substantial communities before the Classic-period cities.",
    dates:
      "Principally Late Preclassic, roughly the final centuries BCE and opening centuries CE. Demarest’s principal field season was in 1977.",
    fieldwork:
      "The project combined reconnaissance, a topographic map, and excavation across the settlement rather than investigating only the famous sculptures.",
    discoveries:
      "Excavation documented the settlement context and supported a Late Preclassic date for the potbellied monuments—large carved figures associated with the site’s public landscape.",
  },
  "ataco-las-sepulturas": {
    overview:
      "A pre-Hispanic settlement near Concepción de Ataco, locally associated with the name Las Sepulturas. Its mapped nucleus and carved jaguar heads point to a community with public architecture and a long occupational history.",
    dates:
      "Evidence discussed in the project spans the Preclassic and Postclassic periods. Reconnaissance began in 2006–2007, with further work from 2008.",
    fieldwork:
      "Researchers surveyed the area, mapped the monumental nucleus, and opened exploratory excavations to test chronology and construction.",
    discoveries:
      "The work documented mounds and carved stone jaguar heads. The synthesis emphasizes the site’s Preclassic and Postclassic components but does not publish a complete artifact inventory at the cited page.",
  },
  "cara-sucia": {
    overview:
      "A large ceremonial and residential center on El Salvador’s far western coastal plain. Its sequence is especially useful for understanding the region before and during the Cotzumalhuapa-related culture of the Late Classic.",
    dates:
      "Two principal occupations were identified: a Late Preclassic community and a later occupation ending near the close of the Classic period. Major excavation took place in 1982–1983.",
    fieldwork:
      "The national archaeological project mapped and excavated the center to establish its architecture, ceramics, and occupational sequence.",
    discoveries:
      "Excavators separated two major building and ceramic horizons, showing that the visible center was not a single-period settlement but the product of widely separated occupations.",
  },
  "el-carmen": {
    overview:
      "A low household mound near the Estero El Zapote mangroves. Rather than a temple or palace, El Carmen preserves the repeated rebuilding of an extended-family residence and an unusually early settled way of life on the Salvadoran coast.",
    dates:
      "Early Preclassic, broadly in the second millennium BCE. The excavation ran from May 23 to June 17, 1988.",
    fieldwork:
      "Archaeologists excavated 32 square metres through the roughly three-metre-high mound, following its floors and construction layers.",
    discoveries:
      "Seven occupation or construction floors, at least three high-heat ovens, and more than twelve storage pits were found. Impressions and remains of seeds, bone, and shell show a household drawing food from both inland and marine environments.",
  },
  "el-eden": {
    overview:
      "A small pre-Hispanic locality in the same coastal landscape as El Carmen. It was tested to learn whether the area held another settlement of El Carmen’s very early date.",
    dates:
      "Middle to Late Preclassic, later than El Carmen. The test excavation was made during the 1988 El Carmen project.",
    fieldwork:
      "The team opened a single 2 × 1 metre test pit, so this is a chronological sample rather than a broad excavation of the settlement.",
    discoveries:
      "The pit produced pottery—including fugitive polychrome decoration—an obsidian blade, a metate fragment, charcoal, and bone. The ceramics showed that El Edén did not share El Carmen’s earliest occupation.",
  },
  "el-zapote-san-isidro": {
    overview:
      "A compact Postclassic settlement in the Cooperativa San Isidro, organized around a small central plaza. Its low earthen-and-stone buildings were set on a leveled or artificially built terrace.",
    dates:
      "Postclassic. Registered in 2011 and excavated January 7–11, 2013.",
    fieldwork:
      "The team made a detailed 896-point topographic survey and opened three test units to examine construction and recover dating material.",
    discoveries:
      "The map revealed three elongated mounds, a possible fourth mound, and two small platforms around a plaza. Pottery from the work led researchers to propose the local San Isidro and Acahuaspán ceramic types.",
  },
  "tacuscalco-los-cerritos": {
    overview:
      "A substantial pre-Hispanic center and surrounding burial zone near Nahulingo. The site combines public architecture with evidence for the people who lived and were buried around it.",
    dates:
      "Pre-Hispanic, with the cited synthesis emphasizing fieldwork in 1990; later papers analyze excavated burials.",
    fieldwork:
      "The 1990 project combined monument mapping, systematic surface collection, and excavation, later followed by work focused on human remains and burial contexts.",
    discoveries:
      "Researchers documented the site plan, collected diagnostic artifacts, and excavated burials. The cited overview does not reduce the settlement to a single securely dated phase.",
  },
  "iglesia-caluco": {
    overview:
      "The ruined colonial church of San Pedro y San Pablo at Caluco, investigated as both a building and a record of the Indigenous town created under Spanish rule.",
    dates:
      "Colonial period; archaeological campaigns took place in 1994 and 1995.",
    fieldwork:
      "Excavation inside and around the church tested its architectural history and deposits associated with the colonial congregation.",
    discoveries:
      "The work exposed buried architectural evidence and cultural deposits connected to the church’s construction and use. The synthesis records the project but gives only a brief inventory at the cited page.",
  },
  "asuncion-izalco": {
    overview:
      "The ruins of Izalco’s colonial Iglesia de la Asunción. Archaeology here reads the standing ruin together with the buried fabric of a church serving one of Izalco’s historically Indigenous communities.",
    dates:
      "Colonial and later church use; the cited FUNDAR investigation is a modern archaeological assessment of the ruins.",
    fieldwork:
      "Researchers used test excavations and architectural observation within the church complex to identify construction levels and earlier features.",
    discoveries:
      "The investigation documented buried walls, floors, and deposits that clarify how the church changed through time. The source is principally an architectural-archaeological report, not a single spectacular-find account.",
  },
  "los-gavilanes": {
    overview:
      "An Early Postclassic residential settlement discovered in the path of a housing development. The remains show ordinary buildings participating in the same long-distance networks visible at larger centers.",
    dates:
      "About 900–1200 CE. Salvage excavation ran from June through August 2005.",
    fieldwork:
      "Test pits and expanded rescue units exposed two pre-Hispanic structures before construction could destroy them.",
    discoveries:
      "Structure 2 had stone foundations, cobbled and burned-earth floors, and a small stone box that may have burned copal. Finds included pieces of a Xipe Totec effigy, Plumbate and Nicoya/Papagayo pottery, and a green obsidian blade from Pachuca, Mexico.",
  },
  tazumal: {
    overview:
      "The best-known monumental precinct within ancient Chalchuapa: a long-lived center with pyramids, platforms, burials, and objects linking western El Salvador to the wider Maya world and central Mexico.",
    dates:
      "Chalchuapa was occupied for many centuries; Tazumal’s major architecture is principally Classic and Postclassic. Excavation began in the 1940s, with major restoration and research continuing into the 2000s.",
    fieldwork:
      "Boggs and Longyear carried out extensive excavation and reconstruction. Later teams remapped buildings, studied architectural sequences, and excavated after part of Structure B1-2 collapsed in 2004.",
    discoveries:
      "Work revealed successive monumental buildings, tombs and offerings, sculpture, ceramics, and evidence of repeated remodeling. The site is central to the ceramic chronology used across western El Salvador.",
  },
  "ciudad-nuevo-tazumal": {
    overview:
      "A Postclassic settlement area immediately east of Tazumal, exposed as modern urbanization expanded across the archaeological landscape of Chalchuapa.",
    dates:
      "Postclassic; rescue sondages were carried out from 2001 to 2003.",
    fieldwork:
      "Archaeologists tested roughly ten manzanas of development land, recording low platforms and foundations before construction.",
    discoveries:
      "The survey identified circular, elongated, polygonal, semi-oval, and square platforms and building foundations—evidence that settlement extended well beyond the protected Tazumal monuments.",
  },
  "casa-blanca": {
    overview:
      "A monumental sector of the larger Chalchuapa settlement, now an archaeological park. Its earthen platforms preserve a long sequence of public building beside the areas known as Tazumal and El Trapiche.",
    dates:
      "Primarily Preclassic and Classic occupation. A Japanese–Salvadoran multidisciplinary project worked here from 1995 to 2000.",
    fieldwork:
      "The project paired precise topographic mapping and stratigraphic excavation with conservation and restoration of the exposed earthen architecture.",
    discoveries:
      "Excavation clarified construction stages and recovered ceramics and other materials used to place Casa Blanca within Chalchuapa’s long history. Conservation was part of the research design, not an afterthought.",
  },
  "el-trapiche-e3-7": {
    overview:
      "A major mound in Chalchuapa’s early monumental zone. A rescue excavation turned it into one of the country’s starkest archaeological records of public ritual and violence.",
    dates:
      "Late Preclassic context; rescue excavation took place in 1977–1978.",
    fieldwork:
      "Fowler’s team excavated mound E3-7 as a threatened component of the El Trapiche complex, documenting the human remains in their architectural context.",
    discoveries:
      "The excavation recorded 33 individuals, interpreted in the cited synthesis as victims of human sacrifice. Their placement made the mound important for understanding ritual authority in early Chalchuapa.",
  },
  "templo-santiago-apostol": {
    overview:
      "A colonial church in Chalchuapa whose buried deposits complement the nearby pre-Hispanic monuments, showing the town’s history after the Spanish invasion.",
    dates:
      "Colonial and later use; archaeological investigation took place in 1998–1999.",
    fieldwork:
      "The national Department of Archaeology investigated the church fabric and subsurface deposits during a two-year project.",
    discoveries:
      "The cited national synthesis confirms architectural archaeology at the temple but does not provide a detailed object list on its summary page; the value of this point is the documented church investigation itself.",
  },
  "asuncion-ahuachapan": {
    overview:
      "A historic church in central Ahuachapán where subsurface work revealed both the building’s architectural history and a much later episode of national political conflict.",
    dates:
      "Colonial and modern deposits. Archaeological testing and rescue work are documented for 2002–2003; one deposit belongs to the 1944 uprising.",
    fieldwork:
      "Sondages were placed in the church to examine buried construction and deposits encountered during intervention in the building.",
    discoveries:
      "Researchers documented architectural remains and found arms and ammunition buried in connection with the events of 1944, showing how church archaeology can preserve twentieth-century history as well as colonial fabric.",
  },
  "finca-san-rafael": {
    overview:
      "A dispersed Postclassic residential area on a finca at Chalchuapa. Its small compounds help fill the gap between the city’s famous monuments and the households that surrounded them.",
    dates:
      "Postclassic; archaeological testing took place in February 2006.",
    fieldwork:
      "A short testing program sampled low structures and terraces to determine the nature and extent of the remains.",
    discoveries:
      "The work identified about nine structures arranged in two probable domestic compounds, together with terraces and Postclassic material.",
  },
  "san-andres-campana": {
    overview:
      "A major Maya center in the Zapotitán valley, organized around monumental platforms including the great Campana mound. It was a political and ceremonial focus for communities living across the valley.",
    dates:
      "Most visible florescence belongs to the Classic period, especially after resettlement following the Ilopango eruption. Carnegie fieldwork was underway by 1940–1941.",
    fieldwork:
      "The early project mapped and trenched the Campana–San Andrés complex, examining monumental construction and recovering ceramics for regional comparison; later projects expanded the sequence.",
    discoveries:
      "Excavation documented massive platform architecture and successive building episodes. Ceramics and construction evidence helped establish San Andrés as a principal Classic-period center in the valley.",
  },
  "joya-de-ceren": {
    overview:
      "A farming village sealed rapidly by volcanic ash, preserving houses, kitchens, storehouses, gardens, and fields in exceptional detail. It offers a household-scale view of Maya life that monumental centers rarely preserve.",
    dates:
      "Classic period, buried by an eruption in the seventh century CE. Geophysical work began in 1979–1980 and sustained excavation resumed from 1989.",
    fieldwork:
      "Teams combined careful excavation through volcanic deposits with geophysics and remote sensing to locate buildings and cultivated plots without stripping the entire site.",
    discoveries:
      "Earthen buildings, household tools, stored foods, planted fields, and activity areas survived in place. Their arrangement reveals daily work and an abrupt evacuation rather than a slowly abandoned ruin.",
  },
  "el-cambio": {
    overview:
      "A pre-Hispanic settlement near Joya de Cerén where burials provide a direct record of community life in the Zapotitán valley before the better-known Classic village.",
    dates:
      "The cited burial contexts are Preclassic. The summarized excavation season ran in 2006–2007.",
    fieldwork:
      "Excavators opened settlement and mortuary contexts, recording body position, associated objects, and stratigraphy rather than collecting isolated bones.",
    discoveries:
      "The project recovered Preclassic burials with offerings and used their placement and skeletal evidence to discuss local mortuary practice. The source summary does not supply a complete burial catalog at the cited pages.",
  },
  "nuevo-lourdes-poniente": {
    overview:
      "A settlement in the southeastern Zapotitán valley that helps answer when people returned after the enormous Ilopango eruption. Its value lies in the layers immediately above the volcanic ash.",
    dates:
      "Terminal Preclassic activity is present, followed by repopulation around 600 CE and before about 650 CE. The dates come from ceramics, stratigraphy, and three radiocarbon samples.",
    fieldwork:
      "Researchers excavated pits and occupation deposits above the Ilopango tephra and submitted bone from three contexts for radiocarbon dating.",
    discoveries:
      "Mammiform vessel supports, Usulután decoration, red-banded pottery, and dated bone showed both earlier activity and a relatively early return to the devastated valley.",
  },
  chanmico: {
    overview:
      "A pre-Hispanic settlement locality near Laguna Chanmico and El Playón, part of the volcanically active landscape west of San Salvador.",
    dates:
      "Pre-Hispanic; the accessible synthesis mentions the investigation but does not provide a reliable phase range or field-season date for this particular point.",
    fieldwork:
      "The corpus preserves Chanmico as an investigated site, but the cited summary does not describe the number or placement of excavation units.",
    discoveries:
      "No site-specific find list is given on the cited page. This is intentionally a modest record until the underlying Chanmico field report can be tied to the corpus.",
  },
  "antiguo-cuscatlan-avenida-navas": {
    overview:
      "A buried Middle Preclassic residential and burial area encountered beneath a modern street in Antiguo Cuscatlán. The find demonstrates that settlement here began long before the later Pipil capital.",
    dates:
      "Middle Preclassic. The rescue followed discovery during modern utility work; the source describes a ten-metre street segment.",
    fieldwork:
      "Archaeologists cleaned and excavated the narrow utility trench along Avenida Navas and Pasaje 4, working within the limits of an active street project.",
    discoveries:
      "At least seven burials were exposed with ceramic material. Because the excavation was a narrow rescue window, it sampled a larger buried settlement rather than defining its full extent.",
  },
  madreselva: {
    overview:
      "A residential and ceremonial part of ancient Cuscatlán beneath the modern Madreselva development. It preserves the urban landscape associated with the powerful Indigenous capital encountered by the Spanish.",
    dates:
      "Occupation documented from about 600 to 1524 CE, spanning the Late Classic and Postclassic. Major rescue work began around 1991 and continued in the early 1990s.",
    fieldwork:
      "Development-led rescue excavation used trenches and test units across terraces, platforms, patios, and domestic zones before construction removed much of the site.",
    discoveries:
      "Excavators found house and temple remains, earthen platforms bounded by stone, burials near dwellings, and four offerings—including polychrome vessels, an infant dental deposit, and grinding stones.",
  },
  "sitio-c-la-viuda": {
    overview:
      "One of the archaeological areas found during development of Ciudad Nuevo Cuscatlán. Known as Site C or La Viuda, it preserves settlement and mortuary evidence within a rapidly urbanizing landscape.",
    dates:
      "Classic-period occupation; intensive rescue excavation is cited for 1996.",
    fieldwork:
      "The rescue project excavated settlement deposits and burials under construction pressure, recording stratigraphy, body position, osteology, and associated artifacts.",
    discoveries:
      "Burial contexts and their offerings were the principal reported evidence. The corpus summary does not publish enough architectural detail to reconstruct a complete site plan.",
  },
  "hacienda-tula": {
    overview:
      "A pre-Hispanic mound group on a flat ridge known as La Sabana in the San José Villanueva area. It was one of the eastern and central Salvadoran sites sampled to build an early national ceramic chronology.",
    dates:
      "Pre-Hispanic; excavated during Longyear’s 1941–1942 archaeological survey.",
    fieldwork:
      "Longyear described the mound group and excavated selected architecture and deposits, using pottery as the principal tool for comparison with other sites.",
    discoveries:
      "Mound construction and ceramic collections established occupation at the ridge. The older report is stronger on typological comparison than on the household-scale narrative expected from a modern excavation.",
  },
  "club-internacional": {
    overview:
      "A sealed deposit beneath central San Salvador, discovered not by a planned dig but while workers excavated a basement for the Club Internacional. It is a rare archaeological window beneath the modern capital.",
    dates:
      "Pre-Hispanic, assigned by Boggs to a late ceramic horizon in the chronology then in use. Discovered during construction in 1939.",
    fieldwork:
      "Building workers exposed objects mixed with a volcanic-ash layer; Boggs documented the location and studied the recovered ceramic assemblage rather than conducting a broad site excavation.",
    discoveries:
      "The deposit contained numerous decorated vessels, including polychrome bowls and tetrapod forms. Their association beneath the city allowed Boggs to compare San Salvador’s buried sequence with Tazumal and other western sites.",
  },
  "cerro-zapote-san-jacinto": {
    overview:
      "A stratified pre-Hispanic site on Cerro El Zapote at San Jacinto, now absorbed into metropolitan San Salvador. Volcanic ash physically separated two episodes of occupation.",
    dates:
      "Pre-Hispanic occupations on either side of an ash fall; Lardé and Lothrop excavated the site in 1926.",
    fieldwork:
      "The early excavation cut through layered deposits, making the vertical relationship between artifacts and volcanic ash more important than a broad horizontal plan.",
    discoveries:
      "A lower humus layer contained handmade figurines and Usulután pottery; a sterile ash band separated it from an upper layer with a different, mixed assemblage. The sequence offered early evidence for eruption-based chronology.",
  },
  "basilica-el-pilar": {
    overview:
      "A colonial basilica in San Vicente investigated beneath and around its standing architecture. The project treated the church as an archaeological site with successive building phases and burial space.",
    dates:
      "Colonial and later use; excavation and restoration are documented in the early 2000s, including work in 2003.",
    fieldwork:
      "Archaeological excavation accompanied architectural restoration, allowing buried features to be recorded before intervention in the building.",
    discoveries:
      "The work exposed catacombs, architectural elements, and colonial cultural materials. Together they document both the fabric of the basilica and the people interred and commemorated there.",
  },
  "cihuatan-p7": {
    overview:
      "The principal pyramid of Cihuatán, a large Early Postclassic city built after the Classic Maya political collapse. Structure P-7 anchors the western ceremonial center and preserves evidence for the city’s violent end.",
    dates:
      "About 900–1200 CE. The focused P-7 project worked in 2001–2002, the first investigation of the pyramid since 1929.",
    fieldwork:
      "Researchers made a new topographic record and opened fourteen to fifteen small units around the western stair and terraces to understand construction without stripping the pyramid.",
    discoveries:
      "Six stepped core terraces faced with tuff blocks, lime stucco, a western stair, and lava paving were documented. Burned collapse at the foot of the building supports a destructive, fire-marked end shared across Cihuatán.",
  },
  carranza: {
    overview:
      "A small Early Postclassic settlement north of Cihuatán, rescued before sugarcane cultivation damaged its low platforms. One building yielded a rare sculpture in a secure archaeological context.",
    dates:
      "Early Postclassic, probably about 950–1100 CE. Rescue excavation began in March 2002.",
    fieldwork:
      "The team mapped low mounds and exposed Structure 1, a roughly twelve-metre-wide river-stone building only about half a metre high.",
    discoveries:
      "Excavators recovered substantial pieces of a life-size ceramic Xipe Totec figure—the first documented in context in El Salvador—along with Tohil Plumbate, Nicoya polychrome pottery, and other imported or exchange-linked material.",
  },
  "las-marias-tlaloc": {
    overview:
      "A rescue spot beside the main pyramid of Las Marías, an Early Postclassic city. The small excavation captured what may have been a ritual building or deposit associated with the rain deity Tláloc.",
    dates:
      "Early Postclassic or Guazapa phase, about 900–1200 CE. The rescue took place in July 2002.",
    fieldwork:
      "After a farmer encountered sherds, archaeologists opened a limited 2 × 2 metre unit and traced the shallow destruction layer over a buried cobbled floor and structure.",
    discoveries:
      "Parts of at least four unusually large Tláloc bottles or effigies lay in destruction debris. Their concentration suggests a specialized ritual context and may relate to the city’s terminal event.",
  },
  "ciudad-vieja": {
    overview:
      "The ruins of the first enduring Spanish town of San Salvador, laid out amid Indigenous communities during the conquest. It preserves houses, streets, civic space, and material evidence of cultural negotiation in a very short-lived colonial settlement.",
    dates:
      "Founded in 1528 and abandoned around 1545, though some activity may have continued later. Excavation began in 1996, with sustained campaigns from 2000 to 2005.",
    fieldwork:
      "Historical archaeology combined town-plan mapping, architectural excavation, artifact analysis, and documentary research across domestic and public areas.",
    discoveries:
      "Foundations, household goods, weapons, ceramics, and food remains reveal Spanish colonial routines alongside Indigenous labor, technologies, and hybrid practices. The site makes the conquest visible as daily life rather than only a written event.",
  },
  "santa-maria": {
    overview:
      "An Early Postclassic settlement with a pyramid and I-shaped ballcourt, excavated just before the Cerrón Grande reservoir submerged it. It became a type site for the Guazapa-phase ceramic sequence.",
    dates:
      "About 900–1200 CE. Registered in 1974 and excavated in 1976 before inundation.",
    fieldwork:
      "Fifteen structures were mapped; Structure A-1 was fully excavated and forty-three test units sampled the site before flooding.",
    discoveries:
      "The plan included a roughly fifteen-metre pyramid and ballcourt on a platform. Architecture and ceramics from the excavations helped define the Guazapa phase; the submerged remains are now affected by reservoir erosion.",
  },
  "hacienda-colima": {
    overview:
      "One of the archaeological localities investigated in the Cerrón Grande dam rescue, when teams raced to document settlements that would disappear beneath the new reservoir.",
    dates:
      "Pre-Hispanic occupation; rescue excavation is documented for 1974, within the broader 1974–1977 reservoir program.",
    fieldwork:
      "The corpus bibliography confirms excavation at Colima, but the accessible retrospective does not preserve a trench-by-trench account for this locality.",
    discoveries:
      "Site-specific finds are not enumerated in the cited summary. The point is retained because Colima was genuinely excavated, while its story remains necessarily less complete than the surviving Santa María report.",
  },
  "la-cienaga-santa-barbara": {
    overview:
      "A very large mound settlement recorded at Hacienda Santa Bárbara before the Cerrón Grande reservoir filled. The scale of the site indicates a substantial community in the Lempa valley.",
    dates:
      "Pre-Hispanic; surveyed and excavated during the 1974–1977 Cerrón Grande rescue campaign.",
    fieldwork:
      "Nearly one hundred mounds were registered, and Mound 20 received extensive excavation before inundation.",
    discoveries:
      "The documented result is chiefly the settlement’s scale and the intensive sample of Mound 20. The accessible retrospective does not attach a full artifact list or narrow phase date to this map point.",
  },
  "hacienda-los-flores": {
    overview:
      "A pre-Hispanic site north of the Lempa documented in the Cerrón Grande rescue zone. It now lies deeply submerged beneath the reservoir.",
    dates:
      "Pre-Hispanic; investigated during the 1974–1977 rescue program before the dam’s inundation.",
    fieldwork:
      "Archaeologists registered and excavated the locality as part of the multi-site reservoir campaign; the surviving synthesis gives a precise map position but few operation details.",
    discoveries:
      "The citation establishes an excavated settlement at this coordinate but does not preserve a reliable site-specific catalog of buildings and artifacts. Its present condition—deeply underwater—is part of the archaeological history.",
  },
  "el-tanque-el-morrito": {
    overview:
      "A mound settlement in the Hacienda El Morrito sector of the Cerrón Grande rescue area, documented before reservoir construction transformed the landscape.",
    dates:
      "Pre-Hispanic; excavated during the 1974–1977 dam-rescue campaign.",
    fieldwork:
      "The project excavated Mound 3 at El Tanque. The retrospective identifies that operation but does not supply a recoverable trench coordinate.",
    discoveries:
      "The corpus confirms architecture and occupation material within Mound 3 but does not give a detailed find list at the cited page; this marker therefore represents the El Morrito sector.",
  },
  "cerron-grande-unnamed": {
    overview:
      "A collective marker for four additional sites excavated in the Cerrón Grande reservoir project whose names and exact positions cannot be recovered from the accessible retrospective.",
    dates:
      "Multiple pre-Hispanic occupations; rescue work took place from 1974 to 1977, immediately before inundation.",
    fieldwork:
      "The larger project recorded more than twenty sites and excavated nine. Five can be represented separately in this atlas; four remain grouped here.",
    discoveries:
      "The project as a whole documented settlement and ceramics across the threatened Lempa valley. This is not a claim that four sites occupy one coordinate—it is a transparent placeholder for real excavations lacking recoverable locations.",
  },
  "paraiso-basin": {
    overview:
      "A basin-scale group of excavations in the Cerrón Grande landscape. The evidence is important less as one ‘site’ than as a regional sequence tied to volcanic deposits.",
    dates:
      "Pre-Hispanic occupations around the Ilopango eruption, now dated broadly to the early fifth through sixth centuries CE. The synthesis draws on earlier basin excavations.",
    fieldwork:
      "Multiple excavation contexts were compared across the basin; the cited overview reports the evidence collectively and does not provide individual unit coordinates.",
    discoveries:
      "Artifacts and stratigraphy above and below Ilopango tephra helped refine the eruption chronology and track disruption and recovery. The map point represents an evidence area, not a single trench.",
  },
  "loma-china": {
    overview:
      "An Early Postclassic settlement excavated before construction of the San Lorenzo reservoir. A richly furnished burial connected eastern El Salvador to wider Mesoamerican exchange and ritual traditions.",
    dates:
      "Early Postclassic, roughly 900–1200 CE. Rescue work took place in 1982–1983 within a project begun in 1981.",
    fieldwork:
      "Loma China was one of eight sites selected for excavation after survey registered more than eighty sites across about one hundred square kilometres.",
    discoveries:
      "A burial with offerings included a Toltec-style mosaic pectoral. The unusual object made the submerged site a key reference for long-distance connections in eastern El Salvador.",
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
      "A settlement and cemetery in the wet Bajo Lempa, found along the canalized Río El Espino. Waterlogged conditions preserved human bone unusually well for El Salvador’s acidic tropical soils.",
    dates:
      "Late Preclassic, about 400 BCE–250 CE, and Early Classic, about 250–400 CE. Archaeological excavation followed modern canal work.",
    fieldwork:
      "Researchers excavated burials and settlement deposits beside the canal, using stratigraphy, ceramics, and osteological analysis to date and interpret them.",
    discoveries:
      "Burials included a child, a young adult man with filed and rotated teeth, and an adult woman with distinctive dental traits. The preserved skeletons provide rare evidence for health, identity, and mortuary practice.",
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
      "An unidentified late nineteenth-century wreck at the eastern end of the San Juan del Gozo peninsula. It is catalogued by the neutral field name PSJ-1 because the vessel’s historical identity remains unresolved.",
    dates:
      "Late nineteenth century, based on the machinery and associated material. Archaeological investigation is reported in the modern maritime corpus.",
    fieldwork:
      "Unlike a simple sighting, PSJ-1 received excavation and systematic documentation of its industrial components and surrounding wreck deposit.",
    discoveries:
      "The work exposed machinery and ship remains that date the loss but have not yet produced a definitive vessel name. The site demonstrates why archaeological labels sometimes remain more honest than a speculative identification.",
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
      "A steamship wreck in the San Juan del Gozo–El Bajón sector of Jiquilisco Bay. The site is known to archaeologists, but its official position is intentionally not published.",
    dates:
      "Historic steamship era; recorded during modern national surveys of underwater cultural heritage.",
    fieldwork:
      "The paper documents the wreck and its general setting while directing readers to the archaeology authority for the protected GPS coordinate.",
    discoveries:
      "Submerged steamship remains were registered about four kilometres south of San Juan del Gozo. The atlas shows only an approximate area so it does not turn a protected-site description into a precise locator.",
  },
  "los-llanitos": {
    overview:
      "A compact mound group arranged around a plaza and ballcourt south of San Miguel. When excavated, its ballcourt was the southernmost example then known in Mesoamerica.",
    dates:
      "Pre-Hispanic and interpreted by Longyear as essentially a one-period site. Excavation ran February 3–March 15, 1942.",
    fieldwork:
      "Longyear mapped the plaza group and concentrated excavation on the ballcourt, while sampling other mounds and deposits for architecture and ceramics.",
    discoveries:
      "Stone-and-adobe construction, caches, and pottery were recovered. The formal ballcourt extended the known geographic range of that public architectural tradition.",
  },
  quelepa: {
    overview:
      "A major monumental center in eastern El Salvador, with plazas, platforms, sculpture, and a local history distinct from the western Maya zone. It anchors the archaeological chronology of the country’s east.",
    dates:
      "Occupied from roughly 500 BCE to 1000 CE. Andrews’s principal excavation program ran from 1967 to 1969.",
    fieldwork:
      "The project mapped architecture and excavated buildings and deposits across the center to construct a ceramic and architectural sequence.",
    discoveries:
      "Successive monumental construction, sculpture, and changing ceramic assemblages defined a long regional sequence. The work demonstrated that eastern El Salvador had its own durable center and interregional connections.",
  },
  "casa-quemada": {
    overview:
      "A Late Classic settlement in the El Chaparral dam-impact area, laid out around three plazas. Its name—‘Burned House’—matches the project’s evidence for a community preserved under urgent rescue conditions.",
    dates:
      "Late Classic, broadly 600–900 CE. Rescue excavation took place in 2013.",
    fieldwork:
      "Archaeologists mapped eighteen structures and excavated fourteen of them, as well as all three plazas, before dam construction altered the area.",
    discoveries:
      "The unusually broad sample revealed the organization of an entire small settlement rather than one test trench, including architecture, plaza surfaces, ceramics, and activity deposits.",
  },
  "el-chaparral": {
    overview:
      "A small riverside village built on three terraces above the Torola. Its layout reflects a community combining farming with access to river resources.",
    dates:
      "Likely Late Classic. Excavation ran from January 16 to February 15, 2013.",
    fieldwork:
      "Twelve test pits—mostly 2 × 2 metres—sampled a roughly 100 × 50 metre settlement in the hydroelectric-dam impact zone.",
    discoveries:
      "Poorly preserved walls and structures, terraces, metates and other grinding stones, ceramics, and chipped stone indicated household life, agriculture, and use of the nearby river.",
  },
  "el-chiquirin": {
    overview:
      "A coastal shell midden and burial area at Punta El Chiquirín, encountered on a house lot close to the Gulf of Fonseca shore. It records repeated food gathering and burial in a maritime landscape.",
    dates:
      "Pre-Hispanic; the cited rescue report provides the period assessment. The modern intervention followed discovery during work on the lot.",
    fieldwork:
      "Archaeologists carried out a small rescue excavation about 150 metres from the beach, documenting midden layers and burials before the context was lost.",
    discoveries:
      "Dense shell refuse, associated cultural material, and human burials showed that the location served both as a place of coastal subsistence and mortuary activity.",
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
      "A roughly ten-hectare settlement on sloping ground in San Miguel department. Its size and built landscape made it one of the eastern atlas project’s selected excavation samples.",
    dates:
      "Pre-Hispanic; the atlas discusses ceramic evidence from test excavation but the cited summary does not support a narrower date here.",
    fieldwork:
      "After regional reconnaissance, the team mapped the settlement and opened test excavations to sample its architecture and deposits.",
    discoveries:
      "The work confirmed a substantial settlement spread over about ten hectares. The surviving report is more explicit about layout and extent than about a single diagnostic discovery.",
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
      "A settlement on the north bank of the Río Torola, immediately beside the better-known Fumarolas locality. It belongs to a chain of communities later threatened by hydroelectric development.",
    dates:
      "Pre-Hispanic; nine archaeological probes were excavated in 2003 during the Río Torola regional project.",
    fieldwork:
      "Survey located the site and a nine-probe testing program sampled its subsurface deposits and architectural traces.",
    discoveries:
      "Testing recovered occupation material that helped define settlement along the Torola. The source emphasizes the site’s placement within a regional pattern rather than a single monumental find.",
  },
  "fumarolas-agua-caliente": {
    overview:
      "A riverside settlement near hot-water or fumarole features on the Río Torola. Its proximity to Sitio Carolina shows how closely spaced archaeological communities could be along the riverbank.",
    dates:
      "Pre-Hispanic; recorded and tested during the early-2000s Río Torola survey and later revisited in dam-impact work.",
    fieldwork:
      "Researchers mapped surface remains and used test probes to evaluate buried deposits in the river corridor.",
    discoveries:
      "Ceramics and settlement traces confirmed occupation of the geothermal river landscape. The main result is its contribution to the Torola settlement map.",
  },
  "gruta-espiritu-santo": {
    overview:
      "El Salvador’s most celebrated rock-art shelter, a huge volcanic cavity covered with red, yellow, and black painted figures. The images span geometric forms, handprints, people, and animals.",
    dates:
      "Pre-Hispanic use probably extended across multiple periods; nine test pits were opened in 1977, and systematic rock-art recording followed in the 1990s.",
    fieldwork:
      "Work combined excavation of shelter deposits with tracing, photography, motif inventory, and comparison of pigment and superposition across the walls.",
    discoveries:
      "Excavation recovered occupation material beneath the painted shelter, while recording revealed hundreds of motifs and repeated painting episodes. The art demonstrates that the cave was used and reinterpreted over a long span.",
  },
  "valle-san-juan-tronconera": {
    overview:
      "An eroding ravine on Hacienda Valle San Juan where unusually well-preserved ceramic firing installations were exposed. The site offers direct evidence for pottery production rather than only finished vessels.",
    dates:
      "Pre-Hispanic; Boggs carried out rescue excavation after erosion exposed the installations. Comparative pottery places them within the region’s ceramic sequence.",
    fieldwork:
      "Archaeologists cleaned the ravine exposure and excavated the ovens and their associated deposits before further collapse could destroy them.",
    discoveries:
      "The work documented purpose-built firing ovens, burned surfaces, ash, and ceramic material. These rare production features reveal how vessels were manufactured at the community level.",
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
      "Two exposed coastal profiles near Puerto El Triunfo that preserve buried cultural layers within the Jiquilisco landscape. They are geological windows into occupation rather than monumental sites.",
    dates:
      "Pre-Hispanic deposits of more than one age; Haberland and Grebe investigated the profiles during mid-twentieth-century fieldwork.",
    fieldwork:
      "Researchers cleaned and described the La Rama and Río Gualacho sections, recording stratigraphy and collecting ceramics and other material by layer.",
    discoveries:
      "The profiles revealed stacked occupation deposits and pottery useful for regional chronology. Their value lies in the sequence visible through natural or artificial exposure.",
  },
  "chinameca-burial": {
    overview:
      "A burial encountered during construction in Chinameca, turning an urban work site into a small rescue excavation. It provides an intimate trace of pre-Hispanic life beneath the modern town.",
    dates:
      "Pre-Hispanic; the burial was archaeologically documented during a recent construction-related rescue reported in Anales 56.",
    fieldwork:
      "Archaeologists exposed and recorded the human remains, their position, associated objects, and the surrounding stratigraphy within the limits of the disturbed parcel.",
    discoveries:
      "The excavation recovered a human burial with associated ceramic evidence. Because the private parcel is not identified publicly, the atlas maps only the town.",
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
      "A small surface scatter southwest of Jocoaitique, recorded during Haberland’s exploratory survey through Morazán.",
    dates:
      "Pre-Hispanic; surveyed in 1954. The limited collected material does not support a precise occupation range in the cited account.",
    fieldwork:
      "Haberland inspected the locality and collected diagnostic material from the surface without opening an excavation.",
    discoveries:
      "Pottery and other surface finds demonstrated occupation near Jocoaitique and helped extend the first comparative archaeological map of Morazán.",
  },
  "pueblo-viejo-perquin": {
    overview:
      "A surface site on the route between Perquín and Jocoaitique, remembered in its name as an ‘old town.’",
    dates:
      "Pre-Hispanic; visited during Haberland’s 1954 Morazán reconnaissance. The surface collection permits only broad dating.",
    fieldwork:
      "The investigator followed local roads and paths, inspected exposed ground, and collected diagnostic artifacts from the site area.",
    discoveries:
      "Surface ceramics confirmed a pre-Hispanic occupation in the highland corridor. No architecture or buried context was excavated in the reported visit.",
  },
  "quebrada-las-marias": {
    overview:
      "A highland surface locality east of the road south from Perquín, one of several sites used to establish that Morazán’s mountain valleys held widespread pre-Hispanic occupation.",
    dates:
      "Pre-Hispanic; recorded in the 1954 reconnaissance. Its chronology remains broad because the evidence came from the surface.",
    fieldwork:
      "Haberland reached the quebrada by road and footpath and made a surface inspection and collection.",
    discoveries:
      "Diagnostic sherds and scattered cultural material established an archaeological locality but did not reveal a complete settlement plan.",
  },
  "el-rosario-morazan": {
    overview:
      "A surface-find locality in and around El Rosario, included in Haberland’s first systematic archaeological reconnaissance of Morazán.",
    dates:
      "Pre-Hispanic material, documented in 1954; the survey account does not support a tight phase assignment.",
    fieldwork:
      "Researchers inspected exposures around the community and collected artifacts visible at the surface.",
    discoveries:
      "The collected ceramics helped demonstrate occupation across Morazán’s settled valleys. This is a survey record, not an excavated mound or tomb.",
  },
  gualococti: {
    overview:
      "A surface archaeological locality around Gualococti, recorded as part of the same Morazán reconnaissance network as El Rosario and Perquín.",
    dates:
      "Pre-Hispanic; surveyed in 1954. Surface material allows only broad chronological placement.",
    fieldwork:
      "The team conducted pedestrian inspection and collected visible diagnostic artifacts rather than excavating sealed deposits.",
    discoveries:
      "Pottery and related surface evidence added Gualococti to the regional settlement map and provided material for comparison with eastern Salvadoran sequences.",
  },
  "los-bonetes": {
    overview:
      "A dramatic hilltop locality on two flat-topped heights near the Honduran frontier north of Carolina. Its setting suggests deliberate use of a defensible or highly visible landscape.",
    dates:
      "Pre-Hispanic; inspected during Haberland’s 1954 Morazán fieldwork. The surface sample does not establish a narrow date.",
    fieldwork:
      "Haberland climbed and inspected the twin mesa-like summits, recording cultural material visible on their surfaces.",
    discoveries:
      "Surface artifacts confirmed human use of both hilltops. Without excavation, the nature and duration of that occupation remain open questions.",
  },
  miracapa: {
    overview:
      "One of the archaeological settlements registered along the Río Torola corridor near Carolina. It helps fill the space between better-documented Casa Quemada, Fumarolas, and El Chaparral.",
    dates:
      "Pre-Hispanic; recorded during modern regional survey associated with development studies in the Torola valley.",
    fieldwork:
      "Survey teams inspected and registered the locality. The cited overview does not document an extensive excavation comparable to Casa Quemada.",
    discoveries:
      "Surface and architectural evidence identified another settlement in the river corridor. The record is kept modest because the source supplies limited site-specific detail.",
  },
  "conchagua-vieja": {
    overview:
      "A settlement on Isla Conchagüita combining pre-Hispanic remains with the history of a later island community. Its ridge position overlooks the maritime routes of the Gulf of Fonseca.",
    dates:
      "Pre-Hispanic occupation with later historic settlement; surveyed by Longyear in 1941–1942.",
    fieldwork:
      "Longyear visited the village and ridge, described visible remains, and collected ceramics for comparison with his eastern Salvadoran excavations.",
    discoveries:
      "Surface ceramics and settlement traces linked the island to the Gulf’s wider cultural landscape. The visit was reconnaissance rather than a large excavation.",
  },
  "teca-conchaguita": {
    overview:
      "A coastal archaeological locality on the north side of Isla Conchagüita, situated close to the shore and west of the island landing.",
    dates:
      "Pre-Hispanic; recorded during Longyear’s 1941–1942 national survey.",
    fieldwork:
      "The site was located through shoreline reconnaissance and sampled through surface collection.",
    discoveries:
      "Ceramic material established a pre-Hispanic occupation on the island’s north shore and complemented the record from nearby Conchagua Vieja.",
  },
  "el-carrizal-nueva-esparta": {
    overview:
      "A locality that Longyear knew by the older name El Carrizal and identified with modern Nueva Esparta. It represents the archaeological record beneath and around a living eastern town.",
    dates:
      "Pre-Hispanic material; visited during Longyear’s 1941–1942 survey.",
    fieldwork:
      "The survey relied on local place-name identification, inspection, and collection of material exposed around the settlement.",
    discoveries:
      "Surface artifacts confirmed earlier occupation at the town locality. No discrete excavation unit or monumental site plan is reported.",
  },
  yucuaiquin: {
    overview:
      "A pre-Hispanic surface-find locality at Yucuaiquín, included in Longyear’s effort to compare eastern Salvadoran communities beyond the major center of Quelepa.",
    dates:
      "Pre-Hispanic; recorded in the 1941–1942 survey. The cited appendix supports broad rather than precise dating.",
    fieldwork:
      "Longyear inspected the locality and collected diagnostic ceramics visible in surface exposures.",
    discoveries:
      "The pottery added another eastern community to the comparative ceramic sequence, although no formal architecture or sealed deposit was excavated.",
  },
  "cueva-del-toro": {
    overview:
      "A rock shelter in the Corinto massif near Gruta del Espíritu Santo, carrying its own group of painted imagery within the region’s unusually rich rock-art landscape.",
    dates:
      "Pre-Hispanic, probably used across more than one episode. Documented in the 1990s rock-art inventory.",
    fieldwork:
      "Researchers located, photographed, and described the shelter and its motifs, comparing them with nearby painted sites.",
    discoveries:
      "Painted figures expanded the Corinto corpus beyond the main gruta and showed that image-making occurred across multiple shelters in the massif.",
  },
  "paredon-las-figuras": {
    overview:
      "A painted rock wall north of Corinto whose name—‘wall of the figures’—reflects its visible concentration of imagery.",
    dates:
      "Pre-Hispanic; systematically documented during the 1990s regional rock-art study.",
    fieldwork:
      "The team reached the shelter through regional reconnaissance and recorded its painted motifs through description and photography.",
    discoveries:
      "The site added a northern outlier to the Corinto group and demonstrated that painted places were distributed beyond the famous Espíritu Santo shelter.",
  },
  "abrigo-los-fierros": {
    overview:
      "A smaller rock shelter belonging to the Corinto region’s network of painted places. Its sparse documentation makes it important to distinguish from the main tourist landmark.",
    dates:
      "Pre-Hispanic; documented in the modern regional rock-art inventory.",
    fieldwork:
      "Researchers registered and described the shelter and its visible painted evidence; no excavation program is reported in the cited section.",
    discoveries:
      "Rock art confirmed another locus of image-making in the Corinto landscape, although the source offers less detail than it does for Gruta del Espíritu Santo.",
  },
  "plan-de-la-montana": {
    overview:
      "A shell-midden locality northwest of La Unión, one of many estuarine and island deposits showing how densely people used the Gulf of Fonseca shoreline.",
    dates:
      "Pre-Hispanic; registered in regional inventories drawing on surveys conducted from the 1970s onward.",
    fieldwork:
      "Surveyors identified shell concentrations and associated cultural material at the surface; the cited synthesis does not report a major excavation.",
    discoveries:
      "Shell, pottery, and domestic debris marked repeated use of coastal resources. The site contributes to a regional pattern rather than a single isolated find.",
  },
  "vividores-zacatillo": {
    overview:
      "A named shell midden on Isla Zacatillo, part of a cluster of deposits that records sustained use of the island’s protected Gulf shores.",
    dates:
      "Pre-Hispanic; recorded in Gulf of Fonseca archaeological survey and inventory work.",
    fieldwork:
      "Researchers registered visible midden deposits and associated artifacts; no large excavation is described in the cited overview.",
    discoveries:
      "Dense shell and cultural debris identified a habitation or food-processing locality and helped establish that Zacatillo held several distinct archaeological deposits.",
  },
  "zacatillo-midden": {
    overview:
      "An additional, unnamed shell-midden record on Isla Zacatillo. It is kept separate because the inventory distinguishes it from Vividores and Playitas, even though its exact position is unavailable.",
    dates:
      "Pre-Hispanic; documented through regional Gulf survey and inventory.",
    fieldwork:
      "The locality was identified through surface reconnaissance rather than a reported broad excavation.",
    discoveries:
      "Shell accumulation and associated artifacts demonstrated another focus of coastal activity on the island. The map offset is illustrative, not measured.",
  },
  "playitas-zacatillo": {
    overview:
      "A shell-midden locality at Playitas on Isla Zacatillo, complementing the island’s Vividores and unnamed midden records.",
    dates:
      "Pre-Hispanic; registered during regional archaeological survey of the Gulf of Fonseca.",
    fieldwork:
      "Surveyors documented exposed shell deposits and surface artifacts; the cited synthesis does not describe extensive excavation.",
    discoveries:
      "The midden preserves refuse from maritime subsistence and confirms repeated activity at several places around Zacatillo’s shore.",
  },
  "laguna-meanguera": {
    overview:
      "A shell-midden locality on Isla Meanguera, extending the Gulf’s archaeological record to one of its outer volcanic islands.",
    dates:
      "Pre-Hispanic; known from regional Gulf of Fonseca survey and inventory.",
    fieldwork:
      "Researchers registered the deposit through island reconnaissance and surface observation; no extensive excavation is cited.",
    discoveries:
      "Shell and associated cultural debris show that Meanguera’s communities repeatedly used marine foods and shoreline activity areas.",
  },
  "isla-periquito": {
    overview:
      "A shell midden on tiny Isla Periquito in the inner Gulf of Fonseca. Its setting makes the archaeological deposit inseparable from canoe travel, fishing, and estuarine gathering.",
    dates:
      "Pre-Hispanic; documented in regional coastal inventories.",
    fieldwork:
      "Survey identified midden material on the island; the cited overview does not report a large controlled excavation.",
    discoveries:
      "Shell refuse and artifacts confirmed repeated human use of even the Gulf’s smaller islands. The map marks the island, not the midden’s exact footprint.",
  },
  "el-rico-manzanilla": {
    overview:
      "A cluster of shell middens around El Rico and Estero La Manzanilla near San Alejo, within the same estuarine world as Asanyamba.",
    dates:
      "Pre-Hispanic; recorded through Gulf survey and inventory work, with regional comparison to excavated Asanyamba.",
    fieldwork:
      "Surveyors traced exposed shell deposits around the estuary and registered associated ceramics and cultural debris.",
    discoveries:
      "Multiple middens revealed repeated habitation and food processing along the estuary. The grouped marker represents a landscape of deposits rather than one mound.",
  },
  ...westernSiteStories,
};
