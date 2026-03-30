# Principles for Using Coding Agents

> These are general principles applying to writing CLAUDE.md, Skills, Subagents: anything consumed by coding Agents

##  Writing Better Prompts

### Give Context Before Instructions

The single highest-leverage thing you can do is front-load context. The agent doesn't know your codebase, your business logic, or your conventions. The more of that gap you close upfront, the better the output.

**For simple tasks**, a one-liner is fine: "Add a loading spinner to the dashboard page."

**For complex tasks**, structure your prompt like a good GitHub Issue:

- **Goal** — what this change accomplishes and why it matters
- **Plan** — the high-level approach and how it breaks into steps
- **Relevant files** — which modules, components, or configs are involved
- **Constraints** — what should NOT be touched, and any edge cases to handle
- **How to verify** — test commands, expected behavior, or acceptance criteria

The more complex the task, the more you should write. A five-minute prompt can save an hour of back-and-forth.

### Point to the Starting Line

Don't make the agent go treasure-hunting through your repo. Even a rough pointer helps enormously:

- "The auth logic lives in `src/services/auth/`"
- "Read the migration guide at `docs/v3-migration.md` first"
- "This follows the same pattern as `UserGroupController`"

You don't need to know the exact filename. "The API route handlers in the orders module" is vastly better than nothing.

### Say What Can Go Wrong

Think about how a smart-but-new person would misunderstand your request, then preempt it:

- "Don't modify the legacy adapter — it's being deprecated separately"
- "The test suite requires a running Docker container; run `make dev-up` first"
- "This endpoint is public-facing — input validation is non-negotiable"

Anticipating failure modes is worth more than adding detail to the happy path.

> **With frontier models (Opus 4.6, o3, etc.):** You can relax this for well-established patterns. If you're asking for a standard CRUD endpoint in a clean codebase, the model will infer conventions correctly most of the time. Save the defensive prompting for genuinely ambiguous or high-risk changes.

---

## Give the Agent a Feedback Loop

The agent's real superpower isn't generating code on the first try—it's the ability to **make a mistake, see the error, and self-correct.** Your job is to make that loop as tight as possible.

Provide the agent with:

- **Type checking** — TypeScript strict mode, Python type hints with mypy
- **Tests** — unit tests it can run after every change
- **Linting** — ESLint, Ruff, or whatever your project uses
- **Run commands** — spell out how to install deps, run tests, start the dev server

A coding agent with a working test suite is 5x more effective than one without. The tests become its eyes.

> **With frontier models:** Earlier models needed you to explicitly say "run the tests after every change." Current models with extended thinking and tool use will do this naturally. You still need the tests to *exist*—you just don't need to babysit the loop.

---

## A Structured Workflow That Scales

> [How FAANG Vibe Codes](https://x.com/rohanpaul_ai/status/1959414096589422619)

Solo hacking with an agent is one thing. Using agents in a team that ships production software is another. Here's the workflow pattern that's emerging at high-performing engineering orgs:

**1. Design first, code later.** Start with a technical design doc—system architecture, data flow, key tradeoffs. Senior engineers review it. The AI doesn't decide the architecture; humans do.

**2. Break it down, then hand it off.** After design review, decompose the work into tightly scoped tasks. Each task should be completable in a single agent session. Vague, sprawling tasks produce vague, sprawling code.

**3. Tests first, then implementation.** Use the agent in a TDD style: write the test (or have the agent write it and you approve), then have the agent write the code to make it pass. This keeps the agent anchored to concrete behavior rather than drifting.

**4. Review everything.** Every change goes through code review—by humans, optionally assisted by AI. Then staging. Then production. The agent accelerates the middle of the pipeline; it doesn't remove the guardrails at the edges.

Teams using this pattern report roughly **30% faster idea-to-production cycles** without sacrificing quality, because the rigor (design → TDD → review → staging) is baked into the process, not bolted on after the fact.

---

## Time Management — Know When to Walk Away

> [Devin: Coding Agents 101](https://devin.ai/agents101#introduction)

Working with agents requires a new kind of discipline: knowing when to stop.

### Recognize the Signs of a Dead End

If the agent keeps ignoring your corrections, loops on the same error, or drifts further from the goal with each message—**stop.** A long thread of corrections almost always means you've hit a fundamental gap, not a prompting problem. More messages won't fix it.

### Restart Cheap, Restart Often

A fresh session with a well-written one-shot prompt will almost always outperform a 30-message thread of course corrections. The old session has accumulated context pollution—half-reverted changes, contradictory instructions, a messy environment. Starting clean is not admitting defeat; it's good engineering.

### Play to Strengths

Early on, experiment across different task types to discover where the agent excels and where it struggles. Then ruthlessly play to its strengths. Don't spend an hour coaching the agent through something it's bad at when you could do it yourself in fifteen minutes and redirect the agent to where it's 10x.

> **With frontier models:** The "dead end" threshold has moved significantly. Opus-class models can recover from deeper holes and follow longer correction chains. But the principle still holds—if you're past ~10 back-and-forth corrections and the output is getting *worse*, restart.
