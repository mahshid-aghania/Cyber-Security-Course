import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CHAPTER_BY_SLUG, chapterByNumber } from '../data/chapters'
import { CASE_STUDY_BY_SLUG } from '../data/caseStudies'
import { useProgress } from '../context/ProgressContext'
import { BlockRenderer } from '../components/BlockRenderer'
import { ACCENTS, Eyebrow, Reveal } from '../components/ui'

function Icon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const Cmp = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Circle
  return <Cmp className={className} style={style} />
}

export default function ChapterPage() {
  const { slug } = useParams()
  const chapter = slug ? CHAPTER_BY_SLUG[slug] : undefined
  const { isRead, toggleRead, isBookmarked, toggleBookmark } = useProgress()
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    if (!chapter) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    chapter.sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [chapter])

  if (!chapter) return <Navigate to="/" replace />

  const accent = ACCENTS[chapter.accent]
  const read = isRead(chapter.number)
  const bmKey = `chapter:${chapter.slug}`
  const marked = isBookmarked(bmKey)
  const prev = chapterByNumber(chapter.number - 1)
  const next = chapterByNumber(chapter.number + 1)
  const relatedCases = (chapter.relatedCaseStudies ?? []).map((s) => CASE_STUDY_BY_SLUG[s]).filter(Boolean)

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink">Home</Link>
        <Icons.ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink">Chapter {String(chapter.number).padStart(2, '0')}</span>
      </nav>

      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl border border-hairline bg-card p-7 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl" style={{ background: accent }} />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-extrabold ring-1" style={{ color: accent, background: `${accent}14`, boxShadow: `inset 0 0 0 1px ${accent}55` }}>
              {String(chapter.number).padStart(2, '0')}
            </span>
            <Icon name={chapter.icon} className="h-6 w-6" style={{ color: accent }} />
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{chapter.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{chapter.subtitle}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={() => toggleRead(chapter.number)} className={read ? 'btn-primary' : 'btn-ghost'}>
              {read ? <Icons.CheckCircle2 className="h-4 w-4" /> : <Icons.Circle className="h-4 w-4" />}
              {read ? 'Marked as read' : 'Mark as read'}
            </button>
            <button onClick={() => toggleBookmark(bmKey)} className="btn-ghost" aria-pressed={marked}>
              <Icons.Bookmark className="h-4 w-4" fill={marked ? accent : 'none'} stroke={marked ? accent : 'currentColor'} />
              {marked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <span className="chip"><Icons.Clock className="h-3.5 w-3.5" /> {chapter.minutes} min</span>
            <span className="chip"><Icons.FlaskConical className="h-3.5 w-3.5" /> {chapter.diagramIds.length} diagrams</span>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_240px]">
        {/* Main column */}
        <div className="min-w-0 order-2 lg:order-1">
          {/* Objectives */}
          <Reveal>
            <section className="rounded-2xl border border-hairline bg-surface/40 p-6">
              <Eyebrow color={accent}>Learning objectives</Eyebrow>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {chapter.objectives.map((o, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-6 text-muted">
                    <Icons.Target className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Sections */}
          <div className="mt-10 space-y-14">
            {chapter.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-6 w-1 rounded-full" style={{ background: accent }} />
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink">{section.title}</h2>
                </div>
                <BlockRenderer blocks={section.blocks} />
              </section>
            ))}
          </div>

          {/* Misconceptions */}
          {chapter.misconceptions.length > 0 && (
            <section id="misconceptions" className="mt-14 scroll-mt-24">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-warn" />
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">Common misconceptions</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {chapter.misconceptions.map((m, i) => (
                  <div key={i} className="rounded-2xl border border-hairline bg-card p-5">
                    <p className="flex items-start gap-2 text-sm font-semibold text-danger">
                      <Icons.XCircle className="mt-0.5 h-4 w-4 shrink-0" /> Myth
                    </p>
                    <p className="mt-1 text-sm leading-6 text-ink/90">{m.myth}</p>
                    <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-teal">
                      <Icons.CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> Reality
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">{m.reality}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Takeaways */}
          <section id="takeaways" className="mt-14 scroll-mt-24">
            <div className="rounded-2xl border p-6" style={{ borderColor: `${accent}44`, background: `${accent}0d` }}>
              <Eyebrow color={accent}>Key takeaways</Eyebrow>
              <ul className="mt-3 space-y-2.5">
                {chapter.takeaways.map((t, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink/90">
                    <Icons.Sparkle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Presentation summary */}
          {chapter.presentationSummary.length > 0 && (
            <section id="presentation-summary" className="mt-8 scroll-mt-24">
              <details className="group rounded-2xl border border-hairline bg-surface/40 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink">
                  <span className="flex items-center gap-2"><Icons.Presentation className="h-4 w-4 text-violet" /> Concise presentation summary</span>
                  <Icons.ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                  {chapter.presentationSummary.map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-6 text-muted">
                      <span className="font-mono text-xs text-violet">{String(i + 1).padStart(2, '0')}</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </details>
            </section>
          )}

          {/* Related case studies */}
          {relatedCases.length > 0 && (
            <section className="mt-10">
              <Eyebrow>Related case studies</Eyebrow>
              <div className="mt-3 flex flex-wrap gap-3">
                {relatedCases.map((c) => (
                  <Link key={c.slug} to={`/case-studies/${c.slug}`} className="chip hover:border-cyan/40 hover:text-ink">
                    <Icons.FileSearch className="h-3.5 w-3.5" /> {c.name} ({c.year})
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Prev / next */}
          <nav className="mt-14 grid gap-4 border-t border-hairline pt-8 sm:grid-cols-2">
            {prev ? (
              <Link to={`/chapter/${prev.slug}`} className="group flex items-center gap-3 rounded-xl border border-hairline bg-card p-4 transition-colors hover:border-cyan/40">
                <Icons.ArrowLeft className="h-5 w-5 text-muted" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Previous</span>
                  <span className="block truncate text-sm font-semibold text-ink">{prev.title}</span>
                </span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/chapter/${next.slug}`} className="group flex items-center justify-end gap-3 rounded-xl border border-hairline bg-card p-4 text-right transition-colors hover:border-cyan/40">
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Next</span>
                  <span className="block truncate text-sm font-semibold text-ink">{next.title}</span>
                </span>
                <Icons.ArrowRight className="h-5 w-5 text-muted" />
              </Link>
            ) : (
              <Link to="/lab" className="group flex items-center justify-end gap-3 rounded-xl border border-hairline bg-card p-4 text-right transition-colors hover:border-cyan/40">
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Next up</span>
                  <span className="block truncate text-sm font-semibold text-ink">Explore the Visual Lab</span>
                </span>
                <Icons.FlaskConical className="h-5 w-5 text-muted" />
              </Link>
            )}
          </nav>
        </div>

        {/* TOC */}
        <aside className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-24">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted">On this page</p>
            <nav className="space-y-0.5 border-l border-hairline">
              {chapter.sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`-ml-px block border-l-2 py-1.5 pl-3 text-sm transition-colors ${
                    activeSection === s.id ? 'text-ink' : 'border-transparent text-muted hover:text-ink'
                  }`}
                  style={activeSection === s.id ? { borderColor: accent } : undefined}
                >
                  {s.title}
                </a>
              ))}
              <a href="#takeaways" className="-ml-px block border-l-2 border-transparent py-1.5 pl-3 text-sm text-muted hover:text-ink">
                Key takeaways
              </a>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  )
}
