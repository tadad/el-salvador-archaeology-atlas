import type { Metadata } from "next";
import Link from "next/link";
import { getVaultCollections } from "@/lib/vault-catalogue";
import styles from "@/app/sources/library.module.css";

export const metadata: Metadata = {
  title: "About | El Salvador Archaeology Atlas",
  description:
    "Scope, evidence standards, source handling, and map conventions for the El Salvador archaeology atlas and research corpus.",
};

export default function AboutPage() {
  const counts = Object.fromEntries(
    getVaultCollections().map((collection) => [collection.slug, collection.records.length]),
  );

  return (
    <main className={styles.libraryPage}>
      <header className={styles.masthead}>
        <Link className={styles.wordmark} href="/">
          Archaeology of El Salvador
        </Link>
        <nav className={styles.primaryNav} aria-label="Primary navigation">
          <Link href="/">Atlas</Link>
          <Link href="/sources/places">Wiki</Link>
          <span aria-current="page">About</span>
        </nav>
      </header>

      <div className={styles.libraryWorkspace}>
        <aside className={styles.catalogue}>
          <div className={styles.catalogueHeader}>
            <p className={styles.eyebrow}>Project guide</p>
            <h1>About</h1>
            <nav className={styles.kindNav} aria-label="About this project">
              <a href="#scope">Scope</a>
              <a href="#ontology">Ontology</a>
              <a href="#evidence">Evidence</a>
              <a href="#coordinates">Coordinates</a>
              <a href="#sources">Sources</a>
            </nav>
          </div>
        </aside>

        <section className={styles.reader}>
          <article className={styles.document}>
            <header className={styles.documentHeader}>
              <p className={styles.eyebrow}>Scope and method</p>
              <h2>A source-linked atlas of archaeology in El Salvador.</h2>
              <p className={styles.indexLead}>
                This project connects archaeological places with source documents, cultural
                classifications (including historical and ethnolinguistic groups), and research
                history without treating those forms of evidence as interchangeable.
              </p>

              <dl className={styles.metadataGrid} aria-label="Corpus record counts">
                <div><dt>Place records</dt><dd>{counts.places ?? 0}</dd></div>
                <div><dt>Local papers</dt><dd>{counts.papers ?? 0}</dd></div>
                <div><dt>Authors</dt><dd>{counts.authors ?? 0}</dd></div>
                <div><dt>Organizations</dt><dd>{counts.organizations ?? 0}</dd></div>
              </dl>
            </header>

            <div className={styles.markdown}>
              <h2 id="scope">Scope</h2>
              <p>
                A record belongs here when it concerns a place in present-day El Salvador; a
                people, tradition, object, or event documented there; or regional evidence needed
                to interpret Salvadoran material. Neighboring countries and the Pacific maritime
                sphere appear only when that connection is concrete.
              </p>

              <h2 id="ontology">One graph, six record types</h2>
              <p>
                <strong>Places</strong> link to <strong>Periods</strong>, <strong>Cultures</strong>,
                and directly supporting <strong>Papers</strong>. Papers link to canonical
                <strong> Authors</strong> and credited <strong>Organizations</strong>. Organization
                records connect institutions to affiliated people, papers, places, and
                institutional lineages. Cultures include archaeological traditions and historical
                or ethnolinguistic groups, while preserving source-specific distinctions between
                material culture and ethnic identity. Backlinks supply the reverse relationships.
              </p>

              <h2 id="evidence">How to read the evidence</h2>
              <p>
                The corpus distinguishes direct observation, historical or oral reports, and later
                interpretation. Historical accounts and recorded traditions document what their
                authors or narrators reported. Place, date, and cultural relationships follow the
                cited sources.
              </p>
              <blockquote>
                Sources may use terms such as Maya, Pipil, Nahua, and Lenca for languages,
                archaeological classifications, or historical groups. Each graph record preserves
                the usage found in its cited sources.
              </blockquote>

              <h2 id="coordinates">Map coordinates</h2>
              <p>
                Public coordinates never imply more certainty than the source provides. Each marker
                is identified as source-published, tied to a public landmark, or approximate. A
                sensitive location may be generalized even when more precise information is known.
              </p>

              <h2 id="sources">Sources and machine text</h2>
              <p>
                Each local Paper preserves its original URL, checksum, PDF page count, and one-based
                page headings. Embedded text and multilingual OCR make the archive searchable, but
                they are discovery aids rather than editions. Verify names, dates, diacritics,
                tables, figures, and exact quotations against the archived PDF.
              </p>
              <p>
                <Link href="/">Explore the atlas</Link> or <Link href="/sources/places">browse the wiki</Link>.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
