import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

const STEPS = [
  { title: "Lead Captured", detail: "Form submitted → webhook triggered", metric: "0.3s", final: "✓" },
  { title: "AI Qualification", detail: "Scoring model: intent + budget + fit", metric: "92%", final: "92%" },
  { title: "CRM Enrichment", detail: "HubSpot updated + Slack notified", metric: "1.1s", final: "✓" },
  { title: "Outreach Sent", detail: "Personalized sequence deployed", metric: "4.2s", final: "✓" },
  { title: "Deal Closed", detail: "Contract signed via DocuSign", metric: "$24k", final: "$24k" },
]

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const dur = 1600
        const raf = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

export default function Demo() {
  const [activeStep, setActiveStep] = useState(-1)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let step = 0
        const runStep = () => {
          setActiveStep(step)
          setProgress(0)
          const start = performance.now()
          const dur = 1800
          const raf = (now: number) => {
            const p = Math.min((now - start) / dur, 1)
            setProgress(p * 100)
            if (p < 1) requestAnimationFrame(raf)
            else {
              step++
              if (step < STEPS.length) setTimeout(runStep, 300)
              else setActiveStep(STEPS.length)
            }
          }
          requestAnimationFrame(raf)
        }
        setTimeout(runStep, 400)
      }
    }, { threshold: 0.3 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section" ref={sectionRef}>
      <div className="bg-layer">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="orb" style={{ width: 500, height: 500, background: "#38bdf8", top: -150, right: -100, opacity: 0.07, position: "absolute", borderRadius: "50%", filter: "blur(80px)" }} />
      </div>

      <div className="demo-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Live Simulation</div>
          <h2 className="section-title">
            Watch a deal<br /><span>close itself.</span>
          </h2>

          <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {[
              { label: "Leads Processed", val: 12847, suffix: "" },
              { label: "Avg Close Time", val: 6, suffix: "s" },
              { label: "Revenue Automated", val: 2400000, suffix: "" },
            ].map(m => (
              <div key={m.label} style={{ flex: 1, minWidth: 140 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{m.label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, color: "var(--accent2)" }}>
                  {m.label === "Revenue Automated" ? "$" : ""}
                  <Counter target={m.val} suffix={m.suffix} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="workflow">
          {STEPS.map((step, i) => {
            const isDone = activeStep > i
            const isActive = activeStep === i
            return (
              <div
                key={step.title}
                className={`workflow-step ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
              >
                <div className="step-indicator">
                  {isDone ? "✓" : i + 1}
                </div>
                <div className="step-info">
                  <div className="step-title">{step.title}</div>
                  <div className="step-detail">{step.detail}</div>
                </div>
                <div className="step-metric">
                  {isDone ? step.final : isActive ? step.metric : "—"}
                </div>
                {isActive && (
                  <div className="step-bar" style={{ width: `${progress}%` }} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
