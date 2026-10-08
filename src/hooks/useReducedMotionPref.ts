import { useEffect, useState } from 'react'

/**
 * True when the user prefers reduced motion — either via the OS/browser
 * setting or the in-app toggle (which adds `.reduce-motion` to <html>).
 * Diagrams should use this to disable looping / decorative animation.
 */
export function useReducedMotionPref(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compute = () => setReduced(mq.matches || document.documentElement.classList.contains('reduce-motion'))
    compute()
    mq.addEventListener('change', compute)

    const observer = new MutationObserver(compute)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      mq.removeEventListener('change', compute)
      observer.disconnect()
    }
  }, [])

  return reduced
}
