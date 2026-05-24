import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import Disclaimer from '@/components/Disclaimer'
import CalculatorForm from '@/components/CalculatorForm'

export const revalidate = 86400

interface SubstrateInfo {
  label: string
  description: string
  prepTips: string[]
}

const SUBSTRATES: Record<string, SubstrateInfo> = {
  oak: {
    label: 'Oak',
    description: 'Closed-grain hardwood (red or white oak)',
    prepTips: [
      'Sand to 120-grit — no finer, as over-sanding glazes the surface and reduces absorption.',
      'Wipe with a clean, dry cloth to remove dust. Do not use solvents before PVA or aliphatic glues.',
      'Oak tannins can inhibit contact cements — test on scrap first.',
      'Freshly planed or sanded oak is ideal. Avoid bonding mill-glazed surfaces.',
    ],
  },
  pine: {
    label: 'Pine',
    description: 'Softwood (ponderosa, white, yellow pine)',
    prepTips: [
      'End grain absorbs adhesive heavily — apply two thin coats with a 2-minute wait between to prevent a starved joint.',
      'Sand face grain to 120-grit. Do not use 220-grit or finer as it seals the fibers.',
      'Pine resin pockets can prevent bonding — route them out or seal with shellac before gluing.',
      'Keep boards in the work space for 24 hours before gluing so moisture content stabilises.',
    ],
  },
  mdf: {
    label: 'MDF (Medium-Density Fiberboard)',
    description: 'Engineered wood panel — smooth face, highly porous edges',
    prepTips: [
      'Edge grain is extremely porous: apply a diluted PVA primer coat (1 part PVA : 10 parts water) and let it dry before the main adhesive application.',
      'Face grain bonds reliably without priming. Sand to 120-grit if the surface has been painted or sealed.',
      'MDF is heavy — use adequate clamps and allow full cure before removing.',
      'Keep MDF at room temperature — cold MDF absorbs less adhesive and the joint can fail.',
    ],
  },
  plywood: {
    label: 'Plywood',
    description: 'Cross-grained engineered wood panel',
    prepTips: [
      'Face veneer bonds well. Lightly sand to 120-grit to remove any release agent.',
      'Edge grain bonds poorly — reinforce with splines, biscuits, or pocket screws.',
      'Check for delamination: tap the surface and avoid areas that sound hollow.',
      'High-pressure laminates (HPL) on plywood resist adhesion — sand through the laminate layer first.',
    ],
  },
  bamboo: {
    label: 'Bamboo',
    description: 'Dense, smooth-surfaced natural grass material',
    prepTips: [
      'Bamboo is naturally waxy and dense. Sand to 80-grit and clean with isopropyl alcohol immediately before bonding.',
      'Avoid moisture contact before gluing — bamboo is sensitive to moisture changes and can bow.',
      'Cross-laminate bamboo boards absorb less glue than solid strips; adjust spread accordingly.',
    ],
  },
  drywall: {
    label: 'Drywall (Gypsum Board)',
    description: 'Paper-faced gypsum panel',
    prepTips: [
      'Remove any dust and loose paper fibres. A clean, dry surface is essential.',
      'Avoid bonding over primer or paint unless the adhesive specifically supports it.',
      'For construction adhesives on drywall, apply in a serpentine bead and press firmly.',
      'Drywall is porous — do not over-apply water-based adhesives or the paper facing can bubble.',
    ],
  },
  metal: {
    label: 'Metal (Steel / Aluminium)',
    description: 'Ferrous and non-ferrous metal surfaces',
    prepTips: [
      'Degrease with isopropyl alcohol or acetone immediately before bonding — oils from handling prevent adhesion.',
      'Abrade the bonding surface with 80-grit sandpaper for maximum bite.',
      'Aluminium develops an oxide layer rapidly — sand and bond within 30 minutes.',
      'Avoid bonding galvanised steel with construction adhesives unless the adhesive specifically supports it.',
    ],
  },
  concrete: {
    label: 'Concrete',
    description: 'Portland cement-based cast or pre-cast concrete',
    prepTips: [
      'Concrete must be fully cured (minimum 28 days) before bonding anything to it.',
      'Clean off oil, paint, curing compounds, and efflorescence. Use acid etching or mechanical grinding for smooth slabs.',
      'Concrete is porous — pre-wet slightly for construction adhesives to prevent the concrete from pulling moisture out too quickly.',
      'Cold concrete significantly slows adhesive cure — warm the slab above 50°F (10°C) before applying.',
    ],
  },
  glass: {
    label: 'Glass',
    description: 'Tempered or float glass',
    prepTips: [
      'Clean with glass cleaner, then immediately wipe with isopropyl alcohol for a solvent-clean surface.',
      'Bond within 10 minutes of cleaning — glass re-contaminates quickly from airborne oils.',
      'UV-cure adhesives produce cleaner, stronger bonds than silicone where optical clarity is needed.',
      'Tempered glass cannot be cut or drilled — plan bond placement carefully.',
    ],
  },
  ceramic: {
    label: 'Ceramic / Porcelain Tile',
    description: 'Fired clay tile — glazed or unglazed',
    prepTips: [
      'Wipe glazed tiles with isopropyl alcohol. Unglazed tiles bond more aggressively.',
      'For tile repairs, roughen the back of the replacement tile with 60-grit before applying adhesive.',
      'Epoxy adhesives give the strongest, most waterproof bond for structural tile repairs.',
      'Allow 24 hours before grouting even if the adhesive labels say faster — tile movement can crack grout.',
    ],
  },
  plastic: {
    label: 'Plastic (ABS / Polypropylene)',
    description: 'Common thermoplastics',
    prepTips: [
      'Lightly scuff with 220-grit sandpaper to increase surface area, then clean with isopropyl alcohol.',
      'Polyethylene (PE) and polypropylene (PP) have very low surface energy — most adhesives will not bond permanently without a flame-treatment or special primer.',
      'ABS and PVC bond well with structural adhesives after sanding.',
      'Do not use solvents like acetone on ABS — it will dissolve the surface.',
    ],
  },
  brick: {
    label: 'Brick',
    description: 'Clay fired brick (face or commons)',
    prepTips: [
      'Remove efflorescence (white mineral deposits) with a stiff brush and dilute acid wash.',
      'Brush out all loose mortar from joints before applying adhesive.',
      'Dampen the brick lightly before applying construction adhesives — dry masonry pulls moisture out too fast and causes a dry set.',
      'Reclaimed bricks can have residual mortar or paint — clean to bare brick for best adhesion.',
    ],
  },
  foam: {
    label: 'Foam Insulation (EPS / XPS)',
    description: 'Expanded polystyrene (EPS) or extruded polystyrene (XPS) foam board',
    prepTips: [
      'CRITICAL: Never use solvent-based adhesives on EPS or XPS — they will dissolve the foam instantly.',
      'Use only water-based or foam-safe adhesives. Check the label specifically for EPS/XPS compatibility.',
      'Polyurethane foaming adhesives expand aggressively on foam — use minimal amounts and apply controlled pressure.',
      'Foam surfaces do not need sanding. Ensure they are clean and dry.',
    ],
  },
  stone: {
    label: 'Natural Stone',
    description: 'Granite, marble, slate, or limestone',
    prepTips: [
      'Non-porous stones (granite, basalt) need mechanical abrasion — sand with 60-grit before bonding.',
      'Porous stones (limestone, sandstone) absorb adhesive — prime with a stone consolidant first.',
      'Marble is sensitive to acid — use only pH-neutral cleaners, never acid-based products.',
      'Slate delaminates along its cleavage planes — mechanical fasteners alongside adhesive are recommended.',
    ],
  },
  tile: {
    label: 'Tile (General)',
    description: 'Ceramic, porcelain, or natural stone tile',
    prepTips: [
      'Clean with isopropyl alcohol immediately before bonding.',
      'Epoxy adhesives give the strongest, waterproof bond for structural repairs.',
      'Silicone caulk is preferred for expansion joints — allows movement without cracking.',
      'Back-butter both the tile and the substrate for maximum coverage.',
    ],
  },
}

