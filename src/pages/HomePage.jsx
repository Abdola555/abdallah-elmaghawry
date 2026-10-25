import Hero from '../components/home/Hero.jsx'
import PCBTimeline from '../components/home/PCBTimeline.jsx'
import WhatIBuild from '../components/home/WhatIBuild.jsx'
import ProjectGrid from '../components/home/ProjectGrid.jsx'
import EducationStrip from '../components/home/EducationStrip.jsx'
import SkillsSection from '../components/home/SkillsSection.jsx'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PCBTimeline />
      <WhatIBuild />
      <ProjectGrid />
      <EducationStrip />
      <SkillsSection />
    </main>
  )
}
