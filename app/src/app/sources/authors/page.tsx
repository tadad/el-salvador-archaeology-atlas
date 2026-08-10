import type { Metadata } from "next";
import { LibraryShell } from "@/components/library-shell";
import { getAuthors } from "@/lib/vault";
import styles from "../library.module.css";

export const metadata: Metadata = {
  title: "Authors | El Salvador Archaeology Atlas",
  description: "Browse the people and organizations credited by the El Salvador archaeology vault.",
};

export default function AuthorsIndexPage() {
  const authors = getAuthors();
  const people = authors.filter((author) => author.kind === "person").length;

  return (
    <LibraryShell kind="authors">
      <div className={styles.indexPage}>
        <p className={styles.eyebrow}>The author record</p>
        <h2>{authors.length} credited contributors.</h2>
        <p className={styles.indexLead}>
          People and institutions are reconciled into canonical records, while attested spelling and
          catalogue variants remain visible as aliases.
        </p>
        <dl className={styles.indexStats}>
          <div>
            <dt>People</dt>
            <dd>{people}</dd>
          </div>
          <div>
            <dt>Organizations</dt>
            <dd>{authors.length - people}</dd>
          </div>
          <div>
            <dt>Total records</dt>
            <dd>{authors.length}</dd>
          </div>
        </dl>
        <p className={styles.indexInstruction}>Choose an author to see every linked paper and role.</p>
      </div>
    </LibraryShell>
  );
}
