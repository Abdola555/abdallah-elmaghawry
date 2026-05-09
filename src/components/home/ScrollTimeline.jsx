import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { timelineMilestones } from '../../data/timeline.js'
import SectionTitle from '../SectionTitle.jsx'

const N = timelineMilestones.length  // 6

// SVG layout constants
const VB_W = 900
const VB_H = 320
const TRACK_Y = VB_H / 2
const MARGIN_X = 80
const NODE_SPACING = (VB_W - MARGIN_X * 2) / (N - 1)

function nodeX(i) {
  return MARGIN_X + i * NODE_SPACING
}

const KIND_COLORS = {
  award: '#F0A500',
  education: '#a78bfa',
  project: '#00E5C7',
  milestone: '#60a5fa',
}

const CARD_W = 160
const CARD_H = 88

// Individual node — each gets its own pre-computed progress MotionValue
function AnimatedNode({ milestone, nodeProgress, traceProgress, i, isAbove }) {
  const color = KIND_COLORS[milestone.kind] || '#00E5C7'
  const x = nodeX(i)
  const cardX = x - CARD_W / 2
  const cardYPos = isAbove ? TRACK_Y - CARD_H - 32 : TRACK_Y + 22

  const traceX2 = useTransform(traceProgress, [0, 1], [nodeX(i - 1), x])
  const nodeScale = useTransform(nodeProgress, [0, 1], [0.6, 1])
  const nodeOpacity = useTransform(nodeProgress, [0, 0.4, 1], [0.3, 0.9, 1])
  const innerDotOpacity = useTransform(nodeProgress, [0.5, 1], [0, 1])
  const yearOpacity = useTransform(nodeProgress, [0.3, 0.8], [0, 1])
  const cardOpacity = useTransform(nodeProgress, [0.4, 1], [0, 1])
  const cardDy = useTransform(nodeProgress, [0.4, 1], [isAbove ? 8 : -8, 0])

  return (
    <g>
      {/* Trace segment from prev node */}
      {i > 0 && (
        <motion.line
          x1={nodeX(i - 1)}
          y1={TRACK_Y}
          x2={traceX2}
          y2={TRACK_Y}
          stroke="var(--color-primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 3px rgba(0,229,199,0.5))' }}
        />
      )}

      {/* Glow halo */}
      <motion.circle
        cx={x}
        cy={TRACK_Y}
        r={20}
        fill="none"
        stroke={color}
        strokeWidth="1"
        style={{ opacity: useTransform(nodeProgress, [0.6, 1], [0, 0.35]) }}
      />

      {/* Main node */}
      <motion.circle
        cx={x}
        cy={TRACK_Y}
        r={10}
        fill="var(--color-surface)"
        stroke={color}
        strokeWidth="2"
        style={{ scale: nodeScale, opacity: nodeOpacity }}
      />

      {/* Inner dot */}
      <motion.circle
        cx={x}
        cy={TRACK_Y}
        r={3.5}
        fill={color}
        style={{ opacity: innerDotOpacity }}
      />

      {/* Year */}
      <motion.text
        x={x}
        y={TRACK_Y + (isAbove ? 22 : -14)}
        textAnchor="middle"
        style={{
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          fill: color,
          opacity: yearOpacity,
        }}
      >
        {milestone.year}
      </motion.text>

      {/* Detail card */}
      <motion.foreignObject
        x={cardX}
        y={cardYPos}
        width={CARD_W}
        height={CARD_H}
        style={{ opacity: cardOpacity, y: cardDy }}
      >
        <div
          style={{
            background: 'var(--color-surface)',
            border: `1px solid ${color}33`,
            borderRadius: '6px',
            padding: '8px 10px',
            boxShadow: `0 0 12px ${color}22`,
          }}
        >
          <p style={{
            margin: 0,
            fontSize: '11px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            color,
            lineHeight: 1.3,
          }}>
            {milestone.label}
          </p>
          <p style={{
            margin: '3px 0 0',
            fontSize: '9.5px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-muted)',
            lineHeight: 1.4,
          }}>
            {milestone.detail}
          </p>
        </div>
      </motion.foreignObject>
    </g>
  )
}

// Wrapper that computes MotionValues for one milestone at index i
function NodeController({ scrollYProgress, milestone, i }) {
  const nodeProgress = useTransform(scrollYProgress, [i / N, Math.min((i + 0.7) / N, 1)], [0, 1])
  const traceProgress = useTransform(
    scrollYProgress,
    [(i - 1) / N, i / N],
    [0, 1]
  )
  return (
    <AnimatedNode
      milestone={milestone}
      nodeProgress={nodeProgress}
      traceProgress={traceProgress}
      i={i}
      isAbove={i % 2 === 0}
    />
  )
}

function DesktopTimeline({ scrollYProgress }) {
  return (
    <div
      className="hidden md:flex flex-col justify-center"
      style={{ height: '100%' }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full"
        style={{ maxHeight: '60vh' }}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Base dim track */}
        <line
          x1={nodeX(0)}
          y1={TRACK_Y}
          x2={nodeX(N - 1)}
          y2={TRACK_Y}
          stroke="rgba(0,229,199,0.1)"
          strokeWidth="1"
        />

        {/* Nodes with their trace segments */}
        {timelineMilestones.map((milestone, i) => (
          <NodeController
            key={milestone.year}
            scrollYProgress={scrollYProgress}
            milestone={milestone}
            i={i}
          />
        ))}
      </svg>

      <div className="text-center mt-4">
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontSize: '0.65rem' }}>
          ↓ scroll to trace the journey
        </p>
      </div>
    </div>
  )
}

function MobileTimeline() {
  return (
    <div className="space-y-0">
      {timelineMilestones.map((m, i) => {
        const color = KIND_COLORS[m.kind] || '#00E5C7'
        return (
          <motion.div
            key={m.year}
            className="flex gap-4 pb-8"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="flex flex-col items-center gap-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  border: `2px solid ${color}`,
                  background: 'var(--color-surface)',
                  boxShadow: `0 0 8px ${color}44`,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              </div>
              {i < N - 1 && (
                <div
                  className="w-px flex-1 mt-1"
                  style={{ background: 'var(--color-border)', minHeight: '32px' }}
                />
              )}
            </div>

            <div className="flex-1 pb-2">
              <span
                className="text-xs"
                style={{ fontFamily: 'var(--font-mono)', color }}
              >
                {m.year}
              </span>
              <h3
                className="font-bold mt-0.5"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: '0.95rem' }}
              >
                {m.label}
              </h3>
              <p
                className="text-sm mt-1 leading-relaxed"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
              >
                {m.detail}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function ScrollTimeline() {
  const prefersReduced = useReducedMotion()
  const trackRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={trackRef}
      aria-label="Career timeline"
      style={{
        height: prefersReduced ? 'auto' : '500vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: prefersReduced ? 'relative' : 'sticky',
          top: 0,
          height: prefersReduced ? 'auto' : '100vh',
          overflow: 'hidden',
          background: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Section header */}
        <div className="px-6 md:px-12 pt-16 md:pt-20 flex-shrink-0">
          <SectionTitle eyebrow="The Journey" title="Timeline" />
        </div>

        <div className="flex-1 px-6 md:px-12 pb-8 overflow-hidden">
          {/* Desktop: animated SVG */}
          {!prefersReduced && <DesktopTimeline scrollYProgress={scrollYProgress} />}

          {/* Mobile: vertical list (always shown on sm) */}
          <div className={prefersReduced ? 'block' : 'block md:hidden'}>
            <MobileTimeline />
          </div>
        </div>
      </div>
    </section>
  )
}
