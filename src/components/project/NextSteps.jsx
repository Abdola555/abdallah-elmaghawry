export default function NextSteps({ nextSteps }) {
  if (!nextSteps || nextSteps.length === 0) return null

  return (
    <section>
      <p
        className="mb-5"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-primary)',
          letterSpacing: '0.1em',
        }}
      >
        // next steps
      </p>

      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
        }}
      >
        <ol className="space-y-3">
          {nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-primary)',
                  minWidth: '1.5rem',
                  flexShrink: 0,
                  paddingTop: '0.1em',
                  letterSpacing: '0.05em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.6,
                }}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
