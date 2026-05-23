import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import Disclaimer from '@/components/Disclaimer'
import CalculatorForm from '@/components/CalculatorForm'

export const revalidate = 86400

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

  const categoryLabel = product.category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c: string) => c.toUpperCase())

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
      <p className="text-sm mb-8" style={{ color: 'var(--cream-muted)' }}>
        {product.manufacturer}
        {product.sub_category ? ` · ${product.sub_category.replace(/_/g, ' ')}` : ''}
      </p>

      {/* Key specs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Full cure (70°F / 50% RH)', value: `${Number(product.full_cure_hours)}h` },
          { label: 'Min application temp',       value: `${product.min_application_temp_f}°F` },
          { label: 'Max application temp',       value: `${product.max_application_temp_f}°F` },
          ...(product.clamp_time_min    != null ? [{ label: 'Clamp time',    value: `${product.clamp_time_min} min` }]    : []),
          ...(product.open_time_min     != null ? [{ label: 'Open time',     value: `${product.open_time_min} min` }]     : []),
          ...(product.dry_to_touch_min  != null ? [{ label: 'Dry to touch',  value: `${product.dry_to_touch_min} min` }]  : []),
        ].map((spec) => (
          <div
            key={spec.label}
            className="rounded-lg p-3"
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
