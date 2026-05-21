import {
  calculate,
  applyTemperatureAdjustment,
  getHumidityFactor,
  ProductData,
  CalculatorInput,
} from './calculator'

const basePVA: ProductData = {
  full_cure_hours: 24,
  humidity_behaviour: 'negative',
  temp_doubling_celsius: 10,
  min_application_temp_f: 47,
  max_application_temp_f: 110,
  mfft_celsius: 7.2,
  amine_blush_risk: false,
  dew_point_warning: false,
  silicone_bell_curve: false,
  structural_liability: false,
  sub_category: 'PVA',
  category: 'wood_glue',
}

const baseEpoxy: ProductData = {
  full_cure_hours: 4,
  humidity_behaviour: 'neutral',
  temp_doubling_celsius: 10,
  min_application_temp_f: 35,
  max_application_temp_f: 120,
  amine_blush_risk: true,
  dew_point_warning: true,
  silicone_bell_curve: false,
  structural_liability: false,
  category: 'epoxy',
}

const baseSilicone: ProductData = {
  full_cure_hours: 24,
  humidity_behaviour: 'bell_curve',
  temp_doubling_celsius: 10,
  min_application_temp_f: 40,
  max_application_temp_f: 120,
  amine_blush_risk: false,
  dew_point_warning: false,
  silicone_bell_curve: true,
  structural_liability: false,
  category: 'caulk',
  sub_category: 'silicone',
}

const baseConcrete: ProductData = {
  full_cure_hours: 168, // 7 days
  humidity_behaviour: 'hydration',
  temp_doubling_celsius: 10,
  min_application_temp_f: 32,
  max_application_temp_f: 100,
  amine_blush_risk: false,
  dew_point_warning: false,
  silicone_bell_curve: false,
  structural_liability: true,
  category: 'concrete',
}

describe('applyTemperatureAdjustment', () => {
  it('returns base time at baseline temp (70°F / ~21°C)', () => {
    // 70°F = 21.11°C, very close to 21°C baseline — expect within 0.5hr
    const result = applyTemperatureAdjustment(24, 70, 10)
    expect(result).toBeCloseTo(24, 0)
  })

  it('doubles cure time at 50°F (10°C) with default Q10=10', () => {
    // Titebond III example from plan: 24hr × 2^((21-10)/10) = ~51.8hrs
    const result = applyTemperatureAdjustment(24, 50, 10)
    expect(result).toBeCloseTo(51.8, 0)
  })

  it('halves cure time at 87.8°F (31°C = baseline + Q10)', () => {
    // At baseline(21°C) + Q10(10°C) = 31°C = 87.8°F, rate doubles so time halves
    const result = applyTemperatureAdjustment(24, 87.8, 10)
    expect(result).toBeCloseTo(12, 0)
  })
})

describe('getHumidityFactor — negative branch (PVA/latex)', () => {
  it('returns ~1.0 factor at 50% RH (baseline)', () => {
    const { factor } = getHumidityFactor(50, 'negative')
    expect(factor).toBeCloseTo(1.0, 2)
  })

  it('returns increased factor at 70% RH', () => {
    const { factor } = getHumidityFactor(70, 'negative')
    expect(factor).toBeGreaterThan(1.0)
  })

  it('returns red warning above 85% RH', () => {
    const { warning } = getHumidityFactor(90, 'negative')
    expect(warning?.level).toBe('red')
  })
})

describe('getHumidityFactor — positive branch (CA/polyurethane)', () => {
  it('warns at low humidity (<30% RH)', () => {
    const { warning } = getHumidityFactor(20, 'positive')
    expect(warning?.level).toBe('amber')
  })

  it('warns at high humidity (>80% RH)', () => {
    const { warning } = getHumidityFactor(85, 'positive')
    expect(warning?.level).toBe('amber')
  })

  it('returns reduced factor at 50% RH (humidity speeds cure)', () => {
    const { factor } = getHumidityFactor(50, 'positive')
    expect(factor).toBeLessThanOrEqual(1.0)
  })
})

