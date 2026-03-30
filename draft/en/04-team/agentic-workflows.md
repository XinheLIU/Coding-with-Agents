# Design Agentic Workflows in Daily Work



当团队深度掌握了智能体的基础用法后，他们开始超越工具的内建功能，转而将其作为核心组件，来架构全新的、更强大的智能工作流。这些高阶用法代表了 AI 原生开发的前沿探索。
• 构建智能体集群 (Building Agent Ensembles) StockApp 团队并未止步于使用单个智能体，而是构建了一个名为“Zen MCP server”的系统。该系统会调用多个不同的大语言模型（如 Claude、Gemini、o3）来共同审查和评估一项工作。这种方法的理论基础是，只要模型之间存在“分类器的足够多样性 (sufficient variety in the classifiers)”，由多个模型组成的“委员会”的决策质量将“显著优于任何单个模型”。例如，在设计 MCP 服务器的认证机制时，Gemini 的观点更务实，推荐基于负载的认证；而 o3 则更谨慎，倾向于为每个用户配置独立的客户端。通过集群机制，他们可以取长补短，获得更高质量的综合产出。
• 开发完整的智能体工作流 (Developing Complete Agentic Workflows) 这代表了从“使用智能体完成任务”到“围绕智能体构建自动化系统”的飞跃。Anthropic 的增长营销团队是这一模式的典范。他们构建了一个端到端的自动化流程：系统自动处理包含广告性能数据的 CSV 文件，调用子智能体生成新的广告文案，再通过 Figma 插件批量产出上百个视觉素材，最后经由 MCP 服务器与 Meta Ads API 交互来分析营销活动效果。整个流程高度自动化，将人的角色从执行者提升到了系统设计者和监督者。
• 创建验证与反馈闭环 (Creating a Verification & Feedback Loop) 正如 Boris Cherny 所强调的，这是提升智能体产出质量最重要的因素。正如人类工程师需要通过测试和运行结果来验证自己的代码一样，AI 也需要一个反馈闭环来纠正错误和提升质量。如果智能体只能“写”而不能“测”，那它的工作质量将完全依赖于运气。顶级团队的实践包括：
    ◦ 自我测试：指示智能体为它自己编写的代码生成单元测试。
    ◦ CI/CD 集成：将智能体的工作流与持续集成（CI）系统打通，让它能够自动运行测试套件并根据失败结果进行迭代。
    ◦ 端到端 UI 验证：Boris 的团队让 Claude 使用一个 Chrome 扩展来测试它自己完成的前端 UI 变更。智能体能够自己打开浏览器，验证页面功能，发现问题后进行迭代，直到 UI 按预期工作为止。 这是自我验证闭环的黄金标准。
• 将智能体深度集成到软件全生命周期 (Deep Integration into the Full Software Lifecycle) StockApp 团队展示了如何将智能体融入从设计到维护的每一个环节。他们采用了一种分层、文档驱动的开发模式：
    1. 设计 (Design)：人类提供核心需求，智能体起草设计文档（通过 MCP 访问 Notion）。
    2. 规划 (Plan)：智能体将设计文档分解为实施任务（通过 MCP 写入 Linear）。
    3. 实施 (Implement)：智能体负责大部分编码工作。
    4. 保障 (Backstop)：通过编写全面的测试来防止未来的修改破坏已有的成果。
    5. 审查 (Review)：人类和智能体共同审查最终功能。
    6. 更新 (Update)：智能体在实施后负责更新相关的文档（如 README.md 和 CLAUDE.md），确保上下文的准确性传递给未来的开发任务，形成一个自我强化的上下文循环。 这种模式真正将智能体从一个“编码工具”提升为了贯穿软件全生命周期的“开发伙伴”。
结语
回顾这些高效实践，我们发现，编程智能体的高手之道，恰如武学中的“无招胜有招”。真正的精髓不在于掌握多少神秘的提示词或复杂的配置，而在于从根本上重塑我们的工作流程——将思维模式从亲力亲为的“执行”彻底转向基于信任的“委派”，将工作重心从临时的“提示”转向持久的“上下文构建”，并为每一个委派的任务建立可靠的“验证与反馈闭环”。这不仅是使用一个新工具，更是在重新定义软件开发的未来。


