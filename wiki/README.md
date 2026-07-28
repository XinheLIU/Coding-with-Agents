# Wiki

Last updated: 2026-07-27

The middle layer of the content pipeline:

```
raw/  →  wiki/  →  book/
notes    distilled    published
         concepts     chapters
```

**Currently empty.** Notes are promoted straight from `raw/` into `book/` today.
This layer exists for material that has outgrown a raw note but doesn't belong to
any single chapter — cross-cutting concepts referenced from several levels,
terminology worth defining once, or a topic still being figured out.

## What belongs here

- Concept pages that more than one level links to.
- Distilled notes that aren't chapter-shaped yet.
- Working definitions that later feed the terminology table in `CLAUDE.md`.

## What doesn't

- Verbatim source captures and link dumps → `raw/`.
- Anything with a slot in `SUMMARY.md` → `book/<lang>/`.

## Conventions

One concept per file, kebab-case (`context-window-limits.md`), with a
`Last updated:` line at the top. English only — wiki pages are working material
and are not mirrored into Chinese. Cite the `raw/` note or external source a page
was distilled from. When a page graduates into a chapter, leave it here and link
to the chapter, so the trail from source to published prose stays intact.
