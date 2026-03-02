# Level 3: Become a Power User

## Context Engineering

> [How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html)

### Why Long Contexts Fail

Long context windows don't automatically make agents smarter — if unmanaged, extra context becomes a liability instead of an asset.

- Large context windows (up to 1M tokens) make it tempting to "just stuff everything in."
- In practice, agent performance often *decreases* as context grows, rather than improves.
- The real challenge is effective context management, not simply increasing window size.

**Failure Modes:**

**1. Context Poisoning: Errors Become "Truth"**
A hallucination or mistaken fact enters the context, gets repeated in summaries and plans, and the agent becomes stuck on impossible or irrelevant goals — unable to recover without intervention.

**2. Context Distraction: Overfitting to History**
As context grows, models begin to over-focus on past tokens at the expense of their pretrained knowledge. Gemini 2.5 starts repeating actions instead of innovating beyond ~100k tokens. Databricks found accuracy drops well before the max window, particularly with smaller models. Long context is most useful for summarization and retrieval — not for unbounded agentic reasoning.

**3. Context Confusion: Overload from Too Many Tools / Irrelevant Info**
Exposing all possible tools (MCP-style) can backfire. All models degrade with many tools in context and may even use tools when none is needed. Example: Llama 3.1 8B fails with 46 tools but succeeds with 19, even if both fit in context. If it's in the prompt, the model must process it — noisy tool definitions and junk context actively reduce performance.

**4. Context Clash: Contradictions Across Turns & Sources**
Multi-turn "sharded" prompts perform much worse than a single, well-formed prompt (average performance drop ~39%; even o3 falls from 98.1% to 64.1%). Once a model "commits" to a wrong path, it tends to over-rely on past outputs and fails to self-correct. Agents are especially vulnerable as they aggregate multiple tools, documents, and submodels — each introducing potential conflicts.

**Implications for Agent Design:**

The most fragile setups are exactly those we care about: multi-step, multi-tool, multi-source agents working over long histories. Mitigations include dynamic or selective tool loading, "context quarantines" to isolate unreliable content, and more disciplined context curation instead of "dump everything in."

---

### Context Management Principles

