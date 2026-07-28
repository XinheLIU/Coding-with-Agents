# CLAUDE.md

Last updated: 2026-07-28

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Two things living together:

1. **A bilingual Honkit/GitBook course** — *Stanford CS146S: The Modern Software Developer* — published from `book/`.
2. **An agent-authoring workspace** used to write, translate, and maintain that course. Reusable skills and sub-agents (for Claude Code and Codex) build the book skeleton, turn raw notes into chapters, and translate `en/` → `zh-cn/`.

Treat both as first-class: content edits follow the writing conventions below; changes to the authoring tools live under the agent-config directories.

## Rules

- **Do not commit or push to GitHub unless explicitly told to do so.**

## Repository Layout

```
raw/          # Research notes and rough material feeding the book (flat files)
wiki/         # Distilled cross-cutting concepts between raw/ and book/ (currently empty)
book/         # The published Honkit/GitBook course (en/ + zh-cn/)
.claude/      # Claude Code config: agents/ (sub-agents), skills/, settings
.agents/      # Canonical skill definitions (build-skeleton, book-chapter-writer, book-diagrams)
.codex/       # Codex agent config (agents/zh-translator.toml)
.github/      # CI — workflows/pages.yml deploys the book to GitHub Pages
```

All five levels now live under `book/en/` and `book/zh-cn/`. There is no
top-level `draft/` directory — Levels 4–5 are draft *quality*, but their
canonical home is already inside the language trees.

## Build and Preview

```bash
npm install       # install Honkit
npm run serve     # local preview at http://localhost:4000
npm run build     # static output to book/_book/
```

Config files: `book/book.json` (Honkit), `book/.gitbook.yaml` (GitBook.com).

## Book Structure

This is a bilingual Honkit/GitBook course — **Stanford CS146S: The Modern Software Developer**. All published content lives under `book/`. Each language tree mirrors the other:

```
book/
  en/          # English source (primary)
  zh-cn/       # Simplified Chinese translation
  styles/      # Custom CSS (website.css)
  book.json    # Honkit configuration
  LANGS.md     # Language index (en/ ↔ zh-cn/)
  .gitbook.yaml
```

Each language tree contains:
- `SUMMARY.md` — controls the left-nav hierarchy (must stay in sync with file moves)
- `README.md` — the landing/TOC page for that language
- `AGENTS.md` — writing conventions and content guidelines for that tree
- `01-prompt/` … `05-architect/` — the five levels
- `assets/` — images (PascalCase filenames, e.g. `Sync-Async-Coding-Agents.png`)
- `code/` — small example scripts referenced from chapters
- `templates/` — copy-paste artifacts (e.g. `AGENTS.md.template`)
- `RESOURCEs.md` — curated reading list organized by chapter

## Authoring Tools (skills & sub-agents)

The course is written with reusable agent tooling. When a task matches one of these, prefer it over improvising:

| Tool | Location | Use for |
|---|---|---|
| `build-skeleton` (skill) | `.agents/skills/` (canonical), `.claude/skills/` (pointer) | Chapter stubs, `SUMMARY.md` updates, renaming chapters, book structure |
| `book-chapter-writer` (skill) | `.agents/skills/` (canonical), `.claude/skills/` (pointer) | Turning `raw/` notes into structured chapters (dedupe, image placement, MECE split) |
| `book-diagrams` (skill) | `.agents/skills/` (canonical, self-contained), `.claude/skills/` (pointer) | Hand-authoring SVG diagrams for chapters (style derived from the existing family; bilingual asset copies) |
| `zh-translator` (sub-agent) | `.claude/agents/zh-translator.md`, `.codex/agents/zh-translator.toml` | Translating `book/en/` → `book/zh-cn/`; reads `en/`, never edits it |

- `.agents/skills/` holds the full skill bodies. The `.claude/skills/` copies are
  thin pointers that add repo-specific overrides — edit the canonical file for
  behavior changes, the pointer only for repo-specific rules.
- Keep `.codex/agents/zh-translator.toml` in sync with `.claude/agents/zh-translator.md`.
- The translator preserves markdown structure exactly (headings, code blocks, image refs, links, frontmatter) and only writes into `book/zh-cn/`.
- `build-skeleton`'s canonical body describes a generic mdBook/`book/src/` scaffold
  that does **not** match this repo (Honkit, `book/en/` + `book/zh-cn/`). Its
  `.claude/skills/` pointer documents the corrections — read that before acting on it.

## How the Book Is Organized

The book is a **five-level curriculum**. The organizing unit is a *level*, mapped one-to-one to a numbered folder; each level holds *chapters* (one markdown file each) plus a `README.md` that is both the level landing page and the reading-order guide.

```
Part → Level (NN-slug/ folder) → Chapter (topic.md)
```

