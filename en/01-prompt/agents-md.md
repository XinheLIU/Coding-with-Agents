# The Agent Memory File: Your Codebase's Constitution

> *"The gap between 'Claude, we use pnpm' every session and 'Claude already knows' is the difference between a tool and a teammate."*

- [The Agent Memory File: Your Codebase's Constitution](#the-agent-memory-file-your-codebases-constitution)
  - [Part 1: What AGENTS.md Is and Why It Matters](#part-1-what-agentsmd-is-and-why-it-matters)
    - [The Core Problem](#the-core-problem)
    - [What the Research Says](#what-the-research-says)
    - [How Context Gets Loaded](#how-context-gets-loaded)
  - [Part 2: Principles of Writing an Effective Memory File](#part-2-principles-of-writing-an-effective-memory-file)
    - [Principle 1: Less Is More](#principle-1-less-is-more)
    - [Principle 2: Be Specific, Not Generic](#principle-2-be-specific-not-generic)
    - [Principle 3: Encode Style Through Tooling, Not Instructions](#principle-3-encode-style-through-tooling-not-instructions)
    - [Principle 4: Organize by WHY → WHAT → HOW](#principle-4-organize-by-why--what--how)
    - [Principle 5: Progressive Disclosure — Don't Cram Everything In](#principle-5-progressive-disclosure--dont-cram-everything-in)
    - [Principle 6: Provide Alternatives, Not Just Prohibitions](#principle-6-provide-alternatives-not-just-prohibitions)
    - [Principle 7: Use /init as a Living Sync, Not a One-Time Setup](#principle-7-use-init-as-a-living-sync-not-a-one-time-setup)
    - [Principle 8: Use Hierarchical CLAUDE.md for Monorepos](#principle-8-use-hierarchical-claudemd-for-monorepos)
    - [Principle 9: Encode Git Discipline as Rules](#principle-9-encode-git-discipline-as-rules)
    - [Principle 10: Factor Repetition into Slash Commands and Sub-Agents](#principle-10-factor-repetition-into-slash-commands-and-sub-agents)
    - [Principle 11: Connect the Agent to Live Context](#principle-11-connect-the-agent-to-live-context)
    - [Principle 12: Build Domain Templates for Fast Project Bootstrap](#principle-12-build-domain-templates-for-fast-project-bootstrap)
    - [Meta-Principle: Adoption Order](#meta-principle-adoption-order)
  - [Part 3: Layered Memory Management](#part-3-layered-memory-management)
    - [The Five-Layer Architecture](#the-five-layer-architecture)
    - [Layer 1: Organization Policy](#layer-1-organization-policy)
    - [Layer 2: User-Level Preferences](#layer-2-user-level-preferences)
    - [Layer 3: Project-Level Shared Rules *(most important)*](#layer-3-project-level-shared-rules-most-important)
    - [Layer 4: Local Workspace Memory](#layer-4-local-workspace-memory)
    - [Layer 5: Conditional Rules Directory](#layer-5-conditional-rules-directory)
    - [The Sixth Layer\*: Auto Memory](#the-sixth-layer-auto-memory)
    - [Maintaining Memory Over Time](#maintaining-memory-over-time)
    - [The Bigger Picture: Prompt → Context → Agent Engineering](#the-bigger-picture-prompt--context--agent-engineering)


## Part 1: What AGENTS.md Is and Why It Matters

### The Core Problem

LLMs are stateless. Every new session starts blind—your agent knows nothing about your tech stack, naming conventions, or the fact that refactoring the auth module will break three downstream services. AGENTS.md (or `CLAUDE.md` in Claude Code) is the file that fixes this: a persistent briefing document read at the start of every conversation, giving the agent context it cannot infer from code alone.

The format emerged in mid-2025 and is now supported by Claude Code, Cursor, GitHub Copilot, Gemini CLI, Windsurf, Aider, Zed, Warp, and others—maintained by the Agentic AI Foundation under the Linux Foundation. Over 60,000 public repos contain context files; OpenAI's own monorepo has 88. Anthropic's `CLAUDE.md` adds hierarchical scoping, auto-memory, and import syntax on top of the same concept.



### What the Research Says

The [ETH Zurich (2026): "Evaluating AGENTS.md"](https://arxiv.org/abs/2602.11988) was the first rigorous empirical test—138 real-world tasks, four coding agents, three conditions. The findings:

- **LLM-generated context files hurt**: success rates dropped ~2–3%, costs rose 20%+.
- **Human-written files helped marginally**: +4% success, but also +19% cost.
- **The root cause**: auto-generated files were redundant with information already in the repo. When all existing docs were stripped first, LLM-generated files *improved* performance by 2.7%.

A concurrent study (Lulla et al., ICSE JAWs 2026) found AGENTS.md reduced wall-clock time by 28.64%—but measured *efficiency*, not *correctness*. Faster ≠ more correct.

**The takeaway:** write one that contains **only what the agent cannot discover on its own.**

Addy [Osmani's filter](https://addyosmani.com/blog/agents-md/): *Can the agent figure this out by reading your code? If yes, delete it.* 

> Directory trees, tech stack obvious from `package.json`, test locations—all noise. What belongs: non-obvious tooling choices (`uv` over `pip`), hidden constraints, custom commands, architectural rationale, dangerous operations.

### How Context Gets Loaded

AGENTS.md is one of four mechanisms that bring information into an agent's context window. Understanding when each is loaded determines what belongs where:

| Mechanism        | Load Timing                             | Token Cost      | Best For                                |
| ---------------- | --------------------------------------- | --------------- | --------------------------------------- |
| **AGENTS.md**    | Auto-loaded at every conversation start | Always consumed | Core conventions, must-know constraints |
| **Skills**       | Loaded on-demand when task matches      | On-demand       | Domain-specific knowledge               |
| **Commands**     | Loaded when user invokes `/command`     | On-demand       | Standardized repeatable workflows       |
| **@ references** | Loaded when manually cited in a prompt  | On-demand       | Temporary reference material            |

The implication: put in AGENTS.md only what every session needs. Everything else belongs in skills, commands, or `@`-referenced docs—loaded only when relevant, costing tokens only when used.

## Part 2: Principles of Writing an Effective Memory File

### Principle 1: Less Is More

Frontier LLMs can reliably follow ~150–200 instructions; Claude Code's system prompt already uses ~50. Every line in AGENTS.md competes for the remaining budget. LLMs also exhibit U-shaped attention—strong at the beginning and end of context, weak in the middle. A bloated file means your most important rules get lost in paragraph 6 of 12.

> The ETH Zurich data confirms this: agents faithfully follow instructions, but more instructions means more tests, more file reads, more grep searches—thoroughness that's often unnecessary and expensive.

**Practical target:** 60–300 lines. One team allocates a "max token count" per tool's documentation like ad space—if you can't explain it concisely, it's not ready for AGENTS.md.

### Principle 2: Be Specific, Not Generic

**Bad** (zero incremental value—the model already does this):
```markdown
- Write high-quality code
- Use meaningful variable names
```

**Bad** (use a linter instead):
```markdown
- Use 2-space indentation
- Always use semicolons
```

**Good** (specific, enforceable, changes behavior):
```markdown
## Error Handling
- All errors extend `AppError` from `src/errors/base.ts`
- Services throw; controllers catch and format
- Never catch silently—always `logger.error()` at minimum

## Database Access
- All queries via Prisma ORM—never raw SQL in services
- Complex queries in `src/repositories/` only
- Transactions via `prisma.$transaction()` exclusively
```

**The test:** if removing it wouldn't change the agent's behavior, delete it.

### Principle 3: Encode Style Through Tooling, Not Instructions

Never send an LLM to do a linter's job—LLMs are slower, more expensive, and less reliable than deterministic formatters. Configure Prettier/ESLint/Black/`rustfmt`, then add a single line:

```markdown
After editing any file, run `pnpm format && pnpm lint:fix`.
```

Or better: set up a Claude Code hook that runs the formatter automatically after every edit. Save your AGENTS.md budget for decisions a linter *can't* enforce.

Where style instructions *do* belong: decisions that are semantic, not syntactic. "Use `interface` for public contracts, `type` for internal unions" isn't formatting—it's architectural intent. "Functions with >3 parameters must use an options object" changes API shape, not whitespace.

### Principle 4: Organize by WHY → WHAT → HOW

**WHY** — reasoning behind decisions (helps the agent generalize to novel cases):
```markdown
## Why Zod
TS only validates at compile time. APIs receive external data at runtime.
Zod provides runtime validation + TS types + friendly errors. Apply the
same principle to any external data boundary.
```

**WHAT** — allowed vs. forbidden, stated as constraints:
```markdown
## Allowed: Prisma for all DB ops, Zod co-located with routes
## Forbidden: `any` type, direct `fetch()`, `console.log`
```

**HOW** — step-by-step workflows with file references:
```markdown
## Adding a New API Endpoint
1. Schema → `src/routes/<feature>/schema.ts`
2. Route → `src/routes/<feature>/route.ts`
3. Service → `src/services/<feature>.service.ts`
4. Repository → `src/repositories/<feature>.repo.ts` (if needed)
5. Tests → `src/routes/<feature>/__tests__/`
6. Run `make check`
```

### Principle 5: Progressive Disclosure — Don't Cram Everything In

AGENTS.md is the entry point, not the encyclopedia. Keep core rules in the root file; link to detailed docs elsewhere.

```markdown
## Deep Dives
- For API patterns and response format: `docs/api-patterns.md`
- For database migration workflow: `docs/migrations.md`
- If you encounter a FooBarError: `docs/troubleshooting.md`
```

**Important:** Don't just list paths—pitch the agent on *when* to read them. "For complex Prisma usage or if you encounter a migration error, see `docs/database.md`" is far more effective than a bare reference.

You can also use `@` file references in prompts to point the agent at exact sources of truth without bloating AGENTS.md:

```
Update user.py according to @docs/api-spec.md
```

### Principle 6: Provide Alternatives, Not Just Prohibitions

```markdown
# Bad — agent gets stuck
- Never use `--force` with git push

# Good — agent knows what to do instead
- Never `git push --force` → use `git push --force-with-lease`
  (prevents overwriting others' work)
```

Every "don't" should have a corresponding "do instead."

### Principle 7: Use /init as a Living Sync, Not a One-Time Setup

`/init` auto-generates a draft CLAUDE.md by scanning your project. Treat it as a starting point, not the finished product.

- **Run it after major refactors** to catch structural changes.
- **Choose "Merge"** to preserve manual edits + append new structure, or **"Replace"** to restart.
- **Always review and prune** afterward—`/init` generates exactly the kind of redundant content the ETH Zurich study warns about (file trees, obvious stack info). Delete what the agent can discover on its own.

### Principle 8: Use Hierarchical CLAUDE.md for Monorepos

Push global rules up, push specifics down. Each folder can have its own CLAUDE.md that layers on top of the root:

```
/root
  CLAUDE.md              → global: Git workflow, shared standards
  backend/CLAUDE.md      → Python, FastAPI, backend patterns
  frontend/CLAUDE.md     → React, Tailwind, component conventions
  data/CLAUDE.md         → analysis defaults, viz libraries
```

When you work inside `frontend/`, the agent loads both the root and local files. This keeps each file lean and context-relevant—the frontend agent never loads backend database rules.

### Principle 9: Encode Git Discipline as Rules

AI agents can be sloppy with version control unless you make expectations explicit:

```markdown
## Git Workflow
- Commit after each logical feature or fix
- Write commit messages: `<type>(<scope>): <description>` (e.g., `fix(auth): handle expired tokens`)
- New features go on branches—never push directly to main
- Run `make check` before committing
```

Git history becomes your time machine when the agent goes sideways. Frequent commits mean you can always roll back to the last known-good state.

### Principle 10: Factor Repetition into Slash Commands and Sub-Agents

Once you notice yourself typing the same multi-line prompt repeatedly, extract it:

**Slash commands** (`.claude/commands/*.md`) turn repeated workflows into one-key rituals:

```markdown
# .claude/commands/review.md
Review the staged changes for:
- Style violations against CLAUDE.md rules
- Security issues (injection, auth bypass, secrets)
- Performance regressions
Output as a markdown table: file | issue | severity | suggestion
```

Invoke with `/review` or `/review user_auth.py` (`$ARGUMENTS` substitution).

**Sub-agents** (`.claude/agents/*.md`) create focused personas for specialized tasks:

```markdown
# .claude/agents/security-reviewer.md
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---
You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Auth and authorization flaws
- Secrets or credentials in code
Provide specific line references and severity ratings.
```

Sub-agents run in their own context window, so they don't clutter your main conversation. Keep them sharp and opinionated—they should say "no" to work outside their lane.

### Principle 11: Connect the Agent to Live Context

Static text in AGENTS.md has limits—it can't reflect a database schema that changed yesterday or docs for a library you just upgraded. When the agent needs dynamic, real-time information, give it tools rather than stale text.

**CLI commands** are the simplest approach. Tell the agent what's available:

```markdown
## Live Context
- Run `python manage.py show_schema` to inspect current DB schema
- Run `curl -s http://localhost:8000/openapi.json` for current API spec
- Run `cat .env.example` for available environment variables
``` 

**MCP servers** formalize this for recurring needs (Postgres introspection, browser automation, live library docs). But they're not required—any tool the agent can invoke from the terminal works.

The principle: **if the information changes faster than you'll update AGENTS.md, teach the agent how to look it up instead of writing it down.**

### Principle 12: Build Domain Templates for Fast Project Bootstrap

For recurring project types, create a template AGENTS.md that encodes your personal "operating system." Clone and tweak rather than starting from scratch.

Example for data science projects:

```markdown
## Language
- Conversation: Traditional Chinese
- Code and comments: English

## Python Standards
- 4-space indentation, pytest over unittest
- All functions have type hints and docstrings
- Prefer f-strings, pathlib over os.path

## Analysis Defaults
- Use plotnine for visualization (set figure size + DPI)
- Check assumptions before statistical tests (VIF for multicollinearity)
- Always include EDA before modeling
```

### Meta-Principle: Adoption Order

Don't over-engineer day one. Tighten the system where it hurts most:

1. **Start with `@` references** to ground the agent in specs and schemas.
2. **Add core rules** (architectural constraints, git discipline, key commands).
3. **When you feel repetition**: factor into slash commands.
4. **When tasks need specialized focus**: carve out sub-agents.
5. **When you hit the limits of static text**: introduce MCP.
6. **When starting new projects**: layer in domain templates.

---

## Part 3: Layered Memory Management

### The Five-Layer Architecture

Agent memory isn't a single file—it's a layered system where each level serves a different audience and scope.

```
┌─────────────────────────────────────────────┐
│  Layer 1: Organization Policy (IT/DevOps)   │  Broadest scope
├─────────────────────────────────────────────┤
│  Layer 2: User Preferences (personal)       │
├─────────────────────────────────────────────┤
│  Layer 3: Project Rules (team, in git)      │  ← Most important
├─────────────────────────────────────────────┤
│  Layer 4: Local Workspace (personal, local) │
├─────────────────────────────────────────────┤
│  Layer 5: Conditional Rules (per-context)   │  Narrowest scope
└─────────────────────────────────────────────┘
        ↕
   Auto Memory (learned, accumulates over time)
```

### Layer 1: Organization Policy

| Property     | Detail                                                                                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Location** | macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md` · Linux: `/etc/claude-code/CLAUDE.md` · Windows: `C:\Program Files\ClaudeCode\CLAUDE.md`            |
| **Audience** | IT/DevOps, enforced globally                                                                                                                                   |
| **Contents** | Security policies (no hardcoded secrets, HTTPS required), compliance (no PII in logs), prohibited patterns (no unapproved libraries, no direct prod DB access) |

Enterprise-only. Small teams can skip it.

### Layer 2: User-Level Preferences

| Property     | Detail                                                            |
| ------------ | ----------------------------------------------------------------- |
| **Location** | `~/.claude/CLAUDE.md`                                             |
| **Audience** | You, across all projects                                          |
| **Contents** | Communication preferences, personal coding style, preferred tools |

Your defaults. Overridden by project-level rules when they conflict.

### Layer 3: Project-Level Shared Rules *(most important)*

| Property     | Detail                                                                                 |
| ------------ | -------------------------------------------------------------------------------------- |
| **Location** | `CLAUDE.md` or `AGENTS.md` at project root (in git)                                    |
| **Audience** | The entire team                                                                        |
| **Contents** | Tech stack, project structure, coding standards, key commands, architectural decisions |

This is the layer Parts 1 and 2 focus on. Template:

```markdown
# AGENTS.md

## Project Overview
[1–2 sentences]

## Tech Stack
[Only what's non-obvious]

## Key Commands
[Exact commands: dev, test, lint, build]

## Architecture Decisions
[WHY + WHAT for each]

## Workflow: How to Add [Feature/Endpoint/Component]
[Step-by-step with file paths]

## Forbidden Patterns
["Don't X → do Y instead"]
```

### Layer 4: Local Workspace Memory

| Property     | Detail                                                                         |
| ------------ | ------------------------------------------------------------------------------ |
| **Location** | `CLAUDE.local.md` at project root (in `.gitignore`)                            |
| **Audience** | You, for this project                                                          |
| **Contents** | Local env config, test accounts, current WIP, personal TODOs, debugging tricks |

A persistent "work journal" between you and the agent. Maintain it manually or ask: *"Summarize what we figured out about the payment bug and add it to CLAUDE.local.md."*

### Layer 5: Conditional Rules Directory

| Property     | Detail                                                 |
| ------------ | ------------------------------------------------------ |
| **Location** | `.claude/rules/*.md`                                   |
| **Audience** | The agent, loaded only when matching files are edited  |
| **Contents** | Testing standards, frontend rules, API design patterns |

Path-based scoping via YAML frontmatter:

```yaml
# .claude/rules/testing.md
---
paths:
  - "src/**/*.test.ts"
  - "tests/**/*.ts"
---

## Testing Standards
- Vitest + React Testing Library
- Arrange → Act → Assert structure
- Test user behavior, not implementation
- 80% coverage for new modules
```

These only consume context when relevant—the implementation of progressive disclosure at the rules level.

### The Sixth Layer*: Auto Memory

| Property          | Detail                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Location**      | `~/.claude/projects/<project-id>/memory/`                                                                 |
| **Contents**      | Patterns Claude learned from sessions: debugging paths, structural insights, project gotchas              |
| **vs. AGENTS.md** | AGENTS.md = human-defined rules (input spec). Auto Memory = model-learned experience (adaptive insights). |

Manage with `/memory` commands:
- `/memory` — view loaded memories and sources
- `/memory edit` — edit project-level CLAUDE.md
- `/memory edit user` — edit user preferences
- `/memory edit local` — edit local workspace

Or just tell the agent: *"Add a rule to CLAUDE.md that we always use `pnpm`."*

### Maintaining Memory Over Time

**Post-incident rule:** the second time you correct the same agent behavior, codify it. Not the first (could be a fluke), not preemptively (leads to bloat).

**Keep it in sync.** Stale files describing replaced dependencies actively degrade performance. A file that says "we use Webpack" after you migrated to Vite is worse than no file.

**The data-driven flywheel.** Review agent CI/CD logs for common mistakes → feed patterns back into AGENTS.md → better performance → fewer mistakes. Bugs become rules become better code.

**Use the agent to maintain itself:**
```
"Summarize the key insight from our debugging session and
propose an addition to CLAUDE.md if it would prevent this
issue for future sessions."
```

### The Bigger Picture: Prompt → Context → Agent Engineering

The evolution of AI-assisted development:

1. **Prompt Engineering** — crafting individual prompts for single interactions.
2. **Context Engineering** — designing the information architecture around the model. AGENTS.md lives here.
3. **Agent Engineering** — designing specialized, reusable AI agents (sub-agents, skills, MCP tools) that compose into larger workflows.

AGENTS.md is the most accessible entry point to context engineering. But it's not the end state—emerging approaches like the ACE framework (ICLR 2026) generate task-specific context dynamically, outperforming static files by 12.3%.

For now: **a lean, human-written, regularly maintained memory file that contains only what the agent can't discover on its own is a small investment with compounding returns.**

---

*Further reading:*
- *ETH Zurich (2026): "Evaluating AGENTS.md"* — First empirical benchmark study
- *Lulla et al. (ICSE JAWs 2026)* — The efficiency counterpoint
- *Anthropic: Claude Code Best Practices* — Official CLAUDE.md guidance
- *Addy Osmani: "Stop Using /init for AGENTS.md"* — Practical filter for context files
- *"Memory in the Age of AI Agents: A Survey" (Tsinghua, 2025)* — Academic survey of agent memory

---

**Next up:** You now know how to prompt agents and give them persistent memory. But how do these agents actually *work*? In [Chapter 2: Anatomy of Coding Agents](../02-anatomy/README.md), we open the black box — understanding the agent loop, autonomy levels, and failure modes will make every technique in this chapter more effective.