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
    summary: 'Leading BMS for LFP packs and three-phase smart-meter SMPS development. ~40% BOM reduction vs. previous generation.',
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
    summary: 'AI-based battery State of Health (SOH) estimation for EV applications — at the intersection of power electronics, battery systems, and data-driven modeling.',
    link: { label: 'Journey →', to: '/journey' },
    children: [],
  },
  {
    id: 'elaraby-senior',
    year: '2024 – 2025',
    category: 'work',
    title: 'Senior Hardware Engineer',
    subtitle: 'ELARABY Group',
    summary: 'On-site vendor audits and validation residencies in China. Led PCB validation and qualification for mass production.',
    link: { label: 'Full experience →', to: '/journey' },
    children: [],
  },
  {
    id: 'elaraby-rd',
    year: '2022 – 2024',
    category: 'work',
    title: 'R&D Hardware Electronics Engineer',
    subtitle: 'ELARABY Group',
    summary: 'Designed the company\'s first in-house SMPS programs. Full custom magnetics ownership from core selection through winding.',
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
    summary: 'Graduated with Distinction with Honor — ranked 5th in class. Specialization in power electronics and embedded systems.',
    link: { label: 'Journey →', to: '/journey' },
    children: [],
  },
  {
    id: 'robotics',
    year: '2017',
    category: 'award',
    title: "1st Place — \"Let's Make A Robot\"",
    subtitle: '5th Annual Competition · M.I.A. Robotics',
    summary: 'First major engineering recognition. Sparked the hardware career path — PCB design, system integration, and embedded control.',
    link: null,
    children: [
      { id: 'minesweeper', category: 'project', title: 'Minesweeper 2019 Competition', link: null },
    ],
  },
]

// ─── Category config ───────────────────────────────────────────────────────────

const CATEGORY = {
  work:      { color: '#00E5C7', label: 'Experience' },
  education: { color: '#A78BFA', label: 'Education' },
  award:     { color: '#F0A500', label: 'Award' },
  project:   { color: '#2DD4BF', label: 'Project' },
}

// ─── Primitives ────────────────────────────────────────────────────────────────

function CurrentBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '2px 8px', borderRadius: '4px',
      border: '1px solid rgba(0,229,199,0.3)',
      background: 'rgba(0,229,199,0.07)',
    }}>
      <motion.span
        style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00E5C7', display: 'block', flexShrink: 0 }}
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#00E5C7', letterSpacing: '0.1em' }}>
        CURRENT
      </span>
    </span>
  )
}

function NodeShape({ category, color, inView }) {
  return (
    <motion.div
      style={{ flexShrink: 0, zIndex: 2, position: 'relative' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: 0.4, duration: 0.35, type: 'spring', stiffness: 280 }}
    >
      <svg
        width="24" height="24" viewBox="0 0 14 14"
        style={{ filter: inView ? `drop-shadow(0 0 5px ${color})` : 'none', display: 'block' }}
      >
        {category === 'work' && <rect x="1" y="1" width="12" height="12" rx="1.5" fill={color} />}
        {category === 'education' && <>
          <circle cx="7" cy="7" r="6" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="7" cy="7" r="3" fill={color} />
        </>}
        {category === 'award' && <rect x="2" y="2" width="10" height="10" rx="1" fill={color} transform="rotate(45 7 7)" />}
        {category === 'project' && <polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill="none" stroke={color} strokeWidth="1.5" />}
      </svg>
    </motion.div>
  )
}

function SpineSegment({ inView, color, minHeight = 32 }) {
  return (
    <div style={{ position: 'relative', flex: 1, minHeight: `${minHeight}px`, width: '24px', display: 'flex', justifyContent: 'center' }}>
      {/* Ghost ratsnest */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, width: '2px', background: 'rgba(0,229,199,0.07)', left: '50%', transform: 'translateX(-50%)' }} />
      {/* Animated trace */}
      <motion.div
        style={{ position: 'absolute', top: 0, width: '2px', background: color, left: '50%', transform: 'translateX(-50%)', originY: 0 }}
        initial={{ height: 0 }}
        animate={inView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  )
}

// Children rendered inside the content card, visually nested
function ChildList({ children, parentInView, align }) {
  if (!children.length) return null
  return (
    <div style={{
      marginTop: '16px',
      paddingTop: '12px',
      borderTop: '1px solid rgba(0,229,199,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      // On desktop: align children toward center (left card → items right-aligned branch, right card → items left-aligned branch)
    }}>
      {children.map((child, ci) => {
        const color = CATEGORY[child.category]?.color || CATEGORY.project.color
        return (
          <motion.div
            key={child.id}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            initial={{ opacity: 0, x: align === 'right' ? -10 : 10 }}
            animate={parentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.65 + ci * 0.1, duration: 0.4 }}
          >
            {/* Via dot */}
            <svg width="12" height="12" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
              <polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill="none" stroke={color} strokeWidth="1.5" />
            </svg>
            {/* Branch line */}
            <div style={{ width: '16px', height: '1px', background: color, opacity: 0.4, flexShrink: 0 }} />
            {child.link ? (
              <Link
                to={child.link.to}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-muted)', textDecoration: 'none', letterSpacing: '0.02em' }}
                onMouseEnter={e => { e.currentTarget.style.color = color }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)' }}
              >
                {child.title} →
              </Link>
            ) : (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-muted)', letterSpacing: '0.02em' }}>
                {child.title}
              </span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// Content card — shared between left and right sides
function ContentCard({ item, inView, align }) {
  const color = CATEGORY[item.category].color
  const isLeft = align === 'left'

  return (
    <motion.div
      style={{
        background: 'var(--color-surface)',
        border: `1px solid ${color}22`,
        borderRadius: '12px',
        padding: '20px 24px',
        flex: 1,
        maxWidth: '440px',
        // On desktop: push left-side card to the right edge, right-side to the left edge
        marginLeft: isLeft ? 'auto' : undefined,
        marginRight: isLeft ? undefined : 'auto',
      }}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Year + category + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: color, letterSpacing: '0.08em' }}>
          {item.year}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
          {CATEGORY[item.category].label.toUpperCase()}
        </span>
        {item.id === 'pylon' && <CurrentBadge />}
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '4px', lineHeight: 1.25 }}>
        {item.title}
      </h3>

      {/* Subtitle */}
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: color, marginBottom: '10px', fontWeight: 500 }}>
        {item.subtitle}
      </p>

      {/* Summary */}
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.65, marginBottom: item.link ? '12px' : 0 }}>
        {item.summary}
      </p>

      {/* Link */}
      {item.link && (
        <Link
          to={item.link.to}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: color, textDecoration: 'none', letterSpacing: '0.04em' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.65' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          {item.link.label}
        </Link>
      )}

      {/* Children nested inside card */}
      <ChildList children={item.children} parentInView={inView} align={align} />
    </motion.div>
  )
}