> [Good Context Leads to Good Code: How We Built an AI-Native Eng Culture](https://blog.stockapp.com/good-context-good-code/)

The central insight: high-quality software isn't just about writing code — it's about **systematically building and sharing context** between humans and AI agents throughout the development lifecycle. Without explicit, structured context, even powerful AI tools will make mistakes or produce low-quality output.

**1. Treat the Repository as a Shared Context Workspace**

Organize your code, docs, and agent guidance in a monorepo so both humans and AI have access to the same context. Natural language docs are first-class artifacts for AI to consume. Context artifacts include: high-level design docs (the "why" and "what"), implementation plans (the "how"), guides & tutorials for APIs/tools, and schema definitions and localized READMEs.

**2. Build Context Hierarchically**

A stepwise context construction process:

1. **Design** – Human defines requirements and constraints
2. **Plan** – The agent turns that into actionable tasks
3. **Implement** – Agents generate most code; humans review
4. **Backstop** – Tests and safeguards anchor context and prevent regressions
5. **Review** – Human + agent validate work against context
6. **Update & Refine** – Docs and context artifacts are updated for future work

**3. Always Use Agents Within a Context-Heavy Process**

Agents are used throughout — for commit messages, docs, planning, testing, and debugging — but never without context or supervision. Agents should augment human intent, not replace it. Context becomes the common language between human expertise and agent capability.

**4. Use Tooling to Extend and Expose Context**

Use MCP servers and command-line tooling so agents can access and update external sources of truth such as Notion / task trackers (e.g., Linear), database states and logs, and git history and PR metadata. This expands context beyond static docs into real-time system and project data.

**5. Context Enables Ensembles of AI + Human Review**

Rather than relying on one agent or one human reviewer, use multiple models (Claude, Gemini, o3, etc.) to cross-validate outputs. The shared context repository lets these models operate consistently and coherently.

**Key Principles Summary:**


| Do                                                               | Don't                                               |
| ---------------------------------------------------------------- | --------------------------------------------------- |
| Store context explicitly in the repo (docs, plans, schemas)      | Let agents operate with stale or incomplete context |
| Design context *before* implementation                           | Keep context only in your head                      |
| Update context with every change                                 | Assume agents will infer unstated constraints       |
| Use tooling to make external project information part of context | Trust agent output without review                   |


### Sub Agemt

## Sub-Agents: What Are They and What Problems Do They Solve?

### 1. Core Problem: Context Pollution & Memory Misalignment

- The main conversation linearly adds context and doesn't expire old info automatically. Long logs, test results, and intermediate reasoning pile up in the context window.
- These pieces of data are necessary during execution but become noise for future reasoning. If left in the shared context, agents like Claude may appear to "forget" or get dumber over time.
- Sub-agents provide independent, temporary context windows: they run tasks, discard their process, and only return conclusions to the main thread. This helps Claude "remember less, but remember the right things."

### 2. Nature of Sub-Agents: Specialized Assistants with Rules and Tool Permissions

- Each sub-agent has its own: system prompt (rules), tool permissions, context window, and model choice.
- Analogy: Main conversation = the boss; sub-agent = employee. The boss delegates the task, the employee does the noisy work in their own workspace, and only the summary/conclusion is returned to the boss.
- The relationship is "message-passing": the sub-agent only sees explicitly provided instructions, not the conversation history.

---

## The Three Main Engineering Values of Sub-Agents (+ One Bonus Value)

### 1. Isolation: Solving Context Pollution

- High-noise operations like tests, log analysis, and global search are performed inside the sub-agent. The main thread only receives conclusions like "these 3 files are relevant" or "test passed/failed."
- This saves tokens in the main context, so crucial discussions aren't pushed out by noisy logs.
- Only decision-relevant info is retained, ensuring more stable and higher quality reasoning.

### 2. Enforced Boundaries: Turning "Shouldn't" into "Can't"

- Define strict tool permissions for sub-agents via allow/deny lists:
    - Read-only review: Read, Grep, Glob
    - Bug fixing: Read, Write, Edit, Bash
    - Research: Read, WebFetch, WebSearch
- Example: a code reviewer sub-agent can only read code, never modify; a security auditor can only inspect. This prevents "code review accidentally becomes code change," ensuring safety.

### 3. Reuse: Versioning Experience into Shareable Assets

- Sub-agent configs are Markdown files with YAML frontmatter. These can go into Git:
    - Share across teams
    - Version control
    - Reuse across projects
    - Track improvements to prompts and permission sets
- The `.claude/agents/` directory becomes a collection of "job descriptions," driving more disciplined, engineering-oriented workflows.

### 4. Parallelization: Accelerating Complex Tasks

- You can have multiple sub-agents independently explore different facets (e.g., auth logic, DB design, API structure) and send back results for aggregation.
- Pipeline workflows separate each phase (Explore → Reviewer → Fixer → Test-runner), keeping each phase's context clean and independent.

---

## Built-in Sub-Agents and When to Use Them

### 1. Key Sub-Agents in Claude Code

- **Explore:** Fast, read-only project explorer; discovers file locations and project structure in quick/medium/thorough modes (tools: Read, Grep, Glob).
- **Plan:** Gathers context, analyzes dependencies, and generates implementation plans before making changes. Sub-agents themselves can't instantiate more sub-agents.
- **General-purpose:** Can both explore and modify as needed. Has the full toolset—best for complex, multi-step tasks.

### 2. When *Should* You Use Sub-Agents?

- Noisy output: tests, log scanning, global search, generating long reports—when the process is noisy but you only care about the conclusion.
- Strong permission boundaries: strict auditing, limiting reachable directories, isolating sensitive operations. Tool restrictions move from "just a prompt hint" to a technical constraint.
- Parallel research: multi-dimensional analysis/multi-solution comparisons. Each sub-agent explores independently and results are merged.
- Clear pipeline tasks: step-by-step flows (locate → review → fix → test) with distinct goals, permissions, and outputs for each phase.

### 3. When *Not* to Use Sub-Agents

- Interactive tasks needing rapid back-and-forth or on-the-fly adjustments.
- Highly coupled stages: each step depends intricately on the detailed process of the previous one (not just conclusions).
- Trivial or short tasks: if sub-agent overhead outweighs the benefit.

---

## Architectural Constraint: Sub-Agents Cannot Spawn More Sub-Agents

### 1. What Does This Mean?

- Sub-agents are never nested. All multi-agent orchestration is managed by the main conversation thread.
- There's only one "pipeline dispatcher": the main thread schedules Explore, Reviewer, Fixer, Test-runner, etc., in sequence.

### 2. How to Reuse Knowledge in Sub-Agents

- If a sub-agent needs reusable knowledge/skills, preload them via the `skills` field in its config, rather than spinning up a new sub-agent internally.
- This avoids runaway complexity from "infinite agent nesting" and keeps workflows manageable and predictable.



## Design Agentic Workflows in Daily Work

> [Devin: Coding Agents 101](https://devin.ai/agents101#introduction)

### Delegating Larger Tickets

**1. Let the Agent Own the "First Draft PR"**

Mid-complexity tasks (1–6 hours of human work) are the highest ROI zone — full automation isn't realistic, but saving 80% of the time is. **Role framing: you're the architect, the agent is the builder** — lay out the overall design, constraints, and edge cases upfront to avoid large-scale rework later.

**2. Co-write PRDs / Design Docs with the Agent**

Use the agent for "Discovery" first — have it answer: how does the auth system work? Which services are affected? Where is the critical data flow? Use dedicated planning modes or code search tools (Devin / Claude Code / deepwiki) to read and understand the code before entering the change phase.

**3. Use "Phase Checkpoints" for Complex Multi-Stage Tasks**

Flow: Plan → Implement one sub-block → Test → Fix → Human check → Next sub-block. Write it clearly in the prompt: specify that after completing each phase, the agent must stop, explain progress, describe key logic, and wait for your confirmation.

**4. Teach It to "Prove Correctness"**

When giving feedback, also teach it how to test — don't just say "it doesn't work"; explain how you tested, what data you used, and what the expected result was. Write frequent test routines into its long-term knowledge (standard regression test commands, end-to-end flows) so subsequent tasks can reuse them.

**5. Strengthen Tests in "High-Frequency Agent Change Zones" in Advance**

For modules you're about to hand off to the agent for large rewrites or migrations, first shore up unit tests and integration tests to raise "test confidence." Typical approach: before migrating a critical module from Python to C or another language, increase test coverage for that module first.

### Integrating the Agent into Daily Work

**1. Hand off "Interruptions" to the Agent — Stay Focused on the Main Thread**

When a colleague asks "can you quickly do X / change Y?", you don't have to break your flow — just hand it to the agent to explore or change, and keep doing your deep work. Side projects, prototypes, data scraping, paper reproductions: all can be queued as agent tasks; come back and review results when it's done.

**2. One-Click Triggers for High-Frequency Repetitive Tasks**

Good candidates for automation: deleting feature flags, dependency upgrades, fixing and supplementing tests for new feature PRs. Abstract into robust prompt templates / flows — senior engineers design reusable templates and trigger conditions, then let the agent batch-execute.

**3. Smart Code Review and Standard Enforcement**

With an indexed codebase, the agent can give more context-aware review feedback. Write your team's "common mistakes list" into the codebase and let the agent automatically check for those specific errors on every PR — more flexible than traditional lint.

**4. Use the Agent to Break "Analysis Paralysis"**

When stuck between approaches, have the agent implement multiple versions (e.g., two different architectures / two frontend frameworks — have the agent write a demo of each). Make decisions based on actual code and outcomes, not abstract debate.

**5. Automated Preview Environments**

Every PR automatically creates a preview deployment — especially useful for reviewing agent-written frontend changes directly at an isolated URL. After the agent finishes a PR, you validate the experience in the preview environment and give the next round of feedback.

### Security and Permission Boundaries

- **Give the agent a dedicated account and role** – use a separate email and IAM Role for easy isolation, audit, and permission scoping; prefer testing access to external systems in non-production environments first
- **Use dev / staging environments, not production** – keep the agent's environment consistent with the engineering test environment but completely isolated from production to prevent accidents
- **Use read-only keys wherever possible** – when interacting with external services, prefer read-only access; write operations should be triggered by a human running a script; don't give the agent full write access to production systems

---

## Improve Agent Capabilities

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

