import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Wrench,
  Handshake,
  Ban,
  TrendingDown,
  Scale,
  CircleAlert,
  Server,
  FolderLock,
  Factory,
} from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Segmented, Badge } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type ScenarioKey = 'records' | 'filesharing' | 'supplier'
type TreatmentKey = 'tolerate' | 'treat' | 'transfer' | 'terminate'

const SCENARIOS: { value: ScenarioKey; label: string }[] = [
  { value: 'records', label: 'Aging server' },
  { value: 'filesharing', label: 'Unapproved app' },
  { value: 'supplier', label: 'Weak supplier' },
]

interface ScenarioMeta {
  key: ScenarioKey
  icon: typeof Server
  headline: string
  detail: string
}

const SCENARIO_META: Record<ScenarioKey, ScenarioMeta> = {
  records: {
    key: 'records',
    icon: Server,
    headline: 'An aging server holds sensitive student records',
    detail:
      'A years-old server stores personal student data. It is past end-of-life, hard to patch, and a single point of failure — but it still runs a system people rely on daily.',
  },
  filesharing: {
    key: 'filesharing',
    icon: FolderLock,
    headline: 'Staff use an unapproved file-sharing app',
    detail:
      'Teams have started sharing work documents through a consumer file-sharing app that IT never vetted. It is convenient and already embedded in how people work.',
  },
  supplier: {
    key: 'supplier',
    icon: Factory,
    headline: 'A critical supplier has weak security',
    detail:
      'A supplier your operations depend on has visibly weak security practices. You cannot easily replace them, but a breach on their side could ripple straight into your organisation.',
  },
}

interface TreatmentMeta {
  key: TreatmentKey
  label: string
  icon: typeof ShieldCheck
  color: string
  definition: string
}

const TREATMENTS: TreatmentMeta[] = [
  {
    key: 'tolerate',
    label: 'Tolerate',
    icon: ShieldCheck,
    color: '#57D8ED',
    definition: 'Accept the risk because it sits within your acceptance criteria / risk appetite.',
  },
  {
    key: 'treat',
    label: 'Treat',
    icon: Wrench,
    color: '#5FE0BE',
    definition: 'Apply controls to reduce the likelihood and/or the impact of the risk.',
  },
  {
    key: 'transfer',
    label: 'Transfer',
    icon: Handshake,
    color: '#A78BFA',
    definition:
      'Share the financial consequences with a third party (e.g. insurance or contracts). Note: accountability — and not every consequence — can be transferred.',
  },
  {
    key: 'terminate',
    label: 'Terminate',
    icon: Ban,
    color: '#FB7185',
    definition: 'Stop the activity or remove the source of the risk entirely.',
  },
]

interface Implication {
  whatHappens: string
  tradeOffs: string
  residual: string
}

