import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for DIY Cure Time Calculator.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-zinc-500 mb-8">Last updated: May 2026</p>

      <div className="space-y-6 text-zinc-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using DIY Cure Time Calculator (&ldquo;the Site&rdquo;), you agree to be bound by
            these Terms of Service. If you do not agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">2. Description of Service</h2>
          <p>
            DIY Cure Time Calculator provides estimated cure times for adhesives, sealants, and
            construction materials based on temperature and humidity inputs. All results are
            estimates only and are intended for informational purposes for DIY hobbyists.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">3. No Professional Advice</h2>
          <p>
            The information provided on this Site does not constitute professional engineering,
            construction, or safety advice. You must always:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Read and follow the manufacturer&apos;s Technical Data Sheet (TDS) for your product</li>
            <li>Consult a qualified professional for structural, load-bearing, or safety-critical applications</li>
            <li>Perform your own testing where bond strength is critical</li>
          </ul>
          <p className="mt-2 font-medium text-zinc-900">
            Results from this calculator are NOT suitable for structural, load-bearing, or
            safety-critical applications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, DIY Cure Time Calculator and its
            operators shall not be liable for any direct, indirect, incidental, special, or
            consequential damages arising from your use of, or inability to use, this Site or any
            information obtained from it — including but not limited to property damage, personal
            injury, or financial loss resulting from reliance on cure-time estimates.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">5. Accuracy of Information</h2>
          <p>
            We endeavour to source calculation parameters from manufacturer Technical Data Sheets
            and to verify them before publication. However, manufacturers change formulations
            without notice, and regional product variants may differ. We cannot guarantee that all
            data is current or accurate for your specific product lot.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">6. Affiliate Links</h2>
          <p>
            This Site may contain affiliate links to retailers. If you purchase a product through
            an affiliate link, we may earn a commission at no extra cost to you. See our{' '}
            <a href="/disclosure" className="text-zinc-900 underline">
              Affiliate Disclosure
            </a>{' '}
            for full details. Affiliate relationships do not influence our calculator results or
            data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">7. Intellectual Property</h2>
          <p>
            The text, design, and code on this Site are owned by DIY Cure Time Calculator and may
            not be reproduced or redistributed without permission. Calculator results generated
            from your own inputs are yours to use freely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. The &ldquo;Last updated&rdquo; date will
            reflect changes. Continued use of the Site constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of England and Wales. Any disputes shall be
            subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">10. Contact</h2>
          <p>
            For any questions about these Terms, contact:{' '}
            <a href="mailto:taashira.chikosi@gmail.com" className="text-zinc-900 underline">
              taashira.chikosi@gmail.com
            </a>
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  )
}
