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

const warningStyles: Record<Warning['level'], string> = {
  red: 'bg-red-50 border-red-400 text-red-900',
  amber: 'bg-amber-50 border-amber-400 text-amber-900',
  info: 'bg-blue-50 border-blue-400 text-blue-900',
}

const warningIcons: Record<Warning['level'], string> = {
  red: '⛔',
  amber: '⚠️',
  info: 'ℹ️',
}

export default function CalculatorForm({ productSlug }: Props) {
  const [tempF, setTempF] = useState<string>('70')
  const [humidity, setHumidity] = useState<string>('50')
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
      temp_fahrenheit: Number(tempF),
      humidity_rh: Number(humidity),
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
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`
    }
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    if (m === 0) return `${h} hour${h !== 1 ? 's' : ''}`
    return `${h} hour${h !== 1 ? 's' : ''} ${m} min`
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900 mb-4">Estimate Cure Time</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tempF" className="block text-sm font-medium text-zinc-700 mb-1">
            Air Temperature (°F)
          </label>
          <input
            id="tempF"
            type="number"
            min="-40"
            max="150"
            step="1"
            value={tempF}
            onChange={(e) => setTempF(e.target.value)}
            required
            className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="humidity" className="block text-sm font-medium text-zinc-700 mb-1">
            Relative Humidity (%)
          </label>
          <input
            id="humidity"
            type="number"
            min="0"
            max="100"
            step="1"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            required
            className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="surfaceTempF" className="block text-sm font-medium text-zinc-700 mb-1">
            Surface Temperature (°F){' '}
            <span className="font-normal text-zinc-400">(optional — improves epoxy accuracy)</span>
          </label>
          <input
            id="surfaceTempF"
            type="number"
            min="-40"
            max="150"
            step="1"
            value={surfaceTempF}
            onChange={(e) => setSurfaceTempF(e.target.value)}
            className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Calculating…' : 'Calculate Cure Time'}
        </button>
      </form>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-400 rounded-md px-4 py-3 text-sm text-red-900">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div
            className={`rounded-md border px-4 py-3 ${result.can_apply ? 'bg-green-50 border-green-400 text-green-900' : 'bg-red-50 border-red-400 text-red-900'}`}
          >
            {result.can_apply ? (
              <>
                <p className="font-semibold text-base">
                  Estimated full cure: {formatHours(result.adjusted_cure_hours)}
                </p>
                <p className="text-sm mt-1">
                  At {tempF}°F and {humidity}% RH
                </p>
              </>
            ) : (
              <p className="font-semibold text-base">
                Application not recommended under these conditions — see warnings below.
              </p>
            )}
          </div>

          {result.warnings.length > 0 && (
            <div className="space-y-2">
              {result.warnings.map((w, i) => (
                <div
                  key={i}
                  className={`border rounded-md px-4 py-3 text-sm ${warningStyles[w.level]}`}
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
  )
}
