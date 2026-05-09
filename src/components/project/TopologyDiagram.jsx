import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import EmptyState from './EmptyState.jsx'

function NodeCircle({ node }) {
  const kindColors = {
    ic: 'var(--color-primary)',
    passive: 'var(--color-muted)',
    port: 'var(--color-accent)',
  }
  const fill = kindColors[node.kind] || kindColors.passive

  return (
    <g>
      <circle
        cx={node.x}
        cy={node.y}
        r={2.5}
        fill={fill}
        style={{
          filter:
            node.kind === 'ic'
              ? 'drop-shadow(0 0 2px var(--color-primary))'
              : node.kind === 'port'
              ? 'drop-shadow(0 0 2px var(--color-accent))'
              : 'none',
        }}
      />
      <text
        x={node.x}
        y={node.y + 5.5}
        textAnchor="middle"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '2.8px',
          fill: 'var(--color-muted)',
        }}
      >
        {node.label}
      </text>
    </g>
  )
}

function EdgeLine({ edge, nodeMap, inView, shouldReduce }) {
  const fromNode = nodeMap[edge.from]
  const toNode = nodeMap[edge.to]

  if (!fromNode || !toNode) return null

  const isPower = edge.signal === 'power'
  const stroke = isPower ? 'var(--color-accent)' : 'var(--color-primary)'
  const strokeWidth = isPower ? 0.8 : 0.5
  const strokeDasharray = isPower ? undefined : '1,1'

  if (shouldReduce) {
    return (
      <line
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeOpacity={0.7}
      />
    )
  }

  return (
    <motion.line
      x1={fromNode.x}
      y1={fromNode.y}
      x2={toNode.x}
      y2={toNode.y}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeOpacity={0.7}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
    />
  )
}

export default function TopologyDiagram({ topology }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  if (!topology) {
    return (
      <section>
        <p
          className="mb-4"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-primary)',
            letterSpacing: '0.1em',
          }}
        >
          // architecture
        </p>
        <EmptyState label="Architecture diagram" />
      </section>
    )
  }

  const { nodes, edges } = topology
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  return (
    <section ref={ref}>
      <p
        className="mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-primary)',
          letterSpacing: '0.1em',
        }}
      >
        // architecture
      </p>

      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
        }}
      >
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4">
          {[
            { kind: 'ic', label: 'IC / Controller', color: 'var(--color-primary)' },
            { kind: 'passive', label: 'Passive / Filter', color: 'var(--color-muted)' },
            { kind: 'port', label: 'Port / Interface', color: 'var(--color-accent)' },
          ].map(({ kind, label, color }) => (
            <div key={kind} className="flex items-center gap-2">
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: color,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--color-muted)',
                }}
              >
                {label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span
              style={{
                display: 'inline-block',
                width: '16px',
                height: '1px',
                background: 'var(--color-accent)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-muted)',
              }}
            >
              Power
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              style={{
                display: 'inline-block',
                width: '16px',
                height: '1px',
                background: 'var(--color-primary)',
                backgroundImage:
                  'repeating-linear-gradient(90deg, var(--color-primary) 0, var(--color-primary) 4px, transparent 4px, transparent 8px)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-muted)',
              }}
            >
              Data
            </span>
          </div>
        </div>

        <svg
          viewBox="0 0 100 60"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', overflow: 'visible', height: 'auto' }}
        >
          {/* Edges rendered first (behind nodes) */}
          {edges.map((edge, i) => (
            <EdgeLine
              key={i}
              edge={edge}
              nodeMap={nodeMap}
              inView={inView}
              shouldReduce={shouldReduce}
            />
          ))}

          {/* Nodes rendered on top */}
          {nodes.map(node => (
            <NodeCircle key={node.id} node={node} />
          ))}
        </svg>
      </div>
    </section>
  )
}
