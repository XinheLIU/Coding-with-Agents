# Maintain Context, Not Code

> *In [Chapter 3](../03-power-user/README.md), you mastered individual power-user techniques — context management, sub-agents, and custom tools. Now we scale those principles to teams. When every developer is 5-10x faster with AI, the bottleneck shifts from writing code to deciding what to build and keeping everyone aligned.*

> [Specs Are the New Source Code](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code)

### Specs as the True Source of Truth

- **AI makes engineers much faster**, so the bottleneck shifts to deciding *what* to build.
- **Well-written specs** (prompts, tickets, product docs) are the true source of truth.
- **Code is a "lossy projection" of the spec** — the spec captures intent, values, and trade-offs.

Historically, specs were treated as disposable paperwork and code as sacred. In AI workflows, detailed specs can generate code, docs, tests, and more. The scarce skill is now clear communication and specification, not raw coding speed.

**The workflow has evolved:**

- **Old workflow:** Vague idea → wireframes → designs → MVP → customer feedback → painful spec rewrites
- **New workflow:** Vague idea → rapid AI-built prototype → customer feedback → crystal-clear spec → AI-assisted implementation

Prototypes are now the *input* to better specs, not a replacement for them.

![Example Workflow: Prototype to Spec to Implementation](../assets/Example-Workflow.png)

### Context-as-Code

Key features of treating context like code:

- **Version Control** – Prompt files are managed by Git just like regular code, supporting branching, rollbacks, and collaborative development with full traceability of changes.
- **Type Safety** – Libraries like Pydantic are used to strictly validate and type-check LLM outputs, ensuring downstream programs don't break due to missing fields or type mismatches.
- **Automated Regression Testing** – Build an evaluation dataset and automatically run tests (accuracy, recall, etc.) after every prompt logic update. If prompt changes degrade performance, the system automatically alerts you.

When prompts are modularized and versioned, they transform from one-off instructions into maintainable components. Writing prompts will increasingly resemble software engineering: clear interfaces, verifiable outputs, and trackable changes.



用 AI 做项目时，瓶颈不在 AI，而在你的输入质量与思考质量：你想得越清楚，它做得越准确；你越模糊，它越容易跑偏



SDD 四步闭环工作流

 ▫ 1）定规范：在写业务代码前先定“项目底层规则”

 ⁃ 优先覆盖 AI 最容易跑偏的四个点：

 ▪ 命名风格：类名是否加前后缀、驼峰/下划线、URL 单复数等。

 ▪ 返回格式：统一使用 Result        <T>，字段结构固定，空列表返回 [] 而不是 null。

 ▪ 错误码体系：统一位数、按模块分段，避免混乱和撞号。

 ▪ 设计原则：尽量避免不必要的设计模式和过度抽象，不随意引入新技术栈。

 ⁃ 实施方式：

 ▪ 第一版可以粗，但必须存在；后续在实战中不断补全。

 ▪ 规范写入项目根目录的 CLAUDE.md，作为 AI 的“项目宪法”。

 ▫ 2）AI 按规范执行：明确让 AI 参照 CLAUDE.md

 ⁃ 指令中显式引用规范：例如“按照 CLAUDE.md 中的规范实现 Agent 的 CRUD 接口”。

 ⁃ 有规范约束后：

 ▪ 命名、返回格式、错误码区间、是否用设计模式等都会按预期统一。

 ▪ 同一 AI，在有/无规范体系下的输出一致性差异巨大。

 ▫ 3）人验证输出：带着“规范清单”做 review

 ⁃ 检查逻辑：

 ▪ 是否符合意图、质量是否达标、边界条件是否覆盖（延续第 01 讲的三步检查思路）。

 ▪ 按规范逐条核查：命名、返回结构、错误码区间、是否违规使用设计模式、是否越权修改其他模块等。

 ⁃ 效果：

 ▪ 从“主观感受式 review”变成“对照清单式核查”，效率和一致性都更高。

 ▫ 4）迭代规范：每次 AI 跑偏都是补规范的机会

 ⁃ 在实际开发中不断发现规范漏洞并补齐：

 ▪ 例 1：空列表返回 null 导致前端白屏 → 补充“列表为空返回 []，字符串为空返回空字符串不返回 null”。

 ▪ 例 2：修改 Agent 时顺手改了 Provider 接口 → 补充“不破坏已有接口契约，改前需理解模块设计意图”。

 ▪ 例 3：业务逻辑写在 Controller 里 → 补充“Controller 只做参数校验和调用 Service，不写业务逻辑；跨模块通过 Service 而不是直接 Mapper”。

 ▪ 例 4：随手引入新 UI 库 → 补充“不得引入技术栈之外依赖，需先确认”。

 ⁃ 长期效果：

 ▪ 规范从一页纸逐步长成覆盖命名、接口、错误码、异常、分层、行为约束、前端规范等的完整体系。

 ▪ 同一问题只需“踩坑一次”，写进规范后后续不再重复犯错。

