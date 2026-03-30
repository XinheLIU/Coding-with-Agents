# Maintain Context, Not Code

> *In [Chapter 3](../03-power-user/README.md), you mastered individual power-user techniques — context management, sub-agents, and custom tools. Now we scale those principles to teams. When every developer is 5-10x faster with AI, the bottleneck shifts from writing code to deciding what to build and keeping everyone aligned.*

> [Specs Are the New Source Code](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code)

### Specs as the True Source of Truth

- **AI makes engineers much faster**, so the bottleneck shifts to deciding *what* to build.
- **Well-written specs** (prompts, tickets, product docs) are the true source of truth.
- **Code is a "lossy projection" of the spec** — the spec captures intent, values, and trade-offs.

Historically, specs were treated as disposable paperwork and code as sacred. In AI workflows, detailed specs can generate code, docs, tests, and more. The scarce skill is now clear communication and specification, not raw coding speed.

**The workflow has evolved:**

- **Old workflow:** Vague idea → wireframes → designs → MVP → customer feedback → painful spec rewrites
- **New workflow:** Vague idea → rapid AI-built prototype → customer feedback → crystal-clear spec → AI-assisted implementation

Prototypes are now the *input* to better specs, not a replacement for them.

![Example Workflow: Prototype to Spec to Implementation](../assets/Example-Workflow.png)

### Context-as-Code

Key features of treating context like code:

- **Version Control** – Prompt files are managed by Git just like regular code, supporting branching, rollbacks, and collaborative development with full traceability of changes.
- **Type Safety** – Libraries like Pydantic are used to strictly validate and type-check LLM outputs, ensuring downstream programs don't break due to missing fields or type mismatches.
- **Automated Regression Testing** – Build an evaluation dataset and automatically run tests (accuracy, recall, etc.) after every prompt logic update. If prompt changes degrade performance, the system automatically alerts you.

When prompts are modularized and versioned, they transform from one-off instructions into maintainable components. Writing prompts will increasingly resemble software engineering: clear interfaces, verifiable outputs, and trackable changes.
