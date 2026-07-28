---
name: build-skeleton
description: |
  Chapter stubs, SUMMARY.md updates, renaming or moving chapters, and book
  structure work for the CS146S course. Use when the user wants to scaffold a
  new level or chapter, reorder navigation, rename a chapter, or understand
  the repository's content layout. Trigger on "add a chapter", "new level",
  "update SUMMARY", "rename chapter", "build skeleton", or any request about
  the book's directory structure.
---

# Build Skeleton

Scaffolds and maintains the bilingual Honkit/GitBook course structure under
`book/`.

```
Layer 1 (Raw)   →   Layer 2 (Wiki)   →   Layer 3 (Book)
./raw/               ./wiki/               ./book/
```

`book/` is published; `raw/` and `wiki/` feed it and are not directly built.

## Book layout

```
book/
  en/          # English source (primary)
  zh-cn/       # Simplified Chinese translation (mirrors en/)
  styles/      # Custom CSS (website.css)
  book.json    # Honkit configuration
  LANGS.md     # Language index (en/ ↔ zh-cn/)
  .gitbook.yaml
```

Each language tree contains:

```
en/ (or zh-cn/)
  SUMMARY.md          # left-nav hierarchy — source of truth for TOC
  README.md           # landing/TOC page for that language
  AGENTS.md           # writing conventions for that tree
  RESOURCEs.md         # curated reading list, organized by chapter
  01-prompt/ … 05-architect/   # the five levels
    README.md         # level landing page + reading order
    topic.md           # one file per chapter
  assets/             # images, PascalCase filenames
  code/               # example scripts referenced from chapters
  templates/          # copy-paste artifacts (e.g. AGENTS.md.template)
```

The five levels (folder → part):

| Level | Folder |
|---|---|
| 1. How to Prompt Coding Agents | `01-prompt/` |
| 2. Anatomy of Coding Agents | `02-anatomy/` |
| 3. Become a Power User | `03-power-user/` |
| 4. Team Development | `04-team/` |
| 5. Be an AI Architect | `05-architect/` |

Naming: level folders are `NN-slug` (zero-padded, kebab-case); chapter files
are `topic.md` (kebab-case, no number prefix — order comes from nav, not
filename).

## Adding or scaffolding a chapter

1. Create `book/en/0N-level/topic.md` with a stub or full draft (see "Chapter
   internal arc" below).
2. Add the entry to `book/en/SUMMARY.md` under the right `## Part` heading,
   indented under its level.
3. Update `book/en/0N-level/README.md` — reading order + prev/next links.
4. Update `book/en/README.md` cross-links if the TOC changed.
5. Mirror steps 1–4 into `zh-cn/` (use the `zh-translator` sub-agent for
   prose translation; `SUMMARY.md`/`README.md` edits are structural, do them
   directly).
6. Update `book/en/RESOURCEs.md` (and `zh-cn/RESOURCEs.md`) if chapter
   numbering changed.
7. Update the root `README.md` if a level's status or path changed.
8. Update the root `ROADMAP.md` — chapter status, nav gate, next steps.

A chapter that isn't ready to publish stays on disk but is left out of
`SUMMARY.md` so it doesn't ship as an empty page.

## Structural invariants

Any add / rename / move / reorder must update these in lockstep:

- `book/en/SUMMARY.md` **and** `book/zh-cn/SUMMARY.md`
- the affected level `README.md` (reading order + prev/next links) in both trees
- the tree `README.md` cross-links in both trees
- `RESOURCEs.md` in both trees if chapter numbering changes
- the root `README.md` if a level's status or path changes
- the root `ROADMAP.md` — chapter status, nav gate, next steps

When `SUMMARY.md` and a level `README.md` disagree, the `README.md` reflects
editorial intent — reconcile `SUMMARY.md` toward it.

## Chapter internal arc

Each chapter follows: **concept → principles/frameworks → practical
patterns → anti-patterns/failure modes → references**.

## Key conventions

- Lead chapters with `# Level N: Title`; `##` for major sections, `###` for
  subsections. No `#####` or deeper.
- **Bold** key terms on first appearance; tables for structured comparisons.
- Blockquotes (`>`) for external citations; numbered lists for workflows,
  bullets for unordered content. Keep paragraphs short (2–4 sentences).
- Images: PascalCase filenames in `./assets/`, referenced as
  `./assets/Name.png` from the tree root or `../assets/Name.png` from a level
  subdirectory.
- Resources cited in a chapter must appear under that chapter's section in
  `RESOURCEs.md`; uncited resources live in flat (non-chapter) sections.
- No boilerplate ("In this section we will discuss..."), no invented
  references.
- Audience: engineers who code, may be new to working with coding agents.
  Direct, practical voice.

## Build and verify

```bash
npm install       # install Honkit
npm run serve     # local preview at http://localhost:4000
npm run build     # static output to book/_book/
```

Run `npm run build` after any structural change to verify it compiles.
