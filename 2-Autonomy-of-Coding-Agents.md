# Level 2: Anatomy of Coding Agents

## What Coding Agents Are (How They Differ from Chatbots)

### Evolution of Coding Tools

AI coding tools have evolved significantly since GitHub Copilot's introduction.

![Coding IDE History](./assets/Coding-IDE-history.png)

![AI Coding Tools as of 2025](./assets/AI-Coding-Tools-2025.png)

### How Coding IDEs / Agents Work

Unlike chatbots, coding agents are designed specifically for coding tasks. They rely on three core components:

- **System prompt** – task-specific instructions baked into the agent
- **Built-in Tools / MCPs** – file system access, terminal, browser, APIs
- **Context Strategy** – code embeddings for semantic search across the codebase

**Common Functionality Modes:**

- **Inline** – A small context window around the current code is sent to the server; an infilling LLM returns a suggestion displayed inline
- **Function** – Single function in scope; context is tightly scoped
- **Single-file Chat** – Code chunks are stored as embeddings in a semantic index; queries retrieve the most relevant chunks as LLM context; the IDE regularly re-indexes using Merkle trees for efficient diff updates
- **Multi-file Chat** – Multiple files are pulled into context based on relevance

**The Future: True AI-Native IDE**

- **Background agents** – Cloud-based, asynchronous AI agents offer significant 6–12x efficiency gains

![Sync vs Async Coding Agents](./assets/Sync-Async-Coding-Agents.png)

- **MCP** – Model Context Protocol for plugging in external tools
- **Learned memories** – The agent builds persistent knowledge of the codebase over time
- **Bugbot (PR review)** – Automated code review on pull requests

---

## Limitations of Autonomous Agents

**1. Debugging Capability**

Real production bugs often require databases, logs, and complex reasoning — current agents struggle to complete high-difficulty debugging independently. **Best practice:** have the agent produce a list of probable root causes and fix suggestions; let humans choose the most reasonable approach, then have the agent implement it.

**2. Fine-Grained Visual Capability**

Agents have difficulty precisely matching design mockups / Figma screenshots to pixel level — they're better suited for visually describable information expressed in code. **Suggestion:** use a well-designed system and reusable components so the agent handles UI tasks at a more abstract level.

**3. Knowledge Cutoff Limitations**

New libraries, frameworks, and APIs can trigger "old usage" patterns if the agent lacks recent documentation. You must actively feed the agent the latest docs rather than relying on its training knowledge.

---

## How to Collaborate with Coding Agents

> - [How OpenAI Uses Codex](https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf)
> - [How Anthropic Uses Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf)

**Summary of collaboration principles:**

| Dimension | Principle |
|---|---|
| **Autonomy** | High for low-risk, repetitive, reversible work; Low for core/critical logic; Medium for exploration with human selection (Best-of-N) |
| **Human intervention** | Always at: intent, planning, risk, final decisions; especially for core logic, architecture, product-critical paths |
| **Proven patterns** | Plan-first then generate; Small tasks + frequent commits; Persistent memory files (AGENTS.md / Claude.md); Async for edges, sync for core; Best-of-N synthesis |

![How to Collaborate with Claude Code](./assets/How-to-Colloborate-with-Claude-Code.png)

---

## 1. How Much Autonomy Should an Agent Have?

### Principle: Graduated Autonomy by Risk & Criticality

From both Codex (OpenAI) and Claude Code (Anthropic), the pattern is:

> **High autonomy for low-risk, repetitive, peripheral work. Tight supervision for core, business-critical logic.**

### What Agents Can Do Autonomously

High autonomy / async loops are best for:

- Refactors & migrations (multi-file, mechanical changes)
- Test generation (edge cases, coverage expansion)
- Boilerplate scaffolding (folders, stubs, configs, telemetry)
- Performance cleanup (identify hot paths, propose optimizations)
- Repo exploration & codebase mapping
- Data plumbing, dashboards, internal tools
- "Drive-by" fixes, backlog chores, small improvements
- Growth / marketing pipelines (CSV analysis, variant generation)
- Design-to-code prototypes (Figma → working UI)
- Repetitive infra/debug tasks (Terraform, K8s logs, etc.)

### Where Autonomy Is Constrained

Low autonomy / supervised mode for:

