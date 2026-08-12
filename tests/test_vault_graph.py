import tempfile
import unittest
from pathlib import Path

from tools.audit_vault_graph import audit_graph, canonical_target


class VaultGraphAuditTests(unittest.TestCase):
    def test_canonical_target_normalizes_markdown_suffix_and_separators(self) -> None:
        self.assertEqual(canonical_target(r"Places\example.md"), "Places/example")

    def test_components_resolve_qualified_and_unique_unqualified_links(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory)
            for collection in ("Places", "Periods", "Cultures", "Papers", "Authors"):
                (vault / collection).mkdir()
            (vault / "Places" / "one.md").write_text("[[Papers/source|Source]]")
            (vault / "Papers" / "source.md").write_text("[[writer]]")
            (vault / "Authors" / "writer.md").write_text("")
            (vault / "Places" / "orphan.md").write_text("")

            audit = audit_graph(vault)

        self.assertEqual(len(audit.nodes), 4)
        self.assertEqual(len(audit.edges), 2)
        self.assertEqual(tuple(map(len, audit.components)), (3, 1))
        self.assertEqual(audit.unresolved_typed_links, ())

    def test_broken_typed_link_is_reported(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory)
            for collection in ("Places", "Periods", "Cultures", "Papers", "Authors"):
                (vault / collection).mkdir()
            (vault / "Places" / "one.md").write_text("[[Papers/missing]]")

            audit = audit_graph(vault)

        self.assertEqual(
            audit.unresolved_typed_links,
            (("Places/one", "Papers/missing"),),
        )

    def test_qualified_link_does_not_fall_back_to_another_collection(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory)
            for collection in ("Places", "Periods", "Cultures", "Papers", "Authors"):
                (vault / collection).mkdir()
            (vault / "Places" / "one.md").write_text("[[Papers/missing]]")
            (vault / "Authors" / "missing.md").write_text("")

            audit = audit_graph(vault)

        self.assertEqual(len(audit.edges), 0)
        self.assertEqual(
            audit.unresolved_typed_links,
            (("Places/one", "Papers/missing"),),
        )


if __name__ == "__main__":
    unittest.main()
