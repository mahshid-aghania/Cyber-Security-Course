import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Eye, EyeOff, Paperclip, Lock, Info, X } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type HotspotKey = 'sender' | 'urgency' | 'link' | 'attachment' | 'credentials' | 'payment'

interface Hotspot {
  key: HotspotKey
  label: string
  why: string
  check: string
}

const HOTSPOTS: Record<HotspotKey, Hotspot> = {
  sender: {
    key: 'sender',
    label: 'Suspicious sender address',
    why: 'The display name says "IT Service Desk" but the real address is a look-alike public domain (it-servicedesk@secure-helpdesk-login.com), not your organisation\'s domain.',
    check: 'Expand the full address and compare the domain to known-good mail from that team. Beware look-alikes that swap or add characters (rn vs m, extra words, wrong TLD).',
  },
  urgency: {
    key: 'urgency',
    label: 'Urgent / pressuring wording',
    why: 'Manufactured urgency ("within 2 hours or your account will be permanently disabled") is designed to make you act before you think.',
    check: 'Slow down. Legitimate IT or finance teams rarely threaten immediate lockout by email. Verify through a channel you already trust.',
  },
  link: {
    key: 'link',
    label: 'Suspicious link',
    why: 'The button text says "secure portal" but the underlying address points to an unrelated look-alike domain. Hover reveals the real destination.',
    check: 'Hover (or long-press on mobile) to preview the true URL before clicking. A padlock / HTTPS only means the connection is encrypted — it does NOT prove the site is genuine.',
  },
  attachment: {
    key: 'attachment',
    label: 'Unexpected attachment',
    why: 'An unsolicited "Invoice_scan.html" attachment can open a fake login page or trigger a download. You weren\'t expecting any file.',
    check: 'Don\'t open attachments you didn\'t ask for — especially executables, macro-enabled Office files, or .html files. Confirm with the sender first.',
  },
  credentials: {
    key: 'credentials',
    label: 'Request for credentials',
    why: 'The message asks you to "re-enter your username and password to keep your account active." Real providers never need you to confirm a password by email.',
    check: 'Never submit credentials via a link in an email. Navigate to the service yourself by typing the known address, and use MFA.',
  },
  payment: {
    key: 'payment',
    label: 'Unusual payment instructions',
    why: 'A last line pushes you to "update banking details for your next payroll deposit" — a classic redirect-the-money tactic.',
    check: 'Treat any change to payment or bank details as high-risk. Verify out-of-band with the person using a known phone number, never the contact details in the email.',
  },
}

const ORDER: HotspotKey[] = ['sender', 'urgency', 'link', 'attachment', 'credentials', 'payment']

const DANGER = accentHex('danger')
const WARN = accentHex('warn')

