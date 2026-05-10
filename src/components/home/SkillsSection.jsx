import { motion } from 'framer-motion'
import SectionTitle from '../SectionTitle.jsx'
import { skills } from '../../data/portfolioData.js'

const GROUPS = [
  { key: 'power', label: 'Power Electronics' },
  { key: 'pcb', label: 'PCB & Signal Integrity' },
  { key: 'battery', label: 'Battery & BMS' },
  { key: 'tools', label: 'Tools & Software' },
  { key: 'instruments', label: 'Test Equipment' },
]

function SkillPill({ label }) {
  return (
    <motion.span
      className="inline-block text-xs px-2.5 py-1 rounded-sm cursor-default transition-all duration-200"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        border: '1px solid var(--color-border)',
        color: 'var(--color-muted)',
        background: 'transparent',
      }}
      whileHover={{
        color: 'var(--color-bg)',
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
        scale: 1.03,
      }}
      transition={{ duration: 0.15 }}
    >
      {label}
    </motion.span>
  )
}

export default function SkillsSection() {
  return (
    <section
      className="grid-backdrop"
      style={{
        background: 'transparent',
        padding: '80px 0 100px',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Skills"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle eyebrow="Expertise" title="Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GROUPS.slice(0, 3).map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <h3
                className="font-bold text-base mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text)',
                }}
              >
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(skills[group.key] || []).map(s => (
                  <SkillPill key={s} label={s} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {GROUPS.slice(3).map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <h3
                className="font-bold text-base mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text)',
                }}
              >
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(skills[group.key] || []).map(s => (
                  <SkillPill key={s} label={s} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
