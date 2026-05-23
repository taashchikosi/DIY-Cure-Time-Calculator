import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Affiliate disclosure for DIY Cure Time Calculator — how we earn commissions and why it does not affect our data.',
}

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <span className="tag-badge mb-4 inline-block">Legal</span>
      <h1 className="text-3xl font-black mb-1" style={{ color: 'var(--cream)' }}>Affiliate Disclosure</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--cream-dim)' }}>Last updated: May 2026</p>

      <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--cream-muted)' }}>

        <section className="rounded-lg p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
          <h2 className="font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>Our Affiliate Relationships</h2>
          <p className="mb-2">
            DIY Cure Time Calculator may participate in affiliate advertising programmes, including
            the Amazon Associates Programme and programmes run by retailers such as Home Depot, B&amp;Q,
            and Screwfix.
          </p>
          <p>
            When you click a link on this Site to purchase a product from a retailer, we may earn a
            small commission on qualifying purchases at no extra cost to you. The price you pay is
            exactly the same whether you use our link or visit the retailer directly.
          </p>
        </section>

        <section className="rounded-lg p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
          <h2 className="font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>How Affiliate Links Are Identified</h2>
          <p>
            Affiliate links on this Site are clearly labelled. Where a product link may earn us a
            commission, we will indicate this with text such as &ldquo;(affiliate link)&rdquo; or a
            disclosure notice near the link.
          </p>
        </section>

        <section className="rounded-lg p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
          <h2 className="font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>Editorial Independence — Our Promise</h2>
          <p className="mb-3">Affiliate relationships have absolutely no influence on:</p>
          <ul className="space-y-1.5">
            {[
              'Which products are included in our database',
              'The cure-time data, temperature ranges, or safety warnings we publish',
              'Whether a product receives a positive or negative safety flag',
              'The order in which products appear',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span style={{ color: 'var(--gold)' }}>→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            All data is sourced exclusively from manufacturer Technical Data Sheets (TDS) and is
            verified by a human reviewer before publication.
          </p>
        </section>

        <section className="rounded-lg p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
          <h2 className="font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>FTC &amp; ASA Compliance</h2>
          <p>
            This disclosure complies with the United States Federal Trade Commission (FTC) guidelines
            on endorsements and testimonials (16 CFR Part 255) and the UK Advertising Standards
            Authority (ASA) and Competition &amp; Markets Authority (CMA) guidance on affiliate
            marketing.
          </p>
        </section>

        <section className="rounded-lg p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
          <h2 className="font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>Amazon Associates</h2>
          <p className="mb-2">
            DIY Cure Time Calculator is a participant in the Amazon Services LLC Associates
            Programme, an affiliate advertising programme designed to provide a means for sites to
            earn advertising fees by advertising and linking to Amazon.com, Amazon.co.uk, and
            affiliated international stores.
          </p>
          <p className="italic" style={{ color: 'var(--cream-dim)' }}>
            Note: We will update this section once we meet the minimum traffic requirements for the
            Amazon Associates programme.
          </p>
        </section>

        <section className="rounded-lg p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
          <h2 className="font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>Contact</h2>
          <p>
            If you have questions about our affiliate relationships, please contact us at{' '}
            <a href="mailto:diycurecalc@outlook.com" className="underline transition-colors" style={{ color: 'var(--gold)' }}>
              diycurecalc@outlook.com
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  )
}
