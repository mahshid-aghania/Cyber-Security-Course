import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { CASE_STUDIES, CASE_STUDY_BY_SLUG } from '../data/caseStudies'
import { chapterByNumber } from '../data/chapters'
import { ACCENTS, Eyebrow, Reveal } from '../components/ui'
import type { CaseStudy } from '../data/types'

export default function CaseStudies() {
  const { slug } = useParams()
  const study = slug ? CASE_STUDY_BY_SLUG[slug] : undefined

  if (study) return <CaseStudyDetail study={study} />

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
      <Reveal>
        <Eyebrow color="#FB7185">Real-world incidents</Eyebrow>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">Case Studies</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Five landmark incidents that shaped how organisations think about cybersecurity. Each is reconstructed from
          widely reported, verified details — with simplified explanations clearly labelled.
        </p>
      </Reveal>

      {CASE_STUDIES.length === 0 && (
        <p className="mt-10 rounded-xl border border-dashed border-hairline p-8 text-center text-muted">
          Case studies are being prepared.
        </p>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {CASE_STUDIES.map((c, i) => {
          const accent = ACCENTS[c.accent]
          return (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                to={`/case-studies/${c.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-cyan/40 hover:shadow-glow"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl" style={{ background: accent }} />
                <div className="relative flex items-center justify-between">
                  <span className="text-5xl font-extrabold tracking-tight" style={{ color: accent }}>{c.year}</span>
                  <Icons.FileSearch className="h-6 w-6 text-muted" />
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-ink">{c.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{c.focus}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {c.relatedChapters.map((n) => (
                    <span key={n} className="chip">Ch {n}</span>
                  ))}
                  <span className="ml-auto flex items-center gap-1 text-sm font-medium text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                    Read <Icons.ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const accent = ACCENTS[study.accent]
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/case-studies" className="hover:text-ink">Case Studies</Link>
        <Icons.ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink">{study.name}</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-hairline bg-card p-8 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl" style={{ background: accent }} />
        <div className="relative">
          <span className="text-sm font-bold" style={{ color: accent }}>{study.year}</span>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{study.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{study.focus}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {study.relatedChapters.map((n) => {
              const ch = chapterByNumber(n)
              return ch ? (
                <Link key={n} to={`/chapter/${ch.slug}`} className="chip hover:border-cyan/40 hover:text-ink">
                  <Icons.BookOpen className="h-3.5 w-3.5" /> Ch {n}: {ch.title}
                </Link>
              ) : null
            })}
          </div>
        </div>
      </header>

      <div className="mt-8 space-y-8">
        <Section title="Background" icon="Info">
          <p className="text-[15px] leading-7 text-muted">{study.background}</p>
        </Section>

        {/* Interactive timeline */}
        <section className="rounded-2xl border border-hairline bg-card p-6">
          <div className="mb-5 flex items-center gap-2.5">
            <Icons.GitCommitHorizontal className="h-5 w-5" style={{ color: accent }} />
            <h2 className="text-xl font-extrabold text-ink">Incident timeline</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {study.timeline.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex-1 rounded-lg border px-2 py-2 text-left transition-colors ${
                  i === activeStep ? 'text-ink' : 'border-hairline text-muted hover:text-ink'
                }`}
                style={i === activeStep ? { borderColor: `${accent}88`, background: `${accent}14` } : undefined}
              >
                <span className="block text-[10px] font-mono" style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="block text-xs font-semibold leading-tight">{step.label}</span>
              </button>
            ))}
          </div>
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-hairline bg-surface/50 p-4"
          >
            <p className="text-sm font-bold text-ink">{study.timeline[activeStep].label}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{study.timeline[activeStep].detail}</p>
          </motion.div>
        </section>

        <div className="grid gap-5 sm:grid-cols-2">
          <Section title="Attack method" icon="Crosshair">
            <List items={study.attackMethod} dot="#FB7185" />
          </Section>
          <Section title="Key weaknesses" icon="Unlink">
            <List items={study.weaknesses} dot="#F4BE62" />
          </Section>
        </div>

        <Section title="What happened" icon="Activity">
          <p className="text-[15px] leading-7 text-muted">{study.whatHappened}</p>
        </Section>

        <Section title="Business impact" icon="TrendingDown">
          <List items={study.businessImpact} dot="#FB7185" />
        </Section>

        <section className="rounded-2xl border p-6" style={{ borderColor: `${accent}44`, background: `${accent}0d` }}>
          <div className="mb-3 flex items-center gap-2.5">
            <Icons.GraduationCap className="h-5 w-5" style={{ color: accent }} />
            <h2 className="text-xl font-extrabold text-ink">Lessons learned</h2>
          </div>
          <List items={study.lessons} dot={accent} />
        </section>
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/case-studies" className="btn-ghost">
          <Icons.ArrowLeft className="h-4 w-4" /> All case studies
        </Link>
      </div>
    </div>
  )
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  const Ico = (Icons as any)[icon] ?? Icons.Info
  return (
    <section className="rounded-2xl border border-hairline bg-card p-6">
      <div className="mb-3 flex items-center gap-2.5">
        <Ico className="h-5 w-5 text-cyan" />
        <h2 className="text-xl font-extrabold text-ink">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function List({ items, dot }: { items: string[]; dot: string }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-6 text-muted">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: dot }} />
          {it}
        </li>
      ))}
    </ul>
  )
}
