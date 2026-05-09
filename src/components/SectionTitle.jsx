export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3"
           style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
          // {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-base max-w-2xl" style={{ color: 'var(--color-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
