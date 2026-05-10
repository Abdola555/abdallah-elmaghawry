import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const timelineData = [
  {
    id: 'pylon',
    year: '2025 – Present',
    category: 'work',
    title: 'Sr. R&D Hardware Electronics Engineer',
    subtitle: 'Pylon (YC S21)',
    summary: 'Leading BMS for LFP packs and three-phase smart-meter SMPS development.',
    link: { label: 'Full experience →', to: '/journey' },
    children: [
      { id: 'bms', category: 'project', title: 'Battery Management System (BMS)', link: { to: '/projects/bms-pylon' } },
      { id: 'smps', category: 'project', title: 'Three-Phase Smart Meter SMPS', link: { to: '/projects/smps-3phase' } },
    ],
  },
  {
    id: 'msc',
    year: '2023 – 2027',
    category: 'education',
    title: 'M.Sc. in Power Electronics',
    subtitle: 'Cairo University · In Progress',
    summary: 'AI-based battery State of Health (SOH) estimation for EV applications.',
    link: { label: 'Journey →', to: '/journey' },
    children: [],
  },
  {
    id: 'elaraby-senior',
    year: '2024 – 2025',
    category: 'work',
    title: 'Senior Hardware Engineer',
    subtitle: 'ELARABY Group',
    summary: 'On-site vendor audits in China. PCB validation and factory qualification for mass production.',
    link: { label: 'Full experience →', to: '/journey' },
    children: [],
  },
  {
    id: 'elaraby-rd',
    year: '2022 – 2024',
    category: 'work',
    title: 'R&D Hardware Electronics Engineer',
    subtitle: 'ELARABY Group',
    summary: 'Designed first in-house SMPS programs. Full magnetics ownership.',
    link: { label: 'Full experience →', to: '/journey' },
    children: [
      { id: 'flyback75', category: 'project', title: '75W Quasi-Resonant Flyback', link: { to: '/projects/flyback-75w' } },
      { id: 'tvpsu', category: 'project', title: '150W Dual-Flyback TV PSU', link: { to: '/projects/tv-psu-150w' } },
    ],
  },
  {
    id: 'bsc',
    year: '2015 – 2020',
    category: 'education',
    title: 'B.Sc. Electrical & Electronics Engineering',
    subtitle: 'Alexandria University',
    summary: 'Distinct with Honor — 5th in class (Top Graduate).',
    link: { label: 'Journey →', to: '/journey' },
    children: [],
  },
  {
    id: 'robotics',
    year: '2017',
    category: 'award',
    title: "1st Place — \"Let's Make A Robot\"",
    subtitle: '5th Annual Competition · M.I.A. Robotics',
    summary: 'First major engineering recognition — sparked the hardware career path.',
    link: null,
    children: [
      { id: 'minesweeper', category: 'project', title: 'Minesweeper 2019 Competition', link: null },
    ],
  },
]

// ─── Category config ───────────────────────────────────────────────────────────

const CATEGORY = {
  work:      { color: '#00E5C7', label: 'Experience' },
  education: { color: '#7C3AED', label: 'Education' },
  award:     { color: '#F0A500', label: 'Award' },
  project:   { color: '#00B4A0', label: 'Project' },
}

// ─── Primitives ────────────────────────────────────────────────────────────────

function CurrentBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '1px 6px', borderRadius: '4px',
      border: '1px solid rgba(0,229,199,0.3)',
      background: 'rgba(0,229,199,0.07)',
    }}>
      <motion.span
        style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00E5C7', display: 'block' }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#00E5C7', letterSpacing: '0.1em' }}>
        CURRENT
      </span>
    </span>
  )
}

function SpineSegment({ inView, color }) {
  return (
    <div style={{
      width: '20px', position: 'relative', flex: 1,
      minHeight: '20px', display: 'flex', justifyContent: 'center',
    }}>
      {/* Ghost ratsnest line — always visible at low opacity */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, width: '2px',
        background: 'rgba(0,229,199,0.08)',
        left: '50%', transform: 'translateX(-50%)',
      }} />
      {/* Animated trace */}
      <motion.div
        style={{
          position: 'absolute', top: 0, width: '2px',
          background: color,
          left: '50%', transform: 'translateX(-50%)',
          originY: 0,
        }}
        initial={{ height: 0 }}
        animate={inView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  )
}

