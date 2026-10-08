import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  ShieldCheck,
  Radar,
  Siren,
  Undo2,
  Landmark,
  BookOpen,
  Lightbulb,
  ListTree,
  GitBranch,
} from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Segmented, accentHex } from '../components/ui'
import type { AccentKey } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type Edition = 'v1' | 'v2'

type FnKey = 'govern' | 'identify' | 'protect' | 'detect' | 'respond' | 'recover'

interface Fn {
  key: FnKey
  label: string
  accent: AccentKey
  icon: typeof Search
  /** Only present in CSF 2.0; GOVERN sits in the centre. */
  v2only?: boolean
  definition: string
  example: string
  activities: string[]
  relationship: string
}

const FUNCTIONS: Fn[] = [
  {
    key: 'govern',
    label: 'Govern',
    accent: 'warn',
    icon: Landmark,
    v2only: true,
    definition:
      'Establish and monitor the organisation’s cybersecurity risk-management strategy, expectations and policy — the oversight that steers every other function.',
    example:
      'A board-approved risk appetite, clear roles and responsibilities, and a policy that the other five functions are measured against.',
    activities: [
      'Set risk-management strategy and risk appetite',
      'Define roles, responsibilities and accountability',
      'Oversee policy, supply chain and compliance',
    ],
    relationship:
      'Sits at the centre of CSF 2.0 and informs all five other functions — Identify, Protect, Detect, Respond and Recover all operate within the direction Govern sets.',
  },
  {
    key: 'identify',
    label: 'Identify',
    accent: 'cyan',
    icon: Search,
    definition:
      'Develop an understanding of the organisation’s assets, systems, data and the cybersecurity risks to them.',
    example:
      'Maintaining an inventory of hardware, software and data, and assessing which risks matter most to the business.',
    activities: ['Asset management', 'Risk assessment', 'Business-environment mapping'],
    relationship:
      'Comes first: its asset and risk picture feeds Protect (what to defend) and Detect (what to watch). In CSF 2.0 it is directed by Govern.',
  },
  {
    key: 'protect',
    label: 'Protect',
    accent: 'teal',
    icon: ShieldCheck,
    definition:
      'Develop and implement safeguards to ensure delivery of critical services and limit the impact of a potential event.',
    example:
      'Access control, encryption, staff awareness training, and routine maintenance of protective technology.',
    activities: ['Access control', 'Awareness training', 'Data security & maintenance'],
    relationship:
      'Acts on what Identify found, reducing the attack surface. Strong Protect lowers how often Detect and Respond are needed.',
  },
  {
    key: 'detect',
    label: 'Detect',
    accent: 'violet',
    icon: Radar,
    definition:
      'Develop and implement activities to identify the occurrence of a cybersecurity event in a timely way.',
    example:
      'Continuous monitoring, intrusion-detection systems, and alerting on anomalies in logs and network traffic.',
    activities: ['Continuous monitoring', 'Anomaly & event detection', 'Detection processes'],
    relationship:
      'Watches the assets Identify catalogued and the controls Protect put in place; when it spots something, it triggers Respond.',
  },
  {
    key: 'respond',
    label: 'Respond',
    accent: 'danger',
    icon: Siren,
    definition:
      'Develop and implement activities to take action regarding a detected cybersecurity incident.',
    example:
      'Executing the incident-response plan: containing the threat, communicating with stakeholders, and analysing the event.',
    activities: ['Response planning', 'Containment & mitigation', 'Communications & analysis'],
    relationship:
      'Kicks in when Detect raises an incident, works to contain it, and hands over to Recover to restore normal operations.',
  },
  {
    key: 'recover',
    label: 'Recover',
    accent: 'warn',
    icon: Undo2,
    definition:
      'Develop and implement activities to maintain resilience and restore capabilities impaired by a cybersecurity incident.',
    example:
      'Restoring systems from backups, executing the recovery plan, and feeding lessons learned back into the programme.',
    activities: ['Recovery planning', 'Improvements', 'Communications'],
    relationship:
      'Follows Respond to bring services back, then feeds lessons into Identify and Protect — closing the loop for the next event.',
  },
]

const SIZE = 420
const CENTER = SIZE / 2
const OUTER_R = 148
const NODE_R = 42

/** The five outer functions, in display order. */
const OUTER_KEYS: FnKey[] = ['identify', 'protect', 'detect', 'respond', 'recover']

function outerAngle(i: number): number {
  // Five functions evenly spaced, first at the top.
  return -Math.PI / 2 + (i / OUTER_KEYS.length) * Math.PI * 2
}

