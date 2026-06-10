---
name: build-skeleton
description: |
  Initialize the three-layer architecture for an Agent Learning project.
  Use this skill when the user wants to scaffold ./raw/, ./wiki/, and ./book/
  from scratch, or wants to understand/recreate the directory layout.
  Trigger on "init the project", "scaffold the layers", "set up raw/wiki/book",
  "create the skeleton", "build skeleton", or any request about the three-layer
  directory structure.
---

# Build Skeleton

Initialize the three-layer content pipeline:

```
Layer 1 (Raw)   →   Layer 2 (Wiki)   →   Layer 3 (Book)
./raw/               ./wiki/               ./book/
```

## Init: Create all three layers

Run this to scaffold from scratch:

```bash
# Layer 1: Raw materials (cloud-synced, gitignored)
mkdir -p raw/general/{papers,articles,notes,images}
for ch in 01-foundations 02-in-context 03-fine-tuning 04-memory 05-multi-agent 06-openclaw; do
  mkdir -p raw/$ch/{papers,articles,notes,images}
done
cat > raw/.gitignore << 'EOF'
**/papers/*.pdf
.DS_Store
EOF

# Layer 2: Wiki (tracked in git)
mkdir -p wiki/{_templates,_attachments,cross-cutting}
for ch in 01-foundations 02-in-context 03-fine-tuning 04-memory 05-multi-agent 06-openclaw; do
  mkdir -p wiki/$ch
done
cat > wiki/.gitignore << 'EOF'
.DS_Store
.obsidian/workspace.json
.trash/
EOF

# Layer 3: Book (mdBook, published to GitHub Pages)
mkdir -p book/src/{assets,code,templates}
for ch in 01-foundations 02-in-context 03-fine-tuning 04-memory 05-multi-agent 06-openclaw; do
  mkdir -p book/src/$ch
done
```

Then write the key files:

| File | Purpose |
|---|---|
| `raw/README.md` | Layer 1 conventions (naming, structure, l1: references) |
| `wiki/README.md` | Layer 2 conventions ([[wikilink]], source citations, Obsidian) |
| `book/book.toml` | mdBook config (title, authors, build-dir) |
| `book/src/SUMMARY.md` | Left-nav hierarchy — source of truth for TOC |
| `book/src/README.md` | Landing page with course outline |
| `book/src/resources.md` | Curated reading list, organized by chapter |
| `book/src/AGENTS.md` | Full content conventions for authors |
| `book/src/0N-topic/README.md` | Chapter entry point (stub or full) |

Use `touch book/src/assets/.gitkeep book/src/code/.gitkeep book/src/templates/.gitkeep` to track empty directories in git.

## Book build

```bash
mdbook serve ./book   # dev server → http://localhost:3000
mdbook build ./book   # static output → book/_book/
```

Run `mdbook build ./book` after any structural change to verify it compiles.

## Key conventions

- **No boilerplate** ("In this section we will discuss..."), no invented references.
- **Chapter headers:** `# Level N: Title` → `##` sections → `###` subsections. No `#####` or deeper.
- **Images:** PascalCase names in `book/src/assets/`, referenced as `../assets/Name.png` from chapter dirs.
- **Resources cited in articles** must appear under their chapter section in `resources.md`.
- **Audience:** Engineers who code, may be new to ML training mechanics. Direct, practical voice.
