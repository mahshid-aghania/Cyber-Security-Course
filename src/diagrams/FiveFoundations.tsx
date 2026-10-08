import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings2, Network, KeyRound, RefreshCw, ShieldAlert, Target, Lightbulb, AlertTriangle } from 'lucide-react'
import { DiagramShell } from '../components/DiagramShell'
import { Badge, accentHex } from '../components/ui'
import type { AccentKey } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type PillarKey =
  | 'secure-configuration'
  | 'secure-networks'
  | 'access-control'
  | 'patch-management'
  | 'malware-protection'

interface Pillar {
  key: PillarKey
  label: string
  accent: AccentKey
  icon: typeof Settings2
  definition: string
  purpose: string
  example: string
  withoutIt: string
}

const PILLARS: Pillar[] = [
  {
    key: 'secure-configuration',
    label: 'Secure configuration',
    accent: 'cyan',
    icon: Settings2,
    definition:
      'Setting up devices and software so they are hardened by default — removing or disabling anything that is not needed.',
    purpose:
      'Reduce the attack surface by closing unnecessary doors before an attacker can find and use them.',
    example:
      'Disabling unused accounts and services, changing default passwords, and removing pre-installed software you do not use.',
    withoutIt:
      'Default passwords, open ports and unused services hand attackers easy, well-known ways in with no effort required.',
  },
  {
    key: 'secure-networks',
    label: 'Secure networks',
    accent: 'teal',
    icon: Network,
    definition:
      'Using firewalls and boundary protection to control the traffic that is allowed in and out of your networks and devices.',
    purpose:
      'Create a protected boundary so only legitimate, expected connections can reach your systems.',
    example:
      'A properly configured firewall on the internet boundary, plus the firewall built into each laptop, blocking unsolicited inbound connections.',
    withoutIt:
      'Systems are directly exposed to the internet, letting attackers scan and connect to services that should never be publicly reachable.',
  },
  {
    key: 'access-control',
    label: 'Access control',
    accent: 'violet',
    icon: KeyRound,
    definition:
      'Making sure people and accounts only have access to the data and services they genuinely need to do their job.',
    purpose:
      'Limit the damage any single account can do, and keep administrative powers in the hands of a trusted few.',
    example:
      'Giving staff standard user accounts, reserving admin accounts for admin tasks only, and removing access promptly when people leave.',
    withoutIt:
      'A single compromised account — especially an over-privileged or admin one — can be used to reach and ruin the whole estate.',
  },
  {
    key: 'patch-management',
    label: 'Patch management',
    accent: 'warn',
    icon: RefreshCw,
    definition:
      'Keeping operating systems, applications and firmware up to date by applying security updates (patches) promptly.',
    purpose:
      'Close known vulnerabilities before attackers can weaponise them, keeping software supported and current.',
    example:
      'Enabling automatic updates and applying critical security patches within days of release; retiring software no longer supported by its vendor.',
    withoutIt:
      'Unpatched, publicly known flaws stay open — exactly the gaps that mass exploits and worms race to abuse.',
  },
  {
    key: 'malware-protection',
    label: 'Malware protection',
    accent: 'danger',
    icon: ShieldAlert,
    definition:
      'Defending devices against malicious software using anti-malware tools, allow-lists, and safe-browsing controls.',
    purpose:
      'Detect, block and contain viruses, ransomware and other malware before they can run and spread.',
    example:
      'Running reputable anti-malware software, only installing approved applications, and sandboxing or blocking risky downloads.',
    withoutIt:
      'A single malicious attachment or download can execute freely, encrypting files or stealing data across the organisation.',
  },
]

