import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, User, Building2, Network, HardDrive, AppWindow, Database, KeyRound, Cpu } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Segmented, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type Model = 'saas' | 'paas' | 'iaas'
type Owner = 'provider' | 'customer' | 'shared'
type LayerKey = 'physical' | 'network' | 'host' | 'os' | 'runtime' | 'application' | 'data' | 'identity'

interface LayerMeta {
  key: LayerKey
  label: string
  icon: typeof Cpu
  note: string
}

// Layers ordered bottom-of-stack (physical) → top (data / identity).
const LAYERS: LayerMeta[] = [
  { key: 'physical', label: 'Physical / data centre', icon: Building2, note: 'Buildings, power, cooling and hardware security.' },
  { key: 'network', label: 'Network infrastructure', icon: Network, note: 'Switches, cabling and physical network controls.' },
  { key: 'host', label: 'Host / virtualisation', icon: Cpu, note: 'Hypervisor and the physical host systems.' },
  { key: 'os', label: 'Operating system', icon: HardDrive, note: 'Guest OS, patching and hardening.' },
  { key: 'runtime', label: 'Runtime / middleware', icon: Cpu, note: 'Language runtimes, databases and middleware.' },
  { key: 'application', label: 'Application', icon: AppWindow, note: 'The application code and its configuration.' },
  { key: 'data', label: 'Data', icon: Database, note: 'Your content — classification, backup and encryption keys.' },
  { key: 'identity', label: 'Identity & access', icon: KeyRound, note: 'User accounts, permissions and MFA.' },
]

// Who owns each layer per service model.
const OWNERSHIP: Record<Model, Record<LayerKey, Owner>> = {
  iaas: {
    physical: 'provider',
    network: 'provider',
    host: 'provider',
    os: 'customer',
    runtime: 'customer',
    application: 'customer',
    data: 'customer',
    identity: 'customer',
  },
  paas: {
    physical: 'provider',
    network: 'provider',
    host: 'provider',
    os: 'provider',
    runtime: 'provider',
    application: 'customer',
    data: 'customer',
    identity: 'customer',
  },
  saas: {
    physical: 'provider',
    network: 'provider',
    host: 'provider',
    os: 'provider',
    runtime: 'provider',
    application: 'provider',
    data: 'shared',
    identity: 'customer',
  },
}

const MODELS: { value: Model; label: string }[] = [
  { value: 'saas', label: 'SaaS' },
  { value: 'paas', label: 'PaaS' },
  { value: 'iaas', label: 'IaaS' },
]

function ownerColor(o: Owner): string {
  if (o === 'provider') return accentHex('cyan')
  if (o === 'customer') return accentHex('violet')
  return accentHex('teal') // shared
}

function ownerLabel(o: Owner): string {
  if (o === 'provider') return 'Cloud provider'
  if (o === 'customer') return 'Customer'
  return 'Shared'
}

