import EmptyState from './EmptyState.jsx'

export default function Gallery({ gallery }) {
  return (
    <section>
      <p
        className="mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-primary)',
          letterSpacing: '0.1em',
        }}
      >
        // photos &amp; renders
      </p>

      {!gallery || gallery.length === 0 ? (
        <EmptyState label="Photos / renders" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gallery.map((item, i) => (
            <figure key={i} className="m-0">
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  aspectRatio: '16 / 9',
                }}
              >
                <img
                  src={item.src}
                  alt={item.caption || `Gallery image ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              {item.caption && (
                <figcaption
                  className="mt-2 text-center"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-muted)',
                  }}
                >
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}
