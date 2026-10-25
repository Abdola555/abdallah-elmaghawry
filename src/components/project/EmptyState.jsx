export default function EmptyState({ label }) {
  return (
    <div
      className="rounded-xl p-8 text-center"
      style={{
        border: '1px dashed var(--color-border)',
        backgroundColor: 'rgba(17,24,39,0.5)',
      }}
    >
      <p
        className="text-xs mb-2"
        style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}
      >
        // PENDING
      </p>
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
        {label} — more detail coming as the project matures.
      </p>
    </div>
  )
}
