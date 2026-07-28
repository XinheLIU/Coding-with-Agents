---
name: book-chapter-writer
description: "Transform raw course notes into well-organized, professional markdown documents. Use when the user needs to clean up and restructure markdown course notes in a folder, with tasks including: (1) Analyzing and reorganizing somewhat-organized notes, (2) Removing repetitive concepts and redundant examples, (3) Inserting images at appropriate locations based on descriptive filenames, (4) Creating consolidated files (under 1000 lines) or split MECE structure (over 1000 lines with README.md linking to sub-notes), (5) Applying standard markdown formatting with proper headers, bold, bullets, tables, code blocks."
---

Last updated: 2026-07-28

# Course Note Writer

Transform raw course notes into well-organized, professional markdown documentation with proper structure, minimal redundancy, and appropriately placed images.

## Workflow

Follow these steps in order when processing course notes:

### Step 1: Initial Assessment

Analyze the input folder to understand scope and structure:

```bash
# List all markdown files and count total lines
find /path/to/notes -name "*.md" -exec wc -l {} + | sort -n

# List all images
find /path/to/notes -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" \)
```

Determine:
- **Total line count**: Decides single file vs. multi-file output
- **Number of .md files**: How many source files to process
- **Image inventory**: Available images and their descriptive filenames
- **Current structure**: Topic organization, redundancy patterns

### Step 2: Content Analysis

Read all markdown files and analyze:

1. **Topic identification**: What are the main concepts/modules covered?
2. **Redundancy detection**: Which concepts are repeated multiple times?
3. **Narrative structure**: What is the main argument, and how does each section advance it?
4. **Heading outline**: If the body is hidden, do the headings alone still communicate the article's main logic?
5. **Summary target**: What is the article about, what main problem does it solve, and what is its core logic?
6. **Image-content mapping**: Which images relate to which concepts based on filenames?

### Step 3: Organization Decision

**If total content < 1000 lines:**
- Consolidate into a single well-structured file
- File name: Use most descriptive topic name or `course-notes.md`

**If total content ≥ 1000 lines:**
- Split into MECE (Mutually Exclusive, Collectively Exhaustive) modules
- Create `README.md` as main index with links
- Create separate files for each module (e.g., `01-intro.md`, `02-architecture.md`)
- Consult `references/organization-principles.md` for MECE guidance

### Step 4: Content Restructuring

For each output file:

1. **Remove redundancy**:
   - Consolidate repeated concept explanations
   - Keep the most clear and comprehensive version
   - Remove duplicate examples that don't add new insight
   - Merge overlapping bullet points

2. **Design a continuous heading narrative**:
   - Draft the heading outline before polishing the body
   - Read the headings alone from top to bottom; they must communicate the chapter's main argument
   - Make each child heading continue, explain, or logically decompose its parent heading
   - Make adjacent headings form a coherent narrative or logical progression, not a collection of independent labels
   - Prefer headings that express a claim or reader task; this applies equally to English and Chinese
   - Create a heading only for a distinct concept, question, argument, or reader-navigable task
   - Do not create headings merely to label local formatting such as "Procedure," "Pitfalls," "Examples," or "Tools"; use a bold run-in label when local structure is still useful
   - Do not optimize for fewer or more headings; use only the headings required by the argument

3. **Organize hierarchically**:
   - Use `#` for main title (one per file)
   - Use `##` for major sections
   - Use `###` for subsections
   - Use `####` sparingly for fine-grained details

4. **Apply formatting**:
   - **Bold** for key terms, concepts, and emphasis
   - Bullet points for lists of items, features, or characteristics
   - Numbered lists for sequential steps or ordered items
   - Tables for structured comparisons or data
   - Code blocks with language tags for code examples
   - Blockquotes for important callouts or citations

5. **Write a standalone summary**:
   - Treat the summary as a compressed model of the article, not a closing remark or list of section names
   - Make it answer three questions without requiring the body: What is this article about? What main problem does it solve? What is the core argument or logical chain?
   - State how the major ideas depend on or lead to one another; naming the ideas without their relationship is not enough
   - Include the resulting principle, decision, or workflow so the reader understands the article's practical conclusion
   - Do not introduce claims, evidence, or recommendations that the body does not support
   - Use the shortest form that remains semantically complete; this applies equally to English and Chinese

