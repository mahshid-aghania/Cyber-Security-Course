import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Factory, Globe2, MapPin, Users, Target, X } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Segmented, Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type Kind = 'law' | 'standard'
type FilterKey = 'all' | Kind

interface Regulation {
  id: string
  name: string
  full: string
  jurisdiction: string
  purpose: string
  appliesTo: string
  kind: Kind
}

const REGULATIONS: Regulation[] = [
  {
    id: 'gdpr',
    name: 'GDPR',
    full: 'General Data Protection Regulation',
    jurisdiction: 'EU / EEA',
    purpose: 'Protection of personal data and privacy of individuals.',
    appliesTo: 'Any organisation that processes personal data of people in the EU/EEA — including companies based elsewhere that target or monitor them.',
    kind: 'law',
  },
  {
    id: 'nis2',
    name: 'NIS / NIS2',
    full: 'Network and Information Systems Directive',
    jurisdiction: 'EU (UK: NIS Regulations)',
    purpose: 'Security and resilience of network and information systems.',
    appliesTo: 'Operators of essential services and important/digital entities (e.g. energy, transport, health, digital infrastructure).',
    kind: 'law',
  },
  {
    id: 'ccpa',
    name: 'CCPA',
    full: 'California Consumer Privacy Act',
    jurisdiction: 'California, USA',
    purpose: 'Consumer privacy rights over personal information.',
    appliesTo: 'Qualifying for-profit businesses that collect personal information of California residents and meet size/revenue thresholds.',
    kind: 'law',
  },
  {
    id: 'lgpd',
    name: 'LGPD',
    full: 'Lei Geral de Proteção de Dados',
    jurisdiction: 'Brazil',
    purpose: 'Protection of personal data (Brazil’s GDPR-style law).',
    appliesTo: 'Organisations that process personal data of individuals in Brazil, regardless of where the organisation is located.',
    kind: 'law',
  },
  {
    id: 'pcidss',
    name: 'PCI DSS',
    full: 'Payment Card Industry Data Security Standard',
    jurisdiction: 'Global',
    purpose: 'Securing the storage, processing and transmission of payment card data.',
    appliesTo: 'Any organisation that stores, processes or transmits cardholder data — enforced by card brands and contracts, not by a government.',
    kind: 'standard',
  },
]

const FILTERS: { value: FilterKey; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'law', label: 'Laws' },
  { value: 'standard', label: 'Standards' },
]

const KIND_META: Record<Kind, { label: string; accent: 'violet' | 'warn'; icon: typeof Scale }> = {
  law: { label: 'Law / Regulation', accent: 'violet', icon: Scale },
  standard: { label: 'Industry Standard', accent: 'warn', icon: Factory },
}

export default function RegulationExplorer() {
  const reduced = useReducedMotionPref()
  const [filter, setFilter] = useState<FilterKey>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const reset = () => {
    setFilter('all')
    setSelectedId(null)
  }

  const visible = REGULATIONS.filter((r) => filter === 'all' || r.kind === filter)
  const selected = selectedId ? REGULATIONS.find((r) => r.id === selectedId) ?? null : null

  return (
    <DiagramShell
      id="regulation-explorer"
      title="Security Regulation Explorer"
      description="Click a card to see its jurisdiction, purpose and who it applies to. Notice which items are laws versus industry standards, and filter between them."
      onReset={reset}
      footnote="Simplified overview — not legal advice. Whether a law or standard applies depends on an organisation’s specific circumstances (location, sector, data handled, contracts, size). Always consult qualified legal or compliance professionals."
      controls={
        <ControlGroup label="Type">
          <Segmented ariaLabel="Filter by type" options={FILTERS} value={filter} onChange={(v) => setFilter(v)} />
        </ControlGroup>
      }
    >
      <div className="flex flex-col gap-3">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">Key:</span>
          <Badge color={accentHex('violet')}>
            <Scale className="h-3.5 w-3.5" /> Law / Regulation
          </Badge>
          <Badge color={accentHex('warn')}>
            <Factory className="h-3.5 w-3.5" /> Industry Standard
          </Badge>
        </div>

        {/* Cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((r) => {
            const km = KIND_META[r.kind]
            const col = accentHex(km.accent)
            const isSel = selectedId === r.id
            const Icon = km.icon
            return (
              <motion.button
                key={r.id}
                layout={!reduced}
                onClick={() => setSelectedId(isSel ? null : r.id)}
                aria-pressed={isSel}
                aria-label={`${r.name} — ${km.label}. ${isSel ? 'Hide' : 'Show'} details.`}
                className="card group flex flex-col gap-2 p-4 text-left transition-all hover:shadow-glow"
                style={{
                  borderColor: isSel ? col : undefined,
                  boxShadow: isSel ? `inset 0 0 0 1px ${col}` : undefined,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${col}1a`, color: col }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                    style={{ borderColor: `${col}55`, color: col, background: `${col}12` }}
                  >
                    {r.kind === 'law' ? 'Law' : 'Standard'}
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-ink">{r.name}</h4>
                  <p className="truncate text-xs text-muted" title={r.full}>
                    {r.full}
                  </p>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: col }} />
                  {r.jurisdiction}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Detail panel */}
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            className="relative rounded-2xl border border-hairline bg-surface/50 p-5"
            style={{ boxShadow: `inset 0 0 0 1px ${accentHex(KIND_META[selected.kind].accent)}33` }}
          >
            <button
              onClick={() => setSelectedId(null)}
              aria-label="Close details"
              className="btn-ghost absolute right-3 top-3 h-8 w-8 !px-0"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-wrap items-center gap-3 pr-10">
              <h4 className="text-lg font-bold text-ink">{selected.name}</h4>
              <Badge color={accentHex(KIND_META[selected.kind].accent)}>
                {(() => {
                  const Icon = KIND_META[selected.kind].icon
                  return <Icon className="h-3.5 w-3.5" />
                })()}
                {KIND_META[selected.kind].label}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-muted">{selected.full}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <DetailBlock icon={Globe2} accent="cyan" label="Jurisdiction" text={selected.jurisdiction} />
              <DetailBlock icon={Target} accent="teal" label="Purpose" text={selected.purpose} />
              <DetailBlock icon={Users} accent="violet" label="Who it applies to" text={selected.appliesTo} />
            </div>
          </motion.div>
        ) : (
          <p className="rounded-xl border border-dashed border-hairline bg-surface/30 px-4 py-3 text-center text-sm text-muted">
            Select a regulation above to view its full details.
          </p>
        )}
      </div>
    </DiagramShell>
  )
}

function DetailBlock({
  icon: Icon,
  accent,
  label,
  text,
}: {
  icon: typeof Globe2
  accent: 'cyan' | 'teal' | 'violet'
  label: string
  text: string
}) {
  const col = accentHex(accent)
  return (
    <div className="rounded-xl border border-hairline bg-card p-3">
      <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
        <Icon className="h-3.5 w-3.5" style={{ color: col }} />
        {label}
      </p>
      <p className="text-sm leading-6 text-ink">{text}</p>
    </div>
  )
}
