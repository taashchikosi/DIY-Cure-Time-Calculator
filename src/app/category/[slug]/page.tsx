import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import Disclaimer from '@/components/Disclaimer'

export const revalidate = 86400

const VALID_CATEGORIES: Record<string, string> = {
  'wood-glue': 'Wood Glue',
  epoxy: 'Epoxy',
  'silicone-caulk': 'Silicone Caulk',
  'construction-adhesive': 'Construction Adhesive',
  concrete: 'Concrete & Mortar',
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'wood-glue':
    'PVA, polyurethane, and aliphatic wood glues — how temperature and humidity affect cure time and bond strength.',
  epoxy:
    'Two-part structural and laminating epoxies — amine blush risks, Q10 scaling, and pot-life at your conditions.',
  'silicone-caulk':
    'Acetoxy and neutral-cure silicone sealants — skinning risk, optimal humidity range, and cure depth rates.',
  'construction-adhesive':
    'Solvent-based and hybrid construction adhesives — application limits, flash-off time, and full cure duration.',
  concrete:
    'Portland cement, mortar, and concrete mixes — hydration curing, minimum curing periods, and temperature effects.',
}

// DB category format uses underscores; URL slugs use hyphens
function slugToDbCategory(slug: string): string {
  return slug.replace(/-/g, '_')
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = VALID_CATEGORIES[slug]

  if (!label) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${label} Cure Time Calculator`,
    description: CATEGORY_DESCRIPTIONS[slug] ?? `Cure time calculators for ${label} products.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  if (!VALID_CATEGORIES[slug]) {
    notFound()
  }

  const label = VALID_CATEGORIES[slug]
  const description = CATEGORY_DESCRIPTIONS[slug]
  const dbCategory = slugToDbCategory(slug)

  let products: Array<{
    id: number
    slug: string
    product_name: string
    manufacturer: string
    full_cure_hours: unknown
    min_application_temp_f: number
    max_application_temp_f: number
    sub_category: string | null
  }> = []

  try {
    products = await prisma.product.findMany({
      where: { category: dbCategory, verified_by_human: true },
      select: {
        id: true,
        slug: true,
        product_name: true,
        manufacturer: true,
        full_cure_hours: true,
        min_application_temp_f: true,
        max_application_temp_f: true,
        sub_category: true,
      },
      orderBy: { product_name: 'asc' },
    })
  } catch {
    // DB not available during build — show empty state
    products = []
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-zinc-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-zinc-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-700">{label}</li>
        </ol>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
        {label} Cure Time Calculator
      </h1>
      <p className="text-sm text-zinc-600 max-w-2xl mb-8">{description}</p>

      {products.length === 0 ? (
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 text-sm text-zinc-600">
          <p className="font-medium text-zinc-800 mb-1">No products yet</p>
          <p>
            We&apos;re currently verifying manufacturer data for {label} products. Individual product
            pages will appear here once they&apos;ve passed our review process.
          </p>
          <p className="mt-3">
            Know a product we should cover?{' '}
            <Link href="/contact" className="text-zinc-900 underline">
              Suggest it
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/${p.slug}`}
              className="block border border-zinc-200 rounded-lg p-4 hover:border-zinc-400 hover:shadow-sm transition-all"
            >
              <h2 className="font-semibold text-zinc-900 mb-0.5 text-sm leading-snug">
                {p.product_name}
              </h2>
              <p className="text-xs text-zinc-500 mb-3">
                {p.manufacturer}
                {p.sub_category ? ` · ${p.sub_category}` : ''}
              </p>
              <div className="flex gap-4 text-xs text-zinc-600">
                <span>Full cure: {Number(p.full_cure_hours)}h</span>
                <span>
                  {p.min_application_temp_f}–{p.max_application_temp_f}°F
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  )
}
