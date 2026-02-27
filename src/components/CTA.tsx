import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion"

/* ─── Contact Form Modal ─────────────────────────────── */
function ContactModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", message: "" })

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = () => {
    if (!form.firstName || !form.email) return
    setSubmitted(true)
  }

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        {!submitted ? (
          <>
            <div className="modal-title">Request Early Access</div>
            <div className="modal-sub">Tell us about your business. Our team will reach out within 24 hours to get you set up.</div>

            <div className="form-row form-row-2">
              <div>
                <label className="form-label">First Name</label>
                <input className="form-input" name="firstName" placeholder="Alex" value={form.firstName} onChange={handle} />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input className="form-input" name="lastName" placeholder="Morgan" value={form.lastName} onChange={handle} />
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">Work Email</label>
              <input className="form-input" name="email" type="email" placeholder="alex@company.com" value={form.email} onChange={handle} />
            </div>

            <div className="form-row">
              <label className="form-label">Company</label>
              <input className="form-input" name="company" placeholder="Acme Corp" value={form.company} onChange={handle} />
            </div>

            <div className="form-row">
              <label className="form-label">What would you like to automate?</label>
              <input className="form-input" name="message" placeholder="Lead qualification, outreach, reporting..." value={form.message} onChange={handle} />
            </div>

            <button className="modal-btn" onClick={submit}>
              Submit Request →
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", padding: "1rem 0" }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✦</div>
            <div className="modal-title" style={{ marginBottom: "0.75rem" }}>You're on the list.</div>
            <div className="modal-sub">
              We've received your request, {form.firstName}.<br />
              Expect a message at <strong style={{ color: "var(--accent2)" }}>{form.email}</strong> within 24 hours.
            </div>
            <button className="modal-btn" style={{ marginTop: "1.5rem" }} onClick={onClose}>Close</button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ─── Call Modal ─────────────────────────────────────── */
function CallModal({ onClose }: { onClose: () => void }) {
  const dial = () => { window.location.href = "tel:18005551234" }

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center" }}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="call-icon">📞</div>
        <div className="call-number">1-800-555-1234</div>
        <div className="call-note">
          Speak directly with an AIZA automation specialist.<br />
          Free consultation — no commitment required.
        </div>

        <div className="call-hours">
          <div className="call-hours-item">
            <div className="call-hours-label">Mon – Fri</div>
            <div className="call-hours-value">8am – 8pm ET</div>
          </div>
          <div className="call-hours-item">
            <div className="call-hours-label">Saturday</div>
            <div className="call-hours-value">10am – 4pm ET</div>
          </div>
          <div className="call-hours-item">
            <div className="call-hours-label">Avg wait</div>
            <div className="call-hours-value">&lt; 2 minutes</div>
          </div>
        </div>

        <button className="call-btn-dial" onClick={dial}>
          <span>📞</span> Call Now
        </button>
        <button className="call-btn-cancel" onClick={onClose}>Maybe later</button>
      </motion.div>
    </motion.div>
  )
}

/* ─── Magnetic Button ────────────────────────────────── */
function MagneticBtn({ children, primary, onClick }: { children: React.ReactNode; primary?: boolean; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16 })
  const sy = useSpring(y, { stiffness: 180, damping: 16 })
  const motion_ = useAdaptiveMotion()

  const move = (e: React.MouseEvent) => {
    if (!motion_.parallax) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - r.left - r.width / 2) * 0.4)
    y.set((e.clientY - r.top - r.height / 2) * 0.4)
  }

  return (
    <motion.button
      ref={ref}
      className={primary ? "btn btn-primary" : "btn btn-ghost"}
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

/* ─── CTA Section ────────────────────────────────────── */
export default function CTA() {
  const [showContact, setShowContact] = useState(false)
  const [showCall, setShowCall] = useState(false)

  return (
    <>
      <section id="cta-section" className="section" style={{ textAlign: "center" }}>
        <div className="bg-layer">
          <div className="grid-overlay" />
          <div className="noise-overlay" />

          {/* 175% larger dark-blue breathing sphere, clipped 35% at bottom */}
          <div className="deep-sphere deep-sphere-cta" />

          {/* Subtle accent halos */}
          <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 600, height: 350, background: "radial-gradient(ellipse, rgba(110,90,255,0.08) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 640, position: "relative", zIndex: 2, padding: "0 2rem" }}
        >
          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", top: -64, left: "50%", transform: "translateX(-50%)", width: 80, height: 80, border: "1px solid rgba(110,90,255,0.18)", borderTopColor: "rgba(110,90,255,0.6)", borderRadius: "50%" }}
          />

          <div className="section-label" style={{ justifyContent: "center", display: "flex" }}>Join the Waitlist</div>

          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            The future of work<br />
            <span>is autonomous.</span>
          </h2>

          <p style={{ fontFamily: "var(--font)", fontWeight: "var(--w-regular)" as any, color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.85, marginBottom: "2.75rem" }}>
            Join 2,400+ teams already on the waitlist.<br />
            Early access launching Q1 2026.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <MagneticBtn primary onClick={() => setShowContact(true)}>
              Request Early Access →
            </MagneticBtn>
            <MagneticBtn onClick={() => setShowCall(true)}>
              Talk to Sales
            </MagneticBtn>
          </div>

          <p className="flexible-plans">
            Flexible plans for teams of every size. Pricing revealed at launch.
          </p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}
          >
            <div style={{ display: "flex" }}>
              {["#6e5aff", "#00d4ff", "#ff6c9d", "#5affc2", "#ffb347"].map((c, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${c}, ${c}88)`, border: "2px solid #03030a", marginLeft: i > 0 ? -9 : 0 }} />
              ))}
            </div>
            <span style={{ fontFamily: "var(--font)", fontWeight: 400, fontSize: "0.75rem", color: "var(--text-muted)" }}>
              <span style={{ color: "var(--text)", fontWeight: 700 }}>2,400+</span> teams waiting
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showCall && <CallModal onClose={() => setShowCall(false)} />}
      </AnimatePresence>
    </>
  )
}
