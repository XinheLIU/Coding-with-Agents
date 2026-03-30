# Intentional Compaction

As context fills, continually summarize and distill information into structured artifacts (such as `progress.md`, research notes, or concrete plans). Actively discard raw chat/tool noise and retain only:

- **Goal**
- **Current understanding**
- **Decisions made**
- **Open problems**
- **Next steps**

This resets context, preserves the important signal, and prevents drift and hallucinated direction changes.

### Frequent Intentional Compaction (FIC): The Workflow

**Core workflow:**
1. **Research** – Understand the codebase, relevant files, data flow, and root causes. Output: a compact research document.
2. **Plan** – Outline precise steps — what to change, where, and how to test/verify. Output: an implementation plan.
3. **Implement** – Execute steps methodically, compressing updates back into the plan as needed.

**Best practice:** Keep context window usage around 40–60% and continuously compress work state into durable, external artifacts.
