import { useRef, useState, useEffect, useCallback } from 'react'
import SectionTitle from '../SectionTitle.jsx'
import ProjectCard from './ProjectCard.jsx'
import { featuredProjects } from '../../data/portfolioData.js'

function useCardCenters(gridRef, projects) {
  const [centers, setCenters] = useState({})

  const measure = useCallback(() => {
    if (!gridRef.current) return
    const gridRect = gridRef.current.getBoundingClientRect()
    const newCenters = {}
    projects.forEach(p => {
      const el = gridRef.current.querySelector(`[data-slug="${p.slug}"]`)
      if (!el) return
      const r = el.getBoundingClientRect()
      newCenters[p.slug] = {
        x: r.left - gridRect.left + r.width / 2,
        y: r.top - gridRect.top + r.height / 2,
      }
    })
    setCenters(newCenters)
  }, [gridRef, projects])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (gridRef.current) ro.observe(gridRef.current)
    return () => ro.disconnect()
  }, [measure])

  return centers
}

function TraceOverlay({ centers, connections, hoveredSlug }) {
  const edges = []
  const seen = new Set()
  connections.forEach(([a, b]) => {
    const key = [a, b].sort().join('--')
    if (!seen.has(key) && centers[a] && centers[b]) {
      seen.add(key)
      edges.push({ a, b, key })
    }
  })

  return (
    <svg
      className="absolute inset-0 pointer-events-none w-full h-full"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="trace-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {edges.map(({ a, b, key }) => {
        const isActive = hoveredSlug === a || hoveredSlug === b
        const opacity = hoveredSlug === null ? 0.3 : isActive ? 1 : 0.1

        return (
          <line
            key={key}
            x1={centers[a].x}
            y1={centers[a].y}
            x2={centers[b].x}
            y2={centers[b].y}
            stroke="var(--color-primary)"
            strokeWidth={isActive ? 1.5 : 0.8}
            strokeDasharray={isActive ? 'none' : '4 4'}
            opacity={opacity}
            filter={isActive ? 'url(#trace-glow)' : 'none'}
            style={{ transition: 'opacity 0.25s, stroke-width 0.25s' }}
          />
        )
      })}
    </svg>
  )
}

export default function ProjectGrid() {
  const gridRef = useRef(null)
  const [hoveredSlug, setHoveredSlug] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const connections = []
  featuredProjects.forEach(p => {
    p.connections.forEach(c => connections.push([p.slug, c]))
  })

  const centers = useCardCenters(gridRef, featuredProjects)

  const neighbourSet = new Set()
  if (hoveredSlug) {
    connections.forEach(([a, b]) => {
      if (a === hoveredSlug) neighbourSet.add(b)
      if (b === hoveredSlug) neighbourSet.add(a)
    })
  }

  return (
    <section
      style={{ background: 'var(--color-bg)', padding: '80px 0' }}
      aria-label="Featured projects"
    >
      <div id="projects" style={{ scrollMarginTop: '80px' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle eyebrow="Featured Work" title="Projects" />

        <div ref={gridRef} className="relative">
          {!isMobile && Object.keys(centers).length > 0 && (
            <TraceOverlay
              centers={centers}
              connections={connections}
              hoveredSlug={hoveredSlug}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProjects.map(project => {
              const isHighlighted =
                hoveredSlug === null
                  ? null
                  : hoveredSlug === project.slug || neighbourSet.has(project.slug)
                  ? true
                  : false

              return (
                <div key={project.slug} data-slug={project.slug}>
                  <ProjectCard
                    project={project}
                    onHover={setHoveredSlug}
                    isHighlighted={isHighlighted}
                    isNeighbour={neighbourSet.has(project.slug)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
