# Translation Glossary

Last updated: 2026-07-28

The required rendering wins over literal translation and over wording already
present in an older target file.

## Protected Technical Terms

Keep these terms in English when they refer to the named software-engineering
or agent concept. Preserve the source's casing and plurality.

| Term | Required rendering | Do not use |
| --- | --- | --- |
| `Characterization Test` / `Characterization Tests` | `Characterization Test` / `Characterization Tests` | 特征测试、特性测试 |
| `Seam` / `Seams` | `Seam` / `Seams` | 接缝、缝隙 |
| `Skill` / `Skills` | `Skill` / `Skills` | 技能（when referring to the agent package or `SKILL.md` concept） |

Translate ordinary uses of these words normally. For example, human skill as
general ability may be translated as `能力`; only the named agent concept is
protected.

## Required Chinese Renderings

| English source | Required Chinese | Avoid in Chinese output |
| --- | --- | --- |
| legacy codebase / legacy codebases | 老代码库 | 遗留代码库、旧代码库 |
| greenfield project / greenfield projects | 新项目 | 绿地项目 |

For Chinese-to-English translation, normalize `老代码库`, `遗留代码库`, and
`旧代码库` to `legacy codebase`; normalize `新项目` and `绿地项目` to
`greenfield project` when they carry those technical meanings.

Apply mappings by meaning, not substring replacement. Do not rewrite an
unrelated ordinary use of `legacy`, `seam`, or `skill` merely because the word
appears.
