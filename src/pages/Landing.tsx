import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CHAPTERS } from '../data/chapters'
import { DIAGRAMS } from '../diagrams/registry'
import { GLOSSARY } from '../data/glossary'
import { CASE_STUDIES } from '../data/caseStudies'
import { useProgress } from '../context/ProgressContext'
import { NetworkHero, HERO_LEGEND, KIND_COLOR } from '../components/NetworkHero'
import { ACCENTS, Eyebrow, Reveal } from '../components/ui'

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Circle
  return <Cmp className={className} />
}

export default function Landing() {
  const navigate = useNavigate()
  const { isRead, lastVisited, percentComplete, readChapters } = useProgress()

  const continueChapter =
    CHAPTERS.find((c) => lastVisited === `/chapter/${c.slug}`) ??
    CHAPTERS.find((c) => !isRead(c.number)) ??
    CHAPTERS[0]

  const stats = [
    { label: 'Chapters', value: '9', icon: 'BookOpen' },
    { label: 'Interactive diagrams', value: String(DIAGRAMS.length), icon: 'FlaskConical' },
    { label: 'Glossary terms', value: `${GLOSSARY.length}+`, icon: 'BookA' },
    { label: 'Case studies', value: String(CASE_STUDIES.length), icon: 'FileSearch' },
  ]

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-hairline">
        <NetworkHero />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
              <Icons.Sparkles className="h-3.5 w-3.5" />
              A Visual Journey Through Cybersecurity
            </div>
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              CYBER<span className="accent-gradient-text">ATLAS</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium text-ink/90">
              Understand the threats. Master the defenses. Build resilience.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Explore nine essential chapters covering cybersecurity fundamentals, technical threats, human
              vulnerabilities, organizational risk, incident response, and internationally recognized security
              frameworks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={`/chapter/${continueChapter.slug}`} className="btn-primary h-11 px-5">
                <Icons.PlayCircle className="h-5 w-5" />
                {percentComplete > 0 ? 'Continue reading' : 'Start the course'}
                <span className="ml-1 opacity-70">· {continueChapter.title}</span>
              </Link>
              <Link to="/lab" className="btn-ghost h-11 px-5">
                <Icons.FlaskConical className="h-5 w-5" />
                Explore the Visual Lab
              </Link>
              <Link to="/present" className="btn-ghost h-11 px-5">
                <Icons.Presentation className="h-5 w-5" />
                Presentation Mode
              </Link>
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-4">
              {HERO_LEGEND.map((l) => (
                <div key={l.kind} className="flex items-center gap-2 text-xs text-muted">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: KIND_COLOR[l.kind] }} />
                  {l.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-hairline bg-surface/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-hairline/50 px-6 sm:grid-cols-4 lg:px-10">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 bg-canvas px-2 py-6 sm:justify-center">
              <Icon name={s.icon} className="h-5 w-5 text-cyan" />
              <div>
                <div className="text-2xl font-extrabold text-ink">{s.value}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER CARDS */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <Reveal>
          <Eyebrow>The learning journey</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Nine chapters, one complete picture</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Each chapter blends clear explanations, real-world examples and interactive diagrams — move through them in
            order, or jump straight to a topic.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((ch, i) => {
            const read = isRead(ch.number)
            const accent = ACCENTS[ch.accent]
            return (
              <Reveal key={ch.slug} delay={i * 0.04}>
                <button
                  onClick={() => navigate(`/chapter/${ch.slug}`)}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-hairline bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-cyan/40 hover:shadow-glow"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                    style={{ background: accent }}
                  />
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-extrabold ring-1"
                      style={{ color: accent, background: `${accent}14`, boxShadow: `inset 0 0 0 1px ${accent}44` }}
                    >
                      {String(ch.number).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-2">
                      {read && (
                        <span className="flex items-center gap-1 text-xs font-medium text-teal">
                          <Icons.CheckCircle2 className="h-3.5 w-3.5" /> Read
                        </span>
                      )}
                      <Icon name={ch.icon} className="h-5 w-5 text-muted" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{ch.title}</h3>
                  <p className="mt-1 flex-1 text-sm leading-6 text-muted">{ch.summary}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Icons.Clock className="h-3.5 w-3.5" /> {ch.minutes} min read
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icons.FlaskConical className="h-3.5 w-3.5" /> {ch.diagramIds.length} diagrams
                    </span>
                    <span className="flex items-center gap-1 font-medium text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                      Open <Icons.ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* JOURNEY STRIP */}
      <section className="border-t border-hairline bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
          <Reveal>
            <Eyebrow color="#A78BFA">How to use CYBERATLAS</Eyebrow>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Study, explore, then present</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: 'BookOpen', title: 'Read the chapters', body: 'Clear explanations with definitions, scenarios and common misconceptions untangled.', to: `/chapter/${CHAPTERS[0].slug}`, cta: 'Open Chapter 01' },
              { icon: 'FlaskConical', title: 'Play with the diagrams', body: 'All 24 interactive visualisations gathered in one Visual Lab, organised by theme.', to: '/lab', cta: 'Open the Lab' },
              { icon: 'Presentation', title: 'Present with confidence', body: 'A ready-made 15–20 minute slide deck with speaker notes and embedded diagrams.', to: '/present', cta: 'Launch slides' },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <Link
                  to={step.to}
                  className="group flex h-full flex-col rounded-2xl border border-hairline bg-card p-6 transition-all hover:border-violet/40 hover:shadow-glow-violet"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 text-violet ring-1 ring-violet/30">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-1 flex-1 text-sm leading-6 text-muted">{step.body}</p>
                  <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-violet">
                    {step.cta} <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {readChapters.length > 0 && (
            <Reveal>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan/30 bg-cyan/5 p-5">
                <div>
                  <p className="text-sm font-semibold text-ink">You’ve completed {readChapters.length} of 9 chapters</p>
                  <p className="text-sm text-muted">Pick up where you left off in {continueChapter.title}.</p>
                </div>
                <Link to={`/chapter/${continueChapter.slug}`} className="btn-primary">
                  Continue <Icons.ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <footer className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-xs text-muted lg:px-10">
          CYBERATLAS — an independent educational project based on <em>Cyber Security: Essential Principles to Secure
          Your Organisation</em>. Built for study and presentation; not legal or professional security advice.
        </div>
      </footer>
    </div>
  )
}
