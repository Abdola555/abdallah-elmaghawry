import { useState } from 'react'
import { NavLink } from 'react-router'
import { navItems } from '../../data/portfolioData.js'
import MobileMenu from './MobileMenu.jsx'

export default function NavBar({ onContactOpen, ctaRef }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 h-16 flex items-center px-6 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(10,14,26,0.85)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Monogram */}
        <a
          href="/#/"
          className="font-display text-xl font-bold tracking-tight mr-auto"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)', textDecoration: 'none' }}
        >
          AEM
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 mr-8">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors relative pb-0.5 ${
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`
              }
              style={{ textDecoration: 'none' }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={onContactOpen}
          className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-all"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#0A0E1A',
            fontFamily: 'var(--font-sans)',
          }}
        >
          Get in touch →
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden ml-4 p-2"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{ color: 'var(--color-text)' }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onContactOpen={() => { setMenuOpen(false); onContactOpen() }} />
    </>
  )
}
