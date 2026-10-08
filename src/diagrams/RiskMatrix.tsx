import { useState } from 'react'
import { motion } from 'framer-motion'
import { Laptop, ServerCog, Fish, Factory } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Badge } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type Band = 'Low' | 'Medium' | 'High' | 'Critical'

interface Scenario {
  key: string
  label: string
  icon: typeof Laptop
  likelihood: number
  impact: number
  explanation: string
}

const SCENARIOS: Scenario[] = [
  {
    key: 'laptop',
    label: 'Lost employee laptop',
    icon: Laptop,
    likelihood: 4,
    impact: 2,
    explanation:
      'Laptops go missing fairly often (high likelihood), but if the disk is encrypted and the device can be remotely wiped, the business impact of a single lost device is usually limited.',
  },
  {
    key: 'server',
    label: 'Unpatched server',
    icon: ServerCog,
    likelihood: 3,
    impact: 5,
    explanation:
      'A known vulnerability on an internet-facing server may or may not be exploited (moderate likelihood), but a successful compromise could expose critical data or take down a core service — a severe impact.',
  },
  {
    key: 'phishing',
    label: 'Phishing incident',
    icon: Fish,
    likelihood: 5,
    impact: 3,
    explanation:
      'Phishing emails reach staff constantly, so the likelihood of an attempt landing is very high. The impact of one stolen credential is moderate if MFA and monitoring contain the damage.',
  },
  {
    key: 'supplier',
    label: 'Supplier outage',
    icon: Factory,
    likelihood: 2,
    impact: 4,
    explanation:
      'A key supplier going offline is relatively uncommon (lower likelihood), but if you depend on them for a critical service, an outage can seriously disrupt operations — a high impact.',
  },
]

function scoreBand(score: number): { band: Band; color: string } {
  if (score >= 15) return { band: 'Critical', color: '#FB7185' }
  if (score >= 9) return { band: 'High', color: '#F4BE62' }
  if (score >= 4) return { band: 'Medium', color: '#5FE0BE' }
  return { band: 'Low', color: '#57D8ED' }
}

/** Colour a cell by its risk score on a low -> high gradient. */
function cellColor(score: number): string {
  if (score >= 15) return '#FB7185'
  if (score >= 12) return '#F79A6B'
  if (score >= 9) return '#F4BE62'
  if (score >= 6) return '#C7D77A'
  if (score >= 4) return '#5FE0BE'
  return '#57D8ED'
}

const L_LABELS = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost certain']
const I_LABELS = ['Negligible', 'Minor', 'Moderate', 'Major', 'Severe']

