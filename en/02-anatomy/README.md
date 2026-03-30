# Level 2: Anatomy of Coding Agents

> *You can't effectively direct a tool you don't understand. This chapter gives you the mental model.*

In [Chapter 1](../01-prompt/README.md), you learned how to prompt coding agents. But prompting well requires more than recipes — it requires understanding *why* certain approaches work and others fail. This chapter provides that foundation by dissecting what coding agents actually are, how they make decisions, and where they break down.

We organized this chapter around three layers of understanding:

1. **How the machine works** — [How Coding Agents Work](how-agents-work.md) traces the evolution from inline completion to agentic coding, and explains the three pillars every agent shares: system prompts, tools, and context strategy. Understanding these pillars is the key to debugging agent behavior when things go wrong — and sets the stage for [Chapter 3](../03-power-user/claude-code.md)'s deep dive into how one agent (Claude Code) turns those pillars into a full architecture.

2. **How much rope to give them** — [Autonomy Levels & Human Intervention](autonomy-levels.md) presents a framework for deciding when to let agents run free and when to keep them on a short leash. The core principle: high autonomy for low-risk, repetitive work; tight supervision for business-critical logic. This section also catalogs the most common failure patterns and how to prevent them.

3. **Two philosophies of building** — [Vibe Coding vs Spec Coding](vibe-vs-spec.md) maps the full spectrum of AI-era development — from rapid, intuition-driven "vibe coding" to rigorous, specification-first engineering. These aren't competing ideologies; they're stages of the same craft, and knowing when to use each is what separates productive developers from frustrated ones.

---

**Where you've been:** [Chapter 1](../01-prompt/README.md) taught you the language of agent collaboration — how to prompt, how to give context, how to persist knowledge.

**What's next:** Now that you understand the machine, [Chapter 3](../03-power-user/README.md) shows you how to push it to its limits. You'll learn context management, sub-agents, hooks, skills, and workflow design patterns that turn you from a competent user into a power user.
