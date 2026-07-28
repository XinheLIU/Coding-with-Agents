---
name: book-translator
description: "Translate, retranslate, review, or synchronize Markdown chapters between book/en/ and book/zh-cn/ while preserving structure, protected technical terms, links, code, and authorial voice. Use for bilingual book translation, terminology normalization, translation-quality review, or natural English and Simplified Chinese adaptation in this repository."
---

Last updated: 2026-07-28

# Book Translator

Translate the book as authored prose, not as sentence-aligned text. Preserve the
argument, structure, technical meaning, and personality of the source while
making the target read as if it was written in that language.

## Required References

- Always read [`references/glossary.md`](references/glossary.md) before translating or reviewing a chapter.
- Read [`references/voice.md`](references/voice.md) whenever translating narrative prose, especially Chinese to English or when the output sounds technically clean but generic.
- Follow the target tree's `AGENTS.md` and the repository's structural rules. If they conflict with the glossary, the glossary controls terminology.

## Workflow

### 1. Establish Scope

1. Identify the source language, target language, and exact source and target paths.
2. Treat the source as read-only. Write only to the corresponding target path unless the user explicitly requests reconciliation in both directions.
3. Read the existing target file before overwriting it. Preserve deliberate target-language improvements that are not contradicted by the source.
4. For a new chapter translation, inspect `ROADMAP.md`, both `SUMMARY.md` files, and the relevant level `README.md` files. Update publication metadata only when repository rules require it.

### 2. Read for Meaning and Voice

1. Read the whole source before translating.
2. Extract the heading-only outline. It must reveal the article's main logic in the target language too.
3. Identify the central problem, core argument, logical chain, point of view, rhythm, uncertainty, humor, and sharp edges.
4. Identify protected terms and required renderings from the glossary.
5. Mark code, identifiers, URLs, paths, and other spans that must remain byte-for-byte unchanged.

### 3. Translate the Argument

- Preserve heading levels, order, lists, tables, blockquotes, citations, code fences, links, image paths, and frontmatter structure.
- Translate headings as claims or reader tasks rather than literal labels. The translated heading outline must remain a continuous narrative.
- Preserve meaning and emphasis, but freely change sentence order, sentence length, idiom, and paragraph rhythm when the target language requires it.
- Preserve opinions, uncertainty, tension, humor, first-person perspective, and deliberate roughness. Do not neutralize them into encyclopedia prose.
- Do not manufacture jokes, emotions, personal experience, certainty, or controversy absent from the source.
- Make the summary stand alone: a reader who skips the body must still understand the subject, main problem, core logic, and practical conclusion.
- Do not add or remove claims, examples, citations, or sections unless the user asks for editorial reconciliation rather than translation.

### 4. Apply Direction-Specific Rules

**English to Simplified Chinese**

- Write natural Chinese; do not preserve English syntax or word order.
- Use the required Chinese renderings in the glossary and keep protected technical terms in English.
- Prefer direct, idiomatic wording over calques. The result should not announce that it is a translation.

**Simplified Chinese to English**

- Read the voice reference and preserve the author's stance instead of flattening it into neutral reporting.
- Vary sentence rhythm when the source does. Use first person when the source perspective supports it.
- Prefer precise, spoken English over corporate, academic, or press-release phrasing.

### 5. Preserve Non-Translatable Content

Do not translate or alter:

- Inline code and fenced code blocks
- File paths, URLs, anchors, and image paths
- Function names, variable names, CLI flags, configuration keys, and other identifiers
- YAML or frontmatter keys
- Protected technical terms listed in the glossary

Translate descriptive image alt text and display-text frontmatter values.

### 6. Verify

- Compare the source and target heading-level sequences.
- Confirm fenced code blocks, URLs, paths, and identifiers are unchanged.
- Scan for forbidden glossary variants and mistranslated protected terms.
- Read the target without looking at the source. It must sound authored, not translated.
- Read only the target headings; they must reproduce the main argument.
- Read only the target summary; it must explain the subject, main problem, core logic, and conclusion.
- Keep the target `Last updated:` value synchronized with the source when translating; use today's date when editorially revising both versions.
- Run `npm run build` after changing published book content.

## Delivery

Report the translated files, glossary decisions, deliberate adaptations, and
verification performed. Do not add translator notes inside the chapter.
