import { Mail, Linkedin, Github } from 'lucide-react'
import { profile } from '../data/portfolioData.js'

export default function Footer() {
  return (
    <footer
      className="mt-auto py-10 px-6"
      style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
            Abdallah El-Maghawry
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
            Power Electronics · BMS · Alexandria, Egypt
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--color-muted)' }} className="hover:text-[var(--color-primary)] transition-colors">
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" style={{ color: 'var(--color-muted)' }} className="hover:text-[var(--color-primary)] transition-colors">
            <Mail size={18} />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--color-muted)' }} className="hover:text-[var(--color-primary)] transition-colors">
            <Github size={18} />
          </a>
        </div>
        <p className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