/** A marker that flags a hotspot inline. */
function Marker({
  active,
  revealed,
  onClick,
  label,
}: {
  active: boolean
  revealed: boolean
  onClick: () => void
  label: string
}) {
  const show = active || revealed
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Inspect: ${label}`}
      className="group relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full align-middle transition-transform hover:scale-110"
      style={{
        background: show ? DANGER : `${DANGER}22`,
        boxShadow: show ? `0 0 0 3px ${DANGER}33` : 'none',
      }}
    >
      <AlertTriangle className="h-3 w-3" style={{ color: show ? '#04121a' : DANGER }} />
    </button>
  )
}

export default function PhishingAnatomy() {
  const reduced = useReducedMotionPref()
  const [selected, setSelected] = useState<HotspotKey | null>(null)
  const [revealAll, setRevealAll] = useState(false)
  const [hoverLink, setHoverLink] = useState(false)

  const reset = () => {
    setSelected(null)
    setRevealAll(false)
    setHoverLink(false)
  }

  const pick = (k: HotspotKey) => setSelected((cur) => (cur === k ? null : k))
  const isRevealed = (k: HotspotKey) => revealAll || selected === k

  const detail = selected ? HOTSPOTS[selected] : null

  return (
    <DiagramShell
      id="phishing-anatomy"
      title="Phishing Email Anatomy"
      description="A fictional email full of red flags. Click the warning markers to learn why each part is suspicious and what to check — or reveal everything at once."
      onReset={reset}
      footnote="Entirely fictional — the sender, links and content are fake and no address is real or clickable. Remember: a padlock / HTTPS only means traffic is encrypted; it does NOT prove a website is legitimate."
      controls={
        <ControlGroup label="View">
          <button
            onClick={() => setRevealAll((r) => !r)}
            role="switch"
            aria-checked={revealAll}
            aria-label="Reveal all warning signs"
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors"
            style={{
              borderColor: revealAll ? WARN : 'rgb(var(--c-hairline))',
              color: revealAll ? WARN : 'rgb(var(--c-muted))',
              background: revealAll ? `${WARN}14` : 'transparent',
            }}
          >
            {revealAll ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            Reveal all
          </button>
        </ControlGroup>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
        {/* ---- Fake email client ---- */}
        <div className="overflow-hidden rounded-2xl border border-hairline bg-card">
          {/* window chrome */}
          <div className="flex items-center gap-1.5 border-b border-hairline bg-surface/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:rgb(var(--c-hairline))]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:rgb(var(--c-hairline))]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:rgb(var(--c-hairline))]" />
            <span className="ml-2 text-xs font-medium text-muted">Inbox — fictional demo</span>
          </div>

          <div className="space-y-3 p-4 sm:p-5">
            {/* Sender */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">From:</span>
              <span className="text-sm font-semibold text-ink">IT Service Desk</span>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-xs transition-colors ${
                  isRevealed('sender') ? 'text-ink' : 'text-muted'
                }`}
                style={isRevealed('sender') ? { background: `${DANGER}1a` } : undefined}
              >
                &lt;it-servicedesk@secure-helpdesk-login.com&gt;
              </span>
              <Marker active={selected === 'sender'} revealed={revealAll} onClick={() => pick('sender')} label={HOTSPOTS.sender.label} />
            </div>

            {/* Subject */}
            <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">Subject:</span>
              <span className="text-sm font-bold text-ink">
                Action required: confirm your account within 2 hours
              </span>
              <Marker active={selected === 'urgency'} revealed={revealAll} onClick={() => pick('urgency')} label={HOTSPOTS.urgency.label} />
            </div>

            {/* Body */}
            <div className="space-y-3 text-sm leading-6 text-ink">
              <p>Dear User,</p>
              <p>
                We detected an issue with your mailbox. Your account will be{' '}
                <span
                  className={`font-semibold transition-colors ${isRevealed('urgency') ? '' : 'text-ink'}`}
                  style={isRevealed('urgency') ? { color: DANGER } : undefined}
                >
                  permanently disabled within 2 hours
                </span>{' '}
                unless you verify immediately.
              </p>
              <p className="flex flex-wrap items-center gap-2">
                Please{' '}
                <span
                  className={`font-semibold transition-colors ${isRevealed('credentials') ? '' : 'text-ink'}`}
                  style={isRevealed('credentials') ? { color: DANGER } : undefined}
                >
                  re-enter your username and password
                </span>{' '}
                to keep your account active.
                <Marker active={selected === 'credentials'} revealed={revealAll} onClick={() => pick('credentials')} label={HOTSPOTS.credentials.label} />
              </p>

              {/* Link button */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span
                  onMouseEnter={() => setHoverLink(true)}
                  onMouseLeave={() => setHoverLink(false)}
                  className="relative inline-block"
                >
                  <button
                    onClick={() => pick('link')}
                    onFocus={() => setHoverLink(true)}
                    onBlur={() => setHoverLink(false)}
                    aria-label="Fake secure portal link (does not navigate). Inspect suspicious link."
                    className="btn-primary h-9 cursor-pointer"
                  >
                    <Lock className="h-4 w-4" />
                    Open secure portal
                  </button>
                  <AnimatePresence>
                    {(hoverLink || isRevealed('link')) && (
                      <motion.span
                        initial={{ opacity: 0, y: reduced ? 0 : 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.18 }}
                        className="absolute left-0 top-full z-10 mt-1.5 whitespace-nowrap rounded-md border border-hairline bg-surface px-2 py-1 font-mono text-[11px] shadow-lg"
                        style={{ color: DANGER }}
                      >
                        → https://secure-helpdesk-login.com/verify?u=... (fake)
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <Marker active={selected === 'link'} revealed={revealAll} onClick={() => pick('link')} label={HOTSPOTS.link.label} />
              </div>

              <p className="flex flex-wrap items-center gap-2 pt-1">
                Also,{' '}
                <span
                  className={`font-semibold transition-colors ${isRevealed('payment') ? '' : 'text-ink'}`}
                  style={isRevealed('payment') ? { color: DANGER } : undefined}
                >
                  update your banking details for your next payroll deposit
                </span>
                .
                <Marker active={selected === 'payment'} revealed={revealAll} onClick={() => pick('payment')} label={HOTSPOTS.payment.label} />
              </p>
            </div>

            {/* Attachment chip */}
            <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors"
                style={{
                  borderColor: isRevealed('attachment') ? `${DANGER}66` : 'rgb(var(--c-hairline))',
                  color: isRevealed('attachment') ? DANGER : 'rgb(var(--c-muted))',
                  background: isRevealed('attachment') ? `${DANGER}0f` : 'transparent',
                }}
              >
                <Paperclip className="h-3.5 w-3.5" />
                Invoice_scan.html
              </span>
              <Marker active={selected === 'attachment'} revealed={revealAll} onClick={() => pick('attachment')} label={HOTSPOTS.attachment.label} />
            </div>
          </div>
        </div>

        {/* ---- Explanation panel ---- */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            {detail ? (
              <motion.div
                key={detail.key}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-card p-5"
                style={{ boxShadow: `inset 0 0 0 1px ${DANGER}22` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${DANGER}1a`, color: DANGER }}>
                      <AlertTriangle className="h-4.5 w-4.5" />
                    </span>
                    <h4 className="text-base font-bold text-ink">{detail.label}</h4>
                  </div>
                  <button onClick={() => setSelected(null)} aria-label="Close explanation" className="btn-ghost h-8 w-8 !px-0">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="rounded-xl border p-3" style={{ borderColor: `${DANGER}44`, background: `${DANGER}0f` }}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: DANGER }}>
                    Why it's suspicious
                  </p>
                  <p className="text-sm leading-6 text-ink">{detail.why}</p>
                </div>

                <div className="rounded-xl border border-hairline bg-surface/50 p-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">What to check</p>
                  <p className="text-sm leading-6 text-ink">{detail.check}</p>
                </div>

                {detail.key === 'link' && (
                  <Badge color={WARN} className="self-start">
                    <Info className="h-3.5 w-3.5" /> HTTPS / padlock ≠ legitimate
                  </Badge>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full min-h-[240px] flex-col gap-3 rounded-2xl border border-dashed border-hairline bg-surface/40 p-5"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" style={{ color: DANGER }} />
                  <p className="text-sm font-semibold text-ink">6 warning signs in this email</p>
                </div>
                <p className="text-sm leading-6 text-muted">
                  Click a red marker on the email — or use “Reveal all” — to learn why each element is a red flag and what to check before you act.
                </p>
                <ul className="mt-auto grid gap-1.5">
                  {ORDER.map((k, i) => (
                    <li key={k}>
                      <button
                        onClick={() => pick(k)}
                        className="flex w-full items-center gap-2 rounded-lg border border-hairline px-3 py-1.5 text-left text-sm text-muted transition-colors hover:border-[color:rgb(var(--c-hairline))] hover:text-ink"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold" style={{ background: `${DANGER}22`, color: DANGER }}>
                          {i + 1}
                        </span>
                        {HOTSPOTS[k].label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DiagramShell>
  )
}
