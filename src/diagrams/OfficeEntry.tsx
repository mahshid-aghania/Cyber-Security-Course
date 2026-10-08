import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DoorOpen, UserCheck, ShieldCheck, Play, Pause, KeyRound, FileText, Server, Archive, Users, AlertTriangle } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type RoomKey = 'reception' | 'waiting' | 'staff' | 'server' | 'storage'

interface RoomMeta {
  key: RoomKey
  label: string
  accent: 'cyan' | 'teal' | 'violet' | 'warn' | 'danger'
  icon: typeof FileText
  // SVG rect geometry (viewBox 0..480 x, 0..320 y)
  x: number
  y: number
  w: number
  h: number
  summary: string
  controls: string[]
}

const ROOMS: RoomMeta[] = [
  {
    key: 'reception',
    label: 'Reception',
    accent: 'cyan',
    icon: FileText,
    x: 20,
    y: 20,
    w: 150,
    h: 120,
    summary: 'First point of contact. Visitors are identified, signed in, and issued temporary passes before going further.',
    controls: ['Visitor sign-in log', 'Photo ID check', 'Temporary visitor badges', 'Staffed front desk'],
  },
  {
    key: 'waiting',
    label: 'Public waiting area',
    accent: 'teal',
    icon: Users,
    x: 20,
    y: 160,
    w: 150,
    h: 140,
    summary: 'A low-trust public zone where anyone can sit. No sensitive systems or documents should be reachable here.',
    controls: ['Open / public access', 'CCTV monitoring', 'No sensitive data on display', 'Clear-desk in sight-lines'],
  },
  {
    key: 'staff',
    label: 'Staff office',
    accent: 'violet',
    icon: KeyRound,
    x: 190,
    y: 20,
    w: 170,
    h: 155,
    summary: 'Working area for employees. Entry is gated so only authorised staff can pass the controlled door.',
    controls: ['Badge / RFID access', 'PIN keypad', 'Door held-open alarm', 'Access logs per person'],
  },
  {
    key: 'server',
    label: 'Server room',
    accent: 'warn',
    icon: Server,
    x: 380,
    y: 20,
    w: 80,
    h: 155,
    summary: 'Houses critical infrastructure. Access is tightly restricted and every entry is recorded.',
    controls: ['Restricted access list', 'Locked equipment racks', 'Environmental + door sensors', 'Full audit trail'],
  },
  {
    key: 'storage',
    label: 'Secure document storage',
    accent: 'danger',
    icon: Archive,
    x: 190,
    y: 190,
    w: 270,
    h: 110,
    summary: 'Physical records room. Documents are kept under lock and retrieved only by authorised personnel.',
    controls: ['Locked filing cabinets', 'Key / access-card control', 'Sign-out register', 'Shredding of waste'],
  },
]

// Secured door between the staff office and the server-room zone.
const DOOR = { x: 362, y: 70, w: 18, h: 60 }

