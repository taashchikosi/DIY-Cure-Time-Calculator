'use client'

import { useState } from 'react'

interface Warning {
  level: 'red' | 'amber' | 'info'
  message: string
}

interface CalculatorResult {
  adjusted_cure_hours: number
  cure_factor: number
  warnings: Warning[]
  can_apply: boolean
}

interface Props {
  slug1: string
  name1: string
  slug2: string
  name2: string
}

export default function CompareCalculatorForm({ slug1, name1, slug2, name2 }: Props) {
  const [tempF, setTempF] = useState<number>(70)
  const [humidity, setHumidity] = useState<number>(50)
  const [result1, setResult1] = useState<CalculatorResult | null>(null)
  const [result2, setResult2] = useState<CalculatorResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult1(null)
    setResult2(null)
    setLoading(true)

    try {
      const [r1, r2] = await Promise.all([
        fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_slug: slug1, temp_fahrenheit: tempF, humidity_rh: humidity }),
        }),
        fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_slug: slug2, temp_fahrenheit: tempF, humidity_rh: humidity }),
        }),
      ])

      const [d1, d2] = await Promise.all([r1.json(), r2.json()])

      if (!r1.ok || !r2.ok) {
        setError((!r1.ok ? d1?.error : d2?.error) ?? 'Something went wrong. Please try again.')
      } else {
        setResult1(d1 as CalculatorResult)
        setResult2(d2 as CalculatorResult)
      }
    } catch {
      setError('Network error — please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function formatHours(hours: number): string {
    if (hours < 1) return `${Math.round(hours * 60)} min`
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return m === 0 ? `${h}h` : `${h}h ${m}m`
  }

  const warningBg: Record<Warning['level'], string> = {
    red: 'rgba(220,38,38,0.12)', amber: 'rgba(217,119,6,0.12)', info: 'rgba(59,130,246,0.12)',
  }
  const warningBorder: Record<Warning['level'], string> = {
    red: '#7f1d1d', amber: '#78350f', info: '#1e3a5f',
  }
  const warningText: Record<Warning['level'], string> = {
    red: '#fca5a5', amber: '#fcd34d', info: '#93c5fd',
  }
  const warningIcons: Record<Warning['level'], string> = { red: '⛔', amber: '⚠️', info: 'ℹ️' }

  const faster = result1 && result2
    ? result1.adjusted_cure_hours < result2.adjusted_cure_hours ? 1 : result2.adjusted_cure_hours < result1.adjusted_cure_hours ? 2 : 0
    : 0

  function ResultPanel({ result, name, isFaster }: { result: CalculatorResult | null; name: string; isFaster: boolean }) {
    return (
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider mb-2 truncate" style={{ color: 'var(--cream-muted)' }}>
          {name}
        </p>
        {result ? (
          <div className="space-y-2">
            <div
              className="rounded-xl p-4 text-center relative"
              style={{
                background: isFaster
                  ? 'linear-gradient(135deg, #1c2a08 0%, var(--bg-elevated) 100%)'
                  : 'linear-gradient(135deg, #1c1a08 0%, var(--bg-elevated) 100%)',
                border: `1px solid ${isFaster ? '#4a7018' : 'var(--border-main)'}`,
              }}
            >
              {isFaster && (
                <span
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded"
                  style={{ backgroundColor: '#166534', color: '#86efac', border: '1px solid #166534' }}
                >
                  FASTER
                </span>
              )}
              {result.can_apply ? (
                <>
                  <p className="text-3xl font-black" style={{ color: isFaster ? '#86efac' : 'var(--gold-bright)' }}>
                    {formatHours(result.adjusted_cure_hours)}
                  </p>
                  {result.cure_factor !== 1 && (
                    <p className="text-xs mt-1" style={{ color: 'var(--cream-dim)' }}>
                      {result.cure_factor > 1 ? `${result.cure_factor.toFixed(1)}× slower` : `${(1 / result.cure_factor).toFixed(1)}× faster`} than lab
                    </p>
                  )}
                </>
              ) : (
                <p className="text-xs font-bold" style={{ color: '#fca5a5' }}>⛔ Not recommended</p>
              )}
            </div>
            {result.warnings.length > 0 && (
              <div className="space-y-1">
                {result.warnings.map((w, i) => (
                  <div
                    key={i}
                    className="rounded px-3 py-2 text-xs"
                    style={{ backgroundColor: warningBg[w.level], border: `1px solid ${warningBorder[w.level]}`, color: warningText[w.level] }}
                  >
                    <span className="mr-1">{warningIcons[w.level]}</span>
                    {w.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className="rounded-xl p-4 text-center h-20 flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-dim)' }}
          >
            <p className="text-xs" style={{ color: 'var(--cream-dim)' }}>—</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-main)' }}>
      <div
        className="px-5 py-3"
        style={{
          background: 'linear-gradient(90deg, var(--gold-dim) 0%, #3a2010 100%)',
          borderBottom: '1px solid var(--border-main)',
        }}
      >
        <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--gold-bright)' }}>
          Compare at Your Conditions
        </h2>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)' }}>
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--cream-muted)' }}>
                Air Temperature
              </label>
              <span className="text-2xl font-black" style={{ color: 'var(--gold-bright)' }}>{tempF}°F</span>
            </div>
            <input
              id="compare-temp"
              type="range" className="temp-slider" min="10" max="120" step="1"
              value={tempF}
              aria-label="Air temperature in Fahrenheit"
              aria-valuetext={`${tempF} degrees Fahrenheit`}
              onChange={(e) => setTempF(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--cream-dim)' }}>
              <span>10°F</span><span>120°F</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--cream-muted)' }}>
                Relative Humidity
              </label>
              <span className="text-2xl font-black" style={{ color: 'var(--gold-bright)' }}>{humidity}%</span>
            </div>
            <input
              id="compare-humidity"
              type="range" className="humidity-slider" min="0" max="100" step="1"
              value={humidity}
              aria-label="Relative humidity percentage"
              aria-valuetext={`${humidity} percent`}
              onChange={(e) => setHumidity(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--cream-dim)' }}>
              <span>0%</span><span>100%</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md py-3 text-sm font-bold uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: loading ? 'var(--gold-dim)' : 'linear-gradient(135deg, var(--gold) 0%, #a06518 100%)',
              color: 'var(--bg-main)',
            }}
          >
            {loading ? 'Calculating…' : 'Compare Cure Times'}
          </button>
        </form>

        {error && (
          <div className="mx-5 mb-5 rounded-md px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.1)', border: '1px solid #7f1d1d', color: '#fca5a5' }}>
            {error}
          </div>
        )}

        {(result1 || result2) && (
          <div className="px-5 pb-5">
            <div className="flex gap-4">
              <ResultPanel result={result1} name={name1} isFaster={faster === 1} />
              <div className="flex items-center justify-center shrink-0 self-start mt-8">
                <span className="text-lg font-black" style={{ color: 'var(--cream-dim)' }}>vs</span>
              </div>
              <ResultPanel result={result2} name={name2} isFaster={faster === 2} />
            </div>
            {faster !== 0 && result1 && result2 && (
              <p className="text-xs text-center mt-4" style={{ color: 'var(--cream-dim)' }}>
                {faster === 1 ? name1 : name2} cures{' '}
                <strong style={{ color: 'var(--gold)' }}>
                  {Math.abs(result1.adjusted_cure_hours - result2.adjusted_cure_hours).toFixed(1)}h sooner
                </strong>{' '}
                at {tempF}°F / {humidity}% RH
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