export default function FiveFoundations() {
  const reduced = useReducedMotionPref()
  const [selected, setSelected] = useState<PillarKey | null>(null)

  const reset = () => setSelected(null)
  const active = selected ? PILLARS.find((p) => p.key === selected)! : null

  return (
    <DiagramShell
      id="five-foundations"
      title="Five Security Foundations"
      description="The five technical controls at the heart of Cyber Essentials, drawn as a temple of five pillars. Select a pillar to see what it is, why it matters, an example, and what can go wrong without it."
      onReset={reset}
      footnote="Illustrative, not exact: these are simplified teaching summaries of the five Cyber Essentials controls. A real scheme has detailed, evolving requirements — always consult the current official guidance."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        {/* ---- Temple of five pillars ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox="0 0 520 320"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label="A temple with five pillars, one per security foundation."
          >
            {/* Roof / pediment */}
            <polygon
              points="20,70 500,70 260,14"
              className="fill-[color:rgb(var(--c-card))] stroke-[color:rgb(var(--c-hairline))]"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <text
              x={260}
              y={56}
              textAnchor="middle"
              className="fill-[color:rgb(var(--c-muted))]"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2 }}
            >
              CYBER ESSENTIALS
            </text>

            {/* Architrave (bar under roof) */}
            <rect x={20} y={74} width={480} height={14} rx={3} className="fill-[color:rgb(var(--c-card))] stroke-[color:rgb(var(--c-hairline))]" strokeWidth={2} />

            {/* Pillars */}
            {PILLARS.map((p, i) => {
              const col = accentHex(p.accent)
              const isSel = selected === p.key
              const dim = selected !== null && !isSel
              const gap = 96
              const startX = 40
              const w = 60
              const x = startX + i * gap
              const topY = 94
              const bottomY = 268
              const h = bottomY - topY
              const Icon = p.icon
              return (
                <g key={p.key} style={{ cursor: 'pointer' }}>
                  {/* capital */}
                  <rect x={x - 6} y={topY - 8} width={w + 12} height={10} rx={2} fill={isSel ? col : 'rgb(var(--c-card))'} stroke={col} strokeWidth={2} opacity={dim ? 0.4 : 1} />
                  {/* shaft */}
                  <motion.rect
                    x={x}
                    y={topY + 4}
                    width={w}
                    height={h}
                    rx={6}
                    fill={isSel ? `${col}22` : 'rgb(var(--c-card))'}
                    stroke={col}
                    strokeWidth={isSel ? 3 : 2}
                    animate={{ opacity: dim ? 0.4 : 1 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  />
                  {/* flutes */}
                  {[0.3, 0.5, 0.7].map((f) => (
                    <line
                      key={f}
                      x1={x + w * f}
                      y1={topY + 10}
                      x2={x + w * f}
                      y2={bottomY - 2}
                      stroke={col}
                      strokeWidth={1}
                      opacity={dim ? 0.15 : 0.3}
                    />
                  ))}
                  {/* base */}
                  <rect x={x - 6} y={bottomY} width={w + 12} height={12} rx={2} fill={isSel ? col : 'rgb(var(--c-card))'} stroke={col} strokeWidth={2} opacity={dim ? 0.4 : 1} />
                  {/* icon chip near top of shaft */}
                  <foreignObject x={x + w / 2 - 14} y={topY + 16} width={28} height={28} style={{ pointerEvents: 'none' }}>
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ background: isSel ? col : `${col}1a`, color: isSel ? '#04121a' : col, opacity: dim ? 0.5 : 1 }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </foreignObject>
                  {/* number inside shaft */}
                  <text
                    x={x + w / 2}
                    y={bottomY - 14}
                    textAnchor="middle"
                    pointerEvents="none"
                    style={{ fontSize: 26, fontWeight: 800 }}
                    fill={col}
                    opacity={dim ? 0.4 : 0.9}
                  >
                    {i + 1}
                  </text>
                  {/* hit target */}
                  <rect
                    x={x - 8}
                    y={topY - 10}
                    width={w + 16}
                    height={h + 30}
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

            {/* Ground / stylobate */}
            <rect x={14} y={282} width={492} height={10} rx={3} className="fill-[color:rgb(var(--c-card))] stroke-[color:rgb(var(--c-hairline))]" strokeWidth={2} />
          </svg>

          {/* Mobile-friendly selector + labels */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {PILLARS.map((p) => {
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
                  <p className="text-xs text-muted">Cyber Essentials control</p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Definition</p>
                <p className="text-sm leading-6 text-ink">{active.definition}</p>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <Target className="h-3.5 w-3.5" style={{ color: accentHex(active.accent) }} />
                  Purpose
                </p>
                <p className="text-sm leading-6 text-ink">{active.purpose}</p>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <Lightbulb className="h-3.5 w-3.5" style={{ color: accentHex(active.accent) }} />
                  Example
                </p>
                <p className="text-sm leading-6 text-ink">{active.example}</p>
              </div>

              <div className="mt-auto rounded-xl border p-3" style={{ borderColor: `${accentHex('danger')}44`, background: `${accentHex('danger')}0f` }}>
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('danger') }}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  What can go wrong without it
                </p>
                <p className="text-sm leading-6 text-ink">{active.withoutIt}</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center">
              <ShieldAlert className="h-8 w-8 text-cyan" />
              <p className="max-w-xs text-sm text-muted">
                Select one of the five pillars to see its definition, purpose, a concrete example, and what can go wrong without it.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {PILLARS.map((p) => (
                  <Badge key={p.key} color={accentHex(p.accent)}>
                    {p.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DiagramShell>
  )
}
