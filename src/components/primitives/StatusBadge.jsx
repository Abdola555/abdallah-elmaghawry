export default function StatusBadge({ status }) {
  const isShipped = status === 'Shipped'

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-sm"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.05em',
        border: isShipped
          ? '1px solid rgba(74,222,128,0.3)'
          : '1px solid rgba(240,165,0,0.3)',
        color: isShipped ? '#4ade80' : 'var(--color-accent)',
        background: isShipped
          ? 'rgba(74,222,128,0.07)'
          : 'rgba(240,165,0,0.07)',
      }}
    >
      <span
        className="block w-1.5 h-1.5 rounded-full"
        style={{
          background: isShipped ? '#4ade80' : 'var(--color-accent)',
          boxShadow: isShipped
            ? '0 0 4px #4ade80'
            : '0 0 4px var(--color-accent)',
        }}
      />
      {status}
    </span>
  )
}
