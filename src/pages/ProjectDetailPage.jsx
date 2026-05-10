import { useParams, Link } from 'react-router'
import { featuredProjects } from '../data/portfolioData.js'
import ProjectHeader from '../components/project/ProjectHeader.jsx'
import TLDRCard from '../components/project/TLDRCard.jsx'
import TopologyDiagram from '../components/project/TopologyDiagram.jsx'
import StackPills from '../components/project/StackPills.jsx'
import LessonsBlock from '../components/project/LessonsBlock.jsx'
import Gallery from '../components/project/Gallery.jsx'
import NextSteps from '../components/project/NextSteps.jsx'
import ProjectFooterNav from '../components/project/ProjectFooterNav.jsx'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = featuredProjects.find(p => p.slug === slug)

  if (!project) return <NotFoundContent slug={slug} />

  return (
    <article className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <ProjectHeader project={project} />
      <TLDRCard project={project} />
      <TopologyDiagram topology={project.topology} />
      <StackPills stack={project.stack} />
      <LessonsBlock lessons={project.lessons} />
      <Gallery gallery={project.gallery} />
      <NextSteps nextSteps={project.nextSteps} />
      <ProjectFooterNav currentSlug={project.slug} />
    </article>
  )
}

function NotFoundContent({ slug }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-center">
      <p
        className="mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--color-accent)',
          letterSpacing: '0.1em',
        }}
      >
        // 404: project &quot;{slug}&quot; not found
      </p>
      <Link
        to="/"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--color-primary)',
          textDecoration: 'none',
        }}
      >
        ← Back to projects
      </Link>
    </div>
  )
}
