import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardList,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  Wrench,
  Code,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Play,
  Pause,
} from 'lucide-react'
import { DiagramShell } from '../components/DiagramShell'
import { Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type StageKey =
  | 'requirements'
  | 'design'
  | 'development'
  | 'testing'
  | 'deployment'
  | 'maintenance'

interface StageMeta {
  key: StageKey
  label: string
  accent: 'cyan' | 'teal' | 'violet' | 'warn' | 'danger'
  icon: typeof ClipboardList
  summary: string
  dev: string[]
  security: string[]
  risks: string[]
  controls: string[]
}

const STAGES: StageMeta[] = [
  {
    key: 'requirements',
    label: 'Requirements',
    accent: 'cyan',
    icon: ClipboardList,
    summary: 'Identify security & privacy requirements alongside functional needs.',
    dev: ['Gather functional requirements', 'Define scope & user stories', 'Agree acceptance criteria'],
    security: ['Identify security & privacy requirements', 'Map data sensitivity & compliance needs', 'Capture abuse / misuse cases'],
    risks: ['Security treated as an afterthought', 'Unclear data-protection obligations', 'Missing non-functional security requirements'],
    controls: ['Security requirements checklist', 'Privacy-by-design review', 'Compliance mapping (data regulations)'],
  },
  {
    key: 'design',
    label: 'Design',
    accent: 'teal',
    icon: PenTool,
    summary: 'Threat modeling & secure architecture before a line of code is written.',
    dev: ['System & component architecture', 'Data-flow and API design', 'Technology selection'],
    security: ['Threat modeling (e.g. STRIDE)', 'Secure architecture & trust boundaries', 'Design for least privilege & defence in depth'],
    risks: ['Insecure architecture baked in early', 'Overly broad trust boundaries', 'Unmanaged third-party / supply-chain risk'],
    controls: ['Threat model document', 'Architecture / design review', 'Secure design patterns & standards'],
  },
  {
    key: 'development',
    label: 'Development',
    accent: 'violet',
    icon: Code2,
    summary: 'Secure coding & code review as the software is built.',
    dev: ['Implement features', 'Write unit tests', 'Integrate components'],
    security: ['Secure coding practices', 'Peer & security-focused code review', 'Manage secrets & dependencies safely'],
    risks: ['Injection, XSS and other code flaws', 'Hard-coded secrets in source', 'Vulnerable or outdated dependencies'],
    controls: ['Secure coding guidelines', 'Static analysis (SAST) in CI', 'Software composition analysis (SCA)'],
  },
  {
    key: 'testing',
    label: 'Testing',
    accent: 'warn',
    icon: TestTube2,
    summary: 'Security testing & vulnerability assessment before release.',
    dev: ['Functional & integration testing', 'Regression testing', 'User acceptance testing'],
    security: ['Security testing (DAST)', 'Vulnerability assessment', 'Penetration testing where warranted'],
    risks: ['Shipping with known vulnerabilities', 'Untested edge / abuse cases', 'False confidence from happy-path tests'],
    controls: ['Dynamic analysis (DAST)', 'Vulnerability scanning', 'Independent penetration test'],
  },
  {
    key: 'deployment',
    label: 'Deployment',
    accent: 'cyan',
    icon: Rocket,
    summary: 'Secure configuration & release verification into production.',
    dev: ['Build & release pipeline', 'Environment provisioning', 'Release to production'],
    security: ['Secure configuration (hardening)', 'Release verification & sign-off', 'Secrets & key management'],
    risks: ['Insecure default configuration', 'Exposed secrets in environment', 'Unverified or tampered build artifacts'],
    controls: ['Hardened baseline configs', 'Infrastructure-as-code review', 'Signed artifacts & integrity checks'],
  },
  {
    key: 'maintenance',
    label: 'Maintenance',
    accent: 'teal',
    icon: Wrench,
    summary: 'Patching, monitoring & updates across the product lifetime.',
    dev: ['Bug fixes & enhancements', 'Performance tuning', 'User support'],
    security: ['Patching & security updates', 'Monitoring & logging', 'Incident response & feedback loop'],
    risks: ['Unpatched known vulnerabilities', 'Blind spots with no monitoring', 'Slow or missing incident response'],
    controls: ['Patch-management process', 'Centralised logging & alerting', 'Incident response plan & drills'],
  },
]

// Ring geometry — viewBox 0..400 x 0..400, centre (200,200)
const CX = 200
const CY = 200
const RADIUS = 134

function nodePos(index: number, total: number) {
  // Start at top (-90deg) and go clockwise.
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180)
  return { x: CX + RADIUS * Math.cos(angle), y: CY + RADIUS * Math.sin(angle) }
}

