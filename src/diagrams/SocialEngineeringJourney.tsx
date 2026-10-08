import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, MousePointerClick, ShieldAlert, ChevronRight } from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Segmented, Badge, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type Attack = 'phishing' | 'spear' | 'whaling' | 'bec' | 'smishing' | 'vishing'
type StageKey = 'recon' | 'message' | 'interaction' | 'compromise'

const ATTACKS: { value: Attack; label: string }[] = [
  { value: 'phishing', label: 'Phishing' },
  { value: 'spear', label: 'Spear phishing' },
  { value: 'whaling', label: 'Whaling' },
  { value: 'bec', label: 'BEC' },
  { value: 'smishing', label: 'Smishing' },
  { value: 'vishing', label: 'Vishing' },
]

const STAGES: { key: StageKey; label: string; icon: typeof Search; accent: 'cyan' | 'violet' | 'warn' | 'danger' }[] = [
  { key: 'recon', label: 'Reconnaissance', icon: Search, accent: 'cyan' },
  { key: 'message', label: 'Deceptive Message', icon: Mail, accent: 'violet' },
  { key: 'interaction', label: 'Victim Interaction', icon: MousePointerClick, accent: 'warn' },
  { key: 'compromise', label: 'Possible Compromise', icon: ShieldAlert, accent: 'danger' },
]

const ATTACK_TAGLINE: Record<Attack, string> = {
  phishing: 'Broad, generic email lure',
  spear: 'Targeted at a specific person',
  whaling: 'Aimed at senior leadership',
  bec: 'Impersonated executive / payment fraud',
  smishing: 'Lure delivered by SMS',
  vishing: 'Lure delivered by phone call',
}

const SCENARIOS: Record<Attack, Record<StageKey, string>> = {
  phishing: {
    recon: 'Attacker buys a bulk list of email addresses — no research into any individual. Volume is the strategy.',
    message: 'A generic "Your password will expire — reset now" email is blasted to thousands of inboxes.',
    interaction: 'A fraction of recipients click the reset link and type their credentials into a fake login page.',
    compromise: 'Harvested passwords are reused to break into mailboxes, portals and other reused accounts.',
  },
  spear: {
    recon: 'Attacker studies a named university employee on LinkedIn and the faculty page — role, manager, projects.',
    message: 'A personalised email appears to come from their department, referencing a real project and deadline.',
    interaction: 'Trusting the familiar details, the employee opens the linked "shared document" and signs in.',
    compromise: 'The attacker gains the employee\'s account and pivots into internal systems and research data.',
  },
  whaling: {
    recon: 'Attacker profiles a CFO or dean — press releases, conference talks, travel schedule, assistant\'s name.',
    message: 'A polished message mimics a board member or legal counsel about a confidential, time-sensitive matter.',
    interaction: 'The executive, used to high-stakes requests, reviews the attached "contract" or approves a call.',
    compromise: 'Sensitive strategy is exposed or a large authorisation is granted — a high-value single catch.',
  },
  bec: {
    recon: 'Attacker maps who approves payments and learns the CEO\'s writing style and the finance team structure.',
    message: 'An email "from the CEO" urgently asks finance to wire funds to a new supplier before end of day.',
    interaction: 'The clerk, pressured and wanting to help the boss, processes the transfer without calling to verify.',
    compromise: 'Money lands in the attacker\'s account; by the time it\'s noticed, the funds are gone.',
  },
  smishing: {
    recon: 'Attacker gathers mobile numbers and knows a delivery/parcel SMS is widely expected and rarely scrutinised.',
    message: 'A text says "Your parcel is held — pay a small redelivery fee" with a shortened link.',
    interaction: 'The recipient taps the link on their phone and enters card details on a convincing fake page.',
    compromise: 'Card data and personal details are captured and sold or used for fraudulent charges.',
  },
  vishing: {
    recon: 'Attacker learns which bank or IT helpdesk the target uses and prepares a believable caller-ID spoof.',
    message: 'A phone call warns of "suspicious activity" and claims to be the bank\'s fraud team or IT support.',
    interaction: 'Under pressure, the victim reads out a one-time code or grants remote access to "fix" the issue.',
    compromise: 'The attacker completes a login or takes over the device using the code / access just handed over.',
  },
}

// node x-positions in a 360-wide viewBox
const NODE_X = [45, 150, 255, 345] as const
const NODE_Y = 44

