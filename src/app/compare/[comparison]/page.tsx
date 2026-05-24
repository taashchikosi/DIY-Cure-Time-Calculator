import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import Disclaimer from '@/components/Disclaimer'
import CompareCalculatorForm from '@/components/CompareCalculatorForm'
import { compareSD } from '@/lib/structured-data'

export const revalidate = 86400

interface Props {
  params: Promise<{ comparison: string }>
}

async function getProducts(slug1: string, slug2: string) {
  try {
    const [p1, p2] = await Promise.all([
      prisma.product.findUnique({ where: { slug: slug1 } }),
      prisma.product.findUnique({ where: { slug: slug2 } }),
    ])
    return [p1, p2] as const
  } catch {
    return [null, null] as const
  }
}

function parseSlugs(comparison: string): [string, string] | null {
  const vsIndex = comparison.indexOf('-vs-')
  if (vsIndex === -1) return null
  const slug1 = comparison.slice(0, vsIndex)
  const slug2 = comparison.slice(vsIndex + 4)
  if (!slug1 || !slug2) return null
  return [slug1, slug2]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparison } = await params
  const parsed = parseSlugs(comparison)
  if (!parsed) return { title: 'Comparison Not Found' }
  const [p1, p2] = await getProducts(parsed[0], parsed[1])
  if (!p1 || !p2) return { title: 'Comparison Not Found' }
  const canonical = `https://diycuretimecalculator.com/compare/${comparison}`
  return {
    title: `${p1.product_name} vs ${p2.product_name} — Cure Time Comparison`,
    description: `Compare ${p1.product_name} and ${p2.product_name} side-by-side with our cure time calculator. See how temperature and humidity affect each product at your actual conditions.`,
    alternates: { canonical },
    openGraph: { url: canonical, type: 'website' },
  }
}

const SPEC_LABELS: Record<string, string> = {
  full_cure_hours: 'Full cure (lab)',
  open_time_min: 'Open time',
  clamp_time_min: 'Clamp / tack time',
  dry_to_touch_min: 'Dry to touch',
  min_application_temp_f: 'Min application temp',
  max_application_temp_f: 'Max application temp',
}

function formatSpec(key: string, value: unknown): string {
  if (value == null) return '—'
  if (key === 'full_cure_hours') return `${Number(value)}h`
  if (key.endsWith('_min')) return `${Number(value)} min`
  if (key.endsWith('_temp_f')) return `${Number(value)}°F`
  return String(value)
}

function categorySlug(cat: string, sub: string | null): string {
  if (sub === 'PVA' || sub === 'aliphatic_resin') return 'wood-glue'
  if (sub === 'epoxy') return 'epoxy'
  if (cat === 'sealant') return 'silicone-caulk'
  if (cat === 'concrete') return 'concrete'
  return 'construction-adhesive'
}

