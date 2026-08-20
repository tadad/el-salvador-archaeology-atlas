import tempfile
import unittest
from datetime import date
from pathlib import Path

from tools.discover_web_sources import (
    VaultInventory,
    build_vault_inventory,
    candidate_in_date_range,
    canonical_url,
    dspace_candidate,
    evidence_terms,
    normalized_text,
    review_priority,
    wordpress_candidate,
)


class WebSourceDiscoveryTests(unittest.TestCase):
    def test_canonical_url_ignores_scheme_www_and_trailing_slash(self) -> None:
        self.assertEqual(
            canonical_url("https://www.cultura.gob.sv/example/"),
            canonical_url("http://cultura.gob.sv/example"),
        )

    def test_matching_is_accent_insensitive(self) -> None:
        terms, score = evidence_terms("Excavación de un sitio arqueológico prehispánico")
        self.assertIn("excavacion", terms)
        self.assertIn("sitio arqueologico", terms)
        self.assertIn("prehispanico", terms)
        self.assertGreaterEqual(score, 10)

    def test_priority_separates_discovery_pool_from_review_queue(self) -> None:
        self.assertEqual(review_priority("needs_review", 8), "high")
        self.assertEqual(review_priority("needs_review", 3), "medium")
        self.assertEqual(review_priority("needs_review", 2), "low")
        self.assertEqual(review_priority("represented_by_url", 20), "represented")

    def test_since_filters_partial_repository_dates_by_month(self) -> None:
        candidate = dspace_candidate(
            {
                "uuid": "abc",
                "name": "Sample",
                "metadata": {
                    "dc.title": [{"value": "Sample"}],
                    "dc.date.issued": [{"value": "2019-08"}],
                },
            },
            "utec",
            "arqueologia",
            VaultInventory(urls={}, paper_titles={}),
        )
        self.assertFalse(candidate_in_date_range(candidate, date(2019, 9, 1)))
        self.assertTrue(candidate_in_date_range(candidate, date(2019, 8, 15)))

    def test_inventory_finds_urls_and_paper_titles(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory)
            papers = vault / "Papers"
            papers.mkdir()
            (papers / "sample.md").write_text(
                '---\ntitle: "Investigación de Pacún"\n---\nhttps://example.org/source/\n'
            )
            inventory = build_vault_inventory(vault)
        self.assertIn("example.org/source", inventory.urls)
        self.assertIn(normalized_text("Investigación de Pacún"), inventory.paper_titles)

    def test_wordpress_candidate_checks_body_and_existing_url(self) -> None:
        inventory = VaultInventory(
            urls={"cultura.gob.sv/sample": ("Places/sample.md",)}, paper_titles={}
        )
        item = {
            "id": 42,
            "date": "2026-01-01T10:00:00",
            "modified": "2026-01-02T10:00:00",
            "link": "https://www.cultura.gob.sv/sample/",
            "title": {"rendered": "Obras en una escuela"},
            "excerpt": {"rendered": ""},
            "content": {"rendered": "<p>En 1985 hubo un hallazgo arqueológico y un entierro.</p>"},
        }
        candidate = wordpress_candidate(item, "hallazgo", inventory)
        self.assertEqual(candidate.review_status, "represented_by_url")
        self.assertIn("hallazgo arqueologico", candidate.matched_terms)
        self.assertIn("entierro", candidate.matched_terms)

    def test_dspace_candidate_matches_an_existing_paper_title(self) -> None:
        title = "La Pintada: un sitio patrimonial en riesgo de desaparición"
        inventory = VaultInventory(
            urls={}, paper_titles={normalized_text(title): ("Papers/la-pintada.md",)}
        )
        item = {
            "uuid": "abc",
            "name": title,
            "metadata": {
                "dc.title": [{"value": title}],
                "dc.identifier.uri": [{"value": "http://hdl.handle.net/11298/1"}],
                "dc.date.issued": [{"value": "2010"}],
                "dc.description.abstract": [{"value": "Un estudio arqueológico."}],
            },
        }
        candidate = dspace_candidate(item, "utec", "arqueologia", inventory)
        self.assertEqual(candidate.review_status, "represented_by_title")
        self.assertEqual(candidate.vault_matches, ["Papers/la-pintada.md"])

    def test_dspace_candidate_scores_fallback_name_without_metadata(self) -> None:
        candidate = dspace_candidate(
            {"uuid": "abc", "name": "Nuevo sitio arqueológico"},
            "utec",
            "arqueologia",
            VaultInventory(urls={}, paper_titles={}),
        )
        self.assertEqual(candidate.title, "Nuevo sitio arqueológico")
        self.assertGreater(candidate.score, 0)


if __name__ == "__main__":
    unittest.main()
