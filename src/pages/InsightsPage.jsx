import SectionTitle from '../components/SectionTitle.jsx'
import { insights } from '../data/portfolioData.js'

export default function InsightsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <SectionTitle eyebrow="Engineering Insights" title="From the Bench" subtitle="Technical perspectives on hardware design, testing, and systems thinking." />
      <div className="space-y-8">
        {insights.map((insight, i) => (
          <article
            key={i}
            className="rounded-xl p-6"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {insight.tags.map(tag => (
                <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ backgroundColor: 'rgba(0,229,199,0.1)', color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
                  {tag}
                </span>
              ))}
              <span className="text-xs ml-auto" style={{ color: 'var(--color-muted)' }}>{insight.date}</span>
            </div>
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
              {insight.title}
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>{insight.body}</p>
            <ul className="space-y-2">
              {insight.points.map((pt, j) => (
                <li key={j} className="flex gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                  <span style={{ color: 'var(--color-primary)' }}>→</span>
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
