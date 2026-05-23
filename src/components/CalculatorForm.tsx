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
  productSlug: string
}

export default function CalculatorForm({ productSlug }: Props) {
  const [tempF, setTempF] = useState<number>(70)
  const [humidity, setHumidity] = useState<number>(50)
  const [surfaceTempF, setSurfaceTempF] = useState<string>('')
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)

    const body: Record<string, unknown> = {
      product_slug: productSlug,
      temp_fahrenheit: tempF,
      humidity_rh: humidity,
    }
    if (surfaceTempF.trim() !== '') {
      body.surface_temp_fahrenheit = Number(surfaceTempF)
    }

    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? 'Something went wrong. Please try again.')
      } else {
        setResult(data as CalculatorResult)
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
    if (m === 0) return `${h}h`
    return `${h}h ${m}m`
  }

  function formatHoursFull(hours: number): string {
    if (hours < 1) return `${Math.round(hours * 60)} minutes`
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    if (m === 0) return `${h} hour${h !== 1 ? 's' : ''}`
    return `${h} hour${h !== 1 ? 's' : ''} ${m} min`
  }

  const warningBg: Record<Warning['level'], string> = {
    red:   'rgba(220,38,38,0.12)',
    amber: 'rgba(217,119,6,0.12)',
    info:  'rgba(59,130,246,0.12)',
  }
  const warningBorder: Record<Warning['level'], string> = {
    red:   '#7f1d1d',
    amber: '#78350f',
    info:  '#1e3a5f',
  }
  const warningText: Record<Warning['level'], string> = {
    red:   '#fca5a5',
    amber: '#fcd34d',
    info:  '#93c5fd',
  }
  const warningIcons: Record<Warning['level'], string> = {
    red: '⛔', amber: '⚠️', info: 'ℹ️',
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-main)' }}>
      {/* Header bar */}
      <div
        className="px-5 py-3"
        style={{
          background: 'linear-gradient(90deg, var(--gold-dim) 0%, #3a2010 100%)',
          borderBottom: '1px solid var(--border-main)',
        }}
      >
        <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--gold-bright)' }}>
          Estimate Cure Time
        </h2>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)' }}>
        <form onSubmit={handleSubmit} className="p-5 space-y-6">

          {/* Temperature slider */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--cream-muted)' }}>
                Air Temperature
              </label>
              <span className="text-2xl font-black" style={{ color: 'var(--gold-bright)' }}>
                {tempF}°F
              </span>
            </div>
            <input
              type="range"
              className="temp-slider"
              min="10"
              max="120"
              step="1"
              value={tempF}
              onChange={(e) => setTempF(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--cream-dim)' }}>
              <span>10°F</span>
              <span>120°F</span>
            </div>
          </div>

          {/* Humidity slider */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--cream-muted)' }}>
                Relative Humidity
              </label>
              <span className="text-2xl font-black" style={{ color: 'var(--gold-bright)' }}>
                {humidity}%
              </span>
            </div>
            <input
              type="range"
              className="humidity-slider"
              min="0"
              max="100"
              step="1"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--cream-dim)' }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Surface temp (optional) */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: 'var(--cream-muted)' }}>
              Surface Temperature °F{' '}
              <span className="font-normal normal-case tracking-normal text-xs" style={{ color: 'var(--cream-dim)' }}>
                (optional — improves epoxy accuracy)
              </span>
            </label>
            <input
              type="number"
              min="-40"
              max="150"
              step="1"
              value={surfaceTempF}
              onChange={(e) => setSurfaceTempF(e.target.value)}
              placeholder="e.g. 65"
              className="w-full rounded-md px-3 py-2 text-sm"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-main)',
                color: 'var(--cream)',
                outline: 'none',
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md py-3 text-sm font-bold uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: loading ? 'var(--gold-dim)' : 'linear-gradient(135deg, var(--gold) 0%, #a06518 100%)',
              color: 'var(--bg-main)',
            }}
          >
            {loading ? 'Calculating…' : 'Calculate Cure Time'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div
            className="mx-5 mb-5 rounded-md px-4 py-3 text-sm"
            style={{ backgroundColor: 'rgba(220,38,38,0.1)', border: '1px solid #7f1d1d', color: '#fca5a5' }}
          >
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="px-5 pb-5 space-y-4">
            {result.can_apply ? (
              <div
                className="rounded-xl p-5 text-center"
                style={{
                  background: 'linear-gradient(135deg, #1c1a08 0%, var(--bg-elevated) 100%)',
                  border: '1px solid var(--border-main)',
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--cream-muted)' }}>
                  Estimated Full Cure
                </p>
                <p className="text-5xl font-black mb-1" style={{ color: 'var(--gold-bright)' }}>
                  {formatHours(result.adjusted_cure_hours)}
                </p>
                <p className="text-sm" style={{ color: 'var(--cream-muted)' }}>
                  {formatHoursFull(result.adjusted_cure_hours)} at {tempF}°F / {humidity}% RH
                </p>
                {result.cure_factor !== 1 && (
                  <p className="text-xs mt-2" style={{ color: 'var(--cream-dim)' }}>
                    {result.cure_factor > 1
                      ? `${result.cure_factor.toFixed(1)}× slower than lab conditions`
                      : `${(1 / result.cure_factor).toFixed(1)}× faster than lab conditions`}
                  </p>
                )}
              </div>
            ) : (
              <div
                className="rounded-xl px-5 py-4"
                style={{ backgroundColor: 'rgba(220,38,38,0.1)', border: '1px solid #7f1d1d' }}
              >
                <p className="font-bold text-sm" style={{ color: '#fca5a5' }}>
                  ⛔ Application not recommended under these conditions — see warnings below.
                </p>
              </div>
            )}

            {result.warnings.length > 0 && (
              <div className="space-y-2">
                {result.warnings.map((w, i) => (
                  <div
                    key={i}
                    className="rounded-md px-4 py-3 text-sm"
                    style={{
                      backgroundColor: warningBg[w.level],
                      border: `1px solid ${warningBorder[w.level]}`,
                      color: warningText[w.level],
                    }}
                  >
                    <span className="mr-2">{warningIcons[w.level]}</span>
                    {w.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
