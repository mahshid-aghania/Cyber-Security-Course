import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Pause,
  StepForward,
  RotateCw,
  Keyboard,
  Cog,
  Database,
  Monitor,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'
import { DiagramShell, ControlGroup } from '../components/DiagramShell'
import { Segmented, accentHex } from '../components/ui'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

type Attack = 'sqli' | 'xss'
type StageKind = 'input' | 'processing' | 'output'

interface Stage {
  kind: StageKind
  label: string
  icon: typeof Keyboard
  /** Text shown for the unsafe pipeline at this stage (static, escaped-looking example). */
  unsafe: string
  unsafeNote: string
  /** Text shown for the safer pipeline at this stage. */
  safe: string
  safeNote: string
}

interface Scenario {
  value: Attack
  label: string
  input: string
  unsafeOutcome: string
  safeOutcome: string
  stages: Stage[]
}

const SCENARIOS: Record<Attack, Scenario> = {
  sqli: {
    value: 'sqli',
    label: 'SQL Injection',
    input: `' OR '1'='1`,
    unsafeOutcome: 'Query logic is subverted — the WHERE clause is always true, so the database returns every row (authentication bypass / data leak).',
    safeOutcome: 'Input is treated purely as data, never as SQL. The crafted string is just a value that matches no user, so login fails safely.',
    stages: [
      {
        kind: 'input',
        label: 'User input',
        icon: Keyboard,
        unsafe: `username = ' OR '1'='1`,
        unsafeNote: 'Attacker types SQL meta-characters into the login field.',
        safe: `username = ' OR '1'='1`,
        safeNote: 'Same hostile input arrives — the difference is what happens next.',
      },
      {
        kind: 'processing',
        label: 'Processing',
        icon: Cog,
        unsafe: `"SELECT * FROM users WHERE name = '" + input + "'"`,
        unsafeNote: 'Input is concatenated straight into the query string, so it becomes part of the SQL itself.',
        safe: `"SELECT * FROM users WHERE name = ?"   // bind: [input]`,
        safeNote: 'A parameterized / prepared statement keeps the query structure fixed; input is bound separately as data.',
      },
      {
        kind: 'output',
        label: 'Query sent to DB',
        icon: Database,
        unsafe: `SELECT * FROM users WHERE name = '' OR '1'='1'`,
        unsafeNote: "The injected OR '1'='1' changes the query's meaning — the condition is always true.",
        safe: `SELECT * FROM users WHERE name = '\\' OR \\'1\\'=\\'1'`,
        safeNote: 'The database searches for a user literally named "\' OR \'1\'=\'1" — no such user, so nothing leaks.',
      },
    ],
  },
  xss: {
    value: 'xss',
    label: 'Cross-Site Scripting (XSS)',
    input: `<script>steal(document.cookie)</script>`,
    unsafeOutcome: 'The markup is rendered as live HTML, so the attacker-supplied script runs in another visitor’s browser (session theft / defacement).',
    safeOutcome: 'Output encoding turns the markup into harmless visible text. The browser displays it as characters, never executing it.',
    stages: [
      {
        kind: 'input',
        label: 'User input',
        icon: Keyboard,
        unsafe: `comment = <script>steal(document.cookie)</script>`,
        unsafeNote: 'Attacker submits a comment containing HTML and script tags.',
        safe: `comment = <script>steal(document.cookie)</script>`,
        safeNote: 'The same untrusted content is received — handling at output is what differs.',
      },
      {
        kind: 'processing',
        label: 'Processing / storage',
        icon: Cog,
        unsafe: `page.innerHTML = comment   // raw, untrusted`,
        unsafeNote: 'The raw value is placed directly into the page markup with no encoding.',
        safe: `page.textContent = encode(comment)   // context-aware`,
        safeNote: 'Output is context-aware encoded (and policies like CSP add defence in depth).',
      },
      {
        kind: 'output',
        label: 'Rendered to browser',
        icon: Monitor,
        unsafe: `<div><script>steal(document.cookie)</script></div>`,
        unsafeNote: 'The browser parses the tags as real HTML — the script could run in another user’s session.',
        safe: `<div>&lt;script&gt;steal(document.cookie)&lt;/script&gt;</div>`,
        safeNote: 'Encoded entities are shown as plain text; the browser never treats it as executable markup.',
      },
    ],
  },
}

