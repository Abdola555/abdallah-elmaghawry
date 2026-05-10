import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'
import { Briefcase, GraduationCap, Trophy, CircuitBoard } from 'lucide-react'
import GridBackdrop from './GridBackdrop.jsx'

/* ─── Milestone data ─────────────────────────────────────────────────────── */
const milestones = [
  {
    year: '2025',
    category: 'work',
    label: 'Sr. R&D HW Eng.',
    company: 'Pylon (YC S21)',
    detail:
      'Leading BMS development for LFP packs using TI AFE and fuel-gauge ICs. Designed three-phase smart-meter SMPS with ~40% BOM reduction vs. previous generation.',
    accent: '~40% BOM cut',
    active: true,
  },
  {
    year: '2024',
    category: 'work',
    label: 'Senior HW Engineer',
    company: 'ELARABY Group',
    detail:
      'On-site vendor audits and validation residencies in China. Led PCB validation and qualification for mass production.',
    accent: '2× China residencies',
    active: false,
  },
  {
    year: '2023',
    category: 'education',
    label: 'M.Sc. in Power Electronics',
    company: 'Cairo University',
    detail:
      'Research: AI-based Battery State of Health (SOH) estimation for EV applications — bridging power electronics, battery systems, and data-driven modeling.',
    accent: 'In Progress · 2027',
    active: false,
  },
  {
    year: '2022',
    category: 'project',
    label: 'R&D HW Engineer',
    company: 'ELARABY Group',
    detail:
      "Designed the company's first in-house SMPS — a 75W quasi-resonant flyback converter with full custom magnetics (core, gap, winding). Co-designed 150W dual-flyback TV PSU.",
    accent: 'First in-house SMPS',
    active: false,
  },
  {
    year: '2020',
    category: 'education',
    label: 'B.Sc. Electrical Engineering',
    company: 'Alexandria University',
    detail:
      'Graduated with Distinction with Honor — ranked 5th in class. Specialized in power electronics and embedded systems.',
    accent: 'Distinct with Honor · 5th',
    active: false,
  },
  {
    year: '2017',
    category: 'award',
    label: '1st Place — Robotics',
    company: "Let's Make A Robot (5th Annual)",
    detail:
      'First major engineering recognition. Sparked the hardware career path — PCB design, system integration, and embedded control for competition robots.',
    accent: '1st Place',
    active: false,
  },
]

const N = milestones.length

/* ─── Shape vocabulary (SVG) ────────────────────────────────────────────── */
// y positions for each node inside the trace SVG (viewBox height = 800)
const NODE_TOP = 60
const NODE_SPACING = (800 - NODE_TOP * 2) / (N - 1)
const nodeY = (i) => NODE_TOP + i * NODE_SPACING

function NodeShape({ category, active, isCurrentRole }) {
  const cx = 30
  const cy = 30 // local coords — SVG is 60×60

  if (category === 'work') {
    // filled square (rotated 0°)
    const s = 12
    return (
      <rect
        x={cx - s / 2}
        y={cy - s / 2}
        width={s}
        height={s}
        fill={isCurrentRole ? 'var(--color-primary)' : active ? 'var(--color-primary)' : 'var(--color-surface)'}
        stroke="var(--color-primary)"
        strokeWidth={active ? 1.5 : 1}
        style={active ? { filter: 'drop-shadow(0 0 6px rgba(0,229,199,0.7))' } : undefined}
      />
    )
  }
  if (category === 'project') {
    // hexagon (6-sided)
    const r = 7
    const pts = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
    }).join(' ')
    return (
      <polygon
        points={pts}
        fill={active ? 'var(--color-primary)' : 'var(--color-surface)'}
        stroke="var(--color-primary)"
        strokeWidth={active ? 1.5 : 1}
        style={active ? { filter: 'drop-shadow(0 0 6px rgba(0,229,199,0.7))' } : undefined}
      />
    )
  }
  if (category === 'education') {
    // IC pad: circle with inner ring
    return (
      <>
        <circle
          cx={cx}
          cy={cy}
          r={7}
          fill={active ? 'rgba(0,229,199,0.15)' : 'var(--color-surface)'}
          stroke="var(--color-primary)"
          strokeWidth={active ? 1.5 : 1}
          style={active ? { filter: 'drop-shadow(0 0 5px rgba(0,229,199,0.6))' } : undefined}
        />
        <circle
          cx={cx}
          cy={cy}
          r={3}
          fill={active ? 'var(--color-primary)' : 'transparent'}
          stroke="var(--color-primary)"
          strokeWidth={1}
        />
      </>
    )
  }
  if (category === 'award') {
    // diamond (square rotated 45°) — amber
    const s = 10
    return (
      <rect
        x={cx - s / 2}
        y={cy - s / 2}
        width={s}
        height={s}
        transform={`rotate(45, ${cx}, ${cy})`}
        fill={active ? 'var(--color-accent)' : 'var(--color-surface)'}
        stroke="var(--color-accent)"
        strokeWidth={active ? 1.5 : 1}
        style={active ? { filter: 'drop-shadow(0 0 8px rgba(240,165,0,0.8))' } : undefined}
      />
    )
  }
  return null
}

