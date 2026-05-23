#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
DATA_FILE = SITE / "data.js"
CONTENT_ROOTS = ["Dynamic-programming", "Graph", "List", "Tree", "Union-find"]


def humanize(value: str) -> str:
    value = value.removesuffix(".md")
    value = value.replace("._", ". ")
    value = value.replace("_", " ")
    value = value.replace("-", " ")
    return re.sub(r"\s+", " ", value).strip()


def extract_problem_number(filename: str) -> int | None:
    match = re.match(r"^(\d+)\._", filename)
    return int(match.group(1)) if match else None


def extract_links(markdown: str) -> list[str]:
    links = re.findall(r"https?://[^\s)\]]+", markdown)
    return sorted(set(link.rstrip(".,") for link in links))


def first_meaningful_line(markdown: str, fallback: str) -> str:
    for line in markdown.splitlines():
        text = line.strip().strip("#").strip()
        if text and text != "README.md" and not text.startswith("```"):
            return text
    return fallback


def build_notes() -> list[dict[str, object]]:
    notes: list[dict[str, object]] = []
    for root_name in CONTENT_ROOTS:
        for path in sorted((ROOT / root_name).rglob("*.md")):
            rel = path.relative_to(ROOT)
            markdown = path.read_text(encoding="utf-8")
            parts = rel.parts
            topic = humanize(parts[0])
            section = humanize(parts[1]) if len(parts) > 2 else "Overview"
            is_overview = path.name == "README.md"
            fallback = "Overview" if is_overview and section == "Overview" else f"{section} Overview" if is_overview else humanize(path.name)
            title = first_meaningful_line(markdown, fallback)
            problem_number = extract_problem_number(path.name)
            code_blocks = markdown.count("```") // 2
            links = extract_links(markdown)
            notes.append(
                {
                    "id": str(rel),
                    "path": str(rel),
                    "topic": topic,
                    "section": section,
                    "title": title,
                    "displayTitle": fallback if is_overview else humanize(path.name),
                    "problemNumber": problem_number,
                    "isOverview": is_overview,
                    "hasCode": "```" in markdown,
                    "codeBlocks": code_blocks,
                    "links": links,
                    "markdown": markdown,
                }
            )
    return notes


def main() -> None:
    notes = build_notes()
    payload = {
        "generatedAt": "local",
        "notes": notes,
    }
    DATA_FILE.write_text(
        "window.LEETCODE_NOTES = "
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {DATA_FILE.relative_to(ROOT)} with {len(notes)} notes")


if __name__ == "__main__":
    main()