const ATTACK_OPTIONS: { value: Attack; label: string }[] = [
  { value: 'sqli', label: 'SQL Injection' },
  { value: 'xss', label: 'Cross-Site Scripting' },
]

const danger = accentHex('danger')
const teal = accentHex('teal')
const warn = accentHex('warn')

function CodeLine({ text, color }: { text: string; color: string }) {
  return (
    <pre
      className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-hairline bg-canvas/70 px-3 py-2 text-[12px] leading-5 text-ink"
      style={{ borderColor: `${color}33` }}
    >
      <code>{text}</code>
    </pre>
  )
}

function Pipeline({
  variant,
  scenario,
  activeStep,
  reduced,
}: {
  variant: 'unsafe' | 'safe'
  scenario: Scenario
  activeStep: number
  reduced: boolean
}) {
  const isUnsafe = variant === 'unsafe'
  const col = isUnsafe ? danger : teal
  const HeaderIcon = isUnsafe ? ShieldAlert : ShieldCheck

  return (
    <section
      className="rounded-2xl border bg-surface/40 p-4"
      style={{ borderColor: `${col}44` }}
      aria-label={isUnsafe ? 'Unsafe handling pipeline' : 'Safer handling pipeline'}
    >
      <header className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${col}1a`, color: col }}>
          <HeaderIcon className="h-4 w-4" />
        </span>
        <div>
          <h4 className="text-sm font-bold text-ink">{isUnsafe ? 'Unsafe handling' : 'Safer handling'}</h4>
          <p className="text-xs text-muted">{isUnsafe ? 'Input mixed into code / markup' : 'Input kept separate from code / markup'}</p>
        </div>
      </header>

      <ol className="space-y-2">
        {scenario.stages.map((stage, i) => {
          const reached = activeStep >= i
          const isCurrent = activeStep === i
          const Icon = stage.icon
          const text = isUnsafe ? stage.unsafe : stage.safe
          const note = isUnsafe ? stage.unsafeNote : stage.safeNote
          return (
            <li key={stage.kind}>
              <motion.div
                animate={{ opacity: reached ? 1 : 0.4 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                className="rounded-xl border p-3"
                style={{
                  borderColor: isCurrent ? col : 'rgb(var(--c-hairline))',
                  background: isCurrent ? `${col}0d` : 'transparent',
                }}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: reached ? col : 'rgb(var(--c-card))', color: reached ? '#04121a' : col, border: `1px solid ${col}` }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {i + 1}. {stage.label}
                  </span>
                  {isCurrent && !reduced && (
                    <motion.span
                      className="ml-auto h-2 w-2 rounded-full"
                      style={{ background: col }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                      aria-hidden
                    />
                  )}
                </div>
                {reached && (
                  <motion.div
                    initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  >
                    <CodeLine text={text} color={col} />
                    <p className="mt-1.5 text-xs leading-5 text-muted">{note}</p>
                  </motion.div>
                )}
              </motion.div>
            </li>
          )
        })}
      </ol>

      {/* Outcome */}
      <div
        className="mt-3 rounded-xl border p-3"
        style={{ borderColor: `${col}55`, background: `${col}0f` }}
      >
        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: col }}>
          {isUnsafe ? <AlertTriangle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
          Outcome: {isUnsafe ? 'Compromise' : 'Safe'}
        </p>
        <p className="text-sm leading-5 text-ink">{isUnsafe ? scenario.unsafeOutcome : scenario.safeOutcome}</p>
      </div>
    </section>
  )
}

export default function SecureInputHandling() {
  const reduced = useReducedMotionPref()
  const [attack, setAttack] = useState<Attack>('sqli')
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  const scenario = SCENARIOS[attack]
  const lastStep = scenario.stages.length - 1

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= lastStep) {
          setPlaying(false)
          return s
        }
        return s + 1
      })
    }, 1300)
    return () => window.clearInterval(id)
  }, [playing, lastStep])

  const reset = () => {
    setStep(0)
    setPlaying(false)
    setAttack('sqli')
  }

  const changeAttack = (a: Attack) => {
    setAttack(a)
    setStep(0)
    setPlaying(false)
  }

  const togglePlay = () => {
    if (!playing && step >= lastStep) setStep(0)
    setPlaying((p) => !p)
  }

  const nextStep = () => {
    setPlaying(false)
    setStep((s) => (s < lastStep ? s + 1 : s))
  }

  return (
    <DiagramShell
      id="secure-input-handling"
      title="Secure vs. Insecure Input Handling"
      description="Follow a piece of hostile user input through two pipelines — unsafe vs. safer — and see why mixing input into code or markup leads to compromise, while keeping it separate stays safe."
      onReset={reset}
      footnote="Conceptual illustration only: no code is executed here. The example strings are shown as static, escaped text to explain how input handling changes a program's behaviour — not to run or reproduce an attack."
      controls={
        <div className="flex flex-wrap items-center gap-3">
          <ControlGroup label="Example">
            <Segmented ariaLabel="Choose an attack example" options={ATTACK_OPTIONS} value={attack} onChange={changeAttack} />
          </ControlGroup>
          <div className="flex items-center gap-2">
            <button onClick={togglePlay} aria-pressed={playing} aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'} className="btn-primary h-9">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{playing ? 'Pause' : 'Play'}</span>
            </button>
            <button onClick={nextStep} aria-label="Advance one stage" className="btn-ghost h-9" disabled={step >= lastStep}>
              <StepForward className="h-4 w-4" />
              <span className="hidden sm:inline">Step</span>
            </button>
            <button onClick={reset} aria-label="Reset walkthrough" className="btn-ghost h-9">
              <RotateCw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      }
    >
      {/* Shared input chip + progress */}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-hairline bg-card/60 px-3 py-2">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: warn }}>
          <Keyboard className="h-3.5 w-3.5" />
          Hostile input
        </span>
        <code className="rounded-md border border-hairline bg-canvas/70 px-2 py-1 text-[12px] text-ink" style={{ borderColor: `${warn}44` }}>
          {scenario.input}
        </code>
        <span className="ml-auto text-xs text-muted">
          Stage {Math.min(step + 1, scenario.stages.length)} of {scenario.stages.length}: {scenario.stages[step].label}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Pipeline variant="unsafe" scenario={scenario} activeStep={step} reduced={reduced} />
        <Pipeline variant="safe" scenario={scenario} activeStep={step} reduced={reduced} />
      </div>

      {/* Key difference */}
      <div className="mt-5 rounded-xl border p-3" style={{ borderColor: `${teal}33`, background: `${teal}0a` }}>
        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: teal }}>
          <ShieldCheck className="h-3.5 w-3.5" />
          The key difference
        </p>
        <p className="text-sm leading-5 text-muted">
          {attack === 'sqli'
            ? 'Unsafe code builds the query by gluing user input into the SQL string, so crafted input becomes part of the command. Parameterized / prepared statements fix the query structure and bind input strictly as data — it can never change the query’s meaning.'
            : 'Unsafe code drops untrusted content straight into the page, so markup is parsed and scripts can run. Context-aware output encoding (plus controls like a Content Security Policy) converts markup into harmless text that the browser only displays.'}
        </p>
      </div>
    </DiagramShell>
  )
}
