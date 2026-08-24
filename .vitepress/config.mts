import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

// VitePress book app for Coding with Agents.
// Renders the book/ tree from its canonical location. Output keeps .html file
// names, so every existing Honkit-era URL (/en/..., /zh-cn/...) stays valid.
// README.md pages are rewritten to index.html so /en/ and /en/<section>/ keep
// serving as directory indexes, exactly like Honkit did.

const read = (p) => fs.readFileSync(new URL(p, import.meta.url), 'utf8')
const bookManifest = yaml.load(read('../collections/book.yml'))
const seriesManifest = yaml.load(read('../collections/series.yml'))

// --- content id -> per-locale public URL (file-based, .html) -----------------
const urlOf = (sourcePath) => {
  const rel = sourcePath.replace(/^book\//, '').replace(/\.md$/, '')
  if (rel.endsWith('/README')) return `/${rel.replace(/\/README$/, '')}/`
  return `/${rel}.html`
}
const idToPath = {}
for (const item of [...bookManifest.items, ...seriesManifest.items]) {
  if (idToPath[item.id]) continue
  idToPath[item.id] = {
    en: item.source?.en ? urlOf(item.source.en) : null,
    'zh-CN': item.source?.['zh-CN'] ? urlOf(item.source['zh-CN']) : null,
  }
}

// --- rewrites: README.md -> index.html (Honkit directory-index parity) -------
const rewrites = {}
function collectReadmes(dir, prefix = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue
    if (entry.name === '_book') continue
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name
    const sub = path.join(dir, entry.name)
    if (fs.existsSync(path.join(sub, 'README.md'))) {
      rewrites[`${rel}/README.md`] = `${rel}/index.md`
    }
    collectReadmes(sub, rel)
  }
}
collectReadmes(new URL('../book/en', import.meta.url).pathname, 'en')
rewrites['en/README.md'] = 'en/index.md'
collectReadmes(new URL('../book/zh-cn', import.meta.url).pathname, 'zh-cn')
rewrites['zh-cn/README.md'] = 'zh-cn/index.md'

// --- sidebar from the Honkit SUMMARY.md files --------------------------------
function summarySidebar(localeDir) {
  const text = read(`../book/${localeDir}/SUMMARY.md`)
  const lines = text.split(/\r?\n/)
  const groups = []
  let current = null
  const linkOf = (p) => {
    const rel = p.replace(/\.md$/, '').replace(/^\.\//, '')
    if (rel.endsWith('/README')) return `/${localeDir}/${rel.replace(/\/README$/, '')}/`
    return `/${localeDir}/${rel}.html`
  }
  for (const line of lines) {
    const heading = line.match(/^##\s+(.*)/)
    if (heading) {
      current = { text: heading[1].trim(), items: [] }
      groups.push(current)
      continue
    }
    const item = line.match(/^\s*\*\s+\[([^\]]+)\]\(([^)]+)\)/)
    if (!item || !current) continue
    const [, label, target] = item
    current.items.push({ text: label.trim(), link: linkOf(target) })
  }
  return groups.filter((g) => g.items.length > 0)
}

const sidebarEn = summarySidebar('en')
const sidebarZh = summarySidebar('zh-cn')

const contentLinkRe = /^content:([a-z0-9]+(-[a-z0-9]+)*)$/

export default withMermaid(
  defineConfig({
    title: 'Coding with Agents',
    description: 'A book on how software engineers work effectively in the age of AI coding agents.',
    base: '/Coding-with-Agents/',
    srcDir: 'book',
    ignoreDeadLinks: true, // chapters keep Honkit-style relative links
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
              child.attrSet('href', (isZh ? target['zh-CN'] : target.en) ?? target.en)
            }
          }
        })
      },
    },
    themeConfig: {
      siteTitle: 'Coding with Agents',
      search: { provider: 'local' },
      outline: { level: [2, 3] },
      nav: [
        { text: 'English', link: '/en/' },
        { text: '简体中文', link: '/zh-cn/' },
        { text: 'Repo', link: 'https://github.com/XinheLIU/Coding-with-Agents' },
      ],
      sidebar: {
        '/en/': sidebarEn,
        '/zh-cn/': sidebarZh,
      },
    },
  })
)
