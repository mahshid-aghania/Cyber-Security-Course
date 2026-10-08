import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Thermometer, KeyRound, LogIn, Network, CreditCard, Database, ShieldCheck, AlertTriangle } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

interface Stage {
  n: number
  label: string
  icon: typeof Thermometer
  // Node centre (viewBox 0..520 x, 0..320 y)
  x: number
  y: number
  detail: string
  // True for the lateral-movement step that segmentation blocks.
  blockedBySegmentation?: boolean
}

const STAGES: Stage[] = [
  {
    n: 1,
    label: 'HVAC supplier compromised',
    icon: Thermometer,
    x: 70,
    y: 70,
    detail: 'Attackers first breached a third-party heating/ventilation (HVAC) vendor connected to the retailer — a weaker outer target.',
  },
  {
    n: 2,
    label: 'Supplier credentials stolen',
    icon: KeyRound,
    x: 250,
    y: 70,
    detail: 'Malware on the supplier harvested the vendor’s login credentials for the retailer’s systems.',
  },
  {
    n: 3,
    label: 'Access via supplier relationship',
    icon: LogIn,
    x: 430,
    y: 70,
    detail: 'Using the stolen vendor credentials, the attackers logged into an external-facing portal and reached the internal environment.',
  },
  {
    n: 4,
    label: 'Lateral movement (weak segmentation)',
    icon: Network,
    x: 430,
    y: 250,
    detail: 'With little internal network segmentation, the attackers moved from the vendor-facing systems across to sensitive internal systems.',
    blockedBySegmentation: true,
  },
  {
    n: 5,
    label: 'Point-of-sale systems compromised',
    icon: CreditCard,
    x: 250,
    y: 250,
    detail: 'They installed malware on point-of-sale (POS) terminals to capture card data as it was swiped in stores.',
  },
  {
    n: 6,
    label: 'Payment card data exposed',
    icon: Database,
    x: 70,
    y: 250,
    detail: 'Captured payment card data was exfiltrated, exposing the details of millions of customers.',
  },
]