export default function SocialEngineeringJourney() {
  const reduced = useReducedMotionPref()
  const [attack, setAttack] = useState<Attack>('phishing')
  const [stage, setStage] = useState<StageKey>('recon')

  const reset = () => {
    setAttack('phishing')
    setStage('recon')
  }

  const activeIdx = STAGES.findIndex((s) => s.key === stage)
  const activeStage = STAGES[activeIdx]
  const activeAccent = accentHex(activeStage.accent)

  return (
    <DiagramShell
      id="social-engineering-journey"
      title="Social Engineering Attack Journey"
      description="Every social-engineering attack moves through the same four stages. Pick an attack type, then click a stage to see how that stage plays out for it."
      onReset={reset}
      footnote="Illustrative scenarios for education — all names, messages and situations are fictional. Real attacks vary widely; the goal here is to show the common lifecycle and how tactics differ by attack type."
      controls={
        <ControlGroup label="Attack type">
          <Segmented
            ariaLabel="Choose an attack type"
            options={ATTACKS}
            value={attack}
            onChange={(v) => setAttack(v)}
          />
        </ControlGroup>
      }
    >
      <div className="flex flex-col gap-5">
        <Badge color={accentHex('cyan')} className="self-start">
          {ATTACKS.find((a) => a.value === attack)!.label}: {ATTACK_TAGLINE[attack]}
        </Badge>

        {/* ---- Lifecycle track (SVG connectors) ---- */}
        <div className="rounded-2xl border border-hairline bg-surface/40 p-3 sm:p-4">
          <svg
            viewBox="0 0 360 88"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            aria-hidden="true"
          >
            {STAGES.slice(0, -1).map((_, i) => {
              const reached = i < activeIdx
              return (
                <g key={i}>
                  <line
                    x1={NODE_X[i] + 18}
                    y1={NODE_Y}
                    x2={NODE_X[i + 1] - 18}
                    y2={NODE_Y}
                    stroke="rgb(var(--c-hairline))"
                    strokeWidth={2}
                  />
                  <motion.line
                    x1={NODE_X[i] + 18}
                    y1={NODE_Y}
                    x2={NODE_X[i + 1] - 18}
                    y2={NODE_Y}
                    stroke={accentHex(STAGES[i].accent)}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: reached ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.4 }}
                  />
                </g>
              )
            })}
            {STAGES.map((s, i) => {
              const col = accentHex(s.accent)
              const isActive = s.key === stage
              return (
                <circle
                  key={s.key}
                  cx={NODE_X[i]}
                  cy={NODE_Y}
                  r={isActive ? 10 : 7}
                  fill={i <= activeIdx ? col : 'rgb(var(--c-card))'}
                  stroke={col}
                  strokeWidth={2}
                />
              )
            })}
          </svg>

          {/* clickable stage buttons */}
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STAGES.map((s, i) => {
              const col = accentHex(s.accent)
              const isActive = s.key === stage
              const Icon = s.icon
              return (
                <button
                  key={s.key}
                  onClick={() => setStage(s.key)}
                  aria-pressed={isActive}
                  aria-label={`Stage ${i + 1}: ${s.label}`}
                  className="flex flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5 text-center transition-colors"
                  style={{
                    borderColor: isActive ? col : 'rgb(var(--c-hairline))',
                    background: isActive ? `${col}14` : 'transparent',
                  }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: isActive ? col : `${col}1a`, color: isActive ? '#04121a' : col }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className={`text-xs font-semibold leading-tight ${isActive ? 'text-ink' : 'text-muted'}`}>
                    {s.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ---- Stage detail ---- */}
        <motion.div
          key={`${attack}-${stage}`}
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
          className="rounded-2xl border border-hairline bg-card p-5"
          style={{ boxShadow: `inset 0 0 0 1px ${activeAccent}22` }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${activeAccent}1a`, color: activeAccent }}
            >
              <activeStage.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                Stage {activeIdx + 1} of 4
                <ChevronRight className="h-3 w-3" />
                {ATTACKS.find((a) => a.value === attack)!.label}
              </p>
              <h4 className="text-base font-bold text-ink">{activeStage.label}</h4>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-ink">{SCENARIOS[attack][stage]}</p>
        </motion.div>
      </div>
    </DiagramShell>
  )
}
