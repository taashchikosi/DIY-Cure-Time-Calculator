const BASE_URL = 'https://diycuretimecalculator.com'

function fahrenheitToCelsius(f: number): number {
  return Math.round((f - 32) * 5 / 9)
}

function categorySlugFrom(category: string, sub: string | null): string {
  if (sub === 'PVA' || sub === 'aliphatic_resin') return 'wood-glue'
  if (sub === 'epoxy') return 'epoxy'
  if (category === 'sealant') return 'silicone-caulk'
  if (category === 'concrete') return 'concrete'
  return 'construction-adhesive'
}

function categoryLabelFrom(category: string, sub: string | null): string {
  if (sub === 'PVA' || sub === 'aliphatic_resin') return 'Wood Glue'
  if (sub === 'epoxy') return 'Epoxy'
  if (category === 'sealant') return 'Caulk & Sealant'
  if (category === 'concrete') return 'Concrete & Mortar'
  return 'Construction Adhesive'
}

function humidityAnswerText(behaviour: string, name: string): string {
  switch (behaviour) {
    case 'negative':
      return `Yes. ${name} cures by water evaporation, so high humidity slows cure. Above 85% RH cure may fail entirely. Low humidity (below 40% RH) speeds drying but can cause the adhesive to dry before a proper bond forms. Optimal range is 40–60% RH.`
    case 'positive':
      return `Yes. ${name} needs atmospheric moisture to trigger its cure reaction. Below 30% RH curing will stall. Above 80% RH premature surface skinning can prevent interior cure. Optimal range is 40–70% RH.`
    case 'bell_curve':
      return `Yes. ${name} has an optimal humidity range of 30–65% RH. Below 30% RH curing will stall. Above 70% RH the surface may skin over while the interior remains uncured, producing a weak bond.`
    case 'neutral':
      return `Minimal effect. ${name} is a two-part chemical reaction so ambient humidity has little influence on cure rate. Temperature is the primary variable — use the calculator above for adjusted estimates.`
    case 'hydration':
      return `Critical, but in the opposite way to most adhesives. ${name} requires water for the hydration reaction. Letting the surface dry out before 7-day curing completes causes premature strength loss. Keep the surface damp and protected from drying conditions.`
    default:
      return `Humidity can affect ${name} cure time. Use the calculator above for a condition-specific estimate.`
  }
}

export interface ProductForSD {
  product_name: string
  manufacturer: string
  slug: string
  category: string
  sub_category: string | null
  full_cure_hours: unknown
  min_application_temp_f: number
  max_application_temp_f: number | null
  open_time_min: number | null
  clamp_time_min: number | null
  humidity_behaviour: string
  mfft_celsius: unknown
  amine_blush_risk: boolean
  structural_liability: boolean
  silicone_bell_curve: boolean
}

export function productPageSD(product: ProductForSD) {
  const fullCureH = Number(product.full_cure_hours)
  const minTempF = product.min_application_temp_f
  const minTempC = fahrenheitToCelsius(minTempF)
  const catSlug = categorySlugFrom(product.category, product.sub_category)
  const catLabel = categoryLabelFrom(product.category, product.sub_category)
  const url = `${BASE_URL}/${product.slug}`

  const faqs: Array<{ q: string; a: string }> = [
    {
      q: `How long does ${product.product_name} take to cure?`,
      a: `${product.product_name} fully cures in ${fullCureH} hours at standard laboratory conditions (70°F / 21°C and 50% relative humidity). At colder temperatures or higher humidity, cure time increases significantly. Use the calculator on this page for a precise estimate at your conditions.`,
    },
    {
      q: `What is the minimum temperature to use ${product.product_name}?`,
      a: `The minimum application temperature for ${product.product_name} is ${minTempF}°F (${minTempC}°C). Applying below this threshold will prevent proper curing and the bond or seal will fail.`,
    },
    {
      q: `How long does ${product.product_name} take to cure in cold weather?`,
      a: `Cold temperatures significantly extend cure time. For every 18°F (10°C) below 70°F, cure time approximately doubles. A product that takes 24 hours at 70°F (21°C) can take over 48 hours at 50°F (10°C). Enter your temperature in the calculator above for a precise estimate.`,
    },
    {
      q: `Does humidity affect ${product.product_name} cure time?`,
      a: humidityAnswerText(product.humidity_behaviour, product.product_name),
    },
  ]

  if (product.clamp_time_min != null) {
    faqs.push({
      q: `How long do you need to clamp ${product.product_name}?`,
      a: `${product.product_name} requires a minimum of ${product.clamp_time_min} minutes of clamping at 70°F / 50% RH. In cold or humid conditions, extend clamp time before moving the assembly.`,
    })
  }

  if (product.open_time_min != null) {
    faqs.push({
      q: `What is the open time for ${product.product_name}?`,
      a: `${product.product_name} has a working (open) time of ${product.open_time_min} minutes at 70°F and 50% RH. At lower temperatures open time extends; at higher temperatures it may shorten. Complete assembly before this window closes.`,
    })
  }

  if (product.amine_blush_risk) {
    faqs.push({
      q: `Does ${product.product_name} get amine blush?`,
      a: `Yes. Amine blush is a waxy surface film that forms when this epoxy cures above 70% RH or when the substrate surface is near the dew point. It appears as a greasy or cloudy layer that prevents adhesion of subsequent coats. Remove by washing with warm water and light abrasion before re-coating.`,
    })
  }

  if (product.mfft_celsius != null) {
    const mfftC = Number(product.mfft_celsius)
    const mfftF = Math.round(mfftC * 9 / 5 + 32)
    faqs.push({
      q: `What happens if I use ${product.product_name} below ${mfftF}°F?`,
      a: `${product.product_name} has a Minimum Film-Forming Temperature (MFFT) of ${mfftC}°C (${mfftF}°F). Below this temperature the polymer particles cannot coalesce and the adhesive dries powdery with near-zero bond strength. Heat the workspace above ${mfftF}°F before applying.`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${url}#calculator`,
        name: `${product.product_name} Cure Time Calculator`,
        url,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: `Calculate ${product.product_name} cure time adjusted for your actual temperature and humidity. Uses Q10 temperature scaling with material-specific humidity logic and safety guardrails.`,
        creator: { '@type': 'Organization', name: 'DIY Cure Time Calculator', url: BASE_URL },
      },
      {
        '@type': 'Product',
        '@id': `${url}#product`,
        name: product.product_name,
        brand: { '@type': 'Brand', name: product.manufacturer },
        url,
        category: catLabel,
        description: `${product.product_name} by ${product.manufacturer}. Full cure: ${fullCureH}h at 70°F / 50% RH. Min application temp: ${minTempF}°F.`,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: catLabel, item: `${BASE_URL}/category/${catSlug}` },
          { '@type': 'ListItem', position: 3, name: product.product_name, item: url },
        ],
      },
    ],
  }
}

