import { useEffect, useRef } from "react"

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      dotPos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMove)

    let raf: number
    const animate = () => {
      ringPos.current.x += (dotPos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (dotPos.current.y - ringPos.current.y) * 0.12
      if (dotRef.current) {
        dotRef.current.style.left = dotPos.current.x + "px"
        dotRef.current.style.top = dotPos.current.y + "px"
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + "px"
        ringRef.current.style.top = ringPos.current.y + "px"
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div className="cursor" ref={dotRef} style={{ position: "fixed" }}>
        <div className="cursor-dot" />
      </div>
      <div className="cursor" ref={ringRef} style={{ position: "fixed" }}>
        <div className="cursor-ring" />
      </div>
    </>
  )
}