const IMPLICATIONS: Record<ScenarioKey, Record<TreatmentKey, Implication>> = {
  records: {
    tolerate: {
      whatHappens:
        'You formally accept the risk of running the aging server as-is, documenting the decision and who signed off.',
      tradeOffs:
        'No cost or disruption now, but the vulnerability stays exactly where it is. This only makes sense if the exposure genuinely falls within your acceptance criteria.',
      residual:
        'High — all of the original likelihood and impact remains; you have only chosen to live with it.',
    },
    treat: {
      whatHappens:
        'You add controls: isolate the server on a segmented network, tighten access, encrypt the records, and schedule a migration to supported hardware.',
      tradeOffs:
        'Takes time, money and effort, and controls must be maintained — but likelihood and impact both drop meaningfully.',
      residual:
        'Lower — reduced, though not zero; legacy systems carry some irreducible risk until retired.',
    },
    transfer: {
      whatHappens:
        'You take out cyber insurance and/or move the data to a managed hosting provider under a contract with security obligations.',
      tradeOffs:
        'Premiums and fees apply, and insurance pays out after the fact. You can share financial loss, but you stay accountable to students and regulators for their data.',
      residual:
        'Moderate — financial sting is cushioned, but breach, reputational and compliance consequences largely remain yours.',
    },
    terminate: {
      whatHappens:
        'You decommission the server and migrate the records into a modern, supported platform (or stop collecting the data you no longer need).',
      tradeOffs:
        'Highest upfront effort and potential disruption during migration, but the risky asset itself is removed.',
      residual:
        'Lowest for this specific risk — the aging-server exposure is gone, though migration introduces its own short-term project risks.',
    },
  },
  filesharing: {
    tolerate: {
      whatHappens:
        'You acknowledge staff are using the app and accept the current situation, perhaps while you gather more information.',
      tradeOffs:
        'Zero friction for staff, but sensitive documents keep flowing through an unvetted service with unknown security.',
      residual: 'High — data continues to leave your control with no added safeguards.',
    },
    treat: {
      whatHappens:
        'You provide a sanctioned alternative, block the unapproved app, and train staff on safe sharing — meeting the underlying need safely.',
      tradeOffs:
        'Needs a usable approved tool and change management, or people route around you. Done well, it keeps the convenience while cutting exposure.',
      residual: 'Lower — risk falls sharply once an approved, monitored tool replaces the shadow one.',
    },
    transfer: {
      whatHappens:
        'You negotiate an enterprise agreement with the vendor carrying security and data-protection terms, shifting some liability contractually.',
      tradeOffs:
        'Contracts can allocate financial/legal responsibility, but you cannot outsource your duty of care for the data itself.',
      residual: 'Moderate — contractual cover helps, yet day-to-day data-handling risk persists.',
    },
    terminate: {
      whatHappens:
        'You block the app outright and prohibit its use, removing that sharing channel completely.',
      tradeOffs:
        'Removes the exposure, but if you offer no alternative staff may find another workaround — so termination often pairs with "treat".',
      residual: 'Low for this channel — though unmet needs can create new shadow-IT risks elsewhere.',
    },
  },
  supplier: {
    tolerate: {
      whatHappens:
        'You accept the supplier risk as it stands, documenting the rationale and your dependency on them.',
      tradeOffs:
        'No disruption to the relationship, but their weak security remains a live route into your organisation.',
      residual: 'High — the supply-chain exposure is unchanged.',
    },
    treat: {
      whatHappens:
        'You work with the supplier to improve: security requirements in the contract, assessments/audits, and limiting their access to only what they need.',
      tradeOffs:
        'Requires supplier cooperation and ongoing oversight, but both likelihood and blast radius shrink.',
      residual: 'Lower — reduced, though you still depend on the supplier acting on commitments.',
    },
    transfer: {
      whatHappens:
        'You add liability, indemnity and breach-notification clauses to the contract and/or carry insurance covering supplier-related incidents.',
      tradeOffs:
        'Shifts financial consequences, but recovery, disruption and reputational fallout can still land on you — and accountability stays with you.',
      residual: 'Moderate — money is covered better than operations or reputation.',
    },
    terminate: {
      whatHappens:
        'You end the relationship and move to a supplier that meets your security bar (or bring the capability in-house).',
      tradeOffs:
        'Switching cost, lead time and operational disruption — only viable if a suitable alternative exists.',
      residual: 'Low for this supplier — but onboarding a new one carries fresh transition risk.',
    },
  },
}

function residualTone(residual: string): string {
  const first = residual.split(/[\s—-]/)[0].toLowerCase()
  if (first.startsWith('high')) return '#FB7185'
  if (first.startsWith('moderate')) return '#F4BE62'
  if (first.startsWith('low')) return '#5FE0BE'
  return '#57D8ED'
}