export default function TargetBreachPath() {
  const reduced = useReducedMotionPref()
  const [progress, setProgress] = useState(0) // 0 = none; 1..6 = stages revealed
  const [playing, setPlaying] = useState(false)
  const [segmented, setSegmented] = useState(false)

  const reset = () => {
    setProgress(0)
    setPlaying(false)
    setSegmented(false)
  }

  // Step through stages while playing. Segmentation halts progression at the
  // lateral-movement step (stage 4).
  useEffect(() => {
    if (!playing) return
    const haltAt = segmented ? 3 : 6
    if (progress >= haltAt) {
      setPlaying(false)
      return
    }
    const t = window.setTimeout(() => setProgress((p) => p + 1), reduced ? 250 : 900)
    return () => window.clearTimeout(t)
  }, [playing, progress, segmented, reduced])

  const togglePlay = () => {
    const haltAt = segmented ? 3 : 6
    if (progress >= haltAt) setProgress(0)
    setPlaying((p) => !p)
  }

  const reachableMax = segmented ? 3 : 6
  const isReached = (n: number) => progress >= n
  const isBlocked = (s: Stage) => segmented && s.n >= 4

  return (
    <DiagramShell
      id="target-breach-path"
      title="Target Breach Attack Path"
      description="Follow the six stages of the 2013 Target breach, from a third-party HVAC supplier to exposed payment card data. Apply network segmentation to see how blocking lateral movement could have limited the attacker’s reach."
      onReset={reset}
      footnote="A simplified representation of widely-reported events for teaching purposes. Real-world incidents involve many more technical details and contributing factors."
      controls={
        <>
          <ControlGroup label="Attack">
            <button
              onClick={togglePlay}
              aria-pressed={playing}
              aria-label={playing ? 'Pause attack path animation' : 'Play attack path animation'}
              className="btn-ghost h-9"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{playing ? 'Pause' : 'Play attack path'}</span>
            </button>
          </ControlGroup>
          <ControlGroup label="Defence">
            <button
              onClick={() => setSegmented((s) => !s)}
              aria-pressed={segmented}
              aria-label="Toggle network segmentation"
              className="inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors"
              style={{
                borderColor: segmented ? accentHex('teal') : 'rgb(var(--c-hairline))',
                color: segmented ? '#04121a' : accentHex('teal'),
                background: segmented ? accentHex('teal') : `${accentHex('teal')}12`,
              }}
            >
              <Network className="h-4 w-4" />
              Apply network segmentation
            </button>
          </ControlGroup>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        {/* ---- Attack-path graph ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox="0 0 520 320"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label="Target breach attack path with six connected stages."
          >
            {/* Edges connecting consecutive stages */}
            {STAGES.slice(0, -1).map((s, i) => {
              const next = STAGES[i + 1]
              const edgeIndex = s.n // edge leads into stage s.n+1
              const reached = progress >= edgeIndex + 1
              // The edge into stage 4 is the lateral-movement link blocked by segmentation.
              const isBlockEdge = next.blockedBySegmentation
              const blocked = segmented && isBlockEdge
              const col = blocked ? accentHex('teal') : reached ? accentHex('danger') : 'rgb(var(--c-hairline))'
              const midX = (s.x + next.x) / 2
              const midY = (s.y + next.y) / 2
              return (
                <g key={`edge-${s.n}`}>
                  <motion.line
                    x1={s.x}
                    y1={s.y}
                    x2={next.x}
                    y2={next.y}
                    stroke={col}
                    strokeWidth={reached || blocked ? 3.5 : 2}
                    strokeLinecap="round"
                    strokeDasharray={blocked ? '6 6' : undefined}
                    animate={{ opacity: reached || blocked ? 1 : 0.5 }}
                    transition={{ duration: reduced ? 0 : 0.4 }}
                  />
                  {/* Segmentation barrier marker on the blocked edge */}
                  {blocked && (
                    <g>
                      <rect x={midX - 13} y={midY - 13} width={26} height={26} rx={6} fill={accentHex('teal')} />
                      <text x={midX} y={midY + 5} textAnchor="middle" style={{ fontSize: 15, fontWeight: 800 }} fill="#04121a">
                        ✕
                      </text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* Stage nodes */}
            {STAGES.map((s) => {
              const reached = isReached(s.n)
              const blocked = isBlocked(s)
              const col = blocked ? 'rgb(var(--c-hairline))' : reached ? accentHex('danger') : 'rgb(var(--c-hairline))'
              const fill = reached && !blocked ? `${accentHex('danger')}26` : 'rgb(var(--c-card))'
              return (
                <g key={s.n}>
                  {reached && !blocked && !reduced && (
                    <motion.circle
                      cx={s.x}
                      cy={s.y}
                      r={30}
                      fill={accentHex('danger')}
                      initial={{ opacity: 0.3, scale: 1 }}
                      animate={{ opacity: [0.3, 0, 0.3], scale: [1, 1.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <circle cx={s.x} cy={s.y} r={28} fill={fill} stroke={col} strokeWidth={reached && !blocked ? 3 : 2} opacity={blocked ? 0.5 : 1} />
                  <text
                    x={s.x}
                    y={s.y + 5}
                    textAnchor="middle"
                    pointerEvents="none"
                    style={{ fontSize: 15, fontWeight: 800 }}
                    fill={reached && !blocked ? accentHex('danger') : 'rgb(var(--c-muted))'}
                  >
                    {s.n}
                  </text>
                  {/* Stage label */}
                  <text
                    x={s.x}
                    y={s.y < 160 ? s.y - 38 : s.y + 46}
                    textAnchor="middle"
                    pointerEvents="none"
                    className="fill-[color:rgb(var(--c-ink))]"
                    style={{ fontSize: 9, fontWeight: 700 }}
                    opacity={blocked ? 0.55 : 1}
                  >
                    {s.label.length > 26 ? `${s.label.slice(0, 24)}…` : s.label}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Stage stepper (keyboard-accessible) */}
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {STAGES.map((s) => {
              const reached = isReached(s.n)
              const blocked = isBlocked(s)
              const active = reached && !blocked
              const col = active ? accentHex('danger') : blocked ? accentHex('teal') : 'rgb(var(--c-hairline))'
              return (
                <button
                  key={s.n}
                  onClick={() => {
                    setPlaying(false)
                    setProgress(s.n)
                  }}
                  disabled={blocked}
                  aria-label={`Show stage ${s.n}: ${s.label}${blocked ? ' (blocked by segmentation)' : ''}`}
                  aria-pressed={progress === s.n}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    borderColor: col,
                    color: active ? '#04121a' : col,
                    background: active ? col : 'transparent',
                  }}
                >
                  {s.n}
                </button>
              )
            })}
          </div>
        </div>

        {/* ---- Detail panel ---- */}
        <div className="min-w-0 space-y-4">
          <AnimatePresence mode="wait">
            {progress > 0 ? (
              <motion.div
                key={`stage-${Math.min(progress, reachableMax)}`}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                className="rounded-2xl border border-hairline bg-card p-5"
                style={{ boxShadow: `inset 0 0 0 1px ${accentHex('danger')}22` }}
              >
                {(() => {
                  const current = STAGES[Math.min(progress, reachableMax) - 1]
                  const Icon = current.icon
                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${accentHex('danger')}1a`, color: accentHex('danger') }}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Stage {current.n} of 6</p>
                          <h4 className="text-base font-bold text-ink">{current.label}</h4>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted">{current.detail}</p>
                    </>
                  )
                })()}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center"
              >
                <Play className="h-8 w-8 text-cyan" />
                <p className="max-w-xs text-sm text-muted">Press Play — or click a numbered stage — to walk through the attack path.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Segmentation explainer */}
          <div
            className="rounded-2xl border p-4"
            style={
              segmented
                ? { borderColor: `${accentHex('teal')}44`, background: `${accentHex('teal')}0f` }
                : { borderColor: `${accentHex('warn')}44`, background: `${accentHex('warn')}0f` }
            }
          >
            <p
              className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
              style={{ color: segmented ? accentHex('teal') : accentHex('warn') }}
            >
              {segmented ? <ShieldCheck className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
              {segmented ? 'Segmentation applied' : 'What went wrong'}
            </p>
            <p className="text-sm leading-6 text-ink">
              {segmented
                ? 'With the vendor-facing network isolated from the payment environment, the attacker reaches stage 3 but cannot move laterally. Stages 4–6 are cut off — the point-of-sale systems and card data stay out of reach.'
                : 'Weak internal segmentation let the attacker pivot from a third-party connection all the way to point-of-sale systems. Separating networks by trust level is a key control against this lateral movement.'}
            </p>
          </div>
        </div>
      </div>
    </DiagramShell>
  )
}
