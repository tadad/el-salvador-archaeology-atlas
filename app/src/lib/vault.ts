import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type LibraryKind = "papers" | "authors";

export type ContributorLink = {
  slug: string;
  name: string;
};

export type PaperRecord = {
  slug: string;
  title: string;
  authors: ContributorLink[];
  editors: ContributorLink[];
  translators: ContributorLink[];
  year: number | null;
  workType: string;
  languages: string[];
  collection: string;
  sourceUrl: string;
  pages: number;
  extractionStatus: string;
  body: string;
};

export type AuthorRecord = {
  slug: string;
  name: string;
  sortName: string;
  kind: string;
  aliases: string[];
};

export type AuthorPaper = {
  paper: PaperRecord;
  roles: string[];
};

type VaultIndex = {
  papers: PaperRecord[];
  authors: AuthorRecord[];
  papersBySlug: Map<string, PaperRecord>;
  authorsBySlug: Map<string, AuthorRecord>;
};

const collator = new Intl.Collator("es", { sensitivity: "base" });
let indexCache: VaultIndex | undefined;

function vaultRoot(): string {
  const candidates = [
    path.resolve(process.cwd(), "..", "vault"),
    path.resolve(process.cwd(), "vault"),
  ];
  const match = candidates.find((candidate) => fs.existsSync(path.join(candidate, "Papers")));
  if (!match) {
    throw new Error(`Could not locate the Obsidian vault from ${process.cwd()}`);
  }
  return match;
}

function markdownFiles(directory: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(directory, entry.name));
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function stripLeadingTitle(markdown: string): string {
  return markdown.replace(/^\s*# [^\n]+\n+/, "").trimStart();
}

function wikiContributor(value: string): ContributorLink | null {
  const match = value.match(/^\[\[Authors\/([^|\]]+)(?:\|([^\]]+))?\]\]$/);
  if (!match) return null;
  return { slug: match[1], name: match[2] || match[1] };
}

function contributors(value: unknown): ContributorLink[] {
  return strings(value)
    .map(wikiContributor)
    .filter((item): item is ContributorLink => item !== null);
}

function loadIndex(): VaultIndex {
  if (indexCache) return indexCache;

  const root = vaultRoot();
  const authors = markdownFiles(path.join(root, "Authors"))
    .map((filename): AuthorRecord => {
      const parsed = matter(fs.readFileSync(filename, "utf8"));
      return {
        slug: String(parsed.data.author_id || path.basename(filename, ".md")),
        name: String(parsed.data.name || path.basename(filename, ".md")),
        sortName: String(parsed.data.sort_name || parsed.data.name || ""),
        kind: String(parsed.data.author_kind || "person"),
        aliases: strings(parsed.data.aliases),
      };
    })
    .sort((left, right) => collator.compare(left.sortName, right.sortName));

  const papers = markdownFiles(path.join(root, "Papers"))
    .map((filename): PaperRecord => {
      const parsed = matter(fs.readFileSync(filename, "utf8"));
      const sourceUrl = String(parsed.data.source_url || "");
      let body = stripLeadingTitle(parsed.content);
      body = body
        .replaceAll("<!-- ocr:start -->", "")
        .replaceAll("<!-- ocr:end -->", "")
        .trim();
      if (sourceUrl) {
        body = body.replace(
          /\]\(<\.\.\/Attachments\/PDFs\/[^>]+>\)/g,
          () => `](${sourceUrl})`,
        );
      }
      body = body.replace(
        /\[\[Authors\/([^|\]]+)(?:\|([^\]]+))?\]\]/g,
        (_match, slug: string, label: string | undefined) =>
          `[${label || slug}](/sources/authors/${encodeURIComponent(slug)})`,
      );
      return {
        slug: String(parsed.data.paper_id || path.basename(filename, ".md")),
        title: String(parsed.data.title || path.basename(filename, ".md")),
        authors: contributors(parsed.data.authors),
        editors: contributors(parsed.data.editors),
        translators: contributors(parsed.data.translators),
        year: typeof parsed.data.publication_year === "number" ? parsed.data.publication_year : null,
        workType: String(parsed.data.work_type || "paper"),
        languages: strings(parsed.data.languages),
        collection: String(parsed.data.collection || "Unclassified"),
        sourceUrl,
        pages: Number(parsed.data.pages || 0),
        extractionStatus: String(parsed.data.extraction_status || "unknown"),
        body,
      };
    })
    .sort((left, right) => collator.compare(left.title, right.title));

  indexCache = {
    papers,
    authors,
    papersBySlug: new Map(papers.map((paper) => [paper.slug, paper])),
    authorsBySlug: new Map(authors.map((author) => [author.slug, author])),
  };
  return indexCache;
}

export function getPapers(): PaperRecord[] {
  return loadIndex().papers;
}

export function getAuthors(): AuthorRecord[] {
  return loadIndex().authors;
}

export function getPaper(slug: string): PaperRecord | undefined {
  return loadIndex().papersBySlug.get(slug);
}

export function getAuthor(slug: string): AuthorRecord | undefined {
  return loadIndex().authorsBySlug.get(slug);
}

export function getAuthorPapers(authorSlug: string): AuthorPaper[] {
  return getPapers()
    .map((paper) => {
      const roles = [
        paper.authors.some((author) => author.slug === authorSlug) ? "Author" : "",
        paper.editors.some((author) => author.slug === authorSlug) ? "Editor" : "",
        paper.translators.some((author) => author.slug === authorSlug) ? "Translator" : "",
      ].filter(Boolean);
      return { paper, roles };
    })
    .filter((entry) => entry.roles.length > 0);
}

export function getAuthorPaperCount(authorSlug: string): number {
  return getAuthorPapers(authorSlug).length;
}
