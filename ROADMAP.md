# Writing Roadmap

Last updated: 2026-08-06

The single source of truth for what is written, what ships, and what to write
next. Chapter status lives **only** here — `CLAUDE.md` and `book/en/AGENTS.md`
point at this file rather than tracking status themselves.

Not listed in either `SUMMARY.md`, so it never publishes to the site.

## How to read this

| Status | Meaning |
|---|---|
| `done` | Full prose following the chapter arc in [`book/en/AGENTS.md`](book/en/AGENTS.md) |
| `draft` | Real content, but a section of the arc is missing or thin |
| `stub` | Placeholder — a few bullets or an outline, not readable as a chapter |
| `translation-pending` | English source is written; the Chinese file is a 5-line stub |
| `absent` | No file in that tree at all |

**Nav gate:** `stub` and `translation-pending` chapters are kept on disk but
removed from `SUMMARY.md`, so they don't publish as near-empty pages. `draft` is
good enough to ship. Promoting a chapter past `stub` means adding its
`SUMMARY.md` entry back in both the tree nav and the level `README.md`.

English is primary. A Chinese chapter is only written after its English source
is at least `draft`, via the `zh-translator` sub-agent.

## Chapter status

### Level 1 — How to Prompt Coding Agents

| Chapter | EN | ZH | In nav | Next step |
|---|---|---|---|---|
| `how-agents-change-dev.md` | done | done | ✅ | Attribute resources; fold in remaining tools from `coding-agents-landscape.md` |
| `prompting-principles.md` | done | done | ✅ | — |
| `agents-md.md` | done | done | ✅ | Attribute resources |

### Level 2 — Anatomy of Coding Agents

Absorbed the nine Claude Code toolkit chapters that used to be Level 3
(restructure of 2026-07-27) — the level now runs from mental model to full
platform mastery.

| Chapter | EN | ZH | In nav | Next step |
|---|---|---|---|---|
| `how-agents-work.md` | done | done | ✅ | Attribute resources |
| `autonomy-levels.md` | done | done | ✅ | Attribute resources |
| `human-agent-collaboration-modes.md` | done | done | ✅ | — |
| `claude-code.md` | done | done | ✅ | Move `## Claude Code` resources into a chapter section |
| `context-management.md` | done | done | ✅ | — |
| `sub-agents.md` | done | done | ✅ | — |
| `agent-teams.md` | done | done | ✅ | — |
| `skills.md` | done | done | ✅ | Attribute resources |
| `hooks.md` | done | done | ✅ | Attribute resources |
| `MCP.md` | done | done | ✅ | Move `## MCP` resources into a chapter section |
| `building-tools.md` | draft | draft | ✅ | Finish the 3-bullet "Modern Terminal" section; add anti-patterns |
| `systematic-thinking.md` | done | done | ✅ | Attribute resources |

### Level 3 — Become a Power User

Re-scoped on 2026-07-27: the old toolkit chapters moved to Level 2, and this
level is now planned material on real power-user engineering.
`legacy-codebases.md` is written, translated, and in both navs; the other three
chapters do not exist yet. The Chinese working drafts it was written from
(`draft-2/tools.md` and `draft-2/understanding-exisiting-codebase.md`, which had
themselves absorbed the earlier `draft-1/`) were verified as fully integrated and
deleted on 2026-07-27 — they were never committed, so `raw/` and the chapter are
now the only records.

| Chapter | EN | ZH | In nav | Next step |
|---|---|---|---|---|
| `orchestration-layer.md` | absent | absent | ❌ | Write: routing work across sessions/agents/workflows, autonomous vs interactive, composing pipelines |
| `engineering-frameworks.md` | absent | absent | ❌ | Write: scaffolding, verification loops, task decomposition, agent-native frameworks |
| `spec-coding.md` | absent | absent | ❌ | Write from `raw/ai-human-collobration.md` — six-dimension PRD system + Step 1–3 delivery loop |
| `legacy-codebases.md` | done | done | ✅ | — |

### Level 4 — Team Development

The largest gap in the book. Three Chinese chapters have no English counterpart;
six English chapters are draft or stub.

| Chapter | EN | ZH | In nav | Next step |
|---|---|---|---|---|
| `why-team-level-development-is-harder.md` | absent | done (288 lines) | zh only | Write the EN counterpart from the Chinese |
| `product-business-definition.md` | absent | done (199 lines) | zh only | Write the EN counterpart from the Chinese |
| `architecture-and-deployment-design.md` | absent | done (249 lines) | zh only | Write the EN counterpart from the Chinese |
| `specs-as-source-of-truth.md` | draft | translation-pending | en only | Reconcile H1 vs nav title; add anti-patterns + references |
| `team-context-engineering.md` | draft | translation-pending | en only | Add anti-patterns / failure modes |
| `intentional-compaction.md` | draft | translation-pending | en only | Only 2 sections — expand to the full arc |
| `agentic-workflows.md` | draft | translation-pending | en only | Rewrite the untranslated Chinese block as EN prose |
| `code-review.md` | draft | translation-pending | en only | Turn the two bare bullet subsections into prose |
| `security-boundaries.md` | stub | translation-pending | ❌ | Write the chapter (currently 3 bullets) |
| `testing-security.md` | done | translation-pending | en only | Translate; give the ZH file a Chinese H1 |

