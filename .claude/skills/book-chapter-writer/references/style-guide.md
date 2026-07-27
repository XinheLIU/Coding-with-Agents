# Book Writing Conventions

Last updated: 2026-07-27

Style rules for chapters written into `book/en/` (and mirrored into
`book/zh-cn/` via the `zh-translator` sub-agent). This is a standalone copy of
the relevant sections of `book/en/AGENTS.md` — read that file too if deeper
project context is needed, but everything required to write a chapter is here.

## Voice and Audience

- **Audience:** Software engineers (junior to senior) learning to integrate AI
  agents into their workflow. Assume the reader codes professionally but may
  be new to AI-assisted development.
- **Voice:** Direct, practical, opinionated. Teach by principle first, then
  support with concrete examples and tables. Avoid filler and academic
  hedging.
- **Perspective:** Second person ("you") when giving guidance. Third person
  when describing systems or patterns.

## Writing Style

- Lead each chapter with `# Level N: Title`.
- Use `##` for major topic sections, `###` for subsections, `####` sparingly.
  No `#####` or deeper.
- **Bold** key terms and concept names on first appearance.
- Use tables for structured comparisons (e.g., autonomy levels,
  responsibility splits, failure patterns).
- Use blockquotes (`>`) for references, citations, and links to external
  source material.
- Use numbered lists for sequential workflows; bullet points for unordered
  items.
- Keep paragraphs short (2–4 sentences). Prefer bullets and tables over long
  prose.
- Horizontal rules (`---`) separate major sections within a chapter.
- Keep a `Last updated:` line near the top of every file you touch.

## Image References

- All images live in `book/<lang>/assets/` with descriptive PascalCase
  filenames (e.g., `Sync-Async-Coding-Agents.png`).
- Insert images with alt text matching the concept. From root:
  `![Alt](./assets/Filename.png)`. From subdirs (e.g. `01-prompt/`):
  `![Alt](../assets/Filename.png)`.
- Place images after introducing the concept they illustrate.

## Reference and Citation Style

- External references go in a blockquote at the top of the section they
  support:
  ```
  > [Title of Resource](https://url)
  ```
- A consolidated list of all references lives in `RESOURCEs.md`, organized by
  chapter number. When you add a new citation to an article, move the
  corresponding resource out of its flat section (e.g. `## LLM Basics`,
  `## MCP`, `## Security`) into that chapter's section.
- At the bottom of a chapter, a `## Reference` section may link to the
  primary sources used.

## Code Examples

- Small inline code uses backticks.
- Code blocks use fenced markdown with language tags (` ```python `,
  ` ```bash `).
- Longer example scripts go in `code/` and are referenced from the chapter
  text.

## Chapter Content Guidelines

Each chapter generally follows this arc:

1. **Conceptual foundation** — What is the topic and why does it matter?
2. **Principles and frameworks** — Mental models, decision tables, rules of
   thumb.
3. **Practical patterns** — Battle-tested workflows from real companies
   (OpenAI, Anthropic, etc.).
4. **Anti-patterns / failure modes** — What goes wrong and how to prevent it.
5. **References** — Links to source material.

Avoid duplicating content across chapters. If a concept spans levels (e.g.,
AGENTS.md appears in Level 1 and Level 2), introduce it once and
cross-reference.

## What NOT to Do

- Do not add boilerplate or filler text ("In this section we will
  discuss...").
- Do not include raw unprocessed lecture transcripts — always restructure
  into the conventions above.
- Do not create deeply nested header hierarchies (no `#####` or beyond).
- Do not duplicate images; reference the same asset file from multiple
  chapters if needed.
- Do not invent facts or fabricate references — every cited link should be
  real.
- Do not change existing chapter numbering without updating `README.md`,
  `SUMMARY.md`, and `RESOURCEs.md`.

## Key Terminology (use consistently)

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
