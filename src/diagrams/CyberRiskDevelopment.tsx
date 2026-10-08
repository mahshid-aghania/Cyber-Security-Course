import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Unlock, Crosshair, Skull, Play, ChevronRight, RotateCcw } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type AccentKey = 'cyan' | 'teal' | 'warn' | 'danger'

interface Stage {
  key: string
  label: string
  accent: AccentKey
  icon: typeof Database
  what: string
  example: string
}

const STAGES: Stage[] = [
  {
    key: 'asset',
    label: 'Asset',
    accent: 'cyan',
    icon: Database,
    what: 'Something of value worth protecting — data, a system, a service or a device.',
    example: 'University student database holding grades, personal details and enrolment records.',
  },
  {
    key: 'vulnerability',
    label: 'Vulnerability',
    accent: 'teal',
    icon: Unlock,
    what: 'A weakness or flaw in the asset or its surroundings that could be taken advantage of.',
    example: 'An unpatched application running on the database server, with a known security flaw.',
  },
  {
    key: 'threat',
    label: 'Threat exploitation',
    accent: 'warn',
    icon: Crosshair,
    what: 'A threat actor (or event) actually takes advantage of the vulnerability.',
    example: 'An attacker discovers the unpatched flaw and exploits it to gain a foothold.',
  },
  {
    key: 'impact',
    label: 'Possible impact',
    accent: 'danger',
    icon: Skull,
    what: 'The potential consequence if the exploitation succeeds — the harm to the organisation.',
    example: 'Unauthorised access to student records: a privacy breach and loss of trust.',
  },
]

