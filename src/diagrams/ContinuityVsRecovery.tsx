import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Server,
  Network,
  Database,
  ShieldCheck,
  ClipboardList,
  Megaphone,
  FileText,
  GraduationCap,
  Play,
  Pause,
  SkipForward,
  Wrench,
  LifeBuoy,
} from 'lucide-react'
import { DiagramShell } from '../components/DiagramShell'
import { accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

/**
 * Timeline has 5 phases (0..4). Each side describes what is happening at each
 * phase. The two columns advance together to show the response runs in
 * parallel — but with different goals.
 */
const PHASES = ['Attack hits', 'Impact', 'Response begins', 'Stabilising', 'Normalising'] as const

interface Item {
  icon: typeof Server
  label: string
  /** Phase index (0..4) at which this item becomes "done / active". */
  readyAt: number
  note: string
}

// LEFT — Disaster Recovery: restore the technical systems, in stages.
const RECOVERY: Item[] = [
  { icon: Network, label: 'Network & identity', readyAt: 2, note: 'Segment and rebuild core network, directory and VPN access.' },
  { icon: Server, label: 'Core servers', readyAt: 3, note: 'Restore key application servers from clean, verified images.' },
  { icon: Database, label: 'Databases', readyAt: 3, note: 'Recover student records and finance DBs from isolated backups.' },
  { icon: ShieldCheck, label: 'Systems verified', readyAt: 4, note: 'Patch the entry point, scan for threats, re-enable services.' },
]

// RIGHT — Business Continuity: keep critical university functions running NOW.
const CONTINUITY: Item[] = [
  { icon: ClipboardList, label: 'Manual registration', readyAt: 1, note: 'Enrolment and attendance captured on paper forms and spreadsheets.' },
  { icon: Megaphone, label: 'Alternate comms', readyAt: 1, note: 'Notices via SMS, personal email and the campus website / social media.' },
  { icon: FileText, label: 'Paper processes', readyAt: 2, note: 'Printed timetables, offline grade sheets and standby payment routes.' },
  { icon: GraduationCap, label: 'Teaching continues', readyAt: 2, note: 'Lectures, exams and critical services keep running despite the outage.' },
]

type Side = 'recovery' | 'continuity'

function Column({
  side,
  items,
  phase,
  reduced,
}: {
  side: Side
  items: Item[]
  phase: number
  reduced: boolean
}) {
  const isRecovery = side === 'recovery'
  const col = accentHex(isRecovery ? 'cyan' : 'teal')
  const Head = isRecovery ? Wrench : LifeBuoy
  return (
    <div
      className="flex min-w-0 flex-col gap-3 rounded-2xl border p-4"
      style={{ borderColor: `${col}44`, background: `${col}0a` }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${col}1f`, color: col }}
        >
          <Head className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h4 className="truncate text-sm font-bold text-ink">
            {isRecovery ? 'Disaster Recovery' : 'Business Continuity'}
          </h4>
          <p className="text-[11px] leading-4 text-muted">
            {isRecovery ? 'Goal: restore the technical systems' : 'Goal: keep critical functions running'}
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((it) => {
          const done = phase >= it.readyAt
          const Icon = it.icon
          return (
            <li key={it.label}>
              <motion.div
                className="flex items-start gap-3 rounded-xl border p-3 transition-colors"
                style={{
                  borderColor: done ? `${col}66` : 'rgb(var(--c-hairline))',
                  background: done ? `${col}14` : 'rgb(var(--c-card))',
                }}
                animate={{ opacity: done ? 1 : 0.6 }}
                transition={{ duration: reduced ? 0 : 0.4 }}
              >
                <span
                  className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: done ? `${col}26` : 'rgb(var(--c-surface))',
                    color: done ? col : 'rgb(var(--c-muted))',
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {done && !reduced && (
                    <motion.span
                      className="absolute inset-0 rounded-lg"
                      style={{ boxShadow: `0 0 0 2px ${col}` }}
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.5 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-[13px] font-semibold"
                    style={{ color: done ? 'rgb(var(--c-ink))' : 'rgb(var(--c-muted))' }}
                  >
                    {it.label}
                    {done && (
                      <span className="ml-2 text-[10px] font-bold uppercase tracking-wide" style={{ color: col }}>
                        {isRecovery ? 'restored' : 'active'}
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-muted">{it.note}</p>
                </div>
              </motion.div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function ContinuityVsRecovery() {
  const reduced = useReducedMotionPref()
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  const reset = useCallback(() => {
    setPhase(0)
    setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing) return
    if (phase >= PHASES.length - 1) {
      setPlaying(false)
      return
    }
    const t = window.setTimeout(() => setPhase((p) => p + 1), reduced ? 800 : 1500)
    return () => window.clearTimeout(t)
  }, [playing, phase, reduced])

  const step = () => {
    setPlaying(false)
    setPhase((p) => (p + 1) % PHASES.length)
  }

  return (
    <DiagramShell
      id="continuity-vs-recovery"
      title="Continuity vs. Recovery"
      description="A university is hit by ransomware. Advance the shared timeline to watch both responses run in parallel: Disaster Recovery restores the technical systems, while Business Continuity keeps essential university operations running through alternative procedures."
      onReset={reset}
      footnote="An illustrative scenario for learning. Real continuity and recovery plans are detailed, tested documents tailored to each institution; timings, system order and fallback procedures vary widely."
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              if (phase >= PHASES.length - 1) setPhase(0)
              setPlaying((p) => !p)
            }}
            aria-pressed={playing}
            aria-label={playing ? 'Pause timeline' : 'Play timeline'}
            className="btn-primary h-9"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{playing ? 'Pause' : 'Play'}</span>
          </button>
          <button onClick={step} aria-label="Advance timeline one phase" className="btn-ghost h-9">
            <SkipForward className="h-4 w-4" />
            <span className="hidden sm:inline">Step</span>
          </button>
          <span className="chip" aria-hidden="true">
            {PHASES[phase]}
          </span>
        </div>
      }
    >
      {/* Shared timeline */}
      <div className="mb-4 rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-1">
          {PHASES.map((label, i) => {
            const reached = i <= phase
            return (
              <button
                key={label}
                onClick={() => {
                  setPlaying(false)
                  setPhase(i)
                }}
                aria-pressed={i === phase}
                aria-label={`Timeline phase ${i + 1}: ${label}`}
                className="group flex min-w-0 flex-1 flex-col items-center gap-2"
              >
                <div className="flex w-full items-center">
                  <span
                    className="h-0.5 flex-1 rounded"
                    style={{ background: i === 0 ? 'transparent' : reached ? accentHex('violet') : 'rgb(var(--c-hairline))' }}
                  />
                  <motion.span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold"
                    style={{
                      background: reached ? accentHex('violet') : 'rgb(var(--c-card))',
                      color: reached ? '#04121a' : 'rgb(var(--c-muted))',
                      borderColor: reached ? accentHex('violet') : 'rgb(var(--c-hairline))',
                    }}
                    animate={{ scale: i === phase ? 1.15 : 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                  >
                    {i + 1}
                  </motion.span>
                  <span
                    className="h-0.5 flex-1 rounded"
                    style={{
                      background:
                        i === PHASES.length - 1 ? 'transparent' : i < phase ? accentHex('violet') : 'rgb(var(--c-hairline))',
                    }}
                  />
                </div>
                <span
                  className="text-center text-[10px] font-medium leading-3 sm:text-[11px]"
                  style={{ color: i === phase ? 'rgb(var(--c-ink))' : 'rgb(var(--c-muted))' }}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Split screen */}
      <div className="grid gap-4 md:grid-cols-2">
        <Column side="recovery" items={RECOVERY} phase={phase} reduced={reduced} />
        <Column side="continuity" items={CONTINUITY} phase={phase} reduced={reduced} />
      </div>

      {/* Contrast strip */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div
          className="rounded-xl border p-3"
          style={{ borderColor: `${accentHex('cyan')}44`, background: `${accentHex('cyan')}0d` }}
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('cyan') }}>
            Disaster Recovery asks
          </p>
          <p className="text-sm leading-6 text-ink">
            &ldquo;How do we get the <strong>technology</strong> back — servers, networks and databases
            rebuilt and verified clean?&rdquo;
          </p>
        </div>
        <div
          className="rounded-xl border p-3"
          style={{ borderColor: `${accentHex('teal')}44`, background: `${accentHex('teal')}0d` }}
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('teal') }}>
            Business Continuity asks
          </p>
          <p className="text-sm leading-6 text-ink">
            &ldquo;How does the <strong>university keep functioning</strong> — teaching, exams and critical
            services — while the tech is down?&rdquo;
          </p>
        </div>
      </div>
    </DiagramShell>
  )
}
