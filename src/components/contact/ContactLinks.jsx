import { Mail, Linkedin, Github, Phone } from 'lucide-react'
import { contactChannels } from '../../data/portfolioData.js'

const ICONS = { mail: Mail, linkedin: Linkedin, github: Github, phone: Phone }

export default function ContactLinks({ vertical = false }) {
  return (
    <div className={vertical ? 'flex flex-col gap-4' : 'flex flex-wrap gap-3'}>
      {contactChannels.map(ch => {
        const Icon = ICONS[ch.icon]
        return (
          <a
            key={ch.icon}
            href={ch.href}
            target={ch.icon !== 'mail' && ch.icon !== 'phone' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group"
            style={{
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              textDecoration: 'none',
            }}
          >
            <Icon size={16} style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm">{ch.value}</span>
          </a>
        )
      })}
    </div>
  )
}
