export default function Disclaimer() {
  return (
    <div
      className="rounded-md px-4 py-3 text-sm my-4"
      style={{
        backgroundColor: 'rgba(200, 137, 42, 0.08)',
        border: '1px solid var(--gold-dim)',
        color: 'var(--cream-muted)',
      }}
    >
      <strong style={{ color: 'var(--gold-bright)' }}>Important:</strong> Results are estimates
      only. Always follow manufacturer instructions. Not suitable for structural, load-bearing, or
      safety-critical applications.
    </div>
  )
}
