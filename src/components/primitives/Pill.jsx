export default function Pill({ children, variant = 'default', className = '' }) {
  const variants = {
    default: {
      border: '1px solid var(--color-border)',
      color: 'var(--color-muted)',
      background: 'transparent',
    },
    cyan: {
      border: '1px solid rgba(0,229,199,0.4)',
      color: 'var(--color-primary)',
      background: 'rgba(0,229,199,0.08)',
    },
    amber: {
      border: '1px solid rgba(240,165,0,0.4)',
      color: 'var(--color-accent)',
      background: 'rgba(240,165,0,0.08)',
    },
  }

  const style = variants[variant] || variants.default

  return (
    <span
      className={`inline-block text-xs px-2 py-0.5 rounded-sm font-mono tracking-wide ${className}`}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        ...style,
      }}
    >
      {children}
    </span>
  )
}
