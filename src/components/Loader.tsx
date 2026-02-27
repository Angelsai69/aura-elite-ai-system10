import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = performance.now()
    const duration = 2400
    const raf = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(raf)
      else {
        setTimeout(() => {
          setVisible(false)
          setTimeout(onDone, 700)
        }, 300)
      }
    }
    requestAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          // Exit: clip-path wipes UP (bottom edge rises to top) — precise, mechanical
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* AIZA logo — clip-path wipes IN from bottom on entry */}
          <motion.div
            className="loader-logo"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            AIZA
          </motion.div>

          {/* Progress bar — fades in */}
          <motion.div
            className="loader-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <motion.div
              className="loader-bar-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </motion.div>

          {/* Tagline — clip-path wipes in from bottom */}
          <motion.p
            className="loader-tagline"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            Initializing AI Core
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