1. 智能体无处不在 (When to Use: Agent Everywhere)
将智能体融入开发流程的每一个环节，是实现生产力倍增的基础。这意味着，从代码理解、重构、测试到跨领域的协作，我们都应首先思考：“这个任务能否委派给智能体？”
以下是多个顶级团队在实践中广泛应用智能体的场景：
• 代码理解与上手 (Code Understanding & Onboarding)
    ◦ 架构原理：加速上下文获取 (Accelerated Context Acquisition)。智能体能够压缩构建代码库心智模型所需的时间。
    ◦ 应用场景：当新成员加入项目、处理紧急线上事故或接触不熟悉的代码库时，智能体是最高效的“领路人”。它能快速梳理代码逻辑、服务间的依赖关系以及数据流转路径。
    ◦ 团队实践：OpenAI 的 SRE（网站可靠性工程师）在处理线上事故时，会将堆栈跟踪信息直接粘贴给智能体，让其快速定位认证流程的核心代码。Anthropic 的数据基础设施团队则引导新入职的数据科学家使用智能体来导航庞大的代码库，理解数据管道的依赖关系，其效率远超传统的文档或知识库。
• 重构与迁移 (Refactoring & Migrations)
    ◦ 架构原理：自动化高上下文、重复性变更 (Automating High-Context, Repetitive Changes)。智能体的优势在于能够跨多个文件应用一致的逻辑，这是简单的查找替换无法处理的。
    ◦ 应用场景：对于涉及多个文件或模块的大规模、重复性修改，智能体的优势尤为突出。例如，更新 API 接口、统一设计模式或迁移到新的依赖库。
    ◦ 团队实践：OpenAI 的工程师曾利用智能体，在几分钟内将一个旧的服务调用模式 (getUserById()) 替换为新模式，并自动创建了拉取请求（PR），而这项工作手动完成需要数小时。
• 性能优化 (Performance Optimization)
    ◦ 架构原理：系统性瓶颈识别 (Systematic Bottleneck Identification)。智能体擅长以系统化的方式扫描和分析代码中的性能热点。
    ◦ 应用场景：智能体擅长分析代码中的性能瓶颈，如低效循环、冗余数据库查询或高内存消耗的操作，并提出优化建议。
    ◦ 团队实践：OpenAI 的基础设施工程师使用智能体扫描代码，以发现重复且昂贵的数据库调用，并让其起草批处理查询的优化方案。
• 测试覆盖 (Test Coverage)
    ◦ 架构原理：自动化质量保证的“保障机制” (Automated Quality Assurance Backstop)。智能体能够系统性地为代码库构建防止回归的测试网。
    ◦ 应用场景：为已有代码（尤其是缺乏测试的模块）快速补充单元测试、集成测试，并覆盖容易被忽略的边缘场景。
    ◦ 团队实践：一位前端工程师分享，他会在夜间将测试覆盖率低的核心模块交给智能体，第二天早上就能收到包含可运行单元测试的 PR。Anthropic 的多个团队，包括产品开发和安全工程，都已将编写全面的单元测试作为智能体的常规任务。
• 开发加速 (Development Velocity)
    ◦ 架构原理：压缩软件开发生命周期 (Compressing the Development Lifecycle)。通过自动化样板代码和收尾工作，智能体缩短了从概念到交付的时间。
    ◦ 应用场景：在项目启动阶段，智能体可以快速生成脚手架代码、API 存根和基础模块。在项目冲刺阶段，它可以处理琐碎但必要的收尾工作，如生成部署脚本或配置文件。
    ◦ 团队实践：Anthropic 的产品开发团队在原型设计阶段会启用“自动接受模式”，让智能体自主编写代码、运行测试并持续迭代，工程师仅在最后阶段介入进行审查和微调。
• 跨领域任务 (Cross-Domain Tasks)
    ◦ 架构原理：将能力边界扩展至整个业务价值链 (Expanding Capability Boundaries across the Business Value Chain)。智能体打破了技术壁垒，赋能非技术团队直接参与到价值创造中。
    ◦ 应用场景：智能体的能力远不止于编码。非技术背景的团队成员也能利用它完成过去无法想象的任务，真正打破了部门墙。
    ◦ 团队实践：Anthropic 的数据基础设施团队利用智能体监控多达 200 个仪表盘，这个数量级的工作是人类无法手动完成的。此外，产品设计师直接使用智能体进行前端代码的微调和状态管理变更；增长营销团队构建了完整的智能体工作流，自动分析广告数据并批量生成素材；法律团队成员在几乎没有编程经验的情况下，为部门开发了自动化的工作流原型。
