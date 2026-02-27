import { useState } from "react"
import Loader from "./components/Loader"
import Cursor from "./components/Cursor"
import ScrollProgress from "./components/ScrollProgress"
import TopNav from "./components/TopNav"
import Hero from "./components/Hero"
import Platform from "./components/Platform"
import LogoStrip from "./components/LogoStrip"
import Integrations from "./components/Integrations"
import Features from "./components/Features"
import Testimonials from "./components/Testimonials"
import DashboardPreview from "./components/DashboardPreview"
import Demo from "./components/Demo"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import AIChat from "./components/AIChat"
import { useScrollEffects } from "./hooks/useScrollEffects"

const SECTION_COUNT = 9

function ScrollBlurOverlay() {
  const { sectionBlur } = useScrollEffects(SECTION_COUNT)
  if (sectionBlur < 0.3) return null
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 90,
      backdropFilter: `blur(${sectionBlur}px)`,
      WebkitBackdropFilter: `blur(${sectionBlur}px)`,
      transition: "backdrop-filter 0.08s linear",
    }} />
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  return (
    <>
      <Cursor />
      <Loader onDone={() => setReady(true)} />
      {ready && (
        <>
          <TopNav />
          <ScrollBlurOverlay />
          <ScrollProgress sectionCount={SECTION_COUNT} />
          <main>
            {/* 1 */ }<Hero />
            {/* 2 */ }<Features />
            {/* 3 */ }<Platform />
            {/* 4 */ }<LogoStrip />
            {/* 5 */ }<Integrations />
            {/* 6 */ }<Testimonials />
            {/* 7 */ }<DashboardPreview />
            {/* 8 */ }<Demo />
            {/* 9 */ }<CTA />
          </main>
          <Footer />
          <AIChat />
        </>
      )}
    </>
  )
}
