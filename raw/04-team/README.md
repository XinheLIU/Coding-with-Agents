# Level 4: Team Development with Coding Agents

> *A 10x individual contributor with AI is impressive. A team of them, without shared practices, is chaos.*

The previous chapters focused on individual mastery — how *you* prompt, understand, and orchestrate coding agents. But software is a team sport. When every developer on a team is generating code at 5-10x the previous rate, the bottleneck shifts from writing code to coordinating, reviewing, and maintaining it. This chapter addresses that shift head-on.

We structured this chapter around the lifecycle of team-scale AI development:

1. **The foundation: context** — [Context Management Principles](context-management.md) explains why stuffing everything into a large context window actually *hurts* performance, and presents the principles for keeping context lean, relevant, and effective — including the Research → Plan → Implement workflow that underpins everything else in this chapter.

2. **What to build** — [Specs as Source of Truth](specs-as-source-of-truth.md) argues that when AI can generate code faster than humans can review it, the specification becomes the real artifact. Specs are no longer documentation — they're the source code of intent. This section covers how to write specs that agents can consume and humans can verify.

3. **How to share context** — [Team-Level Context Engineering](team-context-engineering.md) scales the context management principles from [Chapter 3](../03-power-user/README.md) to an entire team. It covers shared AGENTS.md files, layered context hierarchies, and the four optimization targets (correctness, completeness, low noise, trajectory) that determine whether your team's agents produce coherent output or contradictory spaghetti.

4. **How to stay lean** — [Intentional Compaction](intentional-compaction.md) introduces a discipline most teams skip: continuously summarizing and distilling work state into structured artifacts. Without this, context windows fill with stale information and agent performance degrades over time.

5. **How to review** — [Code Review at AI Scale](code-review.md) reimagines code review for a world where PRs arrive faster than humans can read them. The new goal isn't line-by-line inspection — it's keeping the team aligned on *what's changing and why*, with AI handling the mechanical checks.

6. **How to stay safe** — [AI Testing, Security & Failure Modes](testing-security.md) addresses the dual transformation: AI introduces new attack surfaces (prompt injection, dependency hallucination, leaked secrets) while also offering new defensive capabilities. This section covers testing strategies, security boundaries, and the emerging field of AI-native DevOps.

---

**Where you've been:** [Chapter 3](../03-power-user/README.md) made you dangerous as an individual. This chapter ensures your team doesn't implode under the weight of AI-accelerated output.

**What's next:** [Chapter 5](../05-architect/README.md) zooms out from daily practice to the bigger picture. What does "Software 3.0" actually mean? What mindset do architects need in a world where code is cheap and judgment is scarce? And where is this all heading?
