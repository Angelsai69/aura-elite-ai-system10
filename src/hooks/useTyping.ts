import { useEffect, useState } from "react"

export function useTyping(lines: string[], speed = 45) {
  const [lineIdx, setLineIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = lines[lineIdx]
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed)
      return () => clearTimeout(t)
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2.5)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setLineIdx(i => (i + 1) % lines.length)
    }
  }, [charIdx, deleting, lineIdx, lines, speed])

  useEffect(() => {
    setDisplayed(lines[lineIdx].slice(0, charIdx))
  }, [charIdx, lineIdx, lines])

  return displayed
}
