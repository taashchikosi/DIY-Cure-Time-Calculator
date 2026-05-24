export type HumidityBehaviour = 'negative' | 'positive' | 'bell_curve' | 'neutral' | 'hydration'

export interface ProductData {
  full_cure_hours: number
  humidity_behaviour: HumidityBehaviour
  temp_doubling_celsius: number
  min_application_temp_f: number
  max_application_temp_f: number | null
  mfft_celsius?: number | null
  amine_blush_risk: boolean
  dew_point_warning: boolean
  silicone_bell_curve: boolean
  structural_liability: boolean
  sub_category?: string | null
  category: string
}

export interface CalculatorInput {
  temp_fahrenheit: number
  humidity_rh: number
  surface_temp_fahrenheit?: number
}

export interface Warning {
  level: 'red' | 'amber' | 'info'
  message: string
}

export interface CalculatorResult {
  adjusted_cure_hours: number
  cure_factor: number
  warnings: Warning[]
  can_apply: boolean
}

const BASELINE_TEMP_C = 21 // 70°F

function fahrenheitToCelsius(f: number): number {
  return (f - 32) * (5 / 9)
}

// Magnus-Tetens approximation for dew point
function dewPointCelsius(temp_c: number, rh: number): number {
  const a = 17.27
  const b = 237.7
  const alpha = (a * temp_c) / (b + temp_c) + Math.log(rh / 100)
  return (b * alpha) / (a - alpha)
}

// Q10 temperature adjustment — industry standard for DIY
export function applyTemperatureAdjustment(
  base_time: number,
  temp_fahrenheit: number,
  temp_doubling_celsius: number
): number {
  const actual_temp_c = fahrenheitToCelsius(temp_fahrenheit)
  return base_time * Math.pow(2, (BASELINE_TEMP_C - actual_temp_c) / temp_doubling_celsius)
}

// Material-specific humidity factor
export function getHumidityFactor(
  humidity_rh: number,
  behaviour: HumidityBehaviour
): { factor: number; warning: Warning | null } {
  switch (behaviour) {
    case 'negative': {
      // PVA wood glue, latex paint, acrylic caulk
      if (humidity_rh > 85) {
        return {
          factor: 1 + ((humidity_rh - 50) / 100) * 0.6,
          warning: {
            level: 'red',
            message: 'Do not apply — humidity above 85% may cause cure failure.',
          },
        }
      }
      if (humidity_rh > 60) {
        return { factor: 1 + ((humidity_rh - 50) / 100) * 0.6, warning: null }
      }
      return { factor: 1 + ((humidity_rh - 50) / 100) * 0.3, warning: null }
    }

    case 'positive': {
      // Polyurethane glue, CA glue, polyurethane caulk
      if (humidity_rh < 30) {
        return {
          factor: 1 - ((humidity_rh - 50) / 100) * 0.4,
          warning: {
            level: 'amber',
            message: 'Cure may stall without sufficient moisture. Consider misting the surfaces.',
          },
        }
      }
      if (humidity_rh > 80) {
        return {
          factor: 1 - ((humidity_rh - 50) / 100) * 0.4,
          warning: {
            level: 'amber',
            message: 'Risk of premature skinning at high humidity.',
          },
        }
      }
      return { factor: 1 - ((humidity_rh - 50) / 100) * 0.4, warning: null }
    }

    case 'bell_curve': {
      // Silicone caulk — optimal 40-60% RH
      if (humidity_rh < 30) {
        return {
          factor: 2.0,
          warning: { level: 'red', message: 'Cure will stall — humidity too low for silicone.' },
        }
      }
      if (humidity_rh <= 60) {
        return { factor: 1.0, warning: null }
      }
      if (humidity_rh > 70) {
        return {
          factor: 1.2,
          warning: {
            level: 'amber',
            message:
              'Skinning defect risk — surface may feel cured but interior bond will be weak.',
          },
        }
      }
      return { factor: 1.0, warning: null }
    }

    case 'neutral': {
      // Two-part epoxy (chemical reaction)
      return { factor: 1.0, warning: null }
    }

    case 'hydration': {
      // Concrete and mortar — humidity PREVENTS failure, not speeds cure
      if (humidity_rh < 80) {
        return {
          factor: 1.0,
          warning: {
            level: 'amber',
            message:
              'Keep surface damp for 7 days minimum. Low humidity causes premature drying, not faster curing.',
          },
        }
      }
      return { factor: 1.0, warning: null }
    }
  }
}

export function calculate(product: ProductData, input: CalculatorInput): CalculatorResult {
  const warnings: Warning[] = []
  let can_apply = true

  const temp_c = fahrenheitToCelsius(input.temp_fahrenheit)

  // Temperature application limits
  if (input.temp_fahrenheit < product.min_application_temp_f) {
    warnings.push({
      level: 'red',
      message: `Do not apply at this temperature. Minimum application temperature is ${product.min_application_temp_f}°F.`,
    })
    can_apply = false
  }

  if (product.max_application_temp_f != null && input.temp_fahrenheit > product.max_application_temp_f) {
    warnings.push({
      level: 'amber',
      message: `Flash-setting or pot-life reduction risk above ${product.max_application_temp_f}°F.`,
    })
  }

  // PVA / aliphatic resin chalking check — mfft_celsius set means product has a chalk temperature
  if (
    product.mfft_celsius != null &&
    temp_c < product.mfft_celsius
  ) {
    warnings.push({
      level: 'red',
      message: `Chalking risk: glue will dry powdery with near-zero strength. Heat workspace above ${product.mfft_celsius}°C (${Math.round(product.mfft_celsius * 9/5 + 32)}°F) before applying.`,
    })
    can_apply = false
  }

  // Epoxy amine blush check
  if (product.amine_blush_risk) {
    const surface_temp_c = input.surface_temp_fahrenheit
      ? fahrenheitToCelsius(input.surface_temp_fahrenheit)
      : temp_c
    const dew_point = dewPointCelsius(temp_c, input.humidity_rh)

    if (input.humidity_rh > 70 || surface_temp_c - dew_point < 2.8) {
      warnings.push({
        level: 'red',
        message:
          'Amine blush risk: surface will form waxy film that breaks adhesion. Apply heating or dehumidification first.',
      })
    }
  }

  // Silicone skinning check
  if (product.silicone_bell_curve && input.humidity_rh > 70) {
    warnings.push({
      level: 'amber',
      message:
        'Premature skin-over risk: surface may feel cured but interior bond will be weak.',
    })
  }

  // Structural liability disclaimer
  if (product.structural_liability) {
    warnings.push({
      level: 'info',
      message:
        'This tool estimates GENERAL cure guidance only. NOT valid for structural, load-bearing, or safety-critical applications. ACI standards require physical strength testing (compression cylinders) for structural decisions.',
    })
  }

  const temp_adjusted = applyTemperatureAdjustment(
    product.full_cure_hours,
    input.temp_fahrenheit,
    product.temp_doubling_celsius
  )

  const { factor: humidity_factor, warning: humidity_warning } = getHumidityFactor(
    input.humidity_rh,
    product.humidity_behaviour
  )

  if (humidity_warning) {
    warnings.push(humidity_warning)
  }

  const adjusted_cure_hours = temp_adjusted * humidity_factor

  return {
    adjusted_cure_hours,
    cure_factor: humidity_factor,
    warnings,
    can_apply,
  }
}