export default function OfficeEntry() {
  const reduced = useReducedMotionPref()
  const [selected, setSelected] = useState<RoomKey | null>(null)
  const [playing, setPlaying] = useState(false)
  const [escort, setEscort] = useState(false)

  const reset = () => {
    setSelected(null)
    setPlaying(false)
    setEscort(false)
  }

  // Auto-stop the tailgating animation after it finishes one pass.
  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(() => setPlaying(false), 4200)
    return () => window.clearTimeout(t)
  }, [playing])

  const activeMeta = selected ? ROOMS.find((r) => r.key === selected)! : null

  // Movement paths across the floor plan.
  const laneY = 100
  const startX = 95
  const empEndX = 420
  const intruderStop = escort ? 300 : 420

  return (
    <DiagramShell
      id="office-entry"
      title="Office Entry Security"
      description="Click a room to see the physical security controls that protect it. Play the tailgating example to watch an unauthorised person follow a staff member through a secured door — then turn on escort & access checks to see it stopped."
      onReset={reset}
      footnote="Illustrative, not exact: this is a simplified teaching floor plan. Real controls depend on each building's layout, risk assessment and policies."
      controls={
        <>
          <ControlGroup label="Scenario">
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={playing}
              aria-label={playing ? 'Pause tailgating example' : 'Play tailgating example'}
              className="btn-ghost h-9"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{playing ? 'Pause' : 'Play tailgating example'}</span>
            </button>
          </ControlGroup>
          <ControlGroup label="Defence">
            <button
              onClick={() => setEscort((e) => !e)}
              aria-pressed={escort}
              aria-label="Toggle visitor escort and access checks"
              className="inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors"
              style={{
                borderColor: escort ? accentHex('teal') : 'rgb(var(--c-hairline))',
                color: escort ? '#04121a' : accentHex('teal'),
                background: escort ? accentHex('teal') : `${accentHex('teal')}12`,
              }}
            >
              <UserCheck className="h-4 w-4" />
              Visitor escort &amp; access checks
            </button>
          </ControlGroup>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {/* ---- Floor plan ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox="0 0 480 320"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="group"
            aria-label="Office floor plan with five rooms. Select a room for its security controls."
          >
            {/* Outer building wall */}
            <rect x={14} y={14} width={452} height={292} rx={10} fill="none" stroke="rgb(var(--c-hairline))" strokeWidth={3} />

            {/* Rooms */}
            {ROOMS.map((r) => {
              const col = accentHex(r.accent)
              const isSel = selected === r.key
              const words = r.label.split(' ')
              const twoLine = r.label.length > 18
              return (
                <g key={r.key}>
                  <motion.rect
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    rx={7}
                    fill={isSel ? `${col}26` : 'rgb(var(--c-card))'}
                    stroke={col}
                    strokeWidth={isSel ? 3 : 1.5}
                    animate={{ opacity: selected && !isSel ? 0.55 : 1 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                    style={{ cursor: 'pointer' }}
                  />
                  <text
                    x={r.x + r.w / 2}
                    y={r.y + 20}
                    textAnchor="middle"
                    pointerEvents="none"
                    className="fill-[color:rgb(var(--c-ink))]"
                    style={{ fontSize: 11, fontWeight: 700 }}
                  >
                    {twoLine ? words[0] : r.label}
                  </text>
                  {twoLine && (
                    <text
                      x={r.x + r.w / 2}
                      y={r.y + 34}
                      textAnchor="middle"
                      pointerEvents="none"
                      className="fill-[color:rgb(var(--c-muted))]"
                      style={{ fontSize: 9, fontWeight: 600 }}
                    >
                      {words.slice(1).join(' ')}
                    </text>
                  )}
                  {/* Keyboard-accessible hit target */}
                  <rect
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    rx={7}
                    fill="transparent"
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${isSel ? 'Hide' : 'Show'} ${r.label} controls`}
                    style={{ cursor: 'pointer', outline: 'none' }}
                    onClick={() => setSelected(isSel ? null : r.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelected(isSel ? null : r.key)
                      }
                    }}
                  />
                </g>
              )
            })}

            {/* Secured door */}
            <rect
              x={DOOR.x}
              y={DOOR.y}
              width={DOOR.w}
              height={DOOR.h}
              rx={3}
              fill={escort ? accentHex('teal') : accentHex('warn')}
              opacity={0.85}
            />
            <text x={DOOR.x + DOOR.w / 2} y={DOOR.y - 4} textAnchor="middle" className="fill-[color:rgb(var(--c-muted))]" style={{ fontSize: 8, fontWeight: 700 }}>
              {escort ? 'checked' : 'secured'}
            </text>

            {/* Tailgating animation layer */}
            {playing && (
              <>
                {/* Authorised employee (teal) */}
                <motion.g
                  initial={{ x: startX }}
                  animate={{ x: reduced ? empEndX : [startX, empEndX] }}
                  transition={{ duration: reduced ? 0 : 3.4, ease: 'easeInOut' }}
                >
                  <circle cx={0} cy={laneY} r={9} fill={accentHex('teal')} />
                  <text x={0} y={laneY + 3} textAnchor="middle" style={{ fontSize: 9, fontWeight: 800 }} fill="#04121a">
                    E
                  </text>
                </motion.g>

                {/* Intruder (danger) — trails behind; stopped at the door when escort is on */}
                <motion.g
                  initial={{ x: startX - 34 }}
                  animate={{ x: reduced ? intruderStop : [startX - 34, intruderStop] }}
                  transition={{ duration: reduced ? 0 : 3.4, ease: 'easeInOut' }}
                >
                  <circle cx={0} cy={laneY} r={9} fill={accentHex('danger')} />
                  <text x={0} y={laneY + 3} textAnchor="middle" style={{ fontSize: 9, fontWeight: 800 }} fill="#04121a">
                    ?
                  </text>
                </motion.g>
              </>
            )}
          </svg>

          {/* Mobile-friendly room selector */}
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {ROOMS.map((r) => {
              const col = accentHex(r.accent)
              const isSel = selected === r.key
              const Icon = r.icon
              return (
                <button
                  key={r.key}
                  onClick={() => setSelected(isSel ? null : r.key)}
                  aria-pressed={isSel}
                  aria-label={`${isSel ? 'Hide' : 'Show'} ${r.label} controls`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: isSel ? col : 'rgb(var(--c-hairline))',
                    color: isSel ? '#04121a' : col,
                    background: isSel ? col : `${col}10`,
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {r.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ---- Detail / explainer panel ---- */}
        <div className="min-w-0 space-y-4">
          <AnimatePresence mode="wait">
            {activeMeta ? (
              <motion.div
                key={activeMeta.key}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                className="rounded-2xl border border-hairline bg-card p-5"
                style={{ boxShadow: `inset 0 0 0 1px ${accentHex(activeMeta.accent)}22` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${accentHex(activeMeta.accent)}1a`, color: accentHex(activeMeta.accent) }}
                  >
                    <activeMeta.icon className="h-5 w-5" />
                  </span>
                  <h4 className="text-base font-bold text-ink">{activeMeta.label}</h4>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{activeMeta.summary}</p>
                <p className="mt-4 mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
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
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center"
              >
                <DoorOpen className="h-8 w-8 text-cyan" />
                <p className="max-w-xs text-sm text-muted">Select a room to see the physical security controls that protect it.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tailgating explainer */}
          <div
            className="rounded-2xl border p-4"
            style={
              escort
                ? { borderColor: `${accentHex('teal')}44`, background: `${accentHex('teal')}0f` }
                : { borderColor: `${accentHex('danger')}44`, background: `${accentHex('danger')}0f` }
            }
          >
            <p
              className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
              style={{ color: escort ? accentHex('teal') : accentHex('danger') }}
            >
              {escort ? <UserCheck className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
              {escort ? 'Tailgating stopped' : 'Tailgating risk'}
            </p>
            <p className="text-sm leading-6 text-ink">
              {escort
                ? 'With escort and access checks on, every person badges in individually and visitors are escorted. The follower (?) is challenged at the door and cannot continue into the secured zone.'
                : 'An unauthorised person (?) slips through the secured door right behind an authorised employee (E) — no separate badge needed. This "tailgating" defeats the door lock through social trust, not a technical failure.'}
            </p>
          </div>
        </div>
      </div>
    </DiagramShell>
  )
}
