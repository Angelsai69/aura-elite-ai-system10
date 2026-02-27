import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion"

// ── Workflow steps ──────────────────────────────────────
const STEPS = [
  { title: "Lead Captured",    detail: "Form submitted → webhook triggered",      metric: "0.3s",  final: "✓" },
  { title: "AI Qualification", detail: "Scoring model: intent + budget + fit",    metric: "92%",   final: "92%" },
  { title: "CRM Enrichment",   detail: "HubSpot updated + Slack notified",        metric: "1.1s",  final: "✓" },
  { title: "Outreach Sent",    detail: "Personalized sequence deployed",           metric: "4.2s",  final: "✓" },
  { title: "Deal Closed",      detail: "Contract signed via DocuSign",             metric: "$24k",  final: "$24k" },
]

// ── Dashboard metrics ───────────────────────────────────
const METRICS = [
  { label: "Active Workflows", value: 247,    suffix: "",   delta: "+12 today" },
  { label: "Leads Qualified",  value: 3841,   suffix: "",   delta: "+89 this hour" },
  { label: "Revenue Closed",   value: 128400, suffix: "",   prefix: "$", delta: "+$4.2k today" },
  { label: "Time Saved",       value: 94,     suffix: "%",  delta: "vs manual ops" },
]

const ACTIVITY = [
  { time: "0:02s ago", msg: "Lead #3841 qualified — score 94/100",      type: "success" },
  { time: "0:18s ago", msg: "HubSpot contact enriched — 6 fields",      type: "info" },
  { time: "0:31s ago", msg: "Sequence triggered — 3-step email drip",   type: "info" },
  { time: "1:04s ago", msg: "Deal $9,200 moved to Proposal stage",      type: "success" },
  { time: "2:47s ago", msg: "Calendar invite auto-sent to prospect",     type: "info" },
  { time: "4:12s ago", msg: "Contract signed — DocuSign confirmed",      type: "success" },
]

// ── Animated counter ────────────────────────────────────
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
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
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

// ── Live dashboard metric ───────────────────────────────
function LiveMetric({ label, value, suffix, prefix = "", delta }: typeof METRICS[0] & { prefix?: string }) {
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const delay = setTimeout(() => {
      const animate = (now: number) => {
        const p = Math.min((now - start) / 1400, 1)
        setDisplayed(Math.round((1 - Math.pow(1 - p, 3)) * value))
        if (p < 1) raf = requestAnimationFrame(animate)
      }
      raf = requestAnimationFrame(animate)
    }, 300)
    return () => { clearTimeout(delay); cancelAnimationFrame(raf) }
  }, [value])
  return (
    <div className="dash-metric">
      <div className="dash-metric-value">{prefix}{displayed.toLocaleString()}{suffix}</div>
      <div className="dash-metric-label">{label}</div>
      <div className="dash-metric-delta">{delta}</div>
    </div>
  )
}

// ── Main component ──────────────────────────────────────
export default function LivePlatform() {
  const motion_ = useAdaptiveMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(-1)
  const [progress, setProgress]    = useState(0)
  const [tick, setTick]            = useState(0)
  const started = useRef(false)

  // Auto-run workflow sim on scroll-in
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let step = 0
        const runStep = () => {
          setActiveStep(step)
          setProgress(0)
          const t0 = performance.now()
          const dur = 1800
          const raf = (now: number) => {
            const p = Math.min((now - t0) / dur, 1)
            setProgress(p * 100)
            if (p < 1) requestAnimationFrame(raf)
            else { step++; if (step < STEPS.length) setTimeout(runStep, 300) else setActiveStep(STEPS.length) }
          }
          requestAnimationFrame(raf)
        }
        setTimeout(runStep, 400)
      }
    }, { threshold: 0.2 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Pulse activity feed
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="section live-platform-section" ref={sectionRef}>
      <div className="bg-layer">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="orb" style={{ width: 500, height: 500, background: "#38bdf8", top: -150, right: -100, opacity: 0.07, position: "absolute", borderRadius: "50%", filter: "blur(80px)" }} />
        <div className="orb" style={{ width: 500, height: 300, background: "#a78bfa", top: "50%", left: -80, opacity: 0.07, position: "absolute", borderRadius: "50%", filter: "blur(80px)" }} />
      </div>

      <div className="live-platform-content">

        {/* ── SIMULATION BLOCK ── */}
        <motion.div
          className="live-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="live-block-header">
            <div>
              <div className="section-label">Live Simulation</div>
              <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
                Watch a deal<br /><span>close itself.</span>
              </h2>
            </div>
            {/* Live counter stats */}
            <div className="sim-stats">
              {[
                { label: "Leads Processed",   val: 12847,   prefix: "" },
                { label: "Avg Close Time",     val: 6,       suffix: "s" },
                { label: "Revenue Automated",  val: 2400000, prefix: "$" },
              ].map(m => (
                <div key={m.label} className="sim-stat">
                  <div className="sim-stat-label">{m.label}</div>
                  <div className="sim-stat-value">
                    {m.prefix}<Counter target={m.val} suffix={(m as any).suffix} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow steps */}
          <div className="workflow">
            {STEPS.map((step, i) => {
              const isDone   = activeStep > i
              const isActive = activeStep === i
              return (
                <div
                  key={step.title}
                  className={`workflow-step ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                >
                  <div className="step-indicator">{isDone ? "✓" : i + 1}</div>
                  <div className="step-info">
                    <div className="step-title">{step.title}</div>
                    <div className="step-detail">{step.detail}</div>
                  </div>
                  <div className="step-metric">
                    {isDone ? step.final : isActive ? step.metric : "—"}
                  </div>
                  {isActive && <div className="step-bar" style={{ width: `${progress}%` }} />}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="live-platform-divider" />

        {/* ── DASHBOARD BLOCK ── */}
        <motion.div
          className="live-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">Command Center</div>

          <motion.div
            className="dashboard-shell"
            initial={{ opacity: 0, y: 30, filter: motion_.blur ? "blur(12px)" : "none" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {/* Window chrome */}
            <div className="dash-chrome">
              <div className="dash-dots">
                <span style={{ background: "#ff5f57" }} />
                <span style={{ background: "#ffbd2e" }} />
                <span style={{ background: "#28c840" }} />
              </div>
              <div className="dash-title">aiza.io/dashboard</div>
              <div className="dash-status"><span className="dash-live-dot" />LIVE</div>
            </div>

            <div className="dash-metrics">
              {METRICS.map(m => <LiveMetric key={m.label} {...m} />)}
            </div>

            <div className="dash-feed">
              <div className="dash-feed-header">Activity Feed</div>
              {ACTIVITY.map((a, i) => (
                <motion.div
                  key={`${a.msg}-${i === 0 ? tick : 0}`}
                  className={`dash-feed-row ${a.type}`}
                  initial={i === 0 ? { opacity: 0, x: -10 } : {}}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="feed-dot" />
                  <span className="feed-msg">{a.msg}</span>
                  <span className="feed-time">{a.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── CLOSER ── */}
        <motion.div
          className="live-platform-closer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="live-platform-closer-rule" />
          <p className="live-platform-closer-text">
            Your pipeline,{" "}
            <span className="live-platform-closer-grad">fully autonomous.</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
