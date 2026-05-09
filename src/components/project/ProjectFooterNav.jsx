import { Link } from 'react-router'
import { featuredProjects } from '../../data/portfolioData.js'

function NavCard({ project, direction }) {
  const isNext = direction === 'next'

  return (
    <Link
      to={`/projects/${project.slug}`}
      style={{ textDecoration: 'none', display: 'block', flex: 1 }}
    >
      <div
        className="h-full transition-all duration-200"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '0.75rem',
          padding: '1.25rem 1.5rem',
          textAlign: isNext ? 'right' : 'left',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(0,229,199,0.4)'
          e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,199,0.08)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--color-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
          }}
        >
          {isNext ? 'Next →' : '← Previous'}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            lineHeight: 1.3,
          }}
        >
          {project.name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--color-primary)',
            marginTop: '0.3rem',
          }}
        >
          {project.org}
        </p>
      </div>
    </Link>
  )
}

export default function ProjectFooterNav({ currentSlug }) {
  const currentIndex = featuredProjects.findIndex(p => p.slug === currentSlug)
  const prev = currentIndex > 0 ? featuredProjects[currentIndex - 1] : null
  const next = currentIndex < featuredProjects.length - 1 ? featuredProjects[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <nav aria-label="Project navigation">
      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'var(--color-border)',
          marginBottom: '2rem',
        }}
      />

      <div className="flex gap-4 flex-col sm:flex-row">
        {prev ? (
          <NavCard project={prev} direction="prev" />
        ) : (
          <div style={{ flex: 1 }} />
        )}
        {next && <NavCard project={next} direction="next" />}
      </div>
    </nav>
  )
}
