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

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `${product.product_name} Cure Time Calculator`,
    description: `How long does ${product.product_name} by ${product.manufacturer} take to cure? Get an estimate adjusted for your temperature and humidity.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const { 'product-slug': slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const categoryLabel = product.category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c: string) => c.toUpperCase())

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-zinc-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1">
          <li>
            <a href="/" className="hover:text-zinc-800">
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a
              href={`/category/${product.category.replace(/_/g, '-')}`}
              className="hover:text-zinc-800"
            >
              {categoryLabel}
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-700">{product.product_name}</li>
        </ol>
      </nav>

      {/* Product header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1">
        {product.product_name} — Cure Time Calculator
      </h1>
      <p className="text-sm text-zinc-500 mb-6">
        {product.manufacturer} &middot; {categoryLabel}
        {product.sub_category ? ` · ${product.sub_category}` : ''}
      </p>

      {/* Key specs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <div className="bg-zinc-50 rounded-md p-3">
          <p className="text-xs text-zinc-500 mb-0.5">Full cure (lab, 70°F/50% RH)</p>
          <p className="text-lg font-semibold text-zinc-900">
            {Number(product.full_cure_hours)}h
          </p>
        </div>
        <div className="bg-zinc-50 rounded-md p-3">
          <p className="text-xs text-zinc-500 mb-0.5">Min application temp</p>
          <p className="text-lg font-semibold text-zinc-900">
            {product.min_application_temp_f}°F
          </p>
        </div>
        <div className="bg-zinc-50 rounded-md p-3">
          <p className="text-xs text-zinc-500 mb-0.5">Max application temp</p>
          <p className="text-lg font-semibold text-zinc-900">
            {product.max_application_temp_f}°F
          </p>
        </div>
        {product.clamp_time_min != null && (
          <div className="bg-zinc-50 rounded-md p-3">
            <p className="text-xs text-zinc-500 mb-0.5">Clamp time</p>
            <p className="text-lg font-semibold text-zinc-900">{product.clamp_time_min} min</p>
          </div>
        )}
        {product.open_time_min != null && (
          <div className="bg-zinc-50 rounded-md p-3">
            <p className="text-xs text-zinc-500 mb-0.5">Open time</p>
            <p className="text-lg font-semibold text-zinc-900">{product.open_time_min} min</p>
          </div>
        )}
        {product.dry_to_touch_min != null && (
          <div className="bg-zinc-50 rounded-md p-3">
            <p className="text-xs text-zinc-500 mb-0.5">Dry to touch</p>
            <p className="text-lg font-semibold text-zinc-900">{product.dry_to_touch_min} min</p>
          </div>
        )}
      </div>

      {/* Safety flags */}
      {(product.amine_blush_risk || product.structural_liability || product.silicone_bell_curve) && (
        <div className="mb-6 space-y-2">
          {product.structural_liability && (
            <div className="bg-red-50 border border-red-400 text-red-900 rounded-md px-4 py-3 text-sm">
              <strong>Structural liability notice:</strong> This material is used in structural
              applications. Cure-time estimates are NOT valid for load-bearing or safety-critical
              decisions. Consult ACI standards and perform physical strength testing.
            </div>
          )}
          {product.amine_blush_risk && (
            <div className="bg-amber-50 border border-amber-400 text-amber-900 rounded-md px-4 py-3 text-sm">
              <strong>Amine blush risk:</strong> This epoxy can develop a waxy surface film at high
              humidity or when the substrate is near the dew point. The calculator will warn you if
              your conditions trigger this risk.
            </div>
          )}
          {product.silicone_bell_curve && (
            <div className="bg-amber-50 border border-amber-400 text-amber-900 rounded-md px-4 py-3 text-sm">
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
      <div className="mb-6 text-sm text-zinc-600">
        <p>
          Data sourced from{' '}
          <a
            href={product.tds_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-zinc-900 underline"
          >
            manufacturer&apos;s Technical Data Sheet
          </a>
          . Last verified:{' '}
          {new Date(product.tds_last_verified).toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
          })}
          .
        </p>
      </div>

      <Disclaimer />
    </div>
  )
}
