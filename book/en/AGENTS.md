# AGENTS.md

Last updated: 2026-07-28

## Project Overview

This repository is a **GitBook-style online book** based on Stanford's CS146S course, "The Modern Software Developer." It teaches software engineers how to work effectively in the age of AI coding agents. The book is structured as a progressive five-level curriculum — from beginner prompting skills through team workflows to architectural thinking.

## Key Context

- **`resources.md`** — The curated reading list for the book. Follow this structure rule when editing it:
  - If a resource URL is already cited inside an article (`> [Title](url)` blockquote or inline), list it under its chapter section: `## 0N Chapter-Name` → `### Article Title` → plain link.
  - If a resource is not yet cited in any article, leave it in its existing flat section (`## LLM Basics`, `## MCP`, `## Security`, etc.) — these are the reading list for articles not yet written.
  - When you add a new citation to an article, move the corresponding resource from its flat section into the chapter section.

## Book Structure

The book follows a numbered-level progression. Each level is a folder with sub-chapters:

| Folder | Chapter |
|---|---|
| `README.md` | Book landing page and table of contents |
| `01-prompt/` | Level 1 — Prompting fundamentals |
| `02-anatomy/` | Level 2 — How agents work, autonomy levels, collaboration modes, Claude Code architecture, context management, sub-agents, skills/hooks/MCP, systematic thinking |
| `03-power-user/` | Level 3 — (planned) Orchestration layer, engineering frameworks, spec coding, legacy codebases |
| `04-team/` | Level 4 — Team context, specs-as-code, code review at AI scale |
| `05-architect/` | Level 5 — Software 3.0, builder's mindset, future of SE |
| `RESOURCEs.md` | Curated reading list organized by chapter |

Per-chapter completion status and what to write next live in
[`ROADMAP.md`](../../ROADMAP.md) at the repo root — the single source of truth.
Do not track status here. Chapters at `stub` quality are kept on disk but left
out of `SUMMARY.md` so they don't publish as empty pages.

Supporting files:
- `assets/` — images referenced by chapters (PNG diagrams, screenshots, hand-authored SVG diagrams)
- `code/` — small example scripts (`simple_coding_agent.py`, `simple_mcp.py`)
- `templates/` — copy-paste artifacts (e.g. `AGENTS.md.template`) referenced by chapters
- `SUMMARY.md` — GitBook table of contents (controls left-nav hierarchy)

## Content Conventions

### Voice and Audience

- **Audience:** Software engineers (junior to senior) learning to integrate AI agents into their workflow. Assume the reader codes professionally but may be new to AI-assisted development.
- **Voice:** Direct, practical, opinionated. Teach by principle first, then support with concrete examples and tables. Avoid filler and academic hedging.
- **Perspective:** Second person ("you") when giving guidance. Third person when describing systems or patterns.

### Writing Style

- Lead each chapter with `# Level N: Title`.
- Use `##` for major topic sections, `###` for subsections, `####` sparingly.
- **Bold** key terms and concept names on first appearance.
- Use tables for structured comparisons (e.g., autonomy levels, responsibility splits, failure patterns).
- Use blockquotes (`>`) for references, citations, and links to external source material.
- Use numbered lists for sequential workflows; bullet points for unordered items.
- Keep paragraphs short (2–4 sentences). Prefer bullets and tables over long prose.
- Horizontal rules (`---`) separate major sections within a chapter.

### Image References

- All images live in `./assets/` with descriptive PascalCase filenames (e.g., `Sync-Async-Coding-Agents.png`).
- Insert images with alt text matching the concept. From root: `![Alt](./assets/Filename.png)`. From subdirs (e.g. `01-prompt/`): `![Alt](../assets/Filename.png)`.
- Place images after introducing the concept they illustrate.
- Hand-authored SVG diagrams (concept flows, contrasts, taxonomies) follow the `book-diagrams` skill (`.agents/skills/book-diagrams/`, self-contained): one diagram answers one question, alt text states that question, style is derived from the existing diagram family, and the zh tree gets a translated same-filename copy.

### Reference and Citation Style

- External references go in a blockquote at the top of the section they support:
  ```
  > [Title of Resource](https://url)
  ```
- A consolidated list of all references lives in `resources.md`, organized by chapter number.
- At the bottom of a chapter, a `## Reference` section may link to the primary sources used.

### Code Examples

- Small inline code uses backticks.
- Code blocks use fenced markdown with language tags (` ```python `, ` ```bash `).
- Longer example scripts go in `code/` and are referenced from the chapter text.

## Chapter Content Guidelines

Each chapter generally follows this arc:

1. **Conceptual foundation** — What is the topic and why does it matter?
2. **Principles and frameworks** — Mental models, decision tables, rules of thumb.
3. **Practical patterns** — Battle-tested workflows from real companies (OpenAI, Anthropic, etc.).
4. **Anti-patterns / failure modes** — What goes wrong and how to prevent it.
5. **References** — Links to source material.

Avoid duplicating content across chapters. If a concept spans levels (e.g., AGENTS.md appears in Level 1 and Level 2), introduce it once and cross-reference.

## What NOT to Do

- Do not add boilerplate or filler text ("In this section we will discuss...").
- Do not include raw unprocessed lecture transcripts — always restructure into the conventions above.
- Do not create deeply nested header hierarchies (no `#####` or beyond).
- Do not duplicate images; reference the same asset file from multiple chapters if needed.
- Do not invent facts or fabricate references — every cited link should be real.
- Do not change existing chapter numbering without updating `README.md`, `SUMMARY.md`, and `resources.md`.

## Key Terminology

Use these terms consistently throughout the book:

| Term | Meaning |
|---|---|
| Coding agent | An AI system that can read, write, and execute code autonomously (e.g., Cursor, Claude Code, Devin, Codex) |
| Vibe coding | Iterative, conversation-driven development for exploration and prototyping |
| Spec coding | Structured, specification-first development for production work |
| Context engineering | The practice of curating what information enters an agent's context window |
| Sub-agent | A scoped, temporary agent spawned for an isolated task with its own context and permissions |
| AGENTS.md | A persistent file that provides conventions and constraints to coding agents |
| FIC | Frequent Intentional Compaction — continuously compressing work state into durable artifacts |
| Best-of-N | Generating multiple agent solutions and having a human select/merge the best |

## Build and Preview

- **Local dev:** `npm run serve` (Honkit) → http://localhost:4000
- **Build:** `npm run build` → static output in `_book/`
- Config: `.gitbook.yaml` (GitBook.com), `book.json` (Honkit)
