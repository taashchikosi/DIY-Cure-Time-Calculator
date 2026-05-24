import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import Disclaimer from '@/components/Disclaimer'
import ProductImage from '@/components/ProductImage'

export const revalidate = 86400

const VALID_CATEGORIES: Record<string, string> = {
  'wood-glue':              'Wood Glue',
  epoxy:                    'Epoxy',
  'silicone-caulk':         'Caulk & Sealant',
  'construction-adhesive':  'Construction Adhesive',
  concrete:                 'Concrete & Mortar',
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'wood-glue':
    'PVA, polyurethane, and aliphatic wood glues — how temperature and humidity affect cure time and bond strength.',
  epoxy:
    'Two-part structural and laminating epoxies — amine blush risks, Q10 scaling, and pot-life at your conditions.',
  'silicone-caulk':
    'Silicone and acrylic latex sealants — skinning risk, optimal humidity range, and cure depth rates.',
  'construction-adhesive':
    'Solvent-based and hybrid construction adhesives — application limits, flash-off time, and full cure duration.',
  concrete:
    'Portland cement, mortar, and concrete mixes — hydration curing, minimum curing periods, and temperature effects.',
}

type DbWhere = {
  category: string
  sub_category?: { in: string[] } | string | { not: string }
}

const CATEGORY_DB_WHERE: Record<string, DbWhere> = {
  'wood-glue':             { category: 'adhesive', sub_category: { in: ['PVA', 'aliphatic_resin'] } },
  epoxy:                   { category: 'adhesive', sub_category: 'epoxy' },
  'silicone-caulk':        { category: 'sealant' },
  'construction-adhesive': {
    category: 'adhesive',
    sub_category: { in: ['polyurethane', 'PVA_construction', 'contact_cement', 'synthetic_rubber', 'acrylic_latex', 'cyanoacrylate'] },
  },
  concrete: { category: 'concrete' },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = VALID_CATEGORIES[slug]
  if (!label) return { title: 'Category Not Found' }
  return {
    title: `${label} Cure Time Calculator`,
    description: CATEGORY_DESCRIPTIONS[slug] ?? `Cure time calculators for ${label} products.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  if (!VALID_CATEGORIES[slug]) notFound()

  const label = VALID_CATEGORIES[slug]
  const description = CATEGORY_DESCRIPTIONS[slug]
  const dbWhere = CATEGORY_DB_WHERE[slug]

  let products: Array<{
    id: number
    slug: string
    product_name: string
    manufacturer: string
    full_cure_hours: unknown
    min_application_temp_f: number
    max_application_temp_f: number | null
    sub_category: string | null
    product_image_url: string | null
  }> = []

  try {
    products = await prisma.product.findMany({
      where: { ...dbWhere },
      select: {
        id: true, slug: true, product_name: true, manufacturer: true,
        full_cure_hours: true, min_application_temp_f: true,
        max_application_temp_f: true, sub_category: true,
        product_image_url: true,
      },
      orderBy: { product_name: 'asc' },
    })
  } catch {
    products = []
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">

      {/* Breadcrumb */}
      <nav className="text-xs mb-6" aria-label="Breadcrumb" style={{ color: 'var(--cream-muted)' }}>
        <ol className="flex flex-wrap gap-1">
          <li><Link href="/" className="hover:text-[--cream] transition-colors">Home</Link></li>
          <li aria-hidden="true" style={{ color: 'var(--cream-dim)' }}>/</li>
          <li style={{ color: 'var(--cream)' }}>{label}</li>
        </ol>
      </nav>

      <span className="tag-badge mb-4 inline-block">Material Category</span>
      <h1 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight" style={{ color: 'var(--cream)' }}>
        {label} Cure Time Calculator
      </h1>
      <p className="text-sm max-w-2xl mb-8 leading-relaxed" style={{ color: 'var(--cream-muted)' }}>
        {description}
      </p>

      {products.length === 0 ? (
        <div className="rounded-lg p-6 text-sm" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)', color: 'var(--cream-muted)' }}>
          <p className="font-semibold mb-1" style={{ color: 'var(--cream)' }}>No products yet</p>
          <p>
            We&apos;re currently verifying manufacturer data for {label} products. Individual product
            pages will appear here once they&apos;ve passed our review process.
          </p>
          <p className="mt-3">
            Know a product we should cover?{' '}
            <Link href="/contact" className="underline hover:text-[--gold-bright] transition-colors" style={{ color: 'var(--gold)' }}>
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
              className="card-hover group rounded-lg p-4 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
            >
              <ProductImage
                imageUrl={p.product_image_url}
                productName={p.product_name}
                category={dbWhere.category}
                subCategory={p.sub_category}
                size="sm"
              />
              <h2 className="font-semibold text-sm leading-snug mb-0.5 mt-3 group-hover:text-[--gold-bright] transition-colors" style={{ color: 'var(--cream)' }}>
                {p.product_name}
              </h2>
              <p className="text-xs mb-3" style={{ color: 'var(--cream-muted)' }}>
                {p.manufacturer}
                {p.sub_category ? ` · ${p.sub_category.replace(/_/g, ' ')}` : ''}
              </p>
              <div className="flex gap-4 text-xs" style={{ color: 'var(--cream-muted)' }}>
                <span style={{ color: 'var(--gold)' }}>Full cure: {Number(p.full_cure_hours)}h</span>
                <span>{p.min_application_temp_f}{p.max_application_temp_f != null ? `–${p.max_application_temp_f}` : '+'}°F</span>
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
