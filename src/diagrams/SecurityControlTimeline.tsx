import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldHalf,
  ScanEye,
  LifeBuoy,
  Play,
  Pause,
  Lock,
  KeyRound,
  Wrench,
  Radar,
  ScrollText,
  Siren,
  DatabaseBackup,
} from 'lucide-react'
import { DiagramShell } from '../components/DiagramShell'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type ZoneKey = 'before' | 'during' | 'after'
type ControlKey = 'preventive' | 'detective' | 'reactive'

interface Zone {
  key: ZoneKey
  label: string
  blurb: string
}

const ZONES: Zone[] = [
  { key: 'before', label: 'Before incident', blurb: 'Normal operations — stop trouble before it starts.' },
  { key: 'during', label: 'During incident', blurb: 'An attack is underway — spot it and limit the damage.' },
  { key: 'after', label: 'After incident', blurb: 'Contain, recover and learn.' },
]

interface ControlType {
  key: ControlKey
  label: string
  icon: typeof ShieldHalf
  color: string
  // Fractional span across the full timeline (0 = start of Before, 1 = end of After)
  start: number
  end: number
  role: string
  examples: { icon: typeof Lock; text: string }[]
}

const CONTROLS: ControlType[] = [
  {
    key: 'preventive',
    label: 'Preventive',
    icon: ShieldHalf,
    color: '#5FE0BE',
    start: 0.02,
    end: 0.34,
    role: 'Reduce the likelihood that an incident happens at all. These controls sit BEFORE the incident, hardening the environment so attacks are less likely to succeed.',
    examples: [
      { icon: KeyRound, text: 'Multi-factor authentication (MFA)' },
      { icon: Lock, text: 'Account lockout policies' },
      { icon: Wrench, text: 'Patching & secure configuration' },
    ],
  },
  {
    key: 'detective',
    label: 'Detective',
    icon: ScanEye,
    color: '#57D8ED',
    start: 0.2,
    end: 0.72,
    role: 'Identify suspicious or malicious activity. These span the BEFORE and DURING phases — watching continuously so an incident is noticed as early as possible.',
    examples: [
      { icon: Radar, text: 'Intrusion detection systems (IDS)' },
      { icon: ScanEye, text: 'Security monitoring / SIEM' },
      { icon: ScrollText, text: 'Logging & alerting' },
    ],
  },
  {
    key: 'reactive',
    label: 'Reactive',
    icon: LifeBuoy,
    color: '#F4BE62',
    start: 0.55,
    end: 0.98,
    role: 'Limit damage and support recovery once something has gone wrong. These act DURING and AFTER the incident to contain, restore and get back to normal.',
    examples: [
      { icon: Siren, text: 'Incident response procedures' },
      { icon: DatabaseBackup, text: 'Backups & restore' },
      { icon: LifeBuoy, text: 'Disaster recovery / failover' },
    ],
  },
]

// Timeline geometry
const PAD_X = 10
const TRACK_W = 100 - PAD_X * 2 // in percentage units

function pctLeft(frac: number): string {
  return `${PAD_X + frac * TRACK_W}%`
}
function pctWidth(start: number, end: number): string {
  return `${(end - start) * TRACK_W}%`
}

function zoneOfFrac(frac: number): ZoneKey {
  if (frac < 1 / 3) return 'before'
  if (frac < 2 / 3) return 'during'
  return 'after'
}

