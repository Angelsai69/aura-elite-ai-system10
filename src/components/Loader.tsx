import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = performance.now()
    const duration = 2200
    const raf = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(raf)
      else {
        setTimeout(() => {
          setVisible(false)
          setTimeout(onDone, 600)
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
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="loader-logo"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            AIZA
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="loader-bar"
          >
            <motion.div
              className="loader-bar-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </motion.div>
          <motion.p
            className="loader-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Initializing AI Core
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
