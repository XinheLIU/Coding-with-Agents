# Improve Agent Capabilities

### Keep the Environment in Sync with the Team

- Include: language versions, dependencies, pre-commit hooks, CI checks — avoid "passes in the agent's environment, fails on your local machine"
- Use `.envrc` / `.bashrc` / custom scripts so the agent is ready the moment it enters the environment

### Build Custom CLI Tools and MCP Capabilities

- MCP for plugging in third-party tools, CLI for high-frequency internal actions (e.g., give the agent a script that pulls key info just by passing a Linear Ticket ID)
- Abstract complex workflows into "stable black-box tools" — e.g., output only the first failing test with detailed error output, forcing the agent to focus on one problem at a time and increasing success rate

### How to Build Tools for Your Agent

> [Writing Effective Tools for Agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

- **Design for agents, not just APIs** – Create task-shaped tools that align with workflows, not raw low-level endpoints
- **Fewer, better, more opinionated tools** – Prioritize consolidated, high-leverage tools that hide multi-step logic and return curated results, minimizing tool count and maximizing task coverage
- **Namespace tools clearly** – Use clear namespacing (by service or resource) to make tool intent obvious, as tool names are part of the agent's reasoning interface
- **Return high-signal, human-readable context** – Provide names, titles, summaries, and short descriptions instead of UUIDs or cryptic IDs; offer modes (e.g., `CONCISE` vs `DETAILED`) if IDs are necessary for chaining calls
- **Optimize for token efficiency** – Use filtering, searching instead of listing, pagination, and truncation with guidance to keep outputs small and relevant
- **Make errors and truncation actionable** – Provide specific, actionable error messages and clear guidance on how to refine queries
- **Prompt-engineer tool descriptions** – Treat tool descriptions and schemas as onboarding docs for a new hire, explicitly explaining usage, inputs, and outputs
- **Evaluate and improve tools with agents** – Build realistic evaluation tasks and measure task success, tool call count, token usage, and error rates; use agent transcripts to identify confusion and misuse
- **Design tools to offload cognition** – Create tools that collapse multi-step reasoning, pre-join, pre-filter, and pre-summarize to reduce the agent's cognitive load

### Continuously Expand the Agent's Knowledge Base

- Use `.rules` / `.md` / built-in knowledge systems to document team "unwritten rules" — including project architecture, common testing approaches, important commands, recommended toolchain
- Write "standard operating procedures" for common tasks — e.g., when adding a new route, document every front-end and back-end location that must be changed, making that task class fully delegatable to the agent
- Explicitly provide links/docs in the prompt and direct the agent to treat them as the source of truth

---

## The Modern (AI-Enhanced) Terminal

- AI-augmented command lines
- Terminal automation with agents
- Scripting + reasoning loops

---

**Next up:** Everything in this chapter has been about *individual* mastery. But what happens when an entire team adopts these tools? In [Chapter 4: Team Development with Coding Agents](../04-team/README.md), we tackle the coordination challenges that emerge when AI-accelerated developers need to work together — shared context, code review at scale, and keeping quality high when output volume explodes.
