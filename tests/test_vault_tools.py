import copy
import json
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

from tools.build_vault_ontology import render_creator_note, render_paper_note, validate
from tools.convert_pdfs_to_markdown import (
    OCR_END,
    OCR_START,
    embedded_pages,
    main,
    normalize_prior_record,
    ocr_enabled,
    replace_generated_region,
    retained_prior_records,
    should_replace_page,
    verify_catalog_hash,
)


ROOT = Path(__file__).resolve().parents[1]


class ConverterSafetyTests(unittest.TestCase):
    def test_ocr_mode_can_force_replacement_of_usable_embedded_text(self) -> None:
        self.assertTrue(ocr_enabled("always"))
        self.assertTrue(ocr_enabled("auto"))
        self.assertFalse(ocr_enabled("never"))
        self.assertTrue(should_replace_page("always", "long embedded text", "OCR"))
        self.assertFalse(should_replace_page("auto", "long embedded text", "OCR"))
        self.assertFalse(should_replace_page("always", "embedded", ""))

    def test_forced_ocr_requires_tessdata(self) -> None:
        args = Mock(ocr="always", tessdata=Path("/definitely/missing/tessdata"))
        with patch("tools.convert_pdfs_to_markdown.parse_args", return_value=args):
            with self.assertRaisesRegex(SystemExit, "OCR data directory does not exist"):
                main()

    def test_embedded_text_uses_reading_order_instead_of_physical_layout(self) -> None:
        completed = Mock(returncode=0, stdout="left\nright\f", stderr="")
        with patch("tools.convert_pdfs_to_markdown.command", return_value=completed) as run:
            pages, warning = embedded_pages(Path("paper.pdf"), 1)

        self.assertEqual(pages, ["left\nright"])
        self.assertEqual(warning, "")
        run.assert_called_once_with(
            ["pdftotext", "-enc", "UTF-8", "paper.pdf", "-"], timeout=900
        )

    def test_generated_region_preserves_content_on_both_sides(self) -> None:
        existing = (
            f"# Paper\n\n## Notes\n\nKeep before.\n\n{OCR_START}\nOLD\n{OCR_END}"
            "\n\n## Analysis\n\nKeep after."
        )
        rendered = replace_generated_region(existing, "Paper", "NEW")
        self.assertIn("Keep before.", rendered)
        self.assertIn("Keep after.", rendered)
        self.assertIn("NEW", rendered)
        self.assertNotIn("OLD", rendered)

    def test_ambiguous_marker_states_fail_closed(self) -> None:
        invalid = [
            "human-authored unmarked body",
            f"{OCR_START}\nmissing end",
            f"{OCR_END}\n{OCR_START}",
            f"{OCR_START}\none\n{OCR_END}\n{OCR_START}\ntwo\n{OCR_END}",
        ]
        for existing in invalid:
            with self.subTest(existing=existing):
                with self.assertRaises(ValueError):
                    replace_generated_region(existing, "Paper", "NEW")

    def test_manifest_reconciliation_prunes_on_full_run(self) -> None:
        live = "vault/Attachments/PDFs/fundar/live.pdf"
        removed = "vault/Attachments/PDFs/fundar/removed.pdf"
        prior = {
            live: {"source_path": live, "output_path": "README.md"},
            removed: {"source_path": removed, "output_path": "vault/Papers/removed.md"},
        }
        self.assertEqual(retained_prior_records(prior, set(), {live}, False), [])
        retained = retained_prior_records(prior, set(), {live}, True)
        self.assertEqual([row["source_path"] for row in retained], [live])

    def test_legacy_manifest_paths_are_normalized_before_retention(self) -> None:
        normalized = normalize_prior_record(
            {
                "source_path": "sources/fundar/example.pdf",
                "output_path": "sources/markdown/example/example.md",
                "source_link": "../../fundar/example.pdf",
            }
        )
        self.assertEqual(
            normalized["source_path"],
            "vault/Attachments/PDFs/fundar/example.pdf",
        )
        self.assertEqual(normalized["output_path"], "vault/Papers/example.md")
        self.assertEqual(
            normalized["source_link"],
            "../Attachments/PDFs/fundar/example.pdf",
        )

    def test_catalog_hash_mismatch_fails(self) -> None:
        with self.assertRaisesRegex(ValueError, "catalog SHA-256"):
            verify_catalog_hash({"sha256": "a" * 64}, "b" * 64)
        verify_catalog_hash({"sha256": "a" * 64}, "a" * 64)


class OntologySafetyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        data = ROOT / "tmp" / "data"
        required = {
            "records": data / "text-extraction-manifest.json",
            "authors": data / "authors.json",
            "relations": data / "paper-authors.json",
            "metadata": data / "paper-metadata.json",
        }
        if missing := [path for path in required.values() if not path.exists()]:
            raise unittest.SkipTest(f"local tmp/data registries unavailable: {missing}")
        for name, path in required.items():
            setattr(cls, name, json.loads(path.read_text()))

    def test_current_registries_validate(self) -> None:
        self.assertEqual(validate(self.records, self.authors, self.relations, self.metadata), [])

    def test_corporate_creator_renders_as_an_organization(self) -> None:
        organization = {
            "id": "museum",
            "name": "Example Museum",
            "sort_name": "Example Museum",
            "kind": "organization",
            "aliases": [],
        }
        rendered = render_creator_note(organization)
        self.assertIn('type: "organization"', rendered)
        self.assertIn('organization_id: "museum"', rendered)
        self.assertIn("ontology_managed: true", rendered)
        self.assertNotIn("author_id:", rendered)

    def test_semantic_registry_errors_are_rejected(self) -> None:
        cases = []
        relations = copy.deepcopy(self.relations)
        relations[next(iter(relations))]["creator_raw"] = "WRONG"
        cases.append((self.authors, relations, self.metadata))
        authors = copy.deepcopy(self.authors)
        authors[0]["kind"] = "dragon"
        cases.append((authors, self.relations, self.metadata))
        metadata = copy.deepcopy(self.metadata)
        metadata[next(iter(metadata))]["work_type"] = "banana"
        cases.append((self.authors, self.relations, metadata))
        for authors, relations, metadata in cases:
            with self.subTest():
                self.assertTrue(validate(self.records, authors, relations, metadata))

    def test_removed_optional_fields_do_not_survive(self) -> None:
        existing = f'''---
editors:
  - "[[Authors/old|Old Editor]]"
translators:
  - "[[Authors/old|Old Translator]]"
publication_date: 2001-01-01
ocr_dpi: 300
sites:
  - "[[Sites/test]]"
---
# Example

## Notes

Keep me.

{OCR_START}
## Provenance
{OCR_END}
'''
        record = {
            "output_path": "vault/Papers/example.md",
            "title": "Example",
            "source_path": "vault/Attachments/PDFs/fundar/example.pdf",
            "source_url": "",
            "source_sha256": "a" * 64,
            "pages": 1,
            "status": "complete",
            "embedded_pages": 1,
            "ocr_pages": 0,
            "empty_pages": 0,
            "ocr_mode": "never",
            "ocr_language": "",
            "generated": "2026-08-10",
        }
        relation = {
            "creator_raw": "Example Author",
            "authors": ["example"],
            "editors": [],
            "translators": [],
        }
        metadata = {
            "publication_year": 2000,
            "publication_date": None,
            "work_type": "article",
            "languages": ["es"],
            "collection": "FUNDAR",
        }
        authors = {"example": {"id": "example", "name": "Example Author", "kind": "person"}}
        rendered = render_paper_note(record, relation, metadata, authors, existing)
        for stale in ("editors:", "translators:", "publication_date:", "ocr_dpi:"):
            self.assertNotIn(stale, rendered)
        self.assertIn("sites:", rendered)
        self.assertIn("Keep me.", rendered)


if __name__ == "__main__":
    unittest.main()
