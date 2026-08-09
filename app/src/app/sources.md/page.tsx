import type { Metadata } from "next";
import Link from "next/link";
import sourceRecords from "@/data/sources.json";
import styles from "./sources.module.css";

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
          <span aria-current="page">Sources</span>
        </nav>
      </header>

      <div className={styles.content}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>
            Source library · {sourceRecords.length} PDFs
          </p>
          <h1>Sources</h1>
          <p className={styles.summary}>
            Every PDF in the El Salvador archaeology corpus, with its title,
            credited creator, publication date, description, and original PDF
            link. The links open files on the institutions that host them.
          </p>

          <nav className={styles.collectionNav} aria-label="Source collections">
            {collections.map((collection) => {
              const count = sourceRecords.filter(
                (source) => source.collection === collection.name,
              ).length;

              return (
                <a href={`#${collection.id}`} key={collection.id}>
                  <span>{collection.name}</span>
                  <span>{count}</span>
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
              <header className={styles.collectionHeader}>
                <div>
                  <p className={styles.eyebrow}>Collection {collection.id}</p>
                  <h2>{collection.name}</h2>
                </div>
                <p>{collection.description}</p>
                <span className={styles.collectionCount}>{sources.length}</span>
              </header>

              <ol className={styles.sourceList}>
                {sources.map((source, index) => (
                  <li className={styles.source} key={`${source.collection}-${source.filename}`}>
                    <span className={styles.sourceNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <article>
                      <h3>{source.title}</h3>
                      <dl className={styles.metadata}>
                        <div>
                          <dt>Creator</dt>
                          <dd>{source.creator}</dd>
                        </div>
                        <div>
                          <dt>Published</dt>
                          <dd>{source.publishDate}</dd>
                        </div>
                      </dl>
                      <p className={styles.description}>{source.description}</p>
                    </article>
                    <a
                      className={styles.pdfLink}
                      href={source.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${source.title} PDF`}
                    >
                      PDF <span aria-hidden="true">↗</span>
                    </a>
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
