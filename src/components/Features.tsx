import { motion } from "framer-motion"
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion"

const ICONS = {
  automation: (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6C22 6 10 10 10 22C10 28 13 33 18 36" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M22 6C22 6 34 10 34 22C34 28 31 33 26 36" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M15 38C17.5 39.2 19.7 39.8 22 39.8C24.3 39.8 26.5 39.2 29 38" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/>
      <circle cx="22" cy="22" r="4.5" stroke="currentColor" strokeWidth="2.6"/>
      <path d="M22 17.5V11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/>
    </svg>
  ),
  intelligence: (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22" cy="22" rx="16" ry="9" stroke="currentColor" strokeWidth="2.6"/>
      <ellipse cx="22" cy="22" rx="16" ry="9" stroke="currentColor" strokeWidth="2.6" transform="rotate(60 22 22)"/>
      <ellipse cx="22" cy="22" rx="16" ry="9" stroke="currentColor" strokeWidth="2.6" transform="rotate(120 22 22)"/>
      <circle cx="22" cy="22" r="3" stroke="currentColor" strokeWidth="2.4"/>
    </svg>
  ),
  revenue: (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32 L16 22 L22 27 L32 14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 14 H36 V22" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 38 H36" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  ),
  security: (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 5L8 10V22C8 30.5 14.4 38.2 22 40C29.6 38.2 36 30.5 36 22V10L22 5Z" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 22L20 27L29 17" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  integrations: (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="22" r="5" stroke="currentColor" strokeWidth="2.6"/>
      <circle cx="34" cy="10" r="5" stroke="currentColor" strokeWidth="2.6"/>
      <circle cx="34" cy="34" r="5" stroke="currentColor" strokeWidth="2.6"/>
      <path d="M15 22 Q24 22 29 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M15 22 Q24 22 29 30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="2.6"/>
      <circle cx="22" cy="22" r="8" stroke="currentColor" strokeWidth="2.4"/>
      <path d="M22 6 V14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M36.5 14 L29.5 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
      <circle cx="22" cy="22" r="2.5" fill="currentColor"/>
    </svg>
  ),
}

const CARDS = [
  {
    key: "automation",
    title: "Instant Automation",
    pain: "Every workflow delay is a revenue leak your P&L can't see.",
    shift: "AIZA turns business intent into live automation — no tickets, no lag.",
    line: "Remove execution latency. Keep the edge.",
    color: "#6e5aff",
  },
  {
    key: "intelligence",
    title: "Neural Intelligence",
    pain: "Siloed AI tools create siloed failures — the same mistakes, repeated at scale.",
    shift: "AIZA builds a shared intelligence layer that learns and coordinates across your entire org.",
    line: "Turn your company into a system that gets smarter every day.",
    color: "#38bdf8",
  },
  {
    key: "revenue",
    title: "Revenue Engine",
    pain: "A 5-minute response delay kills 80% of your conversions. Silently.",
    shift: "AIZA qualifies, routes, and activates every lead the moment it arrives.",
    line: "Stop reporting on revenue. Start compounding it.",
    color: "#a78bfa",
  },
  {
    key: "security",
    title: "Enterprise Security",
    pain: "Ungoverned AI is your next compliance crisis waiting to happen.",
    shift: "AIZA centralizes every AI action — role-based access, data isolation, full audit trails.",
    line: "Make AI something your CIO approves of, not fears.",
    color: "#4ade80",
  },
  {
    key: "integrations",
    title: "Universal Integration",
    pain: "30–70 SaaS tools. Zero real coordination. Constant execution gaps.",
    shift: "AIZA orchestrates your entire stack — routing data, actions, and context intelligently.",
    line: "The intelligence layer your tools never had.",
    color: "#fb923c",
  },
  {
    key: "analytics",
    title: "Live Analytics",
    pain: "Your dashboards show what happened. Your competitors already know what's happening.",
    shift: "AIZA monitors live, flags risk in real time, and triggers corrections before damage compounds.",
    line: "Stop seeing the past. Start acting on the present.",
    color: "#f472b6",
  },
]

export default function Features() {
  const motion_ = useAdaptiveMotion()
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: motion_.stagger } },
  }
  const item = {
    hidden: { opacity: 0, y: 28, filter: motion_.blur ? "blur(8px)" : "none" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="section-tall">
      <div className="bg-layer">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div style={{ position: "absolute", width: 400, height: 400, background: "#6e5aff", bottom: -100, right: 80, opacity: 0.08, borderRadius: "50%", filter: "blur(80px)" }} />
      </div>

      <div className="features-content" style={{ overflowY: "visible" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-label">Core Capabilities</div>
          <h2 className="section-title">Built for teams that<br /><span>refuse to lose.</span></h2>
        </motion.div>

        <motion.div
          className="card-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {CARDS.map((card) => (
            <motion.div key={card.key} className="card" variants={item}>
              <div className="card-glow" style={{ background: card.color }} />
              <div className="card-icon-wrap" style={{ color: card.color }}>
                {ICONS[card.key as keyof typeof ICONS]}
              </div>
              <div className="card-title">{card.title}</div>
              {/* 3-line structure: pain → shift → positioning line */}
              <div className="card-pain">{card.pain}</div>
              <div className="card-shift">{card.shift}</div>
              <div className="card-line" style={{ color: card.color }}>{card.line}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium closing statement */}
        <motion.div
          className="features-closing"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="features-closing-rule" />
          <p className="features-closing-text">
            AIZA is the{" "}
            <span className="features-closing-highlight">AI Operating Layer</span>
            {" "}that removes execution friction, compounds intelligence, and drives revenue across the enterprise —{" "}
            <em>securely, reliably, in real time.</em>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
