import { motion } from "framer-motion"

const TESTIMONIALS = [
  {
    quote: "We replaced four tools and eliminated two manual headcount processes in under 30 days. AIZA didn't just automate tasks — it rewired how our revenue team operates.",
    name: "Marcus Reid",
    title: "Chief Executive Officer",
    company: "Vanta Capital",
    initials: "MR",
    color: "#6e5aff",
  },
  {
    quote: "I've evaluated every AI orchestration platform on the market. AIZA is the only one that treats integration as a first-class citizen — not an afterthought bolted on after the pitch.",
    name: "Sophia Chen",
    title: "Chief Technology Officer",
    company: "Orion Systems",
    initials: "SC",
    color: "#38bdf8",
  },
  {
    quote: "Our compliance team was the biggest blocker for AI adoption. AIZA's governance layer gave us audit trails, role-based controls, and data isolation out of the box. The CIO objection is gone.",
    name: "David Okafor",
    title: "Chief Information Officer",
    company: "Meridian Group",
    initials: "DO",
    color: "#a78bfa",
  },
]

export default function Testimonials() {
  return (
    <section className="section">
      <div className="bg-layer">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div style={{ position: "absolute", width: 500, height: 300, background: "#a78bfa", top: "10%", left: "50%", transform: "translateX(-50%)", opacity: 0.06, borderRadius: "50%", filter: "blur(80px)" }} />
      </div>

      <div className="testimonials-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">What Leaders Say</div>
          <h2 className="section-title">
            Trusted by executives<br /><span>who can't afford to be wrong.</span>
          </h2>
        </motion.div>

        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="testimonial-card"
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Accent glow */}
              <div className="testimonial-glow" style={{ background: t.color }} />

              {/* Quote mark */}
              <div className="testimonial-quote-mark" style={{ color: t.color }}>"</div>

              {/* Quote text */}
              <p className="testimonial-text">{t.quote}</p>

              {/* Attribution */}
              <div className="testimonial-attribution">
                <div className="testimonial-avatar" style={{ background: `linear-gradient(135deg, ${t.color}55, ${t.color}22)`, borderColor: `${t.color}44` }}>
                  <span style={{ color: t.color }}>{t.initials}</span>
                </div>
                <div className="testimonial-meta">
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">
                    <span style={{ color: t.color }}>{t.title}</span>
                    <span className="testimonial-company"> · {t.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
