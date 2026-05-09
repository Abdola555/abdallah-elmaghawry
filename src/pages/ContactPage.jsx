import SectionTitle from '../components/SectionTitle.jsx'
import ContactLinks from '../components/contact/ContactLinks.jsx'
import { profile } from '../data/portfolioData.js'

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <SectionTitle
        eyebrow="Contact"
        title="Let's Connect"
        subtitle="Open to power electronics discussions, EV/BMS collaboration, research partnerships, and hiring enquiries."
      />
      <div className="mb-8 space-y-3">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          I'm {profile.name} — Senior Hardware Engineer based in {profile.location}, specializing in
          power electronics and battery systems. My work spans SMPS design, magnetics, EMI/EMC,
          and full hardware validation cycles including factory qualification in China.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          I'm particularly interested in electric vehicles, battery management systems, and advanced
          power conversion — and open to collaboration in both industry and research.
          The best way to reach me is via email or LinkedIn. I respond within 48 hours.
        </p>
      </div>
      <ContactLinks vertical />
    </div>
  )
}
