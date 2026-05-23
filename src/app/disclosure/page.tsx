import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Affiliate disclosure for DIY Cure Time Calculator — how we earn commissions and why it does not affect our data.',
}

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2">Affiliate Disclosure</h1>
      <p className="text-sm text-zinc-500 mb-8">Last updated: May 2026</p>

      <div className="space-y-6 text-zinc-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">Our Affiliate Relationships</h2>
          <p>
            DIY Cure Time Calculator may participate in affiliate advertising programmes, including
            the Amazon Associates Programme and programmes run by retailers such as Home Depot, B&amp;Q,
            and Screwfix.
          </p>
          <p className="mt-2">
            When you click a link on this Site to purchase a product from a retailer, we may earn a
            small commission on qualifying purchases at no extra cost to you. The price you pay is
            exactly the same whether you use our link or visit the retailer directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">
            How Affiliate Links Are Identified
          </h2>
          <p>
            Affiliate links on this Site are clearly labelled. Where a product link may earn us a
            commission, we will indicate this with text such as &ldquo;(affiliate link)&rdquo; or a
            disclosure notice near the link.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">
            Editorial Independence — Our Promise
          </h2>
          <p>
            Affiliate relationships have absolutely no influence on:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Which products are included in our database</li>
            <li>The cure-time data, temperature ranges, or safety warnings we publish</li>
            <li>Whether a product receives a positive or negative safety flag</li>
            <li>The order in which products appear</li>
          </ul>
          <p className="mt-2">
            All data is sourced exclusively from manufacturer Technical Data Sheets (TDS) and is
            verified by a human reviewer before publication. A product is not added to (or removed
            from) the database based on whether it has an affiliate link.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">FTC &amp; ASA Compliance</h2>
          <p>
            This disclosure complies with the United States Federal Trade Commission (FTC) guidelines
            on endorsements and testimonials (16 CFR Part 255) and the UK Advertising Standards
            Authority (ASA) and Competition &amp; Markets Authority (CMA) guidance on affiliate
            marketing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">Amazon Associates</h2>
          <p>
            DIY Cure Time Calculator is a participant in the Amazon Services LLC Associates
            Programme, an affiliate advertising programme designed to provide a means for sites to
            earn advertising fees by advertising and linking to Amazon.com, Amazon.co.uk, and
            affiliated international stores.
          </p>
          <p className="mt-2 text-zinc-500 italic">
            Note: We will update this section once we meet the minimum traffic requirements for the
            Amazon Associates programme.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">Contact</h2>
          <p>
            If you have questions about our affiliate relationships, please contact us at{' '}
            <a href="mailto:diycurecalc@outlook.com" className="text-zinc-900 underline">
              diycurecalc@outlook.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  )
}