const CATEGORY_TO_RELEVANT_SUBSTRATES: Record<string, string[]> = {
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

function getRelevantSubstrates(subCategory: string | null, category: string): string[] {
  if (subCategory && CATEGORY_TO_RELEVANT_SUBSTRATES[subCategory]) {
    return CATEGORY_TO_RELEVANT_SUBSTRATES[subCategory]
  }
  if (category === 'sealant') return CATEGORY_TO_RELEVANT_SUBSTRATES.sealant
  if (category === 'concrete') return CATEGORY_TO_RELEVANT_SUBSTRATES.concrete
  return Object.keys(SUBSTRATES)
}

function getCompatibilityNote(subCategory: string | null, substrate: string): { level: 'warn' | 'tip' | null; message: string } {
  if ((subCategory === 'PVA' || subCategory === 'aliphatic_resin') && substrate === 'foam') {
    return { level: 'tip', message: 'PVA wood glues are water-based and safe on foam surfaces, but the foam itself is typically the weak point — not the glue line.' }
  }
  if ((subCategory === 'PVA' || subCategory === 'aliphatic_resin') && substrate === 'concrete') {
    return { level: 'warn', message: 'PVA wood glues are not designed for concrete bonding. Consider a construction adhesive or epoxy for concrete applications.' }
  }
  if ((subCategory === 'PVA' || subCategory === 'aliphatic_resin') && substrate === 'metal') {
    return { level: 'warn', message: 'PVA wood glues are not designed for metal bonding. Use an epoxy or cyanoacrylate adhesive instead.' }
  }
  if (subCategory === 'polyurethane' && substrate === 'foam') {
    return { level: 'warn', message: 'Polyurethane construction adhesives expand on contact with foam — use sparingly and apply firm, even pressure to prevent panel separation.' }
  }
  if (subCategory === 'epoxy' && substrate === 'plastic') {
    return { level: 'tip', message: 'Two-part epoxy bonds well to ABS, PVC, and hard plastics. Polyethylene and polypropylene require surface treatment first — epoxy alone will not hold.' }
  }
  if (subCategory === 'cyanoacrylate' && substrate === 'foam') {
    return { level: 'warn', message: 'Cyanoacrylate (super glue) can dissolve some foams. Test on a hidden area first. Use foam-safe gel CA for expanded polystyrene.' }
  }
  return { level: null, message: '' }
}

interface Props {
  params: Promise<{ 'product-slug': string; 'use-case': string }>
}

async function getProduct(slug: string) {
  try {
    return await prisma.product.findUnique({ where: { slug } })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'product-slug': slug, 'use-case': useCase } = await params
  if (!useCase.startsWith('on-')) return { title: 'Not Found' }
  const substrate = useCase.slice(3)
  const info = SUBSTRATES[substrate]
  if (!info) return { title: 'Not Found' }
  const product = await getProduct(slug)
  if (!product) return { title: 'Not Found' }
  return {
    title: `${product.product_name} on ${info.label} — Cure Time & Application Guide`,
    description: `How long does ${product.product_name} take to cure on ${info.label}? Temperature and humidity-adjusted cure time, surface prep tips, and safety warnings for bonding ${info.description.toLowerCase()}.`,
  }
}

export default async function UseCasePage({ params }: Props) {
  const { 'product-slug': slug, 'use-case': useCase } = await params

  if (!useCase.startsWith('on-')) notFound()
  const substrate = useCase.slice(3)

  const info = SUBSTRATES[substrate]
  if (!info) notFound()

  const product = await getProduct(slug)
  if (!product) notFound()

  const relevantSubstrates = getRelevantSubstrates(product.sub_category, product.category)
  if (!relevantSubstrates.includes(substrate)) notFound()

  const compat = getCompatibilityNote(product.sub_category, substrate)

  const categoryLabel = (product.sub_category ?? product.category).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  const otherSubstrates = relevantSubstrates.filter((s) => s !== substrate).slice(0, 5)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">

      {/* Breadcrumb */}
      <nav className="text-xs mb-6" aria-label="Breadcrumb" style={{ color: 'var(--cream-muted)' }}>
        <ol className="flex flex-wrap gap-1">
          <li><Link href="/" className="hover:text-[--cream] transition-colors">Home</Link></li>
          <li aria-hidden="true" style={{ color: 'var(--cream-dim)' }}>/</li>
          <li><Link href={`/${slug}`} className="hover:text-[--cream] transition-colors">{product.product_name}</Link></li>
          <li aria-hidden="true" style={{ color: 'var(--cream-dim)' }}>/</li>
          <li style={{ color: 'var(--cream)' }}>on {info.label}</li>
        </ol>
      </nav>

      <span className="tag-badge mb-4 inline-block">{categoryLabel}</span>
      <h1 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight leading-tight" style={{ color: 'var(--cream)' }}>
        {product.product_name} on{' '}
        <span style={{ color: 'var(--gold-bright)' }}>{info.label}</span>
      </h1>
      <p className="text-sm mb-2" style={{ color: 'var(--cream-muted)' }}>
        {product.manufacturer} · {categoryLabel}
      </p>
      <p className="text-sm mb-8 max-w-xl leading-relaxed" style={{ color: 'var(--cream-muted)' }}>
        {info.description}. Use the calculator below to get a cure-time estimate adjusted for your
        actual temperature and humidity, then follow the surface-prep checklist.
      </p>

      {/* Compatibility notice */}
      {compat.level && (
        <div
          className="rounded-md px-4 py-3 mb-6 text-sm"
          style={{
            backgroundColor: compat.level === 'warn' ? 'rgba(220,38,38,0.1)' : 'rgba(217,119,6,0.1)',
            border: `1px solid ${compat.level === 'warn' ? '#7f1d1d' : '#78350f'}`,
            color: compat.level === 'warn' ? '#fca5a5' : '#fcd34d',
          }}
        >
          <span className="mr-2">{compat.level === 'warn' ? '⛔' : '⚠️'}</span>
          {compat.message}
        </div>
      )}

      {/* Key specs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Full cure (70°F / 50% RH)', value: `${Number(product.full_cure_hours)}h` },
          { label: 'Min application temp', value: `${product.min_application_temp_f}°F` },
          ...(product.open_time_min != null ? [{ label: 'Open / working time', value: `${product.open_time_min} min` }] : []),
          ...(product.clamp_time_min != null ? [{ label: 'Clamp / tack time', value: `${product.clamp_time_min} min` }] : []),
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

      {/* Calculator */}
      <div className="mb-8">
        <CalculatorForm productSlug={slug} />
      </div>

      {/* Surface prep */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
      >
        <h2 className="text-base font-bold mb-4" style={{ color: 'var(--cream)' }}>
          Surface Prep — {info.label}
        </h2>
        <ul className="space-y-3">
          {info.prepTips.map((tip, i) => (
            <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--cream-muted)' }}>
              <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold mt-0.5" style={{ backgroundColor: 'var(--gold-dim)', color: 'var(--gold-bright)' }}>
                {i + 1}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Safety flags */}
      {(product.amine_blush_risk || product.structural_liability || product.silicone_bell_curve || product.mfft_celsius != null) && (
        <div className="mb-8 space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--cream-muted)' }}>
            Safety Warnings
          </h2>
          {product.structural_liability && (
            <div className="rounded-md px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.1)', border: '1px solid #7f1d1d', color: '#fca5a5' }}>
              <strong>Structural liability:</strong> Cure-time estimates are NOT valid for load-bearing or safety-critical decisions.
            </div>
          )}
          {product.amine_blush_risk && (
            <div className="rounded-md px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(217,119,6,0.1)', border: '1px solid #78350f', color: '#fcd34d' }}>
              <strong>Amine blush risk:</strong> At high humidity this epoxy may form a waxy surface film. The calculator will flag this if your conditions trigger it.
            </div>
          )}
          {product.mfft_celsius != null && (
            <div className="rounded-md px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(217,119,6,0.1)', border: '1px solid #78350f', color: '#fcd34d' }}>
              <strong>Cold-temperature chalking risk:</strong> Below {Number(product.mfft_celsius)}°C ({Math.round(Number(product.mfft_celsius) * 9 / 5 + 32)}°F) this adhesive may dry powdery with near-zero strength.
            </div>
          )}
        </div>
      )}

      {/* Other substrate links */}
      {otherSubstrates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--cream-muted)' }}>
            {product.product_name} on other surfaces
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherSubstrates.map((s) => (
              <Link
                key={s}
                href={`/${slug}/on-${s}`}
                className="text-xs px-3 py-1.5 rounded transition-colors hover:border-[--gold-dim]"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)', color: 'var(--cream-muted)' }}
              >
                on {SUBSTRATES[s]?.label ?? s}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to product */}
      <div className="mb-6">
        <Link
          href={`/${slug}`}
          className="inline-flex items-center gap-2 text-sm hover:text-[--gold-bright] transition-colors"
          style={{ color: 'var(--gold)' }}
        >
          ← Back to {product.product_name} full page
        </Link>
      </div>

      {/* TDS source */}
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