/* ─── Category icon (lucide) ────────────────────────────────────────────── */
function CategoryIcon({ category, active }) {
  const color = category === 'award'
    ? (active ? 'var(--color-accent)' : 'var(--color-muted)')
    : (active ? 'var(--color-primary)' : 'var(--color-muted)')
  const size = 20
  const props = { size, color, strokeWidth: 1.5 }
  if (category === 'work') return <Briefcase {...props} />
  if (category === 'education') return <GraduationCap {...props} />
  if (category === 'award') return <Trophy {...props} />
  if (category === 'project') return <CircuitBoard {...props} />
  return null
}

/* ─── Animated trace segment ────────────────────────────────────────────── */
function TraceSegment({ x, y1, y2, progress }) {
  const length = y2 - y1
  const dashOffset = useTransform(progress, [0, 1], [length, 0])
  return (
    <motion.line
      x1={x}
      y1={y1}
      x2={x}
      y2={y2}
      stroke="var(--color-primary)"
      strokeWidth={1}
      strokeOpacity={0.5}
      strokeDasharray={length}
      style={{ strokeDashoffset: dashOffset }}
    />
  )
}

/* ─── Animated node wrapper ─────────────────────────────────────────────── */
function AnimatedNode({ i, category, active, isCurrentRole, scrollYProgress }) {
  const nodeProgress = useTransform(
    scrollYProgress,
    [i / N, Math.min((i + 0.5) / N, 1)],
    [0, 1]
  )
  const scale = useTransform(nodeProgress, [0, 1], [0.6, 1])
  const opacity = useTransform(nodeProgress, [0, 1], [0.3, 1])

  return (
    <motion.g style={{ scale, opacity }} transformOrigin="30px 30px">
      <NodeShape category={category} active={active} isCurrentRole={isCurrentRole} />
    </motion.g>
  )
}

/* ─── Static node (reduced motion) ─────────────────────────────────────── */
function StaticNode({ category, active, isCurrentRole }) {
  return <NodeShape category={category} active={active} isCurrentRole={isCurrentRole} />
}

