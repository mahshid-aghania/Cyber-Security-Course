import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type NodeKind = 'asset' | 'threat' | 'defense' | 'recovery'

interface Node {
  id: number
  x: number
  y: number
  kind: NodeKind
  r: number
}

const KIND_COLOR: Record<NodeKind, string> = {
  asset: '#57D8ED',
  threat: '#FB7185',
  defense: '#5FE0BE',
  recovery: '#A78BFA',
}

/**
 * The landing hero visualisation — an animated network of interconnected nodes
 * representing assets, threats, defenses and recovery. Pure SVG, no library,
 * and it freezes gracefully when reduced motion is requested.
 */
export function NetworkHero() {
  const reduced = useReducedMotionPref()

  const { nodes, edges } = useMemo(() => {
    // Deterministic pseudo-random layout (stable across renders).
    const kinds: NodeKind[] = ['asset', 'threat', 'defense', 'recovery']
    const n: Node[] = []
    let seed = 7
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let i = 0; i < 26; i++) {
      n.push({
        id: i,
        x: 40 + rand() * 720,
        y: 30 + rand() * 360,
        kind: kinds[i % 4],
        r: 3 + rand() * 4,
      })
    }
    // Connect each node to its 2 nearest neighbours.
    const e: { a: number; b: number }[] = []
    for (const node of n) {
      const nearest = n
        .filter((o) => o.id !== node.id)
        .map((o) => ({ o, d: (o.x - node.x) ** 2 + (o.y - node.y) ** 2 }))
        .sort((p, q) => p.d - q.d)
        .slice(0, 2)
      for (const { o } of nearest) {
        if (!e.some((x) => (x.a === o.id && x.b === node.id))) e.push({ a: node.id, b: o.id })
      }
    }
    return { nodes: n, edges: e }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 800 420" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="hero-glow" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#57D8ED" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#070D19" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="420" fill="url(#hero-glow)" />

        {edges.map((e, i) => {
          const a = nodes[e.a]
          const b = nodes[e.b]
          return (
            <motion.line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={KIND_COLOR[a.kind]}
              strokeOpacity={0.18}
              strokeWidth={0.8}
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={reduced ? { opacity: 0.18 } : { pathLength: 1, opacity: 0.18 }}
              transition={{ duration: 1.4, delay: i * 0.03, ease: 'easeOut' }}
            />
          )
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            {!reduced && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r + 5}
                fill={KIND_COLOR[node.kind]}
                opacity={0.12}
                animate={{ r: [node.r + 4, node.r + 9, node.r + 4], opacity: [0.14, 0.04, 0.14] }}
                transition={{ duration: 3 + (node.id % 4), repeat: Infinity, ease: 'easeInOut', delay: node.id * 0.12 }}
              />
            )}
            <circle cx={node.x} cy={node.y} r={node.r} fill={KIND_COLOR[node.kind]} />
          </g>
        ))}
      </svg>
    </div>
  )
}

export const HERO_LEGEND: { kind: NodeKind; label: string }[] = [
  { kind: 'asset', label: 'Assets' },
  { kind: 'threat', label: 'Threats' },
  { kind: 'defense', label: 'Defenses' },
  { kind: 'recovery', label: 'Recovery' },
]
export { KIND_COLOR }