### Step 5: Image Integration

Insert images at appropriate locations:

1. **Match images to content**: Use descriptive filenames to identify where images belong
   - Example: `How-Data-Agents-Work.png` → insert in "How Data Agents Work" section

2. **Placement strategy**:
   - After introducing the concept the image illustrates
   - Before detailed explanation if image provides overview/diagram
   - Within the relevant section, not at arbitrary locations

3. **Markdown format**:
   ```markdown
   ![Descriptive Alt Text](./image-filename.png)
   ```
   - Use descriptive alt text matching content
   - Use relative paths
   - Place on its own line with blank lines before/after

### Step 6: Quality Check

Before finalizing, verify:

- [ ] The heading-only outline communicates the chapter's main logic
- [ ] Every child heading logically develops its parent, and adjacent headings form a continuous narrative
- [ ] No heading exists only to label local formatting or a short content block
- [ ] The summary alone explains the subject, main problem, core logic, and practical conclusion
- [ ] The summary synthesizes relationships between ideas instead of listing section names
- [ ] Clear hierarchical structure (proper header levels)
- [ ] No duplicate concepts or redundant explanations
- [ ] All images inserted in relevant sections
- [ ] Consistent formatting (bold, bullets, code blocks)
- [ ] MECE structure if split into multiple files
- [ ] README.md includes links to all sub-notes (if applicable)
- [ ] All content from original notes is preserved (nothing important lost)

### Step 7: Output Delivery

**For single file output:**
- Create the consolidated markdown file in the original folder or specified location
- Ensure all image references work with relative paths

**For multi-file output:**
- Create `README.md` with:
  - Course overview
  - Table of contents with links to each module
  - Brief description of each module
- Create module files with clear naming (e.g., `01-topic.md`, `02-topic.md`)
- Ensure all image references work from their respective file locations

## Formatting Standards

### Headers
- Level 1 (`#`): Document title (once per file)
- Level 2 (`##`): Major sections
- Level 3 (`###`): Subsections
- Level 4 (`####`): Fine details (use sparingly)
- Heading levels express narrative relationships, not visual size
- Use claim-oriented or reader-task-oriented titles in both English and Chinese

### Summary
- Must stand on its own for a reader who skips the body
- Must identify the article's subject, main problem, core logic, and practical conclusion
- Must explain the relationships among the main ideas, not merely repeat their names
- Must not introduce unsupported information

### Emphasis
- **Bold**: Key terms, important concepts, emphasis
- *Italic*: Minimal use, only for subtle emphasis or terminology
- `Code`: Inline code, commands, variable names, filenames

### Lists
- **Bullet points**: Features, characteristics, unordered items
- **Numbered lists**: Sequential steps, ordered procedures, rankings

### Tables
Use for structured comparisons or data:
```markdown
| Feature | Description | Example |
|---------|-------------|---------|
| Item 1  | Details     | Sample  |
```

### Code Blocks
Always use language tags:
```markdown
```python
def example():
    pass
```
```

### Blockquotes
For callouts, important notes, or citations:
```markdown
> **Note:** This is an important point to remember.
```

## Example Transformation

**Before (redundant, poorly structured):**
```markdown
# Notes

Data agents are AI systems
They use LLMs

Data agents can do queries
They search databases

What is a data agent?
A data agent is an autonomous system...
```

**After (clean, well-structured):**
```markdown
# Data Agents Fundamentals

## What is a Data Agent?

A **data agent** is an **autonomous or semi-autonomous system powered by LLMs** that:
* Understands natural language queries
* Retrieves data from multiple sources  
* Analyzes and synthesizes information
* Produces actionable insights

## Core Capabilities

Data agents combine multiple data sources to answer complex questions:
* Internal databases (via text-to-SQL)
* External web data (via search APIs)
* Document repositories (via semantic search)
```

## Reference Materials

For detailed guidance on organization principles and MECE structure, see:
- `references/organization-principles.md` - MECE principles, splitting strategies, and examples
