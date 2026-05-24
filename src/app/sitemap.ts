import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

const BASE_URL = 'https://diycuretimecalculator.com'

const staticPages: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/disclosure`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/category/wood-glue`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/category/epoxy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/category/silicone-caulk`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/category/construction-adhesive`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/category/concrete`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
]

const SUBSTRATES_BY_CATEGORY: Record<string, string[]> = {
  PVA:                ['oak', 'pine', 'mdf', 'plywood', 'bamboo'],
  aliphatic_resin:    ['oak', 'pine', 'mdf', 'plywood', 'bamboo'],
  epoxy:              ['metal', 'concrete', 'glass', 'ceramic', 'plastic', 'oak', 'pine', 'stone', 'tile'],
  sealant:            ['tile', 'glass', 'ceramic', 'drywall', 'metal', 'concrete', 'brick', 'stone'],
  polyurethane:       ['concrete', 'brick', 'metal', 'drywall', 'foam', 'oak', 'pine', 'plywood'],
  PVA_construction:   ['concrete', 'brick', 'drywall', 'plywood'],
  contact_cement:     ['plastic', 'metal', 'plywood', 'mdf', 'foam'],
  synthetic_rubber:   ['concrete', 'brick', 'metal', 'drywall', 'foam'],
  acrylic_latex:      ['concrete', 'drywall', 'brick', 'metal'],
  cyanoacrylate:      ['metal', 'glass', 'ceramic', 'plastic', 'stone'],
  concrete:           ['concrete'],
}

function getSubstrates(subCategory: string | null, category: string): string[] {
  if (subCategory && SUBSTRATES_BY_CATEGORY[subCategory]) return SUBSTRATES_BY_CATEGORY[subCategory]
  if (category === 'sealant') return SUBSTRATES_BY_CATEGORY.sealant
  if (category === 'concrete') return SUBSTRATES_BY_CATEGORY.concrete
  return ['concrete', 'metal', 'drywall']
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productPages: MetadataRoute.Sitemap = []
  let comparePages: MetadataRoute.Sitemap = []
  let useCasePages: MetadataRoute.Sitemap = []

  try {
    const products = await prisma.product.findMany({
      where: { verified_by_human: true },
      select: { slug: true, updated_at: true, category: true, sub_category: true },
    })

    productPages = products.map((p) => ({
      url: `${BASE_URL}/${p.slug}`,
      lastModified: p.updated_at,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Compare pages: all same-category pairs
    for (let i = 0; i < products.length; i++) {
      for (let j = i + 1; j < products.length; j++) {
        const a = products[i]
        const b = products[j]
        if (a.category !== b.category) continue
        comparePages.push({
          url: `${BASE_URL}/compare/${a.slug}-vs-${b.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.5,
        })
      }
    }

    // Use-case pages: product × relevant substrates
    useCasePages = products.flatMap((p) =>
      getSubstrates(p.sub_category, p.category).map((substrate) => ({
        url: `${BASE_URL}/${p.slug}/on-${substrate}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    )
  } catch {
    // DB unavailable — return static pages only
  }

  return [...staticPages, ...productPages, ...comparePages, ...useCasePages]
}