### Level 5 — Be an AI Architect

Four chapters, only `pm-in-AI-era.md` written — now in both trees and both
navs. The other three are gated out of nav in both trees; the level `README.md`
pages list the one shipped chapter and outline the rest.

| Chapter | EN | ZH | In nav | Next step |
|---|---|---|---|---|
| `software-3-0.md` | stub | translation-pending | ❌ | Write from the Karpathy source cited inline |
| `builders-mindset.md` | stub | translation-pending | ❌ | Write from `raw/ai-human-collobration.md`'s three-layer framework (the PRD system goes to `03-power-user/spec-coding.md` instead) |
| `pm-in-AI-era.md` | done | done | ✅ | — |
| `future-of-se.md` | stub | translation-pending | ❌ | Write the chapter (currently a 3-point objectives list) |

## Raw intake

Where each `raw/` note stands. Every note now has a target chapter in the
tables above; notes stay in `raw/` after promotion for traceability — "used"
does not mean deletable. This table (not `raw/README.md`) is the tracker.

| Note | Target chapter | Status |
|---|---|---|
| `ai-human-collobration.md` | `03-power-user/spec-coding.md` (six-dimension PRD system + Step 1–3 delivery loop) and `05-architect/builders-mindset.md` (three-layer framework) | Partially used — the three-layer framework sits in `builders-mindset.md` as raw Chinese notes; the PRD system and delivery loop await `spec-coding.md` |
| `approach-old-codebase-2.md` | `03-power-user/legacy-codebases.md` | Used — the handover path and three-tier responsibility split landed in `legacy-codebases.md`, cross-referencing `human-agent-collaboration-modes.md` instead of repeating the AI-can/cannot framing |
| `coding-agents-landscape.md` | `01-prompt/how-agents-change-dev.md` | Partially used — Lovable, Replit Agent, v0 are cited. **Google AI Studio, Figma Make, Coze, Bolt.new are not** |

## Content defects

Concrete problems in files that already exist, distinct from status:

- `book/en/04-team/specs-as-source-of-truth.md` — H1 is "Maintain Context, Not
  Code" but nav says "Specs as Source of Truth". Pick one and sync both.
- `book/en/04-team/agentic-workflows.md` — lines 7–74 are raw Chinese prose in
  the English tree. The sections below it are finished.
- `book/en/05-architect/builders-mindset.md` — body is a raw Chinese lecture
  outline plus one image embed.
- `book/zh-cn/04-team/specs-as-source-of-truth.md` and `testing-security.md` —
  stubs still carrying English H1 titles; should be Chinese.
- `book/zh-cn/assets/` holds six images with no referrer. Intentional — they are
  pre-placed for the pending Level 4 translations. Don't delete them.

## Resources backlog

`book/en/RESOURCEs.md` has chapter sections for only 8 chapters. The rest of its
links sit in flat topic sections (`## MCP`, `## Security`, `## Claude Code`,
`## SRE / Ops`, `## Warp`, `## LLM Basics`) — which per `book/en/AGENTS.md` means
"reading list for articles not yet written". Two sections have no chapter home
anywhere in the book: **`## Warp`** and **`## LLM Basics`**.

Per-chapter attribution is tracked in the Next step column above. The rule: when
you cite a link in a chapter, move it out of its flat section into that chapter's
section.

`book/zh-cn/RESOURCEs.md` currently points readers at the English list rather
than duplicating it. Translate it once the English list stabilizes.

## Suggested order

1. **Finish Level 4 English** — most draft-stage material, and the three missing
   counterparts are the only thing blocking "the trees are mirrored".
2. **Translate Level 4** — `zh-translator`, seven chapters.
3. **Write the new Level 3** — four chapters; `raw/ai-human-collobration.md` and
   `raw/approach-old-codebase-2.md` already seed two of them.
4. **Write Level 5** — smallest level, three chapters.
5. **Translate Levels 3 and 5.**
6. **Resources attribution sweep** — move flat-section links into chapter
   sections, then translate `RESOURCEs.md`.
7. **Level 2 polish** — `building-tools.md` is the only non-done chapter in an
   otherwise finished level; cheap to close out at any point.