- 三、什么样的规范才“约束得住” AI

 ▫ 1）具体，不模糊

 ⁃ 差规范：

 ▪ “代码要简洁”“接口要规范”这类模糊描述，AI 会按自己的理解发挥，结果与你预期偏差极大。

 ⁃ 好规范：

 ▪ 明确禁止或强制的行为与范围，例如：

- “不引入不必要的设计模式（工厂、策略、观察者等），除非明确要求；功能实现优先使用最简单直接方案。”

- “所有接口统一返回 Result          <T>，格式固定为 { code, message, data }；错误码为四位数字，并按模块分段。”

 ⁃ 判断标准：

 ▪ AI 看完规范后是否还要“猜你的意思”；只要需要猜，就不够具体。

 ▫ 2）有优先级，不贪多

 ⁃ 规范不是越多越好，受限于上下文窗口，太多会稀释关键约束。

 ⁃ 原则：

 ▪ “AI 经常跑偏的点”写细；“几乎不会错的点”（如 UTF-8 编码）可以不用写。

 ▪ Hify 的 CLAUDE.md 最终约 2–3 页，但每一条都对应真实踩坑。

 ▫ 3）必要时带原因，而不是只给“规定”

 ⁃ 对涉及工程权衡的规范，只写“不要这样做”远远不够：

 ▪ 如“不要全量删除再插入”如果不解释并发风险，AI 可能仍然选择此方案。

 ▪ 加上原因：“并发场景下会导致短时间内工具列表为空，正在进行的对话拿到空列表”后，AI 能理解并主动选择差异比对实现。

 ⁃ 取舍：

 ▪ 纯风格类规范（如实体不加前缀）直接给规则即可。

 ▪ 涉及稳定性、并发、安全、兼容性的规范建议附上简要原因，利于 AI 在相似场景下举一反三。

- 四、规范的分层组织：全局 / 模块 / 任务

 ▫ 1）全局规范（项目级地基）

 ⁃ 内容：命名规则、接口格式、错误码体系、统一设计原则和行为约束等。

 ⁃ 位置：写在 CLAUDE.md，全项目共享。

 ⁃ 特点：在项目早期就要定，后期改动较少，相当于“项目宪法”，任何局部都不能违反。

 ▫ 2）模块规范（局部补充）

 ⁃ 面向具体模块（如 Provider、Agent、对话引擎、工作流引擎）的专属约束：

 ▪ 特有的数据流定义、节点类型、接口契约、领域对象规则等。

 ⁃ 位置：可放在模块目录下的说明文档，也可以在进入该模块开发前作为额外上下文喂给 AI。

 ⁃ 作用：在全局规则之上，为特定领域/模块增加更细粒度的约束。

 ▫ 3）任务规范（临时策略）

 ⁃ 针对单次任务的临场补充，如：

 ▪ “这次查询不需要分页。”

 ▪ “异常需要区分这三类，并返回不同错误码。”

 ▪ “更新逻辑使用差异比对，不允许全量替换。”

 ⁃ 特点：不一定沉淀为文档，只服务当前任务，但优先级最高，可以在不违反全局规范前提下覆盖模块默认行为。

 ▫ 4）三层协同与优先级

 ⁃ 合并视角：

 ▪ AI 每次工作时受到“全局规范 + 模块规范 + 当前任务规范”三层叠加约束。

 ⁃ 优先级关系：

 ▪ 任务规范 > 模块规范 > 全局规范（但上层不能违反下层的“硬性底线”，特别是全局规范）。

 ⁃ 实践结果：

 ▪ 既保证统一的工程底线，又保留每个模块和具体任务的灵活度。