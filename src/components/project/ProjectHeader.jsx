import { Link } from 'react-router'
import { motion } from 'framer-motion'
import StatusBadge from '../primitives/StatusBadge.jsx'

export default function ProjectHeader({ project }) {
  return (
    <motion.div
      layoutId={`project-card-${project.slug}`}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid rgba(0,229,199,0.25)',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: '3px',
          background: 'linear-gradient(90deg, var(--color-primary), transparent)',
        }}
      />

      <div className="p-8 md:p-12">
        {/* Back nav */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-muted)',
            textDecoration: 'none',
            marginBottom: '2rem',
            letterSpacing: '0.05em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
        >
          <span>←</span>
          <span>PROJECTS</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
          {/* Left: identity */}
          <div className="flex-1 min-w-0">
            {/* Org */}
            <p
              className="mb-2 tracking-widest uppercase"
              style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-primary)',
                letterSpacing: '0.2em',
              }}
            >
              {project.org}
            </p>

            {/* Project name */}
            <h1
              className="font-bold leading-tight mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                color: 'var(--color-text)',
                lineHeight: 1.1,
              }}
            >
              {project.name}
            </h1>

            {/* Status + year row */}
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={project.status} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.08em',
                }}
              >
                {project.year}
              </span>
            </div>
          </div>

          {/* Right: impact statement */}
          {project.impact && (
            <div
              className="md:w-64 lg:w-72 shrink-0"
              style={{
                borderLeft: '1px solid var(--color-border)',
                paddingLeft: '1.5rem',
              }}
            >
              <p
                className="mb-2"
                style={{
                  fontSize: '0.6rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                // Impact
              </p>
              <p
                className="font-bold leading-snug"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  color: 'var(--color-accent)',
                  lineHeight: 1.2,
                }}
              >
                {project.impact}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
