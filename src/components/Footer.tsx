import { motion } from "framer-motion"

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const SOCIAL = [
  { label: "X", href: "https://x.com", icon: <XIcon /> },
  { label: "Facebook", href: "https://facebook.com", icon: <FacebookIcon /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <LinkedInIcon /> },
]

const LEGAL = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact", href: "#" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Top rule */}
      <div className="footer-rule" />

      <div className="footer-inner">
        {/* Row 1: Logo + social icons */}
        <div className="footer-row footer-row-top">
          <div className="footer-logo">
            <span className="footer-logo-mark">✦</span>
            <span className="footer-logo-text">AIZA</span>
          </div>

          <div className="footer-social">
            {SOCIAL.map(s => (
              <a
                key={s.label}
                href={s.href}
                className="footer-social-link"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Row 2: legal + copyright */}
        <div className="footer-row footer-row-bottom">
          <p className="footer-copy">
            © {year} AIZA AI. All rights reserved.
          </p>

          <nav className="footer-legal">
            {LEGAL.map((l, i) => (
              <span key={l.label} className="footer-legal-item">
                <a href={l.href} className="footer-legal-link">{l.label}</a>
                {i < LEGAL.length - 1 && (
                  <span className="footer-legal-sep">·</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </motion.footer>
  )
}
