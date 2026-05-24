'use client'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-4xl mb-6">⚠️</div>
      <h1 className="text-xl font-bold mb-3" style={{ color: 'var(--cream)' }}>
        Something went wrong
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--cream-muted)' }}>
        We hit an unexpected error. This has been logged and will be looked into.
        {error.digest && (
          <span style={{ color: 'var(--cream-dim)' }}> (ref: {error.digest})</span>
        )}
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 rounded text-sm font-bold uppercase tracking-widest"
        style={{ backgroundColor: 'var(--gold)', color: 'var(--bg-main)' }}
      >
        Try again
      </button>
    </div>
  )
}