// ─── Desktop TimelineItem (centered spine, alternating sides) ─────────────────

function DesktopTimelineItem({ item, index, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReduced = useReducedMotion()
  const active = prefersReduced || inView
  const color = CATEGORY[item.category].color
  const isLeft = index % 2 === 0  // even → left side, odd → right side

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'flex-start', gap: 0, marginBottom: isLast ? 0 : '8px' }}>

      {/* Left content area */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: '36px', paddingTop: '16px', paddingBottom: '40px' }}>
        {isLeft && <ContentCard item={item} inView={active} align="left" />}
      </div>

      {/* Center spine — node only, continuous line is in the parent */}
      <div style={{ width: '48px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px', position: 'relative', zIndex: 1 }}>
        <NodeShape category={item.category} color={color} inView={active} />
      </div>

      {/* Right content area */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: '36px', paddingTop: '16px', paddingBottom: '40px' }}>
        {!isLeft && <ContentCard item={item} inView={active} align="right" />}
      </div>
    </div>
  )
}

// ─── Mobile TimelineItem (left spine, content right) ─────────────────────────

function MobileTimelineItem({ item, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReduced = useReducedMotion()
  const active = prefersReduced || inView
  const color = CATEGORY[item.category].color

  return (
    <div ref={ref} style={{ display: 'flex', gap: 0, marginBottom: isLast ? 0 : '8px', position: 'relative', zIndex: 1 }}>
      {/* Left spine — node only, continuous line is in the parent */}
      <div style={{ width: '36px', flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '16px' }}>
        <NodeShape category={item.category} color={color} inView={active} />
      </div>

      {/* Right content */}
      <motion.div
        style={{ flex: 1, paddingLeft: '16px', paddingBottom: isLast ? 0 : '40px' }}
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.35, duration: 0.45 }}
      >
        {/* Year + category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: color, letterSpacing: '0.08em' }}>
            {item.year}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
            {CATEGORY[item.category].label.toUpperCase()}
          </span>
          {item.id === 'pylon' && <CurrentBadge />}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)', marginBottom: '3px', lineHeight: 1.25 }}>
          {item.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: color, marginBottom: '8px', fontWeight: 500 }}>
          {item.subtitle}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: item.link ? '10px' : 0 }}>
          {item.summary}
        </p>
        {item.link && (
          <Link
            to={item.link.to}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: color, textDecoration: 'none', letterSpacing: '0.04em' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.65' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            {item.link.label}
          </Link>
        )}
        <ChildList children={item.children} parentInView={active} align="right" />
      </motion.div>
    </div>
  )
}

// ─── PCBTimeline ───────────────────────────────────────────────────────────────

export default function PCBTimeline() {
  return (
    <section style={{ padding: '80px 0' }} aria-label="Career timeline">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
          color: 'var(--color-primary)', letterSpacing: '0.15em', marginBottom: '56px',
        }}>
          // Career Timeline
        </p>

        {/* Desktop: centered spine with continuous background line */}
        <div className="hidden md:block" style={{ position: 'relative' }}>
          {/* Continuous spine line — calc(50%) centers it exactly */}
          <div style={{
            position: 'absolute',
            top: '40px',
            bottom: '40px',
            left: 'calc(50% - 1px)',
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(0,229,199,0.15), rgba(0,229,199,0.08) 20%, rgba(0,229,199,0.08) 80%, rgba(0,229,199,0.15))',
            zIndex: 0,
            pointerEvents: 'none',
          }} />
          {timelineData.map((item, i) => (
            <DesktopTimelineItem key={item.id} item={item} index={i} isLast={i === timelineData.length - 1} />
          ))}
        </div>

        {/* Mobile: left spine with continuous background line */}
        <div className="md:hidden" style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '40px', bottom: '40px',
            left: '17px',
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(0,229,199,0.15), rgba(0,229,199,0.08) 20%, rgba(0,229,199,0.08) 80%, rgba(0,229,199,0.15))',
            zIndex: 0,
            pointerEvents: 'none',
          }} />
          {timelineData.map((item, i) => (
            <MobileTimelineItem key={item.id} item={item} isLast={i === timelineData.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
