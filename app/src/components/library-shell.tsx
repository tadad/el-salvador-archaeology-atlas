import Link from "next/link";
import type { ReactNode } from "react";
import {
  getAuthorPaperCount,
  getAuthors,
  getPapers,
  type LibraryKind,
} from "@/lib/vault";
import styles from "@/app/sources/library.module.css";

type LibraryShellProps = {
  kind: LibraryKind;
  activeSlug?: string;
  children: ReactNode;
};

export function LibraryShell({ kind, activeSlug, children }: LibraryShellProps) {
  const papers = getPapers();
  const authors = getAuthors();
  const records = kind === "papers" ? papers : authors;

  return (
    <main className={styles.libraryPage}>
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

      <div className={styles.libraryWorkspace}>
        <aside className={styles.catalogue}>
          <div className={styles.catalogueHeader}>
            <p className={styles.eyebrow}>Vault catalogue</p>
            <h1>Sources</h1>
            <nav className={styles.kindNav} aria-label="Browse source records">
              <Link aria-current={kind === "papers" ? "page" : undefined} href="/sources/papers">
                Papers <span>{papers.length}</span>
              </Link>
              <Link aria-current={kind === "authors" ? "page" : undefined} href="/sources/authors">
                Authors <span>{authors.length}</span>
              </Link>
            </nav>
          </div>

          <details className={styles.recordDrawer} open>
            <summary>
              Browse {records.length} {kind}
            </summary>
            <ol className={styles.recordList}>
              {kind === "papers"
                ? papers.map((paper, index) => (
                    <li key={paper.slug}>
                      <Link
                        aria-current={activeSlug === paper.slug ? "page" : undefined}
                        href={`/sources/papers/${encodeURIComponent(paper.slug)}`}
                      >
                        <span className={styles.recordNumber}>{String(index + 1).padStart(3, "0")}</span>
                        <span>
                          <strong>{paper.title}</strong>
                          <small>
                            {paper.year || "Undated"}
                            {paper.authors[0] ? ` · ${paper.authors[0].name}` : ""}
                          </small>
                        </span>
                      </Link>
                    </li>
                  ))
                : authors.map((author, index) => {
                    const paperCount = getAuthorPaperCount(author.slug);
                    return (
                      <li key={author.slug}>
                        <Link
                          aria-current={activeSlug === author.slug ? "page" : undefined}
                          href={`/sources/authors/${encodeURIComponent(author.slug)}`}
                        >
                          <span className={styles.recordNumber}>{String(index + 1).padStart(3, "0")}</span>
                          <span>
                            <strong>{author.name}</strong>
                            <small>
                              {author.kind} · {paperCount} paper{paperCount === 1 ? "" : "s"}
                            </small>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
            </ol>
          </details>
        </aside>

        <section className={styles.reader}>{children}</section>
      </div>
    </main>
  );
}
