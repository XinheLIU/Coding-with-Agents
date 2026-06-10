---
name: course-note-writer
description: "Transform raw course notes into well-organized, professional markdown documents. Use when the user needs to clean up and restructure markdown course notes in a folder, with tasks including: (1) Analyzing and reorganizing somewhat-organized notes, (2) Removing repetitive concepts and redundant examples, (3) Inserting images at appropriate locations based on descriptive filenames, (4) Creating consolidated files (under 1000 lines) or split MECE structure (over 1000 lines with README.md linking to sub-notes), (5) Applying standard markdown formatting with proper headers, bold, bullets, tables, code blocks."
---

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
3. **Structure quality**: Are headers hierarchical and logical?
4. **Image-content mapping**: Which images relate to which concepts based on filenames?

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

2. **Organize hierarchically**:
   - Use `#` for main title (one per file)
   - Use `##` for major sections
   - Use `###` for subsections
   - Use `####` sparingly for fine-grained details

3. **Apply formatting**:
   - **Bold** for key terms, concepts, and emphasis
   - Bullet points for lists of items, features, or characteristics
   - Numbered lists for sequential steps or ordered items
   - Tables for structured comparisons or data
   - Code blocks with language tags for code examples
   - Blockquotes for important callouts or citations

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
