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
