# Systematic Thinking: Combining Skills, SubAgents, and More

*The components of Claude Code are well-documented. What is not documented is how to think about combining them. This post is about the thinking, not the features.*

> **Prerequisite**: This chapter assumes you understand what each Claude Code component is (Memory, Commands, Skills, SubAgents, Hooks, MCP, Headless, SDK). If not, read [Claude Code as an AI Agent Framework](claude-code.md) first. That chapter covers the *what*; this one covers the *how to think about combining them*.

---

## From Primitives to Composition

In [Claude Code as an AI Agent Framework](claude-code.md), you learned that Claude Code follows a Unix-style design philosophy: a small set of primitive tools (Read, Edit, Bash, Grep, Glob, WebFetch), composed through the LLM's reasoning loop, producing emergent capabilities far beyond what any single tool provides. The Agentic Loop — perceive, act, verify — is the engine. The three-layer tool architecture (built-in primitives → Bash-reachable tools → MCP extensions) defines the capability boundary. The graduated permission model defines the safety boundary.

That chapter explains the *what* and *why* of each piece. This chapter is about the *how* — specifically, how to think about combining these pieces when facing a real, ambiguous engineering problem.

The key insight that bridges the two: **emergent capability = primitive tools × LLM reasoning × feedback loop.** The same principle applies at the orchestration layer. Memory, Skills, SubAgents, Hooks, and Commands are themselves primitives — each answering a different design question, each composable with the others. The systematic thinker does not memorize component catalogs. They internalize the composition grammar.

## Why "Systematic Thinking" Instead of "How to Use Claude Code"

You already know what Skills, SubAgents, Commands, and Hooks are. You have read the docs. You have probably built a few Skills, maybe wired up a SubAgent. But when you encounter a new, ambiguous engineering problem — say, "automate our entire code review pipeline with security checks, test verification, and Jira notifications" — you do not reach for a feature. You reach for a *thinking framework* that tells you how to decompose the problem, assign responsibility to the right component, define the boundaries between them, and anticipate where the system will break.

This is the gap. The Claude Code documentation explains each component in isolation. What it does not teach you is the architectural instinct for *composition* — the ability to look at a complex requirement and immediately see which components should combine, in what topology, with what contracts between them.

That instinct is what separates someone who builds prompt demos from someone who ships maintainable agent systems. It is also, not coincidentally, the same instinct that separates a junior engineer who knows every API from a senior architect who knows which APIs should *never* talk to each other.

This post is an attempt to transfer that instinct.

---

## The First Principle: Every Component Answers a Different Question

You already know what each component *is* from [Claude Code as an AI Agent Framework](claude-code.md). The table below reframes them as *design decisions* — each component answers a fundamentally different question, and the right choice depends on which question you're actually facing:

| Component | Core Question | Trigger | Determinism | Context |
|-----------|--------------|---------|-------------|---------|
| **Memory** (CLAUDE.md) | What does the agent always need to know? | Always loaded | 100% | Shared, persistent |
| **Commands** | What must happen exactly the same way every time? | User-explicit (`/cmd`) | 100% | Stateless |
| **Skills** | How should the agent handle this *type* of problem? | Semantic (Claude decides) | Probabilistic | Shared with main |
| **SubAgents** | Who should do this work, in isolation? | Claude or user decides | Configurable | Independent |
| **Hooks** | What must be checked before/after every action? | Event-driven (automatic) | 100% | Orthogonal |
| **MCP** | How does the agent reach the outside world? | Tool invocation | 100% | Pass-through |

When you face a design problem, your first move is not to pick a component. Your first move is to identify *which question you are really answering*. The component follows from the question.

**Example:** "We need Claude to follow our REST API naming conventions."

- Is this something it should always know? → Push it into `CLAUDE.md` (Memory).
- Is this a specialized workflow triggered on demand? → Build a Skill.
- Is this a check that must run before every file edit? → Wire it as a Hook.

All three are valid. The right answer depends on frequency, scope, and failure cost:

- If every single task in this project involves API work → Memory (Push, always present).
- If only 20% of tasks involve API design, but when they do, Claude needs deep standards knowledge → Skill (Pull, on-demand).
- If a naming violation would break production and must be caught mechanically → Hook (Guard, deterministic).

