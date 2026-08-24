import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'node:fs'
import yaml from 'js-yaml'

// Pilot VitePress app for Coding with Agents.
// Renders the book/ tree directly from its canonical location (no Markdown copies).
// Sidebar, rewrites, and content: link resolution mirror the collection manifests.
const bookManifest = yaml.load(fs.readFileSync(new URL('../collections/book.yml', import.meta.url), 'utf8'))
const seriesManifest = yaml.load(fs.readFileSync(new URL('../collections/series.yml', import.meta.url), 'utf8'))

const rewrites = {}
const idToPath = {} // id -> { en, zh } pages in this app
const enRelOf = (p) => p.replace(/^book\//, '').replace(/\.md$/, '')
for (const item of bookManifest.items) {
  if (!item.source?.en) continue
  const enRel = enRelOf(item.source.en)
  const zhRel = item.source['zh-CN'] ? enRelOf(item.source['zh-CN']) : ''
  const enPath = item.route ?? `/${enRel}/`
  idToPath[item.id] = { en: enPath, zh: zhRel ? `/zh-cn/${zhRel}/` : null }
  rewrites[`${enRel}.md`] = `${enPath.replace(/^\//, '')}index.md`
}
for (const item of seriesManifest.items) {
  if (idToPath[item.id] || !item.source?.en) continue
  const enRel = enRelOf(item.source.en)
  const zhRel = item.source['zh-CN'] ? enRelOf(item.source['zh-CN']) : ''
  idToPath[item.id] = { en: `/${enRel}/`, zh: zhRel ? `/zh-cn/${zhRel}/` : null }
}

const contentLinkRe = /^content:([a-z0-9]+(-[a-z0-9]+)*)$/

export default withMermaid(
  defineConfig({
    title: 'Coding with Agents',
    description: 'A book on how software engineers work effectively in the age of AI coding agents.',
    base: '/Coding-with-Agents/',
    srcDir: 'book',
    cleanUrls: true,
    ignoreDeadLinks: true, // book chapters use Honkit-style relative links
    srcExclude: ['_book/**', '**/SUMMARY.md', '**/AGENTS.md', '**/RESOURCEs.md', 'LANGS.md', '**/draft-skill/**'],
    rewrites,
    markdown: {
      config: (md) => {
        md.core.ruler.after('inline', 'resolve-content-links', (state) => {
          const isZh = (state.env.path ?? '').includes('/zh-cn/')
          for (const token of state.tokens) {
            if (token.type !== 'inline' || !token.children) continue
            for (const child of token.children) {
              if (child.type !== 'link_open') continue
              const href = child.attrGet('href') ?? ''
              const m = href.match(contentLinkRe)
              if (!m) continue
              const target = idToPath[m[1]]
              if (!target) throw new Error(`unresolved content link: ${m[1]}`)
              child.attrSet('href', (isZh ? target.zh : target.en) ?? target.en)
            }
          }
        })
      },
    },
    themeConfig: {
      siteTitle: 'Coding with Agents',
      nav: [
        { text: 'Book site (live)', link: 'https://xinheliu.github.io/Coding-with-Agents/' },
        { text: 'Repo', link: 'https://github.com/XinheLIU/Coding-with-Agents' },
      ],
      sidebar: [
        {
          text: 'Pilot — English',
          items: [
            { text: 'How Coding Agents Work', link: '/02-anatomy/how-agents-work' },
            { text: 'Human-Agent Collaboration Modes', link: '/02-anatomy/human-agent-collaboration-modes' },
            { text: 'Context Management', link: '/en/02-anatomy/context-management' },
          ],
        },
        {
          text: 'Pilot — 中文',
          items: [
            { text: '编程智能体的工作原理', link: '/zh-cn/02-anatomy/how-agents-work' },
            { text: '人机协作模式：从探索到可验证交付', link: '/zh-cn/02-anatomy/human-agent-collaboration-modes' },
            { text: '上下文管理', link: '/zh-cn/02-anatomy/context-management' },
          ],
        },
      ],
      outline: { level: [2, 3] },
    },
  })
)
