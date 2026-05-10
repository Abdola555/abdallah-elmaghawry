import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router'
import { navItems } from '../../data/portfolioData.js'

export default function MobileMenu({ open, onClose, onContactOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-60"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            className="fixed top-0 right-0 h-full w-72 z-70 flex flex-col p-8"
            style={{ backgroundColor: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="self-end p-2 mb-8"
              aria-label="Close menu"
              style={{ color: 'var(--color-muted)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="flex flex-col gap-6">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`
                  }
                  style={{ fontFamily: 'var(--font-display)', textDecoration: 'none' }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <button
              onClick={onContactOpen}
              className="mt-auto w-full py-3 rounded font-medium text-center"
              style={{ backgroundColor: 'var(--color-accent)', color: '#0A0E1A' }}
            >
              Get in touch →
            </button>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
