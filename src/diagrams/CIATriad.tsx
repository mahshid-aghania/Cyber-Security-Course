import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, FileCheck2, Activity, ShieldCheck, AlertTriangle } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Segmented, Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type PrincipleKey = 'confidentiality' | 'integrity' | 'availability'
type ScenarioKey = 'hospital' | 'university' | 'banking' | 'ecommerce'

const SCENARIOS: { value: ScenarioKey; label: string }[] = [
  { value: 'hospital', label: 'Hospital' },
  { value: 'university', label: 'University' },
  { value: 'banking', label: 'Online banking' },
  { value: 'ecommerce', label: 'E-commerce' },
]

interface PrincipleMeta {
  key: PrincipleKey
  label: string
  accent: 'cyan' | 'teal' | 'violet'
  icon: typeof Lock
  definition: string
  controls: string[]
}

const PRINCIPLES: PrincipleMeta[] = [
  {
    key: 'confidentiality',
    label: 'Confidentiality',
    accent: 'cyan',
    icon: Lock,
    definition:
      'Keeping information secret — only authorised people, processes or systems can read or access the data.',
    controls: ['Strong passwords', 'Encryption (at rest & in transit)', 'Access control / least privilege', 'Multi-factor authentication (MFA)'],
  },
  {
    key: 'integrity',
    label: 'Integrity',
    accent: 'teal',
    icon: FileCheck2,
    definition:
      'Keeping information accurate and trustworthy — data cannot be altered by unauthorised parties or by accident without detection.',
    controls: ['Cryptographic hashing', 'Audit logs', 'File integrity monitoring', 'Authorised change procedures'],
  },
  {
    key: 'availability',
    label: 'Availability',
    accent: 'violet',
    icon: Activity,
    definition:
      'Keeping information and services accessible — authorised users can reach what they need, when they need it.',
    controls: ['Backups', 'Redundant servers', 'Disaster recovery planning', 'DDoS protection'],
  },
]

interface Example {
  example: string
  consequence: string
}

const CONTENT: Record<ScenarioKey, Record<PrincipleKey, Example>> = {
  hospital: {
    confidentiality: {
      example: 'Patient medical records are encrypted and only treating clinicians can open them.',
      consequence: 'A records leak exposes diagnoses and treatments, breaching privacy law and patient trust.',
    },
    integrity: {
      example: 'A prescription dose is recorded exactly as the doctor entered it and cannot be silently changed.',
      consequence: 'A tampered dosage or allergy record could lead to a dangerous or fatal treatment error.',
    },
    availability: {
      example: 'The electronic health record system stays online so staff can access charts during emergencies.',
      consequence: 'If the system goes down (e.g. ransomware), surgeries are cancelled and care is delayed.',
    },
  },
  university: {
    confidentiality: {
      example: 'Student grades and personal records are visible only to the student and authorised staff.',
      consequence: 'Leaked student data exposes personal details and may breach data-protection obligations.',
    },
    integrity: {
      example: 'A submitted exam grade stays exactly as the examiner recorded it in the registrar system.',
      consequence: 'A tampered grade undermines academic records and the credibility of every transcript.',
    },
    availability: {
      example: 'The learning portal stays up so students can submit assignments before the deadline.',
      consequence: 'An outage at deadline time blocks submissions and disrupts teaching and assessment.',
    },
  },
  banking: {
    confidentiality: {
      example: 'Account balances and transactions are encrypted and shown only after strong authentication.',
      consequence: 'Exposed account data enables fraud, identity theft and financial loss for customers.',
    },
    integrity: {
      example: 'A transfer of $100 is recorded as exactly $100 — no amount or recipient can be altered.',
      consequence: 'Tampered transactions let attackers redirect funds or falsify balances.',
    },
    availability: {
      example: 'Online and mobile banking stay reachable so customers can pay bills and move money.',
      consequence: 'A DDoS attack or outage locks customers out of their money and erodes trust.',
    },
  },
  ecommerce: {
    confidentiality: {
      example: 'Customer payment card details are encrypted and never shown to other shoppers.',
      consequence: 'A card-data breach leads to fraud, chargebacks and regulatory penalties.',
    },
    integrity: {
      example: 'Prices and order quantities stay exactly as placed through to fulfilment.',
      consequence: 'Tampered prices or orders cause incorrect charges, lost revenue and disputes.',
    },
    availability: {
      example: 'The storefront stays online through traffic spikes like a sale or holiday rush.',
      consequence: 'Downtime during peak demand means lost sales and customers shopping elsewhere.',
    },
  },
}