Often the real answer is a combination: conventions in Memory, a detailed design review Skill, and a naming validation Hook. The systematic thinker designs all three layers and understands *why each layer exists*.

---

## The Second Principle: Separate Knowledge from Behavior from Governance

Most architectural confusion comes from conflating three things that should be cleanly separated:

**Knowledge** = what the agent knows (Memory + Skill reference files)
**Behavior** = what the agent does (Commands + Skills + SubAgents)
**Governance** = what the agent must not do, or must always check (Hooks + `allowed-tools` + permissions)

![5 Layers of Claude Capabilities](../assets/5-Layers-of-Claude-Capabilities.png)

When these three concerns are mixed — when your `CLAUDE.md` contains behavioral workflows, or your Skill tries to enforce governance rules, or your Hook includes business logic — the system becomes brittle, hard to debug, and impossible to evolve independently.

**The clean separation looks like this:**

```
Knowledge layer:
  CLAUDE.md          → universal project context (always loaded)
  SKILL.md           → domain expertise (loaded on demand)
  reference/         → deep reference material (loaded by SKILL.md)

Behavior layer:
  Commands           → deterministic user-triggered workflows
  Skills (workflow)  → adaptive, context-sensitive execution
  SubAgents          → isolated task delegation

Governance layer:
  Hooks              → pre/post action checks, audit logging
  allowed-tools      → capability boundaries per Skill/SubAgent
  permissions        → which Skills Claude can/cannot invoke
```

When you can clearly assign every piece of your system to one of these three categories, you have a maintainable architecture. When you cannot — when a single `SKILL.md` file is simultaneously defining knowledge, executing workflows, *and* enforcing security constraints — you have technical debt waiting to compound.

---

## The Third Principle: Push vs. Pull Is a Resource Allocation Decision

One of the most consequential architectural decisions is what knowledge to push (always present in context) versus what to pull (loaded on demand). This is not a stylistic preference — it is a resource allocation problem with measurable trade-offs.

Vercel's February 2026 experiment made this concrete: AGENTS.md (Push) achieved 100% pass rates on build/lint/test tasks. Skills (Pull) scored 79% — because Claude failed to invoke the Skill 56% of the time. But this does not mean "always Push." If you Push 200KB of security audit checklists into every request, you waste tokens on 80%+ of interactions where security is irrelevant, and you dilute attention on the tasks that matter.

**The decision framework:**

| Criterion | Push (CLAUDE.md / AGENTS.md) | Pull (Skills) |
|-----------|------------------------------|---------------|
| Frequency of use | >50% of requests | <20% of requests |
| Size | Small (<8KB compressed) | Large (unlimited with progressive disclosure) |
| Failure cost if missing | High (broken builds, wrong conventions) | Medium (suboptimal but recoverable) |
| Trigger reliability needed | Must always apply | Acceptable if occasionally missed |

**The anti-patterns:**

- Pushing everything → context bloat, attention dilution, token waste.
- Pulling everything → unreliable triggering, missed critical context.
- Not deciding explicitly → ad hoc accumulation that gradually degrades both.

A systematic thinker audits their knowledge placement quarterly: what is in Memory that should be a Skill? What is in a Skill that has become so frequently needed it belongs in Memory?

---

## The Fourth Principle: Context Isolation Is the Core Value of Multi-Agent

The most common mistake in multi-agent architecture is treating parallelism as the primary motivation. It is not. **Context isolation is the primary value.** Parallelism is a secondary benefit that sometimes comes along for free.

Anthropic's own multi-agent Research system illustrates this clearly. The system achieved a 90.2% performance improvement over single-agent setups — not primarily because SubAgents ran in parallel, but because each SubAgent operated with a clean, focused context window. The LeadResearcher did not have to wade through thousands of search results from multiple domains simultaneously. Each SubAgent filtered and compressed its domain independently, returning only distilled insights.

The practical implication: **do not reach for SubAgents because you want speed. Reach for them because you need clean context.**

Here is the decision tree:

