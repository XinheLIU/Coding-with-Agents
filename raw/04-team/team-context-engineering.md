# Team-Level Context Engineering

> [Getting AI to Work in Complex Codebases](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md)

### The Challenge

大型项目需要“流程视角”

一旦超出小而清晰的范围，只指望靠几轮对话让 AI 端到端完成复杂系统，很快就会遇到上限。大型项目往往要接后端、连数据库、整合第三方服务，还牵涉权限、安全、并发和大量业务规则，目标是交付一整套与现有业务深度打通的系统，而不是一页网页。
在这种情况下，更合理的做法不是把所有需求一股脑丢给 AI，而是先梳理出清晰的整体流程：关键步骤是什么、每一步的输入输出和状态变化是什么、哪些节点对性能和安全最敏感。再基于这张流程图，把相对独立的环节拆分出来，交给对话式 AI 生成接口、模块、脚本和测试。
以目前的能力来看，AI 更擅长加速一个个小步骤，由你（或你的团队）来决定怎么拆步骤、如何串联，并负责最终的架构设计、系统集成和运维。

* 原型 / Demo / 内部自用工具：非常适合先交给 AI 打第一版，再由你迭代细节。
* 面向真实用户的大型产品：通常需要工程师在架构、抽象、性能和维护上长期投入。
* 强安全 / 强合规系统（如支付、风控、医疗等）：在当前阶段，不宜“生成完就直接上线”，必须引入严格的审查与测试流程。

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