export default function CloudSharedResponsibility() {
  const reduced = useReducedMotionPref()
  const [model, setModel] = useState<Model>('iaas')

  const map = OWNERSHIP[model]
  const providerCount = LAYERS.filter((l) => map[l.key] === 'provider').length
  const customerCount = LAYERS.filter((l) => map[l.key] === 'customer').length
  const sharedCount = LAYERS.filter((l) => map[l.key] === 'shared').length

  return (
    <DiagramShell
      id="cloud-shared-responsibility"
      title="Cloud Shared Responsibility"
      description="Switch between SaaS, PaaS and IaaS to see how responsibility shifts between the cloud provider and the customer. The more managed the service, the more the provider owns."
      footnote="A conceptual model: exact responsibilities depend on the specific service and provider contract. Many providers publish their own shared-responsibility matrices — always check yours."
      controls={
        <ControlGroup label="Service model">
          <Segmented ariaLabel="Choose a cloud service model" options={MODELS} value={model} onChange={(v) => setModel(v)} />
        </ControlGroup>
      }
    >
      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-medium">
        <span className="inline-flex items-center gap-1.5 text-muted">
          <Cloud className="h-4 w-4" style={{ color: accentHex('cyan') }} />
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: accentHex('cyan') }} /> Cloud provider ({providerCount})
        </span>
        <span className="inline-flex items-center gap-1.5 text-muted">
          <User className="h-4 w-4" style={{ color: accentHex('violet') }} />
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: accentHex('violet') }} /> Customer ({customerCount})
        </span>
        <span className="inline-flex items-center gap-1.5 text-muted">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: accentHex('teal') }} /> Shared ({sharedCount})
        </span>
      </div>

      {/* Stack — top layer (identity) rendered first for an intuitive top-down read */}
      <div
        className="space-y-2"
        role="list"
        aria-label={`Responsibility by layer for ${MODELS.find((m) => m.value === model)!.label}`}
      >
        {[...LAYERS].reverse().map((l) => {
          const owner = map[l.key]
          const col = ownerColor(owner)
          const Icon = l.icon
          // Horizontal weight of the fill hints at who carries more.
          const providerSide = owner === 'provider' || owner === 'shared'
          const customerSide = owner === 'customer' || owner === 'shared'
          return (
            <div
              key={l.key}
              role="listitem"
              className="overflow-hidden rounded-xl border border-hairline bg-surface/40"
            >
              <div className="relative grid grid-cols-[1fr_auto] items-center gap-2 px-3 py-2.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                {/* Layer label */}
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${col}1a`, color: col }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{l.label}</p>
                    <p className="hidden truncate text-xs text-muted sm:block">{l.note}</p>
                  </div>
                </div>

                {/* Ownership bar: provider (left) vs customer (right) */}
                <div className="flex h-8 overflow-hidden rounded-lg border border-hairline">
                  <motion.div
                    className="flex items-center justify-center text-[11px] font-bold"
                    animate={{ flexGrow: providerSide ? (owner === 'shared' ? 1 : 1) : 0.001 }}
                    transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: providerSide ? `${accentHex(owner === 'shared' ? 'teal' : 'cyan')}` : 'transparent',
                      color: providerSide ? '#04121a' : 'transparent',
                      flexBasis: 0,
                    }}
                  >
                    {providerSide ? (owner === 'shared' ? 'Shared' : 'Provider') : ''}
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center text-[11px] font-bold"
                    animate={{ flexGrow: customerSide && owner !== 'shared' ? 1 : 0.001 }}
                    transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: customerSide && owner !== 'shared' ? accentHex('violet') : 'transparent',
                      color: customerSide && owner !== 'shared' ? '#04121a' : 'transparent',
                      flexBasis: 0,
                    }}
                  >
                    {customerSide && owner !== 'shared' ? 'Customer' : ''}
                  </motion.div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary strip */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border p-3" style={{ borderColor: `${accentHex('cyan')}44`, background: `${accentHex('cyan')}0f` }}>
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('cyan') }}>
            <Cloud className="h-3.5 w-3.5" /> Provider owns more as you move toward SaaS
          </p>
          <p className="text-sm leading-6 text-ink">
            In <strong>SaaS</strong> the provider runs almost the whole stack. In <strong>IaaS</strong> they only manage the lowest layers.
          </p>
        </div>
        <div className="rounded-xl border p-3" style={{ borderColor: `${accentHex('violet')}44`, background: `${accentHex('violet')}0f` }}>
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: accentHex('violet') }}>
            <User className="h-3.5 w-3.5" /> Customer always owns some layers
          </p>
          <p className="text-sm leading-6 text-ink">
            Across every model, <strong>data and identity</strong> stay largely your responsibility — whoever owns {ownerLabel('customer').toLowerCase()} accounts owns the risk.
          </p>
        </div>
      </div>
    </DiagramShell>
  )
}
