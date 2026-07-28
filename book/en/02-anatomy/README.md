# Level 2: Anatomy of Coding Agents

Last updated: 2026-07-27

> *You can't effectively direct a tool you don't understand. This chapter gives you the mental model — and then takes the machine apart with a screwdriver.*

In [Chapter 1](../01-prompt/README.md), you learned how to prompt coding agents. But prompting well requires more than recipes — it requires understanding *why* certain approaches work and others fail. This chapter provides that foundation by dissecting what coding agents actually are, how they make decisions, where they break down, and how one production agent (Claude Code) turns those principles into a full architecture you can extend.

The chapter moves from mental model to mechanics:

1. **How the machine works** — [How Coding Agents Work](how-agents-work.md) traces the evolution from inline completion to agentic coding, and explains the three pillars every agent shares: system prompts, tools, and context strategy. Understanding these pillars is the key to debugging agent behavior when things go wrong.

2. **How much rope to give them** — [Autonomy Levels & Human Intervention](autonomy-levels.md) presents a framework for deciding when to let agents run free and when to keep them on a short leash. The core principle: high autonomy for low-risk, repetitive work; tight supervision for business-critical logic. This section also catalogs the most common failure patterns and how to prevent them.

3. **How humans and agents collaborate** — [Human-Agent Collaboration Modes](human-agent-collaboration-modes.md) explains how to choose the right working mode based on requirement clarity, risk, and verification cost. It reframes "vibe coding" as exploration, specs as intent contracts, and verification as the gate between agent output and real delivery.

4. **The platform deep-dive** — [Claude Code as an AI Agent Framework](claude-code.md) shows how one agent turns the three pillars into a concrete architecture. Its four layers (Memory, Extension, Integration, SDK) map directly onto the mental model above, and mastering it builds transferable intuition for any agent system.

5. **Context and delegation** — [Context Management](context-management.md) gives you the discipline for keeping the agent's working set clean. [Sub-Agents](sub-agents.md) introduces scoped, temporary agents for isolated tasks, while [Agent Teams](agent-teams.md) extends this to coordinating multiple agents on larger projects.

6. **Extending the agent** — [Skills](skills.md) and [Hooks](hooks.md) show you how to teach agents new capabilities and wire them into your development workflow with event-driven automation. [Tools, MCP, CLI and More](MCP.md) and [Building Tools for Your Agent](building-tools.md) cover integration choices, custom tools, and environment setup.

7. **The capstone** — [Systematic Thinking](systematic-thinking.md) ties the anatomy together. It teaches the *composition principles* for combining Skills, SubAgents, Hooks, and more into production-grade agent systems — including governance design, context isolation, and worked architectural examples.

---

**Where you've been:** [Chapter 1](../01-prompt/README.md) taught you the language of agent collaboration — how to prompt, how to give context, how to persist knowledge.

**What's next:** Knowing the machine inside out is table stakes. [Chapter 3](../03-power-user/README.md) builds on this anatomy with the engineering practices of real power users — orchestration layers, engineering frameworks, and spec coding.
