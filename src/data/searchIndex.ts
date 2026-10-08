import { CHAPTERS } from './chapters'
import { GLOSSARY } from './glossary'
import { CASE_STUDIES } from './caseStudies'
import { DIAGRAMS } from '../diagrams/registry'

export type SearchKind = 'chapter' | 'section' | 'glossary' | 'diagram' | 'case-study'

export interface SearchEntry {
  kind: SearchKind
  title: string
  subtitle: string
  path: string
  keywords: string
}

function textFromBlocks(blocks: { kind: string; text?: string; items?: string[] }[]): string {
  return blocks
    .map((b) => b.text ?? (b.items ? b.items.join(' ') : ''))
    .join(' ')
}

let cached: SearchEntry[] | null = null

export function buildSearchIndex(): SearchEntry[] {
  if (cached) return cached
  const entries: SearchEntry[] = []

  for (const ch of CHAPTERS) {
    entries.push({
      kind: 'chapter',
      title: `${String(ch.number).padStart(2, '0')} — ${ch.title}`,
      subtitle: ch.subtitle,
      path: `/chapter/${ch.slug}`,
      keywords: `${ch.title} ${ch.subtitle} ${ch.summary} ${ch.objectives.join(' ')} ${ch.takeaways.join(' ')}`.toLowerCase(),
    })
    for (const sec of ch.sections) {
      entries.push({
        kind: 'section',
        title: sec.title,
        subtitle: `Chapter ${ch.number} · ${ch.title}`,
        path: `/chapter/${ch.slug}#${sec.id}`,
        keywords: `${sec.title} ${textFromBlocks(sec.blocks)}`.toLowerCase(),
      })
    }
  }

  for (const g of GLOSSARY) {
    entries.push({
      kind: 'glossary',
      title: g.term,
      subtitle: g.definition,
      path: `/glossary?term=${encodeURIComponent(g.term)}`,
      keywords: `${g.term} ${g.definition} ${g.example}`.toLowerCase(),
    })
  }

  for (const d of DIAGRAMS) {
    entries.push({
      kind: 'diagram',
      title: d.title,
      subtitle: `Interactive diagram · ${d.category}`,
      path: `/lab?d=${d.id}`,
      keywords: `${d.title} ${d.blurb} ${d.category}`.toLowerCase(),
    })
  }

  for (const c of CASE_STUDIES) {
    entries.push({
      kind: 'case-study',
      title: `${c.name} (${c.year})`,
      subtitle: c.focus,
      path: `/case-studies/${c.slug}`,
      keywords: `${c.name} ${c.focus} ${c.background} ${c.lessons.join(' ')}`.toLowerCase(),
    })
  }

  cached = entries
  return entries
}

export function searchEntries(query: string, limit = 20): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)
  const index = buildSearchIndex()
  const scored = index
    .map((e) => {
      let score = 0
      for (const t of terms) {
        if (e.title.toLowerCase().includes(t)) score += 5
        if (e.keywords.includes(t)) score += 1
      }
      // Exact / prefix title boost
      if (e.title.toLowerCase().startsWith(q)) score += 6
      return { e, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
  return scored.map((x) => x.e)
}
