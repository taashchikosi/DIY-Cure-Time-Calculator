import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import Disclaimer from '@/components/Disclaimer'
import CalculatorForm from '@/components/CalculatorForm'
import ProductImage from '@/components/ProductImage'

export const revalidate = 86400

const SUBSTRATES_BY_SUB_CATEGORY: Record<string, string[]> = {
  PVA:             ['oak', 'pine', 'mdf', 'plywood'],
  aliphatic_resin: ['oak', 'pine', 'mdf', 'plywood'],
  epoxy:           ['metal', 'concrete', 'glass', 'oak'],
  sealant:         ['tile', 'glass', 'drywall', 'metal'],
  polyurethane:    ['concrete', 'brick', 'drywall', 'metal'],
  cyanoacrylate:   ['metal', 'glass', 'ceramic', 'plastic'],
}
const SUBSTRATE_LABELS: Record<string, string> = {
  oak: 'Oak', pine: 'Pine', mdf: 'MDF', plywood: 'Plywood', metal: 'Metal',
  concrete: 'Concrete', glass: 'Glass', tile: 'Tile', drywall: 'Drywall',
  ceramic: 'Ceramic', plastic: 'Plastic', brick: 'Brick',
}

interface Props {
  params: Promise<{ 'product-slug': string }>
}

async function getProduct(slug: string) {
  try {
    return await prisma.product.findUnique({ where: { slug } })
  } catch {
    return null
  }
}

async function getSiblings(slug: string, category: string, subCategory: string | null) {
  try {
    return await prisma.product.findMany({
      where: {
        slug: { not: slug },
        category,
        ...(subCategory ? { sub_category: subCategory } : {}),
        verified_by_human: true,
      },
      select: { slug: true, product_name: true },
      take: 4,
    })
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'product-slug': slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.product_name} Cure Time Calculator`,
    description: `How long does ${product.product_name} by ${product.manufacturer} take to cure? Get an estimate adjusted for your temperature and humidity.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const { 'product-slug': slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const siblings = await getSiblings(slug, product.category, product.sub_category)

  const categoryLabel = product.category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c: string) => c.toUpperCase())

  const substrateLinks = (SUBSTRATES_BY_SUB_CATEGORY[product.sub_category ?? ''] ?? SUBSTRATES_BY_SUB_CATEGORY[product.category] ?? []).slice(0, 4)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">

      {/* Breadcrumb */}
      <nav className="text-xs mb-6" aria-label="Breadcrumb" style={{ color: 'var(--cream-muted)' }}>
        <ol className="flex flex-wrap gap-1">
          <li><a href="/" className="hover:text-[--cream] transition-colors">Home</a></li>
          <li aria-hidden="true" style={{ color: 'var(--cream-dim)' }}>/</li>
          <li>
            <a href={`/category/${product.category.replace(/_/g, '-')}`} className="hover:text-[--cream] transition-colors">
              {categoryLabel}
            </a>
          </li>
          <li aria-hidden="true" style={{ color: 'var(--cream-dim)' }}>/</li>
          <li style={{ color: 'var(--cream)' }}>{product.product_name}</li>
        </ol>
      </nav>

      {/* Product header */}
      <div className="mb-2">
        <span className="tag-badge mb-3 inline-block">{categoryLabel}</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-black mb-1 tracking-tight" style={{ color: 'var(--cream)' }}>
        {product.product_name}
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--cream-muted)' }}>
        {product.manufacturer}
        {product.sub_category ? ` · ${product.sub_category.replace(/_/g, ' ')}` : ''}
      </p>

      <div className="mb-8">
        <ProductImage
          imageUrl={product.product_image_url}
          productName={product.product_name}
          category={product.category}
          subCategory={product.sub_category}
          size="lg"
        />
      </div>

      {/* Key specs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Full cure (70°F / 50% RH)', value: `${Number(product.full_cure_hours)}h` },
          { label: 'Min application temp',       value: `${product.min_application_temp_f}°F` },
          ...(product.max_application_temp_f != null ? [{ label: 'Max application temp', value: `${product.max_application_temp_f}°F` }] : []),
          ...(product.clamp_time_min    != null ? [{ label: 'Clamp time',    value: `${product.clamp_time_min} min` }]    : []),
          ...(product.open_time_min     != null ? [{ label: 'Open time',     value: `${product.open_time_min} min` }]     : []),
          ...(product.dry_to_touch_min  != null ? [{ label: 'Dry to touch',  value: `${product.dry_to_touch_min} min` }]  : []),
        ].map((spec) => (
          <div
            key={spec.label}
            className="card-hover rounded-lg p-3"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
          >
            <p className="text-xs mb-1" style={{ color: 'var(--cream-muted)' }}>{spec.label}</p>
            <p className="text-lg font-bold" style={{ color: 'var(--gold-bright)' }}>{spec.value}</p>
          </div>
        ))}
      </div>

      {/* Safety flags */}
      {(product.amine_blush_risk || product.structural_liability || product.silicone_bell_curve) && (
        <div className="mb-6 space-y-2">
          {product.structural_liability && (
            <div className="rounded-md px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.1)', border: '1px solid #7f1d1d', color: '#fca5a5' }}>
              <strong>Structural liability notice:</strong> This material is used in structural
              applications. Cure-time estimates are NOT valid for load-bearing or safety-critical
              decisions. Consult ACI standards and perform physical strength testing.
            </div>
          )}
          {product.amine_blush_risk && (
            <div className="rounded-md px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(217,119,6,0.1)', border: '1px solid #78350f', color: '#fcd34d' }}>
              <strong>Amine blush risk:</strong> This epoxy can develop a waxy surface film at high
              humidity or when the substrate is near the dew point. The calculator will warn you if
              your conditions trigger this risk.
            </div>
          )}
          {product.silicone_bell_curve && (
            <div className="rounded-md px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(217,119,6,0.1)', border: '1px solid #78350f', color: '#fcd34d' }}>
              <strong>Skinning sensitivity:</strong> This silicone product is sensitive to high
              humidity. Above 70% RH there is a risk of premature surface cure with an uncured
              interior.
            </div>
          )}
        </div>
      )}

      {/* Calculator */}
      <div className="mb-8">
        <CalculatorForm productSlug={slug} />
      </div>

      {/* Use-case quick links */}
      {substrateLinks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--cream-muted)' }}>
            Application guides
          </h2>
          <div className="flex flex-wrap gap-2">
            {substrateLinks.map((s) => (
              <Link
                key={s}
                href={`/${slug}/on-${s}`}
                className="text-xs px-3 py-1.5 rounded transition-colors hover:border-[--gold-dim]"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)', color: 'var(--cream-muted)' }}
              >
                on {SUBSTRATE_LABELS[s] ?? s}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Compare with sibling products */}
      {siblings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--cream-muted)' }}>
            Compare with similar products
          </h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/compare/${slug}-vs-${s.slug}`}
                className="text-xs px-3 py-1.5 rounded transition-colors hover:border-[--gold-dim]"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)', color: 'var(--cream-muted)' }}
              >
                vs {s.product_name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* TDS link */}
      <div className="mb-6 text-sm rounded-lg px-4 py-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)', color: 'var(--cream-muted)' }}>
        Data sourced from{' '}
        <a
          href={product.tds_url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="underline hover:text-[--gold-bright] transition-colors"
          style={{ color: 'var(--gold)' }}
        >
          manufacturer&apos;s Technical Data Sheet
        </a>
        . Last verified:{' '}
        {new Date(product.tds_last_verified).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}.
      </div>

      <Disclaimer />
    </div>
  )
}
