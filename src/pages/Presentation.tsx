import { Suspense, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { SLIDES } from '../data/slides'
import { DIAGRAM_MAP } from '../diagrams/registry'
import { ACCENTS } from '../components/ui'
import { DiagramLoading } from '../components/DiagramShell'

export default function Presentation() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [dir, setDir] = useState(1)

  const slide = SLIDES[index]
  const accent = ACCENTS[slide.accent]

  const go = useCallback(
    (delta: number) => {
      setDir(delta)
      setIndex((i) => Math.min(Math.max(i + delta, 0), SLIDES.length - 1))
    },
    [],
  )

  const exit = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    navigate('/')
  }, [navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          go(1)
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          go(-1)
          break
        case 'Home':
          setIndex(0)
          break
        case 'End':
          setIndex(SLIDES.length - 1)
          break
        case 'Escape':
          exit()
          break
        case 'n':
        case 'N':
          setShowNotes((v) => !v)
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, exit])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {})
    else document.exitFullscreen().catch(() => {})
  }

  const Diagram = slide.diagramId ? DIAGRAM_MAP[slide.diagramId]?.component : null

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-canvas">
      {/* progress */}
      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-surface">
        <div className="h-full bg-gradient-to-r from-cyan to-teal transition-all duration-300" style={{ width: `${((index + 1) / SLIDES.length) * 100}%` }} />
      </div>

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted">
          <Icons.ShieldHalf className="h-4 w-4 text-cyan" />
          CYBERATLAS
          <span className="opacity-50">·</span>
          <span>{index + 1} / {SLIDES.length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowNotes((v) => !v)} className={`btn-ghost h-9 ${showNotes ? 'text-cyan' : ''}`} title="Toggle speaker notes (N)">
            <Icons.NotebookPen className="h-4 w-4" /> <span className="hidden sm:inline">Notes</span>
          </button>
          <button onClick={toggleFullscreen} className="btn-ghost h-9 w-9 !px-0" title="Fullscreen (F)">
            <Icons.Maximize className="h-4 w-4" />
          </button>
          <button onClick={exit} className="btn-ghost h-9 w-9 !px-0" title="Exit (Esc)">
            <Icons.X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* slide stage */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 sm:px-12">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full opacity-[0.12] blur-3xl" style={{ background: accent }} />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full opacity-[0.1] blur-3xl" style={{ background: accent }} />

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={slide.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto w-full max-w-5xl"
          >
            {slide.kind === 'title' ? (
              <div className="text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
                  <Icons.Sparkles className="h-3.5 w-3.5" /> A Visual Journey Through Cybersecurity
                </div>
                <h1 className="text-6xl font-extrabold tracking-tight text-ink sm:text-8xl">
                  CYBER<span className="accent-gradient-text">ATLAS</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-xl text-muted">{slide.subtitle}</p>
              </div>
            ) : (
              <div className={Diagram ? 'grid items-center gap-8 lg:grid-cols-2' : ''}>
                <div>
                  {slide.eyebrow && (
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>{slide.eyebrow}</span>
                  )}
                  <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{slide.title}</h2>
                  {slide.subtitle && <p className="mt-3 text-lg text-muted">{slide.subtitle}</p>}
                  {slide.bullets && (
                    <ul className="mt-6 space-y-3">
                      {slide.bullets.map((b, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.08 }}
                          className="flex gap-3 text-lg leading-7 text-ink/90"
                        >
                          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full" style={{ background: accent }} />
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
                {Diagram && (
                  <div className="max-h-[62vh] overflow-y-auto rounded-2xl">
                    <Suspense fallback={<DiagramLoading />}>
                      <Diagram />
                    </Suspense>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* speaker notes */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 34 }}
            className="relative z-20 max-h-[32vh] shrink-0 overflow-y-auto border-t border-hairline bg-surface/95 px-6 py-4 backdrop-blur-xl"
          >
            <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan">
              <Icons.NotebookPen className="h-3.5 w-3.5" /> Speaker notes
            </p>
            <p className="text-sm leading-6 text-muted">{slide.notes}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* nav controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-5 py-4">
        <button onClick={() => go(-1)} disabled={index === 0} className="btn-ghost h-10 disabled:opacity-30">
          <Icons.ChevronLeft className="h-5 w-5" /> <span className="hidden sm:inline">Prev</span>
        </button>
        <div className="flex items-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{ width: i === index ? 24 : 8, background: i === index ? accent : 'rgb(var(--c-hairline))' }}
            />
          ))}
        </div>
        <button onClick={() => go(1)} disabled={index === SLIDES.length - 1} className="btn-primary h-10 disabled:opacity-30">
          <span className="hidden sm:inline">Next</span> <Icons.ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
