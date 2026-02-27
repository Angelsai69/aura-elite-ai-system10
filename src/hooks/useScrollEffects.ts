import { useEffect, useState, useRef } from "react"

/**
 * Tracks scroll position, active section index, and
 * per-section blur depth.
 *
 * Blur logic: each section has a "safe zone" = centre 80% of the viewport.
 * When a section scrolls outside that zone (top 10% or bottom 10%),
 * blur ramps up smoothly from 0 → max.
 */
export function useScrollEffects(sectionCount: number) {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [sectionProgress, setSectionProgress] = useState(0)
  const [sectionBlur, setSectionBlur] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    const el = document.documentElement
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const sy = el.scrollTop
          const vh = window.innerHeight
          const idx = Math.floor(sy / vh)
          const progress = (sy % vh) / vh   // 0 → 1 within the current section

          setScrollY(sy)
          setActiveSection(Math.min(idx, sectionCount - 1))
          setSectionProgress(progress)

          // Safe zone: centre 80% = progress 0.10 → 0.90
          // Outside that: ramp blur 0 → 6px
          const SAFE_START = 0.10
          const SAFE_END   = 0.90
          const MAX_BLUR   = 6

          let blur = 0
          if (progress < SAFE_START) {
            // Entering from top — fade in
            blur = ((SAFE_START - progress) / SAFE_START) * MAX_BLUR
          } else if (progress > SAFE_END) {
            // Exiting toward bottom — fade out
            blur = ((progress - SAFE_END) / (1 - SAFE_END)) * MAX_BLUR
          }

          setSectionBlur(blur)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [sectionCount])

  // Keep legacy transitionBlur for the overlay (now driven by sectionBlur)
  const transitionBlur = sectionBlur

  return { scrollY, activeSection, sectionProgress, transitionBlur, sectionBlur }
}
