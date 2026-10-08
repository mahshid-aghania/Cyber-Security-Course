import { useCallback, useEffect, useState } from 'react'

/**
 * A small, SSR-safe localStorage-backed state hook.
 * Persists JSON-serialisable values and keeps multiple tabs loosely in sync.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [stored, setStored] = useState<T>(readValue)

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* ignore quota / private mode errors */
        }
        return next
      })
    },
    [key],
  )

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setStored(readValue())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, readValue])

  return [stored, setValue] as const
}
