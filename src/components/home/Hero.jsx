import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router'
import abdallahPhoto from '../../assets/abdallah.png'

const AVATAR_URL = abdallahPhoto

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
}

function StatChip({ value, label }) {
  return (
    <div
      className="flex flex-col items-center px-4 py-2 rounded"
      style={{
        border: '1px solid var(--color-border)',
        background: 'rgba(0,229,199,0.04)',
        minWidth: '72px',
      }}
    >
      <span
        className="text-base font-bold leading-none"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
      >
        {value}
      </span>
      <span
        className="text-xs mt-0.5 text-center"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontSize: '0.6rem' }}
      >
        {label}
      </span>
    </div>
  )
}

function HexRing({ prefersReduced }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {/* Outer hex ring */}
      <motion.polygon
        points="100,10 180,55 180,145 100,190 20,145 20,55"
        fill="none"
        stroke="rgba(0,229,199,0.25)"
        strokeWidth="1"
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        style={{ originX: '100px', originY: '100px' }}
      />
      {/* Inner hex ring — counter-rotation */}
      <motion.polygon
        points="100,28 166,65 166,135 100,172 34,135 34,65"
        fill="none"
        stroke="rgba(0,229,199,0.12)"
        strokeWidth="0.75"
        strokeDasharray="4 6"
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        style={{ originX: '100px', originY: '100px' }}
      />
      {/* Corner accent dots */}
      {[[100, 10], [180, 55], [180, 145], [100, 190], [20, 145], [20, 55]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(0,229,199,0.4)" />
      ))}
    </svg>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()

  function handleViewProjects(e) {
    e.preventDefault()
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const motionProps = prefersReduced
    ? { initial: 'visible', animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <section
      className="grid-backdrop relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(0,229,199,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
            variants={containerVariants}
            {...motionProps}
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeIn}
              className="mb-5 text-xs tracking-[0.18em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
            >
              // Senior R&amp;D Hardware Electronics Engineer @ Pylon (YC S21)
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="leading-none tracking-tight mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(3.2rem, 8vw, 5.25rem)',
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
              }}
            >
              Abdallah
              <br />
              <span style={{ color: 'var(--color-primary)' }}>El-Maghawry</span>
            </motion.h1>

            {/* Summary */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg max-w-xl mb-8 leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Power electronics specialist building robust SMPS, BMS, and battery systems
              from first principles to mass production.{' '}
              <span style={{ color: 'var(--color-text)' }}>
                8+ years of hands-on hardware R&amp;D
              </span>{' '}
              from robotics to YC-backed startups.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#projects"
                onClick={handleViewProjects}
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold transition-all duration-200"
                style={{
                  background: 'var(--color-accent)',
                  color: '#0A0E1A',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  boxShadow: '0 0 16px rgba(240,165,0,0.3)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(240,165,0,0.5)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(240,165,0,0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                View Projects ↓
              </a>
              <Link
                to="/journey"
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold transition-all duration-200"
                style={{
                  border: '1px solid rgba(0,229,199,0.4)',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  background: 'rgba(0,229,199,0.05)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0,229,199,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(0,229,199,0.7)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,229,199,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(0,229,199,0.4)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                My Journey →
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            className="flex flex-col items-center gap-5 flex-shrink-0"
            variants={containerVariants}
            {...motionProps}
          >
            {/* Avatar with hex ring */}
            <motion.div variants={fadeIn} className="relative" style={{ width: '220px', height: '220px' }}>
              <HexRing prefersReduced={prefersReduced} />
              <div
                className="absolute inset-0 m-auto overflow-hidden"
                style={{
                  width: '152px',
                  height: '152px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '16px',
                  border: '2px solid rgba(0,229,199,0.3)',
                  boxShadow: '0 0 24px rgba(0,229,199,0.15)',
                  position: 'absolute',
                }}
              >
                <img
                  src={AVATAR_URL}
                  alt="Abdallah El-Maghawry"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </motion.div>

            {/* Stat chips */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center md:justify-start">
              <StatChip value="4+" label="yrs R&D" />
              <StatChip value="~40%" label="BOM cut" />
              <StatChip value="YC S21" label="startup" />
              <StatChip value="M.Sc." label="in progress" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={prefersReduced ? { opacity: 0.5 } : { opacity: [0, 0.6, 0] }}
        transition={prefersReduced ? {} : { duration: 2.2, repeat: Infinity, delay: 1.5 }}
        aria-hidden="true"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontSize: '0.6rem' }}
        >
          scroll
        </span>
        <motion.svg
          width="16" height="24" viewBox="0 0 16 24" fill="none"
          animate={prefersReduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M8 0v18M2 12l6 6 6-6" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
