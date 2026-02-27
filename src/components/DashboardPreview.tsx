import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion"

const METRICS = [
  { label: "Active Workflows", value: 247, suffix: "", delta: "+12 today" },
  { label: "Leads Qualified",  value: 3841, suffix: "", delta: "+89 this hour" },
  { label: "Revenue Closed",   value: 128400, suffix: "", prefix: "$", delta: "+$4.2k today" },
  { label: "Time Saved",       value: 94, suffix: "%", delta: "vs manual ops" },
]

const ACTIVITY = [
  { time: "0:02s ago", msg: "Lead #3841 qualified — score 94/100", type: "success" },
  { time: "0:18s ago", msg: "HubSpot contact enriched — 6 fields", type: "info" },
  { time: "0:31s ago", msg: "Sequence triggered — 3-step email drip", type: "info" },
  { time: "1:04s ago", msg: "Deal $9,200 moved to Proposal stage", type: "success" },
  { time: "2:47s ago", msg: "Calendar invite auto-sent to prospect", type: "info" },
  { time: "4:12s ago", msg: "Contract signed — DocuSign confirmed", type: "success" },
]

function LiveMetric({ label, value, suffix, prefix = "", delta }: typeof METRICS[0] & { prefix?: string }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const dur = 1400
    const animate = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setDisplayed(Math.round(ease * value))
      if (p < 1) raf = requestAnimationFrame(animate)
    }
    const delay = setTimeout(() => { raf = requestAnimationFrame(animate) }, 300)
    return () => { clearTimeout(delay); cancelAnimationFrame(raf) }
  }, [value])

  return (
    <div className="dash-metric">
      <div className="dash-metric-value">
        {prefix}{displayed.toLocaleString()}{suffix}
      </div>
      <div className="dash-metric-label">{label}</div>
      <div className="dash-metric-delta">{delta}</div>
    </div>
  )
}

export default function DashboardPreview() {
  const motion_ = useAdaptiveMotion()
  const [tick, setTick] = useState(0)

  // Pulse the activity feed every 3s
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="section">
      <div className="bg-layer">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="orb" style={{ width: 500, height: 300, background: "#a78bfa", top: "20%", left: "-100px", opacity: 0.08, position: "absolute", borderRadius: "50%", filter: "blur(80px)" }} />
        <div className="orb" style={{ width: 400, height: 400, background: "#38bdf8", bottom: "-80px", right: "-80px", opacity: 0.07, position: "absolute", borderRadius: "50%", filter: "blur(80px)" }} />
      </div>

      <div className="dashboard-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Command Center</div>
          <h2 className="section-title">Your pipeline,<br /><span>fully autonomous.</span></h2>
        </motion.div>

        <motion.div
          className="dashboard-shell"
          initial={{ opacity: 0, y: 30, filter: motion_.blur ? "blur(12px)" : "none" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
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

          {/* Metric row */}
          <div className="dash-metrics">
            {METRICS.map(m => <LiveMetric key={m.label} {...m} />)}
          </div>

          {/* Activity feed */}
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
      </div>
    </section>
  )
}
