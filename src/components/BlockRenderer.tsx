import { Suspense } from 'react'
import { Info, Lightbulb, AlertTriangle, ShieldAlert, BookOpen } from 'lucide-react'
import type { ContentBlock } from '../data/types'
import { DIAGRAM_MAP } from '../diagrams/registry'
import { DiagramLoading } from './DiagramShell'

const CALLOUT = {
  info: { icon: Info, color: '#57D8ED', label: 'Note' },
  tip: { icon: Lightbulb, color: '#5FE0BE', label: 'In practice' },
  warning: { icon: AlertTriangle, color: '#F4BE62', label: 'Watch out' },
  danger: { icon: ShieldAlert, color: '#FB7185', label: 'Risk' },
  textbook: { icon: BookOpen, color: '#A78BFA', label: 'From the textbook' },
} as const

export function DiagramById({ id }: { id: keyof typeof DIAGRAM_MAP }) {
  const meta = DIAGRAM_MAP[id]
  if (!meta) return null
  const Cmp = meta.component
  return (
    <Suspense fallback={<DiagramLoading />}>
      <Cmp />
    </Suspense>
  )
}

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'paragraph':
            return (
              <p key={i} className="text-[15px] leading-7 text-muted [&>strong]:font-semibold [&>strong]:text-ink"
                 dangerouslySetInnerHTML={{ __html: inlineBold(block.text) }} />
            )
          case 'heading':
            return (
              <h3 key={i} className="pt-2 text-lg font-bold tracking-tight text-ink">
                {block.text}
              </h3>
            )
          case 'list':
            return block.ordered ? (
              <ol key={i} className="ml-5 list-decimal space-y-1.5 text-[15px] leading-7 text-muted marker:text-cyan">
                {block.items.map((it, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: inlineBold(it) }} />
                ))}
              </ol>
            ) : (
              <ul key={i} className="space-y-1.5 text-[15px] leading-7 text-muted">
                {block.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70" />
                    <span dangerouslySetInnerHTML={{ __html: inlineBold(it) }} />
                  </li>
                ))}
              </ul>
            )
          case 'callout': {
            const c = CALLOUT[block.tone]
            const Ico = c.icon
            return (
              <div
                key={i}
                className="flex gap-3 rounded-xl border p-4"
                style={{ borderColor: `${c.color}44`, background: `${c.color}0d` }}
              >
                <Ico className="mt-0.5 h-5 w-5 shrink-0" style={{ color: c.color }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: c.color }}>
                    {block.title ?? c.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink/90" dangerouslySetInnerHTML={{ __html: inlineBold(block.text) }} />
                </div>
              </div>
            )
          }
          case 'definition':
            return (
              <div key={i} className="rounded-xl border border-hairline bg-surface/50 p-4">
                <p className="text-sm font-bold text-cyan">{block.term}</p>
                <p className="mt-1 text-sm leading-6 text-muted" dangerouslySetInnerHTML={{ __html: inlineBold(block.definition) }} />
                {block.example && (
                  <p className="mt-2 text-sm leading-6 text-ink/80">
                    <span className="font-semibold text-teal">Example: </span>
                    {block.example}
                  </p>
                )}
              </div>
            )
          case 'compare':
            return (
              <div key={i} className="grid gap-3 sm:grid-cols-2">
                {[block.left, block.right].map((col, k) => (
                  <div key={k} className="rounded-xl border border-hairline bg-surface/50 p-4">
                    <p className="mb-2 text-sm font-bold" style={{ color: k === 0 ? '#FB7185' : '#5FE0BE' }}>
                      {col.title}
                    </p>
                    <ul className="space-y-1.5 text-sm leading-6 text-muted">
                      {col.points.map((p, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: k === 0 ? '#FB7185' : '#5FE0BE' }} />
                          <span dangerouslySetInnerHTML={{ __html: inlineBold(p) }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )
          case 'diagram':
            return (
              <div key={i} className="py-2">
                <DiagramById id={block.id} />
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

/** Minimal, safe **bold** -> <strong> conversion for authored content. */
function inlineBold(text: string): string {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}
