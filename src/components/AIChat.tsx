import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Message { role: "user" | "assistant"; content: string }

function useStreamSimulation(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    if (!active || !text) { setDisplayed(text); return }
    setDisplayed("")
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, 12)
    return () => clearInterval(interval)
  }, [text, active])
  return displayed
}

function AssistantMsg({ content, isLatest }: { content: string; isLatest: boolean }) {
  const displayed = useStreamSimulation(content, isLatest)
  const isDone = displayed.length === content.length
  return (
    <div className={`msg assistant ${!isDone ? "streaming" : ""}`}>
      {displayed}
      {!isDone && <span className="typing-cursor" />}
    </div>
  )
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [latestIdx, setLatestIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const updated: Message[] = [...messages, { role: "user", content: text }]
    setMessages(updated)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ reply: "Request failed." }))
        throw new Error(err.reply || `Error ${res.status}`)
      }

      const data = await res.json()
      const reply = data.reply || "No response."
      const next: Message[] = [...updated, { role: "assistant", content: reply }]
      setMessages(next)
      setLatestIdx(next.length - 1)
    } catch (err: any) {
      const next: Message[] = [...updated, { role: "assistant", content: `⚠️ ${err.message}` }]
      setMessages(next)
      setLatestIdx(next.length - 1)
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="chat-wrapper">
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="chat-header">
              <div className="chat-avatar">A</div>
              <div className="chat-header-info">
                <div className="chat-header-name">AIZA Assistant</div>
                <div className="chat-header-status">Online</div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="chat-empty">
                  Ask me about automation,<br />workflows, or growing your business.
                </div>
              )}
              {messages.map((m, i) => (
                m.role === "user"
                  ? <div key={i} className="msg user">{m.content}</div>
                  : <AssistantMsg key={i} content={m.content} isLatest={i === latestIdx} />
              ))}
              {loading && <div className="shimmer-msg" />}
              <div ref={bottomRef} />
            </div>

            <div className="chat-input-row">
              <input
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask AIZA..."
                disabled={loading}
              />
              <button className="chat-send" onClick={send} disabled={loading || !input.trim()}>
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chat-toggle"
        onClick={() => setOpen(o => !o)}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {open ? "✕" : "✦"}
      </motion.button>
    </div>
  )
}
