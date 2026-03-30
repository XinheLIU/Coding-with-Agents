# Team-Level Context Engineering

> [Getting AI to Work in Complex Codebases](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md)

### Core Principle

LLMs are stateless: output quality depends almost entirely on what's present in the context window. Your only real levers are what information you put in, in what form, and at what time.

**Optimize your context for:**

- **Correctness** – No wrong or misleading information
- **Completeness** – No missing key details
- **Low noise** – Exclude logs, junk, and irrelevant blobs
- **Trajectory** – Ensure the agent keeps progressing in the right direction

**Worst failure modes (in order):**
1. Wrong information
2. Missing information
3. Too much noise

![Importance of Correct Context](../assets/Importance-of-Correct-Context-2.png)

![Importance of Correct Context (Detail)](../assets/Importance-of-Correct-Context.png)

### Subagents = Context Control, Not Roleplay

Subagents exist to search, read, and summarize. Their main job is to keep the main agent's context window clean. The ideal subagent output is a compact research brief — not raw logs. Avoid treating subagents as mere "multi-persona" roleplay.

### Real Results

Applied to a 300k LOC Rust codebase (BAML): fixed bugs in ~1 hour, built 35k LOC features in ~7 hours with high quality, and PRs were approved by maintainers. A well-researched plan outperforms an unresearched plan even if both technically "work" — only the researched plan aligns to codebase conventions and architecture.

> **Highest-leverage human review:** Focus on research and plan — not on the final code diff.
>
> - Bad research → thousands of bad lines of code
> - Bad plan → hundreds of bad lines of code
> - Bad code → just bad code

### Human-in-the-Loop Is Mandatory

You must read the research critically, reject bad/insufficient research, review and challenge plans, and stay mentally engaged throughout. Failures are often due to superficial research or hidden dependency chains derailing the project. This is an engineering discipline, not a prompt trick.

### Strategic Insight

Coding agents will be commoditized. The true differentiators are workflow design, context management, and human leverage at the right points. Teams that do not redesign their process will get outpaced by teams that do.
