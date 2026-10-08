import { RotateCcw, Info, Bookmark } from 'lucide-react'
import type { ReactNode } from 'react'
import { useProgress } from '../context/ProgressContext'

/**
 * The shared wrapper every interactive diagram renders inside. It provides a
 * consistent, accessible frame: title, description, an optional controls
 * toolbar, an optional reset button, a stage area for the visualisation, and a
 * footnote for "illustrative, not exact" disclaimers.
 *
 * Diagrams stay fully self-contained — they only need to render their visual +
 * controls and hand them to this shell.
 */
export function DiagramShell({
  id,
  title,
  description,
  controls,
  onReset,
  footnote,
  children,
  bare = false,
}: {
  id: string
  title: string
  description?: string
  controls?: ReactNode
  onReset?: () => void
  footnote?: string
  children: ReactNode
  /** When true, skip the outer card chrome (used when embedded in slides). */
  bare?: boolean
}) {
  const { isBookmarked, toggleBookmark } = useProgress()
  const bmKey = `diagram:${id}`
  const marked = isBookmarked(bmKey)

  const inner = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">{title}</h3>
          {description && <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{description}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!bare && (
            <button
              onClick={() => toggleBookmark(bmKey)}
              aria-pressed={marked}
              aria-label={marked ? 'Remove bookmark' : 'Bookmark this diagram'}
              title={marked ? 'Bookmarked' : 'Bookmark'}
              className="btn-ghost h-9 w-9 !px-0"
            >
              <Bookmark className="h-4 w-4" fill={marked ? '#57D8ED' : 'none'} stroke={marked ? '#57D8ED' : 'currentColor'} />
            </button>
          )}
          {onReset && (
            <button onClick={onReset} className="btn-ghost h-9" aria-label="Reset diagram">
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {controls && <div className="mt-4 flex flex-wrap items-center gap-2">{controls}</div>}

      <div className="mt-5">{children}</div>

      {footnote && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-hairline bg-surface/50 px-3 py-2 text-xs leading-5 text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" />
          <span>{footnote}</span>
        </p>
      )}
    </>
  )

  if (bare) return <div className="w-full">{inner}</div>

  return (
    <section
      aria-label={title}
      className="card relative overflow-hidden p-5 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      {inner}
    </section>
  )
}

/** Fallback shown while a lazily-loaded diagram chunk is fetched. */
export function DiagramLoading() {
  return (
    <section className="card flex min-h-[260px] items-center justify-center p-6" aria-busy="true" aria-label="Loading diagram">
      <div className="flex flex-col items-center gap-3 text-muted">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-hairline border-t-cyan" />
        <span className="text-xs">Loading interactive diagram…</span>
      </div>
    </section>
  )
}

/** A labelled control group used inside a diagram's controls toolbar. */
export function ControlGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      {children}
    </div>
  )
}
