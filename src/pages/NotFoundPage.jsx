import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl font-mono mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>404</p>
      <p className="text-xs font-mono mb-8" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
        // open trace — signal not found
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded text-sm font-medium transition-colors"
        style={{ backgroundColor: 'var(--color-primary)', color: '#0A0E1A', textDecoration: 'none' }}
      >
        ← Back to home
      </Link>
    </div>
  )
}