```
Is your single agent's quality degrading?
├── No → Stay with single agent. Add Skills if tools multiply.
└── Yes → Why?
    ├── Too many competing roles in one prompt
    │   → SubAgents (each with focused system prompt)
    ├── Context window filling with noise from prior tasks
    │   → SubAgents (isolated context, results-only handback)
    ├── Different knowledge domains contaminating each other
    │   → SubAgents or Router (per-domain isolation)
    └── Sequential phases need different permissions/behaviors
        → Handoffs (state-driven phase switching)
```

And the cost check that must always follow:

- Multi-agent systems consume ~15x more tokens than single-agent conversations.
- ~80% of performance variance is explained by token volume.
- Upgrading the model often delivers better ROI than adding more agents.
- If every agent needs the full shared context anyway, multi-agent adds cost without adding isolation value.

---

## The Fifth Principle: Skills and SubAgents Are Orthogonal, Not Alternative

A persistent confusion: "Should I use a Skill or a SubAgent?" This is a category error. Skills and SubAgents answer different questions and combine in predictable ways.

**Skills = How to do it** (methodology, standards, tool constraints, quality criteria)
**SubAgents = Who does it** (role identity, task scope, output format, context boundary)

They combine in three canonical patterns:

### Pattern A: SubAgent Loads Skills (Expert Worker)

The SubAgent is a role. The Skill is its training. A `security-auditor` SubAgent preloads the `security-review` Skill and becomes a domain expert that operates independently with its own context, applying the team's security methodology to whatever code it is pointed at.

```
SubAgent definition (.claude/agents/security-auditor.md):
  - Role: Security audit specialist
  - skills: [security-review]
  - Output: Structured vulnerability report

Skill definition (.claude/skills/security-review/SKILL.md):
  - Workflow: Assess → Prioritize → Deep-dive → Report
  - allowed-tools: Read, Grep, Glob (read-only)
  - templates/: vulnerability-report.md
  - scripts/: dependency-check.py
```

**When to use:** You need a reusable domain expert. Multiple SubAgents can share the same Skill. The SubAgent provides the role boundary; the Skill provides the methodology.

### Pattern B: Skill Forks SubAgent (Isolated Execution)

The Skill defines the task. `context: fork` spawns a SubAgent to execute it in isolation. The main conversation stays clean.

```yaml
# .claude/skills/code-health-check/SKILL.md
---
name: code-health-check
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob, Bash
---
Scan the entire codebase for: dead code, circular dependencies,
files exceeding 500 lines. Output a structured health report.
```

**When to use:** Heavy scanning or analysis tasks that would pollute the main context. The Skill contains the methodology; the fork provides the isolation.

### Pattern C: Pipeline Orchestration (Multi-Stage Assembly Line)

Multiple SubAgents execute in sequence, each preloaded with a different Skill. Clear interface contracts define what each stage produces and what the next stage consumes.

```
Stage 1: route-scanner (Skill: route-scanning) → outputs routes.json
Stage 2: doc-writer   (Skill: doc-writing)     → consumes routes.json, outputs docs/
Stage 3: qa-checker   (Skill: quality-checking) → consumes docs/, outputs qa-report.md
```

**When to use:** Multi-phase workflows where each phase requires different expertise, different tool access, and produces a well-defined artifact consumed by the next phase.

**The decision heuristic:** Ask "Does this task need a separate *identity* with its own context?" If yes → SubAgent. If no → Skill on the main agent. Then ask "Does this SubAgent need structured expertise?" If yes → preload a Skill. The two decisions are independent.

---

## The Sixth Principle: Governance Is Not an Afterthought

In every production system I have seen fail, the root cause was not insufficient capability — it was insufficient governance. The agent could do too much, checked too little, and logged nothing.

Hooks are the governance layer, but governance is broader than Hooks. It is a three-layer design:

**Layer 1: Capability boundaries** (`allowed-tools`)
Each Skill and SubAgent should have a minimal tool whitelist. A review Skill gets `Read, Grep, Glob` — no `Write`, no `Edit`, no `Bash`. A documentation Skill gets `Write` but not `Edit` (it creates new files, never modifies existing ones). This is not permissions management. It is *knowledge constraining action* — the Skill "knows" what kind of work it does and enforces the corresponding capability boundary.

