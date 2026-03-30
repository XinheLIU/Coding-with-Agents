# Coding with Agents

A **GitBook-style course** on how software engineers work effectively in the age of AI coding agents. The material is organized as a five-level curriculum—from prompting and how agents work, through power-user patterns and team workflows, to architectural thinking about software in an agent-assisted world.

The project is framed around **Stanford CS146S** — *The Modern Software Developer* — and is published here as an open, GitBook-compatible notes collection.

## Languages

The book is available in more than one language. Start from the landing page for your locale:

- **[English](en/README.md)** — full table of contents and module links  
- **[简体中文](zh-cn/README.md)** — Chinese edition entry point  

See [`LANGS.md`](LANGS.md) for the language index used by GitBook-style setups.

## Curriculum overview

| Level | Focus |
| --- | --- |
| 1 | Prompting coding agents: principles, `AGENTS.md`, workflow and time management |
| 2 | Anatomy of agents: tools, autonomy, vibe vs spec coding, failure patterns |
| 3 | Power usage: context engineering, sub-agents, workflows, tools, security |
| 4 | Teams: specs as source of truth, shared context, review and testing at AI scale |
| 5 | Architecture: Software 3.0, builder mindset, future of software engineering |

Levels **1–3** live under `en/<level>/` and `zh-cn/<level>/` with their chapters. **Levels 4–5** are not in those trees yet.

## Draft chapters (in progress)

Levels **4** and **5** are written first under [`draft/`](draft/README.md). That folder holds work-in-progress English and 简体中文 notes until they are promoted into `en/` and `zh-cn/`. The per-language **table of contents** ([`en/SUMMARY.md`](en/SUMMARY.md), [`zh-cn/SUMMARY.md`](zh-cn/SUMMARY.md)) still marks those parts as *coming soon* in the main nav; use [`draft/README.md`](draft/README.md) for direct links to draft overviews.

## Resources and examples

- **Reading lists and links:** [English `RESOURCEs.md`](en/RESOURCEs.md) · [中文 `RESOURCEs.md`](zh-cn/RESOURCEs.md)  
- **Images:** `en/assets/` and `zh-cn/assets/`  
- **Code samples:** `en/code/` and `zh-cn/code/`  
- **Templates:** `en/templates/` (e.g. `AGENTS.md.template`)

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

Output is written to `_book/` by Honkit. GitBook.com configuration is in [`.gitbook.yaml`](.gitbook.yaml); Honkit uses [`book.json`](book.json).

## Contributing

Edits to the narrative should follow the voice, structure, and terminology guidelines in each language tree’s `AGENTS.md` where present. Keep English and Chinese trees aligned when you change titles or navigation so `SUMMARY.md` and cross-links stay consistent.