/* ─── Detail card ────────────────────────────────────────────────────────── */
function DetailCard({ milestone, index }) {
  const isAward = milestone.category === 'award'
  const accentColor = isAward ? 'var(--color-accent)' : 'var(--color-primary)'
  const accentBg = isAward ? 'rgba(240,165,0,0.1)' : 'rgba(0,229,199,0.08)'
  const accentBorder = isAward ? 'rgba(240,165,0,0.3)' : 'rgba(0,229,199,0.25)'

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 0 0 40px',
      }}
    >
      {/* Inner card */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: `1px solid ${accentBorder}`,
          borderRadius: '16px',
          padding: '32px 36px',
          maxWidth: '520px',
          boxShadow: isAward
            ? '0 0 40px rgba(240,165,0,0.08), 0 16px 48px rgba(0,0,0,0.3)'
            : '0 0 40px rgba(0,229,199,0.06), 0 16px 48px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top-right corner glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: isAward
              ? 'radial-gradient(ellipse at top right, rgba(240,165,0,0.06) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at top right, rgba(0,229,199,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Header row: icon + year */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: accentBg,
              border: `1px solid ${accentBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CategoryIcon category={milestone.category} active={true} />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: accentColor,
              letterSpacing: '0.1em',
            }}
          >
            {milestone.year}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
            color: 'var(--color-text)',
            lineHeight: 1.2,
            marginBottom: '6px',
            letterSpacing: '-0.02em',
          }}
        >
          {milestone.label}
        </h3>

        {/* Company */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: accentColor,
            fontWeight: 500,
            marginBottom: '20px',
            opacity: 0.85,
          }}
        >
          {milestone.company}
        </p>

        {/* Detail paragraph */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: 'var(--color-muted)',
            lineHeight: 1.75,
            marginBottom: '24px',
          }}
        >
          {milestone.detail}
        </p>

        {/* Accent pill */}
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.06em',
            color: accentColor,
            background: accentBg,
            border: `1px solid ${accentBorder}`,
            borderRadius: '999px',
            padding: '4px 12px',
          }}
        >
          {milestone.accent}
        </span>

        {/* Active indicator */}
        {milestone.active && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--color-primary)',
              letterSpacing: '0.08em',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                boxShadow: '0 0 6px rgba(0,229,199,0.9)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            CURRENT
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Animated main component ────────────────────────────────────────────── */
function AnimatedTimeline() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * N), N - 1)
    setActiveIndex(idx)
  })

  // Trace progress for each segment (between consecutive nodes)
  const traceProgressValues = milestones.map((_, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(
      scrollYProgress,
      [i / N, Math.min((i + 1) / N, 1)],
      [0, 1]
    )
  })

  // SVG constants
  const SVG_W = 60
  const SVG_H = 800

  return (
    <section
      ref={sectionRef}
      style={{ height: '400vh', position: 'relative' }}
      aria-label="Career timeline"
    >
      {/* ── Sticky container ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <GridBackdrop
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        />

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '20%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(ellipse at center, rgba(0,229,199,0.04) 0%, transparent 65%)',
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Inner layout */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              paddingTop: '40px',
              paddingBottom: '12px',
              flexShrink: 0,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--color-primary)',
                letterSpacing: '0.15em',
              }}
            >
              // Career Timeline
            </p>
          </div>

          {/* Two columns */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: '0',
              overflow: 'hidden',
            }}
          >
            {/* ── Left column (35%) ── */}
            <div
              style={{
                width: '35%',
                flexShrink: 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
              className="sm:w-[28%]"
            >
              {/* SVG trace — fills left column height */}
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                  style={{
                    width: '60px',
                    height: '100%',
                    overflow: 'visible',
                  }}
                  aria-hidden="true"
                >
                  {/* Ghost trace line (full height, dim) */}
                  <line
                    x1={SVG_W / 2}
                    y1={NODE_TOP}
                    x2={SVG_W / 2}
                    y2={nodeY(N - 1)}
                    stroke="var(--color-border)"
                    strokeWidth={1}
                  />

                  {/* Animated segments */}
                  {milestones.map((_, i) => {
                    if (i >= N - 1) return null
                    return (
                      <TraceSegment
                        key={i}
                        x={SVG_W / 2}
                        y1={nodeY(i)}
                        y2={nodeY(i + 1)}
                        progress={traceProgressValues[i]}
                      />
                    )
                  })}

                  {/* Nodes */}
                  {milestones.map((ms, i) => {
                    const y = nodeY(i)
                    const isActive = i === activeIndex
                    return (
                      <g key={i} transform={`translate(0, ${y - 30})`}>
                        <AnimatedNode
                          i={i}
                          category={ms.category}
                          active={isActive}
                          isCurrentRole={ms.active}
                          scrollYProgress={scrollYProgress}
                        />
                      </g>
                    )
                  })}
                </svg>

                {/* Year labels — absolutely positioned alongside the SVG */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    width: '120px',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                >
                  {milestones.map((ms, i) => {
                    const isActive = i === activeIndex
                    // y as percentage of container height
                    const yPct = (nodeY(i) / SVG_H) * 100
                    const isAward = ms.category === 'award'
                    return (
                      <motion.div
                        key={i}
                        style={{
                          position: 'absolute',
                          top: `${yPct}%`,
                          left: '8px',
                          transform: 'translateY(-50%)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.08em',
                          color: isActive
                            ? (isAward ? 'var(--color-accent)' : 'var(--color-primary)')
                            : 'var(--color-muted)',
                          transition: 'color 0.3s ease',
                          whiteSpace: 'nowrap',
                        }}
                        animate={{
                          color: isActive
                            ? (isAward ? 'var(--color-accent)' : 'var(--color-primary)')
                            : '#9CA3AF',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {ms.year}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ── Right column (65%) ── */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
              className="sm:flex-[72]"
            >
              <AnimatePresence mode="wait">
                <DetailCard
                  key={activeIndex}
                  milestone={milestones[activeIndex]}
                  index={activeIndex}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Progress indicator at bottom */}
          <div
            style={{
              paddingBottom: '24px',
              paddingTop: '8px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-muted)',
                letterSpacing: '0.1em',
              }}
            >
              {activeIndex + 1} / {N}
            </span>
            <div
              style={{
                flex: 1,
                maxWidth: '120px',
                height: '1px',
                background: 'var(--color-border)',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '999px',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  background: 'var(--color-primary)',
                  borderRadius: '999px',
                }}
                animate={{ width: `${((activeIndex + 1) / N) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-muted)',
                letterSpacing: '0.08em',
              }}
            >
              scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Static fallback (reduced motion) ──────────────────────────────────── */
