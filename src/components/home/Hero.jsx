import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router'
import abdallahPhoto from '../../assets/abdallah.png'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

function StatBlock({ value, label }) {
  return (
    <div
      className="flex flex-col px-5 py-4 rounded-xl flex-1"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        minWidth: '80px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          color: 'var(--color-primary)',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--color-muted)',
          marginTop: '4px',
          lineHeight: 1.3,
        }}
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
      <motion.polygon
        points="100,10 180,55 180,145 100,190 20,145 20,55"
        fill="none"
        stroke="rgba(0,229,199,0.18)"
        strokeWidth="1"
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
        style={{ originX: '100px', originY: '100px' }}
      />
      <motion.polygon
        points="100,28 166,65 166,135 100,172 34,135 34,65"
        fill="none"
        stroke="rgba(0,229,199,0.08)"
        strokeWidth="0.75"
        strokeDasharray="4 6"
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
        style={{ originX: '100px', originY: '100px' }}
      />
      {[[100, 10], [180, 55], [180, 145], [100, 190], [20, 145], [20, 55]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="rgba(0,229,199,0.35)" />
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
      className="grid-backdrop relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '40%',
          left: '30%',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(0,229,199,0.05) 0%, transparent 65%)',
          filter: 'blur(48px)',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* ── LEFT COLUMN (60%) ── */}
          <motion.div
            className="flex-[3] flex flex-col items-center md:items-start text-center md:text-left"
            variants={containerVariants}
            {...motionProps}
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeIn}
              className="mb-4 tracking-[0.15em]"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--color-primary)',
              }}
            >
              // Senior R&amp;D Hardware Engineer @ Pylon (YC S21)
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="leading-none tracking-tight mb-5"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(3rem, 7.5vw, 5rem)',
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
              }}
            >
              Abdallah
              <br />
              <span style={{ color: 'var(--color-primary)' }}>El-Maghawry</span>
            </motion.h1>

            {/* Role pill */}
            <motion.div variants={fadeUp} className="mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid rgba(0,229,199,0.35)',
                  background: 'rgba(0,229,199,0.07)',
                  color: 'var(--color-primary)',
                  letterSpacing: '0.04em',
                }}
              >
                Power Electronics · SMPS · BMS · PCB Design
              </span>
            </motion.div>

            {/* 2-line summary */}
            <motion.p
              variants={fadeUp}
              className="max-w-lg mb-8 leading-relaxed"
              style={{ color: 'var(--color-muted)', fontSize: '1rem', lineHeight: 1.7 }}
            >
              Designing and validating{' '}
              <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>SMPS, BMS, and PCB systems</span>
              {' '}from schematic to mass production — including{' '}
              <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>on-site vendor audits in China.</span>
            </motion.p>

            {/* Stat blocks */}
            <motion.div variants={fadeUp} className="flex gap-3 w-full max-w-lg mb-8">
              <StatBlock value="4+" label="Years Pro R&D" />
              <StatBlock value="~40%" label="BOM Reduction" />
              <StatBlock value="4" label="Languages" />
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#projects"
                onClick={handleViewProjects}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-bold transition-all duration-200"
                style={{
                  background: 'var(--color-accent)',
                  color: '#0A0E1A',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  boxShadow: '0 0 20px rgba(240,165,0,0.35)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(240,165,0,0.55)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(240,165,0,0.35)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                View Projects ↓
              </a>
              <Link
                to="/journey"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-bold transition-all duration-200"
                style={{
                  border: '1px solid rgba(0,229,199,0.35)',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  background: 'rgba(0,229,199,0.05)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0,229,199,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(0,229,199,0.65)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,229,199,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(0,229,199,0.35)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                My Journey →
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN (40%) ── */}
          <motion.div
            className="flex-[2] flex flex-col items-center gap-5 flex-shrink-0"
            variants={containerVariants}
            {...motionProps}
          >
            {/* Large photo with hex ring */}
            <motion.div
              variants={fadeIn}
              className="relative"
              style={{ width: '320px', height: '360px' }}
            >
              <HexRing prefersReduced={prefersReduced} />
              {/* Photo */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '280px',
                  height: '320px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(0,229,199,0.25)',
                  boxShadow: '0 0 32px rgba(0,229,199,0.12), 0 16px 48px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src={abdallahPhoto}
                  alt="Abdallah El-Maghawry"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </motion.div>

            {/* Degree badge below photo */}
            <motion.div
              variants={fadeUp}
              className="flex items-start gap-3 px-4 py-3 rounded-xl w-full max-w-[280px]"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,229,199,0.1)', border: '1px solid rgba(0,229,199,0.25)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-text)', lineHeight: 1.3 }}>
                  M.Sc. in Power Electronics
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-muted)', marginTop: '2px' }}>
                  Cairo University · In Progress
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={prefersReduced ? { opacity: 0.5 } : { opacity: [0, 0.6, 0] }}
        transition={prefersReduced ? {} : { duration: 2.2, repeat: Infinity, delay: 1.8 }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-muted)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
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