export default function CyberRiskDevelopment() {
  const reduced = useReducedMotionPref()
  // step = how many stages are "lit"; -1 = nothing stepped yet (all neutral)
  const [step, setStep] = useState<number>(-1)
  const [selected, setSelected] = useState<string | null>(null)

  const reset = () => {
    setStep(-1)
    setSelected(null)
  }

  const next = () => setStep((s) => Math.min(s + 1, STAGES.length - 1))
  const atEnd = step >= STAGES.length - 1

  // A stage is active (lit) if stepping is engaged and its index <= step,
  // OR when nothing is stepped yet (show all in colour as a static overview).
  const isLit = (i: number) => (step === -1 ? true : i <= step)

  const activeStage = selected ? STAGES.find((s) => s.key === selected) ?? null : null

  return (
    <DiagramShell
      id="cyber-risk-development"
      title="How Cyber Risk Develops"
      description="Risk builds along a chain: a valuable asset, a weakness in it, an attacker exploiting that weakness, and the harm that could follow. Click any stage for detail, or step through with Play."
      onReset={reset}
      footnote="Illustrative, not exact: this shows how risk can develop, not what always happens. Not every vulnerability is exploited and not every exploitation becomes a real incident — controls, detection and response can break the chain at any stage."
      controls={
        <ControlGroup label="Walkthrough">
          <div className="inline-flex gap-1 rounded-xl border border-hairline bg-surface/60 p-1">
            <button
              onClick={atEnd ? reset : next}
              aria-label={atEnd ? 'Replay walkthrough' : step === -1 ? 'Start walkthrough' : 'Next stage'}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#04121a]"
              style={{ backgroundImage: 'linear-gradient(100deg,#57D8ED,#5FE0BE)' }}
            >
              {atEnd ? (
                <>
                  <RotateCcw className="h-4 w-4" /> Replay
                </>
              ) : step === -1 ? (
                <>
                  <Play className="h-4 w-4" /> Play
                </>
              ) : (
                <>
                  Next <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </ControlGroup>
      }
    >
      <div className="flex flex-col gap-5">
        {/* Chain */}
        <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
          {STAGES.map((s, i) => {
            const col = accentHex(s.accent)
            const lit = isLit(i)
            const isSel = selected === s.key
            const Icon = s.icon
            const last = i === STAGES.length - 1
            return (
              <div key={s.key} className="flex flex-col md:flex-1 md:flex-row md:items-stretch">
                <motion.button
                  onClick={() => setSelected(isSel ? null : s.key)}
                  aria-pressed={isSel}
                  aria-label={`Stage ${i + 1}: ${s.label}. ${isSel ? 'Hide' : 'Show'} detail.`}
                  animate={{ opacity: lit ? 1 : 0.4 }}
                  transition={{ duration: reduced ? 0 : 0.4 }}
                  className="card flex w-full flex-col gap-2 p-4 text-left transition-shadow md:min-h-[140px]"
                  style={{
                    borderColor: lit ? col : undefined,
                    boxShadow: isSel ? `inset 0 0 0 1px ${col}, 0 0 0 1px ${col}` : lit ? `inset 0 0 0 1px ${col}55` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${col}1a`, color: col }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">Step {i + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold leading-tight text-ink">{s.label}</h4>
                  <p className="text-xs leading-5 text-muted">{s.example}</p>
                </motion.button>

                {/* Connector */}
                {!last && (
                  <div className="flex shrink-0 items-center justify-center py-1 md:px-1.5 md:py-0">
                    <Connector lit={isLit(i + 1)} reduced={reduced} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Detail panel */}
        {activeStage ? (
          <motion.div
            key={activeStage.key}
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            className="rounded-2xl border border-hairline bg-surface/50 p-5"
            style={{ boxShadow: `inset 0 0 0 1px ${accentHex(activeStage.accent)}33` }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${accentHex(activeStage.accent)}1a`, color: accentHex(activeStage.accent) }}
              >
                <activeStage.icon className="h-5 w-5" />
              </span>
              <h4 className="text-base font-bold text-ink">{activeStage.label}</h4>
              <Badge color={accentHex(activeStage.accent)}>Worked example</Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-hairline bg-card p-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">What it is</p>
                <p className="text-sm leading-6 text-ink">{activeStage.what}</p>
              </div>
              <div className="rounded-xl border border-hairline bg-card p-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">In this example</p>
                <p className="text-sm leading-6 text-ink">{activeStage.example}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <p className="rounded-xl border border-dashed border-hairline bg-surface/30 px-4 py-3 text-center text-sm text-muted">
            Click a stage to see what it means and its specifics in the worked example, or press Play to step through the chain.
          </p>
        )}
      </div>
    </DiagramShell>
  )
}

function Connector({ lit, reduced }: { lit: boolean; reduced: boolean }) {
  const col = accentHex('warn')
  return (
    <>
      {/* Horizontal arrow on md+ */}
      <svg
        viewBox="0 0 48 24"
        preserveAspectRatio="xMidYMid meet"
        className="hidden h-6 w-10 md:block"
        aria-hidden="true"
      >
        <defs>
          <marker id="crd-arrow-h" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={lit ? col : 'rgb(var(--c-hairline))'} />
          </marker>
        </defs>
        <line
          x1="2"
          y1="12"
          x2="40"
          y2="12"
          stroke={lit ? col : 'rgb(var(--c-hairline))'}
          strokeWidth="2.5"
          strokeLinecap="round"
          markerEnd="url(#crd-arrow-h)"
        />
        {lit && !reduced && (
          <motion.circle
            r="3"
            cy="12"
            fill={col}
            animate={{ cx: [2, 40] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </svg>
      {/* Vertical arrow on mobile */}
      <svg
        viewBox="0 0 24 40"
        preserveAspectRatio="xMidYMid meet"
        className="h-8 w-6 md:hidden"
        aria-hidden="true"
      >
        <defs>
          <marker id="crd-arrow-v" markerWidth="6" markerHeight="6" refX="3" refY="4" orient="auto">
            <path d="M0,0 L3,6 L6,0 Z" fill={lit ? col : 'rgb(var(--c-hairline))'} />
          </marker>
        </defs>
        <line
          x1="12"
          y1="2"
          x2="12"
          y2="32"
          stroke={lit ? col : 'rgb(var(--c-hairline))'}
          strokeWidth="2.5"
          strokeLinecap="round"
          markerEnd="url(#crd-arrow-v)"
        />
        {lit && !reduced && (
          <motion.circle
            r="3"
            cx="12"
            fill={col}
            animate={{ cy: [2, 32] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </svg>
    </>
  )
}
