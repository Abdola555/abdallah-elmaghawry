import { GraduationCap, Award } from 'lucide-react'
import { Link } from 'react-router'
import { journeyHighlights } from '../../data/portfolioData.js'

export default function EducationStrip() {
  return (
    <section
      style={{
        background: 'transparent',
        padding: '80px 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <GraduationCap size={14} style={{ color: 'var(--color-primary)' }} />
          <p
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}
          >
            // Education &amp; Credentials
          </p>
        </div>
        <Link
          to="/journey"
          className="text-xs font-mono transition-colors"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
        >
          full journey →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Degree cards */}
        {journeyHighlights.education.map((edu, i) => (
          <div
            key={i}
            className="p-4 rounded-xl flex flex-col gap-2"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <GraduationCap size={16} style={{ color: 'var(--color-primary)' }} />
            <p
              className="text-sm font-bold leading-snug"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              {edu.degree}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{edu.institution}</p>
            <p
              className="text-xs font-mono mt-auto"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}
            >
              {edu.period}
            </p>
            {edu.detail && (
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {edu.detail}
              </p>
            )}
          </div>
        ))}

        {/* Certification cards */}
        {journeyHighlights.certifications.map((cert, i) => (
          <div
            key={i}
            className="p-4 rounded-xl flex flex-col gap-2"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Award size={16} style={{ color: 'var(--color-accent)' }} />
            <p
              className="text-sm font-bold leading-snug"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              {cert.title}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{cert.issuer}</p>
            <p
              className="text-xs font-mono mt-auto"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
            >
              {cert.date}
            </p>
          </div>
        ))}
      </div>
    </div>
    </section>
  )
}
