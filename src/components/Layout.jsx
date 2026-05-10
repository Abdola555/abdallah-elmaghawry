import { useState, useRef } from 'react'
import { Outlet } from 'react-router'
import NavBar from './nav/NavBar.jsx'
import Footer from './Footer.jsx'
import ContactPanel from './contact/ContactPanel.jsx'
import { useScrollRestoration } from '../lib/useScrollRestoration.js'

export default function Layout() {
  useScrollRestoration()
  const [contactOpen, setContactOpen] = useState(false)
  const ctaRef = useRef(null)

  return (
    <div className="min-h-screen flex flex-col" style={{ color: 'var(--color-text)' }}>
      <NavBar onContactOpen={() => setContactOpen(true)} ctaRef={ctaRef} />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <ContactPanel
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        returnFocusRef={ctaRef}
      />
    </div>
  )
}
