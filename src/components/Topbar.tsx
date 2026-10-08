import { Menu, Search, Sun, Moon, Accessibility } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function Topbar({
  onOpenMenu,
  onOpenSearch,
}: {
  onOpenMenu: () => void
  onOpenSearch: () => void
}) {
  const { theme, toggleTheme, reducedMotion, toggleReducedMotion } = useTheme()

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-hairline bg-canvas/80 px-4 backdrop-blur-xl lg:px-8">
      <button
        onClick={onOpenMenu}
        className="btn-ghost h-10 w-10 !px-0 lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        onClick={onOpenSearch}
        className="group flex h-10 flex-1 items-center gap-2.5 rounded-xl border border-hairline bg-surface/60 px-3 text-left text-sm text-muted transition-colors hover:border-cyan/40 sm:max-w-sm"
        aria-label="Open search"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 truncate">Search chapters, concepts, diagrams…</span>
        <kbd className="hidden rounded border border-hairline px-1.5 py-0.5 text-[10px] sm:block">⌘K</kbd>
      </button>

      <div className="flex items-center gap-1.5">
        <button
          onClick={toggleReducedMotion}
          className={`btn-ghost h-10 w-10 !px-0 ${reducedMotion ? 'text-cyan' : ''}`}
          aria-pressed={reducedMotion}
          aria-label="Toggle reduced motion"
          title={reducedMotion ? 'Reduced motion: on' : 'Reduced motion: off'}
        >
          <Accessibility className="h-5 w-5" />
        </button>
        <button
          onClick={toggleTheme}
          className="btn-ghost h-10 w-10 !px-0"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  )
}
