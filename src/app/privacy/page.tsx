import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for DIY Cure Time Calculator — how we collect and use your data.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-zinc-500 mb-8">Last updated: May 2026</p>

      <div className="prose prose-zinc max-w-none space-y-6 text-zinc-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">1. Who We Are</h2>
          <p>
            DIY Cure Time Calculator (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a free reference tool that
            helps DIY enthusiasts estimate adhesive and sealant cure times. We are based in the
            United Kingdom.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">2. Data We Collect</h2>
          <h3 className="font-medium text-zinc-800 mt-3 mb-1">Information you provide</h3>
          <p>
            When you use the calculator, you enter temperature and humidity values. These inputs are
            sent to our server to perform the calculation and are not stored after the request
            completes.
          </p>
          <h3 className="font-medium text-zinc-800 mt-3 mb-1">Automatically collected data</h3>
          <p>
            Like most websites, our hosting provider may automatically log standard server data
            including your IP address, browser type, and the pages you visit. This data is used
            solely for security and operational purposes and is retained for a maximum of 30 days.
          </p>
          <h3 className="font-medium text-zinc-800 mt-3 mb-1">Cookies</h3>
          <p>
            We do not set first-party cookies. If you arrive via an affiliate link (see our{' '}
            <a href="/disclosure" className="text-zinc-900 underline">
              Affiliate Disclosure
            </a>
            ), third-party retailers may set cookies on their own domains. We do not control those
            cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">3. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To perform cure-time calculations in response to your requests</li>
            <li>To maintain the security and performance of the site</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p className="mt-2">We do not sell your personal data to any third party.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">
            4. Third-Party Services
          </h2>
          <p>
            This site may use third-party analytics services (such as Google Analytics) to
            understand aggregate traffic patterns. If so, data is anonymised before transmission and
            governed by the respective provider&apos;s privacy policy. We will update this section if
            analytics are added.
          </p>
          <p className="mt-2">
            We may participate in affiliate programmes (see{' '}
            <a href="/disclosure" className="text-zinc-900 underline">
              Affiliate Disclosure
            </a>
            ). Clicking an affiliate link does not transmit your personal data to us; the retailer
            may set their own tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">5. Your Rights (UK GDPR / CCPA)</h2>
          <p>
            If you are in the UK or EEA, you have rights under UK GDPR including the right to
            access, correct, or delete personal data we hold about you. California residents have
            similar rights under CCPA.
          </p>
          <p className="mt-2">
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:taashira.chikosi@gmail.com" className="text-zinc-900 underline">
              taashira.chikosi@gmail.com
            </a>
            . We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">6. Data Retention</h2>
          <p>
            Calculator inputs are not stored persistently. Server logs are retained for a maximum of
            30 days for security purposes, after which they are automatically deleted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the
            top of this page will reflect any changes. Continued use of the site after changes are
            posted constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">8. Contact</h2>
          <p>
            For privacy enquiries, contact:{' '}
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
