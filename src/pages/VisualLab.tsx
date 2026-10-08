import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { DIAGRAMS, DIAGRAM_CATEGORIES } from '../diagrams/registry'
import type { DiagramCategory } from '../data/types'
import { Eyebrow, Reveal } from '../components/ui'
import { DiagramLoading } from '../components/DiagramShell'

const CATEGORY_ICON: Record<DiagramCategory, string> = {
  Foundations: 'Boxes',
  Threats: 'Bug',
  'Secure Design': 'PencilRuler',
  'Physical & Third-Party': 'Building2',
  'Risk Management': 'Gauge',
  'Incident Management': 'Siren',
  Standards: 'Award',
}

export default function VisualLab() {
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState<DiagramCategory | 'all'>('all')
  const refs = useRef<Record<string, HTMLDivElement | null>>({})

  const focusId = params.get('d')

  useEffect(() => {
    if (focusId && refs.current[focusId]) {
      refs.current[focusId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [focusId])

  const categories = filter === 'all' ? DIAGRAM_CATEGORIES : [filter]

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
      <Reveal>
        <Eyebrow>Cybersecurity Visual Lab</Eyebrow>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Every interactive diagram, in one place
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          All {DIAGRAMS.length} interactive visualisations from across the course, grouped by theme. Click, drag,
          toggle and explore — each one is designed to make a concept click.
        </p>
      </Reveal>

      {/* Filter */}
      <div className="sticky top-16 z-30 -mx-6 mt-8 border-y border-hairline bg-canvas/80 px-6 py-3 backdrop-blur-xl lg:-mx-10 lg:px-10">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')} label={`All (${DIAGRAMS.length})`} icon="LayoutGrid" />
          {DIAGRAM_CATEGORIES.map((cat) => {
            const count = DIAGRAMS.filter((d) => d.category === cat).length
            return (
              <FilterChip
                key={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
                label={`${cat} (${count})`}
                icon={CATEGORY_ICON[cat]}
              />
            )
          })}
        </div>
      </div>

      <div className="mt-10 space-y-16">
        {categories.map((cat) => {
          const items = DIAGRAMS.filter((d) => d.category === cat)
          if (items.length === 0) return null
          return (
            <section key={cat}>
              <div className="mb-6 flex items-center gap-2.5">
                {(() => {
                  const Ico = (Icons as any)[CATEGORY_ICON[cat]] ?? Icons.Circle
                  return <Ico className="h-5 w-5 text-cyan" />
                })()}
                <h2 className="text-xl font-extrabold tracking-tight text-ink">{cat}</h2>
                <span className="chip">{items.length}</span>
              </div>
              <div className="space-y-8">
                {items.map((d) => {
                  const Cmp = d.component
                  return (
                    <div
                      key={d.id}
                      id={d.id}
                      ref={(el) => (refs.current[d.id] = el)}
                      className={`scroll-mt-32 rounded-2xl transition-shadow ${focusId === d.id ? 'ring-2 ring-cyan/50' : ''}`}
                    >
                      <Suspense fallback={<DiagramLoading />}>
                        <Cmp />
                      </Suspense>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {focusId && (
        <button
          onClick={() => setParams({})}
          className="btn-ghost mt-10"
        >
          <Icons.X className="h-4 w-4" /> Clear focus
        </button>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: string }) {
  const Ico = (Icons as any)[icon] ?? Icons.Circle
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-hairline text-muted hover:text-ink'
      }`}
    >
      <Ico className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}
