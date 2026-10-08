import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, ShieldCheck, Bug, Monitor } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

/*
 * Simplified network of 12 machines. When "Apply security patches" is on, a
 * subset of nodes are patched (and resist infection + block spread through
 * them). Playing propagates infection outward from the entry node along edges,
 * one hop per tick. Patched nodes never get infected and do not relay.
 */

interface Node {
  id: number
  x: number
  y: number
  /** patched when the toggle is ON (these are the machines that received updates) */
  patchable: boolean
}

// Hand-authored layout on a 360 x 300 viewBox
const NODES: Node[] = [
  { id: 0, x: 60, y: 150, patchable: false }, // entry
  { id: 1, x: 130, y: 70, patchable: true },
  { id: 2, x: 130, y: 150, patchable: false },
  { id: 3, x: 130, y: 230, patchable: false },
  { id: 4, x: 210, y: 40, patchable: false },
  { id: 5, x: 210, y: 110, patchable: true },
  { id: 6, x: 210, y: 190, patchable: false },
  { id: 7, x: 210, y: 260, patchable: true },
  { id: 8, x: 290, y: 70, patchable: false },
  { id: 9, x: 290, y: 140, patchable: false },
  { id: 10, x: 290, y: 210, patchable: false },
  { id: 11, x: 330, y: 270, patchable: false },
]

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [1, 5],
  [2, 5],
  [2, 6],
  [3, 6],
  [3, 7],
  [5, 8],
  [5, 9],
  [6, 9],
  [6, 10],
  [7, 10],
  [10, 11],
  [9, 8],
]

const ENTRY = 0
const DANGER = accentHex('danger')
const TEAL = accentHex('teal')

/** Build adjacency list once. */
const ADJ: number[][] = (() => {
  const a: number[][] = NODES.map(() => [])
  for (const [u, v] of EDGES) {
    a[u].push(v)
    a[v].push(u)
  }
  return a
})()

/**
 * Pre-compute per-tick infected sets. Patched nodes can't be infected and
 * can't relay. Returns array where index = tick, value = set of infected ids.
 */
function computeFrames(patched: Set<number>): number[][] {
  const frames: number[][] = []
  const infected = new Set<number>()
  if (!patched.has(ENTRY)) infected.add(ENTRY)
  frames.push([...infected])

  let changed = true
  let guard = 0
  while (changed && guard < 20) {
    guard++
    changed = false
    const frontier = [...infected]
    for (const u of frontier) {
      for (const v of ADJ[u]) {
        if (!infected.has(v) && !patched.has(v)) {
          infected.add(v)
          changed = true
        }
      }
    }
    if (changed) frames.push([...infected])
  }
  return frames
}

