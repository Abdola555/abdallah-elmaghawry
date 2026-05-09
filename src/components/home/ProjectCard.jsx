import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import StatusBadge from '../primitives/StatusBadge.jsx'
import Pill from '../primitives/Pill.jsx'

export default function ProjectCard({ project, onHover, isHighlighted, isNeighbour }) {
  const [hovered, setHovered] = useState(false)

  function handleMouseEnter() {
    setHovered(true)
    onHover?.(project.slug)
  }
  function handleMouseLeave() {
    setHovered(false)
    onHover?.(null)
  }

  const dimmed = isHighlighted === false && !hovered

  return (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: hovered ? 1.02 : 1,
        opacity: dimmed ? 0.45 : 1,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ zIndex: hovered ? 10 : 1, position: 'relative' }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="block h-full"
        style={{ textDecoration: 'none' }}
      >
        <div
          className="h-full flex flex-col p-4 rounded-md transition-all duration-200"
          style={{
            background: 'var(--color-surface)',
            border: hovered || isNeighbour
              ? '1px solid rgba(0,229,199,0.5)'
              : '1px solid var(--color-border)',
            boxShadow: hovered
              ? '0 0 20px rgba(0,229,199,0.12), inset 0 0 20px rgba(0,229,199,0.04)'
              : isNeighbour
              ? '0 0 10px rgba(0,229,199,0.07)'
              : 'none',
            minHeight: '180px',
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between mb-2 gap-2">
            <StatusBadge status={project.status} />
            <span
              className="text-xs shrink-0"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontSize: '0.6rem' }}
            >
              {project.year}
            </span>
          </div>

          {/* Org tag */}
          <p
            className="text-xs mb-1.5"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontSize: '0.65rem' }}
          >
            {project.org}
          </p>

          {/* Project name */}
          <h3
            className="font-bold leading-snug mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              fontSize: '0.95rem',
            }}
          >
            {project.name}
          </h3>

          {/* Impact line */}
          <p
            className="text-xs leading-relaxed line-clamp-2 flex-1 mb-3"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
          >
            {project.recruiterView}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-1 mt-auto">
            {project.stack.slice(0, 2).map(tool => (
              <Pill key={tool} variant="default">{tool}</Pill>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