describe('getHumidityFactor — bell_curve branch (silicone)', () => {
  it('returns factor 1.0 at optimal 50% RH', () => {
    const { factor, warning } = getHumidityFactor(50, 'bell_curve')
    expect(factor).toBe(1.0)
    expect(warning).toBeNull()
  })

  it('returns red warning below 30% RH', () => {
    const { warning } = getHumidityFactor(25, 'bell_curve')
    expect(warning?.level).toBe('red')
  })

  it('returns amber warning above 70% RH', () => {
    const { warning } = getHumidityFactor(75, 'bell_curve')
    expect(warning?.level).toBe('amber')
  })
})

describe('getHumidityFactor — neutral branch (epoxy)', () => {
  it('returns factor 1.0 at any RH', () => {
    expect(getHumidityFactor(20, 'neutral').factor).toBe(1.0)
    expect(getHumidityFactor(50, 'neutral').factor).toBe(1.0)
    expect(getHumidityFactor(90, 'neutral').factor).toBe(1.0)
  })
})

describe('getHumidityFactor — hydration branch (concrete)', () => {
  it('warns when RH < 80% (drying risk)', () => {
    const { warning } = getHumidityFactor(60, 'hydration')
    expect(warning?.level).toBe('amber')
    expect(warning?.message).toContain('damp')
  })

  it('no warning at adequate humidity', () => {
    const { warning } = getHumidityFactor(90, 'hydration')
    expect(warning).toBeNull()
  })
})

describe('calculate — safety guardrails', () => {
  it('blocks application below min temp', () => {
    const result = calculate(basePVA, { temp_fahrenheit: 40, humidity_rh: 50 })
    expect(result.can_apply).toBe(false)
    expect(result.warnings.some(w => w.level === 'red')).toBe(true)
  })

  it('warns above max temp', () => {
    const result = calculate(basePVA, { temp_fahrenheit: 115, humidity_rh: 50 })
    expect(result.warnings.some(w => w.level === 'amber')).toBe(true)
  })

  it('triggers PVA chalking warning below MFFT', () => {
    // 40°F = 4.4°C, which is below mfft_celsius of 7.2°C
    const result = calculate(basePVA, { temp_fahrenheit: 40, humidity_rh: 50 })
    expect(result.warnings.some(w => w.message.includes('Chalking'))).toBe(true)
  })

  it('triggers amine blush warning at high RH for epoxy', () => {
    const result = calculate(baseEpoxy, { temp_fahrenheit: 70, humidity_rh: 80 })
    expect(result.warnings.some(w => w.message.includes('blush'))).toBe(true)
  })

  it('triggers silicone skinning warning above 70% RH', () => {
    const result = calculate(baseSilicone, { temp_fahrenheit: 70, humidity_rh: 75 })
    expect(result.warnings.some(w => w.message.includes('skin'))).toBe(true)
  })

  it('shows structural disclaimer for concrete', () => {
    const result = calculate(baseConcrete, { temp_fahrenheit: 70, humidity_rh: 85 })
    expect(result.warnings.some(w => w.message.includes('structural'))).toBe(true)
  })

  it('warns concrete about low humidity', () => {
    const result = calculate(baseConcrete, { temp_fahrenheit: 70, humidity_rh: 60 })
    expect(result.warnings.some(w => w.message.includes('damp'))).toBe(true)
  })
})

describe('calculate — adjusted times', () => {
  it('returns longer cure time in cold weather', () => {
    const warm = calculate(basePVA, { temp_fahrenheit: 70, humidity_rh: 50 })
    const cold = calculate(basePVA, { temp_fahrenheit: 50, humidity_rh: 50 })
    expect(cold.adjusted_cure_hours).toBeGreaterThan(warm.adjusted_cure_hours)
  })

  it('returns longer cure time at high humidity for PVA', () => {
    const dry = calculate(basePVA, { temp_fahrenheit: 70, humidity_rh: 40 })
    const humid = calculate(basePVA, { temp_fahrenheit: 70, humidity_rh: 80 })
    expect(humid.adjusted_cure_hours).toBeGreaterThan(dry.adjusted_cure_hours)
  })
})
