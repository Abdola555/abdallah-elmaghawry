import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Zap, BatteryCharging, CircuitBoard } from 'lucide-react'

const cards = [
  {
    icon: Zap,
    title: 'SMPS & Power Conversion',
    body: 'Flyback, LLC, three-phase architectures. From topology selection through magnetics design to EMC compliance.',
    accent: '~40% BOM reduction @ Pylon',
  },
  {
    icon: BatteryCharging,
    title: 'Battery Management (BMS)',
    body: 'LFP pack architecture with TI AFE, OV/UV/OC protection, SOC/SOH estimation. Production test jig design.',
    accent: 'YC S21 · Pylon',
  },
  {
    icon: CircuitBoard,
    title: 'PCB Design & Validation',
    body: 'High-speed layout, impedance control, DFT/DFM/DFA. Factory qualification including on-site audits in China.',
    accent: '10-layer · Zynq SoC',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function PitchCard({ card, prefersReduced }) {
  const Icon = card.icon
  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col p-6 rounded-2xl transition-all duration-200"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={e => {
        if (!prefersReduced) {
          e.currentTarget.style.borderColor = 'rgba(0,229,199,0.4)'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 flex-shrink-0"
        style={{
          background: 'rgba(0,229,199,0.08)',
          border: '1px solid rgba(0,229,199,0.2)',
        }}
      >
        <Icon size={18} style={{ color: 'var(--color-primary)' }} />
      </div>

      {/* Title */}
      <h3
        className="font-bold mb-3 leading-snug"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          color: 'var(--color-text)',
        }}
      >
        {card.title}
      </h3>

      {/* Body */}
      <p
        className="leading-relaxed flex-1 mb-5"
        style={{
          color: 'var(--color-muted)',
          fontSize: '0.875rem',
          lineHeight: 1.65,
        }}
      >
        {card.body}
      </p>

      {/* Accent pill */}
      <span
        className="self-start px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          background: 'rgba(240,165,0,0.1)',
          border: '1px solid rgba(240,165,0,0.25)',
          color: 'var(--color-accent)',
          letterSpacing: '0.03em',
        }}
      >
        {card.accent}
      </span>
    </motion.div>
  )
}

export default function WhatIBuild() {
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
      aria-label="What I design and build"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <p
          className="mb-10"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--color-primary)',
            letterSpacing: '0.15em',
          }}
        >
          // What I Design &amp; Build
        </p>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          {...motionProps}
        >
          {cards.map(card => (
            <PitchCard key={card.title} card={card} prefersReduced={prefersReduced} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
