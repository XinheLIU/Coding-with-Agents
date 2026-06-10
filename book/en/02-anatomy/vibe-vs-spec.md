# The Full Spectrum of AI-Era Coding: From Vibe to Spec

> Vibe coding got us here. But shipping to production demands more. Here is the complete technical spectrum of building software in the age of AI — and why the choice between "just vibing" and "rigorous specs" is a false dichotomy.

---

## The Landscape Has Exploded

In February 2025, Andrej Karpathy (former Director of AI at OpenAI/Tesla) coined the term "**Vibe Coding**" — describing what you want in plain language, letting the AI figure out the implementation, and not bothering to read the generated code. The concept resonated instantly. By mid-2025, in Y Combinator’s Winter 2025 cohort, 25% of startups had codebases that were 95% AI-generated. Today, AI writes roughly 30% of Microsoft's internal new code and more than a quarter of Google's.

But then came the "reality check": when teams tried to push those "vibe-coded" applications into serious production environments, the cracks showed up immediately—and they were often fatal.

The software industry's response hasn't been to abandon AI coding — it's been to invent an entire spectrum of methodologies sitting between "just vibe it" and traditional waterfall specs. Your survival in this era depends on understanding this spectrum and picking the right tool for the right battle.

---

## School 1: Vibe Coding — Where the Magic Starts

### What It Is and When to Use It

**Vibe Coding defined:** Iteratively "wrestling" with an AI through casual conversation to turn a vague idea into a working prototype. The secret isn't a "god-tier" initial prompt—it's whether your requirements become clearer over many rounds of trial and error.

**When to use Vibe Coding:**
- You have a fuzzy idea and need to explore direction (prototype validation, creative discovery).
- You're building a small personal tool and learning as you go.
- You want to "build first, plan later" to discover what you actually want.

### The Interactive Development Loop: From Mud to Clarity

**The classic iteration path:**
1. Start with a simple sentence — "I want to build X" — and AI gives you a "rough draft."
2. Use it, then start "venting" feedback: what's missing, what you'd add, what feels wrong.
3. Each round focuses on just a few points: add a feature, adjust a button's feel, tweak the UI.
4. After dozens of rounds: the requirements become crystal clear, and the product shifts from a sketch to a usable tool.

### Four Core Elements

- **Requirement Exploration** – Replace blank-page thinking with "build a draft first." use real feedback to correct original assumptions.
- **Dialogue Stack Accumulation** – Each round builds on the last; the AI remembers existing features and decisions. The chat history *is* the documentation.
- **"Ship then Scream" Iteration** – See the result first, then judge. Use the generate-feedback-adjust loop to converge on the real requirement.
- **Context Management** – As the talk grows, the AI accumulates rules and details. Periodically summarize and realign to avoid "hallucination drift."

### The Real Limitations

- **Code Quality is a Havoc.** AI introduces inconsistent styles and redundant libraries. Six months in, maintenance becomes a nightmare.
- **Architecture Drift.** The AI chooses a path in round 3, builds on it in round 7, and by round 12 you have a codebase shaped by conversational pivots rather than deliberate design.
- **Debugging Bottleneck.** "Productivity gains" turn into dozens of hours spent reading machine-generated text you don't fully understand.
- **Context Collapse.** Once the history gets too long, the AI forgets early requirements or contradicts previous decisions.

Karpathy himself scoped vibe coding as suitable for "throwaway weekend projects"—not production systems.

### Practical Tips
- **Opening:** Focus on the "core pain point"—don't obsess over pixel-perfect borders or colors yet.
- **Iteration:** Only modify 1-2 points per round. Don't dump 20 requirements at once.
- **Maintenance:** Periodically force a summary: "Summarize the current features and pending requirements." If the session gets too long, summarize the state and start a fresh session with that summary as the input.

---

## School 2: Spec-Driven Development (SDD) — The Structured Response

### What It Is
Spec-Driven Development (SDD) flips the workflow: you don't prompt the AI to write code immediately. Instead, you first describe the system's behavior, constraints, inputs, and outputs in a **Specification document**. Only when the "blueprint" is done does the AI write code.