export default function RiskMatrix() {
  const reduced = useReducedMotionPref()
  const [likelihood, setLikelihood] = useState(3)
  const [impact, setImpact] = useState(3)
  const [activeScenario, setActiveScenario] = useState<string | null>(null)

  const reset = () => {
    setLikelihood(3)
    setImpact(3)
    setActiveScenario(null)
  }

  const applyScenario = (s: Scenario) => {
    setLikelihood(s.likelihood)
    setImpact(s.impact)
    setActiveScenario(s.key)
  }

  const score = likelihood * impact
  const { band, color } = scoreBand(score)
  const scenario = activeScenario ? SCENARIOS.find((s) => s.key === activeScenario)! : null

  // Grid geometry (SVG viewBox).
  const CELL = 56
  const PAD_L = 92 // space for impact axis labels
  const PAD_B = 48 // space for likelihood axis labels
  const PAD_T = 8
  const gridW = CELL * 5
  const gridH = CELL * 5
  const W = PAD_L + gridW + 8
  const H = PAD_T + gridH + PAD_B

  const markerCol = likelihood - 1
  const markerRow = 5 - impact
  const markerX = PAD_L + markerCol * CELL
  const markerY = PAD_T + markerRow * CELL

  return (
    <DiagramShell
      id="risk-matrix"
      title="Risk Matrix"
      description="Rate a risk by how likely it is and how damaging it would be. The cell lights up and the score (Likelihood × Impact) maps to a qualitative band. Try an example scenario or move the sliders."
      onReset={reset}
      footnote="Illustrative only: this is one common qualitative scoring method (risk score = likelihood × impact) with example L/I values chosen for teaching. It is not a universal formula — real organisations tune their scales, bands and weightings to their own context and risk appetite."
      controls={
        <>
          <ControlGroup label="Likelihood">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={likelihood}
              aria-label="Likelihood from 1 to 5"
              onChange={(e) => {
                setLikelihood(Number(e.target.value))
                setActiveScenario(null)
              }}
              className="w-32 accent-cyan"
            />
            <span className="w-4 text-sm font-semibold tabular-nums text-ink">{likelihood}</span>
          </ControlGroup>
          <ControlGroup label="Impact">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={impact}
              aria-label="Impact from 1 to 5"
              onChange={(e) => {
                setImpact(Number(e.target.value))
                setActiveScenario(null)
              }}
              className="w-32 accent-cyan"
            />
            <span className="w-4 text-sm font-semibold tabular-nums text-ink">{impact}</span>
          </ControlGroup>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)]">
        {/* ---- Matrix ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label={`5 by 5 risk matrix. Horizontal axis is likelihood 1 to 5, vertical axis is impact 1 to 5. Current selection: likelihood ${likelihood}, impact ${impact}, score ${score}, ${band} risk.`}
          >
            {/* Axis titles */}
            <text
              x={PAD_L + gridW / 2}
              y={H - 6}
              textAnchor="middle"
              className="fill-[color:rgb(var(--c-muted))]"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}
            >
              LIKELIHOOD →
            </text>
            <text
              transform={`translate(14, ${PAD_T + gridH / 2}) rotate(-90)`}
              textAnchor="middle"
              className="fill-[color:rgb(var(--c-muted))]"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}
            >
              IMPACT →
            </text>

            {/* Cells: row 0 = impact 5 (top), row 4 = impact 1 (bottom) */}
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((__, col) => {
                const l = col + 1
                const i = 5 - row
                const s = l * i
                const x = PAD_L + col * CELL
                const y = PAD_T + row * CELL
                const isActive = l === likelihood && i === impact
                return (
                  <g key={`${row}-${col}`}>
                    <rect
                      x={x + 2}
                      y={y + 2}
                      width={CELL - 4}
                      height={CELL - 4}
                      rx={8}
                      fill={cellColor(s)}
                      opacity={isActive ? 1 : 0.32}
                    />
                    <text
                      x={x + CELL / 2}
                      y={y + CELL / 2 + 4}
                      textAnchor="middle"
                      pointerEvents="none"
                      style={{ fontSize: 13, fontWeight: 700 }}
                      fill="#04121a"
                      opacity={isActive ? 1 : 0.55}
                    >
                      {s}
                    </text>
                  </g>
                )
              })
            )}

            {/* Highlighted marker on the active cell */}
            <motion.rect
              x={markerX + 1}
              y={markerY + 1}
              width={CELL - 2}
              height={CELL - 2}
              rx={9}
              fill="none"
              stroke="#F4F7FC"
              strokeWidth={3}
              initial={false}
              animate={{ x: markerX + 1, y: markerY + 1 }}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 26 }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.45))' }}
            />

            {/* Likelihood axis numbers */}
            {Array.from({ length: 5 }).map((_, col) => (
              <text
                key={`lx-${col}`}
                x={PAD_L + col * CELL + CELL / 2}
                y={PAD_T + gridH + 18}
                textAnchor="middle"
                className="fill-[color:rgb(var(--c-ink))]"
                style={{ fontSize: 12, fontWeight: 700 }}
              >
                {col + 1}
              </text>
            ))}
            {/* Impact axis numbers */}
            {Array.from({ length: 5 }).map((_, row) => (
              <text
                key={`iy-${row}`}
                x={PAD_L - 10}
                y={PAD_T + row * CELL + CELL / 2 + 4}
                textAnchor="end"
                className="fill-[color:rgb(var(--c-ink))]"
                style={{ fontSize: 12, fontWeight: 700 }}
              >
                {5 - row}
              </text>
            ))}
          </svg>
        </div>

        {/* ---- Readout panel ---- */}
        <div className="flex min-w-0 flex-col gap-4">
          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: `${color}55`, background: `${color}12` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Risk score</p>
            <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="text-4xl font-black tabular-nums text-ink">{score}</span>
              <span className="pb-1 text-sm text-muted">
                = {likelihood} <span className="opacity-60">({L_LABELS[likelihood - 1]})</span> ×{' '}
                {impact} <span className="opacity-60">({I_LABELS[impact - 1]})</span>
              </span>
            </div>
            <div className="mt-3">
              <Badge color={color}>{band} risk</Badge>
            </div>
          </div>

          {scenario ? (
            <motion.div
              key={scenario.key}
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
              className="rounded-2xl border border-hairline bg-card p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan/15 text-cyan">
                  <scenario.icon className="h-4 w-4" />
                </span>
                <h4 className="text-sm font-bold text-ink">{scenario.label}</h4>
              </div>
              <p className="text-sm leading-6 text-muted">{scenario.explanation}</p>
            </motion.div>
          ) : (
            <p className="rounded-2xl border border-dashed border-hairline bg-surface/40 p-4 text-sm leading-6 text-muted">
              Pick an example scenario below, or drag the sliders to place your own risk on the
              matrix.
            </p>
          )}

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Example scenarios
            </p>
            <div className="flex flex-wrap gap-2">
              {SCENARIOS.map((s) => {
                const isActive = activeScenario === s.key
                const Icon = s.icon
                return (
                  <button
                    key={s.key}
                    onClick={() => applyScenario(s)}
                    aria-pressed={isActive}
                    aria-label={`Load scenario: ${s.label}`}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
                    style={{
                      borderColor: isActive ? '#57D8ED' : 'rgb(var(--c-hairline))',
                      color: isActive ? '#04121a' : '#57D8ED',
                      background: isActive ? '#57D8ED' : 'rgb(87 216 237 / 0.08)',
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </DiagramShell>
  )
}
