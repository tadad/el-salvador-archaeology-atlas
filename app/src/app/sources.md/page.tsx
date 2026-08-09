import type { Metadata } from "next";
import Link from "next/link";
import sourceRecords from "@/data/sources.json";
import styles from "../document.module.css";

export const metadata: Metadata = {
  title: "Sources | El Salvador Archaeology Atlas",
  description:
    `A plain-text catalog of the ${sourceRecords.length} source PDFs in the El Salvador archaeology corpus.`,
};

const collections = [
  {
    name: "FUNDAR",
    id: "fundar",
    description:
      "Reports, manuscripts, maps, artifact studies, and publications from FUNDAR’s Salvadoran archaeology reference collection.",
  },
  {
    name: "Institutional",
    id: "institutional",
    description:
      "Research and journals from Salvadoran university and government repositories, Asociación Tikal, the Ministry of Culture, and scholarly publishers.",
  },
  {
    name: "Public domain",
    id: "public-domain",
    description:
      "Colonial accounts, early ethnography, archaeology, folklore, and national histories preserved by the Internet Archive.",
  },
] as const;

export default function SourcesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        <Link className={styles.wordmark} href="/">
          Archaeology of El Salvador
        </Link>
        <nav className={styles.primaryNav} aria-label="Primary navigation">
          <Link href="/">Atlas</Link>
          <Link href="/unknown">Unknown</Link>
          <span aria-current="page">Sources</span>
        </nav>
      </header>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>Sources</h1>
          <p>
            <em>Source library · {sourceRecords.length} PDFs</em>
          </p>
          <p>
            Every PDF in the El Salvador archaeology corpus, with its title,
            credited creator, publication date, description, and original PDF
            link. The links open files on the institutions that host them.
          </p>

          <nav className={styles.collectionNav} aria-label="Source collections">
            <strong>Collections:</strong>{" "}
            {collections.map((collection) => {
              const count = sourceRecords.filter(
                (source) => source.collection === collection.name,
              ).length;

              return (
                <a href={`#${collection.id}`} key={collection.id}>
                  {collection.name} ({count})
                </a>
              );
            })}
          </nav>
        </header>

        {collections.map((collection) => {
          const sources = sourceRecords.filter(
            (source) => source.collection === collection.name,
          );

          return (
            <section className={styles.collection} id={collection.id} key={collection.id}>
              <h2>{collection.name}</h2>
              <p>
                {collection.description} <em>({sources.length} sources)</em>
              </p>

              <ol className={styles.sourceList}>
                {sources.map((source) => (
                  <li className={styles.source} key={`${source.collection}-${source.filename}`}>
                    <article>
                      <h3>{source.title}</h3>
                      <p>
                        <strong>Creator:</strong> {source.creator}
                        <br />
                        <strong>Published:</strong> {source.publishDate}
                      </p>
                      <p>{source.description}</p>
                      <p>
                        <a
                          href={source.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${source.title} PDF`}
                        >
                          Open PDF ↗
                        </a>
                      </p>
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </main>
  );
}
