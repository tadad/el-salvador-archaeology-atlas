import type { Metadata } from "next";
import Link from "next/link";
import styles from "../document.module.css";

export const metadata: Metadata = {
  title: "Unknown | El Salvador Archaeology Atlas",
  description:
    "Open questions and unresolved archaeological mysteries in the El Salvador research corpus.",
};

const mysteries = [
  {
    title: "Where was the first San Salvador?",
    status: "Location unconfirmed · leading hypothesis: La Bermuda / Ciudad Vieja",
    body: (
      <>
        The first villa of San Salvador existed by May 1525, with Diego
        Holguín serving as alcalde, but no surviving record identifies its
        precise location. An older hypothesis placed the short-lived
        settlement near the Pipil capital of Cuscatlán, around modern Antiguo
        Cuscatlán; later historical and archaeological work finds no direct
        support for that placement. The stronger—but still unproved—case is
        that this was a small military camp at Ciudad Vieja in La Bermuda, or
        somewhere immediately nearby, three years before the permanent villa
        was laid out there in 1528. Possible early building phases have been
        excavated at Ciudad Vieja, but the material record cannot yet separate
        1525 securely from 1528.
      </>
    ),
    maps: [],
    sources: [
      {
        label: "Amaroli 1986",
        href: "https://fundar.org.sv/referencias/buscacuscatlan.pdf",
      },
      {
        label: "Fowler et al. 2004",
        href: "https://www.asociaciontikal.com/wp-content/uploads/2017/01/61.03-Fowler-en-PDF.pdf",
      },
    ],
  },
  {
    title: "What survives beneath Antiguo Cuscatlán?",
    status: "Residential zone identified · civic and ceremonial core still missing",
    body: (
      <>
        Antiguo Cuscatlán is the probable setting of Cuzcatán, capital of the
        largest Indigenous polity in the territory at the time of the Spanish
        invasion, yet its surviving plan remains astonishingly unclear.
        Archaeologists have documented an extensive late precolonial
        residential zone—roughly 85 hectares in the earliest survey—with
        house platforms, ceramics, obsidian, metates, and, at Madre Selva,
        possible elite residences and a ceremonial group. What has never been
        securely located is the capital’s central core: its principal plaza,
        governing residences, pyramids, or ballcourt. Modern construction has
        destroyed some deposits and may cover others, while the chronology and
        full extent of what remains have never been resolved. For the most
        important precolonial settlement in El Salvador, we still know far
        more about its scattered neighborhoods than about its center.
      </>
    ),
    maps: [
      {
        src: "/images/buscacuscatlan/figure-18-survey-area.webp",
        alt: "Figure 18 map outlining the Antiguo Cuscatlán archaeological survey area.",
        caption: "Figure 18. Survey area.",
        href: "https://fundar.org.sv/referencias/buscacuscatlan.pdf#page=180",
      },
      {
        src: "/images/buscacuscatlan/figure-19-cultural-materials.webp",
        alt: "Figure 19 map showing the distribution and density of cultural materials around Antiguo Cuscatlán.",
        caption: "Figure 19. Surface cultural materials.",
        href: "https://fundar.org.sv/referencias/buscacuscatlan.pdf#page=181",
      },
      {
        src: "/images/buscacuscatlan/figure-20-surface-collections.webp",
        alt: "Figure 20 map showing the numbered surface collection proveniences around Antiguo Cuscatlán.",
        caption: "Figure 20. Surface collection proveniences.",
        href: "https://fundar.org.sv/referencias/buscacuscatlan.pdf#page=182",
      },
      {
        src: "/images/buscacuscatlan/figure-25-late-classic-distribution.webp",
        alt: "Figure 25 map showing the interpreted distribution of Late Classic materials.",
        caption: "Figure 25. Late Classic distribution.",
        href: "https://fundar.org.sv/referencias/buscacuscatlan.pdf#page=189",
      },
      {
        src: "/images/buscacuscatlan/figure-26-postclassic-distribution.webp",
        alt: "Figure 26 map showing the interpreted distribution of Postclassic materials.",
        caption: "Figure 26. Postclassic distribution.",
        href: "https://fundar.org.sv/referencias/buscacuscatlan.pdf#page=190",
      },
      {
        src: "/images/buscacuscatlan/figure-27-joateca-distribution.webp",
        alt: "Figure 27 map showing the distribution of Joateca ceramics used as a Protohistoric marker.",
        caption: "Figure 27. Joateca ceramic distribution.",
        href: "https://fundar.org.sv/referencias/buscacuscatlan.pdf#page=191",
      },
    ],
    sources: [
      {
        label: "Amaroli 1986",
        href: "https://fundar.org.sv/referencias/buscacuscatlan.pdf",
      },
      {
        label: "Amaroli, Hermes & Velásquez 1994",
        href: "https://www.asociaciontikal.com/wp-content/uploads/2016/11/46.93-Amaroli-et-al..pdf",
      },
    ],
  },
] as const;

export default function UnknownPage() {
  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        <Link className={styles.wordmark} href="/">
          Archaeology of El Salvador
        </Link>
        <nav className={styles.primaryNav} aria-label="Primary navigation">
          <Link href="/">Atlas</Link>
          <span aria-current="page">Unknown</span>
          <Link href="/sources.md">Sources</Link>
        </nav>
      </header>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>Unknown</h1>
          <p>
            <em>Open questions · {mysteries.length} unresolved</em>
          </p>
          <p>
            A working ledger of places, people, and events that the surviving
            documents and archaeology do not yet explain. These are research
            questions, not empty spaces to fill with certainty.
          </p>
        </header>

        <ol className={styles.mysteryList}>
          {mysteries.map((mystery) => (
            <li className={styles.mystery} key={mystery.title}>
              <article>
                <h2>{mystery.title}</h2>
                <p>
                  <strong>Status:</strong> {mystery.status}
                </p>
                <p>{mystery.body}</p>
                {mystery.maps.length > 0 ? (
                  <div className={styles.mapFigures}>
                    {mystery.maps.map((map) => (
                      <figure className={styles.mapFigure} key={map.src}>
                        <a href={map.href} target="_blank" rel="noreferrer">
                          <img
                            src={map.src}
                            alt={map.alt}
                            width="2520"
                            height="1530"
                            loading="lazy"
                          />
                        </a>
                        <figcaption>
                          {map.caption}{" "}
                          <a href={map.href} target="_blank" rel="noreferrer">
                            Amaroli 1986 ↗
                          </a>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}
                <p className={styles.sources} aria-label="Research leads">
                  <strong>Research leads:</strong>{" "}
                  {mystery.sources.map((source) => (
                    <a
                      href={source.href}
                      key={source.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {source.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
