import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, FileText, Hash, BookA, FlaskConical, FileSearch, CornerDownLeft } from 'lucide-react'
import { searchEntries, type SearchEntry, type SearchKind } from '../data/searchIndex'

const KIND_ICON: Record<SearchKind, typeof FileText> = {
  chapter: FileText,
  section: Hash,
  glossary: BookA,
  diagram: FlaskConical,
  'case-study': FileSearch,
}

const KIND_LABEL: Record<SearchKind, string> = {
  chapter: 'Chapter',
  section: 'Section',
  glossary: 'Glossary',
  diagram: 'Diagram',
  'case-study': 'Case study',
}

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => (query ? searchEntries(query, 24) : []), [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      const t = setTimeout(() => inputRef.current?.focus(), 40)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const go = (e: SearchEntry) => {
    onClose()
    navigate(e.path)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      go(results[active])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search CYBERATLAS"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-hairline bg-card shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-hairline px-4">
              <Search className="h-5 w-5 shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search chapters, concepts, diagrams, glossary…"
                className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
                aria-label="Search query"
              />
              <kbd className="hidden rounded border border-hairline px-1.5 py-0.5 text-[10px] text-muted sm:block">ESC</kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {query && results.length === 0 && (
                <p className="px-3 py-10 text-center text-sm text-muted">No matches for “{query}”.</p>
              )}
              {!query && (
                <p className="px-3 py-10 text-center text-sm text-muted">
                  Start typing to search across all nine chapters, 24 diagrams, the glossary and case studies.
                </p>
              )}
              {results.map((r, i) => {
                const Ico = KIND_ICON[r.kind]
                return (
                  <button
                    key={`${r.path}-${i}`}
                    onClick={() => go(r)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      i === active ? 'bg-surface' : 'hover:bg-surface/60'
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface ring-1 ring-hairline">
                      <Ico className="h-4 w-4 text-cyan" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{r.title}</span>
                      <span className="block truncate text-xs text-muted">{r.subtitle}</span>
                    </span>
                    <span className="chip shrink-0">{KIND_LABEL[r.kind]}</span>
                    {i === active && <CornerDownLeft className="h-4 w-4 shrink-0 text-muted" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
