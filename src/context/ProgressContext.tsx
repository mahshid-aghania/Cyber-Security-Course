import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface ProgressCtx {
  readChapters: number[]
  bookmarks: string[] // "chapterSlug#sectionId" or topic keys
  lastVisited: string | null // route path
  isRead: (n: number) => boolean
  toggleRead: (n: number) => void
  isBookmarked: (key: string) => boolean
  toggleBookmark: (key: string) => void
  setLastVisited: (path: string) => void
  resetProgress: () => void
  percentComplete: number
}

const Ctx = createContext<ProgressCtx | null>(null)
const TOTAL_CHAPTERS = 9

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [readChapters, setReadChapters] = useLocalStorage<number[]>('cyberatlas:read', [])
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('cyberatlas:bookmarks', [])
  const [lastVisited, setLast] = useLocalStorage<string | null>('cyberatlas:last', null)

  const isRead = useCallback((n: number) => readChapters.includes(n), [readChapters])
  const toggleRead = useCallback(
    (n: number) => setReadChapters((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n].sort((a, b) => a - b))),
    [setReadChapters],
  )

  const isBookmarked = useCallback((key: string) => bookmarks.includes(key), [bookmarks])
  const toggleBookmark = useCallback(
    (key: string) => setBookmarks((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key])),
    [setBookmarks],
  )

  const setLastVisited = useCallback((path: string) => setLast(path), [setLast])

  const resetProgress = useCallback(() => {
    setReadChapters([])
    setBookmarks([])
    setLast(null)
  }, [setReadChapters, setBookmarks, setLast])

  const percentComplete = useMemo(
    () => Math.round((readChapters.length / TOTAL_CHAPTERS) * 100),
    [readChapters],
  )

  const value: ProgressCtx = {
    readChapters,
    bookmarks,
    lastVisited,
    isRead,
    toggleRead,
    isBookmarked,
    toggleBookmark,
    setLastVisited,
    resetProgress,
    percentComplete,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useProgress() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
