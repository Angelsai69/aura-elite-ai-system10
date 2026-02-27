import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useTyping } from "../hooks/useTyping"
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion"

const MORPH_WORDS = [
  "Secure.",
  "Autonomous.",
  "Inevitable.",
  "The Nervous System of the AI Era.",
]
const TYPING_LINES = [
  "Analyzing market opportunities...",
  "Qualifying 847 inbound leads...",
  "Closing pipeline: $2.4M identified",
  "Deploying workflow automation...",
  "Revenue optimization: +340% projected",
]

export default function Hero() {
  const [morphIdx, setMorphIdx] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const typed = useTyping(TYPING_LINES)
  const motion_ = useAdaptiveMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 35, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 35, damping: 22 })

  useEffect(() => {
    const t = setInterval(() => setMorphIdx(i => (i + 1) % MORPH_WORDS.length), 3200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!motion_.parallax) return
    const el = sectionRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width * 28 * motion_.intensity)
      mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height * 18 * motion_.intensity)
    }
    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [mouseX, mouseY, motion_])

  return (
    /*
      KEY FIX: This element uses .hero-section class — NOT .section.
      .section has overflow:hidden which clips the large AIZA title legs.
      .hero-section sets its own overflow:visible while keeping orbs
      contained in a separate .hero-bg child that has overflow:hidden.
    */
    <div className="hero-section" ref={sectionRef}>

      {/* Orbs/background — overflow:hidden here only, never on the title parent */}
      <div className="hero-bg">
        <div className="deep-sphere deep-sphere-hero" />
        <motion.div className="orb orb-1" style={motion_.parallax ? { x: springX, y: springY } : {}} />
        <motion.div className="orb orb-2" style={motion_.parallax ? { x: springX, y: springY } : {}} />
        <motion.div className="orb orb-3" style={motion_.parallax ? { x: springX, y: springY } : {}} />
        <div className="grid-overlay" />
        <div className="noise-overlay" />
      </div>

      {/* Centred content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}>
          AI Automation Platform
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40, filter: motion_.blur ? "blur(14px)" : "none" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          AIZA
        </motion.h1>

        <motion.div
          key={morphIdx}
          className="hero-morph"
          initial={{ opacity: 0, y: 10, filter: motion_.blur ? "blur(8px)" : "none" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.55 }}
        >
          {MORPH_WORDS[morphIdx]}
        </motion.div>

        <motion.p className="hero-sub"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}>
          <span style={{ color: "var(--accent2)" }}>&gt; </span>
          {typed}
          <span className="typing-cursor" />
        </motion.p>

        <motion.button
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          onClick={() => document.documentElement.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          Explore the Platform <span>→</span>
        </motion.button>
      </motion.div>

      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </div>
  )
}
