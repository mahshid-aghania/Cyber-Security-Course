import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCw, ShieldCheck, ArrowRight, Repeat } from 'lucide-react'
import { DiagramShell } from '../components/DiagramShell'
import { accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

const PHASES = [
  'Requirements',
  'Design',
  'Development',
  'Testing',
  'Deployment',
  'Maintenance',
] as const

// Where a security activity attaches to each phase.
const SECURITY_AT_PHASE: Record<string, string> = {
  Requirements: 'Security requirements',
  Design: 'Threat modeling',
  Development: 'Secure coding',
  Testing: 'Security testing',
  Deployment: 'Secure config & release checks',
  Maintenance: 'Monitoring & patching',
}

// Agile sprint steps form a short repeating cycle.
const AGILE_STEPS = ['Plan', 'Build', 'Test', 'Review'] as const
const AGILE_SECURITY: Record<string, string> = {
  Plan: 'Threat modeling the sprint backlog',
  Build: 'Secure coding + SAST in CI',
  Test: 'Automated security tests (DAST)',
  Review: 'Continuous security review',
}

export default function WaterfallAgile() {
  const reduced = useReducedMotionPref()
  const [playing, setPlaying] = useState(false)
  const [waterfallStep, setWaterfallStep] = useState(-1) // -1 = none reached yet
  const [agileStep, setAgileStep] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setWaterfallStep((w) => (w < PHASES.length - 1 ? w + 1 : w)) // advances once through
      setAgileStep((a) => (a + 1) % AGILE_STEPS.length) // loops
    }, 1100)
    timer.current = id
    return () => window.clearInterval(id)
  }, [playing])

  // Stop the clock once waterfall completes, but keep agile loop running until paused.
  const reset = () => {
    setPlaying(false)
    setWaterfallStep(-1)
    setAgileStep(0)
  }

  const togglePlay = () => {
    if (!playing && waterfallStep >= PHASES.length - 1) {
      // restart from the top if already finished
      setWaterfallStep(-1)
      setAgileStep(0)
    }
    setPlaying((p) => !p)
  }

  const teal = accentHex('teal')
  const cyan = accentHex('cyan')
  const violet = accentHex('violet')

  return (
    <DiagramShell
      id="waterfall-agile"
      title="Waterfall vs. Agile"
      description="Two delivery models side by side. Waterfall runs the phases once as a straight line; Agile repeats short iterations. Press Play to watch both, and see where security activities integrate into each."
      onReset={reset}
      footnote="Illustrative, not exact: both models are simplified. Real projects mix practices, and 'security at every step' (DevSecOps / shift-left) can be applied to either approach rather than a single phase."
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={togglePlay}
            aria-pressed={playing}
            aria-label={playing ? 'Pause workflows' : 'Play workflows'}
            className="btn-primary h-9"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{playing ? 'Pause' : 'Play'}</span>
          </button>
          <button onClick={reset} aria-label="Restart workflows" className="btn-ghost h-9">
            <RotateCw className="h-4 w-4" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {/* ---------- WATERFALL ---------- */}
        <section className="rounded-2xl border border-hairline bg-surface/40 p-4" aria-label="Waterfall model">
          <header className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${cyan}1a`, color: cyan }}>
              <ArrowRight className="h-4 w-4" />
            </span>
            <div>
              <h4 className="text-sm font-bold text-ink">Waterfall</h4>
              <p className="text-xs text-muted">Linear — each phase completes before the next begins.</p>
            </div>
          </header>

          <ol className="relative space-y-2">
            {PHASES.map((phase, i) => {
              const reached = waterfallStep >= i
              const isCurrent = waterfallStep === i
              return (
                <li key={phase} className="relative">
                  <motion.div
                    animate={{
                      borderColor: reached ? `${cyan}aa` : 'rgb(var(--c-hairline))',
                      backgroundColor: reached ? `${cyan}12` : 'transparent',
                    }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                    className="flex items-center gap-3 rounded-xl border px-3 py-2"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: reached ? cyan : 'rgb(var(--c-card))',
                        color: reached ? '#04121a' : cyan,
                        border: `1px solid ${cyan}`,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-ink">{phase}</span>
                    {isCurrent && !reduced && (
                      <motion.span
                        className="h-2 w-2 rounded-full"
                        style={{ background: cyan }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                        aria-hidden
                      />
                    )}
                  </motion.div>
                  {/* Security annotation */}
                  <div
                    className="mt-1 ml-9 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium"
                    style={{ borderColor: `${teal}55`, color: teal, background: `${teal}10` }}
                  >
                    <ShieldCheck className="h-3 w-3" />
                    {SECURITY_AT_PHASE[phase]}
                  </div>
                  {i < PHASES.length - 1 && (
                    <div className="ml-6 mt-1 h-3 w-px" style={{ background: 'rgb(var(--c-hairline))' }} aria-hidden />
                  )}
                </li>
              )
            })}
          </ol>
          <p className="mt-3 text-xs leading-5 text-muted">
            Security tends to sit in dedicated phases (e.g. a design-time threat model and a late security-testing phase). Flaws found at the end are
            expensive to fix.
          </p>
        </section>

        {/* ---------- AGILE ---------- */}
        <section className="rounded-2xl border border-hairline bg-surface/40 p-4" aria-label="Agile model">
          <header className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${violet}1a`, color: violet }}>
              <Repeat className="h-4 w-4" />
            </span>
            <div>
              <h4 className="text-sm font-bold text-ink">Agile</h4>
              <p className="text-xs text-muted">Iterative — short sprints repeat, shipping small increments.</p>
            </div>
          </header>

          {/* Looping sprint cycle (SVG) */}
          <div className="rounded-xl border border-hairline bg-card/60 p-3">
            <svg viewBox="0 0 260 260" preserveAspectRatio="xMidYMid meet" className="h-auto w-full" role="group" aria-label="Agile sprint cycle of four repeating steps.">
              <circle cx={130} cy={130} r={92} fill="none" stroke="rgb(var(--c-hairline))" strokeWidth={2} strokeDasharray="2 7" />
              {/* rotating highlight gated on !reduced */}
              {!reduced && (
                <motion.circle
                  cx={130}
                  cy={130}
                  r={92}
                  fill="none"
                  stroke={violet}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray="50 520"
                  style={{ opacity: 0.5, transformOrigin: '130px 130px' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: playing ? 4.4 : 18, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <text x={130} y={126} textAnchor="middle" className="fill-[color:rgb(var(--c-ink))]" style={{ fontSize: 13, fontWeight: 800 }}>
                Sprint
              </text>
              <text x={130} y={144} textAnchor="middle" className="fill-[color:rgb(var(--c-muted))]" style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2 }}>
                repeats
              </text>
              {AGILE_STEPS.map((step, i) => {
                const ang = (-90 + (360 / AGILE_STEPS.length) * i) * (Math.PI / 180)
                const x = 130 + 92 * Math.cos(ang)
                const y = 130 + 92 * Math.sin(ang)
                const isCurrent = playing && agileStep === i
                return (
                  <g key={step}>
                    {isCurrent && !reduced && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={24}
                        fill={violet}
                        initial={{ opacity: 0.3, scale: 1 }}
                        animate={{ opacity: [0.3, 0, 0.3], scale: [1, 1.7, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <circle cx={x} cy={y} r={24} fill={isCurrent ? violet : 'rgb(var(--c-card))'} stroke={violet} strokeWidth={2} />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      pointerEvents="none"
                      style={{ fontSize: 11, fontWeight: 700 }}
                      fill={isCurrent ? '#04121a' : violet}
                    >
                      {step}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Current step's security activity */}
          <div className="mt-3 rounded-xl border p-3" style={{ borderColor: `${teal}44`, background: `${teal}0d` }}>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: teal }}>
              <ShieldCheck className="h-3.5 w-3.5" />
              Security woven into every sprint
            </p>
            <motion.p key={playing ? agileStep : 'idle'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.3 }} className="text-sm leading-5 text-ink">
              {playing ? (
                <>
                  <span className="font-semibold">{AGILE_STEPS[agileStep]}:</span> {AGILE_SECURITY[AGILE_STEPS[agileStep]]}
                </>
              ) : (
                'Each short loop includes threat modeling, secure coding, automated security tests and continuous review.'
              )}
            </motion.p>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">
            Security is a continuous activity inside every iteration (shift-left / DevSecOps), so flaws are caught early and fixed cheaply, sprint after
            sprint.
          </p>
        </section>
      </div>

      {/* ---------- Comparison strip ---------- */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border p-3" style={{ borderColor: `${cyan}33` }}>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: cyan }}>
            Security in Waterfall
          </p>
          <p className="text-sm leading-5 text-muted">
            Concentrated in specific phases — a design-time threat model and a dedicated security-testing phase near the end. Thorough on paper, but
            late discoveries are costly and can delay the single big release.
          </p>
        </div>
        <div className="rounded-xl border p-3" style={{ borderColor: `${violet}33` }}>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: violet }}>
            Security in Agile
          </p>
          <p className="text-sm leading-5 text-muted">
            Distributed across every sprint — threat modeling, secure coding, automated security tests and continuous review repeat each iteration, so
            risks surface and get fixed early and often.
          </p>
        </div>
      </div>
    </DiagramShell>
  )
}
