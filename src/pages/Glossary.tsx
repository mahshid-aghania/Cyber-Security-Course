import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, BookA, ArrowUpRight, X } from 'lucide-react'
import { GLOSSARY } from '../data/glossary'
import { chapterByNumber } from '../data/chapters'
import { Eyebrow, Reveal } from '../components/ui'

export default function Glossary() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const termRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const focusTerm = params.get('term')

  const sorted = useMemo(() => [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term)), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q) || t.example.toLowerCase().includes(q),
    )
  }, [query, sorted])

  // group by first letter
  const groups = useMemo(() => {
    const map = new Map<string, typeof GLOSSARY>()
    for (const t of filtered) {
      const letter = t.term[0].toUpperCase()
      if (!map.has(letter)) map.set(letter, [])
      map.get(letter)!.push(t)
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [filtered])

  useEffect(() => {
    if (focusTerm && termRefs.current[focusTerm]) {
      termRefs.current[focusTerm]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [focusTerm, filtered])

  const goToTerm = (term: string) => {
    setQuery('')
    setParams({ term })
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
      <Reveal>
        <Eyebrow>Reference</Eyebrow>
        <h1 className="mt-2 flex items-center gap-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          <BookA className="h-9 w-9 text-cyan" /> Glossary
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          {GLOSSARY.length} cybersecurity terms with plain-English definitions, a short example, the chapter they
          appear in, and links to related concepts.
        </p>
      </Reveal>

      <div className="sticky top-16 z-30 -mx-6 mt-8 bg-canvas/80 px-6 py-3 backdrop-blur-xl lg:-mx-10 lg:px-10">
        <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface/60 px-4">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter terms…"
            className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
            aria-label="Filter glossary terms"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear" className="text-muted hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 && <p className="mt-10 text-center text-muted">No terms match “{query}”.</p>}

      <div className="mt-8 space-y-10">
        {groups.map(([letter, terms]) => (
          <section key={letter}>
            <h2 className="mb-3 text-sm font-extrabold text-cyan">{letter}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {terms.map((t) => {
                const ch = chapterByNumber(t.chapter)
                const focused = focusTerm === t.term
                return (
                  <div
                    key={t.term}
                    ref={(el) => (termRefs.current[t.term] = el)}
                    className={`rounded-2xl border bg-card p-5 transition-all ${focused ? 'border-cyan/60 shadow-glow' : 'border-hairline'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-ink">{t.term}</h3>
                      {ch && (
                        <Link to={`/chapter/${ch.slug}`} className="chip shrink-0 hover:text-ink" title={`Chapter ${ch.number}`}>
                          Ch {t.chapter}
                        </Link>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{t.definition}</p>
                    <p className="mt-2 text-sm leading-6 text-ink/80">
                      <span className="font-semibold text-teal">Example: </span>
                      {t.example}
                    </p>
                    {t.related.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-hairline pt-3">
                        {t.related.map((r) => (
                          <button
                            key={r}
                            onClick={() => goToTerm(r)}
                            className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-xs text-muted transition-colors hover:text-cyan"
                          >
                            {r} <ArrowUpRight className="h-3 w-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
