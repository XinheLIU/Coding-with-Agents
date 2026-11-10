# Level 3: Become a Power User

Last updated: 2026-11-10

> *The difference between using a coding agent and mastering one is like the difference between driving a car and running a fleet.*

[Chapter 2](../02-anatomy/README.md) took the machine apart: how agents work, how much autonomy to give them, and how Claude Code's memory, extension, and integration layers fit together. This chapter is where that anatomy becomes engineering practice — the systems and disciplines that separate a developer who gets 2x leverage from one who gets 10x.

Seven chapters make up this level. Four are written; the other three are
outlined below and not yet in the navigation. Progress is tracked in
[`ROADMAP.md`](../../../ROADMAP.md).

1. **The orchestration layer** — how to design the layer above individual agents: routing work between sessions, agents, and workflows; deciding what runs autonomously versus interactively; and composing sub-agents, hooks, and skills into repeatable pipelines instead of one-off tricks.

2. **Engineering frameworks** — the reusable structures that make agent-assisted development reliable: project scaffolding, verification loops, task decomposition templates, and the frameworks emerging around agent-native engineering.

3. **Spec coding** — specification-first development in depth: writing specs that agents can execute against, the six-dimension requirements system, and the delivery loop from spec to verified change.

4. **[Product, Business, and Engineering Foundation: The Three Layers of Agentic Development](product-business-engineering.md)** — agentic coding as a double loop: agents run the inner loop in parallel while the human sets intent, makes the calls, and changes the environment in the outer loop — and the whole codebase is the harness. The three-layer split is really the supply of context and constraint to the agent; mining implicit knowledge sets the inner loop's ceiling; with the constraint-strength ladder and two designs — the outer loop's engineering component initialization (reference slice included) and evidence-driven refactoring and extraction in the improvement loop.

5. **[Agentic Frontend Development: From Generation to Taste to Verification](agentic-frontend.md)** — why frontend is harder for agents than backend (it flies blind), how the bottleneck moved from generation to taste to verification, where Google, OpenAI and Anthropic each put taste and verification, and four practices: narrow the generation space, write taste down (DESIGN.md, design Skills), climb the verification ladder, and let autonomy follow verification coverage.

6. **[Repo Memory: Store Only the Why](repo-memory.md)** — redesigning the agent's memory from the holistic Harness Memory view: how each of six memory kinds (structure, constraints, procedures, derivations, declarations, state) acts on the agent, which constraints are embedded in the code and which must be made explicit out of human heads; What goes to code, How goes to executable controls, handwriting stores only the Why; with eleven design principles, the three-question filter, the human-facing presenter layer, and the spec's lifecycle from construction drawing to decision record.

7. **[Working with Brownfield Codebases](legacy-codebases.md)** — power-user strategies for pointing agents at large existing systems: the three kinds of debt brownfield work accrues, the three layers of control (comprehension, constraint, verification), and the characterization test → seam → incremental refactor workflow that keeps agent-driven changes reversible.

---

**Where you've been:** [Chapter 2](../02-anatomy/README.md) gave you the full anatomy — mental model, autonomy framework, collaboration modes, and the complete Claude Code toolkit from context management to systematic composition.

**What's next:** Individual mastery is powerful, but real impact comes from scaling these practices across a team. [Chapter 4](../04-team/README.md) tackles the hard problems of team development with agents: shared context, code review at AI speed, and testing strategies that keep quality high when output volume explodes.
