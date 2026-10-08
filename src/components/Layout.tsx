import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { SearchModal } from './SearchModal'
import { BackToTop } from './BackToTop'
import { useProgress } from '../context/ProgressContext'

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const scrollRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const { setLastVisited } = useProgress()

  // Global ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
      if (e.key === '/' && !searchOpen && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen])

  // Scroll to top on route change, remember last chapter route
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    setMobileOpen(false)
    if (location.pathname.startsWith('/chapter/')) setLastVisited(location.pathname)
  }, [location.pathname, setLastVisited])

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-hairline bg-surface/40 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[60] w-72 border-r border-hairline bg-card lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-ghost absolute right-3 top-3 z-10 h-9 w-9 !px-0"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMenu={() => setMobileOpen(true)} onOpenSearch={() => setSearchOpen(true)} />
        <main ref={scrollRef} className="relative flex-1 overflow-y-auto scroll-smooth">
          {children}
          <BackToTop scrollRef={scrollRef} />
        </main>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
