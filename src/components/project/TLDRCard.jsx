export default function TLDRCard({ project }) {
  const { recruiterView, deepDive, impact } = project

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderLeft: '4px solid var(--color-primary)',
        borderRadius: '0.75rem',
        padding: '2rem',
      }}
    >
      {/* Eyebrow */}
      <p
        className="mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-primary)',
          letterSpacing: '0.1em',
        }}
      >
        // TL;DR
      </p>

      {/* Summary paragraph */}
      <p
        className="mb-5 leading-relaxed"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          color: 'var(--color-text)',
          lineHeight: 1.7,
        }}
      >
        {recruiterView}
      </p>

      {/* Deep dive bullets */}
      {deepDive && deepDive.length > 0 && (
        <ul className="mb-6 space-y-2">
          {deepDive.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                  fontSize: '0.75rem',
                  marginTop: '0.1em',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                →
              </span>
              <span style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Impact chip */}
      {impact && (
        <div className="flex">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
              paddingTop: '0.35rem',
              paddingBottom: '0.35rem',
              borderRadius: '0.375rem',
              background: 'rgba(240,165,0,0.12)',
              border: '1px solid rgba(240,165,0,0.3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--color-accent)',
              letterSpacing: '0.03em',
            }}
          >
            <span style={{ opacity: 0.6 }}>Impact:</span>
            <span className="font-bold">{impact}</span>
          </span>
        </div>
      )}
    </div>
  )
}
