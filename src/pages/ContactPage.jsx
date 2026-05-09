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
      <div className="mb-8">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          I'm {profile.name}, a Senior R&D Hardware Electronics Engineer based in {profile.location}.
          The best way to reach me is via email or LinkedIn. I respond within 48 hours.
        </p>
      </div>
      <ContactLinks vertical />
    </div>
  )
}
