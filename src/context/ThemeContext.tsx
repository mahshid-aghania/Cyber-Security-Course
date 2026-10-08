import { createContext, useCallback, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type Theme = 'dark' | 'light'

interface ThemeCtx {
  theme: Theme
  toggleTheme: () => void
  reducedMotion: boolean
  toggleReducedMotion: () => void
}

const Ctx = createContext<ThemeCtx | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>('cyberatlas:theme', 'dark')
  const [reducedMotion, setReducedMotion] = useLocalStorage<boolean>('cyberatlas:reduced-motion', false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    const t = window.setTimeout(() => root.classList.remove('theme-transition'), 450)
    return () => window.clearTimeout(t)
  }, [theme])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reducedMotion)
  }, [reducedMotion])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const toggleReducedMotion = () => setReducedMotion((v) => !v)

  return <Ctx.Provider value={{ theme, toggleTheme, reducedMotion, toggleReducedMotion }}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
