---
name: book-chapter-writer
description: "Turn raw/ notes into structured course chapters. Use when the user needs to clean up and restructure markdown notes into book chapters, with tasks including: (1) reorganizing loosely-organized notes, (2) removing repeated concepts and redundant examples, (3) inserting images at appropriate locations based on descriptive filenames, (4) creating a consolidated chapter or a MECE split with a README.md index, (5) applying this book's markdown conventions."
---

# Book Chapter Writer

The canonical workflow lives in
[`.agents/skills/book-chapter-writer/SKILL.md`](../../../.agents/skills/book-chapter-writer/SKILL.md),
with organization heuristics in
[`references/organization-principles.md`](../../../.agents/skills/book-chapter-writer/references/organization-principles.md).
Read those first, then apply the repo-specific rules below.

## Where content comes from and goes

- **Source:** `raw/*.md` — loose research notes and drafts.
- **Destination:** `book/en/<NN-slug>/<topic>.md` (English is primary).
- **Never** write Chinese prose directly. Mirror into `book/zh-cn/` with the
  `zh-translator` sub-agent.

## Style rules that override the canonical file

Full style rules — voice, formatting, image placement, citations, chapter
arc, and terminology — are in
[`references/style-guide.md`](references/style-guide.md). Read it before
writing or restructuring chapter prose.

## After writing

A new or renamed chapter is invisible until navigation is updated. Hand off to
`build-skeleton`, or update both `SUMMARY.md` files and the level `README.md`
in both trees yourself, then run `npm run build`.