function StaticTimeline() {
  const SVG_W = 60

  return (
    <section
      style={{ padding: '80px 0', position: 'relative' }}
      aria-label="Career timeline"
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--color-primary)',
            letterSpacing: '0.15em',
            marginBottom: '40px',
          }}
        >
          // Career Timeline
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {milestones.map((ms, i) => {
            const isAward = ms.category === 'award'
            const accentColor = isAward ? 'var(--color-accent)' : 'var(--color-primary)'
            const accentBg = isAward ? 'rgba(240,165,0,0.1)' : 'rgba(0,229,199,0.08)'
            const accentBorder = isAward ? 'rgba(240,165,0,0.3)' : 'rgba(0,229,199,0.25)'

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '0',
                  alignItems: 'stretch',
                }}
              >
                {/* Left: node + line */}
                <div
                  style={{
                    width: '35%',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    paddingRight: '24px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: SVG_W,
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    {i > 0 && (
                      <div
                        style={{
                          width: '1px',
                          height: '24px',
                          background: 'var(--color-border)',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <svg
                      viewBox="0 0 60 60"
                      style={{ width: '60px', height: '60px', flexShrink: 0 }}
                      aria-hidden="true"
                    >
                      <StaticNode
                        category={ms.category}
                        active={true}
                        isCurrentRole={ms.active}
                      />
                    </svg>
                    {i < N - 1 && (
                      <div
                        style={{
                          flex: 1,
                          width: '1px',
                          background: 'var(--color-border)',
                          minHeight: '60px',
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Right: card */}
                <div
                  style={{
                    flex: 1,
                    paddingBottom: i < N - 1 ? '24px' : '0',
                    paddingTop: '8px',
                  }}
                >
                  <div
                    style={{
                      background: 'var(--color-surface)',
                      border: `1px solid ${accentBorder}`,
                      borderRadius: '12px',
                      padding: '20px 24px',
                      maxWidth: '520px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <CategoryIcon category={ms.category} active={true} />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: accentColor,
                          letterSpacing: '0.08em',
                        }}
                      >
                        {ms.year}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: 'var(--color-text)',
                        lineHeight: 1.25,
                        marginBottom: '4px',
                      }}
                    >
                      {ms.label}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        color: accentColor,
                        marginBottom: '12px',
                        fontWeight: 500,
                        opacity: 0.85,
                      }}
                    >
                      {ms.company}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem',
                        color: 'var(--color-muted)',
                        lineHeight: 1.7,
                        marginBottom: '14px',
                      }}
                    >
                      {ms.detail}
                    </p>
                    <span
                      style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: accentColor,
                        background: accentBg,
                        border: `1px solid ${accentBorder}`,
                        borderRadius: '999px',
                        padding: '3px 10px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {ms.accent}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Export ─────────────────────────────────────────────────────────────── */
export default function VerticalTimeline() {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <StaticTimeline />
  return <AnimatedTimeline />
}
