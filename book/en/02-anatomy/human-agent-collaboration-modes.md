# Human-Agent Collaboration Modes

Last updated: 2026-07-27

> Coding agents do not remove engineering judgment. They amplify it. The practical skill is knowing when to explore with an agent, when to turn intent into a spec, when to let the agent execute, and when to slow down for verification.

---

## Why "Vibe vs Spec" Is Too Small

The old question was whether you should "vibe code" or "spec code." That framing was useful for a moment, but it is too narrow for real engineering work.

**Vibe coding** is not a complete development method. It is an **exploration mode**: useful when the idea is fuzzy, the cost of being wrong is low, and the goal is to make the problem more concrete. The output is not production code. The output is clearer intent.

**Spec-first work** is also not the whole story. A spec helps when the desired behavior is stable enough to describe, but a spec alone does not guarantee correctness. You still need execution boundaries, tests, review, and a way to feed lessons back into durable context.

The better question is:

> Given the clarity of the requirement, the risk of the change, and the cost of verification, what collaboration mode should you use?

This chapter connects the mechanics from [How Coding Agents Work](how-agents-work.md) with the control framework from [Autonomy Levels & Human Intervention](autonomy-levels.md). The agent can read files, run tools, and edit code. Your job is to choose the right contract for the work.

---

## AI Raises the Floor, Humans Raise the Ceiling

The simplest mental model is:

> **AI raises the floor. Humans raise the ceiling.**

Agents are excellent at making a baseline solution appear quickly. They can draft code, scan a codebase, enumerate edge cases, generate tests, and produce documentation faster than a human can type.

But the ceiling still comes from human judgment:

- What problem is worth solving?
- What is deliberately out of scope?
- Which architecture fits this system's future?
- Which failure mode is unacceptable?
- Which trade-off matches the business context?

The mistake is not using AI. The mistake is asking AI to make decisions that require product context, architectural taste, or risk ownership.

When collaboration works, the agent carries the repetitive weight and the human keeps the direction, constraints, and acceptance bar intact.

---

## The Collaboration Spectrum

Use a spectrum, not a binary:

```text
Explore -> Frame -> Specify -> Execute -> Verify -> Capture
```

Each stage has a different goal, artifact, and ownership model.

| Stage | Goal | Agent role | Human role | Output |
| --- | --- | --- | --- | --- |
| **Explore** | Make a fuzzy idea concrete | Prototype, ask questions, map options | React, compare, choose direction | Prototype, notes, open questions |
| **Frame** | Decide what matters | Surface constraints and trade-offs | Set boundaries and priorities | Problem frame, non-goals |
| **Specify** | Turn intent into a contract | Draft requirements and edge cases | Correct business judgment | Spec, acceptance criteria |
| **Execute** | Implement bounded work | Edit code, write tests, update docs | Review scope and diffs | Working change |
| **Verify** | Prove the result | Run checks, generate evidence | Decide if evidence is enough | Test results, review notes |
| **Capture** | Make the lesson reusable | Summarize rules and update docs | Approve durable context | `AGENTS.md`, docs, test cases |

This is why [Prompting Principles](../01-prompt/prompting-principles.md) and [Using AGENTS.md](../01-prompt/agents-md.md) matter early. A good prompt starts the loop. Durable context keeps the next loop from starting at zero.

---

## Responsibility Split

The most important design decision is not which model to use. It is who owns which class of work.

### Human-Only Decisions

These decisions may use agent input, but the final call belongs to you:

- **Product boundary:** what this change solves and what it explicitly does not solve.
- **Architecture:** service boundaries, data model shape, caching strategy, system integration.
- **Technology trade-offs:** database choice, queueing model, concurrency policy, dependency adoption.
- **System consistency:** API style, logging standards, error semantics, permission model.
- **Risk acceptance:** what can break, what must not break, and what rollback must look like.

The agent can produce options and consequences. It cannot know what your organization should value.

### Agent Drafts, Human Accepts

This is the main work zone for many application projects:

- Business logic implementation.
- API controllers, services, data access code.
- Frontend pages and components.
- Unit tests, integration tests, and API docs.
- Migration drafts and compatibility notes.

The hard rule:

> Do not accept code you cannot explain.

If you cannot explain the accepted code, either the requirement is still unclear or the implementation has moved beyond your control. Both are reasons to stop and reframe before continuing.

### Agent-Owned Mechanical Work

Some work is low-risk and mostly mechanical:

- Formatting and lint fixes.
- Simple renames.
- Boilerplate scaffolding.
- Script and config generation.
- Basic test harness setup.
- Repetitive documentation updates.

For these tasks, high autonomy is reasonable. You still scan the result, but you should not spend senior-engineer attention on every token.