**Layer 2: Process gates** (Hooks)
Pre-edit Hooks validate proposed changes. Post-write Hooks run linters. Pre-bash Hooks check for dangerous commands. These fire automatically, every time, regardless of which Skill or SubAgent initiated the action. They are orthogonal to business logic — they do not care *what* Claude is trying to do, only *whether it is safe to do it*.

**Layer 3: Audit trail** (Hooks + external systems via MCP)
Every significant action — file edit, tool invocation, SubAgent dispatch — should be logged. In production systems, this feeds observability dashboards that track agent decision patterns over time. Anthropic's engineering team emphasized this as essential: minor changes in agentic systems cascade into large behavioral changes, and debugging requires understanding not just outcomes but decision paths.

The systematic thinker designs all three layers *before* writing the first Skill. In practice:

```
For any new capability you add:
1. What tools does it need? (minimal whitelist)
2. What should be checked before/after it acts? (Hook)
3. How will you know what it did and why? (audit)
```

---

## Putting It All Together: A Worked Example

**Requirement:** "Build an automated code review pipeline that runs on every PR, checks for security issues, verifies test coverage, and posts results to Jira."

A systematic decomposition:

### Step 1: Identify the questions

| Sub-problem | Question type | Component |
|-------------|--------------|-----------|
| PR is opened, pipeline must trigger | "What must happen automatically?" | Headless (CI/CD) + Hook |
| Security review requires deep analysis | "How should security problems be found?" | Skill (security-review) |
| Test coverage check is deterministic | "What must happen exactly the same way every time?" | Script inside a Skill, or Command |
| Security and tests are independent domains | "Who should do each job, in isolation?" | SubAgents (separate contexts) |
| Results must be posted to Jira | "How does the agent reach the outside world?" | MCP |
| No edit should introduce new vulnerabilities | "What must be checked before every action?" | Hook (pre-edit) |

### Step 2: Design the topology

```
CI/CD trigger (Headless)
  → Supervisor Agent
    ├── SubAgent: security-auditor
    │   └── Skill: security-review (read-only tools)
    ├── SubAgent: test-verifier
    │   └── Skill: coverage-check (Bash for test runner)
    └── After both complete:
        → Supervisor synthesizes results
        → Hook: audit-log (records decision trail)
        → MCP: jira-connector (posts structured report)
```

### Step 3: Define the contracts

- `security-auditor` outputs: `{ vulnerabilities: [...], severity: string, recommendation: string }`
- `test-verifier` outputs: `{ coverage_percent: number, uncovered_files: [...], new_tests_needed: boolean }`
- Supervisor consumes both, produces Jira-formatted report
- Pre-edit Hook: blocks any file modification that touches `src/auth/` without security-auditor approval

### Step 4: Apply the governance checklist

- `security-auditor` allowed-tools: `Read, Grep, Glob` (read-only — auditors do not fix)
- `test-verifier` allowed-tools: `Read, Bash` (can run tests, cannot edit code)
- Supervisor allowed-tools: full set (it synthesizes and may format output)
- Hooks: pre-edit security check, post-completion audit log
- All SubAgent outputs are verified by the Supervisor before external posting

### Step 5: Check the cost/benefit

- Two SubAgents + Supervisor = ~3x the token cost of a single agent doing everything.
- But context isolation prevents security analysis from being contaminated by test output (and vice versa).
- If this pipeline runs on every PR (high frequency, high value), the cost is justified.
- If it runs once a month, a single agent with Skills is probably sufficient.

---

## The Architecture Decision Matrix

When facing any new requirement, run it through this matrix:

| Scenario | Recommended Pattern | Why |
|----------|-------------------|-----|
| Single domain, <5 tools, context <50K tokens | Single Agent + Tools | Simplest possible. No coordination overhead. |
| Single domain, >10 tools, prompt bloating | Single Agent + Skills | Progressive disclosure reduces prompt weight. |
| Multiple domains, each needing clean context | Sub-Agents | Isolation prevents cross-domain contamination. |
| Sequential multi-phase process with role transitions | Handoffs | Phase discipline ensures completeness before progression. |
| Parallel queries across multiple data sources | Router | Maximum parallelism with per-branch isolation. |
| Complex pipeline with distinct stages and artifacts | Pipeline (SubAgents + Skills) | Clear contracts between stages; independent maintenance. |
| Team-wide best practices that must be portable | Plugin (bundles Commands + Skills + SubAgents + Hooks) | Install once, inherit the entire engineering culture. |

