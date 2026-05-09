import SectionTitle from '../components/SectionTitle.jsx'
import { journeyHighlights, experienceTimeline } from '../data/portfolioData.js'
import { GraduationCap, Award, Globe } from 'lucide-react'

export default function JourneyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-14">
      <SectionTitle eyebrow="My Journey" title="8 Years in Hardware" subtitle="From robotics competitions to YC-backed startups — the arc of an engineer." />

      {/* Experience */}
      <section>
        <p className="text-xs font-mono mb-6" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>// experience</p>
        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-px" style={{ backgroundColor: 'var(--color-border)' }} />
          <div className="space-y-8 pl-10">
            {experienceTimeline.map((job, i) => (
              <article key={i} className="relative">
                <div className="absolute -left-8 top-1.5 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                <p className="text-xs font-mono mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>{job.period}</p>
                <h3 className="font-bold mb-0.5" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>{job.role}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--color-muted)' }}>{job.company} · {job.location}</p>
                <ul className="space-y-1.5">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                      <span style={{ color: 'var(--color-primary)' }}>→</span>{b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <p className="text-xs font-mono mb-6" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>// education</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {journeyHighlights.education.map((edu, i) => (
            <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <GraduationCap size={18} className="mb-3" style={{ color: 'var(--color-primary)' }} />
              <h4 className="font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>{edu.degree}</h4>
              <p className="text-sm mb-1" style={{ color: 'var(--color-muted)' }}>{edu.institution}</p>
              <p className="text-xs font-mono" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>{edu.period}</p>
              <p className="text-sm mt-2" style={{ color: 'var(--color-text)' }}>{edu.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <p className="text-xs font-mono mb-6" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>// certifications</p>
        <div className="space-y-3">
          {journeyHighlights.certifications.map((cert, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <Award size={16} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{cert.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{cert.issuer} · {cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section>
        <p className="text-xs font-mono mb-6" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>// courses</p>
        <div className="flex flex-wrap gap-2">
          {journeyHighlights.courses.map((c, i) => (
            <span key={i} className="text-sm px-3 py-1.5 rounded-full" style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)', backgroundColor: 'var(--color-surface)' }}>
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section>
        <p className="text-xs font-mono mb-6" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>// languages</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {journeyHighlights.languages.map((l, i) => (
            <div key={i} className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <Globe size={16} className="mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{l.lang}</p>
              <p className="text-xs font-mono" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>{l.level}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
