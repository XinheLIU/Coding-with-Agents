# Level 3: Become a Power User

> *The difference between using a coding agent and mastering one is like the difference between driving a car and understanding the engine, the road, and the weather.*

[Chapters 1](../01-prompt/README.md) and [2](../02-anatomy/README.md) gave you the fundamentals: how to prompt agents and how they work. This chapter is where you go from "I can use this tool" to "I can orchestrate it." The techniques here represent the difference between a developer who gets 2x leverage from AI and one who gets 10x.

This is the largest chapter in the book — deliberately so. Power-user techniques are where the compound returns live, and each section builds on the last. Here's how it's structured:

1. **The platform deep-dive** — [Claude Code as an AI Agent Framework](claude-code.md) is the chapter opener. It explains *why* we use Claude Code as the primary lens — its four-layer architecture (Memory, Extension, Integration, SDK) maps directly to the three pillars from Chapter 2, and mastering it builds transferable intuition for any agent system. This section also absorbs the implementation details (micro-prompts, command safety, auto-compaction) that make the architecture concrete.

2. **Delegation patterns** — [Sub-Agents](sub-agents.md) introduces the concept of spawning scoped, temporary agents for isolated tasks — how you avoid context pollution and parallelize work. [Agent Teams](agent-teams.md) extends this to coordinating multiple agents on larger projects.

3. **Extending the agent** — [Skills](skills.md) and [Hooks](hooks.md) show you how to teach agents new capabilities and wire them into your development workflow with event-driven automation. [Building Tools for Your Agent](building-tools.md) covers MCP servers, custom tools, and environment setup.

4. **The capstone** — [Systematic Thinking](systematic-thinking.md) ties everything together. It teaches the *composition principles* for combining Skills, SubAgents, Hooks, and more into production-grade agent systems — including governance design, context isolation, and worked architectural examples.

---

**Where you've been:** [Chapter 2](../02-anatomy/README.md) gave you the mental model of how agents work. Now you have the techniques to exploit that understanding.

**What's next:** Individual mastery is powerful, but real impact comes from scaling these practices across a team. [Chapter 4](../04-team/README.md) tackles the hard problems of team development with agents: shared context, code review at AI speed, and testing strategies that keep quality high when output volume explodes.