This maps directly to [Autonomy Levels & Human Intervention](autonomy-levels.md): high autonomy for reversible peripheral work, tight supervision for core logic and high blast-radius changes.

---

## The Six-Dimension Requirement Document

Specs fail when they are treated as paperwork. They work when they become a precise contract between human intent and agent execution.

A useful requirement document for coding agents should cover six dimensions:

| Dimension | Purpose | Typical agent contribution | Human responsibility |
| --- | --- | --- | --- |
| **Business goal** | Define the problem and target user | Infer a draft from existing code and notes | Correct the direction |
| **User scenarios** | Describe real workflows and pain points | Suggest common scenarios | Prioritize true scenarios |
| **Interface contract** | Lock inputs, outputs, errors, and routes | Draft from code conventions | Approve compatibility |
| **Edge cases** | Prevent happy-path-only implementation | Enumerate technical failures | Decide product behavior |
| **Legacy constraints** | Avoid breaking existing systems | Extract rules from `AGENTS.md`, docs, and code | Confirm what is binding |
| **Out of scope** | Prevent feature creep | List possible exclusions | Cut the scope decisively |

Agents are strong at code-shaped dimensions: interface contracts, technical edge cases, and legacy constraints. They are weaker at business goals, prioritization, and scope cuts.

That split is the heart of the workflow: let the agent draft the 70% it is good at, then spend your judgment on the 30% that determines whether the feature is right.

For team-scale work, this becomes the bridge to [Specs as Source of Truth](../04-team/specs-as-source-of-truth.md). The spec is not a bureaucratic artifact. It is the source code of intent.

---

## A Reusable Delivery Loop

For a real feature or legacy-system change, use a repeatable delivery loop:

1. **Discovery:** define the module, users, required capabilities, dependencies, and non-goals.
2. **Data first:** design or inspect core entities, state tables, indexes, and persistence rules before API shape.
3. **Layered implementation:** work bottom-up through storage, domain service, DTO/facade, controller, then UI.
4. **Segmented verification:** test each layer immediately with unit tests, API calls, or small executable checks.
5. **End-to-end validation:** run one complete user path from database state to browser behavior.
6. **Capture:** turn repeated lessons into specs, tests, `AGENTS.md` rules, templates, or review checklists.

This loop keeps the agent from drifting. It also turns one successful delivery into compound context for future work.

Later in this chapter, [Context Management Principles](context-management.md) explains how to keep that context clean. [Sub-Agents](sub-agents.md) explains when to isolate noisy research or verification work. [Systematic Thinking](systematic-thinking.md) shows how to combine memory, skills, sub-agents, hooks, and tools into larger workflows.

---

## Mode-Switching Gates

The collaboration mode should change when the work changes. Use explicit gates.

| Signal | Switch from | Switch to | Why |
| --- | --- | --- | --- |
| You keep changing the desired behavior | Specify | Explore | The requirement is not stable yet |
| The prototype reveals the real workflow | Explore | Frame | You have enough evidence to choose direction |
| Multiple people or systems depend on it | Frame | Specify | Intent must become reviewable |
| The change touches data, auth, money, or core logic | Execute | Verify | Failure cost is high |
| The diff is larger than you can review comfortably | Execute | Specify | Scope needs to be split |
| The agent repeats the same mistake | Execute | Capture | The rule belongs in durable context |
| Review finds unclear intent, not just bad code | Verify | Frame | The problem definition is wrong |

This is the practical upgrade from "vibe versus spec": you do not pick one identity. You move deliberately between modes.

---

## Anti-Patterns

**Prototype-to-production drift.** A prototype becomes production because it "basically works." The missing step is turning what you learned into a spec, tests, and reviewable constraints.

**Spec theater.** A document exists, but it does not settle behavior, edge cases, or non-goals. If the agent still has to guess the important parts, the spec is not doing its job.

**Context soup.** Requirements, code snippets, old decisions, failed attempts, and random tool output all sit in one long conversation. Summarize, split, or capture the durable parts.

**Verification theater.** The agent says tests pass, but no one checks whether the tests prove the right behavior. Evidence is useful only when it matches the risk.

**Autonomy mismatch.** You micromanage formatting while rubber-stamping architecture. Reverse that. Spend attention where failure is expensive.

**Unowned judgment.** The agent makes product decisions because the human never named them. If a decision affects users, risk, or long-term maintenance, it needs a human owner.

---

## Conclusion

The mature workflow is not "just vibe" or "always spec." It is a collaboration system:

```text
Explore when intent is fuzzy.
Frame when trade-offs matter.
Specify when others must rely on the result.
Execute when the work is bounded.
Verify when failure is costly.
Capture when the lesson should compound.
```

Agents make software faster to produce. They do not make judgment optional.

The best builders use agents to raise the floor, then use their own taste, product sense, and engineering discipline to raise the ceiling. That is the real collaboration model.
