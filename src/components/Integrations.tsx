import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Each integration: name, angle on the orbit, accent color for its pulse
const INTEGRATIONS = [
  { name: "Salesforce",  angle:   0, color: "#00a1e0", abbr: "SF" },
  { name: "OpenAI",      angle:  40, color: "#74aa9c", abbr: "AI" },
  { name: "Slack",       angle:  80, color: "#e01e5a", abbr: "SL" },
  { name: "HubSpot",     angle: 120, color: "#ff7a59", abbr: "HS" },
  { name: "AWS",         angle: 160, color: "#ff9900", abbr: "AW" },
  { name: "Stripe",      angle: 200, color: "#635bff", abbr: "ST" },
  { name: "Snowflake",   angle: 240, color: "#29b5e8", abbr: "SN" },
  { name: "Workday",     angle: 280, color: "#f5821f", abbr: "WD" },
  { name: "Claude",      angle: 320, color: "#a78bfa", abbr: "CL" },
]

const ORBIT_R = 180   // px — orbit radius (SVG units, viewBox 500x500, center 250,250)
const CX = 250
const CY = 250

// Convert polar to cartesian
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// A single animated pulse travelling along a straight line
function Pulse({
  x1, y1, x2, y2, color, delay, inbound,
}: {
  x1: number; y1: number; x2: number; y2: number
  color: string; delay: number; inbound: boolean
}) {
  return (
    <motion.circle
      r={3.5}
      fill={color}
      filter={`drop-shadow(0 0 4px ${color})`}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{
        offsetDistance: ["0%", "100%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.6,
        delay,
        repeat: Infinity,
        repeatDelay: 3.5 + Math.random() * 2,
        ease: "easeInOut",
      }}
      style={{
        offsetPath: `path('M ${inbound ? x2 : x1} ${inbound ? y2 : y1} L ${inbound ? x1 : x2} ${inbound ? y1 : y2}')`,
      } as React.CSSProperties}
    />
  )
}

export default function Integrations() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="integrations-section" ref={ref}>
      <div className="bg-layer">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
      </div>

      {/* Header */}
      <motion.div
        className="integrations-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-label">Universal Integration</div>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          AIZA connects to your stack.<br />
          <span>Not replaces it.</span>
        </h2>
        <p className="integrations-sub">
          Every tool your team already uses feeds intelligence into AIZA.
          Signals flow in. Decisions flow out. Your stack stays intact.
        </p>
      </motion.div>

      {/* Orbit diagram */}
      <motion.div
        className="orbit-wrap"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <svg
          viewBox="0 0 500 500"
          className="orbit-svg"
          aria-hidden="true"
        >
          <defs>
            {/* Radial glow behind center */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6e5aff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6e5aff" stopOpacity="0" />
            </radialGradient>
            {/* Orbit ring gradient — fades at top/bottom */}
            <linearGradient id="orbitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(110,90,255,0.15)" />
              <stop offset="50%" stopColor="rgba(110,90,255,0.08)" />
              <stop offset="100%" stopColor="rgba(110,90,255,0.15)" />
            </linearGradient>
          </defs>

          {/* Center glow bloom */}
          <circle cx={CX} cy={CY} r={90} fill="url(#centerGlow)" />

          {/* Orbit ring */}
          <circle
            cx={CX} cy={CY} r={ORBIT_R}
            fill="none"
            stroke="url(#orbitGrad)"
            strokeWidth={1}
            strokeDasharray="4 6"
          />

          {/* Connection lines + pulses per integration */}
          {INTEGRATIONS.map((itg, i) => {
            const pos = polar(CX, CY, ORBIT_R, itg.angle)
            // Line ends just outside center node (r=48) and inside logo bubble (r=26)
            const inner = polar(CX, CY, 52, itg.angle)
            const outer = polar(CX, CY, ORBIT_R - 28, itg.angle)

            return (
              <g key={itg.name}>
                {/* Static dashed line */}
                <line
                  x1={inner.x} y1={inner.y}
                  x2={outer.x} y2={outer.y}
                  stroke={itg.color}
                  strokeWidth={1}
                  strokeOpacity={0.22}
                  strokeDasharray="3 5"
                />
                {/* Inbound pulse (integration → AIZA) */}
                {inView && (
                  <Pulse
                    x1={outer.x} y1={outer.y}
                    x2={inner.x} y2={inner.y}
                    color={itg.color}
                    delay={i * 0.55}
                    inbound
                  />
                )}
                {/* Outbound pulse (AIZA → integration) — offset timing */}
                {inView && (
                  <Pulse
                    x1={inner.x} y1={inner.y}
                    x2={outer.x} y2={outer.y}
                    color="#a78bfa"
                    delay={i * 0.55 + 1.8}
                    inbound={false}
                  />
                )}

                {/* Logo bubble */}
                <circle
                  cx={pos.x} cy={pos.y} r={26}
                  fill="rgba(13,11,28,0.92)"
                  stroke={itg.color}
                  strokeWidth={1}
                  strokeOpacity={0.4}
                />
                {/* Subtle glow ring on hover handled by CSS */}
                <text
                  x={pos.x} y={pos.y - 5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={itg.color}
                  fontSize="8"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                  opacity="0.9"
                >
                  {itg.abbr}
                </text>
                <text
                  x={pos.x} y={pos.y + 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(237,237,255,0.45)"
                  fontSize="6.5"
                  fontFamily="DM Sans, sans-serif"
                >
                  {itg.name}
                </text>
              </g>
            )
          })}

          {/* Center AIZA node */}
          <circle cx={CX} cy={CY} r={50} fill="rgba(8,6,18,0.95)" stroke="rgba(110,90,255,0.5)" strokeWidth={1.5} />
          <circle cx={CX} cy={CY} r={50} fill="none" stroke="rgba(110,90,255,0.15)" strokeWidth={8} />

          {/* Center pulsing ring */}
          {inView && (
            <motion.circle
              cx={CX} cy={CY} r={55}
              fill="none"
              stroke="rgba(110,90,255,0.35)"
              strokeWidth={1}
              initial={{ r: 52, opacity: 0.6 }}
              animate={{ r: 72, opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {inView && (
            <motion.circle
              cx={CX} cy={CY} r={55}
              fill="none"
              stroke="rgba(56,189,248,0.25)"
              strokeWidth={1}
              initial={{ r: 52, opacity: 0.5 }}
              animate={{ r: 72, opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.25 }}
            />
          )}

          {/* AIZA logotype in center */}
          <text
            x={CX} y={CY - 7}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="16"
            fontWeight="900"
            fontFamily="Helvetica Neue, Arial, sans-serif"
            letterSpacing="-1"
          >
            AIZA
          </text>
          <text
            x={CX} y={CY + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(167,139,250,0.7)"
            fontSize="7"
            fontFamily="DM Sans, sans-serif"
            letterSpacing="1.5"
          >
            OPERATING LAYER
          </text>
        </svg>

        {/* Floating stat callouts */}
        <div className="orbit-callout orbit-callout-left">
          <div className="orbit-callout-value">50+</div>
          <div className="orbit-callout-label">Native integrations</div>
        </div>
        <div className="orbit-callout orbit-callout-right">
          <div className="orbit-callout-value">&lt;100ms</div>
          <div className="orbit-callout-label">Sync latency</div>
        </div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        className="integrations-tagline"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Don't rip and replace. <span>Orchestrate.</span>
      </motion.p>
    </section>
  )
}
