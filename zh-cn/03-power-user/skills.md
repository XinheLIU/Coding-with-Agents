# 智能体技能：可复用 AI 专业知识的架构

> 技能系统如何将通用智能体转变为专业化的团队成员

---

## 简介

随着 AI 智能体获得导航文件系统、执行代码以及与完整计算环境交互的能力，一个关键的空缺浮现出来：通用模型很强大，但真正的工作需要*程序性知识*和*组织背景*。智能体可能理解什么是代码审查，但它不知道你团队具体的审查清单。它可能掌握财务概念，但它不知道你的季度报告工作流。

Anthropic 对这一挑战的答案是**智能体技能（Agent Skills）**——智能体可以动态发现并加载以在特定任务中表现更好的指令、脚本和资源的有组织文件夹。技能于 2025 年 10 月首次推出，并于 2025 年 12 月作为开放标准发布，代表了我们为 AI 智能体配备领域专业知识方式的根本性转变。

本文提供了关于智能体技能的设计哲学、架构和实际工程的全面指南——参考 Anthropic 的官方文档、`anthropics/skills` 代码库以及生态系统中涌现的真实世界模式。

---

## 1. 什么是技能，为什么它们重要？

### 1.1 技能作为"可操作的知识"

技能不是静态文档。它是一个**语义可触发的知识与能力包**——包含领域知识、执行步骤、输出要求和约束，按需加载到智能体的上下文中。

考虑维基页面上的风格指南与打包为技能的同一指南之间的区别：

- **维基页面**是被动的。人们必须知道它的存在并记得去查阅。
- **技能**是主动的。它有一个**触发条件**（`description` 字段告诉模型*何时*这些知识是相关的）、一个**执行流程**（正文中的分步指令）、**质量标准**（预期输出的模板）、**工具约束**（`allowed-tools` 限定智能体能做和不能做的事），以及可选的**自动检查**（验证输出质量的 Hooks）。

这将知识从必须手动检索的东西，转变为模型可以自主发现、选择和应用的东西。

### 1.2 技能在智能体架构中的位置

要理解技能的位置，将其与 Claude Code 智能体系统的其他构建模块并排看会有帮助：

| 组件 | 角色 | 类比 |
|-----------|------|---------|
| **工具** | 智能体*能做*的事——文件操作、搜索、代码执行 | 双手 |
| **子智能体** | *谁*来做一项任务——专注工作的隔离工作者 | 同事 |
| **Hooks** | *何时*检查——事件驱动的自动化（编辑后 lint、bash 前日志） | 质检员 |
| **CLAUDE.md** | 每次会话都加载的持久上下文——项目规范、文化 | 员工手册 |
| **MCP 服务器** | 外部服务连接——数据库、API、第三方工具 | 合作伙伴集成 |
| **技能** | *如何*以及*何时做*——按需加载的结构化、可操作专业知识 | 标准操作流程 |

核心洞见：技能占据**认知层**。它们不添加新工具或新智能体——它们添加的是*关于如何在特定上下文中有效使用现有工具和智能体的知识*。这就是为什么 Anthropic 将构建技能描述为像组装**新员工的入职指南**一样。

### 1.3 技能作为企业本体

这里有更深层的意义。当一个组织将其"做事方式"——审查流程、命名规范、部署清单、领域启发式——编码为技能时，重要的事情发生了：**机构知识变得可被模型继承**。

![技能与企业本体](../assets/Skill-and-Enterprise-Ontology.png)

以前，这些知识存在于需要阅读的文档中、经验丰富的员工的脑海中，或分散的流程文件里。作为技能，它变成了模型可以理解、选择和执行的东西。映射关系直观易懂：

- **工具** → 组织的工具基础设施
- **子智能体** → 职位职能和劳动分工
- **Hooks** → 合规和质量保证流程
- **CLAUDE.md** → 公司文化和基准规则
- **技能** → SOP（标准操作流程）库

这意味着技能不只是开发者的便利工具——它们是**一个组织如何运作的结构化表示**，提供给 AI 智能体使用。

---

## 2. 技能如何被激活：发现与渐进式披露

### 2.1 两种激活模式

技能可以通过两种方式触发：

