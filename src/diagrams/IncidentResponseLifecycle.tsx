import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Radar,
  Megaphone,
  ShieldOff,
  Search,
  Wrench,
  ClipboardCheck,
  Play,
  Pause,
  SkipForward,
  Target,
  Users,
  ListChecks,
  CheckCircle2,
} from 'lucide-react'
import { DiagramShell } from '../components/DiagramShell'
import { accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type StageKey =
  | 'detection'
  | 'escalation'
  | 'containment'
  | 'investigation'
  | 'recovery'
  | 'review'

type Accent = 'cyan' | 'teal' | 'violet' | 'warn' | 'danger'

interface Stage {
  key: StageKey
  label: string
  accent: Accent
  icon: typeof Radar
  purpose: string
  parties: string[]
  actions: string[]
  outcome: string
}

const STAGES: Stage[] = [
  {
    key: 'detection',
    label: 'Detection',
    accent: 'cyan',
    icon: Radar,
    purpose: 'Notice that something abnormal or malicious may be happening.',
    parties: ['Security monitoring / SOC', 'Automated alerting tools', 'End users reporting issues'],
    actions: [
      'Review SIEM alerts and anomaly detections',
      'Confirm an alert is a genuine incident, not a false positive',
      'Record first-observed time and affected systems',
    ],
    outcome: 'A suspected incident is confirmed and logged, ready to be raised.',
  },
  {
    key: 'escalation',
    label: 'Escalation',
    accent: 'warn',
    icon: Megaphone,
    purpose: 'Bring the right people in and classify how serious the incident is.',
    parties: ['Incident response lead', 'IT management', 'On-call responders'],
    actions: [
      'Assign a severity / priority level',
      'Notify the response team and key stakeholders',
      'Open an incident ticket and start the timeline log',
    ],
    outcome: 'Ownership is clear and the response team is mobilised.',
  },
  {
    key: 'containment',
    label: 'Containment',
    accent: 'danger',
    icon: ShieldOff,
    purpose: 'Stop the incident from spreading or causing further harm.',
    parties: ['Security engineers', 'Network / systems admins'],
    actions: [
      'Isolate affected hosts from the network',
      'Disable compromised accounts and revoke tokens',
      'Apply temporary blocks (firewall rules, segmentation)',
    ],
    outcome: 'The blast radius is limited and the situation stops getting worse.',
  },
  {
    key: 'investigation',
    label: 'Investigation',
    accent: 'violet',
    icon: Search,
    purpose: 'Understand what happened, how, and what was affected.',
    parties: ['Forensics / analysts', 'Threat intelligence', 'Legal (where relevant)'],
    actions: [
      'Collect and preserve logs and evidence',
      'Identify the root cause and entry point',
      'Scope which data and systems were impacted',
    ],
    outcome: 'A clear picture of root cause, scope and impact is established.',
  },
  {
    key: 'recovery',
    label: 'Recovery',
    accent: 'teal',
    icon: Wrench,
    purpose: 'Safely restore systems and return to normal operations.',
    parties: ['Systems / infrastructure teams', 'Application owners'],
    actions: [
      'Rebuild or restore systems from clean backups',
      'Patch the exploited vulnerability before reconnecting',
      'Monitor closely for signs of the threat returning',
    ],
    outcome: 'Affected services are restored and verified as clean and stable.',
  },
  {
    key: 'review',
    label: 'Review',
    accent: 'cyan',
    icon: ClipboardCheck,
    purpose: 'Learn from the incident and improve defences for next time.',
    parties: ['Whole response team', 'Management', 'Affected business units'],
    actions: [
      'Hold a blameless post-incident review',
      'Document lessons learned and the full timeline',
      'Update controls, playbooks and training',
    ],
    outcome: 'Concrete improvements feed back into stronger prevention and detection.',
  },
]

export default function IncidentResponseLifecycle() {
  const reduced = useReducedMotionPref()
  const [activeIndex, setActiveIndex] = useState(0)
  const [litCount, setLitCount] = useState(1)
  const [playing, setPlaying] = useState(false)

  const reset = useCallback(() => {
    setActiveIndex(0)
    setLitCount(1)
    setPlaying(false)
  }, [])

  // Auto-advance while playing. Looping/auto animation is still gated on
  // reduced-motion (shorter dwell, no pulsing rings) so it stays comfortable.
  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(
      () => {
        setActiveIndex((i) => {
          const next = (i + 1) % STAGES.length
          setLitCount((c) => (next === 0 ? STAGES.length : Math.max(c, next + 1)))
          if (next === 0) setPlaying(false)
          return next
        })
      },
      reduced ? 700 : 1600,
    )
    return () => window.clearTimeout(t)
  }, [playing, activeIndex, reduced])

  const step = () => {
    setPlaying(false)
    setActiveIndex((i) => {
      const next = (i + 1) % STAGES.length
      setLitCount((c) => (next === 0 ? 1 : Math.max(c, next + 1)))
      return next
    })
  }

  const selectStage = (i: number) => {
    setPlaying(false)
    setActiveIndex(i)
    setLitCount((c) => Math.max(c, i + 1))
  }

  const active = STAGES[activeIndex]
  const col = accentHex(active.accent)

  return (
    <DiagramShell
      id="incident-response-lifecycle"
      title="Incident Response Lifecycle"
      description="Walk through six stages of responding to a security incident. Click a stage to explore its purpose, who is involved, example actions and the expected outcome — or press Play to advance through them."
      onReset={reset}
      footnote="An illustrative operational sequence for learning — not an exact, formal sequence prescribed by the textbook. Real incident response is usually iterative: teams often loop back between stages, and the exact steps vary by organisation and framework."
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            aria-label={playing ? 'Pause lifecycle animation' : 'Play lifecycle animation'}
            className="btn-primary h-9"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{playing ? 'Pause' : 'Play'}</span>
          </button>
          <button onClick={step} aria-label="Advance to next stage" className="btn-ghost h-9">
            <SkipForward className="h-4 w-4" />
            <span className="hidden sm:inline">Step</span>
          </button>
          <span className="chip" aria-hidden="true">
            Stage {activeIndex + 1} / {STAGES.length}
          </span>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        {/* ---- Stage nodes ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <ol
            className="flex flex-wrap items-stretch justify-center gap-y-3"
            aria-label="Incident response stages"
          >
            {STAGES.map((s, i) => {
              const sCol = accentHex(s.accent)
              const isActive = i === activeIndex
              const isLit = i < litCount
              const Icon = s.icon
              return (
                <li key={s.key} className="flex items-center">
                  <motion.button
                    onClick={() => selectStage(i)}
                    aria-pressed={isActive}
                    aria-label={`${s.label} — stage ${i + 1} of ${STAGES.length}`}
                    className="relative flex w-[86px] flex-col items-center gap-2 rounded-2xl border p-2.5 text-center transition-colors sm:w-[104px] sm:p-3"
                    style={{
                      borderColor: isActive ? sCol : isLit ? `${sCol}66` : 'rgb(var(--c-hairline))',
                      background: isActive ? `${sCol}1f` : isLit ? `${sCol}0d` : 'rgb(var(--c-card))',
                    }}
                    animate={{ scale: isActive ? 1.05 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  >
                    {isActive && !reduced && (
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-2xl"
                        style={{ boxShadow: `0 0 0 2px ${sCol}` }}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 0.15, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{
                        background: isLit ? `${sCol}22` : 'rgb(var(--c-surface))',
                        color: isLit ? sCol : 'rgb(var(--c-muted))',
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className="text-[11px] font-semibold leading-tight"
                      style={{ color: isLit ? 'rgb(var(--c-ink))' : 'rgb(var(--c-muted))' }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        background: isLit ? sCol : 'rgb(var(--c-surface))',
                        color: isLit ? '#04121a' : 'rgb(var(--c-muted))',
                        border: `1px solid ${isLit ? sCol : 'rgb(var(--c-hairline))'}`,
                      }}
                    >
                      {i + 1}
                    </span>
                  </motion.button>
                  {i < STAGES.length - 1 && (
                    <svg
                      width="20"
                      height="14"
                      viewBox="0 0 20 14"
                      aria-hidden="true"
                      className="mx-0.5 hidden shrink-0 sm:block"
                    >
                      <motion.path
                        d="M1 7 H15 M15 7 L11 3 M15 7 L11 11"
                        fill="none"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{
                          stroke: i + 1 < litCount ? accentHex(STAGES[i + 1].accent) : 'rgb(120 134 158)',
                          opacity: i + 1 < litCount ? 1 : 0.45,
                        }}
                        transition={{ duration: reduced ? 0 : 0.4 }}
                      />
                    </svg>
                  )}
                </li>
              )
            })}
          </ol>
          <p className="mt-4 text-center text-xs leading-5 text-muted">
            Stages light up as the response progresses. The cycle loops back to Review, feeding lessons
            into stronger prevention.
          </p>
        </div>

        {/* ---- Detail panel ---- */}
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.35 }}
          className="flex flex-col gap-4 rounded-2xl border border-hairline bg-card p-5"
          style={{ boxShadow: `inset 0 0 0 1px ${col}22` }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: `${col}1a`, color: col }}
            >
              <active.icon className="h-5 w-5" />
            </span>
            <div>
              <h4 className="text-base font-bold text-ink">{active.label}</h4>
              <p className="text-xs text-muted">
                Stage {activeIndex + 1} of {STAGES.length}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <Target className="h-3.5 w-3.5" style={{ color: col }} />
              Purpose
            </p>
            <p className="text-sm leading-6 text-ink">{active.purpose}</p>
          </div>

          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <Users className="h-3.5 w-3.5" style={{ color: col }} />
              Responsible parties
            </p>
            <div className="flex flex-wrap gap-1.5">
              {active.parties.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium"
                  style={{ borderColor: `${col}55`, color: col, background: `${col}14` }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-hairline bg-surface/50 p-3">
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <ListChecks className="h-3.5 w-3.5" style={{ color: col }} />
              Example actions
            </p>
            <ul className="space-y-1.5">
              {active.actions.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm leading-6 text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: col }} />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="mt-auto rounded-xl border p-3"
            style={{ borderColor: `${accentHex('teal')}44`, background: `${accentHex('teal')}0f` }}
          >
            <p
              className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
              style={{ color: accentHex('teal') }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Expected outcome
            </p>
            <p className="text-sm leading-6 text-ink">{active.outcome}</p>
          </div>
        </motion.div>
      </div>
    </DiagramShell>
  )
}
