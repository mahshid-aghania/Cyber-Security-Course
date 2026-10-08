import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  Clock,
  HardDriveDownload,
  Lock,
} from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Segmented, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type Frequency = 'daily' | 'hourly' | 'continuous'

const FREQUENCIES: { value: Frequency; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'hourly', label: 'Hourly' },
  { value: 'continuous', label: 'Continuous' },
]

const FREQ_META: Record<Frequency, { window: string; windowWidth: number; severity: 'danger' | 'warn' | 'teal' }> = {
  daily: { window: 'up to ~24 hours of data', windowWidth: 100, severity: 'danger' },
  hourly: { window: 'up to ~1 hour of data', windowWidth: 42, severity: 'warn' },
  continuous: { window: 'only seconds to minutes of data', windowWidth: 12, severity: 'teal' },
}

// Fictional timeline stages.
const STAGES = [
  { label: 'Normal Operations', hint: 'Systems healthy, backups running on schedule.' },
  { label: 'Incident', hint: 'Ransomware detonates and begins encrypting files.' },
  { label: 'Service Disruption', hint: 'Production systems unusable; functions halt.' },
  { label: 'Backup Restoration', hint: 'Teams restore data from the chosen backups.' },
  { label: 'Recovery', hint: 'Services verified and brought back online.' },
] as const

type Status = 'good' | 'warn' | 'bad'

interface Outcome {
  status: Status
  title: string
  detail: string
}

function statusColor(s: Status) {
  return s === 'good' ? accentHex('teal') : s === 'warn' ? accentHex('warn') : accentHex('danger')
}

function StatusIcon({ status, className }: { status: Status; className?: string }) {
  if (status === 'good') return <CheckCircle2 className={className} />
  if (status === 'warn') return <AlertTriangle className={className} />
  return <XCircle className={className} />
}