1. **显式调用**：用户输入斜杠命令，如 `/review` 或 `/commit`，直接加载对应的技能。
2. **语义自动检测**：Claude 检查所有已安装技能的 `description` 字段，并根据用户的自然语言请求判断哪个技能最相关。如果用户说"帮我检查这段代码的问题"，Claude 可能会自动加载代码审查技能，而无需被明确要求。

这个决策发生在 Claude 通过 transformer 的前向传播中——这不是基于规则的匹配，而是对技能何时适用的真正语义理解。

### 2.2 渐进式披露：核心设计原则

渐进式披露使技能具有可扩展性。就像一本组织良好的手册，从目录开始，然后是具体章节，最后是详细附录，技能让 Claude 只在需要时加载信息。

架构在三层中运作：

| 层次 | 加载内容 | 时机 | 目的 |
|-------|-----------|------|---------|
| **目录**（描述） | 仅 `name` 和 `description` 字段 | 会话开始时，针对所有已安装的技能 | 发现——让 Claude 知道有什么可用 |
| **章节**（SKILL.md） | 完整的 SKILL.md 文件 | 当技能被激活时 | 核心指令、路由、工作流步骤 |
| **附录**（支持文件） | reference/*.md、templates/*.md、scripts/、data/ | 仅在 SKILL.md 明确引用时 | 详细知识、模板、可执行逻辑 |

这意味着打包到技能中的上下文量**实际上是无限的**——技能可以包含大量文档、参考资料和脚本，而不会预先消耗上下文。Claude 只在任务需要时才读取额外文件。

在典型使用中，与一次性加载所有内容相比，这种方法将 token 消耗减少了 **78%-98%**。

### 2.3 权限与优先级

技能可以在细粒度级别进行控制：

- **`disable-model-invocation: true`**：技能只能由用户通过斜杠命令触发——Claude 不会自动加载它。用于有副作用的工作流，如 `/deploy` 或 `/commit`。
- **`user-invocable: false`**：只有 Claude 可以调用该技能。用于作为用户命令没有意义的背景知识。

当同名技能在多个级别存在时，优先级遵循：**企业/托管 > 个人/用户 > 项目**。插件技能使用命名空间（如 `plugin-name:skill-name`）来避免冲突。

---

## 3. 技能解析：SKILL.md 结构

### 3.1 基础知识

最简单的技能是一个包含 `SKILL.md` 文件的目录。文件有两部分：**YAML 前置元数据**（元数据）和 **Markdown 内容**（指令）。

```yaml
---
name: code-review
description: >
  Reviews code for best practices, potential bugs, and style issues.
  Use when reviewing pull requests, checking code quality, or when
  the user asks to review changes.
allowed-tools: [Read, Grep, Glob, "Bash(git diff:*)"]
disable-model-invocation: false
---

# Code Review

## Instructions
1. Identify the files to review (from arguments or current diff)
2. Read each file and analyze for issues
3. Categorize findings as Critical, Warning, or Suggestion
4. Output a structured report

## Output Format
### Summary
[Brief overview of findings]

### Issues
- **Critical**: [file:line] Description
- **Warning**: [file:line] Description
- **Suggestion**: [file:line] Description

### What's Good
[Positive observations]
```

### 3.2 关键前置元数据字段

| 字段 | 用途 |
|-------|---------|
| `name` | 标识符和斜杠命令名称。使用小写加连字符。 |
| `description` | **最关键的字段。** 这是 Claude 用于决定何时激活技能的内容。必须说明*它做什么*、*如何做*以及*何时使用它*。 |
| `allowed-tools` | 细粒度工具权限。例如，`[Read, Grep, Glob]` 用于只读，或 `[Bash(git:*)]` 用于仅 git 的 bash 访问。 |
| `disable-model-invocation` | 如果为 `true`，只有用户可以通过斜杠命令触发。 |
| `user-invocable` | 如果为 `false`，只有 Claude 可以调用（背景知识）。 |
| `argument-hint` | 参数补全提示，例如 `[commit message]` |
| `model` | 指定使用哪个模型（例如，简单任务用 `sonnet`，复杂任务用 `opus`）。 |
| `context: fork` | 在隔离的子智能体上下文中运行，用于大量输出。 |
| `hooks` | 技能范围的事件 Hooks（例如，编辑后自动格式化）。 |

### 3.3 500 行规则

Anthropic 建议将 SKILL.md 保持在 **500 行**以下。如果内容超过这个限制，将详细参考材料拆分到单独的文件中，并从主 SKILL.md 引用它们。这使核心指令保持专注，同时允许全面的文档并列存在。

### 3.4 支持文件组织

```
.claude/skills/my-skill/
├── SKILL.md           # 核心：路由、工作流、关键规则
├── reference/         # 详细知识、规格、公式
│   ├── api-patterns.md
│   └── error-codes.md
├── templates/         # 输出模板、报告格式
│   └── review-report.md
├── scripts/           # 可执行逻辑（确定性任务）
│   └── validate.py
├── examples/          # 使用示例、样本输入/输出
│   └── sample-review.md
└── data/              # 静态参考数据、配置
    └── thresholds.json
```

放置内容的实用决策树：

- **每次激活都需要它？** → 放入 SKILL.md（内联）
- **具有固定 I/O 的确定性逻辑？** → 封装为脚本（`scripts/`）
- **结构化输出格式？** → 放入 `templates/`
- **静态参考数据？** → 放入 `reference/`
- **使用说明？** → 放入 `examples/`

---

## 4. 编写有效的描述

`description` 字段是技能中最重要的一块。它不是面向用户的文档——它是 Claude 用于决定是否加载技能的**触发信号**。

### 4.1 公式

好的描述遵循以下模式：**它做什么** + **如何做** + **何时使用**。

**差：**
```yaml
description: Handles PDFs
```
这很模糊。Claude 无法判断何时激活它。

**好：**
```yaml
description: >
  Extract text and tables from PDF files, fill forms, merge documents.
  Use when working with PDF files or when the user mentions PDFs,
  forms, or document extraction.
```
这列举了具体操作，包含了用户可能使用的关键词，并清晰定义了触发上下文。

### 4.2 避免冲突

当多个技能有重叠的能力时，描述必须建立清晰的边界：

- **unit-testing**："Write and run unit tests for individual functions and methods. Use for isolated testing, mocking, and functional verification of single components."
- **integration-testing**："Write and run integration tests for multi-component workflows. Use for API end-to-end testing, database interactions, and cross-service validation."

没有这种清晰性，Claude 可能选择错误的技能或在选项之间犹豫。

### 4.3 Token 预算

所有技能描述在会话开始时加载到系统提示词中。所有描述的总预算约为 **15000 个字符**。保持单个描述简洁但完整——每个词都应帮助 Claude 做出更好的激活决策。

---

## 5. 两种类型的技能：参考型与任务型

### 5.1 参考型技能

参考型技能提供**持久性知识**，塑造 Claude 处理工作的方式。它们没有严格的执行步骤——它们建立规则、规范和领域理解。

**特点：**
- 模型自动调用通常**启用**（Claude 在相关时加载它们）
- 工具权限通常为**只读**（`[Read, Grep, Glob]`）
- 没有严格的输出格式——它们影响行为而非产生报告
- 示例：API 设计规范、编码风格指南、领域术语、架构原则

```yaml
---
name: api-conventions
description: >
  API design patterns and conventions for this project.
  Use when writing or reviewing API endpoints, designing new APIs,
  or making decisions about request/response formats.
allowed-tools: [Read, Grep, Glob]
---

# API Conventions

## URL Naming
- Use plural nouns: `/users`, `/orders`
- Nest resources: `/users/{id}/orders`

## Response Format
- Always include `status`, `data`, and `error` fields
- Use HTTP status codes correctly

## Authentication
- Bearer tokens in Authorization header
- Refresh tokens via `/auth/refresh`
```

### 5.2 任务型技能

任务型技能定义**明确的执行工作流**，具有清晰的步骤和输出。它们是 AI 版本的操作手册。

**特点：**
- 模型自动调用通常**禁用**（`disable-model-invocation: true`）
- 工具权限精确限定在任务所需范围
- 清晰的输入参数、执行步骤和输出格式
- 示例：`/commit`、`/review`、`/deploy`、`/pr-create`

```yaml
---
name: commit
description: >
  Create a well-formatted git commit. Analyzes staged changes
  and generates a Conventional Commit message.
disable-model-invocation: true
allowed-tools: ["Bash(git:*)"]
argument-hint: "[optional commit message]"
---

# Smart Commit

## Steps
1. Run `git status` — if nothing staged, inform user and stop
2. If $ARGUMENTS provided, use as commit message
3. Otherwise:
   a. Run `git diff --staged`
   b. Analyze changes
   c. Generate Conventional Commit format message
   d. First line ≤ 72 characters
   e. Include scope and description
4. Execute `git commit -m "<message>"`
5. Report result
```

### 5.3 结合两种类型

在实践中，成熟的工作流通常会结合两者：

- **参考型技能**提供编码标准和规范
- **任务型技能**使用这些标准执行审查
- **子智能体**处理跨多个文件的大规模审查，在隔离上下文中进行

---

## 6. 高级模式

### 6.1 使用 `!command` 进行动态上下文注入

技能可以通过使用以 `!` 为前缀的 Shell 命令，在 Claude 处理请求之前注入实时数据。这些命令执行后，其输出替换技能文本中的命令。

```markdown
## Current State
Branch: !git branch --show-current
Recent commits: !git log origin/main..HEAD --oneline
Changed files: !git diff --stat origin/main
```

用户调用技能时，这些命令首先运行，让 Claude 立即了解当前状态，无需额外的工具调用。这对 PR 创建、部署和状态报告工作流尤为强大。

**安全提示：** 用户输入通过 Shell 执行，因此始终配合严格的 `allowed-tools` 约束使用 `!command`。

### 6.2 技能范围的 Hooks

技能可以在前置元数据中定义自己的事件 Hooks，仅限于技能的生命周期范围：

```yaml
hooks:
  PreToolUse:
    - matcher: Bash
      command: echo "$TOOL_INPUT" >> /tmp/audit.log
  PostToolUse:
    - matcher: Edit
      command: npx prettier --write "$FILE_PATH"
```

| 事件 | 用例 | 示例 |
|-------|----------|---------|
| `PreToolUse` + Bash | 危险操作的审计日志 | 记录所有 bash 命令 |
| `PostToolUse` + Edit | 文件编辑后自动格式化 | 对更改文件运行 prettier |
| `PostToolUse` + Write | 文件创建后验证 | 运行验证脚本 |
| `STOP` | 完成时通知 | 系统通知 |

这些 Hooks 只在技能执行期间运行，不影响全局行为。

### 6.3 参数传递

技能支持灵活的参数处理：

- **单一参数**：`$ARGUMENTS` 捕获命令名称后的所有内容
  - `/commit fix login bug` → `$ARGUMENTS = "fix login bug"`
- **多个参数**：`$1`、`$2` 等用于位置参数
  - `/pr-create "Add auth" "JWT implementation"` → `$1 = "Add auth"`，`$2 = "JWT implementation"`
- **会话变量**：`${CLAUDE_SESSION_ID}` 用于日志和追踪

如果技能中没有使用参数变量，用户输入会自动附加为 `ARGUMENTS: <input>`，以防止信息丢失。

### 6.4 使用 `fork` 进行上下文隔离

对于产生大量输出的技能（例如，分析整个代码库），使用 `context: fork` 在隔离的子智能体上下文中运行。子智能体处理繁重的工作，并将摘要返回给主对话，保持主上下文干净。

---

## 7. 设计原则与最佳实践

### 7.1 七步设计方法

1. **定义动作**：这个技能执行什么具体任务？（例如，提交、部署、审查）
2. **设置触发权限**：Claude 自动调用，还是仅用户触发？
3. **限定工具权限**：最少必要工具，限定到具体命令
4. **设计启动上下文**：在实时数据有帮助的地方使用 `!command` 注入
5. **添加安全网**：为日志、验证、格式化配置技能 Hooks
6. **控制输出范围**：对大量输出使用 `context: fork`
7. **选择模型**：简单任务用 haiku/sonnet；复杂推理用 opus

### 7.2 核心原则

- **单一职责**：一个技能，一项工作。优先选择 `/commit` 和 `/review`，而非 `/git-all-in-one`。
- **清晰命名**：`/deploy:staging` 优于 `/do-stuff`。名称应传达意图。
- **权限收敛**：`allowed-tools: [Bash(git status:*)]` 优于 `[Bash(*)]`。永远不要授予超出必要的权限。
- **明确的错误处理**：记录出错时应该发生什么。不要让 Claude 在失败路径上自行发挥。
- **从最小开始迭代**：从一个简单的 SKILL.md 开始。随着实际使用揭示需求，添加参考文件、模板和脚本。

### 7.3 CLAUDE.md 与技能：什么放在哪里

| CLAUDE.md | 技能 |
|-----------|--------|
| 不超过 100 行的始终加载全局规则 | 详细的、特定领域的知识 |
| 团队文化、基准规范 | 特定工作流和流程 |
| "每次会话都需要" | "仅在相关时加载" |
| 构建命令、测试规范 | API 文档、部署清单 |

如果某些内容重要但只在特定上下文中相关，它属于技能。CLAUDE.md 可以包含指针："关于 API 规范，请参阅 `api-conventions` 技能。"

---

## 8. 团队协作与组织

### 8.1 范围层次结构

- **项目级**（`.claude/skills/`）：提交到 git，跨团队共享。用于团队标准工作流。
- **用户级**（`~/.claude/skills/`）：跨所有项目可用的个人技能。用于个人习惯和偏好。
- **插件级**：从市场或代码库安装，使用命名空间以避免冲突。

### 8.2 目录规范

技能使用目录名称作为标识符。对于相关技能，使用前缀：

```
.claude/skills/
├── git-commit/SKILL.md
├── git-review/SKILL.md
├── git-pr-create/SKILL.md
├── api-conventions/SKILL.md
└── deploy-staging/SKILL.md
```

命令（`.claude/commands/` 中的旧格式）支持使用冒号命名空间的目录嵌套：`.claude/commands/git/status.md` 映射到 `/git:status`。

### 8.3 积累的价值

随着团队随时间构建和完善技能，一些有价值的东西涌现出来：一个**机器可读的机构知识库**。新团队成员（无论是人类还是 AI）可以利用相同的积累专业知识。工作流变得标准化，但不变得僵化。由于技能只是 Markdown 和脚本的文件夹，它们自然地随 git 进行版本控制。

![企业与 Claude 类比](../assets/Enterprise-Analogy-to-Claude.png)

---

## 9. 入门

最快的入门方式是使用 Anthropic 官方代码库中的模板：

```yaml
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

# My Skill Name

[Instructions that Claude will follow when this skill is active]

## Examples
- Example usage 1
- Example usage 2

## Guidelines
- Guideline 1
- Guideline 2
```

将其放置在 `.claude/skills/my-skill-name/SKILL.md`（项目级技能）或 `~/.claude/skills/my-skill-name/SKILL.md`（个人技能）中。

对于更复杂的技能，探索 GitHub 上的 `anthropics/skills` 代码库，其中包含从文档创建到前端设计再到企业通信的生产示例。你可以直接将它们作为 Claude Code 插件安装：

```bash
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
```

---

## 10. 更宏观的视角

智能体技能作为开放标准发布于 [agentskills.io](http://agentskills.io)，设计用于跨平台可移植性。虽然 Claude Code 以额外功能（调用控制、子智能体执行、动态上下文注入）实现了该标准，但核心格式——一个包含 SKILL.md 文件的文件夹——是刻意简单且供应商中立的。

这种简单性正是重点所在。技能不是需要特殊工具的复杂框架。它们是文件夹中的 Markdown 文件。它们随 git 进行版本控制。它们可以在 pull request 中被审查。它们可以使用开发者已知的工作流进行共享、fork 和迭代。

范式转变微妙而深刻：我们从*人类编排每个模型操作*转变为*模型为手头任务选择正确的专业知识*。`description` 字段——仅仅几行文字——使这一转变成为可能。它是语义接口，通过它模型不仅理解能力*是什么*，还理解*何时*应该应用它。

对于组织而言，这意味着机构知识——如何做事、什么标准重要、什么判断是恰当的——可以首次以 AI 智能体可以理解、选择和继承的形式进行结构化。技能不只是使智能体更有能力，它们使组织专业知识变得可组合、可移植和持久。

---

## 参考文献

- [Equipping Agents for the Real World with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — Anthropic 工程博客
- [Extend Claude with Skills](https://code.claude.com/docs/en/skills) — Claude Code 文档
- [Extend Claude Code](https://code.claude.com/docs/en/features-overview) — 功能概述
- [Agent Skills API Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — Claude API 文档
- [anthropics/skills](https://github.com/anthropics/skills) — GitHub 上的官方技能代码库
- [Agent Skills Open Standard](http://agentskills.io) — 跨平台规范
