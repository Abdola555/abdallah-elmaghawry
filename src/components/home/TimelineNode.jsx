import { motion, useTransform } from 'framer-motion'

const KIND_COLORS = {
  award: '#F0A500',
  education: '#a78bfa',
  project: '#00E5C7',
  milestone: '#60a5fa',
}

export default function TimelineNode({ milestone, nodeProgress, x, y, isAbove }) {
  const color = KIND_COLORS[milestone.kind] || '#00E5C7'

  const scale = useTransform(nodeProgress, [0, 1], [0.6, 1])
  const opacity = useTransform(nodeProgress, [0, 0.4, 1], [0.3, 0.9, 1])
  const cardOpacity = useTransform(nodeProgress, [0.4, 1], [0, 1])
  const cardY = useTransform(nodeProgress, [0.4, 1], [isAbove ? 10 : -10, 0])

  const CARD_WIDTH = 160
  const CARD_HEIGHT = 80

  const cardX = x - CARD_WIDTH / 2
  const cardYPos = isAbove ? y - CARD_HEIGHT - 28 : y + 20

  return (
    <g>
      {/* Glow halo */}
      <motion.circle
        cx={x}
        cy={y}
        r={20}
        fill="none"
        stroke={color}
        strokeWidth={1}
        style={{
          opacity: useTransform(nodeProgress, [0.5, 1], [0, 0.35]),
        }}
      />

      {/* Main node circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={10}
        fill="var(--color-surface)"
        stroke={color}
        strokeWidth={2}
        style={{ scale, opacity }}
      />

      {/* Inner dot */}
      <motion.circle
        cx={x}
        cy={y}
        r={3.5}
        style={{
          fill: color,
          opacity: useTransform(nodeProgress, [0.5, 1], [0, 1]),
        }}
      />

      {/* Year label */}
      <motion.text
        x={x}
        y={y + (isAbove ? 22 : -14)}
        textAnchor="middle"
        style={{
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          fill: color,
          opacity: useTransform(nodeProgress, [0.3, 0.8], [0, 1]),
        }}
      >
        {milestone.year}
      </motion.text>

      {/* Detail card */}
      <motion.foreignObject
        x={cardX}
        y={cardYPos}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        style={{ opacity: cardOpacity, y: cardY }}
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
            color: color,
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
