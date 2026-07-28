---
name: book-diagrams
description: "Design and hand-author SVG diagrams that illustrate concepts in book chapters, deriving a coherent visual style from the book's existing diagrams and any reference images rather than applying fixed templates. Use when the user asks to insert diagrams or plots into a chapter, illustrate an article, convert a table or ASCII block into a diagram, or make SVG plots. Trigger on 'insert diagrams', 'make svg plots', 'illustrate this chapter', 'create plots', 'convert this table to a diagram'."
---

Last updated: 2026-07-28

# Book Diagrams

Hand-authored SVG illustrations for the chapters under `book/`. The deliverable is not any
single diagram — it is a *visual language*: a set of diagrams that read as siblings across
the whole book. Every file is plain SVG that a future session can reopen and edit as text.

This file is self-contained: principles, the book's current style facts, repo conventions,
and workflow are all here.

## What to Diagram

1. **Diagram relationships, keep tables for lookup.** Tool catalogs and reference lists
   that readers scan row by row stay as tables. Convert only content whose *shape* the
   prose or table flattens: flows, contrasts, hierarchies, cycles, splits, timelines.
2. **One diagram answers one question.** Phrase that question as the alt text. If a draft
   answers two questions, split it.
3. **Insert after the concept, before the detail.** The diagram gives the shape; the table
   under it keeps the detail. Never delete a table when adding its diagram. ASCII-art
   blocks *may* be replaced — the SVG is the same content, better rendered.
4. **Compress wording, not meaning.** Text inside a diagram is distilled from the
   surrounding prose — shorter than the sentence, never different from it.

## How to Choose a Form

Do not pick from a template menu. Ask what the idea *is*, and let that dictate the layout:

- A **judgment** (right vs wrong, before vs after) wants a side-by-side contrast the eye
  can compare item against item.
- A **process** wants direction: a chain, a wrapped sequence of steps, a loop. Feedback and
  failure paths look different from the main path (dashed, or a different color).
- A **classification** wants same-shaped cards whose hue separates the categories, with
  hierarchy shown by position (parent above, rail down to children).
- A **proportion or split** wants length or area, not a list.
- A **culmination** — many steps producing one key artifact — wants that artifact visually
  heavier than everything feeding it (full-width, warm color, bold).

Most concepts combine these (a chain that fans out, a grid that ends in a warning). Invent
the combination the concept needs; the constraint is coherence, not repertoire. Before
drawing, say in one sentence what the reader's eye should do first, second, third — if you
can't, the form is wrong.

## How to Derive the Style

Style is *discovered, then extended* — never invented per diagram and never copied
pixel-for-pixel from a reference image:

1. **Read the existing family first.** Open two or three SVGs already in the tree's
   `assets/` and extract their invariants: palette, corner radii, stroke weights, font
   stack, density, how arrows and captions are handled. New diagrams must keep those
   invariants unless the user asks for a redesign.
2. **Treat reference images as evidence of taste, not specs.** From a sample, extract the
   *decisions* — flat pastel fills with slightly darker strokes, generous whitespace, no
   gradients or shadows, semantic color, short labels — then re-make those decisions for
   your content. Matching the sample's exact boxes while the content mismatches is failure;
   matching its restraint with a layout the content actually needs is success.
3. **Color carries meaning before decoration.** Keep the semantic assignments stable across
   the whole book (in this book: green = good practice or established fact; red = violation,
   danger, or the one thing that matters most; muted gray-blue = neutral/human-side; pastel
   hues distinguish peer categories; dashed strokes = uncertain, emerging, or feedback).
   A reader who has seen three diagrams should predict the fourth's colors.
4. **Typography is a scale, not a choice per label.** One sans stack, one mono stack for
   code, and 3–4 sizes used consistently (roughly: section labels ~16 bold, card titles
   15–17 bold near-black, body 13–15 in the category color, captions 12.5–13 italic gray).
   Titles dark, content colored, annotations gray — that contrast does the layering.

### The book's current family (facts, not rules — extend coherently)

- Canvas: white, width 1310, height to fit; `font-family="-apple-system, 'PingFang SC',
  'Helvetica Neue', Arial, sans-serif"`; code in `ui-monospace, 'SF Mono', Menlo, monospace`.
- Shapes: rounded rects (`rx` 10–16), stroke-width 1.5, dashes `6 5`/`7 5`, 2px arrows with
  small triangle markers (one `<marker>` per color).
- Established palette (fill/stroke/text): green `#e9f3ee`/`#3d8b70`/`#1f6a51` · red
  `#fdf0ef`/`#c0564f`/`#b5453c` · gray-blue `#eef0f4`/`#8592a6`/`#45536b` · beige panel
  `#f7f7ee`/`#cfcfc0` · step-blue `#e8f2fd`/`#7aabdd`/`#2b5d9b` · category pastels
  (purple `#f4f1fe`/`#9b8cf0`, green `#e9f6f0`/`#4bab8d`, blue `#e8f2fc`/`#6ea8dc`,
  orange `#fdf4e3`/`#d9a648`, pink `#fdeeee`/`#d98080`, dashed beige `#f4f3ec`/`#b9b7a8`).
  Add hues sparingly and at the same saturation level; never introduce gradients, shadows,
  or pure-saturated colors.
- Shipped examples: the `Legacy-*.svg` set in `book/en/assets/`, referenced from
  `book/en/03-power-user/legacy-codebases.md`.

## Craft

SVG has no layout engine — you are the layout engine:

- Compute coordinates explicitly; check that labels clear every arrow lane they cross.
- Budget characters before writing: Latin width ≈ `font-size × 0.54` per char (bold ≈ ×1.1);
  CJK ≈ `font-size × 1.0`. Keep each line inside container width minus padding; break into
  a second `<text>` line rather than shrinking below ~12.5px.
- Escape `&` as `&amp;` and `<` as `&lt;` in text content.
- Validate every file: `python3 -c "import xml.etree.ElementTree as ET; ET.parse('f.svg')"`.

## Repo Conventions

- **Files:** `book/en/assets/<Topic>-<Concept>.svg`, PascalCase-with-hyphens.
- **References:** `./assets/X.svg` from a tree root, `../assets/X.svg` from level folders
  (`01-prompt/` … `05-architect/`); alt text states the diagram's question.
- **English first, review before mirroring.** Draft and insert in `book/en/` only. After
  approval, create translated same-filename copies in `book/zh-cn/assets/` and mirror the
  insertions into the zh chapter (chapter prose itself goes through `zh-translator`).
- **Update the chapter's `Last updated:` date** on any edit.
- **Preview:** browser, `npm run serve` (Honkit at `http://localhost:4000`), or
  `qlmanage -t -s 1310 -o <outdir> <file.svg>`.

## Workflow

1. **Propose.** Scan the chapter for shapes trapped in tables or ASCII art. Present the
   list — concept, intended form, insertion point — plus one finished sample to lock the
   style, and get approval before batch-producing.
2. **Draw** against the derived style; **validate**; **insert**; **preview**. Final check
   per diagram: does it answer its one question, does every element trace to the prose, is
   nothing clipped, and would it sit next to the existing family without looking adopted?
