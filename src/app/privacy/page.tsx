import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for DIY Cure Time Calculator — how we collect and use your data.',
}

const sections = [
  {
    title: '1. Who We Are',
    content: (
      <p>
        DIY Cure Time Calculator (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a free reference tool that
        helps DIY enthusiasts estimate adhesive and sealant cure times. We are based in the
        United Kingdom.
      </p>
    ),
  },
  {
    title: '2. Data We Collect',
    content: (
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold mb-1" style={{ color: 'var(--cream)' }}>Information you provide</h3>
          <p>When you use the calculator, you enter temperature and humidity values. These inputs are
          sent to our server to perform the calculation and are not stored after the request completes.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1" style={{ color: 'var(--cream)' }}>Automatically collected data</h3>
          <p>Like most websites, our hosting provider may automatically log standard server data
          including your IP address, browser type, and the pages you visit. This data is used
          solely for security and operational purposes and is retained for a maximum of 30 days.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1" style={{ color: 'var(--cream)' }}>Cookies</h3>
          <p>We do not set first-party cookies. If you arrive via an affiliate link (see our{' '}
          <a href="/disclosure" className="underline transition-colors" style={{ color: 'var(--gold)' }}>Affiliate Disclosure</a>
          ), third-party retailers may set cookies on their own domains.</p>
        </div>
      </div>
    ),
  },
  {
    title: '3. How We Use Your Data',
    content: (
      <div>
        <ul className="space-y-1 mb-3">
          {['To perform cure-time calculations in response to your requests', 'To maintain the security and performance of the site', 'To comply with legal obligations'].map(item => (
            <li key={item} className="flex gap-2"><span style={{ color: 'var(--gold)' }}>→</span><span>{item}</span></li>
          ))}
        </ul>
        <p>We do not sell your personal data to any third party.</p>
      </div>
    ),
  },
  {
    title: '4. Third-Party Services',
    content: (
      <div className="space-y-2">
        <p>This site may use third-party analytics services to understand aggregate traffic patterns. If so, data is anonymised before transmission.</p>
        <p>We may participate in affiliate programmes (see{' '}
        <a href="/disclosure" className="underline transition-colors" style={{ color: 'var(--gold)' }}>Affiliate Disclosure</a>
        ). Clicking an affiliate link does not transmit your personal data to us.</p>
      </div>
    ),
  },
  {
    title: '5. Your Rights (UK GDPR / CCPA)',
    content: (
      <div className="space-y-2">
        <p>If you are in the UK or EEA, you have rights under UK GDPR including the right to access, correct, or delete personal data we hold about you. California residents have similar rights under CCPA.</p>
        <p>To exercise any of these rights, please contact us at{' '}
        <a href="mailto:diycurecalc@outlook.com" className="underline transition-colors" style={{ color: 'var(--gold)' }}>diycurecalc@outlook.com</a>. We will respond within 30 days.</p>
      </div>
    ),
  },
  {
    title: '6. Data Retention',
    content: <p>Calculator inputs are not stored persistently. Server logs are retained for a maximum of 30 days for security purposes, after which they are automatically deleted.</p>,
  },
  {
    title: '7. Changes to This Policy',
    content: <p>We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top of this page will reflect any changes.</p>,
  },
  {
    title: '8. Contact',
    content: <p>For privacy enquiries, contact:{' '}
      <a href="mailto:diycurecalc@outlook.com" className="underline transition-colors" style={{ color: 'var(--gold)' }}>diycurecalc@outlook.com</a>
    </p>,
  },
]

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <span className="tag-badge mb-4 inline-block">Legal</span>
      <h1 className="text-3xl font-black mb-1" style={{ color: 'var(--cream)' }}>Privacy Policy</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--cream-dim)' }}>Last updated: May 2026</p>

      <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--cream-muted)' }}>
        {sections.map((s) => (
          <section
            key={s.title}
            className="rounded-lg p-5"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
          >
            <h2 className="font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>{s.title}</h2>
            {s.content}
          </section>
        ))}
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  )
}
