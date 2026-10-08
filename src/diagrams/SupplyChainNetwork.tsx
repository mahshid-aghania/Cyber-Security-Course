import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Cloud, CreditCard, Code2, Wrench, Truck, Network, Database } from 'lucide-react'
import { DiagramShell } from '../components/DiagramShell'
import { Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type RiskLevel = 'Low' | 'Medium' | 'High'
type SupplierKey = 'cloud' | 'payment' | 'software' | 'contractor' | 'logistics'

interface Supplier {
  key: SupplierKey
  label: string
  icon: typeof Cloud
  // Node position (viewBox 0..440 x, 0..360 y). Centre org at 220,180.
  x: number
  y: number
  access: string
  dependency: string
  risk: RiskLevel
}

const RISK_ACCENT: Record<RiskLevel, 'teal' | 'warn' | 'danger'> = {
  Low: 'teal',
  Medium: 'warn',
  High: 'danger',
}

const SUPPLIERS: Supplier[] = [
  {
    key: 'cloud',
    label: 'Cloud provider',
    icon: Cloud,
    x: 220,
    y: 40,
    access: 'Hosts core applications and stores large volumes of customer and business data.',
    dependency: 'Critical — most services run on this platform; an outage halts operations.',
    risk: 'High',
  },
  {
    key: 'payment',
    label: 'Payment processor',
    icon: CreditCard,
    x: 400,
    y: 120,
    access: 'Handles cardholder data and processes transactions on the organisation’s behalf.',
    dependency: 'High — revenue collection depends on it; strictly regulated (e.g. PCI DSS).',
    risk: 'High',
  },
  {
    key: 'software',
    label: 'Software vendor',
    icon: Code2,
    x: 360,
    y: 300,
    access: 'Supplies applications and pushes software updates into the environment.',
    dependency: 'Medium — a compromised update could introduce malware across many systems.',
    risk: 'Medium',
  },
  {
    key: 'contractor',
    label: 'IT contractor',
    icon: Wrench,
    x: 80,
    y: 300,
    access: 'Holds remote administrative access for maintenance and support tasks.',
    dependency: 'Medium — privileged access makes stolen credentials especially damaging.',
    risk: 'Medium',
  },
  {
    key: 'logistics',
    label: 'Logistics provider',
    icon: Truck,
    x: 40,
    y: 120,
    access: 'Receives shipping addresses and order details to deliver goods.',
    dependency: 'Low — limited data exposure and easier to substitute with alternatives.',
    risk: 'Low',
  },
]

const ORG = { x: 220, y: 180 }

export default function SupplyChainNetwork() {
  const reduced = useReducedMotionPref()
  const [selected, setSelected] = useState<SupplierKey | null>(null)

  const reset = () => setSelected(null)

  const activeMeta = selected ? SUPPLIERS.find((s) => s.key === selected)! : null

  return (
    <DiagramShell
      id="supply-chain-network"
      title="Supply Chain Network"
      description="Click a supplier to see what access and data they hold, how critical they are, and an illustrative risk rating. Edges and nodes are coloured by risk."
      onReset={reset}
      footnote="Risk ratings shown here are illustrative, fictional examples for teaching only — they do not reflect any real supplier. Real third-party risk is assessed case by case against contracts, data handled and security posture."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        {/* ---- Network graph ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox="0 0 440 360"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label="Supply-chain network: a central organisation connected to five suppliers."
          >
            {/* Edges */}
            {SUPPLIERS.map((s) => {
              const col = accentHex(RISK_ACCENT[s.risk])
              const isSel = selected === s.key
              return (
                <motion.line
                  key={`edge-${s.key}`}
                  x1={ORG.x}
                  y1={ORG.y}
                  x2={s.x}
                  y2={s.y}
                  stroke={col}
                  strokeWidth={isSel ? 4 : 2.5}
                  strokeLinecap="round"
                  animate={{ opacity: selected && !isSel ? 0.3 : 0.85 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                />
              )
            })}

            {/* Central organisation node */}
            <g>
              <circle cx={ORG.x} cy={ORG.y} r={40} fill={`${accentHex('cyan')}1f`} stroke={accentHex('cyan')} strokeWidth={2.5} />
              <text x={ORG.x} y={ORG.y - 2} textAnchor="middle" pointerEvents="none" className="fill-[color:rgb(var(--c-ink))]" style={{ fontSize: 11, fontWeight: 800 }}>
                Your
              </text>
              <text x={ORG.x} y={ORG.y + 12} textAnchor="middle" pointerEvents="none" className="fill-[color:rgb(var(--c-ink))]" style={{ fontSize: 11, fontWeight: 800 }}>
                org
              </text>
            </g>

            {/* Supplier nodes */}
            {SUPPLIERS.map((s) => {
              const col = accentHex(RISK_ACCENT[s.risk])
              const isSel = selected === s.key
              return (
                <g key={s.key}>
                  <motion.circle
                    cx={s.x}
                    cy={s.y}
                    r={30}
                    fill={isSel ? col : `${col}1f`}
                    stroke={col}
                    strokeWidth={isSel ? 3.5 : 2}
                    animate={{ scale: isSel ? 1.08 : 1, opacity: selected && !isSel ? 0.55 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ cursor: 'pointer', transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  <text
                    x={s.x}
                    y={s.y + 48}
                    textAnchor="middle"
                    pointerEvents="none"
                    className="fill-[color:rgb(var(--c-ink))]"
                    style={{ fontSize: 10, fontWeight: 700 }}
                  >
                    {s.label}
                  </text>
                  {/* Hit target */}
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={34}
                    fill="transparent"
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${isSel ? 'Hide' : 'Show'} ${s.label} details, illustrative risk ${s.risk}`}
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

          {/* Risk legend */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {(['Low', 'Medium', 'High'] as RiskLevel[]).map((r) => (
              <span key={r} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: accentHex(RISK_ACCENT[r]) }} />
                {r} (illustrative)
              </span>
            ))}
          </div>
        </div>

        {/* ---- Detail panel ---- */}
        <div className="min-w-0">
          {activeMeta ? (
            <motion.div
              key={activeMeta.key}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
              className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-card p-5"
              style={{ boxShadow: `inset 0 0 0 1px ${accentHex(RISK_ACCENT[activeMeta.risk])}22` }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${accentHex(RISK_ACCENT[activeMeta.risk])}1a`, color: accentHex(RISK_ACCENT[activeMeta.risk]) }}
                  >
                    <activeMeta.icon className="h-5 w-5" />
                  </span>
                  <h4 className="text-base font-bold text-ink">{activeMeta.label}</h4>
                </div>
                <Badge color={accentHex(RISK_ACCENT[activeMeta.risk])}>{activeMeta.risk} risk*</Badge>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Access &amp; data held</p>
                <p className="text-sm leading-6 text-ink">{activeMeta.access}</p>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Dependency / criticality</p>
                <p className="text-sm leading-6 text-ink">{activeMeta.dependency}</p>
              </div>

              <p className="mt-auto text-xs italic text-muted">
                * The {activeMeta.risk} rating is a fictional, illustrative example for teaching — not an assessment of any real supplier.
              </p>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center">
              <Network className="h-8 w-8 text-cyan" />
              <p className="max-w-xs text-sm text-muted">
                Select a supplier to see what access and data they hold, how critical they are, and an illustrative risk rating.
              </p>
              <Database className="h-4 w-4 text-muted/60" />
            </div>
          )}
        </div>
      </div>
    </DiagramShell>
  )
}