- Core business logic
- Security-sensitive code paths
- Architecture decisions
- High-blast-radius changes
- Product-critical behavior
- Strategy, invariants, and correctness-sensitive flows

In these areas the agent acts more like a pair programmer, a proposal generator, or a design explorer — not a decision maker.

### Practical Rule of Thumb

| Task Type | Autonomy Level |
|---|---|
| Mechanical, repetitive, reversible | 🔥 High (async, auto-loops) |
| Exploratory, design, refactor | ⚖️ Medium (Best-of-N + review) |
| Core logic, prod-critical paths | 🧠 Low (human-in-the-loop, sync pairing) |

---

## 2. When Should Humans Intervene?

### Principle: Humans Own Intent, Risk, and Final Judgment

Humans step in at **four key points**:

**1️⃣ At the planning & framing stage**

Both OpenAI and Anthropic emphasize starting in Ask Mode / chat, writing prompts like GitHub Issues / PRs, and defining: Goal, Scope, Constraints, References, Style / invariants. Humans intervene to set direction, bound the problem, provide domain context (AGENTS.md / Claude.md), and decide "what matters."

**2️⃣ During core logic & high-risk changes**

Humans should pair synchronously, review every diff carefully, challenge assumptions, simplify overcomplex solutions, and decide trade-offs. Anthropic explicitly calls for synchronous pairing for core business logic.

**3️⃣ At review, merge, and selection time**

Patterns used: Best-of-N (generate multiple solutions → human selects/merges), checkpoint-heavy git workflow (commit often, rollback easily). Humans intervene to choose between alternatives, validate correctness & style, enforce product & business constraints, and ensure no silent regressions.

**4️⃣ When uncertainty, ambiguity, or design trade-offs appear**

Codex & Claude are used to explore alternatives, surface trade-offs, and pressure-test assumptions. But humans decide which trade-off to accept and what aligns with strategy, product, or org constraints.

### Simple Mental Model

| Owner | Responsibility |
|---|---|
| **Humans** | **Why** (intent, goals, priorities) · **What matters** (constraints, risks, product sense) · **Final call** (merge, ship, rollback) |
| **Agents** | **How** (drafting, searching, refactoring, enumerating options) · **The grind** (repetition, scale, coverage, exploration) |

---

## 3. Proven Collaboration Patterns from Real Products

Battle-tested patterns from OpenAI + Anthropic:

| # | Pattern | Key Actions | Core Insight |
|---|---|---|---|
| 1 | **Plan first, then generate** | Start in Ask/Chat mode → refine scope → run code tasks | Prevents garbage-in/garbage-out; aligns agent with intent |
| 2 | **Small tasks, frequent checkpoints** | ~1-hour tasks, commit often, roll back freely | Keeps iteration visible and reversible |
| 3 | **Persistent memory files** | Maintain `AGENTS.md` / `Claude.md` with conventions, rules, constraints | Agent behaves like a long-term teammate, not a stateless tool |
| 4 | **Async for edges, sync for core** | Async: refactors, tests, chores; Sync: core logic, architecture, critical paths | Most important workflow insight — match human involvement to task criticality |
| 5 | **Best-of-N synthesis** | Ask for multiple solutions, compare trade-offs, merge the best parts | Diversity of outputs improves quality on hard problems |
| 6 | **Agent as force multiplier, not oracle** | Interrupt it, ask for simpler versions, adjust scope dynamically | Treat it as an iterative collaborator, not a one-shot answer machine |
| 7 | **Horizontal capability layer** | Deploy agent across engineering, product, design, data, legal/ops | Non-coders ship tools; engineers move up to system design |

---

## Vibe Coding

### What It Is and When to Use It

**Vibe Coding defined:** through iterative multi-turn conversations with AI, you gradually turn a vague idea into a working product. The key isn't the length of the prompt — it's whether your requirements become clearer over time.

**When to use Vibe Coding:**
- You have an unclear idea and need to explore direction (prototype validation, creative projects)
- You're building a small personal tool and learning as you go
- You want to clarify requirements and thinking by "building first, planning later"

### The Interactive Development Loop: From Fuzzy to Clear

**Typical iteration path:**
1. Start with one sentence — "I want to build X" — and AI gives you a basic version
2. Use it and give feedback: what's missing, what you'd add, what details to change
3. Each round changes just a few things: add a feature, adjust the interaction, tweak the style or simplify the UI
4. After many rounds: requirements shift from vague to clear, product shifts from demo to usable tool

