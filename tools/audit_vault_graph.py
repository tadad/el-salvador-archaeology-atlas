#!/usr/bin/env python3
"""Report connected components in the typed Obsidian knowledge graph."""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_VAULT = ROOT / "vault"
COLLECTIONS = ("Places", "Periods", "Cultures", "Papers", "Authors")
WIKILINK = re.compile(r"!?\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]")


@dataclass(frozen=True)
class GraphAudit:
    nodes: tuple[str, ...]
    edges: tuple[tuple[str, str], ...]
    components: tuple[tuple[str, ...], ...]
    unresolved_typed_links: tuple[tuple[str, str], ...]


def canonical_target(value: str) -> str:
    """Normalize the file portion of an Obsidian wikilink target."""
    target = value.strip().replace("\\", "/")
    return target[:-3] if target.casefold().endswith(".md") else target


def audit_graph(vault: Path) -> GraphAudit:
    files = sorted(
        path
        for collection in COLLECTIONS
        for path in (vault / collection).glob("*.md")
    )
    relative = {
        path: path.relative_to(vault).with_suffix("").as_posix() for path in files
    }
    by_path = {name.casefold(): path for path, name in relative.items()}
    by_basename: dict[str, list[Path]] = defaultdict(list)
    for path, name in relative.items():
        by_basename[Path(name).name.casefold()].append(path)

    adjacency = {path: set() for path in files}
    unresolved: set[tuple[str, str]] = set()
    typed_prefixes = tuple(f"{collection.casefold()}/" for collection in COLLECTIONS)

    for source in files:
        for raw_target in WIKILINK.findall(source.read_text(errors="replace")):
            target = canonical_target(raw_target)
            destination = by_path.get(target.casefold())
            if destination is None and "/" not in target:
                candidates = by_basename.get(Path(target).name.casefold(), [])
                if len(candidates) == 1:
                    destination = candidates[0]
            if destination is not None:
                adjacency[source].add(destination)
                adjacency[destination].add(source)
            elif target.casefold().startswith(typed_prefixes):
                unresolved.add((relative[source], target))

    components: list[tuple[str, ...]] = []
    visited: set[Path] = set()
    for start in files:
        if start in visited:
            continue
        pending = [start]
        visited.add(start)
        component: list[str] = []
        while pending:
            current = pending.pop()
            component.append(relative[current])
            for destination in adjacency[current]:
                if destination not in visited:
                    visited.add(destination)
                    pending.append(destination)
        components.append(tuple(sorted(component)))

    components.sort(key=lambda component: (-len(component), component[0]))
    edges = sorted(
        (min(relative[source], relative[destination]), max(relative[source], relative[destination]))
        for source, destinations in adjacency.items()
        for destination in destinations
        if relative[source] < relative[destination]
    )
    return GraphAudit(
        nodes=tuple(sorted(relative.values())),
        edges=tuple(edges),
        components=tuple(components),
        unresolved_typed_links=tuple(sorted(unresolved)),
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--vault", type=Path, default=DEFAULT_VAULT)
    parser.add_argument(
        "--max-size",
        type=int,
        default=10,
        help="Print component membership at or below this size (default: 10)",
    )
    parser.add_argument("--json", action="store_true", help="Emit machine-readable JSON")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    audit = audit_graph(args.vault)
    if args.json:
        print(
            json.dumps(
                {
                    "node_count": len(audit.nodes),
                    "edge_count": len(audit.edges),
                    "component_count": len(audit.components),
                    "component_sizes": [len(component) for component in audit.components],
                    "components": [list(component) for component in audit.components],
                    "unresolved_typed_links": [list(item) for item in audit.unresolved_typed_links],
                },
                indent=2,
                ensure_ascii=False,
            )
        )
        return

    size_counts = Counter(map(len, audit.components))
    distribution = ", ".join(
        f"{size}×{count}" for size, count in sorted(size_counts.items(), reverse=True)
    )
    print(
        f"nodes={len(audit.nodes)} edges={len(audit.edges)} "
        f"components={len(audit.components)}"
    )
    print(f"component_sizes={distribution}")
    for index, component in enumerate(audit.components, start=1):
        if len(component) > args.max_size:
            continue
        print(f"\ncomponent={index} size={len(component)}")
        for node in component:
            print(f"  {node}")
    if audit.unresolved_typed_links:
        print("\nunresolved_typed_links:")
        for source, target in audit.unresolved_typed_links:
            print(f"  {source} -> {target}")


if __name__ == "__main__":
    main()
