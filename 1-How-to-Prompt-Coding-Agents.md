# Level 1: How to Prompt Coding Agents

## How Coding Agents Change Coding

**Traditional programming:**

- Learn a language: spend months on JavaScript, Python, or another language
- Understand syntax rules: memorize brackets, semicolons, indentation rules
- Write code line by line: "translate" every feature into instructions a computer understands
- Debug constantly: when the program throws an error, go through it line by line
- Look up docs and ask communities: spend hours searching for answers

The whole process was like learning a foreign language — you had to master the grammar before you could say what you meant.

**In the AI era:**

- Tell the AI what you want: "Build me a to-do list with add, complete, and delete"
- Watch the AI generate the code: seconds later, it appears
- Try it out: run it and see if it's what you had in mind
- Tell the AI how to adjust: "Make completed tasks grey with a strikethrough"
- Keep iterating: until you're satisfied

The process now feels more like talking to a technically fluent assistant — you describe the idea, it handles the implementation.

**The development lifecycle has been compressed and restructured:**

- **Requirements phase** – You're your own product manager. Write a PRD so the AI understands. You don't need professional product terminology — just explain what you want to build clearly.
- **Technical design phase** – AI generates the technical approach; you review and adjust. It's like having an experienced architect sitting next to you, ready to advise at any time.
- **Development phase** – AI writes the code; you describe requirements and check results. No need to memorize every API or framework detail.
- **Testing phase** – AI writes test cases and runs them automatically. No more spending hours on repetitive test code or worrying about missing edge cases.
- **Deployment phase** – One-click deploy to a cloud platform with automated build and release. No server configuration, no CI/CD pipeline setup.
- **Iteration phase** – Rapidly adjust based on data and feedback, iterating in days or even hours. Change a feature and see the result in minutes.

### What Will Not Change

Even though *how* we work has changed, some things never will:

- **You need to know what you want** — AI can't figure out your goals for you, no matter how smart it gets
- **You need to judge whether the result is good** — AI makes mistakes; you have to be able to spot them
- **You need a mental model for problem-solving** — when things go wrong, you need to know how to debug step by step

**Engineers won't be replaced — they'll be amplified:**

- **Deep technical expertise + insight into your own systems** remain core assets — the agent simply extends your reach at the execution layer.
- **Ownership is what truly matters** — your accountability for the project, system, and code is more critical than ever.
- **From single-threaded producer to multi-threaded orchestrator** — engineers will manage multiple systems and agent tasks simultaneously, more like a Tech Lead mentoring junior engineers than a developer writing a single feature.

> AI has taken over execution. Thinking and decision-making are still yours.

---

## Principles for Using Coding Agents

### Prompting a Coding Agent: Treat the Agent Like an Intern

**1. Don't just say what to do — say how to do it**

Treat the agent like a junior engineer whose judgment you can't fully trust:

- For simple tasks, describing the requirement directly is fine
- For complex tasks, provide the overall approach, architecture, and key logic first, for example:
  - **Goal** – the core purpose of this change
  - **Definitions** – prerequisite concepts and background the LLM must understand before tackling the problem
  - **Plan** – high-level implementation approach and how it breaks down
  - **Source files being changed** – which source files will be modified
  - **Relevant codebase parts** – which modules are related and why
  - **Test cases** – how you'll test and verify
  - **Edge cases** – special or extreme scenarios to pay attention to
  - **Out-of-scope** – explicitly what should NOT be changed this time
  - **Extensions** – future-related changes to help the LLM design forward rather than take shortcuts

Embed your engineering habits in the prompt — specify how to split modules, error-handling style, testing strategy — so the output matches your team's code style. **Write prompts like GitHub Issues**: clear goal + context + constraints + output format; include file paths, module names, relevant diffs, and doc excerpts.

**2. Tell the agent where to start, not "go find it yourself"**

- **Specify the entry point**: repo / module / doc / component
- Even if you don't know the exact filename, specify "which repo + what kind of docs + which core components"
- **Example-driven direction**: "Read the latest X docs and create an implementation file in the model groups directory" — provide navigation and action together

**3. Use Defensive Prompting**

- Brief the agent like you'd brief a new intern — anticipate the most likely misunderstandings and write them into the prompt
- **Flag high-risk steps explicitly**: e.g., "After modifying the C++ binding, you must recompile and run tests every single time" — make constraints into hard rules

**4. Provide a Tight Feedback Loop: CI / Tests / Types / Lint**

- The agent's "magic" comes from its ability to make mistakes → see the error → self-correct
- Provide: type systems (TypeScript / Typed Python), unit tests, lint, CI pipelines — give it the tools to iterate
- Write in the prompt: how to install dependencies, run tests, run type check / lint, and how to start the dev server for front-end

**5. Human expertise is the key multiplier**

- Knowing the codebase and business logic deeply amplifies your productivity enormously — you can quickly judge whether the logic is correct and the structure is sound; the agent just executes and explores
- **Final accountability is yours**: even when the agent writes the PR, correctness, maintainability, and risk assessment remain your responsibility

---

### Using AGENTS.md for Persistent Context

`AGENTS.md` typically contains:

- Naming conventions, business logic constraints, common pitfalls / known issues
- Dependencies or implicit constraints that are hard to infer from the code alone

---

### Work in a Structured Workflow

> [How FAANG Vibe Codes](https://x.com/rohanpaul_ai/status/1959414096589422619)

- **Upfront design first, code later.** Work begins with a detailed technical design document describing system design and architecture. This doc is reviewed by senior engineers before any coding starts, so AI is not deciding the architecture; humans are.
- **Structured planning and task breakdown.** After the design review passes, the team launches development by documenting subsystems and turning them into backlog items. Developers, PMs, and TPMs collaborate on sprint planning so work is tightly scoped.
- **AI-assisted implementation with tests first.** During software development, engineers use AI heavily, especially to write tests first in a Test-Driven Development style. AI is a power tool for generating code and tests, but engineers stay in control.
- **Multi-step code review and staging.** Every change goes through a two-step review/approval process, where AI can also help reviewing code. Only after passing review does it move to staging for testing, and only if staging looks good does it get pushed to production.
- **Measured impact.** This AI-integrated process improves speed from feature idea to production by about 30%, without sacrificing rigor, because strong design + TDD + reviews + staging keep quality in check.

---

### Time Management and Knowing When to Cut Your Losses

**1. Cut losses decisively when the time is right**

- Signs it's time to restart: the agent keeps ignoring your instructions, starts going in circles, or drifts off track despite repeated corrections
- Many messages often signals a fundamental capability gap, not a prompting problem — continuing to "coach" it at that point has low ROI

**2. Try multiple approaches in parallel**

- Early on, experiment with different tasks and prompting styles to discover where the agent naturally performs well, then double down there
- Don't force the agent to improve in areas it's weak — treat it like a colleague with clear strengths and blind spots, and play to the strengths

**3. When it's not working, just restart**

- For agents, "starting fresh" is usually better value than "salvaging a broken session" — especially when the environment is already messed up or the attempt path has gotten very convoluted
- **A new session with a complete, clear one-shot prompt** is often faster to a correct result than endlessly course-correcting in an old session

---

## Reference

- [Devin: Coding Agents 101](https://devin.ai/agents101#introduction)