export default function BackupRecoverySimulator() {
  const reduced = useReducedMotionPref()
  const [frequency, setFrequency] = useState<Frequency>('daily')
  const [isolated, setIsolated] = useState(false)
  const [tested, setTested] = useState(false)

  const reset = useCallback(() => {
    setFrequency('daily')
    setIsolated(false)
    setTested(false)
  }, [])

  const outcomes: Outcome[] = useMemo(() => {
    const freq = FREQ_META[frequency]

    // 1) Data-loss window — worse with infrequent backups.
    const dataLoss: Outcome = {
      status: freq.severity === 'teal' ? 'good' : freq.severity === 'warn' ? 'warn' : 'bad',
      title: 'Data-loss window',
      detail: `With ${frequency} backups, you could lose ${freq.window} created since the last backup.`,
    }

    // 2) Backups reachable by ransomware — worse if NOT isolated.
    const reachable: Outcome = isolated
      ? {
          status: 'good',
          title: 'Backups protected',
          detail: 'Offline / immutable backups are out of the attacker’s reach, so a clean copy survives the attack.',
        }
      : {
          status: 'bad',
          title: 'Backups at risk',
          detail: 'Online, writable backups can be encrypted or deleted by the same ransomware — you may have nothing clean to restore from.',
        }

    // 3) Restoration success — better if tested.
    const restore: Outcome = tested
      ? {
          status: 'good',
          title: 'Restoration smooth',
          detail: 'Because restores were tested beforehand, recovery follows a known, rehearsed procedure.',
        }
      : {
          status: 'warn',
          title: 'Restoration unproven',
          detail: 'Untested backups often hide surprises (missing files, broken restores), making recovery slow and uncertain.',
        }

    return [dataLoss, reachable, restore]
  }, [frequency, isolated, tested])

  // Overall recovery verdict drives the final timeline stage colour.
  const recoverySucceeds = isolated // no clean copy => cannot truly recover
  const recoveryStatus: Status = !isolated ? 'bad' : tested ? 'good' : 'warn'

  // Timeline bar widths (illustrative). Disruption shrinks with better posture.
  const disruptionWidth = useMemo(() => {
    let w = 60
    if (frequency === 'hourly') w -= 10
    if (frequency === 'continuous') w -= 18
    if (isolated) w -= 12
    if (tested) w -= 14
    return Math.max(16, w)
  }, [frequency, isolated, tested])

  return (
    <DiagramShell
      id="backup-recovery-simulator"
      title="Backup & Recovery Simulator"
      description="Adjust the backup strategy and watch a fictional ransomware recovery timeline change. Compare how frequency, isolation and testing affect data loss, whether backups survive the attack, and how smoothly systems come back."
      onReset={reset}
      footnote="Outcomes are illustrative for learning — not real-world guarantees or exact recovery times. Actual results depend on many factors (backup integrity, attack behaviour, staffing, infrastructure and more)."
      controls={
        <div className="flex flex-wrap items-center gap-3">
          <ControlGroup label="Backup frequency">
            <Segmented
              ariaLabel="Backup frequency"
              options={FREQUENCIES}
              value={frequency}
              onChange={setFrequency}
            />
          </ControlGroup>
          <button
            onClick={() => setIsolated((v) => !v)}
            aria-pressed={isolated}
            aria-label="Toggle isolated (offline / immutable) backups"
            className="inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors"
            style={{
              borderColor: isolated ? accentHex('teal') : 'rgb(var(--c-hairline))',
              color: isolated ? accentHex('teal') : 'rgb(var(--c-muted))',
              background: isolated ? `${accentHex('teal')}14` : 'transparent',
            }}
          >
            <Lock className="h-4 w-4" />
            Isolated backups
          </button>
          <button
            onClick={() => setTested((v) => !v)}
            aria-pressed={tested}
            aria-label="Toggle restoration tested"
            className="inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors"
            style={{
              borderColor: tested ? accentHex('cyan') : 'rgb(var(--c-hairline))',
              color: tested ? accentHex('cyan') : 'rgb(var(--c-muted))',
              background: tested ? `${accentHex('cyan')}14` : 'transparent',
            }}
          >
            <HardDriveDownload className="h-4 w-4" />
            Restoration tested
          </button>
        </div>
      }
    >
      {/* Timeline */}
      <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <Clock className="h-3.5 w-3.5 text-violet" />
          Fictional recovery timeline
        </div>
        <ol className="flex flex-wrap items-stretch gap-2">
          {STAGES.map((s, i) => {
            const isIncident = i === 1
            const isDisruption = i === 2
            const isRecovery = i === 4
            const accent =
              isIncident || isDisruption
                ? accentHex('danger')
                : isRecovery
                  ? statusColor(recoveryStatus)
                  : accentHex('cyan')
            return (
              <li
                key={s.label}
                className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl border p-3"
                style={{ borderColor: `${accent}44`, background: `${accent}0d` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{ background: accent, color: '#04121a' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[13px] font-semibold text-ink">{s.label}</span>
                </div>
                <p className="text-xs leading-5 text-muted">{s.hint}</p>
                {isDisruption && (
                  <div className="mt-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: accentHex('danger') }}
                        animate={{ width: `${disruptionWidth}%` }}
                        transition={{ duration: reduced ? 0 : 0.5, ease: 'easeInOut' }}
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-muted">
                      Relative disruption (shorter is better)
                    </p>
                  </div>
                )}
                {isRecovery && (
                  <span
                    className="mt-1 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                    style={{ background: `${statusColor(recoveryStatus)}22`, color: statusColor(recoveryStatus) }}
                  >
                    <StatusIcon status={recoveryStatus} className="h-3 w-3" />
                    {recoverySucceeds ? (tested ? 'Full recovery' : 'Recovers, bumpy') : 'Recovery fails'}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      {/* Outcomes */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {outcomes.map((o) => {
          const c = statusColor(o.status)
          return (
            <motion.div
              key={o.title}
              layout
              className="flex flex-col gap-2 rounded-2xl border p-4"
              style={{ borderColor: `${c}44`, background: `${c}0a` }}
            >
              <div className="flex items-center gap-2">
                <StatusIcon status={o.status} className="h-5 w-5 shrink-0" />
                <h4 className="text-sm font-bold text-ink">{o.title}</h4>
              </div>
              <p className="text-xs leading-5 text-muted">{o.detail}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Headline for the worst-case: unisolated backups */}
      {!isolated && (
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-start gap-2 rounded-xl border p-3"
          style={{ borderColor: `${accentHex('danger')}55`, background: `${accentHex('danger')}0f` }}
        >
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentHex('danger') }} />
          <p className="text-sm leading-6 text-ink">
            The single biggest risk here: without <strong>isolated (offline or immutable)</strong> backups,
            ransomware can encrypt your backups too — leaving no clean copy to restore, no matter how often
            you back up.
          </p>
        </motion.div>
      )}
    </DiagramShell>
  )
}
