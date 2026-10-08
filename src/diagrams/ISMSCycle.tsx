import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Pause,
  Search,
  ListChecks,
  Hammer,
  Activity,
  ClipboardCheck,
  TrendingUp,
  Target,
  Lightbulb,
} from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { accentHex } from '../components/ui'
import type { AccentKey } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type StageKey =
  | 'identify-risks'
  | 'select-controls'
  | 'implement'
  | 'monitor'
  | 'review'
  | 'improve'

interface Stage {
  key: StageKey
  label: string
  accent: AccentKey
  icon: typeof Search
  what: string
  why: string
  example: string
}

const STAGES: Stage[] = [
  {
    key: 'identify-risks',
    label: 'Identify risks',
    accent: 'cyan',
    icon: Search,
    what: 'Find the information assets that matter and work out what could threaten them — then rate each risk by how likely it is and how much harm it would cause.',
    why: 'You cannot protect what you have not mapped. A clear, prioritised risk picture is what every later decision in the cycle is built on.',
    example: 'Listing customer records in a database, noting the threat of a ransomware attack, and scoring it as high likelihood and high impact.',
  },
  {
    key: 'select-controls',
    label: 'Select controls',
    accent: 'teal',
    icon: ListChecks,
    what: 'Choose the safeguards that will treat each significant risk — technical, physical and organisational — and record why each one was chosen.',
    why: 'Controls are how risk is actually reduced to an acceptable level, and documenting the choices keeps the decisions defensible and auditable.',
    example: 'Deciding to add offline backups, multi-factor authentication and staff phishing training to address the ransomware risk.',
  },
  {
    key: 'implement',
    label: 'Implement',
    accent: 'violet',
    icon: Hammer,
    what: 'Put the chosen controls into practice — configure the tools, write the policies, and train the people who will operate them day to day.',
    why: 'A control that exists only on paper protects nothing; value comes only when it is deployed, understood and consistently used.',
    example: 'Rolling out the backup system, enforcing MFA on all accounts, and running the first round of phishing-awareness training.',
  },
  {
    key: 'monitor',
    label: 'Monitor',
    accent: 'warn',
    icon: Activity,
    what: 'Watch the controls and the environment continuously — collecting logs, alerts and metrics to confirm things are working as intended.',
    why: 'Threats and systems change constantly; ongoing monitoring is how you spot drift, failures and incidents while they are still small.',
    example: 'Reviewing backup-success reports, tracking failed-login alerts, and confirming MFA is still enforced across every account.',
  },
  {
    key: 'review',
    label: 'Review',
    accent: 'danger',
    icon: ClipboardCheck,
    what: 'Step back at planned intervals to assess how well the whole system is performing, usually via internal audits and a management review.',
    why: 'Regular, structured review turns raw monitoring data into judgement about whether the ISMS still meets its objectives and obligations.',
    example: 'An internal audit plus a quarterly management meeting that finds training cut phishing clicks but backups are slow to restore.',
  },
  {
    key: 'improve',
    label: 'Improve',
    accent: 'cyan',
    icon: TrendingUp,
    what: 'Act on what review revealed — fix the gaps, strengthen weak controls, and feed the lessons back into the next pass of the cycle.',
    why: 'Continual improvement is the whole point: each loop should leave the organisation measurably better protected than the last.',
    example: 'Moving to faster incremental backups and tightening alert thresholds, then carrying those updates into the next risk round.',
  },
]

const SIZE = 420
const CENTER = SIZE / 2
const RING_R = 150
const NODE_R = 30

/** Angle (radians) of stage i around the ring, starting at the top, clockwise. */
function stageAngle(i: number): number {
  return -Math.PI / 2 + (i / STAGES.length) * Math.PI * 2
}

function stagePoint(i: number): { x: number; y: number } {
  const a = stageAngle(i)
  return { x: CENTER + RING_R * Math.cos(a), y: CENTER + RING_R * Math.sin(a) }
}

