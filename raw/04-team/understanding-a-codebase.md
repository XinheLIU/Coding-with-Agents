# Understanding a Codebases with AI

Last updated: 2026-05-18


> **What this chapter is — and isn't.** . It's a methodology for walking into a codebase you didn't write, building understanding faster than you thought possible, and turning that understanding into assets your AI can use. The first section is context — why this problem is structural, not personal. The rest is a repeatable workflow.

---

## Why Undocumented / Large Codebases Are Hostile to AI

Three structural problems make existing projects harder for AI than greenfield work. Knowing them changes how you approach every step that follows.

### 1. Comprehension Debt

Google's Addy Osmani coined the term. The dynamic is simple: AI generates 1,000 lines; you have time to deeply understand 100. The other 900 sit in your repo, not your brain. Anthropic's own 52-person RCT confirmed it — AI-assisted developers scored 17% lower on code comprehension, with debugging hit hardest. ([Full research at anthropic.com/research](https://www.anthropic.com/research))

Legacy projects start with a decade of pre-existing comprehension debt. Every AI-assisted change adds more unless you have a systematic way to absorb AI output back into understanding. CLAUDE.md and SKILL.md aren't note-taking — they're the countermeasure.

### 2. Brownfield Tax

FIU researchers identified five ways old projects tax AI. Each has a specific fix:

| When this happens | Countermeasure |
| --- | --- |
| Quality drops past ~40% context utilization (**Dumb Zone**) | Compress, distill, stay lean |
| AI forgets everything each new session (**Cross-session Forgetting**) | CLAUDE.md as persistent memory |
| AI suggests incompatible "modern" patterns (**Context-blind suggestions**) | Feed historical context via MCP |
| Senior devs slow down correcting naive output (**Translation Tax**) | SKILL.md to encode workflows |
| Relevant code spread across too many files (**Context Overflow**) | Context Maps |

([FIU Brownfield Tax paper](https://arxiv.org/abs/2503.07941) — the full taxonomy is worth reading.)

### 3. Verification Debt

Sonar's survey: 42% of code is AI-assisted, 96% of devs don't fully trust AI output, only 48% review every line. Veracode 2025: 45% of AI-generated code has security vulnerabilities. Ox Security named it **Army of Juniors** — functionally impressive, architecturally unaccountable.

The gap between AI's output speed and human verification capacity is structural. **Better models widen it.** The fix is methodology: Characterization Tests, cross-model review, CI gates. They're not best practices. They're survival requirements.

> **The three debts are one problem.** AI writes faster than humans can understand or verify. Legacy projects amplify the gap. The industry's answer isn't to make AI weaker — it's to equip engineers with a methodology that can keep pace.

---

## Code Understanding cannot be skipped by Human

>  **The convergence:** Academia, big tech, consultancies, and open source all land on the same skeleton — **Understand → Transform → Verify**. Different names, same bones.

You don't need to read everything. But understanding can not be skipped.

**Anthropic.** [Code Modernization](https://claude.com/solutions/code-modernization) Starter Kit (March 2026) structures legacy work as: codebase analysis → incremental migration → equivalence verification. Same three-layer skeleton. Their docs explicitly position CLAUDE.md as persistent project memory. ([Claude Partner Network](https://www.anthropic.com/claude-partner-network))

In **Academia.**, *Chain of Understanding* (ICPC 2026) found expert code auditors follow the same chain: global understanding → local understanding → relational understanding, in a spiral. Their CodeMap tool reduced LLM dependency by 79%. This course's Part 2 (Context Map → Seam identification) is that chain, applied. ([Search arXiv for the paper](https://arxiv.org))

**Open source tools are also emerging** Aider (git-native, always reversible), Cline (transparent execution), Continue (multi-model), Goose (toolkit-based agents). Each validates a different design value within the same converging direction.

Michael Feathers' *Working Effectively with Legacy Code* (2004) became popular again in 2026. It introduced Characterization Tests and Seams — two concepts that became urgent when AI started modifying code faster than humans can review. Same problem, new executor. If you haven't read it, now is the time.

---

## The Nine Steps

This is the full workflow for understanding an existing codebase. Each step builds on the last. Each produces artifacts the next step consumes. The goal isn't just your understanding - it's producing assets your AI can read, so understanding transfers across sessions and teammates.

The deeper principle: **do not start by reading source code randomly**. Source code is the densest representation of the system. If you enter it before you have a map, you are walking into a forest without roads, rivers, or exits.

Use this order instead:

1. **Model** - what concepts this software is built around, and what problem those concepts solve.
2. **Interface** - how the model exposes its capabilities to users, callers, tools, and developers.
3. **Implementation** - how the model and interface are realized internally, including structure, tradeoffs, and key technologies.

This order repeats at every level. A whole system has a model, interface, and implementation. So does a subsystem. So does a module. Sometimes even a single class or data structure does. Understanding a codebase means growing a **design tree** in your head: open one layer, identify its model, interface, and implementation, then decide which branch needs deeper inspection.

### Step 1: Read the README and Root-Level Docs

**Goal:** Build the roughest possible sketch. 15-30 minutes.

Open the project. Start with README.md, then `docs/`. Don't skip a bad README — even a sparse one tells you something, including that documentation is weak (which is itself useful context).

Extract three things:

- What problem does this solve?
- What environment does it run in? (Language, framework, deployment)
- What are its core concepts? (Domain terms, naming conventions, key abstractions)

**Why this comes first:** docs are not proof, but they reveal intent. Code tells you what the system currently does. Docs often tell you what someone thought the system was supposed to be. The gap between those two is one of the first useful signals in a legacy project.

At this stage, look for the **model vocabulary**:

- What nouns repeat? `User`, `Account`, `Workspace`, `Prompt`, `Pipeline`, `Job`, `Order`, `Payment`.
- Which nouns are business concepts, and which are implementation choices?
- Which terms appear in headings, API paths, database tables, package names, and UI labels?
- Which concepts seem stable enough that the system would stop being itself if they changed?

That last question matters. A model is not just "the entities in the database." It is the abstraction that makes this software different from other software. Redis can change from single-threaded to multi-threaded and still be Redis, because the model and interface remain stable. The implementation changed; the core abstraction did not.

Use AI here, but keep the ask small:

```txt
Read only the README and root-level docs. Summarize the system's likely core model:
- the main domain concepts
- the problem each concept seems to solve
- terms that look like implementation details rather than domain concepts
- questions I should verify in code later
```

This is orientation, not understanding. Think of it as reading the back cover before deciding how to read the chapters.

> **Output:** A paragraph of notes. That's it.

---

### Step 2: Scan the Project Structure

**Goal:** Produce a module map - what pieces exist, what each roughly does, and which ones are core.

Clone the repo. Don't open source files. Look only at directory organization:

- **Java:** `pom.xml` module list, then `src/main/java` package trees
- **Go:** `cmd/` for binaries, `internal/` for domain logic, `pkg/` for shared libraries
- **TypeScript:** `packages/` layout, or `src/` top-level subdirectories
- **Python:** `pyproject.toml` / `setup.py`, then source tree

Build a rough mental map. Something like:

```txt
auth/          — authentication and session management (core)
payment/       — billing and subscription (core)
notification/  — email and push infrastructure (supporting)
admin/         — internal dashboard (peripheral)
legacy/        — old API v1, partially migrated (tech debt)
```

**Why structure before implementation:** directory structure is the first implementation-level model. It shows how the project decomposes itself. Even when names are messy, the mess is information: unclear boundaries, framework leakage, duplicated responsibilities, and abandoned migrations all show up in the tree before they show up in individual functions.

As you scan, classify modules by role:

| Module type | Question to ask | Why it matters |
| --- | --- | --- |
| Core domain | Would the product still be the same without this? | This is where model understanding matters most. |
| Interface adapter | Does this expose the system through HTTP, CLI, RPC, jobs, or messages? | These are entry points into the model. |
| Infrastructure | Is this database, queue, cache, auth, logging, config, or deployment code? | These are implementation choices and should usually be replaceable. |
| Shared utility | Is this used everywhere but owns no domain concept? | These create broad blast radius. |
| Legacy or migration | Does this preserve an old contract or transition path? | These often explain strange constraints. |

The useful question is not "what files exist?" It is:

```txt
Which directories represent the business model, which expose interfaces, and which are implementation mechanisms?
```

This distinction prevents a common design mistake: treating a technology choice as if it were the model. In an architecture diagram, `Order`, `Payment`, and `Shipping` are model-level concepts. `Kafka` is an implementation choice. If Kafka appears everywhere in business code, that tells you the implementation has leaked into the model.

Don't read code. Don't follow imports. Map the territory. Ambiguous directory names become investigation targets for later steps.

> **Output:** A directory tree with one-line annotations. Keep it in your notes.

---

### Step 3: Find the Core Entry Points

**Goal:** Locate the coordinate origin - where execution begins and how the outside world reaches the model.

With the module map in hand, find how the outside world enters:

- **HTTP services:** `main` function, route registrations, controller files, middleware chains
- **Message consumers:** consumer/listener registrations, topic subscriptions
- **Scheduled jobs:** cron registrations, task schedulers
- **CLI tools:** argument parsers, command registrations

Entry points are your coordinate origin. Every main flow radiates from them. Everything you read later can be traced back to an entry point, which means you can always answer "how does this code actually get called?"

**Why entry points matter:** they turn abstract structure into a mainline. You cannot remember every interface. You do not need to. You need one representative path that shows how the system wants to be used.

For a web framework, the mainline might be:

```txt
HTTP route -> controller -> service -> repository -> database -> response
```

For an event-driven system:

```txt
topic subscription -> message decoder -> handler -> domain service -> side effect -> acknowledgement
```

For a CLI:

```txt
command registration -> argument parsing -> command handler -> domain operation -> output
```

This is where "find the mainline, then study the style" becomes practical. Interfaces are too numerous to memorize one by one. A mainline gives you a spine. Once you understand the spine, individual endpoints or commands become variations instead of isolated facts.

Pick *one* entry point and trace its full path: inbound trigger all the way to response or side effect. Don't understand everything. Just follow the thread.

While tracing, record:

- What object or function receives external input?
- Where does input validation happen?
- Where does external language become domain language?
- Which module owns the actual business decision?
- Where do implementation details enter: database, queue, filesystem, network, cache?
- What does the caller receive back?

The point is not just "this calls that." The point is to see where the interface ends and where the model begins.

> **Output:** A list of entry points with file paths. Plus one end-to-end trace.

---

### Step 4: Draw the Full Picture

**Goal:** Externalize fragmented understanding into visual artifacts and separate model, interface, and implementation layers.

Drawing reveals gaps. When you try to draw a data flow and realize you don't know how module A talks to module B — that's the most valuable signal you'll get. Gaps tell you exactly what to investigate next.

Three diagrams:

1. **Architecture diagram** — layers (frontend, backend, database, middleware, external services), with one-sentence responsibilities per module. Summarize logging, monitoring, and configuration as a single box.
2. **Module dependency diagram** — internal modules only, with dependency arrows. Mark circular dependencies in red.
3. **External dependency diagram** — what the project depends on outside itself. Three categories: core language dependencies, middleware, external APIs. Use different colors per category.

These don't need to be polished. Hand-drawn is fine. The act of drawing is the point.

**Why diagrams are not decoration:** a diagram is a thinking tool. It forces you to decide what belongs at the same level of abstraction. That decision exposes confusion.

Common drawing mistakes are diagnostic:

| Symptom | What it usually means |
| --- | --- |
| Business modules and middleware appear as peers | Model and implementation are mixed. |
| Every class appears in the architecture diagram | You are drawing code, not design. |
| Arrows go in every direction | Boundaries are weak or dependencies are uncontrolled. |
| The diagram cannot explain one real request | It is too abstract to guide implementation. |
| The diagram changes completely for each feature | You have not found the stable model yet. |

When you draw, split the picture into three views:

**Model view:** the domain concepts and responsibilities. This should be the most stable view.

**Interface view:** how the system is entered and used - REST resources, commands, events, public APIs, SDK calls, scheduled jobs.

**Implementation view:** databases, queues, caches, storage, framework glue, concurrency model, deployment shape, and external services.

The boundary is not academic. If `Kafka` is an implementation choice, business modules should not casually depend on Kafka-specific APIs everywhere. If they do, replacement becomes a rewrite instead of a localized change.

**Let AI do the first draft.** Feed your project these prompts, then review and correct. The AI will get things wrong — and correcting those errors is where your understanding deepens:

```txt
Read the project's README and top-level directory, draw a layered architecture diagram (frontend, backend, database, middleware). Add a one-sentence responsibility for each core module. Summarize logging, monitoring, and configuration as a single box. Save to docs/architecture.svg.
```

```txt
Analyze the project's build configuration, draw an internal module dependency diagram. Only include the project's own modules, exclude external libraries. Mark circular dependencies in red. Save to docs/module-deps.svg.
```

```txt
Comprehensively review build config, application config and README to sort out project external dependencies. Classify into 3 categories: core language dependencies, middleware, external APIs. Draw with different colors per category. Save to docs/external-deps.svg.
```

Add one more prompt to enforce the model/interface/implementation distinction:

```txt
Review the architecture diagram and flag any places where domain model concepts, public interfaces, and implementation technologies are mixed at the same level. Suggest a cleaner split, but do not change code.
```

> **Output:** Three diagrams (architecture, module deps, external deps) plus a list of unresolved questions the drawing surfaced.

---

### Step 5: Map Interfaces, Domain Models, and Data Models

**Goal:** Understand three related but separate views: what the system exposes, what concepts it is built around, and how those concepts are represented.

Do not collapse these terms:

| View | Meaning | Examples |
| --- | --- | --- |
| **Interface** | How the system exposes capabilities to callers, users, tools, or other systems. | REST routes, CLI commands, events, SDK methods, scheduled jobs. |
| **Domain model** | The conceptual abstraction: the business objects, rules, lifecycle, and invariants that make this software what it is. | `Workspace`, `Prompt`, `Order`, `Payment`, `Job`, `Article`. |
| **Data model** | The representation used to store, transfer, or serialize domain concepts. | Tables, columns, DTOs, JSON schemas, enums, foreign keys. |

Interfaces usually expose domain models. Data models usually represent domain models. Implementation details should stay behind both. If those three layers blur together, the system becomes harder to explain, harder to test, and harder to change.

Example:

```txt
Domain model: Article
Interface: GET /articles/:id
Data model: articles table, ArticleResponse DTO
Boundary: ArticleRepository
Implementation detail: Postgres query, ORM mapping, connection pool
```

`ArticleRepository` is not the domain model and not the data model. It is a boundary between business logic and persistence. Understanding why it exists is different from merely knowing that it exists: it keeps services focused on business rules, makes tests able to replace persistence, and keeps the storage implementation replaceable.

**For interfaces, capture:** Method, path, one-sentence description, key request parameters, response structure, owning module. Group by module. The goal is a single document you can scan to answer "what can this system do from the outside?"

```txt
Scan all API route handlers in the project, organize a REST API list. For each interface, list the method (GET/POST, etc.), path, one-sentence description, main request parameters, and response structure. Group by module. Save to docs/api-list.md.
```

**Why interface mapping is deeper than endpoint listing:** a good interface teaches users how to think. Rails did this with REST resources and expressive APIs; the interface did not just expose functionality, it guided developers into a style. Your project has a style too, whether intentional or accidental.

Look for the style:

- Are APIs resource-oriented, action-oriented, event-oriented, or command-oriented?
- Are names consistent across routes, DTOs, tables, UI labels, and tests?
- Does the project prefer explicit command objects, thin controllers, fat models, service layers, generated clients, or repository interfaces?
- Are errors shaped consistently?
- Are public interfaces hiding implementation details, or leaking internal table names, queue names, framework types, and storage concerns?
- Do developer-facing commands encode good practice, such as migrations, tests, scaffolding, or local setup?

The reason to study style is consistency. A codebase with five interface styles is expensive to maintain because every feature requires a fresh design debate. When you add or change behavior later, matching the existing style is often more important than making your favorite style win.

**For domain models, capture:** core concepts, ownership relationships, lifecycle states, business rules, invariants, and the problem each concept solves.

```txt
Analyze the project's README, API routes, service layer, domain modules, tests, and naming conventions to identify the core domain models. For each domain model, explain what problem it solves, what invariants it protects, its lifecycle states, and which interfaces expose it. Save to docs/domain-model.md.
```

For each core domain model, answer:

- What problem existed before this concept?
- What complexity does this concept hide?
- What invariant does it protect?
- Which interfaces expose it directly?
- Which data models represent it?
- Which implementation details should remain hidden behind boundaries?
- What would break conceptually if this domain model changed?

**For data models, capture:** field names and types, primary/foreign keys, enumeration values, DTO shapes, persistence schemas, and relationships between key records. Draw a simple ER diagram when storage is relational.

```txt
Analyze the project's data transfer objects, database table creation SQL, migrations, ORM models, and serialization schemas to sort out the core data models. For each data model, list fields, types, one-sentence description, primary keys, foreign keys, enumeration values, and the domain model it represents. Draw a simple ER diagram for relationships between key persisted records. Save to docs/data-model.md and docs/data-model-er.svg.
```

**Why this split matters:** a database table is not always the domain model. Sometimes it is a persistence shape. Sometimes it is a reporting artifact. Sometimes it is a performance compromise. The domain model explains why the concept exists; the data model explains how the concept is stored or transferred.

When they differ, write down the difference explicitly:

```txt
Domain model: PublishedPromptVersion
Data model: prompt_versions table with status = 'published'
Reason for mismatch: publishing is represented as a state transition, not a separate table.
Invariant: published versions are immutable because downstream runs reference version IDs.
```

> **Output:** `docs/api-list.md`, `docs/domain-model.md`, and `docs/data-model.md` (with ER diagram). Together they describe the project's external contract, conceptual shape, and internal representation.

---

### Step 6: Get the Environment Running

**Goal:** Move from cognitive understanding to operational understanding.

You've read, drawn, mapped. Now the test: can you make it run? Static reading tells you the intended design; running the system tells you the live contract — which assumptions are executable, which docs are stale, which dependencies are real. Every blocker is information:

| Blocker | What it teaches |
| --- | --- |
| Missing env var | Hidden external dependency or deployment assumption. |
| Broken migration | Schema history and compatibility pressure. |
| Seed data missing | Which model states the system considers normal. |
| Test fixtures fail | The real invariants may live in tests, not docs. |
| Local service dependency unavailable | Middleware may be too tightly coupled to business code. |
| Startup order matters | Operational architecture is part of the design. |

#### Four-step workflow (reusable AI prompts)

**1) Dependency inventory.** AI scans diagrams, configs, `pom.xml`, README to generate `docs/env-checklist.md` listing all external services, required versions, ports, and init steps.

**2) Install & manage dependencies.**

- **2A — Local install (main path):** AI generates and runs `scripts/install-deps.sh` (brew/apt + init SQL/config), with "3 failed attempts then stop" self-healing, logging everything to `scripts/install-log.md`.
- **2B — Start/stop scripts:** AI creates `deps-start.sh`, `deps-stop.sh`, `deps-status.sh` to uniformly start, stop, and inspect all middleware across brew services / systemd / manual jars, waiting until services are truly ready.
- **2C — Docker (optional path):** AI generates `docker-compose.dev.yml` as a full Docker alternative to 2A/2B.

**3) Build & start the app.** With deps running, AI runs `mvn clean package` and starts backend (plus frontend if any), self-debugging typical problems (JDK mismatch, repo errors, ports, configs), recording everything in `docs/startup-log.md`.

**4) API smoke test.** AI reads `docs/api-list.md`, picks 5 core endpoints across major modules, calls them via `curl`, and writes pass/fail results to `docs/smoke-test-result.md` to prove the system is really alive.

#### Outputs & long-term assets

Generated artifacts:

- `docs/env-checklist.md`, `docs/startup-log.md`, `docs/smoke-test-result.md`
- `scripts/install-deps.sh`, `install-log.md`, `deps-start.sh`, `deps-stop.sh`, `deps-status.sh`
- `docker-compose.dev.yml`

Then have AI:

- Compile a newcomer-friendly `docs/setup-guide.md` from the install and startup logs.
- Extract the whole flow into an `env-bootstrap` SKILL (`.claude/skills/env-bootstrap/SKILL.md`) so future projects or environment resets can be bootstrapped with one reusable AI workflow.

> **Output:** A running instance, the artifacts above, and a reusable `env-bootstrap` skill. Blocker notes feed directly into CLAUDE.md.

---

### Step 7: Map Critical Paths and Test Coverage

**Goal:** Before any refactor, know which business flows matter most and how well they're protected by tests.

You now understand the system. But understanding doesn't tell you where it's safe to change. Tests do — or rather, the gap between *what should be tested* and *what actually is*. This step produces that gap list, anchored on business flows, not files.

Four sub-steps, four artifacts.

#### 1) Identify critical business paths → `docs/critical-paths.md`

AI reads `docs/api-list.md`, `docs/data-model.md`, and `CLAUDE.md` to list **at most 8** core flows most likely to break under refactoring. For each:

- **Name**
- **Start:** entry API
- **Key nodes:** services / DB ops along the way
- **End:** what counts as success (response code, status transition, side effect)

This anchors testing on business flows, not on files or classes.

#### 2) Map existing tests → `docs/test-status.md` (static view)

AI scans `src/test`, `tests/`, `e2e/`, etc. and summarizes:

- Counts of unit / integration / e2e tests
- Which controllers and services have tests, which don't
- Per critical path: **covered / partially covered / not covered**

Watch for the trap: a folder full of test files often means trivial endpoint tests, not flow coverage. Force AI to grade against the critical paths, not the test count.

#### 3) Run tests once and assess health → append to `test-status.md` (dynamic view)

Run `mvn test` (or the project's standard) and report:

- Passed / failed / skipped counts
- Failure classification: **code bug** vs **broken test** vs **environment**
- Total runtime
- A single health label:

| Label | Pass rate |
| --- | --- |
| Green | > 90% |
| Yellow | 60–90% |
| Red | < 60% |

Don't auto-fix here — the goal is a clean snapshot. Push back when AI over-blames "environment" to avoid investigating real bugs.

#### 4) Compute a focused gap list → `docs/test-gaps.md`

Compare "should test" (critical paths) against "actually tested" (`test-status.md`). Strict constraints:

- **Max 20 items total**
- Only on main critical paths; ignore non-core flows
- Each item labeled **P0** (must exist before refactor) or **P1** (nice-to-have)
- For each: scenario, why it's needed, suggested type (integration / unit / characterization test)

Target: **~5–10 P0s**. If AI produces more, force it to cut.

#### Prompts

```text
I’ll compress each step into a short, copy‑pasteable English prompt with bullets.

TL;DR

- Overall
 ▫ 4 short prompts → critical paths, test inventory, test run health, focused gaps.
 ▫ Each prompt: 3–6 lines, clear caps on counts, always tied to core flows.
```

```text
Step 1 – Critical business paths (‎⁠docs/critical-paths.md⁠)
Read docs/api-list.md, docs/data-model.md and CLAUDE.md.

List the MOST important business flows of this system:

- At most 8 critical paths (fewer is better)
- Only flows that are risky when we refactor, not every feature
- For each: [Name, start API, key services/DB steps, success condition]

Output a markdown table to docs/critical-paths.md.
```

```text
Step 2 – Existing tests vs critical paths (‎⁠docs/test-status.md⁠)
Scan all test folders: src/test, tests/, e2e/, etc.

1) Summarize:
   - Number of unit / integration / E2E test files
   - Which Controllers and core Services have tests vs not

2) For EACH path in docs/critical-paths.md:
   - Mark coverage: COVERED / PARTIALLY_COVERED / NOT_COVERED
   - Judge by flow coverage, not just file names

Write the results as markdown in docs/test-status.md.
```

```text
Step 3 – Run tests once and rate health (append to ‎⁠test-status.md⁠)
Run the project’s standard test command (default: mvn test).

Report:
- Counts: passed / failed / skipped, total duration
- For failures: group by CODE_BUG / TEST_BROKEN / ENV_ISSUE with a few examples
- Overall health: GREEN (>90% pass), YELLOW (60–90% or many skipped), RED (<60%)

Do NOT fix anything. Just observe and append a "Runtime Results" section
to docs/test-status.md.
```

```text
Step 4 – Focused test gaps (‎⁠docs/test-gaps.md⁠)
Compare:
- docs/critical-paths.md (what should be tested)
- docs/test-status.md (what is currently tested + runtime health)

Produce a SMALL test gap list:
- Max 20 items total
- Only on critical paths, ignore non-core flows
- Each item has: Priority (P0 before refactor / P1 nice-to-have),
  related critical path, scenario, why needed, test type (integration / unit / characterization)

Aim for ~5–10 P0, <=10 P1. Write as a markdown table to docs/test-gaps.md.
```

> **Output:** `docs/critical-paths.md`, `docs/test-status.md`, `docs/test-gaps.md`. Together they tell you exactly which characterization tests to write before touching legacy code.

---

### Step 8: A Worked Example — Pre-Refactor Guardrails

**Goal:** Walk Steps 6 and 7 end-to-end on a real legacy project, then extend them into CI. The output is a refactor-ready repo, not just understanding.

This is Steps 1–7 applied to one project — *Spring AI Alibaba Admin* — driven by Claude Code with fixed prompts and human review at each handoff. The goal is to move the project from "can barely run" to "runs reliably + P0 tests in place + CI green" without writing the scaffolding by hand.

#### Scene 1 — Environment as code

AI reads `docs/` (architecture, APIs, deps, data model), `application*.yml`, `pom.xml`, and `README`, then produces:

| Artifact | Purpose |
| --- | --- |
| `docs/env-checklist.md` | Full external-dependency list (versions, ports, init steps) |
| `scripts/install-deps.sh` + `scripts/install-log.md` | Install and initialize all middleware; "3 tries then stop" self-healing |
| `scripts/deps-start.sh` / `deps-stop.sh` / `deps-status.sh` | One-click control across brew / systemd / manual jars |
| `docker-compose.dev.yml` | Optional Docker alternative path |
| `docs/startup-log.md` | Maven build + app startup record |
| `docs/smoke-test-result.md` | `curl` smoke results for 5 core APIs (login, Prompt, Dataset, Evaluator, Trace) |

**End state:** project runs reliably; major interfaces pass smoke.

#### Scene 2 — Test baseline

AI then maps what's tested vs. what should be:

- `docs/critical-paths.md` — at most 8 flows that are genuinely risky to refactor (login, Prompt CRUD, Dataset CRUD, Evaluator runs, Trace writes).
- `docs/test-status.md` — per critical path: coverage (none / partial / full), plus a real `mvn test` run (pass / fail / skip, health = green / yellow / red).
- `docs/test-gaps.md` — at most 20 gaps on critical paths only:
  - **P0** (must exist before refactor): 5–10 items
  - **P1** (nice-to-have): ≤10 items
  - Each gap: scenario, why it matters, suggested type (integration / unit / characterization).

**End state:** you know exactly which paths need tests before touching production code.

#### Scene 3 — Fill the P0 gaps, batch by batch

AI turns `test-gaps.md` into `docs/test-plan.md`: multiple batches, **1–3 tests each** (prefer 1), ordered by risk — characterization on refactor paths first, then core integration, then unit tests for complex logic. Skip trivial CRUD.

For each batch, AI:

1. **Characterization tests:** run current code, record actual behavior, *then* turn observed behavior into assertions. No "should be" guessing — pin down what the system *does*, including bugs.
2. **Integration tests:** `@SpringBootTest` with real app + DB. No DB mocks.
3. Run `mvn test`, summarize coverage and results.
4. Move to the next batch only after the current batch is green and human-reviewed.

**End state:** every P0 gap closed; `mvn test` fully green with assertions tied to real behavior.

#### Scene 4 — CI as a permanent guardrail

AI scans existing CI config (GitHub Actions, GitLab, Jenkins, etc.), reports what runs and when, then writes a full workflow — e.g. `.github/workflows/test.yml`:

- Triggers on every push and PR
- JDK version read from `pom.xml`
- Middleware booted via `docker-compose.dev.yml` services
- `mvn clean test`; failures block merges
- Test reports uploaded as artifacts; Maven cache enabled

Push once and let AI debug the first failures with the same "3 tries then stop" rule until the build goes green.

**End state:** tests run automatically on every change.

#### The "lunch break" mega-prompt

The four scenes can be chained into one long prompt that runs unattended for 1–2 hours. Hard constraints to bake in:

```txt
- Batches of 1–3 tests, no more.
- 3-tries-then-stop self-healing; never silently swallow failures.
- Assertions reflect actual behavior, not ideal behavior.
- Accumulate every uncertain decision into docs/summary.md for human review at the end.
```

Paste at the project root, walk away, review `summary.md` on return.

#### Final shape of the repo

```txt
docs/                      arch, APIs, data model, env-checklist,
                           critical-paths, test-status, test-gaps,
                           test-plan, logs, summary
scripts/                   install-deps.sh, deps-{start,stop,status}.sh
.github/workflows/test.yml CI guardrail
.claude/skills/            env-bootstrap, docs-auto-sync
src/test/                  all P0 tests in place
```

> **Philosophy in one line:** understand the system → run it reliably → protect it with focused tests + CI → *then* refactor.
>
> **Output:** a legacy repo that is now safe to change.

---

### Step 9: Convert Understanding into AI-Readable Assets

**Goal:** Move understanding from your head into durable project assets the AI can reuse.

Seven steps got understanding into *your* head. Step 8 turned that understanding into a runnable, tested, CI-protected repo. Step 9 gets it into a form your AI reads every session. Without this, you're the sole carrier of project knowledge — and AI starts every conversation blind.

Two artifacts:

**CLAUDE.md** — persistent project context:

- What the project does and why it exists
- Architecture decisions and their rationale
- Business rules, edge cases, constraints
- Naming conventions, code style, design principles
- Build, test, run instructions
- Anti-patterns: things that *look* right in this codebase but aren't

Keep it concise (2-3 pages). Every time AI does something wrong that context could have prevented, add a line. CLAUDE.md grows through use.

The most valuable CLAUDE.md entries explain **why**, not just **what**:

```md
Do not instantiate repositories inside services. Services depend on repository
interfaces so tests can replace persistence and production wiring can stay in
the container.
```

That one note carries model, interface, and implementation reasoning. It tells the AI what pattern to follow and why violating it hurts the codebase.

**SKILL.md** — reusable operational templates:

- Step-by-step workflows ("how to add a new endpoint")
- Verification checklists ("before merging, confirm X, Y, Z")
- Domain-specific conventions beyond code style

CLAUDE.md describes the project. SKILL.md describes *how to work on* the project.

Use this split:

| Knowledge type | Put it in | Example |
| --- | --- | --- |
| Stable model | `CLAUDE.md` | "A Workspace owns Projects; Projects do not own users directly." |
| Interface style | `CLAUDE.md` | "Public APIs are resource-oriented; avoid action verbs unless the existing module does." |
| Implementation constraint | `CLAUDE.md` | "Queue handlers must be idempotent because delivery is at-least-once." |
| Repeated workflow | `SKILL.md` | "How to add a REST endpoint with route, DTO, service, test, and docs." |
| Verification routine | `SKILL.md` | "Run characterization tests before touching legacy billing logic." |
| Common failure mode | Either | "Do not bypass the container by constructing services manually." |

Step 8 is also where you compress. Raw notes are not useful AI context. Convert them into decisions, constraints, and checklists.

Good project memory looks like this:

```md
## Domain Model
- Prompt belongs to Workspace.
- Prompt versions are append-only; editing creates a new version.
- Published prompts are immutable because downstream runs reference version IDs.

## Interface Style
- REST routes are grouped by owning module.
- Create/update endpoints accept command-shaped DTOs.
- Responses return view models, not database rows.

## Implementation Constraints
- Background jobs are retried, so handlers must be idempotent.
- Storage provider code stays behind `StorageClient`; do not import SDK types into domain services.
```

Bad project memory looks like this:

```md
The project has many files. There is a prompt module. There are APIs.
```

The first version helps AI make correct changes. The second only repeats obvious facts.

> **This step is Lectures 10 and 11 in full detail.** The principle: every insight from Steps 1–7 goes into one of these two files. Nothing stays only in your head.
>
> **Output:** `CLAUDE.md` and `SKILL.md`, ready for AI consumption on the next session.

---

## Further Reading

The sources referenced above reward going deeper:

- Anthropic's research on AI-assisted coding: [anthropic.com/research](https://www.anthropic.com/research)
- FIU Brownfield Tax taxonomy: [arxiv.org/abs/2503.07941](https://arxiv.org/abs/2503.07941)
- Chain of Understanding (ICPC 2026): search [arxiv.org](https://arxiv.org) for the paper
- *Working Effectively with Legacy Code* by Michael Feathers (2004) — short, practical, more relevant now than when it was written
- Cleveroad's 2026 legacy modernization report
- Thoughtworks Technology Radar 2026 for code knowledge graph recommendations

---

This chapter is a map, not a destination. Each step gets its own deep-dive lecture later in the course. Come back here as you go through them — it'll help you see how the pieces connect.
