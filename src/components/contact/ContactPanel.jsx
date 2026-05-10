import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import ContactLinks from './ContactLinks.jsx'
import { profile } from '../../data/portfolioData.js'

export default function ContactPanel({ open, onClose, returnFocusRef }) {
  const panelRef = useRef(null)

  // Escape to close
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Return focus on close
  useEffect(() => {
    if (!open && returnFocusRef?.current) {
      returnFocusRef.current.focus()
    }
  }, [open, returnFocusRef])

  // Focus trap
  useEffect(() => {
    if (!open || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll(
      'button, a, input, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length) focusable[0].focus()
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const trap = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(10,14,26,0.7)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-panel-title"
            className="fixed right-0 top-0 h-full z-50 flex flex-col p-8 overflow-y-auto"
            style={{
              width: 'min(100vw, 400px)',
              backgroundColor: 'var(--color-bg)',
              borderLeft: '1px solid var(--color-border)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2
                  id="contact-panel-title"
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                >
                  Get in touch
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  Power electronics · BMS · research collab · hire
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close contact panel"
                className="p-2 rounded transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Location */}
            <p className="text-xs font-mono mb-6" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
              // {profile.location}
            </p>

            {/* Links */}
            <ContactLinks vertical />

            {/* What I'm open to */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
              <p className="text-xs font-mono mb-3" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                // best for
              </p>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text)' }}>
                {[
                  'Power electronics discussions',
                  'EV / BMS collaboration',
                  'Research partnership',
                  'Hiring enquiries',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span style={{ color: 'var(--color-primary)' }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
