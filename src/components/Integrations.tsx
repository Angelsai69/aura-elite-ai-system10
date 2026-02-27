import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

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

// Bigger orbit to give enlarged logos breathing room
const ORBIT_R = 195
const CX = 260
const CY = 260

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// Animated pulse — fatter, brighter, longer trail
function Pulse({
  x1, y1, x2, y2, color, delay, inbound,
}: {
  x1: number; y1: number; x2: number; y2: number
  color: string; delay: number; inbound: boolean
}) {
  const sx = inbound ? x1 : x2
  const sy = inbound ? y1 : y2
  const ex = inbound ? x2 : x1
  const ey = inbound ? y2 : y1

  return (
    <>
      {/* Leading bright dot */}
      <motion.circle
        r={4.5}
        fill={color}
        style={{
          offsetPath: `path('M ${sx} ${sy} L ${ex} ${ey}')`,
          filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color})`,
        } as React.CSSProperties}
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{
          offsetDistance: ["0%", "100%"],
          opacity: [0, 1, 1, 0.2],
        }}
        transition={{
          duration: 1.4,
          delay,
          repeat: Infinity,
          repeatDelay: 2.8 + Math.random() * 1.5,
          ease: "easeIn",
        }}
      />
      {/* Trailing glow smear — slightly behind, larger, more diffuse */}
      <motion.circle
        r={7}
        fill={color}
        opacity={0}
        style={{
          offsetPath: `path('M ${sx} ${sy} L ${ex} ${ey}')`,
          filter: `blur(4px) drop-shadow(0 0 10px ${color})`,
          mixBlendMode: "screen",
        } as React.CSSProperties}
        initial={{ offsetDistance: "0%" }}
        animate={{
          offsetDistance: ["0%", "90%"],
          opacity: [0, 0.55, 0.55, 0],
        }}
        transition={{
          duration: 1.4,
          delay: delay + 0.06,
          repeat: Infinity,
          repeatDelay: 2.8 + Math.random() * 1.5,
          ease: "easeIn",
        }}
      />
    </>
  )
}

export default function Integrations() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.25 }
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

      <motion.div
        className="orbit-wrap"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <svg viewBox="0 0 520 520" className="orbit-svg" aria-hidden="true">
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#6e5aff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6e5aff" stopOpacity="0" />
            </radialGradient>
            {/* Per-logo glow gradients */}
            {INTEGRATIONS.map(itg => (
              <radialGradient key={`rg-${itg.name}`} id={`lg-${itg.name}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor={itg.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={itg.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* Center glow */}
          <circle cx={CX} cy={CY} r={100} fill="url(#centerGlow)" />

          {/* Orbit ring — slightly brighter dashes */}
          <circle
            cx={CX} cy={CY} r={ORBIT_R}
            fill="none"
            stroke="rgba(110,90,255,0.2)"
            strokeWidth={1.5}
            strokeDasharray="5 7"
          />

          {/* Lines + pulses */}
          {INTEGRATIONS.map((itg, i) => {
            const pos   = polar(CX, CY, ORBIT_R, itg.angle)
            const inner = polar(CX, CY, 58, itg.angle)       // just outside center node
            const outer = polar(CX, CY, ORBIT_R - 34, itg.angle) // just inside logo bubble

            return (
              <g key={itg.name}>
                {/* Connection line — brighter base */}
                <line
                  x1={inner.x} y1={inner.y}
                  x2={outer.x} y2={outer.y}
                  stroke={itg.color}
                  strokeWidth={1.2}
                  strokeOpacity={0.35}
                  strokeDasharray="3 5"
                />

                {/* Inbound pulse */}
                {inView && (
                  <Pulse
                    x1={outer.x} y1={outer.y}
                    x2={inner.x} y2={inner.y}
                    color={itg.color}
                    delay={i * 0.5}
                    inbound
                  />
                )}
                {/* Outbound pulse — AIZA purple */}
                {inView && (
                  <Pulse
                    x1={inner.x} y1={inner.y}
                    x2={outer.x} y2={outer.y}
                    color="#c4b5fd"
                    delay={i * 0.5 + 1.6}
                    inbound={false}
                  />
                )}

                {/* Logo bubble — 35% bigger: r=26 → r=35 */}
                <circle
                  cx={pos.x} cy={pos.y} r={35}
                  fill={`url(#lg-${itg.name})`}
                />
                <circle
                  cx={pos.x} cy={pos.y} r={35}
                  fill="rgba(10,8,24,0.94)"
                  stroke={itg.color}
                  strokeWidth={1.4}
                  strokeOpacity={0.55}
                />

                {/* Abbr text — bigger */}
                <text
                  x={pos.x} y={pos.y - 7}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={itg.color}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {itg.abbr}
                </text>
                {/* Name text — bigger */}
                <text
                  x={pos.x} y={pos.y + 9}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(237,237,255,0.65)"
                  fontSize="8.5"
                  fontWeight="500"
                  fontFamily="DM Sans, sans-serif"
                >
                  {itg.name}
                </text>
              </g>
            )
          })}

          {/* Pulsing rings from center */}
          {inView && (
            <motion.circle
              cx={CX} cy={CY} r={60}
              fill="none" stroke="rgba(110,90,255,0.5)" strokeWidth={1.5}
              initial={{ r: 58, opacity: 0.7 }}
              animate={{ r: 85, opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {inView && (
            <motion.circle
              cx={CX} cy={CY} r={60}
              fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth={1.5}
              initial={{ r: 58, opacity: 0.6 }}
              animate={{ r: 85, opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
            />
          )}

          {/* Center node */}
          <circle cx={CX} cy={CY} r={54}
            fill="rgba(6,4,16,0.97)"
            stroke="rgba(110,90,255,0.6)"
            strokeWidth={1.8}
          />
          <circle cx={CX} cy={CY} r={54}
            fill="none"
            stroke="rgba(110,90,255,0.12)"
            strokeWidth={10}
          />

          {/* AIZA center text */}
          <text
            x={CX} y={CY - 9}
            textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize="19" fontWeight="900"
            fontFamily="Helvetica Neue, Arial, sans-serif"
            letterSpacing="-1"
          >
            AIZA
          </text>
          <text
            x={CX} y={CY + 13}
            textAnchor="middle" dominantBaseline="middle"
            fill="rgba(167,139,250,0.75)"
            fontSize="7.5" fontFamily="DM Sans, sans-serif"
            letterSpacing="2"
          >
            OPERATING LAYER
          </text>
        </svg>

        <div className="orbit-callout orbit-callout-left">
          <div className="orbit-callout-value">50+</div>
          <div className="orbit-callout-label">Native integrations</div>
        </div>
        <div className="orbit-callout orbit-callout-right">
          <div className="orbit-callout-value">&lt;100ms</div>
          <div className="orbit-callout-label">Sync latency</div>
        </div>
      </motion.div>

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
