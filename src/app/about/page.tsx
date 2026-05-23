import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'About',
  description: 'About DIY Cure Time Calculator — why we built it and how the science works.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <span className="tag-badge mb-4 inline-block">About Us</span>
      <h1 className="text-3xl font-black mb-6" style={{ color: 'var(--cream)' }}>
        About DIY Cure Time Calculator
      </h1>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--cream-muted)' }}>
        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>Why We Built This</h2>
          <p>
            The label on your wood glue says &ldquo;full cure: 24 hours.&rdquo; But it&apos;s February, your
            garage is 45°F, and the humidity is 80%. That 24 hours is actually closer to 60 — and
            you might get chalking failure, not just a slow cure.
          </p>
          <p className="mt-3">
            Manufacturer Technical Data Sheets include the science, buried in footnotes. DIY Cure
            Time Calculator extracts that science and surfaces it in a simple tool — so you can
            plan your project around real conditions, not idealised lab numbers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>The Science</h2>

          <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--cream)' }}>Q10 Temperature Scaling</h3>
            <p>
              Most adhesive curing reactions roughly double or halve in rate for every 10°C change
              in temperature (the Q10 principle). We apply this adjustment using the
              material&apos;s specific temperature-doubling constant from the manufacturer&apos;s TDS,
              referenced to a 21°C (70°F) baseline.
            </p>
          </div>

          <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--cream)' }}>Material-Specific Humidity Branches</h3>
            <p className="mb-2">Humidity affects different adhesive chemistries in opposite ways:</p>
            <ul className="space-y-1.5">
              {[
                { label: 'PVA / water-based:', text: 'High humidity slows evaporation and extends cure' },
                { label: 'Polyurethane / CA glue:', text: 'Moisture-activated — too little stalls them, too much causes premature skinning' },
                { label: 'Silicone:', text: 'Bell-curve relationship — optimal at 40–60% RH' },
                { label: 'Two-part epoxy:', text: 'Chemical reaction; humidity affects surface quality, not cure rate' },
                { label: 'Concrete:', text: 'Humidity prevents premature drying — curing requires water, not its absence' },
              ].map((item) => (
                <li key={item.label} className="flex gap-2">
                  <span style={{ color: 'var(--gold)' }}>→</span>
                  <span><strong style={{ color: 'var(--cream)' }}>{item.label}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--cream)' }}>Safety Guardrails</h3>
            <p className="mb-2">The calculator flags conditions that cause outright failure, not just slow cure:</p>
            <ul className="space-y-1.5">
              {[
                { label: 'Amine blush (epoxy):', text: 'High RH or substrate near dew point causes a waxy film that breaks adhesion' },
                { label: 'PVA chalking:', text: 'Applying below MFFT results in powdery, near-zero-strength bonds' },
                { label: 'Silicone skinning:', text: 'RH above 70% can cause premature surface cure with uncured interior' },
                { label: 'Concrete structural:', text: 'Persistent disclaimer that strength-critical decisions require physical testing' },
              ].map((item) => (
                <li key={item.label} className="flex gap-2">
                  <span style={{ color: 'var(--gold)' }}>→</span>
                  <span><strong style={{ color: 'var(--cream)' }}>{item.label}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>Data Quality</h2>
          <p>
            Every product in our database is sourced from the manufacturer&apos;s current Technical
            Data Sheet (TDS), with a direct link to the source document. Products are only shown
            on the site after manual human verification. We re-check TDS data periodically.
          </p>
          <p className="mt-3">
            If you spot an error or have a product to suggest, please{' '}
            <a href="/contact" className="underline hover:text-[--gold-bright] transition-colors" style={{ color: 'var(--gold)' }}>
              contact us
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>What We Are Not</h2>
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