---

## The Broader Lens: What This Thinking Framework Applies To

The six principles in this post — question-first component selection, knowledge/behavior/governance separation, Push vs. Pull resource allocation, isolation as primary value, orthogonal composition, governance-first design — are not specific to Claude Code.

![4 Pillars of Claude](../assets/4-pillar-Claude.png)

They are the same principles that govern microservice architecture (bounded contexts, API contracts, circuit breakers), organizational design (role clarity, information flow, accountability), and systems engineering (separation of concerns, defense in depth, observability).

When the open-source project OpenClaw (Clawdbot) surfaced in community discussions, experienced engineers could immediately assess its design trade-offs — not because they had read the source code, but because they recognized the architectural patterns. It prioritizes task decomposition, execution isolation, and result collection over flashy multi-agent choreography. That restraint *is* the architecture. It reflects the same principle: the best architecture is the simplest one that digests the complexity.

The same thinking applies when evaluating any AI agent system:

- **What core engineering problem does it solve?** (If you cannot answer this in one sentence, the system is probably over-engineered.)
- **Is it trading context for intelligence, or architecture for controllability?** (The former works until it does not. The latter scales.)
- **Where are the governance boundaries?** (If there are none, it is a demo, not a system.)

This is also why Skills escaped Claude Code to become an industry standard in under 100 days. By February 2026, over 27 agent platforms natively supported Skills, with 52,000+ registered and top Skills exceeding 180,000 installations. Skills won because they are declarative (pure Markdown, no runtime), self-contained (copy the directory, done), and knowledge-centric (the value is the expertise, not the format). The Agentic AI Foundation (AAIF), co-founded by Anthropic, OpenAI, and Block under the Linux Foundation with 97+ members, formalized this ecosystem: MCP for tool interfaces, AGENTS.md for project conventions, goose for execution, and Skills as the knowledge layer binding them together.

The lesson is broader than any single tool: **in 2026, the competitive advantage in AI engineering is not model selection. It is knowledge engineering — the ability to decompose domain expertise into composable, governable, portable units and combine them with systematic thinking.**

---

## Five Golden Rules (Revisited as Thinking Heuristics)

1. **Start simple, earn complexity.** Every additional component must justify itself against a concrete bottleneck. If you cannot name the bottleneck, you do not need the component.

2. **Tools before agents, Skills before SubAgents.** The smallest, cheapest unit of capability expansion comes first. Escalate only when the simpler mechanism is provably insufficient.

3. **Isolate for clarity, not for speed.** Context isolation is about preventing contamination, not about parallelism. If you need speed but not isolation, batch within a single agent.

4. **Govern before you build.** Define what the agent *cannot* do before you define what it *can* do. The `allowed-tools` whitelist and pre-action Hooks should be the first artifacts in your design, not the last.

5. **Design for the maintainer, not the demo.** A system that impresses in a demo but cannot be debugged, audited, or modified by a different engineer in six months is not architecture. It is performance art.

---

## References

- [Anthropic Engineering: How We Built Our Multi-Agent Research System](https://www.anthropic.com/engineering/multi-agent-research-system)
- [LangChain: How and When to Build Multi-Agent Systems](https://blog.langchain.com/how-and-when-to-build-multi-agent-systems/)
- [Claude Code Docs: Extend Claude with Skills](https://code.claude.com/docs/en/skills)
- [Anthropic API Docs: Agent Skills Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Anthropic: Skills Explained](https://claude.com/blog/skills-explained)
- [Linux Foundation: Formation of the Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [The Decoder: Vercel Push vs. Pull Experiment](https://the-decoder.com/a-simple-text-file-beats-complex-skill-systems-for-ai-coding-agents/)
- [Towards Data Science: Claude Skills and Subagents — Escaping the Prompt Engineering Hamster Wheel](https://towardsdatascience.com/claude-skills-and-subagents-escaping-the-prompt-engineering-hamster-wheel/)
- [VS Code Blog: Multi-Agent Development (Feb 2026)](https://code.visualstudio.com/blogs/2026/02/05/multi-agent-development)