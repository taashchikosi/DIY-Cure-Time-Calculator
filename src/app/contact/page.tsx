import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact DIY Cure Time Calculator — product suggestions, data corrections, and general enquiries.',
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-4">Contact Us</h1>
      <p className="text-sm text-zinc-600 mb-8 max-w-xl">
        Have a product to suggest, spotted an error in our data, or just have a question? We&apos;d love
        to hear from you.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-3">Get in Touch</h2>
          <p className="text-sm text-zinc-700 mb-3">
            Send us an email and we&apos;ll get back to you as soon as we can — usually within a few
            working days.
          </p>
          <a
            href="mailto:taashira.chikosi@gmail.com"
            className="inline-block bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-zinc-700 transition-colors"
          >
            taashira.chikosi@gmail.com
          </a>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-3">What to Include</h2>
          <div className="space-y-4 text-sm text-zinc-700">
            <div>
              <h3 className="font-medium text-zinc-800 mb-1">Product suggestions</h3>
              <p>
                Please include the full product name, manufacturer, and a link to the Technical
                Data Sheet (TDS) on the manufacturer&apos;s website. We can only add products where
                cure-time data is publicly available from the manufacturer.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-zinc-800 mb-1">Data corrections</h3>
              <p>
                If you believe a cure time, temperature range, or safety flag is wrong, please
                include the product name, the value you believe is incorrect, the correct value, and
                a link to the TDS section that supports your correction.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-zinc-800 mb-1">General enquiries</h3>
              <p>
                For press, partnership, or other enquiries, email us and we&apos;ll do our best to
                respond promptly.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">Response Time</h2>
          <p className="text-sm text-zinc-700">
            We aim to respond to all enquiries within 3–5 working days. For data correction
            requests that require TDS verification, it may take a little longer.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  )
}