export default async function ComparePage({ params }: Props) {
  const { comparison } = await params
  const parsed = parseSlugs(comparison)
  if (!parsed) notFound()

  const [p1, p2] = await getProducts(parsed[0], parsed[1])
  if (!p1 || !p2) notFound()

  const specKeys = ['full_cure_hours', 'open_time_min', 'clamp_time_min', 'dry_to_touch_min', 'min_application_temp_f', 'max_application_temp_f'] as const
  type SpecKey = typeof specKeys[number]
  type ProductRow = typeof p1

  const winnerFor = (key: SpecKey): 1 | 2 | 0 => {
    const v1 = p1[key as keyof ProductRow]
    const v2 = p2[key as keyof ProductRow]
    if (v1 == null || v2 == null) return 0
    const n1 = Number(v1)
    const n2 = Number(v2)
    // for full_cure, open, clamp, dry-to-touch: lower = better (faster)
    // for temp limits: higher max = better, lower min = better
    if (key === 'min_application_temp_f') return n1 < n2 ? 1 : n2 < n1 ? 2 : 0
    if (key === 'max_application_temp_f') return n1 > n2 ? 1 : n2 > n1 ? 2 : 0
    return n1 < n2 ? 1 : n2 < n1 ? 2 : 0
  }

  const sameCategory = p1.category === p2.category && p1.sub_category === p2.sub_category
  const sd = compareSD(p1, p2, comparison)

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sd) }} />
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">

      {/* Breadcrumb */}
      <nav className="text-xs mb-6" aria-label="Breadcrumb" style={{ color: 'var(--cream-muted)' }}>
        <ol className="flex flex-wrap gap-1">
          <li><Link href="/" className="hover:text-[--cream] transition-colors">Home</Link></li>
          <li aria-hidden="true" style={{ color: 'var(--cream-dim)' }}>/</li>
          <li style={{ color: 'var(--cream)' }}>Compare</li>
        </ol>
      </nav>

      <span className="tag-badge mb-4 inline-block">Side-by-Side</span>
      <h1 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight leading-tight" style={{ color: 'var(--cream)' }}>
        <span style={{ color: 'var(--gold-bright)' }}>{p1.product_name}</span>
        {' '}vs{' '}
        <span style={{ color: 'var(--gold-bright)' }}>{p2.product_name}</span>
      </h1>
      <p className="text-sm mb-8 max-w-2xl leading-relaxed" style={{ color: 'var(--cream-muted)' }}>
        Compare cure times, application limits, and real-conditions performance for{' '}
        {p1.manufacturer !== p2.manufacturer
          ? `${p1.manufacturer}'s ${p1.product_name} and ${p2.manufacturer}'s ${p2.product_name}`
          : `both ${p1.manufacturer} products`}
        . Adjust the sliders below for your actual temperature and humidity.
      </p>

      {/* Spec comparison table */}
      <div
        className="rounded-xl overflow-hidden mb-8"
        style={{ border: '1px solid var(--border-main)' }}
      >
        <div
          className="grid grid-cols-3 text-xs font-bold uppercase tracking-wider px-4 py-3"
          style={{
            background: 'linear-gradient(90deg, var(--gold-dim) 0%, #3a2010 100%)',
            borderBottom: '1px solid var(--border-main)',
            color: 'var(--gold-bright)',
          }}
        >
          <span>Specification</span>
          <span className="text-center truncate">{p1.product_name.split(' ').slice(-2).join(' ')}</span>
          <span className="text-center truncate">{p2.product_name.split(' ').slice(-2).join(' ')}</span>
        </div>

        {/* Manufacturer row */}
        <div
          className="grid grid-cols-3 px-4 py-3 text-sm"
          style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-dim)' }}
        >
          <span style={{ color: 'var(--cream-muted)' }}>Manufacturer</span>
          <span className="text-center text-xs" style={{ color: 'var(--cream)' }}>{p1.manufacturer}</span>
          <span className="text-center text-xs" style={{ color: 'var(--cream)' }}>{p2.manufacturer}</span>
        </div>

        {specKeys.map((key) => {
          const v1 = p1[key as keyof typeof p1]
          const v2 = p2[key as keyof typeof p2]
          if (v1 == null && v2 == null) return null
          const winner = winnerFor(key)
          return (
            <div
              key={key}
              className="grid grid-cols-3 px-4 py-3 text-sm"
              style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-dim)' }}
            >
              <span style={{ color: 'var(--cream-muted)' }}>{SPEC_LABELS[key]}</span>
              <span
                className="text-center font-semibold"
                style={{ color: winner === 1 ? '#86efac' : 'var(--cream)' }}
              >
                {winner === 1 && <span className="text-xs mr-1">★</span>}
                {formatSpec(key, v1)}
              </span>
              <span
                className="text-center font-semibold"
                style={{ color: winner === 2 ? '#86efac' : 'var(--cream)' }}
              >
                {winner === 2 && <span className="text-xs mr-1">★</span>}
                {formatSpec(key, v2)}
              </span>
            </div>
          )
        })}

        {/* Safety flags */}
        <div
          className="grid grid-cols-3 px-4 py-3 text-sm"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <span style={{ color: 'var(--cream-muted)' }}>Safety flags</span>
          <span className="text-center text-xs" style={{ color: 'var(--cream)' }}>
            {[
              p1.amine_blush_risk && 'Amine blush',
              p1.silicone_bell_curve && 'Skinning risk',
              p1.structural_liability && 'Structural',
            ].filter(Boolean).join(', ') || 'None'}
          </span>
          <span className="text-center text-xs" style={{ color: 'var(--cream)' }}>
            {[
              p2.amine_blush_risk && 'Amine blush',
              p2.silicone_bell_curve && 'Skinning risk',
              p2.structural_liability && 'Structural',
            ].filter(Boolean).join(', ') || 'None'}
          </span>
        </div>
      </div>

      {/* Calculator */}
      <div className="mb-8">
        <CompareCalculatorForm
          slug1={p1.slug}
          name1={p1.product_name}
          slug2={p2.slug}
          name2={p2.product_name}
        />
      </div>

      {/* Which to choose */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
      >
        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--cream)' }}>
          Which should you choose?
        </h2>
        <div className="space-y-2 text-sm" style={{ color: 'var(--cream-muted)' }}>
          <p>
            <strong style={{ color: 'var(--gold)' }}>{p1.product_name}</strong> has a{' '}
            {Number(p1.full_cure_hours)}h full cure time
            {p1.open_time_min != null ? ` with a ${p1.open_time_min}-minute open time` : ''}.
            {p1.amine_blush_risk && ' Watch for amine blush in humid conditions.'}
          </p>
          <p>
            <strong style={{ color: 'var(--gold)' }}>{p2.product_name}</strong> has a{' '}
            {Number(p2.full_cure_hours)}h full cure time
            {p2.open_time_min != null ? ` with a ${p2.open_time_min}-minute open time` : ''}.
            {p2.amine_blush_risk && ' Watch for amine blush in humid conditions.'}
          </p>
          {!sameCategory && (
            <p className="pt-1">
              These products serve different purposes — check each product&apos;s individual page for
              full substrate compatibility details before deciding.
            </p>
          )}
        </div>
      </div>

      {/* Links back to product pages */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[p1, p2].map((p) => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className="card-hover rounded-lg p-4 flex items-center gap-3 transition-all"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--cream)' }}>{p.product_name}</p>
              <p className="text-xs" style={{ color: 'var(--cream-muted)' }}>{p.manufacturer}</p>
            </div>
            <span style={{ color: 'var(--gold-dim)' }}>→</span>
          </Link>
        ))}
      </div>

      {/* TDS sources */}
      <div className="mb-6 text-xs rounded-lg px-4 py-3 space-y-1" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)', color: 'var(--cream-muted)' }}>
        <p>
          {p1.product_name} data from{' '}
          <a href={p1.tds_url} target="_blank" rel="noopener noreferrer nofollow" className="underline hover:text-[--gold-bright] transition-colors" style={{ color: 'var(--gold)' }}>
            manufacturer TDS
          </a>
          {' '}· last verified {new Date(p1.tds_last_verified).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}.
        </p>
        <p>
          {p2.product_name} data from{' '}
          <a href={p2.tds_url} target="_blank" rel="noopener noreferrer nofollow" className="underline hover:text-[--gold-bright] transition-colors" style={{ color: 'var(--gold)' }}>
            manufacturer TDS
          </a>
          {' '}· last verified {new Date(p2.tds_last_verified).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}.
        </p>
      </div>

      {/* Breadcrumb to category */}
      <p className="text-xs mb-6" style={{ color: 'var(--cream-muted)' }}>
        Browse all{' '}
        <Link href={`/category/${categorySlug(p1.category, p1.sub_category)}`} className="underline hover:text-[--gold-bright] transition-colors" style={{ color: 'var(--gold)' }}>
          {p1.sub_category?.replace(/_/g, ' ') ?? p1.category} products
        </Link>
        .
      </p>

      <Disclaimer />
    </div>
    </>
  )
}
