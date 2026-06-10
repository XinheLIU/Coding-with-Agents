# Note Organization Principles

## MECE Principle (Mutually Exclusive, Collectively Exhaustive)

When splitting long notes into multiple files, ensure content organization follows MECE:

### Mutually Exclusive
- Each concept should appear in only ONE file
- No overlap between sections
- Clear boundaries between topics

### Collectively Exhaustive
- All content from original notes is preserved
- Nothing important is left out
- Complete coverage of the course material

## Splitting Strategies

### By Topic/Module
```
README.md → Overview + links
01-data-agents-intro.md → What are data agents
02-data-agents-architecture.md → How they work
03-data-agents-implementation.md → Building data agents
```

### By Concept Hierarchy
```
README.md → High-level concepts
core-concepts.md → Fundamental principles
advanced-topics.md → Complex applications
case-studies.md → Real-world examples
```

## Good vs Bad Note Structure Examples

### ❌ Bad Structure
```markdown
# Notes

Some info about data agents
They can do queries
Also web search

Data agents are autonomous
They use LLMs
Can answer questions

More about data agents...
```

**Problems:**
- No clear hierarchy
- Repetitive information
- Concepts scattered
- No logical flow

### ✅ Good Structure
```markdown
# Data Agents

## What is a Data Agent?
A **data agent** is an **autonomous or semi-autonomous system powered by LLMs** that:
* Understands natural language queries
* Retrieves data from multiple sources
* Analyzes and synthesizes information
* Produces actionable insights

## Core Capabilities
### Multi-Source Reasoning
Data agents can combine:
* Internal databases (via text-to-SQL)
* External web data (via search APIs)
* Document repositories (via semantic search)

### Autonomous Planning
Agents decompose complex queries into:
1. Subtasks
2. Tool selections
3. Sequential execution steps
```

**Strengths:**
- Clear hierarchy (# → ## → ###)
- Logical grouping
- No redundancy
- Actionable structure

## Image Insertion Guidelines

### When to Insert Images
- After introducing a concept that the image illustrates
- Before detailed explanation if image provides overview
- Within relevant section, not at arbitrary locations

### Example Placement
```markdown
## How Data Agents Work

Data agents follow a multi-step reasoning loop:

![Data Agent Loop](./data-agent-loop.png)

The process consists of:
1. Query analysis
2. Tool selection
3. Execution
4. Result synthesis
```

### Image Reference Format
Always use:
- Descriptive alt text: `![How Data Agents Work](image.png)`
- Relative paths: `./image.png` or `../images/image.png`
- Consistent naming conventions
