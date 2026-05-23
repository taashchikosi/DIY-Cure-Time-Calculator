import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact DIY Cure Time Calculator — product suggestions, data corrections, and general enquiries.',
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <span className="tag-badge mb-4 inline-block">Get In Touch</span>
      <h1 className="text-3xl font-black mb-4" style={{ color: 'var(--cream)' }}>Contact Us</h1>
      <p className="text-sm mb-8 max-w-xl" style={{ color: 'var(--cream-muted)' }}>
        Have a product to suggest, spotted an error in our data, or just have a question? We&apos;d love
        to hear from you.
      </p>

      <div className="space-y-6">
        <section className="rounded-lg p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>Get in Touch</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--cream-muted)' }}>
            Send us an email and we&apos;ll get back to you as soon as we can — usually within a few
            working days.
          </p>
          <a
            href="mailto:diycurecalc@outlook.com"
            className="inline-block text-sm font-bold px-5 py-2.5 rounded-md transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, var(--gold) 0%, #a06518 100%)', color: 'var(--bg-main)' }}
          >
            diycurecalc@outlook.com
          </a>
        </section>

        <section className="rounded-lg p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
          <h2 className="text-base font-bold mb-4" style={{ color: 'var(--gold-bright)' }}>What to Include</h2>
          <div className="space-y-4 text-sm" style={{ color: 'var(--cream-muted)' }}>
            {[
              {
                title: 'Product suggestions',
                text: 'Please include the full product name, manufacturer, and a link to the Technical Data Sheet (TDS) on the manufacturer\'s website. We can only add products where cure-time data is publicly available from the manufacturer.',
              },
              {
                title: 'Data corrections',
                text: 'If you believe a cure time, temperature range, or safety flag is wrong, please include the product name, the value you believe is incorrect, the correct value, and a link to the TDS section that supports your correction.',
              },
              {
                title: 'General enquiries',
                text: 'For press, partnership, or other enquiries, email us and we\'ll do our best to respond promptly.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="mt-0.5 shrink-0" style={{ color: 'var(--gold)' }}>→</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--cream)' }}>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}>
          <h2 className="text-base font-bold mb-2" style={{ color: 'var(--gold-bright)' }}>Response Time</h2>
          <p className="text-sm" style={{ color: 'var(--cream-muted)' }}>
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