| Level | Folder | Part |
| --- | --- | --- |
| 1. How to Prompt Coding Agents | `01-prompt/` | I: Working with Coding Agents |
| 2. Anatomy of Coding Agents | `02-anatomy/` | I: Working with Coding Agents |
| 3. Become a Power User | `03-power-user/` | II: Advanced Usage |
| 4. Team Development | `04-team/` | (Coming soon) |
| 5. Be an AI Architect | `05-architect/` | III: The Bigger Picture |

**Per-chapter status lives in [`ROADMAP.md`](ROADMAP.md) — the single source of
truth.** Read it before writing prose, and update it when a chapter's status
changes. Don't record status here or in `book/en/AGENTS.md`.

Naming: level folders are `NN-slug` (zero-padded, kebab-case); chapter files are `topic.md` (kebab-case, no number prefix — order comes from nav, not filename). Reading order and part groupings are **editorial**, so they live in the nav files, not in the filenames.

### The three nav layers (keep them consistent)

1. **`SUMMARY.md`** (per tree) — the GitBook/Honkit left-nav. Flat-ish tree: `## Part` headings group level entries; chapters are indented one level under their level. This is the file GitBook actually renders — a chapter absent here does not appear in the nav.
2. **Level `README.md`** — the authoritative reading order and narrative "why" for that level's chapters, with prev/next cross-links to sibling levels. Treat this as the source of truth for which chapters belong and in what order.
3. **Tree `README.md`** — the book landing/TOC page.

When these disagree, the level `README.md` reflects editorial intent; `SUMMARY.md` is what ships. Reconcile toward the README.

### Drift between the trees

The two trees are **not** currently mirrored. [`ROADMAP.md`](ROADMAP.md) records
exactly what diverges and what to do about it; two rules matter while working:

- **English is primary**, but Level 4 has three substantial zh-only chapters with
  no English counterpart. That's a gap in `en/`, not a reason to delete Chinese
  prose. Do not "fix" divergence by removing content.
- **Six images in `book/zh-cn/assets/` have no referrer.** Intentional — they're
  pre-placed for the pending Level 4 translations. Leave them.

Unfinished chapters stay on disk but are kept out of `SUMMARY.md` so they don't
publish as empty pages. Restoring a nav entry means the chapter graduated; update
`ROADMAP.md` in the same change.

### Chapter internal arc

Each chapter follows: **concept → principles/frameworks → practical patterns → anti-patterns/failure modes → references**. See `book/en/AGENTS.md` for the full spec.

### Invariants when organizing the book

Any structural change (add/rename/move/reorder a chapter or level) must update, in lockstep:

- `en/SUMMARY.md` **and** `zh-cn/SUMMARY.md`
- the affected level `README.md` (reading order + prev/next links) in both trees
- the tree `README.md` cross-links in both trees
- `RESOURCEs.md` if chapter numbering changes
- the root `README.md` if a level's status or path changes
- the root `ROADMAP.md` — chapter status, nav gate, and next steps

The English tree (`en/`) is primary; mirror into `zh-cn/` (use the `zh-translator` sub-agent for prose). Never renumber a level without sweeping all of the above.

## Content Conventions (from `book/en/AGENTS.md`)

**Source of truth for writing style is [`book/en/AGENTS.md`](book/en/AGENTS.md)** — read it before writing or restructuring chapter prose. The essentials are mirrored below.

### Writing Style
- Lead chapters with `# Level N: Title`; use `##` for major sections, `###` for subsections
- **Bold** key terms on first appearance; use tables for structured comparisons
- Blockquotes (`>`) for external citations; numbered lists for workflows, bullets for unordered
- Keep paragraphs short (2–4 sentences)
- No `#####` headers or deeper

### Images
- All images in `./assets/` with PascalCase filenames
- Reference from root: `![Alt](./assets/Filename.png)`; from subdirs: `![Alt](../assets/Filename.png)`

### Resources / Citations
- Inline citations: blockquote at the top of the relevant section
- Consolidated list in `RESOURCEs.md` — organized by chapter for cited resources, flat sections for uncited ones
- When adding a citation to an article, move the resource from its flat section into the chapter section

### Sync Between Language Trees
When changing chapter titles, navigation, or file names in `en/`:
1. Update `en/SUMMARY.md`
2. Mirror the change in `zh-cn/SUMMARY.md`
3. Keep cross-links consistent in both `README.md` files

### Key Terminology (use consistently)

| Term | Meaning |
|---|---|
| Coding agent | AI system that reads, writes, and executes code autonomously |
| Vibe coding | Iterative, conversation-driven development for exploration |
| Spec coding | Specification-first development for production work |
| Context engineering | Curating what information enters an agent's context window |
| Sub-agent | Scoped, temporary agent spawned for an isolated task |
| AGENTS.md | Persistent file providing conventions and constraints to coding agents |
| FIC | Frequent Intentional Compaction — compressing work state into durable artifacts |
| Best-of-N | Generating multiple agent solutions and selecting the best |
