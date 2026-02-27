import { motion } from "framer-motion"
import { useState } from "react"

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (idx: number) => {
    document.documentElement.scrollTo({ top: idx * window.innerHeight, behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className="top-nav"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <div className="nav-logo" onClick={() => scrollTo(0)}>
          <span className="nav-logo-mark">✦</span>
          <span className="nav-logo-text">AIZA</span>
        </div>

        {/* Center links — desktop only */}
        <div className="nav-links">
          {["Platform", "Features", "Dashboard", "Demo"].map((label, i) => (
            <button key={label} className="nav-link" onClick={() => scrollTo(i + 1)}>
              {label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="nav-actions">
          <button className="nav-signin">Log in</button>
          <button
            className="nav-request-access"
            onClick={() => {
              const el = document.getElementById("cta-section")
              el ? el.scrollIntoView({ behavior: "smooth" }) : window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
            }}
          >
            Request Access
          </button>
          <button
            className="nav-menu"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span className={`hamburger ${menuOpen ? "open" : ""}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          className="nav-mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {["Platform", "Features", "Dashboard", "Demo", "Launch"].map((label, i) => (
            <button key={label} className="nav-mobile-link" onClick={() => scrollTo(i)}>
              {label}
            </button>
          ))}
          <div className="nav-mobile-divider" />
          <button className="nav-mobile-link">Log in</button>
          <button className="nav-mobile-link accent">Sign up →</button>
        </motion.div>
      )}
    </>
  )
}
