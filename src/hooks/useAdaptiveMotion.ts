import { useMemo } from "react"

/**
 * Returns motion config scaled to device capability.
 * Desktop: full animations, parallax, blur
 * Mobile: reduced transforms, lower blur, no parallax
 */
export function useAdaptiveMotion() {
  return useMemo(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      return { parallax: false, blur: false, stagger: 0, intensity: 0 }
    }
    if (isMobile) {
      return { parallax: false, blur: true, stagger: 0.06, intensity: 0.4 }
    }
    return { parallax: true, blur: true, stagger: 0.09, intensity: 1 }
  }, [])
}
