import Link from 'next/link'
import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'DIY Cure Time Calculator — Temperature & Humidity Adjusted',
  description:
    'Find out how long wood glue, epoxy, silicone, construction adhesive, and concrete take to cure at your actual temperature and humidity. Instant, science-based estimates.',
}

const categories = [
  {
    slug: 'wood-glue',
    label: 'Wood Glue',
    description: 'PVA, polyurethane, and epoxy wood adhesives',
    icon: '🪵',
  },
  {
    slug: 'epoxy',
    label: 'Epoxy',
    description: 'Two-part structural and laminating epoxies',
    icon: '🧪',
  },
  {
    slug: 'silicone-caulk',
    label: 'Silicone Caulk',
    description: 'Bathroom, kitchen, and general-purpose silicone',
    icon: '🚿',
  },
  {
    slug: 'construction-adhesive',
    label: 'Construction Adhesive',
    description: 'Solvent-based and hybrid construction adhesives',
    icon: '🏗️',
  },
  {
    slug: 'concrete',
    label: 'Concrete & Mortar',
    description: 'Cement-based materials — hydration, not drying',
    icon: '🧱',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero */}
      <section className="mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight mb-4">
          How Long Does Your Adhesive Take to Cure?
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mb-2">
          Temperature and humidity dramatically change how long wood glue, epoxy, silicone caulk,
          and concrete take to reach full strength. A product rated &ldquo;24 hours&rdquo; at 70°F can take
          48+ hours on a cold garage floor — or fail completely.
        </p>
        <p className="text-base text-zinc-600 max-w-2xl">
          Enter your conditions and get a material-specific estimate, with safety warnings for
          amine blush, PVA chalking, and silicone skinning.
        </p>
      </section>

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">Browse by Material</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="block border border-zinc-200 rounded-lg p-4 hover:border-zinc-400 hover:shadow-sm transition-all"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h3 className="font-semibold text-zinc-900 mb-1">{cat.label}</h3>
              <p className="text-sm text-zinc-500">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming soon notice */}
      <section className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 sm:p-6 mb-8">
        <h2 className="text-base font-semibold text-zinc-800 mb-1">Product Pages Coming Soon</h2>
        <p className="text-sm text-zinc-600">
          We&apos;re verifying manufacturer data for specific products. Individual product pages with
          precise cure-time calculators will appear here as they pass our review process.
        </p>
      </section>

      {/* How it works */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-zinc-300 mb-2">1</div>
            <h3 className="font-medium text-zinc-800 mb-1">Find your product</h3>
            <p className="text-sm text-zinc-600">
              Browse by material category and select your specific adhesive or sealant.
            </p>
          </div>
          <div className="bg-zinc-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-zinc-300 mb-2">2</div>
            <h3 className="font-medium text-zinc-800 mb-1">Enter your conditions</h3>
            <p className="text-sm text-zinc-600">
              Input the air temperature and relative humidity where you&apos;re working.
            </p>
          </div>
          <div className="bg-zinc-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-zinc-300 mb-2">3</div>
            <h3 className="font-medium text-zinc-800 mb-1">Get your estimate</h3>
            <p className="text-sm text-zinc-600">
              We apply Q10 temperature scaling and material-specific humidity logic from the
              manufacturer&apos;s TDS.
            </p>
          </div>
        </div>
      </section>

      <Disclaimer />
    </div>
  )
}