export default function RiskTreatmentTree() {
  const reduced = useReducedMotionPref()
  const [scenario, setScenario] = useState<ScenarioKey>('records')
  const [choice, setChoice] = useState<TreatmentKey | null>(null)

  const reset = () => {
    setScenario('records')
    setChoice(null)
  }

  const meta = SCENARIO_META[scenario]
  const chosen = choice ? TREATMENTS.find((t) => t.key === choice)! : null
  const impl = choice ? IMPLICATIONS[scenario][choice] : null

  return (
    <DiagramShell
      id="risk-treatment-tree"
      title="Risk Treatment Decision Tree"
      description="Pick a risk scenario, then explore the four Ts of risk treatment. There is no single right answer — choose an option to see what it would mean for this scenario."
      onReset={reset}
      footnote="An exploratory teaching tool, not a graded exercise: none of the four options is universally 'correct'. Real treatment decisions depend on context, cost, legal duties and the organisation's risk appetite — and often combine more than one approach."
      controls={
        <ControlGroup label="Scenario">
          <Segmented
            ariaLabel="Choose a risk scenario"
            options={SCENARIOS}
            value={scenario}
            onChange={(v) => {
              setScenario(v)
              setChoice(null)
            }}
          />
        </ControlGroup>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* ---- Scenario + choices ---- */}
        <div className="flex min-w-0 flex-col gap-4">
          <motion.div
            key={scenario}
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            className="rounded-2xl border border-hairline bg-surface/50 p-4"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Risk scenario
            </p>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warn/15 text-warn">
                <meta.icon className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold leading-6 text-ink">{meta.headline}</h4>
                <p className="mt-1 text-sm leading-6 text-muted">{meta.detail}</p>
              </div>
            </div>
          </motion.div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Choose a treatment — the 4 Ts
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TREATMENTS.map((t) => {
                const isSel = choice === t.key
                const Icon = t.icon
                return (
                  <button
                    key={t.key}
                    onClick={() => setChoice(isSel ? null : t.key)}
                    aria-pressed={isSel}
                    aria-label={`${t.label}: ${t.definition}`}
                    className="flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors"
                    style={{
                      borderColor: isSel ? t.color : 'rgb(var(--c-hairline))',
                      background: isSel ? `${t.color}18` : 'rgb(var(--c-surface) / 0.4)',
                    }}
                  >
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-bold"
                      style={{ color: t.color }}
                    >
                      <Icon className="h-4 w-4" />
                      {t.label}
                    </span>
                    <span className="text-xs leading-5 text-muted">{t.definition}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ---- Implications ---- */}
        <div className="min-w-0">
          {chosen && impl ? (
            <motion.div
              key={`${scenario}-${chosen.key}`}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
              className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-card p-5"
              style={{ boxShadow: `inset 0 0 0 1px ${chosen.color}22` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${chosen.color}1a`, color: chosen.color }}
                >
                  <chosen.icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-ink">{chosen.label}</h4>
                  <p className="text-xs text-muted">What this would mean here</p>
                </div>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <CircleAlert className="h-3.5 w-3.5" style={{ color: chosen.color }} />
                  What happens
                </p>
                <p className="text-sm leading-6 text-ink">{impl.whatHappens}</p>
              </div>

              <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  <Scale className="h-3.5 w-3.5 text-warn" />
                  Trade-offs
                </p>
                <p className="text-sm leading-6 text-ink">{impl.tradeOffs}</p>
              </div>

              <div
                className="mt-auto rounded-xl border p-3"
                style={{
                  borderColor: `${residualTone(impl.residual)}44`,
                  background: `${residualTone(impl.residual)}0f`,
                }}
              >
                <p
                  className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: residualTone(impl.residual) }}
                >
                  <TrendingDown className="h-3.5 w-3.5" />
                  Residual risk
                </p>
                <p className="text-sm leading-6 text-ink">{impl.residual}</p>
              </div>

              {chosen.key === 'transfer' && (
                <Badge color="#A78BFA">
                  Accountability can't be transferred — only financial consequences can be shared.
                </Badge>
              )}
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-6 text-center">
              <div className="flex gap-2">
                {TREATMENTS.map((t) => (
                  <span key={t.key} style={{ color: t.color }}>
                    <t.icon className="h-6 w-6" />
                  </span>
                ))}
              </div>
              <p className="max-w-xs text-sm leading-6 text-muted">
                Pick Tolerate, Treat, Transfer or Terminate to explore what that choice would mean
                for this scenario — what happens, the trade-offs, and the risk left over.
              </p>
            </div>
          )}
        </div>
      </div>
    </DiagramShell>
  )
}
