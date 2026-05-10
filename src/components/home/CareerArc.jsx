import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const nodes = [
  {
    year: '2022',
    role: 'R&D Engineer',
    company: 'ELARABY Group',
    achievement: 'First in-house SMPS — 75W flyback',
    active: false,
  },
  {
    year: '2024',
    role: 'Senior HW Eng.',
    company: 'ELARABY Group',
    achievement: 'China factory audits · Production qual.',
    active: false,
  },
  {
    year: '2025',
    role: 'Sr. R&D HW Eng.',
    company: 'Pylon (YC S21)',
    achievement: 'BMS · SMPS · ~40% BOM cut',
    active: true,
  },
  {
    year: '2026→',
    role: 'M.Sc. Researcher',
    company: 'Cairo University',
    achievement: 'AI-based SOH estimation for EVs',
    active: false,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const nodeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function ArcNode({ node }) {
  return (
    <motion.div
      variants={nodeVariants}
      className="flex flex-col p-5 rounded-xl relative"
      style={{
        background: 'var(--color-surface)',
        border: node.active
          ? '1px solid rgba(0,229,199,0.5)'
          : '1px solid var(--color-border)',
        boxShadow: node.active
          ? '0 0 24px rgba(0,229,199,0.1), inset 0 0 0 1px rgba(0,229,199,0.08)'
          : 'none',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Active indicator dot */}
      {node.active && (
        <div
          className="absolute top-4 right-4 w-2 h-2 rounded-full"
          style={{
            background: 'var(--color-primary)',
            boxShadow: '0 0 6px rgba(0,229,199,0.8)',
          }}
        />
      )}

      {/* Year */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: node.active ? 'var(--color-primary)' : 'var(--color-muted)',
          letterSpacing: '0.08em',
          marginBottom: '8px',
        }}
      >
        {node.year}
      </span>

      {/* Role */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.9rem',
          color: 'var(--color-text)',
          lineHeight: 1.25,
          marginBottom: '4px',
        }}
      >
        {node.role}
      </h3>

      {/* Company */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          color: node.active ? 'var(--color-primary)' : 'var(--color-muted)',
          marginBottom: '10px',
          fontWeight: node.active ? 600 : 400,
        }}
      >
        {node.company}
      </p>

      {/* Achievement */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--color-muted)',
          lineHeight: 1.5,
        }}
      >
        {node.achievement}
      </p>
    </motion.div>
  )
}

// Connector line between nodes
function Connector() {
  return (
    <div
      aria-hidden="true"
      style={{
        flex: '0 0 20px',
        height: '1px',
        background: 'var(--color-border)',
        alignSelf: 'center',
      }}
    />
  )
}

// Mobile vertical timeline node
function MobileArcNode({ node, index, total, prefersReduced }) {
  return (
    <motion.div
      className="flex gap-4"
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -16 }}
      whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Left: line + dot */}
      <div className="flex flex-col items-center" style={{ width: '28px', flexShrink: 0 }}>
        <div
          className="rounded-full flex-shrink-0"
          style={{
            width: '12px',
            height: '12px',
            background: node.active ? 'var(--color-primary)' : 'var(--color-surface)',
            border: `2px solid ${node.active ? 'var(--color-primary)' : 'rgba(0,229,199,0.3)'}`,
            boxShadow: node.active ? '0 0 8px rgba(0,229,199,0.6)' : 'none',
            marginTop: '2px',
          }}
        />
        {index < total - 1 && (
          <div
            style={{
              flex: 1,
              width: '1px',
              background: 'var(--color-border)',
              marginTop: '4px',
              minHeight: '32px',
            }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className="flex-1 pb-6">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: node.active ? 'var(--color-primary)' : 'var(--color-muted)' }}>
          {node.year}
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)', marginTop: '2px', lineHeight: 1.3 }}>
          {node.role}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: node.active ? 'var(--color-primary)' : 'var(--color-muted)', marginTop: '2px', fontWeight: node.active ? 600 : 400 }}>
          {node.company}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-muted)', marginTop: '6px', lineHeight: 1.5 }}>
          {node.achievement}
        </p>
      </div>
    </motion.div>
  )
}

export default function CareerArc() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReduced = useReducedMotion()

  const motionProps = prefersReduced
    ? { initial: 'visible', animate: 'visible' }
    : { initial: 'hidden', animate: inView ? 'visible' : 'hidden' }

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-bg)',
        padding: '80px 0',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Career arc"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <p
          className="mb-8"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--color-primary)',
            letterSpacing: '0.15em',
          }}
        >
          // Career Arc
        </p>

        {/* Desktop: horizontal row */}
        <motion.div
          className="hidden md:flex items-center gap-0"
          variants={containerVariants}
          {...motionProps}
        >
          {nodes.map((node, i) => (
            <div key={node.year} className="contents">
              <ArcNode node={node} />
              {i < nodes.length - 1 && <Connector />}
            </div>
          ))}
        </motion.div>

        {/* Mobile: vertical list */}
        <div className="md:hidden">
          {nodes.map((node, i) => (
            <MobileArcNode
              key={node.year}
              node={node}
              index={i}
              total={nodes.length}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