export default function WannaCryPropagation() {
  const reduced = useReducedMotionPref()
  const [patchedOn, setPatchedOn] = useState(false)
  const [tick, setTick] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timer = useRef<number | null>(null)

  const patchedSet = patchedOn ? new Set(NODES.filter((n) => n.patchable).map((n) => n.id)) : new Set<number>()
  const framesRef = useRef<number[][]>(computeFrames(patchedSet))
  // recompute whenever the toggle changes
  const framesKey = patchedOn ? 'on' : 'off'
  const prevKey = useRef(framesKey)
  if (prevKey.current !== framesKey) {
    framesRef.current = computeFrames(patchedSet)
    prevKey.current = framesKey
  }
  const frames = framesRef.current
  const lastTick = frames.length - 1

  const infectedNow = new Set(frames[Math.min(tick, lastTick)])
  const patchedCount = patchedSet.size
  const infectedCount = infectedNow.size
  const protectedCount = NODES.length - infectedCount

  useEffect(() => {
    if (!playing) return
    if (tick >= lastTick) {
      setPlaying(false)
      return
    }
    timer.current = window.setTimeout(() => setTick((t) => t + 1), reduced ? 650 : 1000)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [playing, tick, lastTick, reduced])

  const reset = () => {
    setPlaying(false)
    setTick(0)
  }

  const togglePatch = () => {
    setPlaying(false)
    setTick(0)
    setPatchedOn((p) => !p)
  }

  const togglePlay = () => {
    if (tick >= lastTick) {
      setTick(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }

  return (
    <DiagramShell
      id="wannacry-propagation"
      title="WannaCry Propagation"
      description="Watch a worm spread from an entry machine across a network. Apply security patches to a few machines, then replay — patched hosts resist infection and block spread through them."
      onReset={reset}
      footnote="A simplified illustration of how patching reduces exposure — not an exact reconstruction of the 2017 WannaCry event. Real networks have many more hosts, segments and defences."
      controls={
        <>
          <ControlGroup label="Defence">
            <button
              onClick={togglePatch}
              role="switch"
              aria-checked={patchedOn}
              aria-label="Apply security patches"
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors"
              style={{
                borderColor: patchedOn ? TEAL : 'rgb(var(--c-hairline))',
                color: patchedOn ? TEAL : 'rgb(var(--c-muted))',
                background: patchedOn ? `${TEAL}14` : 'transparent',
              }}
            >
              <ShieldCheck className="h-4 w-4" />
              Apply security patches
              <span
                className="ml-1 inline-flex h-4 w-7 items-center rounded-full p-0.5 transition-colors"
                style={{ background: patchedOn ? TEAL : 'rgb(var(--c-hairline))' }}
              >
                <span
                  className="h-3 w-3 rounded-full bg-white transition-transform"
                  style={{ transform: patchedOn ? 'translateX(12px)' : 'translateX(0)' }}
                />
              </span>
            </button>
          </ControlGroup>
          <button
            onClick={togglePlay}
            className="btn-ghost h-9"
            aria-label={playing ? 'Pause propagation' : 'Play propagation'}
            aria-pressed={playing}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{playing ? 'Pause' : tick >= lastTick ? 'Replay' : 'Play'}</span>
          </button>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)]">
        {/* ---- Network ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox="0 0 360 300"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            role="img"
            aria-label={`Network of ${NODES.length} machines. ${infectedCount} infected, ${protectedCount} protected${
              patchedOn ? `, ${patchedCount} patched` : ''
            }.`}
          >
            {EDGES.map(([u, v], i) => {
              const lit = infectedNow.has(u) && infectedNow.has(v)
              return (
                <line
                  key={i}
                  x1={NODES[u].x}
                  y1={NODES[u].y}
                  x2={NODES[v].x}
                  y2={NODES[v].y}
                  stroke={lit ? DANGER : 'rgb(var(--c-hairline))'}
                  strokeWidth={lit ? 2.5 : 1.4}
                  opacity={lit ? 0.9 : 0.55}
                />
              )
            })}

            {NODES.map((n) => {
              const isPatched = patchedSet.has(n.id)
              const isInfected = infectedNow.has(n.id)
              const isEntry = n.id === ENTRY
              const col = isInfected ? DANGER : isPatched ? TEAL : 'rgb(var(--c-muted))'
              return (
                <g key={n.id}>
                  {isInfected && !reduced && (
                    <motion.circle
                      cx={n.x}
                      cy={n.y}
                      r={16}
                      fill={DANGER}
                      initial={{ opacity: 0.4, scale: 1 }}
                      animate={{ opacity: [0.35, 0, 0.35], scale: [1, 1.8, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={isEntry ? 17 : 15}
                    fill="rgb(var(--c-card))"
                    stroke={col}
                    strokeWidth={isInfected || isPatched ? 3 : 1.8}
                    animate={{ scale: isInfected ? [1, 1.12, 1] : 1 }}
                    transition={{ duration: reduced ? 0 : 0.45 }}
                    style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                  />
                  {/* glyph */}
                  {isInfected ? (
                    <g stroke={DANGER} strokeWidth={1.6} fill="none" strokeLinecap="round">
                      <ellipse cx={n.x} cy={n.y + 1} rx={5} ry={6.5} fill={`${DANGER}33`} />
                      <line x1={n.x - 8} y1={n.y - 2} x2={n.x - 5} y2={n.y} />
                      <line x1={n.x + 8} y1={n.y - 2} x2={n.x + 5} y2={n.y} />
                      <line x1={n.x - 8} y1={n.y + 4} x2={n.x - 5} y2={n.y + 3} />
                      <line x1={n.x + 8} y1={n.y + 4} x2={n.x + 5} y2={n.y + 3} />
                    </g>
                  ) : isPatched ? (
                    <path
                      d={`M ${n.x - 4} ${n.y} l 3 3 l 5 -6`}
                      fill="none"
                      stroke={TEAL}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <>
                      <rect x={n.x - 6} y={n.y - 5} width={12} height={8} rx={1.5} fill="none" stroke={col} strokeWidth={1.4} />
                      <line x1={n.x} y1={n.y + 3} x2={n.x} y2={n.y + 6} stroke={col} strokeWidth={1.4} />
                    </>
                  )}
                </g>
              )
            })}
          </svg>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: DANGER }} /> Infected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: TEAL }} /> Patched
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: 'rgb(var(--c-muted))' }} /> Vulnerable
            </span>
          </div>
        </div>

        {/* ---- Live counters ---- */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Counter label="Infected" value={infectedCount} total={NODES.length} color={DANGER} icon={Bug} />
            <Counter label="Protected" value={protectedCount} total={NODES.length} color={TEAL} icon={ShieldCheck} />
          </div>

          <div className="rounded-xl border border-hairline bg-surface/50 p-3">
            <p className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted">
              <span>Spread reached</span>
              <span className="text-ink">
                hop {Math.min(tick, lastTick)} / {lastTick}
              </span>
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[color:rgb(var(--c-hairline))]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: DANGER }}
                animate={{ width: `${(infectedCount / NODES.length) * 100}%` }}
                transition={{ duration: reduced ? 0 : 0.5 }}
              />
            </div>
          </div>

          <div
            className="rounded-xl border p-3 text-sm leading-6"
            style={{
              borderColor: patchedOn ? `${TEAL}44` : `${DANGER}44`,
              background: patchedOn ? `${TEAL}0f` : `${DANGER}0f`,
            }}
          >
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: patchedOn ? TEAL : DANGER }}>
              <Monitor className="h-3.5 w-3.5" />
              {patchedOn ? 'Patches applied' : 'No patches'}
            </p>
            <p className="text-ink">
              {patchedOn ? (
                <>Patched machines resist the exploit and sit on the paths between network segments — so the worm is{' '}
                  <strong>contained</strong> and far fewer hosts fall.</>
              ) : (
                <>With nothing patched, the worm hops freely from host to host and can reach{' '}
                  <strong>almost the entire network</strong>.</>
              )}
            </p>
          </div>

          <Badge color={patchedOn ? TEAL : DANGER} className="self-start">
            {patchedOn ? `${patchedCount} machines patched` : 'All machines unpatched'}
          </Badge>
        </div>
      </div>
    </DiagramShell>
  )
}

function Counter({
  label,
  value,
  total,
  color,
  icon: Icon,
}: {
  label: string
  value: number
  total: number
  color: string
  icon: typeof Bug
}) {
  return (
    <div className="rounded-xl border border-hairline bg-card p-3" style={{ boxShadow: `inset 0 0 0 1px ${color}22` }}>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        {label}
      </p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums" style={{ color }}>
        {value}
        <span className="text-sm font-medium text-muted"> / {total}</span>
      </p>
    </div>
  )
}
