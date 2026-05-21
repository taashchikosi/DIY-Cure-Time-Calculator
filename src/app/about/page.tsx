import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About DIY Cure Time Calculator — why we built it and how the science works.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-6">About DIY Cure Time Calculator</h1>

      <div className="space-y-6 text-zinc-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">Why We Built This</h2>
          <p>
            The label on your wood glue says &ldquo;full cure: 24 hours.&rdquo; But it&apos;s February, your
            garage is 45°F, and the humidity is 80%. That 24 hours is actually closer to 60 — and
            you might get chalking failure, not just a slow cure.
          </p>
          <p className="mt-2">
            Manufacturer Technical Data Sheets include the science, buried in footnotes. DIY Cure
            Time Calculator extracts that science and surfaces it in a simple tool — so you can
            plan your project around real conditions, not idealised lab numbers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">The Science</h2>
          <h3 className="font-medium text-zinc-800 mt-3 mb-1">Q10 Temperature Scaling</h3>
          <p>
            Most adhesive curing reactions roughly double or halve in rate for every 10°C change
            in temperature (the Q10 principle). We apply this adjustment using the
            material&apos;s specific temperature-doubling constant from the manufacturer&apos;s TDS,
            referenced to a 21°C (70°F) baseline.
          </p>

          <h3 className="font-medium text-zinc-800 mt-3 mb-1">Material-Specific Humidity Branches</h3>
          <p>Humidity affects different adhesive chemistries in opposite ways:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>PVA / water-based:</strong> High humidity slows evaporation and extends cure
            </li>
            <li>
              <strong>Polyurethane / CA glue:</strong> These are moisture-activated — too little
              humidity stalls them, too much causes premature skinning
            </li>
            <li>
              <strong>Silicone:</strong> Bell-curve relationship — optimal at 40–60% RH
            </li>
            <li>
              <strong>Two-part epoxy:</strong> Chemical reaction; humidity has minimal direct effect
              on cure rate but affects surface quality
            </li>
            <li>
              <strong>Concrete:</strong> Humidity prevents premature drying — curing requires water,
              not its absence
            </li>
          </ul>

          <h3 className="font-medium text-zinc-800 mt-3 mb-1">Safety Guardrails</h3>
          <p>The calculator flags conditions that cause outright failure, not just slow cure:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Amine blush (epoxy):</strong> High RH or substrate near dew point causes a
              waxy surface film that breaks adhesion
            </li>
            <li>
              <strong>PVA chalking:</strong> Applying below the Minimum Film Formation Temperature
              results in powdery, near-zero-strength bonds
            </li>
            <li>
              <strong>Silicone skinning:</strong> RH above 70% can cause premature surface cure
              while the interior remains uncured
            </li>
            <li>
              <strong>Concrete structural:</strong> Persistent disclaimer that strength-critical
              decisions require physical testing, not calculators
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">Data Quality</h2>
          <p>
            Every product in our database is sourced from the manufacturer&apos;s current Technical
            Data Sheet (TDS), with a direct link to the source document. Products are only shown
            on the site after manual human verification. We re-check TDS data periodically.
          </p>
          <p className="mt-2">
            If you spot an error or have a product to suggest, please{' '}
            <a href="/contact" className="text-zinc-900 underline">
              contact us
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">What We Are Not</h2>
          <p>
            We are a reference tool for DIY hobbyists and light trade use. We are not a substitute
            for a structural engineer, a materials scientist, or a manufacturer&apos;s technical
            support team. Our results are estimates — always read the TDS for your specific product
            and lot.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  )
}
