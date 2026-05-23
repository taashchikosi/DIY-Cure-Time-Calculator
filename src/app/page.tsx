import Link from 'next/link'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import Disclaimer from '@/components/Disclaimer'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'DIY Cure Time Calculator — Temperature & Humidity Adjusted',
  description:
    'Find out how long wood glue, epoxy, silicone, construction adhesive, and concrete take to cure at your actual temperature and humidity. Instant, science-based estimates.',
}

const categories = [
  { slug: 'wood-glue',               label: 'Wood Glue',             icon: '🪵', desc: 'PVA & polyurethane glues' },
  { slug: 'epoxy',                   label: 'Epoxy',                 icon: '🧪', desc: 'Two-part structural epoxies' },
  { slug: 'silicone-caulk',          label: 'Caulk & Sealant',      icon: '🚿', desc: 'Silicone & acrylic latex' },
  { slug: 'construction-adhesive',   label: 'Construction Adhesive', icon: '🏗️', desc: 'Heavy-duty construction' },
  { slug: 'concrete',                label: 'Concrete & Mortar',     icon: '🧱', desc: 'Cement-based materials' },
]

export default async function HomePage() {
  let products: Array<{
    id: number
    slug: string
    product_name: string
    manufacturer: string
    full_cure_hours: unknown
    category: string
  }> = []

  try {
    products = await prisma.product.findMany({
      select: { id: true, slug: true, product_name: true, manufacturer: true, full_cure_hours: true, category: true },
      orderBy: [{ manufacturer: 'asc' }, { product_name: 'asc' }],
    })
  } catch {
    products = []
  }

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, #2c1a08 0%, #0d0905 65%)',
          borderBottom: '1px solid var(--border-dim)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
          <div className="tag-badge mb-5">Precision · Confidence · Every Time</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5 tracking-tight" style={{ color: 'var(--cream)' }}>
            Know Exactly<br />
            <span style={{ color: 'var(--gold-bright)' }}>When It&apos;s Ready.</span>
          </h1>
          <p className="text-base sm:text-lg max-w-xl mb-8 leading-relaxed" style={{ color: 'var(--cream-muted)' }}>
            Temperature and humidity dramatically change cure times. A product rated &ldquo;24 hours&rdquo;
            at 70°F can take 48+ hours on a cold garage floor — or fail completely.
            Get a science-based estimate for your real conditions.
          </p>

          {/* Feature row */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: '🛡️', title: 'Data You Can Trust',    sub: 'Direct from manufacturer TDS' },
              { icon: '🌡️', title: 'Built for Real World',  sub: 'Q10 temperature scaling' },
              { icon: '✅', title: 'Safety Warnings',       sub: 'Amine blush, chalking & more' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{f.icon}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--cream)' }}>{f.title}</p>
                  <p className="text-xs" style={{ color: 'var(--cream-muted)' }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--gold)' }}>
          Browse by Material
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group rounded-lg p-4 text-center transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-dim)',
              }}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <h3 className="text-sm font-semibold mb-0.5 group-hover:text-[--gold-bright] transition-colors" style={{ color: 'var(--cream)' }}>
                {cat.label}
              </h3>
              <p className="text-xs leading-snug" style={{ color: 'var(--cream-muted)' }}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── All Products ─────────────────────────────────────── */}
      {products.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--gold)' }}>
            All Products ({products.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/${p.slug}`}
                className="group flex items-start justify-between rounded-lg p-4 transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-dim)',
                }}
              >
                <div className="min-w-0 flex-1 pr-3">
                  <h3
                    className="font-semibold text-sm leading-snug mb-0.5 group-hover:text-[--gold-bright] transition-colors"
                    style={{ color: 'var(--cream)' }}
                  >
                    {p.product_name}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--cream-muted)' }}>{p.manufacturer}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold" style={{ color: 'var(--gold)' }}>
                    {Number(p.full_cure_hours)}h
                  </span>
                  <p className="text-xs" style={{ color: 'var(--cream-dim)' }}>full cure</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── How It Works ─────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)' }}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-7" style={{ color: 'var(--gold)' }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Find your product',   body: 'Browse by material category and select your specific adhesive or sealant.' },
              { n: '2', title: 'Enter your conditions', body: 'Input the air temperature and relative humidity where you\'re working.' },
              { n: '3', title: 'Get your estimate',    body: 'We apply Q10 temperature scaling and material-specific humidity logic from the manufacturer\'s TDS.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5"
                  style={{ backgroundColor: 'var(--gold-dim)', color: 'var(--gold-bright)' }}
                >
                  {step.n}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--cream)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--cream-muted)' }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <Disclaimer />
      </div>
    </div>
  )
}