// Triangle geometry (viewBox 0..400 x, 0..340 y)
const CORNERS: Record<PrincipleKey, { x: number; y: number }> = {
  confidentiality: { x: 200, y: 34 }, // top
  integrity: { x: 40, y: 300 }, // bottom-left
  availability: { x: 360, y: 300 }, // bottom-right
}

const EDGES: [PrincipleKey, PrincipleKey][] = [
  ['confidentiality', 'integrity'],
  ['integrity', 'availability'],
  ['availability', 'confidentiality'],
]

export default function CIATriad() {
  const reduced = useReducedMotionPref()
  const [scenario, setScenario] = useState<ScenarioKey>('university')
  const [selected, setSelected] = useState<PrincipleKey | null>(null)

  const reset = () => {
    setScenario('university')
    setSelected(null)
  }

  const activeMeta = selected ? PRINCIPLES.find((p) => p.key === selected)! : null

  const edgeIsActive = (a: PrincipleKey, b: PrincipleKey) =>
    selected !== null && (a === selected || b === selected)

  return (
    <DiagramShell
      id="cia-triad"
      title="CIA Triad"
      description="Click a corner to explore Confidentiality, Integrity and Availability. Switch scenarios to see how each principle plays out — and what breaks if it fails."
      onReset={reset}
      footnote="Illustrative, not exact: examples and consequences are simplified teaching scenarios. Real organisations apply many overlapping controls, and the right mix depends on their specific risks and obligations."
      controls={
        <ControlGroup label="Scenario">
          <Segmented
            ariaLabel="Choose a scenario"
            options={SCENARIOS}
            value={scenario}
            onChange={(v) => setScenario(v)}
          />
        </ControlGroup>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        {/* ---- Triangle ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox="0 0 400 340"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label="CIA triad triangle. Three corners: Confidentiality, Integrity, Availability."
          >
            {/* Edges */}
            {EDGES.map(([a, b]) => {
              const act = edgeIsActive(a, b)
              const colA = accentHex(PRINCIPLES.find((p) => p.key === a)!.accent)
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={CORNERS[a].x}
                  y1={CORNERS[a].y}
                  x2={CORNERS[b].x}
                  y2={CORNERS[b].y}
                  stroke={act ? colA : 'currentColor'}
                  className={act ? '' : 'text-[color:rgb(var(--c-hairline))]'}
                  strokeWidth={act ? 4 : 2}
                  strokeLinecap="round"
                  animate={{ opacity: act ? 1 : 0.5 }}
                  transition={{ duration: reduced ? 0 : 0.4 }}
                />
              )
            })}

            {/* Center label */}
            <text
              x={200}
              y={212}
              textAnchor="middle"
              className="fill-[color:rgb(var(--c-muted))]"
              style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2 }}
            >
              CIA
            </text>

            {/* Corners */}
            {PRINCIPLES.map((p) => {
              const c = CORNERS[p.key]
              const col = accentHex(p.accent)
              const isSel = selected === p.key
              const isTop = p.key === 'confidentiality'
              return (
                <g key={p.key}>
                  {isSel && !reduced && (
                    <motion.circle
                      cx={c.x}
                      cy={c.y}
                      r={34}
                      fill={col}
                      initial={{ opacity: 0.35, scale: 1 }}
                      animate={{ opacity: [0.3, 0, 0.3], scale: [1, 1.9, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <motion.circle
                    cx={c.x}
                    cy={c.y}
                    r={34}
                    fill={isSel ? col : 'rgb(var(--c-card))'}
                    stroke={col}
                    strokeWidth={isSel ? 3 : 2}
                    animate={{ scale: isSel ? 1.08 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ cursor: 'pointer' }}
                  />
                  {/* Letter inside the node */}
                  <text
                    x={c.x}
                    y={c.y + 6}
                    textAnchor="middle"
                    pointerEvents="none"
                    style={{ fontSize: 22, fontWeight: 800 }}
                    fill={isSel ? '#04121a' : col}
                  >
                    {p.label.charAt(0)}
                  </text>
                  {/* Label */}
                  <text
                    x={c.x}
                    y={isTop ? c.y - 46 : c.y + 58}
                    textAnchor="middle"
                    pointerEvents="none"
                    className="fill-[color:rgb(var(--c-ink))]"
                    style={{ fontSize: 15, fontWeight: 700 }}
                  >
                    {p.label}
                  </text>
                  {/* Transparent hit target (larger, keyboard accessible) */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={40}
                    fill="transparent"
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${isSel ? 'Hide' : 'Show'} ${p.label} details`}
                    style={{ cursor: 'pointer', outline: 'none' }}
                    onClick={() => setSelected(isSel ? null : p.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelected(isSel ? null : p.key)
                      }
                    }}
                  />
                </g>
              )
            })}
          </svg>

          {/* Quick legend / mobile-friendly selector */}
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {PRINCIPLES.map((p) => {
              const col = accentHex(p.accent)
              const isSel = selected === p.key
              const Icon = p.icon
              return (
                <button
                  key={p.key}
                  onClick={() => setSelected(isSel ? null : p.key)}
                  aria-pressed={isSel}
                  aria-label={`${isSel ? 'Hide' : 'Show'} ${p.label} details`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: isSel ? col : 'rgb(var(--c-hairline))',
                    color: isSel ? '#04121a' : col,
                    background: isSel ? col : `${col}10`,
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ---- Detail panel ---- */}
        <div className="min-w-0">
          {activeMeta ? (
            <motion.div
              key={`${activeMeta.key}-${scenario}`}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
              className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-card p-5"
              style={{ boxShadow: `inset 0 0 0 1px ${accentHex(activeMeta.accent)}22` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${accentHex(activeMeta.accent)}1a`, color: accentHex(activeMeta.accent) }}
                >
                  <activeMeta.icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-ink">{activeMeta.label}</h4>
                  <p className="text-xs text-muted">{SCENARIOS.find((s) => s.value === scenario)!.label} scenario</p>
                </div>
              </div>

              <div>
                <p className="text-sm leading-6 text-muted">{activeMeta.definition}</p>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Real-world example</p>
                <p className="text-sm leading-6 text-ink">{CONTENT[scenario][activeMeta.key].example}</p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <ShieldCheck className="h-3.5 w-3.5" style={{ color: accentHex(activeMeta.accent) }} />
                  Security controls
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeMeta.controls.map((c) => (
                    <Badge key={c} color={accentHex(activeMeta.accent)}>
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-auto rounded-xl border p-3" style={{ borderColor: `${accentHex('danger')}44`, background: `${accentHex('danger')}0f` }}>
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('danger') }}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  If violated
                </p>
                <p className="text-sm leading-6 text-ink">{CONTENT[scenario][activeMeta.key].consequence}</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center">
              <ShieldCheck className="h-8 w-8 text-cyan" />
              <p className="max-w-xs text-sm text-muted">
                Select a corner of the triangle to see its definition, a real-world example, the controls that protect it, and what happens if it is violated.
              </p>
            </div>
          )}
        </div>
      </div>
    </DiagramShell>
  )
}
