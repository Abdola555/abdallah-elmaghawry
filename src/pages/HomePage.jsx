import Hero from '../components/home/Hero.jsx'
import ScrollTimeline from '../components/home/ScrollTimeline.jsx'
import ProjectGrid from '../components/home/ProjectGrid.jsx'
import SkillsSection from '../components/home/SkillsSection.jsx'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ScrollTimeline />
      <ProjectGrid />
      <SkillsSection />
    </main>
  )
}
