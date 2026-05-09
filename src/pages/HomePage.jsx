import Hero from '../components/home/Hero.jsx'
import WhatIBuild from '../components/home/WhatIBuild.jsx'
import ProjectGrid from '../components/home/ProjectGrid.jsx'
import CareerArc from '../components/home/CareerArc.jsx'
import EducationStrip from '../components/home/EducationStrip.jsx'
import SkillsSection from '../components/home/SkillsSection.jsx'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhatIBuild />
      <ProjectGrid />
      <CareerArc />
      <EducationStrip />
      <SkillsSection />
    </main>
  )
}