为了在实践中落地“智能体无处不在”的工作流，我们需要像 Anthropic 的 Claude Code 之父 Boris Cherny 那样，采用一种“多线程”并行处理模式。他的日常操作是在终端同时运行 5 个 Claude 实例，在浏览器中运行 5-10 个，并行处理不同任务。这种模式之所以高效，是因为它充分利用了智能体能够长时间自主执行任务的特性。开发者只需分配任务、明确方向，即可转向其他工作，仅在需要决策或确认时再切回。
然而，要让这种无处不在的委派模式高效运转，其核心前提是为智能体提供清洁、全面且结构化的上下文。
2. 如何使用：构建清洁且复合的上下文资产 (How to Use: Clean Context, Building Compound Context Asset)
StockApp 团队的核心洞察一语中的：“好的代码是好上下文的副产品 (Good code is a side effect of good context)。” 与其绞尽脑汁设计完美的“提示词”，不如投入精力构建一个高质量、可复用的“上下文资产”。这才是驱动智能体产出高质量结果的根本。以下是构建这一资产的关键工具和方法。
CLAUDE.md：项目的“声明式状态层”
• 架构目的 (Why)：作为项目的“声明式状态层”，为智能体提供一个持久化的、静态的全局上下文。它定义了项目的架构、编码规范、特定领域的业务逻辑和注意事项，每次会话启动时都会被自动加载。
• 实施方式 (How)：Boris Cherny 的团队将一个共享的 CLAUDE.md 文件提交到代码仓库中，由所有成员共同维护。每当发现智能体犯错时，他们就会将纠正规则（“别这样做”）增补进去。更高效的是，在代码审查时，团队成员可以在 PR 评论中 @.claude，通过一个 GitHub Action 自动将新规则更新到 CLAUDE.md 文件中。这种实践被誉为“复利工程”：每一次纠错都沉淀为团队的共享资产，让智能体随着时间推移越来越“懂”你们的项目。
Skills：程序化知识的“抽象层”
• 架构目的 (Why)：作为“程序化知识的抽象层”，Skills 解决了“全面的知识库与有限的上下文窗口”这一核心矛盾。它通过“渐进式披露”（progressive disclosure）机制，仅在需要时才将相关细节加载到上下文中，从而高效地管理了宝贵的上下文窗口。
• 实施方式 (How)：一个 Skill 由一个核心指令文件 SKILL.md 和一个 references/ 目录构成。SKILL.md 定义了该技能的名称、描述（用于触发）以及高层级的工作流。references/ 目录则存放详细的文档（如表格定义、查询范例），只有在执行过程中被明确引用时才会被加载到上下文中。
Subagents：“智能体的微服务架构”
• 架构目的 (Why)：这是一种“智能体的微服务架构”，通过创建拥有独立上下文的“专家”智能体来处理特定任务，从而实现“分而治之”。这不仅能提升特定任务（如调试、数据分析）的完成质量，还能避免主对话的上下文被专业细节所“污染”。
• 实施方式 (How)：Boris Cherny 使用一个名为 code-simplifier 的子智能体，在主智能体完成工作后自动简化代码。Anthropic 的增长营销团队则创建了专门用于生成广告“标题”和“描述”的子智能体，以应对不同的字符限制和营销要求。
Slash Commands (/commands)：高频任务的快捷方式
• 架构目的 (Why)：将频繁执行的、相对简单的指令封装成快捷命令，减少重复输入，可以视为无状态的 API 端点。
• 实施方式 (How)：Boris Cherny 创建了一个 /commit-push-pr 命令，一键完成代码提交、推送到远程仓库并创建 PR 的全套操作。这些命令本质上是存储在 .claude/commands/ 目录下的 Markdown 文件，可以通过 Git 与团队共享。
Hooks：基于事件的自动化“钩子”
• 架构目的 (Why)：作为事件驱动的触发器，在智能体执行工作流的特定节点（如工具使用后、任务结束时）自动执行预设脚本，实现流程自动化。
• 实施方式 (How)：为了避免 CI/CD 流程中的格式化错误，Boris 使用了一个 PostToolUse Hook，在每次智能体生成代码后自动运行格式化工具，确保代码风格的统一。
MCP (Model Context Protocol)：“智能体的 API 网关”
• 架构目的 (Why)：作为“智能体的 API 网关”，MCP 将智能体从一个单纯的编程工具，转变为能够与整个公司工具链交互的“全能助手”，连接其内部逻辑与外部世界。
• 实施方式 (How)：StockApp 团队通过 MCP 让智能体能够直接读取 Notion 中的设计文档和 Linear 中的任务描述，甚至直接查询 AWS 和开发数据库。Anthropic 的安全团队则用它来拉取 Sentry 的错误日志。这极大地扩展了智能体获取上下文和执行任务的边界。
这些工具并非孤立的功能，而是构成了一个用于“上下文工程”的整体系统。它们形成了一个上下文管理的层次结构：CLAUDE.md 提供持久化的基础上下文，Skills 用于按需加载的复杂程序化知识，Subagents 提供任务专精的隔离上下文，而 Slash Commands 则处理快速、无状态的操作。这套系统才是编程智能体强大能力的真正源泉。




---

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
