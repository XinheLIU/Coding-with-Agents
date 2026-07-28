# 智能体记忆文件：你的代码库宪法

> *"每次会话都要说'Claude，我们用 pnpm'，与'Claude 早就知道'之间的差距，就是工具与队友的差距。"*

- [智能体记忆文件：你的代码库宪法](#智能体记忆文件你的代码库宪法)
  - [第一部分：AGENTS.md 是什么，为什么重要](#第一部分agentsmd-是什么为什么重要)
    - [核心问题](#核心问题)
    - [研究怎么说](#研究怎么说)
    - [上下文如何加载](#上下文如何加载)
  - [第二部分：编写有效记忆文件的原则](#第二部分编写有效记忆文件的原则)
    - [原则一：少即是多](#原则一少即是多)
    - [原则二：具体，而非泛泛而谈（构建“约束层”）](#原则二具体而非泛泛而谈构建约束层)
    - [原则三：用工具而非指令来规范风格](#原则三用工具而非指令来规范风格)
    - [原则四：按 WHY → WHAT → HOW 组织内容](#原则四按-why--what--how-组织内容)
    - [原则五：渐进式披露与建立“理解层”](#原则五渐进式披露与建立理解层)
    - [原则六：提供替代方案，而不只是禁令](#原则六提供替代方案而不只是禁令)
    - [原则七：记忆文件是“长”出来的（持续迭代而非一次性设置）](#原则七记忆文件是长出来的持续迭代而非一次性设置)
    - [原则八：在 Monorepo 中使用分层 CLAUDE.md](#原则八在-monorepo-中使用分层-claudemd)
    - [原则九：构建“验证层”搭好安全网](#原则九构建验证层搭好安全网)
    - [原则十：将重复内容提取为斜杠命令和子智能体](#原则十将重复内容提取为斜杠命令和子智能体)
    - [原则十一：将智能体连接到实时上下文](#原则十一将智能体连接到实时上下文)
    - [原则十二：构建领域模板，快速启动项目](#原则十二构建领域模板快速启动项目)
    - [元原则：采用顺序](#元原则采用顺序)
  - [第三部分：分层记忆管理](#第三部分分层记忆管理)
    - [五层架构](#五层架构)
    - [第一层：组织策略](#第一层组织策略)
    - [第二层：用户级偏好](#第二层用户级偏好)
    - [第三层：项目级共享规则（最重要）](#第三层项目级共享规则最重要)
    - [第四层：本地工作区记忆](#第四层本地工作区记忆)
    - [第五层：条件规则目录](#第五层条件规则目录)
    - [第六层\*：自动记忆](#第六层自动记忆)
    - [随时间维护记忆](#随时间维护记忆)
    - [更宏观的视角：提示工程 → 上下文工程 → 智能体工程](#更宏观的视角提示工程--上下文工程--智能体工程)


## 第一部分：AGENTS.md 是什么，为什么重要

### 核心问题

LLM 是无状态的。每次新会话都从零开始——智能体对你的技术栈、命名约定，以及重构 auth 模块会破坏三个下游服务这�## 第二部分：编写有效记忆文件的原则

### 原则一：少即是多      | Token 开销  | 适合放置的内容                 |
| ---------------- | ------------------------------ | ----------- | ------------------------------ |
| **AGENTS.md**    | 每次对话开始时自动加载         | 始终消耗    | 核心约定、必知约束             |
| **Skills**       | 任务匹配时按需加载             | 按需消耗    | 领域专项知识                   |
| **Commands**     | 用户调用 `/command` 时加载     | 按需消耗    | 标准化的可重复工作流           |
| **@ 引用**       | 在提示中手动引用时加载         | 按需消耗    | 临时参考资料                   |

推论：AGENTS.md 只放每次会话都需要的内容。其他内容放在 skills、commands 或 `@` 引用文档中——仅在相关时加载，仅在使用时消耗 token。

## 第二部分：编写有效记忆文件的原则

在进入具体原则之前，首先要确立一个核心心法：**项目的优秀 `CLAUDE.md` 是“长”出来的，而不是一下写好的。** 这个演进过程建立在理解、约束和验证的三层相互迭代关系上（理解决定约束，约束决定验证，验证反过来补理解）：

* **第一层：理解——让 AI 看见（上下文层）**
    * AI 是“上下文缺失的实习生”，只知道你提供的内容，不知道你没给的部分。
    * 老项目的完整上下文包括：
        - **业务**：项目是干什么的、核心业务场景、谁在用哪些接口。
        - **技术架构**：模块关系、关键模块、对外 / 内部接口划分。
        - **数据**：数据表之间的关系、核心业务表字段含义。
        - **隐性约定**：哪些代码“不能删 / 不能动”、哪些接口虽未写在文档里却在生产被调用。
    * 课程中，理解层对应的具体动作：
        - 让 AI 画一份项目架构全景（如 `ARCHITECTURE.md`）。
        - 识别“风险地带”（改动后可能出大问题的模块 / 链路）。
        - 把这些知识翻译成给 AI 看的操作指令（`CLAUDE.md` 作为加载入口，链接到 `/docs` 各细项文档）。
        - 构建 `docs` 目录的文档骨架，后续持续填充。
    * **关键结论**：理解层没打牢，后面的约束和验证都是“空中楼阁”。

* **第二层：约束——让 AI 听话（边界层）**
    * **问题本质**：AI 按它理解的“最佳实践”去重构，而老项目的“反最佳实践”往往有历史原因（兼容性、奇怪接入方、遗留接口等）。
    * **目标**：把“不要改什么、该怎么改、改成什么样”写清楚，让 AI 在你定义好的边界内操作。
    * **约束分为两类**：
        - **静态约束（长期规则，写进文档）**：放在 `CLAUDE.md`、`SKILL.md` 中。如：“这个类是兼容旧版本的，任何改动都要保持方法签名”、“改代码时只动你要改的文件，不要顺手重构其他文件”、“命名用下划线风格，不用驼峰”。一次编写，多次复用，成为项目级的 Harness。
        - **动态约束（每次任务的即时指令）**：写在具体提示词里。如：“只改这三个文件，其他一律不动”、“改之前先跟我确认方案，不要直接动代码”、“有任何不确定的地方停下来问我，不要猜”。每次调用 AI 时都要明确，不指望模型“自己记得”。
    * 静态＋动态共同组成“马具式”的 Harness，让强力引擎服从你的意志而不是相反。

* **第三层：验证——让 AI 可信（安全网层）**
    * **原因**：AI 生成代码很强，但判断“这段代码在所有场景下是否正确”的能力不可靠。10 行函数看似完美，但没覆盖边界条件 / 并发 / 罕见路径；测试看似全绿，但测试本身也是 AI 写的，没覆盖它没意识到的情况。
    * **验证层目标**：建立“独立于 AI 的基准”，用这套基准校验 AI 的产出。
    * **关键实践**：
        - **集成测试**：先让 AI 写覆盖核心业务链路的集成测试，锁住现有行为；改造后回归一次，看是否破坏。
        - **Characterization Test**：面对“说不清逻辑、也没文档”的老代码，根据当前真实行为生成测试。不保证逻辑本身是对的，但保证“改前改后行为一致”。
        - **独立 review**：改完后，再让 AI 切换视角审查（如“从攻击者视角看这里有哪些漏洞”），形成第二视角检查。
        - **curl 核对**：对接口改造，用 curl 跑改造前 / 后的关键场景，对比响应内容与格式。
    * **要点**：验证不是“事后补票”，而是在动手前就要主动搭好安全网，安全网越密，你越敢把更多工作交给 AI。

* **三层之间的正反馈关系**
    * 理解决定约束，约束决定验证，验证反过来补理解。
        - **理解决定约束**：只有模块关系清晰，才能写出例如“这个模块不能依赖那个模块”的约束。
        - **约束决定验证**：约束里若强调“核心接口的响应格式不能变”，验证环节就会专门校验响应格式。
        - **验证反哺理解**：验证暴露问题（某个边角场景被破坏） → 你意识到“原来这段代码还负责这个场景” → 该信息沉淀回 `CLAUDE.md` / `docs`，理解层加深。
    * **周期**：理解更深 → 约束更准 → 验证更有针对性 → 发现更多真实行为 → 理解再加深，形成持续强化的循环，让 AI 从“看起来能用”变成“敢在生产依赖”。这种相互迭代、越想越清楚的过程，就是好的 `CLAUDE.md` “生长”的动力。

掌握了上述心法后，以下是具体的编写原则：

### 原则一：少即是多

前沿 LLM 能可靠遵循约 150–200 条指令；Claude Code 的系统提示已使用约 50 条。AGENTS.md 中的每一行都在争夺剩余的预算。LLM 还表现出 U 形注意力模式——对上下文开头和结尾最敏感，中间部分最薄弱。文件臃肿意味着最重要的规则会淹没在第 6 段（共 12 段）之中。

> 苏黎世联邦理工学院的数据证实了这一点：智能体会忠实地遵循指令，但指令越多，就会执行越多的测试、文件读取和 grep 搜索——这种"彻底性"往往既不必要又代价高昂。

**实际目标：** 60–300 行。有个团队像分配广告版面一样，为每个工具的文档分配"最大 token 配额"——如果你无法简洁地表达，说明它还没准备好放进 AGENTS.md。

### 原则二：具体，而非泛泛而谈（构建“约束层”）

这是构建**约束层（让 AI 听话）**的核心。面对老项目的历史包袱（兼容性、遗留接口等），AI 往往会按它理解的理想化“最佳实践”去重构。你需要把“不要改什么、该怎么改”写得极其具体，让 AI 在定义的边界内操作。

约束分为两类，共同组成“马具式”的 Harness，让强力引擎服从你的意志：
- **静态约束（长期规则）**：写进 `CLAUDE.md` 或 `SKILL.md`。例如“这个类是兼容旧版本，任何改动都要保持方法签名”。一次编写，多次复用，成为项目级的 Harness。
- **动态约束（即时指令）**：写在每次任务的具体提示词里。例如“只改这三个文件，其他一律不动”或“不确定就停下来问，不要猜”。每次调用 AI 都要明确，不指望模型“自己记得”。

**糟糕的静态约束**（零增量价值——模型本来就会这样做）：
```markdown
- Write high-quality code
- Use meaningful variable names
```

**糟糕**（应该用 linter 来处理）：
```markdown
- Use 2-space indentation
- Always use semicolons
```

**良好**（具体、可执行、能改变行为）：
```markdown
## Error Handling
- All errors extend `AppError` from `src/errors/base.ts`
- Services throw; controllers catch and format
- Never catch silently—always `logger.error()` at minimum

## Database Access
- All queries via Prisma ORM—never raw SQL in services
- Complex queries in `src/repositories/` only
- Transactions via `prisma.$transaction()` exclusively
```

**检验标准：** 删掉它不会改变智能体的行为，就删掉。

### 原则三：用工具而非指令来规范风格

永远不要让 LLM 去做 linter 的工作——LLM 比确定性格式化工具更慢、更贵、更不可靠。配置好 Prettier/ESLint/Black/`rustfmt`，然后加一行：

```markdown
After editing any file, run `pnpm format && pnpm lint:fix`.
```

更好的做法：设置一个 Claude Code hook，在每次编辑后自动运行格式化工具。把 AGENTS.md 的预算留给 linter *无法*执行的决策。

哪些风格指令*确实*适合放在这里：语义上的决策，而非语法上的。"公共契约用 `interface`，内部联合类型用 `type`"不是格式问题——这是架构意图。"超过 3 个参数的函数必须使用选项对象"改变的是 API 形状，而非空白字符。

### 原则四：按 WHY → WHAT → HOW 组织内容

**WHY** — 决策背后的理由（帮助智能体将其推广到新场景）：
```markdown
## Why Zod
TS only validates at compile time. APIs receive external data at runtime.
Zod provides runtime validation + TS types + friendly errors. Apply the
same principle to any external data boundary.
```

**WHAT** — 允许与禁止，以约束的形式陈述：
```markdown
## Allowed: Prisma for all DB ops, Zod co-located with routes
## Forbidden: `any` type, direct `fetch()`, `console.log`
```

**HOW** — 带文件引用的分步工作流：
```markdown
## Adding a New API Endpoint
1. Schema → `src/routes/<feature>/schema.ts`
2. Route → `src/routes/<feature>/route.ts`
3. Service → `src/services/<feature>.service.ts`
4. Repository → `src/repositories/<feature>.repo.ts` (if needed)
5. Tests → `src/routes/<feature>/__tests__/`
6. Run `make check`
```

### 原则五：渐进式披露与建立“理解层”

这是构建**理解层（让 AI 看见）**的关键。AI 是“上下文缺失的实习生”，只知道你提供的内容。老项目的完整上下文（业务场景、架构模块、数据表关系、哪些代码“不能动”的隐性约定）极其庞大，全塞进主文件会导致上下文溢出。

因此，AGENTS.md 应作为入口，而非百科全书。正确的做法是让 AI 画一份项目架构全景，识别出改动后可能出大问题的“风险地带”，然后通过 `CLAUDE.md` 链接到 `/docs` 下的各细项文档（构建出文档骨架后持续填充）：

```markdown
## Deep Dives
- For API patterns and response format: `docs/api-patterns.md`
- For database migration workflow: `docs/migrations.md`
- If you encounter a FooBarError: `docs/troubleshooting.md`
```

**重要提示：** 不要只列路径——要告诉智能体*何时*去读它们。理解层没打牢，后续的约束和验证都是“空中楼阁”。"对于复杂的 Prisma 用法或遇到迁移错误时，请查阅 `docs/database.md`"比一个光秃秃的引用有效得多。

你也可以在提示中使用 `@` 文件引用，将智能体指向确切的权威来源，而不必让 AGENTS.md 臃肿：

```
Update user.py according to @docs/api-spec.md
```

### 原则六：提供替代方案，而不只是禁令

```markdown
# Bad — agent gets stuck
- Never use `--force` with git push

# Good — agent knows what to do instead
- Never `git push --force` → use `git push --force-with-lease`
  (prevents overwriting others' work)
```

每一个"不要"都应该对应一个"改为这样做"。

### 原则七：记忆文件是“长”出来的（持续迭代而非一次性设置）

项目的优秀 `CLAUDE.md` 不是一下写好的，而是随着你对项目的认知加深逐渐“长”出来的。像 `/init` 这样的自动生成命令（或一次性的初始化），只能作为起点。

真正的生长动力来自于**理解、约束、验证**三层的正反馈循环：
1. **理解决定约束**：只有摸清了模块关系，你才能在文件中写出“A 模块不能依赖 B 模块”的静态约束。
2. **约束决定验证**：如果约束里强调了“核心接口响应格式不变”，你在验证环节就会专门针对这一点去跑 curl 核对。
3. **验证反哺理解**：当验证暴露了问题（如破坏了某个边角场景），你才会意识到“原来老代码还负责这个场景”。该信息沉淀回 `CLAUDE.md` / `docs`，理解层进一步加深。

**周期**：理解更深 → 约束更准 → 验证更有针对性 → 发现更多真实隐性约定 → 理解再加深。保持这种同步，删掉自动生成的冗余废话，留下这套循环中提炼出的核心教训。

### 原则八：在 Monorepo 中使用分层 CLAUDE.md

将全局规则上推，将具体规则下沉。每个文件夹都可以有自己的 CLAUDE.md，叠加在根文件之上：

```
/root
  CLAUDE.md              → global: Git workflow, shared standards
  backend/CLAUDE.md      → Python, FastAPI, backend patterns
  frontend/CLAUDE.md     → React, Tailwind, component conventions
  data/CLAUDE.md         → analysis defaults, viz libraries
```

当你在 `frontend/` 目录下工作时，智能体会同时加载根文件和本地文件。这让每个文件都保持精简且与上下文相关——前端智能体永远不会加载后端的数据库规则。

### 原则九：构建“验证层”搭好安全网

AI 生成的代码看似完美（比如 10 行函数全绿），但判断其“在所有罕见路径和并发场景下是否正确”的能力不可靠。如果测试也是 AI 写的，它往往无法覆盖自己都没意识到的盲区。

这就需要建立**验证层（让 AI 可信）**，即“独立于 AI 的基准”。验证不是事后补票，而是在动手前主动搭好安全网：

1. **Characterization Test（特性测试）**：面对无文档的老代码，先根据当前真实行为生成测试。不求逻辑绝对正确，但求“改前改后行为一致”。
2. **集成测试与 curl 核对**：对核心接口改造，先写集成测试锁住行为，并用 curl 跑改造前后的关键场景对比响应内容与格式。
3. **独立 Review**：改完后，通过独立的子智能体（见原则十）切换视角（如攻击者视角）进行第二视角审查。
4. **把 Git 规范作为底线防线**：明确预期行为，防止智能体在版本控制上随意发挥。

```markdown
## Git Workflow
- Commit after each logical feature or fix
- Write commit messages: `<type>(<scope>): <description>` (e.g., `fix(auth): handle expired tokens`)
- New features go on branches—never push directly to main
- Run `make check` before committing
```

安全网越密，Git 提交越频繁（时间机器随时可回滚），你越敢把更多核心重构工作交给 AI。

### 原则十：将重复内容提取为斜杠命令和子智能体

一旦发现自己反复输入相同的多行提示，就将其提取出来：

**斜杠命令**（`.claude/commands/*.md`）将重复的工作流变成一键仪式：

```markdown
# .claude/commands/review.md
Review the staged changes for:
- Style violations against CLAUDE.md rules
- Security issues (injection, auth bypass, secrets)
- Performance regressions
Output as a markdown table: file | issue | severity | suggestion
```

用 `/review` 或 `/review user_auth.py` 调用（`$ARGUMENTS` 替换）。

**子智能体**（`.claude/agents/*.md`）为专项任务创建专注的角色：

```markdown
# .claude/agents/security-reviewer.md
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---
You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Auth and authorization flaws
- Secrets or credentials in code
Provide specific line references and severity ratings.
```

子智能体在独立的上下文窗口中运行，不会干扰你的主对话。保持它们的专注和鲜明立场——对超出职责范围的工作，它们应该直接说"不"。

### 原则十一：将智能体连接到实时上下文

AGENTS.md 中的静态文本有其局限——它无法反映昨天刚变更的数据库 schema，也无法覆盖你刚升级的库的文档。当智能体需要动态的实时信息时，给它工具，而不是过时的文字。

**CLI 命令**是最简单的方式。告诉智能体有哪些命令可用：

```markdown
## Live Context
- Run `python manage.py show_schema` to inspect current DB schema
- Run `curl -s http://localhost:8000/openapi.json` for current API spec
- Run `cat .env.example` for available environment variables
```

**MCP 服务器**适合将常见需求正式化（Postgres 自省、浏览器自动化、实时库文档）。但这并不是必须的——任何智能体可以从终端调用的工具都有效。

核心原则：**如果信息的更新速度快于你更新 AGENTS.md 的速度，就教会智能体如何自己查询，而不是把它写下来。**

### 原则十二：构建领域模板，快速启动项目

对于反复出现的项目类型，创建一份模板 AGENTS.md，将你个人的"操作系统"编码其中。克隆后微调，而不是从头开始。

数据科学项目示例：

```markdown
## Language
- Conversation: Traditional Chinese
- Code and comments: English

## Python Standards
- 4-space indentation, pytest over unittest
- All functions have type hints and docstrings
- Prefer f-strings, pathlib over os.path

## Analysis Defaults
- Use plotnine for visualization (set figure size + DPI)
- Check assumptions before statistical tests (VIF for multicollinearity)
- Always include EDA before modeling
```

### 元原则：采用顺序

不要在第一天就过度设计。在最痛的地方收紧系统：

1. **从 `@` 引用开始**，将智能体锚定在规格说明和 schema 上。
2. **添加核心规则**（架构约束、Git 规范、关键命令）。
3. **感到重复时**：提取为斜杠命令。
4. **任务需要专项专注时**：划出子智能体。
5. **触及静态文本的极限时**：引入 MCP。
6. **启动新项目时**：叠加领域模板。

---

## 第三部分：分层记忆管理

### 五层架构

智能体记忆不是单一文件——而是一个分层系统，每一层服务于不同的受众和范围。

```
┌─────────────────────────────────────────────┐
│  Layer 1: Organization Policy (IT/DevOps)   │  Broadest scope
├─────────────────────────────────────────────┤
│  Layer 2: User Preferences (personal)       │
├─────────────────────────────────────────────┤
│  Layer 3: Project Rules (team, in git)      │  ← Most important
├─────────────────────────────────────────────┤
│  Layer 4: Local Workspace (personal, local) │
├─────────────────────────────────────────────┤
│  Layer 5: Conditional Rules (per-context)   │  Narrowest scope
└─────────────────────────────────────────────┘
        ↕
   Auto Memory (learned, accumulates over time)
```

### 第一层：组织策略

| 属性         | 详情                                                                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **位置**     | macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md` · Linux: `/etc/claude-code/CLAUDE.md` · Windows: `C:\Program Files\ClaudeCode\CLAUDE.md`                   |
| **受众**     | IT/DevOps，全局强制执行                                                                                                                                                |
| **内容**     | 安全策略（禁止硬编码密钥、强制 HTTPS）、合规要求（日志不得含 PII）、禁止模式（不得使用未批准的库、不得直接访问生产数据库） |

仅适用于企业。小团队可跳过。

### 第二层：用户级偏好

| 属性     | 详情                                             |
| -------- | ------------------------------------------------ |
| **位置** | `~/.claude/CLAUDE.md`                            |
| **受众** | 你本人，跨所有项目生效                           |
| **内容** | 沟通偏好、个人编码风格、偏好的工具               |

这是你的个人默认值。当项目级规则与其冲突时，项目级规则优先。

### 第三层：项目级共享规则（最重要）

| 属性     | 详情                                                                             |
| -------- | -------------------------------------------------------------------------------- |
| **位置** | 项目根目录下的 `CLAUDE.md` 或 `AGENTS.md`（纳入 git 管理）                      |
| **受众** | 整个团队                                                                         |
| **内容** | 技术栈、项目结构、编码规范、关键命令、架构决策                                   |

这是第一部分和第二部分的聚焦所在。模板：

```markdown
# AGENTS.md

## Project Overview
[1–2 sentences]

## Tech Stack
[Only what's non-obvious]

## Key Commands
[Exact commands: dev, test, lint, build]

## Architecture Decisions
[WHY + WHAT for each]

## Workflow: How to Add [Feature/Endpoint/Component]
[Step-by-step with file paths]

## Forbidden Patterns
["Don't X → do Y instead"]
```

### 第四层：本地工作区记忆

| 属性     | 详情                                                                               |
| -------- | ---------------------------------------------------------------------------------- |
| **位置** | 项目根目录下的 `CLAUDE.local.md`（加入 `.gitignore`）                              |
| **受众** | 你本人，针对此项目                                                                 |
| **内容** | 本地环境配置、测试账号、当前 WIP、个人 TODO、调试技巧                              |

这是你与智能体之间持久化的"工作日志"。手动维护，或直接让智能体来做：*"总结我们在支付 bug 上得出的关键结论，并添加到 CLAUDE.local.md 中。"*

### 第五层：条件规则目录

| 属性     | 详情                                                     |
| -------- | -------------------------------------------------------- |
| **位置** | `.claude/rules/*.md`                                     |
| **受众** | 智能体，仅在编辑匹配文件时加载                           |
| **内容** | 测试规范、前端规则、API 设计模式                         |

通过 YAML frontmatter 实现基于路径的作用域：

```yaml
# .claude/rules/testing.md
---
paths:
  - "src/**/*.test.ts"
  - "tests/**/*.ts"
---

## Testing Standards
- Vitest + React Testing Library
- Arrange → Act → Assert structure
- Test user behavior, not implementation
- 80% coverage for new modules
```

这些规则只在相关时消耗上下文——这是渐进式披露在规则层面的落地实现。

### 第六层\*：自动记忆

| 属性                 | 详情                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| **位置**             | `~/.claude/projects/<project-id>/memory/`                                                                |
| **内容**             | Claude 从会话中学到的模式：调试路径、结构洞察、项目注意事项                                              |
| **与 AGENTS.md 的区别** | AGENTS.md = 人工定义的规则（输入规格）。自动记忆 = 模型习得的经验（自适应洞察）。                    |

使用 `/memory` 命令管理：
- `/memory` — 查看已加载的记忆及其来源
- `/memory edit` — 编辑项目级 CLAUDE.md
- `/memory edit user` — 编辑用户偏好
- `/memory edit local` — 编辑本地工作区

或者直接告诉智能体：*"在 CLAUDE.md 中添加一条规则：我们始终使用 `pnpm`。"*

### 随时间维护记忆

**事后规则：** 第二次纠正同一个智能体行为时，将其固化为规则。不是第一次（可能是偶发情况），不是预防性地（会导致臃肿）。

**保持同步。** 描述已被替换依赖项的过时文件会主动降低性能。迁移到 Vite 之后文件里还写着"我们用 Webpack"，比没有文件还糟糕。

**数据驱动的飞轮。** 审查智能体 CI/CD 日志中的常见错误 → 将模式反馈到 AGENTS.md → 性能提升 → 错误减少。Bug 变成规则，规则变成更好的代码。

**让智能体维护自身：**
```
"Summarize the key insight from our debugging session and
propose an addition to CLAUDE.md if it would prevent this
issue for future sessions."
```

### 更宏观的视角：提示工程 → 上下文工程 → 智能体工程

AI 辅助开发的演进路径：

1. **提示工程** — 为单次交互精心设计个别提示。
2. **上下文工程** — 设计围绕模型的信息架构。AGENTS.md 就在这一层。
3. **智能体工程** — 设计专门的、可复用的 AI 智能体（子智能体、skills、MCP 工具），将它们组合成更大的工作流。

AGENTS.md 是进入上下文工程最容易的入口。但它不是终点——ACE 框架（ICLR 2026）等新兴方法能动态生成任务特定的上下文，性能比静态文件高出 12.3%。

目前而言：**一份精简的、人工编写的、定期维护的记忆文件——只包含智能体自己发现不了的内容——是一笔回报复利增长的小投资。**

---

*延伸阅读：*
- *ETH Zurich (2026): "Evaluating AGENTS.md"* — 首个实证基准研究
- *Lulla et al. (ICSE JAWs 2026)* — 效率视角的对照研究
- *Anthropic: Claude Code Best Practices* — CLAUDE.md 官方指南
- *Addy Osmani: "Stop Using /init for AGENTS.md"* — 上下文文件的实用过滤原则
- *"Memory in the Age of AI Agents: A Survey" (Tsinghua, 2025)* — 智能体记忆学术综述

---

**下一章：** 你现在已经知道如何提示智能体，以及如何给它持久化记忆。但这些智能体究竟是如何*工作*的？在[第二章：编程智能体解剖](../02-anatomy/README.md)中，我们将打开黑箱——理解智能体循环、自主性级别和失败模式，将让本章的每一项技术都更加有效。