export default function SecureSDLC() {
  const reduced = useReducedMotionPref()
  const [selected, setSelected] = useState<StageKey | null>(null)
  const [flow, setFlow] = useState(false)
  const [tick, setTick] = useState(0)

  // Gentle automatic flow highlight around the ring (manual Play allowed even under reduced motion).
  useEffect(() => {
    if (!flow) return
    const id = window.setInterval(() => setTick((t) => (t + 1) % STAGES.length), 1400)
    return () => window.clearInterval(id)
  }, [flow])

  const reset = () => {
    setSelected(null)
    setFlow(false)
    setTick(0)
  }

  const active = selected ? STAGES.find((s) => s.key === selected)! : null
  const flowIndex = flow ? tick : -1

  return (
    <DiagramShell
      id="secure-sdlc"
      title="Secure SDLC"
      description="A security-aware software development lifecycle. Click any stage on the ring to see its development work, the security activities woven in, common risks, and example controls."
      onReset={reset}
      footnote="Illustrative, not exact: stage names and activities are simplified for teaching. Real teams blend these stages, iterate, and tailor controls to their own risks, tooling and compliance obligations."
      controls={
        <button
          onClick={() => setFlow((f) => !f)}
          aria-pressed={flow}
          aria-label={flow ? 'Pause lifecycle flow animation' : 'Play lifecycle flow animation'}
          className="btn-ghost h-9"
        >
          {flow ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span>{flow ? 'Pause flow' : 'Play flow'}</span>
        </button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        {/* ---- Ring ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label="Secure SDLC lifecycle ring with six stages."
          >
            {/* Base ring */}
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              className="text-[color:rgb(var(--c-hairline))]"
              stroke="currentColor"
              strokeWidth={2}
              strokeDasharray="2 8"
              strokeLinecap="round"
            />

            {/* Rotating flow arc gated on !reduced */}
            {!reduced && (
              <motion.circle
                cx={CX}
                cy={CY}
                r={RADIUS}
                fill="none"
                stroke={accentHex('cyan')}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="60 800"
                style={{ opacity: 0.5, transformOrigin: '200px 200px' }}
                animate={{ rotate: 360 }}
                transition={{ duration: flow ? 14 : 34, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {/* Directional flow dots between stages */}
            {STAGES.map((_, i) => {
              const a = nodePos(i, STAGES.length)
              const b = nodePos((i + 1) % STAGES.length, STAGES.length)
              const mx = (a.x + b.x) / 2
              const my = (a.y + b.y) / 2
              const dirX = mx - CX
              const dirY = my - CY
              const len = Math.hypot(dirX, dirY) || 1
              const ax = CX + (dirX / len) * RADIUS
              const ay = CY + (dirY / len) * RADIUS
              return <circle key={`dot-${i}`} cx={ax} cy={ay} r={2.5} fill={accentHex('teal')} opacity={0.55} />
            })}

            {/* Centre label */}
            <text
              x={CX}
              y={CY - 6}
              textAnchor="middle"
              className="fill-[color:rgb(var(--c-ink))]"
              style={{ fontSize: 15, fontWeight: 800, letterSpacing: 1 }}
            >
              Secure
            </text>
            <text
              x={CX}
              y={CY + 14}
              textAnchor="middle"
              className="fill-[color:rgb(var(--c-muted))]"
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3 }}
            >
              SDLC
            </text>

            {/* Stage nodes */}
            {STAGES.map((s, i) => {
              const p = nodePos(i, STAGES.length)
              const col = accentHex(s.accent)
              const isSel = selected === s.key
              const isFlow = i === flowIndex
              const highlight = isSel || isFlow
              const labelOutX = CX + (p.x - CX) * 1.34
              const labelOutY = CY + (p.y - CY) * 1.34
              return (
                <g key={s.key}>
                  {highlight && !reduced && (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={26}
                      fill={col}
                      initial={{ opacity: 0.3, scale: 1 }}
                      animate={{ opacity: [0.3, 0, 0.3], scale: [1, 1.8, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r={26}
                    fill={highlight ? col : 'rgb(var(--c-card))'}
                    stroke={col}
                    strokeWidth={isSel ? 3 : 2}
                    animate={{ scale: isSel ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ cursor: 'pointer' }}
                  />
                  <text
                    x={p.x}
                    y={p.y + 5}
                    textAnchor="middle"
                    pointerEvents="none"
                    style={{ fontSize: 16, fontWeight: 800 }}
                    fill={highlight ? '#04121a' : col}
                  >
                    {i + 1}
                  </text>
                  <text
                    x={labelOutX}
                    y={labelOutY + 4}
                    textAnchor="middle"
                    pointerEvents="none"
                    className="fill-[color:rgb(var(--c-ink))]"
                    style={{ fontSize: 12.5, fontWeight: 700 }}
                  >
                    {s.label}
                  </text>
                  {/* hit target */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={32}
                    fill="transparent"
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${isSel ? 'Hide' : 'Show'} ${s.label} stage details`}
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

          {/* Mobile-friendly stage selector */}
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {STAGES.map((s, i) => {
              const col = accentHex(s.accent)
              const isSel = selected === s.key
              const Icon = s.icon
              return (
                <button
                  key={s.key}
                  onClick={() => setSelected(isSel ? null : s.key)}
                  aria-pressed={isSel}
                  aria-label={`${isSel ? 'Hide' : 'Show'} ${s.label} stage details`}
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
                <div>
                  <h4 className="text-base font-bold text-ink">{active.label}</h4>
                  <p className="text-xs text-muted">{active.summary}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                    <Code className="h-3.5 w-3.5 text-violet" />
                    Development activities
                  </p>
                  <ul className="space-y-1.5 text-sm leading-5 text-ink">
                    {active.dev.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border p-3" style={{ borderColor: `${accentHex('teal')}44`, background: `${accentHex('teal')}0d` }}>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('teal') }}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Security activities
                  </p>
                  <ul className="space-y-1.5 text-sm leading-5 text-ink">
                    {active.security.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: accentHex('teal') }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border p-3" style={{ borderColor: `${accentHex('danger')}44`, background: `${accentHex('danger')}0d` }}>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('danger') }}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Common risks
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {active.risks.map((r) => (
                    <Badge key={r} color={accentHex('danger')}>
                      {r}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-auto rounded-xl border p-3" style={{ borderColor: `${accentHex('cyan')}44`, background: `${accentHex('cyan')}0d` }}>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('cyan') }}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Example controls
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {active.controls.map((c) => (
                    <Badge key={c} color={accentHex('cyan')}>
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center">
              <ShieldCheck className="h-8 w-8 text-cyan" />
              <p className="max-w-xs text-sm text-muted">
                Select a stage on the ring to see its development activities, the security activities woven in, common risks, and example controls. Press{' '}
                <span className="font-semibold text-ink">Play flow</span> to watch the lifecycle cycle around.
              </p>
            </div>
          )}
        </div>
      </div>
    </DiagramShell>
  )
}