function NodeShape({ category, color, inView }) {
  return (
    <motion.div
      style={{ flexShrink: 0, zIndex: 1 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: 0.5, duration: 0.3, type: 'spring', stiffness: 300 }}
    >
      <svg
        width="20" height="20" viewBox="0 0 14 14"
        style={{ filter: inView ? `drop-shadow(0 0 4px ${color})` : 'none', display: 'block' }}
      >
        {category === 'work' && (
          <rect x="1" y="1" width="12" height="12" rx="1.5" fill={color} />
        )}
        {category === 'education' && (
          <>
            <circle cx="7" cy="7" r="6" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="7" cy="7" r="3" fill={color} />
          </>
        )}
        {category === 'award' && (
          <rect x="2" y="2" width="10" height="10" rx="1" fill={color} transform="rotate(45 7 7)" />
        )}
        {category === 'project' && (
          <polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill="none" stroke={color} strokeWidth="1.5" />
        )}
      </svg>
    </motion.div>
  )
}

function ChildItem({ child, parentInView, index }) {
  const color = CATEGORY[child.category].color
  return (
    <motion.div
      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
      initial={{ opacity: 0, x: -8 }}
      animate={parentInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
    >
      {/* Branch connector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <div style={{ width: '12px', height: '1px', background: color, opacity: 0.5 }} />
        <svg width="12" height="12" viewBox="0 0 14 14">
          <polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      </div>
      {/* Child content */}
      {child.link ? (
        <Link
          to={child.link.to}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--color-muted)', textDecoration: 'none', letterSpacing: '0.03em',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = color }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)' }}
        >
          {child.title} →
        </Link>
      ) : (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          color: 'var(--color-muted)', letterSpacing: '0.03em',
        }}>
          {child.title}
        </span>
      )}
    </motion.div>
  )
}

// ─── TimelineItem ──────────────────────────────────────────────────────────────

function TimelineItem({ item, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReduced = useReducedMotion()
  const active = prefersReduced || inView
  const color = CATEGORY[item.category].color

  return (
    <div ref={ref} style={{ display: 'flex', gap: 0, marginBottom: isLast ? 0 : '8px' }}>
      {/* LEFT: spine column */}
      <div style={{
        width: '48px', flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Trace segment above node */}
        <SpineSegment inView={active} color={color} />
        {/* Node shape */}
        <NodeShape category={item.category} color={color} inView={active} />
        {/* Trace segment below node */}
        {!isLast && <SpineSegment inView={active} color={color} />}
      </div>

      {/* RIGHT: content */}
      <motion.div
        style={{ flex: 1, paddingLeft: '20px', paddingBottom: '48px' }}
        initial={{ opacity: 0, y: 10 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {/* Year + category label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            color: color, letterSpacing: '0.1em',
          }}>
            {item.year}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em',
          }}>
            {CATEGORY[item.category].label.toUpperCase()}
          </span>
          {item.id === 'pylon' && <CurrentBadge />}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem',
          color: 'var(--color-text)', marginBottom: '2px', lineHeight: 1.3,
        }}>
          {item.title}
        </h3>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.8rem',
          color: color, marginBottom: '8px', fontWeight: 500,
        }}>
          {item.subtitle}
        </p>

        {/* Summary */}
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.82rem',
          color: 'var(--color-muted)', lineHeight: 1.6,
          marginBottom: '10px', maxWidth: '480px',
        }}>
          {item.summary}
        </p>

        {/* Link */}
        {item.link && (
          <Link
            to={item.link.to}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: color, textDecoration: 'none', letterSpacing: '0.05em',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            {item.link.label}
          </Link>
        )}

        {/* Children */}
        {item.children.length > 0 && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {item.children.map((child, ci) => (
              <ChildItem key={child.id} child={child} parentInView={active} index={ci} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ─── PCBTimeline ───────────────────────────────────────────────────────────────

export default function PCBTimeline() {
  return (
    <section style={{ padding: '80px 0' }} aria-label="Career timeline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
          color: 'var(--color-primary)', letterSpacing: '0.15em', marginBottom: '48px',
        }}>
          // Career Timeline
        </p>

        {/* Timeline items */}
        <div style={{ position: 'relative' }}>
          {timelineData.map((item, i) => (
            <TimelineItem key={item.id} item={item} isLast={i === timelineData.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