export function useCaseSD(
  product: ProductForSD,
  substrateLabel: string,
  substrateKey: string,
  prepTips: string[]
) {
  const url = `${BASE_URL}/${product.slug}/on-${substrateKey}`
  const catSlug = categorySlugFrom(product.category, product.sub_category)
  const catLabel = categoryLabelFrom(product.category, product.sub_category)
  const fullCureH = Number(product.full_cure_hours)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        '@id': `${url}#howto`,
        name: `How to Apply ${product.product_name} on ${substrateLabel}`,
        description: `Surface preparation guide for applying ${product.product_name} on ${substrateLabel}, with cure time calculator.`,
        step: prepTips.map((tip, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          text: tip,
        })),
        tool: [{ '@type': 'HowToTool', name: product.product_name }],
        supply: [{ '@type': 'HowToSupply', name: substrateLabel }],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `How long does ${product.product_name} take to cure on ${substrateLabel}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${product.product_name} takes ${fullCureH} hours to fully cure on ${substrateLabel} at 70°F and 50% RH. Temperature and humidity significantly affect this — use the calculator on this page for an adjusted estimate at your actual conditions.`,
            },
          },
          {
            '@type': 'Question',
            name: `How do I prepare ${substrateLabel} before applying ${product.product_name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: prepTips.slice(0, 2).join(' '),
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: catLabel, item: `${BASE_URL}/category/${catSlug}` },
          { '@type': 'ListItem', position: 3, name: product.product_name, item: `${BASE_URL}/${product.slug}` },
          { '@type': 'ListItem', position: 4, name: `on ${substrateLabel}`, item: url },
        ],
      },
    ],
  }
}

export function compareSD(
  p1: { product_name: string; manufacturer: string; slug: string; full_cure_hours: unknown },
  p2: { product_name: string; manufacturer: string; slug: string; full_cure_hours: unknown },
  comparison: string
) {
  const url = `${BASE_URL}/compare/${comparison}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${url}#calculator`,
        name: `${p1.product_name} vs ${p2.product_name} — Cure Time Comparison`,
        url,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: `Compare ${p1.product_name} and ${p2.product_name} cure times at your actual temperature and humidity.`,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Which cures faster: ${p1.product_name} or ${p2.product_name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `At standard conditions (70°F / 50% RH), ${p1.product_name} takes ${Number(p1.full_cure_hours)} hours and ${p2.product_name} takes ${Number(p2.full_cure_hours)} hours to fully cure. In your actual conditions they may differ significantly — use the comparison calculator above for a specific estimate.`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the difference between ${p1.product_name} and ${p2.product_name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${p1.product_name} by ${p1.manufacturer} and ${p2.product_name} by ${p2.manufacturer} differ in baseline cure time, application temperature range, and environmental sensitivity. The full side-by-side specification table is on this page.`,
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: `${BASE_URL}/compare` },
          { '@type': 'ListItem', position: 3, name: `${p1.product_name} vs ${p2.product_name}`, item: url },
        ],
      },
    ],
  }
}

export function categorySD(label: string, slug: string, description: string) {
  const url = `${BASE_URL}/category/${slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': url,
        name: `${label} Cure Time Calculator`,
        description,
        url,
        isPartOf: { '@type': 'WebSite', name: 'DIY Cure Time Calculator', url: BASE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: label, item: url },
        ],
      },
    ],
  }
}