export default function ISMSCycle() {
  const reduced = useReducedMotionPref()
  const [selected, setSelected] = useState<StageKey | null>(null)
  const [playing, setPlaying] = useState(false)
  const [flowIndex, setFlowIndex] = useState(0)

  // Advance the travelling marker around the ring while playing.
  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => {
      setFlowIndex((n) => (n + 1) % STAGES.length)
    }, 1400)
    return () => window.clearInterval(id)
  }, [playing, reduced])

  const reset = () => {
    setSelected(null)
    setPlaying(false)
    setFlowIndex(0)
  }

  const active = selected ? STAGES.find((s) => s.key === selected)! : null
  const marker = stagePoint(flowIndex)

  return (
    <DiagramShell
      id="isms-cycle"
      title="ISMS Continuous Improvement Cycle"
      description="The Information Security Management System (ISO 27001) runs as a loop: identify risks, select controls, implement, monitor, review, improve — then start again. Press play to watch the flow, or select any stage to inspect it."
      onReset={reset}
      footnote="The ISMS (ISO 27001) is a continuous cycle, not a one-off project: it repeats on purpose so the organisation keeps improving as threats and systems change."
      controls={
        <ControlGroup label="Flow">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            aria-label={playing ? 'Pause the cycle animation' : 'Play the cycle animation'}
            disabled={reduced}
            className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface/60 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-cyan/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? 'Pause' : 'Play'}
          </button>
          {reduced && <span className="text-xs text-muted">Animation off (reduced motion)</span>}
        </ControlGroup>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        {/* ---- Ring diagram ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label="A circular cycle of six security-management stages that loops back to the start."
          >
            <defs>
              <marker
                id="isms-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={accentHex('cyan')} />
              </marker>
            </defs>

            {/* Base ring */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RING_R}
              fill="none"
              className="stroke-[color:rgb(var(--c-hairline))]"
              strokeWidth={10}
            />

            {/* Directional arcs between stages */}
            {STAGES.map((s, i) => {
              const a0 = stageAngle(i)
              const a1 = stageAngle((i + 1) % STAGES.length)
              // Shrink each arc a little so arrowheads sit between nodes.
              const pad = 0.22
              const start = a0 + pad
              const end = a1 - pad
              const sx = CENTER + RING_R * Math.cos(start)
              const sy = CENTER + RING_R * Math.sin(start)
              const ex = CENTER + RING_R * Math.cos(end)
              const ey = CENTER + RING_R * Math.sin(end)
              const col = accentHex(s.accent)
              return (
                <path
                  key={`arc-${s.key}`}
                  d={`M ${sx} ${sy} A ${RING_R} ${RING_R} 0 0 1 ${ex} ${ey}`}
                  fill="none"
                  stroke={col}
                  strokeWidth={3}
                  strokeLinecap="round"
                  markerEnd="url(#isms-arrow)"
                  opacity={selected ? 0.35 : 0.65}
                />
              )
            })}

            {/* Travelling marker */}
            {!reduced && (
              <motion.circle
                r={9}
                fill={accentHex('cyan')}
                animate={{ cx: marker.x, cy: marker.y }}
                transition={{ duration: playing ? 1.2 : 0.4, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(87,216,237,0.8))' }}
              />
            )}

            {/* Centre label */}
            <text
              x={CENTER}
              y={CENTER - 8}
              textAnchor="middle"
              className="fill-[color:rgb(var(--c-muted))]"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2 }}
            >
              ISMS
            </text>
            <text
              x={CENTER}
              y={CENTER + 10}
              textAnchor="middle"
              className="fill-[color:rgb(var(--c-muted))]"
              style={{ fontSize: 10, fontWeight: 600 }}
            >
              ISO 27001
            </text>
            <text
              x={CENTER}
              y={CENTER + 26}
              textAnchor="middle"
              className="fill-[color:rgb(var(--c-muted))]"
              style={{ fontSize: 8, letterSpacing: 1 }}
            >
              repeats to improve
            </text>

            {/* Stage nodes */}
            {STAGES.map((s, i) => {
              const { x, y } = stagePoint(i)
              const col = accentHex(s.accent)
              const isSel = selected === s.key
              const isHot = !reduced && playing && flowIndex === i
              const dim = selected !== null && !isSel
              const Icon = s.icon
              // Label placed outward from the ring centre.
              const a = stageAngle(i)
              const lx = CENTER + (RING_R + NODE_R + 14) * Math.cos(a)
              const ly = CENTER + (RING_R + NODE_R + 14) * Math.sin(a)
              const anchor = Math.abs(Math.cos(a)) < 0.3 ? 'middle' : lx < CENTER ? 'end' : 'start'
              return (
                <g key={s.key} style={{ cursor: 'pointer' }}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={NODE_R}
                    fill={isSel ? col : 'rgb(var(--c-card))'}
                    stroke={col}
                    strokeWidth={isSel || isHot ? 3 : 2}
                    animate={{ opacity: dim ? 0.4 : 1, scale: isHot ? 1.12 : 1 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  <text
                    x={x}
                    y={y + 18}
                    textAnchor="middle"
                    pointerEvents="none"
                    style={{ fontSize: 13, fontWeight: 800 }}
                    fill={isSel ? '#04121a' : col}
                  >
                    {i + 1}
                  </text>
                  <foreignObject
                    x={x - 11}
                    y={y - 18}
                    width={22}
                    height={22}
                    style={{ pointerEvents: 'none' }}
                  >
                    <div
                      className="flex h-[22px] w-[22px] items-center justify-center"
                      style={{ color: isSel ? '#04121a' : col, opacity: dim ? 0.5 : 1 }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </foreignObject>
                  <text
                    x={lx}
                    y={ly}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    pointerEvents="none"
                    className="fill-[color:rgb(var(--c-ink))]"
                    style={{ fontSize: 11, fontWeight: 600, opacity: dim ? 0.45 : 1 }}
                  >
                    {s.label}
                  </text>
                  {/* hit target */}
                  <circle
                    cx={x}
                    cy={y}
                    r={NODE_R + 4}
                    fill="transparent"
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${isSel ? 'Hide' : 'Show'} details for stage ${i + 1}, ${s.label}`}
                    style={{ cursor: 'pointer', outline: 'none' }}
                    onClick={() => setSelected(isSel ? null : s.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelected(isSel ? null : s.key)
                      }
                    }}
                  />
                </g>
              )
            })}
          </svg>

          {/* Mobile-friendly selector */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {STAGES.map((s, i) => {
              const col = accentHex(s.accent)
              const isSel = selected === s.key
              const Icon = s.icon
              return (
                <button
                  key={s.key}
                  onClick={() => setSelected(isSel ? null : s.key)}
                  aria-pressed={isSel}
                  aria-label={`${isSel ? 'Hide' : 'Show'} ${s.label} details`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: isSel ? col : 'rgb(var(--c-hairline))',
                    color: isSel ? '#04121a' : col,
                    background: isSel ? col : `${col}10`,
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {i + 1}. {s.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ---- Detail panel ---- */}
        <div className="min-w-0">
          {active ? (
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
              className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-card p-5"
              style={{ boxShadow: `inset 0 0 0 1px ${accentHex(active.accent)}22` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${accentHex(active.accent)}1a`, color: accentHex(active.accent) }}
                >
                  <active.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-ink">{active.label}</h4>
                  <p className="text-xs text-muted">
                    Stage {STAGES.findIndex((s) => s.key === active.key) + 1} of {STAGES.length} in the ISMS cycle
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">What happens here</p>
                <p className="text-sm leading-6 text-ink">{active.what}</p>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <Target className="h-3.5 w-3.5" style={{ color: accentHex(active.accent) }} />
                  Why it matters
                </p>
                <p className="text-sm leading-6 text-ink">{active.why}</p>
              </div>

              <div className="mt-auto">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <Lightbulb className="h-3.5 w-3.5" style={{ color: accentHex(active.accent) }} />
                  Example
                </p>
                <p className="text-sm leading-6 text-ink">{active.example}</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center">
              <TrendingUp className="h-8 w-8 text-cyan" />
              <p className="max-w-xs text-sm text-muted">
                Press <span className="font-semibold text-ink">Play</span> to watch the cycle flow, or select any stage
                to see what happens there, why it matters, and a concrete example.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {STAGES.map((s, i) => (
                  <span
                    key={s.key}
                    className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium"
                    style={{
                      borderColor: `${accentHex(s.accent)}55`,
                      color: accentHex(s.accent),
                      background: `${accentHex(s.accent)}14`,
                    }}
                  >
                    {i + 1}. {s.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DiagramShell>
  )
}