export default function SecurityControlTimeline() {
  const reduced = useReducedMotionPref()
  const [selected, setSelected] = useState<ControlKey | ZoneKey | null>('preventive')
  const [playing, setPlaying] = useState(false)
  const [playhead, setPlayhead] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number | null>(null)

  // Animate the playhead when playing (and motion is allowed).
  useEffect(() => {
    if (!playing || reduced) return
    const DURATION = 7000 // ms for a full sweep
    const step = (now: number) => {
      if (lastRef.current === null) lastRef.current = now
      const dt = now - lastRef.current
      lastRef.current = now
      setPlayhead((p) => {
        const next = p + dt / DURATION
        if (next >= 1) {
          setPlaying(false)
          return 1
        }
        return next
      })
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      lastRef.current = null
    }
  }, [playing, reduced])

  const togglePlay = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    // restart from the beginning if we're at the end
    setPlayhead((p) => (p >= 1 ? 0 : p))
    lastRef.current = null
    setPlaying(true)
  }

  const reset = () => {
    setPlaying(false)
    setPlayhead(0)
    setSelected('preventive')
    lastRef.current = null
  }

  const activeControl =
    selected && CONTROLS.some((c) => c.key === selected)
      ? CONTROLS.find((c) => c.key === selected)!
      : null
  const activeZone =
    selected && ZONES.some((z) => z.key === selected) ? ZONES.find((z) => z.key === selected)! : null

  const playZone = zoneOfFrac(playhead)

  return (
    <DiagramShell
      id="security-control-timeline"
      title="Security Control Timeline"
      description="Controls do their job at different points around an incident. Preventive controls act before, detective controls watch across before and during, and reactive controls kick in during and after. Press Play to sweep the timeline, or click any band or zone."
      onReset={reset}
      footnote="Illustrative, not exhaustive: a control can serve more than one role, timings overlap, and real programmes layer many controls (defence in depth). Positions here are simplified to show when each type mainly acts."
      controls={
        <button
          onClick={togglePlay}
          disabled={reduced}
          aria-pressed={playing}
          aria-label={playing ? 'Pause timeline sweep' : 'Play timeline sweep'}
          className="btn-ghost h-9 disabled:cursor-not-allowed disabled:opacity-50"
          title={reduced ? 'Auto-play is disabled while reduced motion is on' : undefined}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span>{playing ? 'Pause' : 'Play'}</span>
        </button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {/* ---- Timeline ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-4">
          {/* Zone headers */}
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Incident phases">
            {ZONES.map((z) => {
              const isSel = selected === z.key
              const isPlayActive = playing && playZone === z.key
              return (
                <button
                  key={z.key}
                  onClick={() => setSelected(isSel ? null : z.key)}
                  aria-pressed={isSel}
                  aria-label={`${z.label}: ${z.blurb}`}
                  className="rounded-xl border px-2 py-2 text-center text-xs font-bold uppercase tracking-wide transition-colors"
                  style={{
                    borderColor: isSel || isPlayActive ? '#57D8ED' : 'rgb(var(--c-hairline))',
                    background: isSel
                      ? 'rgb(87 216 237 / 0.14)'
                      : isPlayActive
                        ? 'rgb(87 216 237 / 0.08)'
                        : 'transparent',
                    color: isSel ? '#57D8ED' : 'rgb(var(--c-muted))',
                  }}
                >
                  {z.label}
                </button>
              )
            })}
          </div>

          {/* Track with control bands */}
          <div className="relative mt-4 h-[196px]">
            {/* Vertical zone dividers */}
            {[1 / 3, 2 / 3].map((f) => (
              <div
                key={f}
                className="absolute top-0 bottom-6 w-px bg-hairline"
                style={{ left: pctLeft(f) }}
                aria-hidden
              />
            ))}

            {/* Control bands */}
            {CONTROLS.map((c, idx) => {
              const isSel = selected === c.key
              const dim = selected !== null && !isSel
              const Icon = c.icon
              return (
                <button
                  key={c.key}
                  onClick={() => setSelected(isSel ? null : c.key)}
                  aria-pressed={isSel}
                  aria-label={`${c.label} controls. ${c.role}`}
                  className="absolute flex items-center gap-1.5 overflow-hidden rounded-lg border px-2 text-left transition-all"
                  style={{
                    left: pctLeft(c.start),
                    width: pctWidth(c.start, c.end),
                    top: 8 + idx * 56,
                    height: 44,
                    borderColor: c.color,
                    background: `${c.color}${isSel ? '2e' : '18'}`,
                    opacity: dim ? 0.45 : 1,
                  }}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                    style={{ background: `${c.color}33`, color: c.color }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span
                    className="truncate text-xs font-bold"
                    style={{ color: c.color }}
                  >
                    {c.label}
                  </span>
                </button>
              )
            })}

            {/* Playhead */}
            <motion.div
              className="pointer-events-none absolute top-0 bottom-6 z-10 w-0.5"
              style={{ background: '#F4F7FC', boxShadow: '0 0 8px rgba(244,247,252,0.6)' }}
              initial={false}
              animate={{ left: pctLeft(playhead) }}
              transition={{ duration: 0 }}
            >
              <span
                className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                style={{ background: '#F4F7FC' }}
              />
            </motion.div>

            {/* Baseline + arrow */}
            <div className="absolute right-0 bottom-5 left-0 h-px bg-hairline" aria-hidden />
            <span
              className="absolute bottom-0 text-[10px] font-semibold uppercase tracking-wider text-muted"
              style={{ left: pctLeft(0) }}
            >
              Timeline →
            </span>
          </div>
        </div>

        {/* ---- Detail panel ---- */}
        <div className="min-w-0">
          {activeControl ? (
            <motion.div
              key={activeControl.key}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
              className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-card p-5"
              style={{ boxShadow: `inset 0 0 0 1px ${activeControl.color}22` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${activeControl.color}1a`, color: activeControl.color }}
                >
                  <activeControl.icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-ink">{activeControl.label} controls</h4>
                  <p className="text-xs text-muted">Role on the timeline</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-muted">{activeControl.role}</p>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  Examples
                </p>
                <ul className="flex flex-col gap-2">
                  {activeControl.examples.map((ex) => {
                    const ExIcon = ex.icon
                    return (
                      <li
                        key={ex.text}
                        className="flex items-center gap-2 rounded-lg border border-hairline bg-surface/50 px-3 py-2 text-sm text-ink"
                      >
                        <ExIcon
                          className="h-4 w-4 shrink-0"
                          style={{ color: activeControl.color }}
                        />
                        {ex.text}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </motion.div>
          ) : activeZone ? (
            <motion.div
              key={activeZone.key}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
              className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-card p-5"
            >
              <h4 className="text-base font-bold text-ink">{activeZone.label}</h4>
              <p className="text-sm leading-6 text-muted">{activeZone.blurb}</p>
              <div className="mt-1">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  Controls active in this phase
                </p>
                <div className="flex flex-wrap gap-2">
                  {CONTROLS.filter((c) => {
                    const z = activeZone.key
                    const starts = zoneOfFrac(c.start)
                    const ends = zoneOfFrac(c.end)
                    const order: ZoneKey[] = ['before', 'during', 'after']
                    return (
                      order.indexOf(z) >= order.indexOf(starts) &&
                      order.indexOf(z) <= order.indexOf(ends)
                    )
                  }).map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setSelected(c.key)}
                      aria-label={`Show ${c.label} controls`}
                      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                      style={{ borderColor: c.color, color: c.color, background: `${c.color}12` }}
                    >
                      <c.icon className="h-3.5 w-3.5" />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center">
              <div className="flex gap-3">
                {CONTROLS.map((c) => (
                  <span key={c.key} style={{ color: c.color }}>
                    <c.icon className="h-6 w-6" />
                  </span>
                ))}
              </div>
              <p className="max-w-xs text-sm leading-6 text-muted">
                Click a coloured band or a phase header to see what that control type does and real
                examples — or press Play to sweep across the incident timeline.
              </p>
            </div>
          )}
        </div>
      </div>
    </DiagramShell>
  )
}
