import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export const ACCENTS = {
  cyan: '#57D8ED',
  teal: '#5FE0BE',
  violet: '#A78BFA',
  warn: '#F4BE62',
  danger: '#FB7185',
} as const
export type AccentKey = keyof typeof ACCENTS

export function accentHex(a: AccentKey) {
  return ACCENTS[a]
}

/** Small uppercase eyebrow label. */
export function Eyebrow({ children, color = '#57D8ED' }: { children: ReactNode; color?: string }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color }}>
      {children}
    </span>
  )
}

export function Badge({
  children,
  color,
  className = '',
}: {
  children: ReactNode
  color?: string
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
      style={
        color
          ? { borderColor: `${color}55`, color, background: `${color}14` }
          : undefined
      }
    >
      {children}
    </span>
  )
}

export function Card({
  children,
  className = '',
  interactive = false,
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
}) {
  return (
    <div
      className={`card p-5 ${interactive ? 'transition-all hover:border-cyan/40 hover:shadow-glow' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

/** Scroll-reveal wrapper. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Accessible segmented control / tab selector. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  ariaLabel: string
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex flex-wrap gap-1 rounded-xl border border-hairline bg-surface/60 p-1"
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              active ? 'text-[#04121a]' : 'text-muted hover:text-ink'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`seg-${ariaLabel}`}
                className="absolute inset-0 rounded-lg"
                style={{ backgroundImage: 'linear-gradient(100deg,#57D8ED,#5FE0BE)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function Divider() {
  return <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-hairline to-transparent" />
}