function outerPoint(i: number): { x: number; y: number } {
  const a = outerAngle(i)
  return { x: CENTER + OUTER_R * Math.cos(a), y: CENTER + OUTER_R * Math.sin(a) }
}

export default function NISTCSF() {
  const reduced = useReducedMotionPref()
  const [edition, setEdition] = useState<Edition>('v2')
  const [selected, setSelected] = useState<FnKey | null>(null)

  const reset = () => setSelected(null)

  // GOVERN only exists in 2.0; clear a stale selection when switching to v1.
  const changeEdition = (e: Edition) => {
    setEdition(e)
    if (e === 'v1' && selected === 'govern') setSelected(null)
  }

  const govern = FUNCTIONS.find((f) => f.key === 'govern')!
  const active = selected ? FUNCTIONS.find((f) => f.key === selected)! : null
  const editionLabel = edition === 'v2' ? 'NIST CSF 2.0' : 'Original five-function model'

  const outerNode = (fnKey: FnKey, i: number) => {
    const f = FUNCTIONS.find((fn) => fn.key === fnKey)!
    const { x, y } = outerPoint(i)
    const col = accentHex(f.accent)
    const isSel = selected === f.key
    const dim = selected !== null && !isSel
    const Icon = f.icon
    return (
      <g key={f.key} style={{ cursor: 'pointer' }}>
        <motion.circle
          cx={x}
          cy={y}
          r={NODE_R}
          fill={isSel ? col : 'rgb(var(--c-card))'}
          stroke={col}
          strokeWidth={isSel ? 3 : 2}
          animate={{ opacity: dim ? 0.4 : 1 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        />
        <foreignObject x={x - 12} y={y - 20} width={24} height={24} style={{ pointerEvents: 'none' }}>
          <div
            className="flex h-6 w-6 items-center justify-center"
            style={{ color: isSel ? '#04121a' : col, opacity: dim ? 0.5 : 1 }}
          >
            <Icon className="h-5 w-5" />
          </div>
        </foreignObject>
        <text
          x={x}
          y={y + 16}
          textAnchor="middle"
          pointerEvents="none"
          style={{ fontSize: 11, fontWeight: 700, opacity: dim ? 0.5 : 1 }}
          fill={isSel ? '#04121a' : col}
        >
          {f.label}
        </text>
        <circle
          cx={x}
          cy={y}
          r={NODE_R + 3}
          fill="transparent"
          role="button"
          tabIndex={0}
          aria-pressed={isSel}
          aria-label={`${isSel ? 'Hide' : 'Show'} details for the ${f.label} function`}
          style={{ cursor: 'pointer', outline: 'none' }}
          onClick={() => setSelected(isSel ? null : f.key)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setSelected(isSel ? null : f.key)
            }
          }}
        />
      </g>
    )
  }

  return (
    <DiagramShell
      id="nist-csf"
      title="NIST Cybersecurity Framework"
      description="The NIST CSF organises cybersecurity into high-level functions arranged around a circle. Switch between the original five-function model and CSF 2.0, which adds Govern in the centre. Select any function to inspect it."
      onReset={reset}
      footnote="The two editions are labelled distinctly: CSF 2.0 adds a sixth function, Govern. NIST publishes the framework as voluntary guidance — it does not certify or accredit organisations against the CSF."
      controls={
        <ControlGroup label="Edition">
          <Segmented<Edition>
            ariaLabel="NIST CSF edition"
            value={edition}
            onChange={changeEdition}
            options={[
              { value: 'v1', label: 'Original five functions' },
              { value: 'v2', label: 'NIST CSF 2.0' },
            ]}
          />
        </ControlGroup>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        {/* ---- Radial diagram ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-center">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                borderColor: edition === 'v2' ? `${accentHex('warn')}66` : `${accentHex('cyan')}66`,
                color: edition === 'v2' ? accentHex('warn') : accentHex('cyan'),
                background: edition === 'v2' ? `${accentHex('warn')}12` : `${accentHex('cyan')}12`,
              }}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Showing: {editionLabel}
            </span>
          </div>

          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label={`Radial diagram of the NIST Cybersecurity Framework functions — ${editionLabel}.`}
          >
            {/* Connector spokes from Govern to each outer function (CSF 2.0 only) */}
            {edition === 'v2' &&
              OUTER_KEYS.map((k, i) => {
                const { x, y } = outerPoint(i)
                return (
                  <line
                    key={`spoke-${k}`}
                    x1={CENTER}
                    y1={CENTER}
                    x2={x}
                    y2={y}
                    stroke={accentHex('warn')}
                    strokeWidth={2}
                    strokeDasharray="4 5"
                    opacity={selected ? 0.25 : 0.55}
                  />
                )
              })}

            {/* Guide circle through the outer functions */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={OUTER_R}
              fill="none"
              className="stroke-[color:rgb(var(--c-hairline))]"
              strokeWidth={1.5}
              strokeDasharray="2 6"
              opacity={0.6}
            />

            {/* Outer functions */}
            {OUTER_KEYS.map((k, i) => outerNode(k, i))}

            {/* Centre */}
            {edition === 'v2' ? (
              (() => {
                const col = accentHex(govern.accent)
                const isSel = selected === 'govern'
                const dim = selected !== null && !isSel
                const Icon = govern.icon
                return (
                  <g style={{ cursor: 'pointer' }}>
                    <motion.circle
                      cx={CENTER}
                      cy={CENTER}
                      r={NODE_R + 6}
                      fill={isSel ? col : 'rgb(var(--c-card))'}
                      stroke={col}
                      strokeWidth={isSel ? 3.5 : 2.5}
                      animate={{ opacity: dim ? 0.5 : 1 }}
                      transition={{ duration: reduced ? 0 : 0.3 }}
                    />
                    <foreignObject
                      x={CENTER - 13}
                      y={CENTER - 22}
                      width={26}
                      height={26}
                      style={{ pointerEvents: 'none' }}
                    >
                      <div
                        className="flex h-[26px] w-[26px] items-center justify-center"
                        style={{ color: isSel ? '#04121a' : col, opacity: dim ? 0.5 : 1 }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </foreignObject>
                    <text
                      x={CENTER}
                      y={CENTER + 18}
                      textAnchor="middle"
                      pointerEvents="none"
                      style={{ fontSize: 12, fontWeight: 800, opacity: dim ? 0.5 : 1 }}
                      fill={isSel ? '#04121a' : col}
                    >
                      Govern
                    </text>
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={NODE_R + 9}
                      fill="transparent"
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSel}
                      aria-label={`${isSel ? 'Hide' : 'Show'} details for the Govern function, added in CSF 2.0 at the centre`}
                      style={{ cursor: 'pointer', outline: 'none' }}
                      onClick={() => setSelected(isSel ? null : 'govern')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelected(isSel ? null : 'govern')
                        }
                      }}
                    />
                  </g>
                )
              })()
            ) : (
              <text
                x={CENTER}
                y={CENTER}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[color:rgb(var(--c-muted))]"
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2 }}
              >
                NIST CSF
              </text>
            )}
          </svg>

          {/* Mobile-friendly selector */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {FUNCTIONS.filter((f) => edition === 'v2' || !f.v2only).map((f) => {
              const col = accentHex(f.accent)
              const isSel = selected === f.key
              const Icon = f.icon
              return (
                <button
                  key={f.key}
                  onClick={() => setSelected(isSel ? null : f.key)}
                  aria-pressed={isSel}
                  aria-label={`${isSel ? 'Hide' : 'Show'} ${f.label} details`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: isSel ? col : 'rgb(var(--c-hairline))',
                    color: isSel ? '#04121a' : col,
                    background: isSel ? col : `${col}10`,
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {f.label}
                  {f.v2only && <span className="opacity-70">(2.0)</span>}
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
                    {active.v2only ? 'CSF 2.0 function (centre)' : 'Core CSF function'}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Definition</p>
                <p className="text-sm leading-6 text-ink">{active.definition}</p>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <Lightbulb className="h-3.5 w-3.5" style={{ color: accentHex(active.accent) }} />
                  Example
                </p>
                <p className="text-sm leading-6 text-ink">{active.example}</p>
              </div>

              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <ListTree className="h-3.5 w-3.5" style={{ color: accentHex(active.accent) }} />
                  Typical activities
                </p>
                <ul className="flex flex-col gap-1.5">
                  {active.activities.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm leading-6 text-ink">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: accentHex(active.accent) }}
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <GitBranch className="h-3.5 w-3.5" style={{ color: accentHex(active.accent) }} />
                  Relationship to other functions
                </p>
                <p className="text-sm leading-6 text-ink">{active.relationship}</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center">
              <Radar className="h-8 w-8 text-cyan" />
              <p className="max-w-xs text-sm text-muted">
                Viewing the <span className="font-semibold text-ink">{editionLabel}</span>. Select any function to see
                its definition, an example, typical activities, and how it relates to the others.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {FUNCTIONS.filter((f) => edition === 'v2' || !f.v2only).map((f) => (
                  <span
                    key={f.key}
                    className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium"
                    style={{
                      borderColor: `${accentHex(f.accent)}55`,
                      color: accentHex(f.accent),
                      background: `${accentHex(f.accent)}14`,
                    }}
                  >
                    {f.label}
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
