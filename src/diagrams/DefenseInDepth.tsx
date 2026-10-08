import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, BadgeCheck, DoorClosed, Laptop, Lock, ShieldCheck, Layers } from 'lucide-react'
import { DiagramShell } from '../components/DiagramShell'
import { Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type LayerKey = 'perimeter' | 'identity' | 'room' | 'device' | 'data'

interface LayerMeta {
  key: LayerKey
  n: number
  label: string
  accent: 'cyan' | 'teal' | 'violet' | 'warn' | 'danger'
  icon: typeof Building2
  role: string
  example: string
  why: string
}

// Ordered outer → inner.
const LAYERS: LayerMeta[] = [
  {
    key: 'perimeter',
    n: 1,
    label: 'Building perimeter',
    accent: 'cyan',
    icon: Building2,
    role: 'Keeps unauthorised people off the premises in the first place — the outermost physical boundary.',
    example: 'Fences, gates, locked entrances, reception desk and CCTV at the property edge.',
    why: 'Even if the gate is bypassed, an intruder still faces every inner layer before reaching data.',
  },
  {
    key: 'identity',
    n: 2,
    label: 'Identity verification',
    accent: 'teal',
    icon: BadgeCheck,
    role: 'Confirms who someone is before granting any access — people and systems must prove identity.',
    example: 'Photo ID, staff badges, multi-factor authentication (MFA) and sign-in logs.',
    why: 'A stolen badge alone is not enough if MFA and later layers still challenge the attacker.',
  },
  {
    key: 'room',
    n: 3,
    label: 'Restricted room access',
    accent: 'violet',
    icon: DoorClosed,
    role: 'Limits movement inside the building so only authorised people reach sensitive areas.',
    example: 'Badge-controlled doors, PIN keypads, locked server rooms and visitor escorting.',
    why: 'A visitor who gets inside the lobby still cannot walk into the server room.',
  },
  {
    key: 'device',
    n: 4,
    label: 'Device authentication',
    accent: 'warn',
    icon: Laptop,
    role: 'Ensures only trusted, verified devices can connect to systems and the network.',
    example: 'Device certificates, endpoint checks, screen locks and managed laptops only.',
    why: 'Reaching a terminal is useless if the device is not enrolled and authenticated.',
  },
  {
    key: 'data',
    n: 5,
    label: 'Data encryption',
    accent: 'danger',
    icon: Lock,
    role: 'Protects the data itself so it is unreadable without the right keys — the core of the model.',
    example: 'Encryption at rest and in transit, key management and least-privilege access.',
    why: 'Even if every other layer fails, encrypted data stays useless without the keys.',
  },
]

// Concentric ring radii (viewBox 0..360, centre 180,180). Outer → inner.
const RADII: Record<LayerKey, number> = {
  perimeter: 168,
  identity: 134,
  room: 100,
  device: 66,
  data: 34,
}

export default function DefenseInDepth() {
  const reduced = useReducedMotionPref()
  const [selected, setSelected] = useState<LayerKey | null>(null)

  const reset = () => setSelected(null)

  const activeMeta = selected ? LAYERS.find((l) => l.key === selected)! : null

  return (
    <DiagramShell
      id="defense-in-depth"
      title="Defense in Depth"
      description="Click a ring to explore each security layer — from the building perimeter down to the encrypted data at the centre. Layering means no single failure is catastrophic."
      onReset={reset}
      footnote="Illustrative, not exact: a simplified teaching model. Real programmes combine many overlapping physical, technical and administrative controls tailored to their risks."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        {/* ---- Concentric rings ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox="0 0 360 360"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label="Concentric defence-in-depth rings from building perimeter to data at the centre."
          >
            {LAYERS.map((l, i) => {
              const r = RADII[l.key]
              const col = accentHex(l.accent)
              const isSel = selected === l.key
              const isData = l.key === 'data'
              return (
                <g key={l.key}>
                  {/* Subtle inward pulse (gated on motion preference) */}
                  {!reduced && !selected && (
                    <motion.circle
                      cx={180}
                      cy={180}
                      r={r}
                      fill="none"
                      stroke={col}
                      strokeWidth={1.5}
                      initial={{ opacity: 0.18 }}
                      animate={{ opacity: [0.1, 0.4, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 }}
                    />
                  )}
                  <motion.circle
                    cx={180}
                    cy={180}
                    r={r}
                    fill={isData ? (isSel ? col : `${col}26`) : isSel ? `${col}1f` : 'transparent'}
                    stroke={col}
                    strokeWidth={isSel ? 4 : 2}
                    animate={{ opacity: selected && !isSel ? 0.4 : 1 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                    style={{ cursor: 'pointer' }}
                  />
                  {/* Number badge on the ring (top) */}
                  {!isData && (
                    <text
                      x={180}
                      y={180 - r + 15}
                      textAnchor="middle"
                      pointerEvents="none"
                      style={{ fontSize: 12, fontWeight: 800 }}
                      fill={col}
                    >
                      L{l.n}
                    </text>
                  )}
                  {/* Keyboard-accessible hit ring: an annulus using two concentric arcs is complex,
                      so use a thick transparent stroked circle as the target. */}
                  <circle
                    cx={180}
                    cy={180}
                    r={r}
                    fill="transparent"
                    stroke="transparent"
                    strokeWidth={isData ? r : 30}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${isSel ? 'Hide' : 'Show'} layer ${l.n}, ${l.label}`}
                    style={{ cursor: 'pointer', outline: 'none' }}
                    onClick={() => setSelected(isSel ? null : l.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelected(isSel ? null : l.key)
                      }
                    }}
                  />
                </g>
              )
            })}
            {/* Centre label */}
            <text x={180} y={184} textAnchor="middle" pointerEvents="none" style={{ fontSize: 11, fontWeight: 800 }} fill={selected === 'data' ? '#04121a' : accentHex('danger')}>
              DATA
            </text>
          </svg>

          {/* Legend / mobile selector */}
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {LAYERS.map((l) => {
              const col = accentHex(l.accent)
              const isSel = selected === l.key
              const Icon = l.icon
              return (
                <button
                  key={l.key}
                  onClick={() => setSelected(isSel ? null : l.key)}
                  aria-pressed={isSel}
                  aria-label={`${isSel ? 'Hide' : 'Show'} layer ${l.n}, ${l.label}`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: isSel ? col : 'rgb(var(--c-hairline))',
                    color: isSel ? '#04121a' : col,
                    background: isSel ? col : `${col}10`,
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  L{l.n}
                </button>
              )
            })}
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
                  <Badge color={accentHex(activeMeta.accent)}>Layer {activeMeta.n}</Badge>
                </div>
              </div>

              <p className="text-sm leading-6 text-muted">{activeMeta.role}</p>

              <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Example</p>
                <p className="text-sm leading-6 text-ink">{activeMeta.example}</p>
              </div>

              <div className="mt-auto rounded-xl border p-3" style={{ borderColor: `${accentHex('teal')}44`, background: `${accentHex('teal')}0f` }}>
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('teal') }}>
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Why layering matters
                </p>
                <p className="text-sm leading-6 text-ink">{activeMeta.why}</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center">
              <Layers className="h-8 w-8 text-cyan" />
              <p className="max-w-xs text-sm text-muted">
                Select a ring to see its role, an example, and why layering ensures no single failure exposes the data at the centre.
              </p>
            </div>
          )}
        </div>
      </div>
    </DiagramShell>
  )
}
