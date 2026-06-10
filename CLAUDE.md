# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- **Do not commit or push to GitHub unless explicitly told to do so.**

## Repository Layout

raw/          # Future: raw notes, research materials
wiki/         # Future: wiki-style documentation
book/         # The Honkit/GitBook course — Stanford CS146S

## Build and Preview

```bash
npm install       # install Honkit
npm run serve     # local preview at http://localhost:4000
npm run build     # static output to book/_book/
```

Config files: `book/book.json` (Honkit), `book/.gitbook.yaml` (GitBook.com).

## Book Structure

This is a bilingual Honkit/GitBook course — **Stanford CS146S: The Modern Software Developer**. All book content lives under `book/`. Each language tree mirrors the other:

```
book/
  en/          # English source (primary)
  zh-cn/       # Simplified Chinese translation
  draft/       # WIP chapters (Levels 4–5) before promotion into en/ and zh-cn/
  styles/      # Custom CSS (website.css)
  book.json    # Honkit configuration
  LANGS.md     # Language index (en/ ↔ zh-cn/)
  .gitbook.yaml
```

Each language tree contains:
- `SUMMARY.md` — controls the left-nav hierarchy (must stay in sync with file moves)
- `README.md` — the landing/TOC page for that language
- `AGENTS.md` — writing conventions and content guidelines for that tree
- `01-prompt/`, `02-anatomy/`, `03-power-user/` — completed levels
- `assets/` — images (PascalCase filenames, e.g. `Sync-Async-Coding-Agents.png`)
- `code/` — small example scripts referenced from chapters
- `templates/` — copy-paste artifacts (e.g. `AGENTS.md.template`)
- `RESOURCEs.md` — curated reading list organized by chapter

Draft levels 4 and 5 live under `book/draft/en/` and `book/draft/zh-cn/` until promoted.

## Content Conventions (from `book/en/AGENTS.md`)

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