### Four Core Elements

- **Requirements exploration** – Replace blank-page thinking with "quickly build a rough version"; use the real experience of using it to correct your original assumptions
- **Accumulated dialogue** – Each conversation continues from the last; AI remembers existing features and decisions; the chat history is itself the project documentation
- **Iterative optimization** – See the result first, then judge what's wrong → use the generate–feedback–adjust loop to converge on the real requirement
- **Context management** – As conversations deepen, AI accumulates a lot of context: requirements, constraints, implementation details; periodically summarize and realign

### Vibe Coding vs. Spec Coding

| | Vibe Coding | Spec Coding |
|---|---|---|
| **Requirements** | Uncertain at the start; dynamically clarified through dialogue | Relatively clear upfront; described statically in a spec doc |
| **Best for** | Exploratory, prototype validation, personal tools | Clear requirements, team collaboration, production projects |

The same project can switch between modes at different stages: Vibe early on, Spec later.

### Practical Tips

**Starting a conversation:**
- Lead with the "core functionality" and "problem to solve" — don't get hung up on button colors or layout details right away
- Accept that the first version will be imperfect; treat it as a "playable draft"
- First round check: is the core logic right? Does the flow work?

**During iteration:**
- Adjust only 1–2 things per round — don't stuff a pile of requirements into one message
- Use concrete examples to describe problems: "When I open the page after 3pm, I'd like…" is more effective than abstract descriptions
- Preserve key decisions: explicitly state in the conversation which features stay and which get cut

**Context maintenance:**
- Periodically ask: "Can you summarize the current features and any unfinished requirements?" — to realign both sides
- Be explicit about the current iteration goal, e.g., "This round is UI-only, no functional logic changes"
- When the conversation gets too long and tangled, write a brief summary and start a new session with it as the starting point

### When to Switch from Vibe to Spec

Watch for these signals that you've outgrown Vibe Coding:

- **Memory boundary** – AI starts forgetting early requirements, causing feature conflicts
- **Collaboration needs** – You need multiple people involved or need to explain the project status to others
- **Growing complexity** – Project scope exceeds what the conversation can hold
- **Quality requirements** – You need to ensure consistency and maintainability

---

## Common Failure Patterns

### Requirements Level

| Failure Pattern | Symptoms | Prevention |
|---|---|---|
| **Unclear requirements** | Only says "good and efficient" with no specific scenario | Use JTBD to clarify the task; set measurable acceptance criteria |
| **Feature complexity explosion** | Starts with a dozen features at once | Keep core features to 3–5; validate with MVP first |
| **Features disconnected from tasks** | Starting from "comprehensive features" rather than real tasks | Analyze actual tasks and existing alternatives first |

### Technical Level

| Failure Pattern | Symptoms | Prevention |
|---|---|---|
| **Poor tech stack choice** | Chasing "new, cool, advanced" technology | Prefer mature, well-documented, AI-friendly tech |
| **Over-reliance on AI** | "If AI says it's fine, it's fine" — no verification | Maintain "trust but verify"; build your own decision framework |
| **Lack of technical fundamentals** | Only checks "does it run" — ignores security, performance | Learn basic security and performance fundamentals; build a testing process |

### Scenario Level

| Failure Pattern | Symptoms | Prevention |
|---|---|---|
| **Wrong user group** | Target users too broad ("everyone") | Segment users; serve one small group first, then expand |
| **Wrong scenario assumptions** | Assuming "users will use it every day" without validation | Do real user research; use data, not imagination |
| **Underestimating alternatives** | Only seeing "existing tools are bad"; ignoring their stickiness | Systematically analyze existing tool strengths/weaknesses; assess migration cost |

### Habit Level

| Failure Pattern | Symptoms | Prevention |
|---|---|---|
| **Overestimating sustained usage** | "I/users will definitely keep using it" | Find your relative advantage; test real usage with small groups |
| **Underestimating migration cost** | Assuming "just import/export" is enough | Detail every migration step; design a gradual migration path |
| **Ignoring learning curve** | Designer thinks "it's simple and intuitive"; users can't find the entry point | Do real user testing; provide clear tutorials and onboarding |
