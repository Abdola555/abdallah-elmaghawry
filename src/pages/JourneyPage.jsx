import SectionTitle from '../components/SectionTitle.jsx'
import {
  journeyHighlights,
  workExperience,
  freelanceExperience,
  industrialTraining,
  competitionsAndVolunteer,
} from '../data/portfolioData.js'
import { GraduationCap, Award, Globe, Briefcase, Wrench, Trophy, Code2 } from 'lucide-react'

function ExperienceBlock({ jobs, accent = 'var(--color-primary)' }) {
  return (
    <div className="relative">
      <div className="absolute left-2 top-0 bottom-0 w-px" style={{ backgroundColor: 'var(--color-border)' }} />
      <div className="space-y-8 pl-10">
        {jobs.map((job, i) => (
          <article key={i} className="relative">
            <div
              className="absolute -left-8 top-1.5 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="text-xs font-mono" style={{ color: accent, fontFamily: 'var(--font-mono)' }}>
                {job.period}
              </p>
              {job.type && (
                <span
                  className="text-xs font-mono px-1.5 py-0.5 rounded"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: accent,
                    backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                  }}
                >
                  {job.type}
                </span>
              )}
            </div>
            <h3
              className="font-bold mb-0.5"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              {job.role}
            </h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-muted)' }}>
              {job.company} · {job.location}
            </p>
            <ul className="space-y-1.5">
              {job.bullets.map((b, j) => (
                <li key={j} className="flex gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                  <span style={{ color: accent }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ icon: Icon, label, accent = 'var(--color-primary)' }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Icon size={14} style={{ color: accent }} />
      <p className="text-xs font-mono tracking-widest uppercase" style={{ color: accent, fontFamily: 'var(--font-mono)' }}>
        {label}
      </p>
    </div>
  )
}

export default function JourneyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <SectionTitle
        eyebrow="My Journey"
        title="4+ Years in Professional R&D"
        subtitle="From university robotics competitions to leading BMS and SMPS development at a YC-backed startup."
      />

      {/* ── Education (prominent, leads the page) ── */}
      <section>
        <SectionLabel icon={GraduationCap} label="Education" />
        <div className="grid gap-4 sm:grid-cols-2">
          {journeyHighlights.education.map((edu, i) => (
            <div
              key={i}
              className="p-5 rounded-xl relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              {/* Subtle glow accent on the featured (first) card */}
              {i === 0 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(0,229,199,0.06) 0%, transparent 60%)' }}
                />
              )}
              <GraduationCap size={18} className="mb-3" style={{ color: 'var(--color-primary)' }} />
              <h4 className="font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                {edu.degree}
              </h4>
              <p className="text-sm mb-1" style={{ color: 'var(--color-muted)' }}>{edu.institution}</p>
              <p className="text-xs font-mono mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
                {edu.period}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>{edu.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Full-time R&D ── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Briefcase size={14} style={{ color: 'var(--color-primary)' }} />
            <p className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
              Work Experience
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1 rounded"
            style={{ backgroundColor: 'rgba(0,229,199,0.07)', border: '1px solid var(--color-border)' }}
          >
            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
              4+
            </span>
            <span className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
              years professional R&amp;D
            </span>
          </div>
        </div>
        <ExperienceBlock jobs={workExperience} accent="var(--color-primary)" />
      </section>

      {/* ── Freelance ── */}
      <section>
        <SectionLabel icon={Code2} label="Freelance" accent="var(--color-accent)" />
        <ExperienceBlock jobs={freelanceExperience} accent="var(--color-accent)" />
      </section>

      {/* ── Competitions ── */}
      <section>
        <SectionLabel icon={Trophy} label="Competitions & Volunteer" accent="#a78bfa" />
        <ExperienceBlock jobs={competitionsAndVolunteer} accent="#a78bfa" />
      </section>

      {/* ── Industrial Training ── */}
      <section>
        <SectionLabel icon={Wrench} label="Industrial Training" accent="var(--color-muted)" />
        <ExperienceBlock jobs={industrialTraining} accent="var(--color-muted)" />
      </section>

      {/* ── Certifications ── */}
      <section>
        <SectionLabel icon={Award} label="Certifications" />
        <div className="space-y-3">
          {journeyHighlights.certifications.map((cert, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-lg"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <Award size={16} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{cert.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{cert.issuer} · {cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Courses ── */}
      <section>
        <SectionLabel icon={Award} label="Courses" />
        <div className="flex flex-wrap gap-2">
          {journeyHighlights.courses.map((c, i) => (
            <span
              key={i}
              className="text-sm px-3 py-1.5 rounded-full"
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-muted)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ── Languages ── */}
      <section>
        <SectionLabel icon={Globe} label="Languages" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {journeyHighlights.languages.map((l, i) => (
            <div
              key={i}
              className="p-3 rounded-lg text-center"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <Globe size={16} className="mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{l.lang}</p>
              <p
                className="text-xs font-mono"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {l.level}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