The Spec serves as the **Single Source of Truth**. The AI uses it to generate UI, code, tests, and docs consistently.

### Why It Emerged
As AI handles more implementation, human value shifts upstream to precise definition, architecture, and governance. SDD solves the "**Intent-to-Implementation Deviation**" found in vibe coding, where conversational drift produces something different from what you wanted.

### The SDD Workflow
1. **Specify** — Define requirements in a structured format.
2. **Design** — Generate architecture docs, data flows, and technical designs.
3. **Plan** — Break down into fine-grained tasks with dependencies.
4. **Implement** — AI executes tasks strictly according to the spec, with human review gates.

### 2026 Core SDD Tools
- **AWS Kiro** — Flagship SDD tool with EARS syntax support and Vibe/Spec dual modes.
- **GitHub Spec Kit** — A four-stage pipeline for orchestrating multiple agents (Copilot, Claude Code, etc.).
- **OpenSpec** — Open-source tool: No code is written until the blueprint is solid.
- **Intent** — A living-spec platform with multi-agent coordination.

---

## School 3: BMAD — The Agile AI Team

### What It Is
BMAD (Breakthrough Method for Agile AI-Driven Development) takes SDD to the edge: it builds a full agile team on your machine. You work with an Analyst, PM, Architect, Scrum Master, Developer, and QA—all dedicated AI agents with isolated closed-loop goals.

### Core Mechanisms
- **Role-based Agents** — Clear boundaries and responsibilities for each persona.
- **Documentation is King** — PRDs and architecture diagrams are the truth; code is a derivative byproduct.
- **Epic Sharding** — Breaking massive PRDs into tiny, focused, independent development units with full context.
- **Human-in-the-loop** — Humans control objectives; machines execute within strict guardrails.

---

## School 4: Agentic Engineering

### What It Is
In early 2026, Karpathy proposed **Agentic Engineering**: the discipline of designing systems where fleets of AI agents plan, write, test, and deploy under structured human oversight. This is cold-blooded engineering, not casual prompting.

### The PEV Loop
The core of Agentic Engineering is the **Plan → Execute → Verify** loop:
- **Plan** — Define rules, standards, and success metrics.
- **Execute** — Deploy AI squads into isolated sandboxes (git worktrees).
- **Verify** — Deploy automated test nets, peer reviews, and security scans.

### Multi-Agent Orchestration
Current patterns involve parallel, non-interfering agents:
- **Ralph Loops** — Locking an AI in a loop until it meets absolute completion criteria.
- **Conductor Systems** — Spawning dozens of Claude Code or Codex instances in parallel in isolated sandboxes.
- **GSD (Get Shit Done)** — Compressing tasks into tiny commands with clean context for every sub-task.

---

## Context Engineering — The Unified Field Theory

The secret to all these methods is **Context Engineering**: the science of precisely controlling the "nutrients" (information) delivered to the AI's limited context window.

All AI coding methods ultimately come down to **Context Management**:
- **Vibe Coding** manages context through fragile chat histories.
- **SDD** manages context by crystallizing info into stable "Codebooks" (Specs).
- **BMAD** manages context through role-based sharding.
- **Agentic Engineering** manages context through physical isolation and verification.

---

## Conclusion: The Person with the Best Spec Wins

The most powerful solution is the combination of **Specs** and **Context Micro-control**. High-level architecture requires broad context; task execution requires pure, focused context.

The future belongs to those with "**Strong Taste**"—the ability to evaluate, select, and refine agent output at speed. The agents carry the boilerplate; you, on the throne, handle the judgment. This is the true face of the new era.

---

*Sources: [Karpathy: Agentic Engineering 2026], [Tessl: From Vibe to Spec], [Anthropic: Agentic Coding Trends], [AWS Kiro Whitepaper], [BMAD Method Docs].*
rom understanding to mastery — context management, sub-agents, hooks, skills, and workflow design patterns that will multiply your effectiveness by an order of magnitude.