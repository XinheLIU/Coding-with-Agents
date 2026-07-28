# Coding with Agents

Last updated: 2026-07-27

A **GitBook-style course** on how software engineers work effectively in the age of AI coding agents. The material is organized as a five-level curriculum—from prompting and how agents work, through power-user patterns and team workflows, to architectural thinking about software in an agent-assisted world.

The project is framed around **Stanford CS146S** — *The Modern Software Developer* — and is published here as an open, GitBook-compatible notes collection.

Content moves through three layers: `raw/` (source notes and research) → `wiki/` (distilled cross-cutting concepts) → `book/` (the publishable course).

## Languages

The book is available in more than one language. Start from the landing page for your locale:

- **[English](book/en/README.md)** — full table of contents and module links  
- **[简体中文](book/zh-cn/README.md)** — Chinese edition entry point  

See [`LANGS.md`](book/LANGS.md) for the language index used by GitBook-style setups.

## Curriculum overview

| Level | Focus |
| --- | --- |
| 1 | Prompting coding agents: principles, `AGENTS.md`, workflow and time management |
| 2 | Anatomy of agents: how they work, autonomy, collaboration modes, Claude Code architecture, context management, sub-agents, skills/hooks/MCP |
| 3 | Power usage (planned): orchestration layer, engineering frameworks, spec coding, legacy codebases |
| 4 | Teams: specs as source of truth, shared context, review and testing at AI scale |
| 5 | Architecture: Software 3.0, builder mindset, future of software engineering |

Levels **1–5** live under `book/en/<level>/` and `book/zh-cn/<level>/` with their chapters.

## Writing status

Levels 1–2 are complete (Level 2 now includes the full Claude Code toolkit that
previously lived in Level 3). Level **3** has been re-scoped to genuine
power-user material — orchestration layer, engineering frameworks, spec coding —
and is not yet written. Level **4** is partly written and Level **5** is not yet
started; unfinished chapters live in the language trees but are kept out of the
navigation until they're readable.

**[`ROADMAP.md`](ROADMAP.md) is the single source of truth** for per-chapter
status, which `raw/` notes are still unprocessed, and what to write next.

- English: [`book/en/04-team/`](book/en/04-team/README.md), [`book/en/05-architect/`](book/en/05-architect/README.md)
- 简体中文: [`book/zh-cn/04-team/`](book/zh-cn/04-team/README.md), [`book/zh-cn/05-architect/`](book/zh-cn/05-architect/README.md)

## Resources and examples

- **Reading lists and links:** [English `RESOURCEs.md`](book/en/RESOURCEs.md) · [中文 `RESOURCEs.md`](book/zh-cn/RESOURCEs.md)  
- **Images:** `book/en/assets/` and `book/zh-cn/assets/`  
- **Code samples:** `book/en/code/` and `book/zh-cn/code/`  
- **Templates:** `book/en/templates/` (e.g. `AGENTS.md.template`)

## Build and preview locally

Prerequisites: [Node.js](https://nodejs.org/) (for Honkit).

```bash
npm install
npm run serve
```

Then open <http://localhost:4000> (Honkit default). Static output:

```bash
npm run build
```

Output is written to `book/_book/` by Honkit. GitBook.com configuration is in [`book/.gitbook.yaml`](book/.gitbook.yaml); Honkit uses [`book/book.json`](book/book.json).

## Contributing

Edits to the narrative should follow the voice, structure, and terminology guidelines in each language tree’s `AGENTS.md` where present. Keep English and Chinese trees aligned when you change titles or navigation so `SUMMARY.md` and cross-links stay consistent.
