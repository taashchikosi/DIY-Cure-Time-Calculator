import type { Metadata } from 'next'
import Disclaimer from '@/components/Disclaimer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for DIY Cure Time Calculator.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <span className="tag-badge mb-4 inline-block">Legal</span>
      <h1 className="text-3xl font-black mb-1" style={{ color: 'var(--cream)' }}>Terms of Service</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--cream-dim)' }}>Last updated: May 2026</p>

      <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--cream-muted)' }}>
        {[
          {
            title: '1. Acceptance of Terms',
            body: 'By accessing or using DIY Cure Time Calculator ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.',
          },
          {
            title: '2. Description of Service',
            body: 'DIY Cure Time Calculator provides estimated cure times for adhesives, sealants, and construction materials based on temperature and humidity inputs. All results are estimates only and are intended for informational purposes for DIY hobbyists.',
          },
          {
            title: '3. No Professional Advice',
            body: null,
            children: (
              <div>
                <p className="mb-2">The information provided on this Site does not constitute professional engineering, construction, or safety advice. You must always:</p>
                <ul className="space-y-1 mb-2">
                  {[
                    "Read and follow the manufacturer's Technical Data Sheet (TDS) for your product",
                    "Consult a qualified professional for structural, load-bearing, or safety-critical applications",
                    "Perform your own testing where bond strength is critical",
                  ].map(item => (
                    <li key={item} className="flex gap-2"><span style={{ color: 'var(--gold)' }}>→</span><span>{item}</span></li>
                  ))}
                </ul>
                <p className="font-semibold" style={{ color: '#fca5a5' }}>Results from this calculator are NOT suitable for structural, load-bearing, or safety-critical applications.</p>
              </div>
            ),
          },
          {
            title: '4. Limitation of Liability',
            body: 'To the maximum extent permitted by applicable law, DIY Cure Time Calculator and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this Site — including but not limited to property damage, personal injury, or financial loss resulting from reliance on cure-time estimates.',
          },
          {
            title: '5. Accuracy of Information',
            body: 'We endeavour to source calculation parameters from manufacturer Technical Data Sheets and to verify them before publication. However, manufacturers change formulations without notice, and regional product variants may differ. We cannot guarantee that all data is current or accurate for your specific product lot.',
          },
          {
            title: '6. Affiliate Links',
            body: null,
            children: (
              <p>This Site may contain affiliate links to retailers. If you purchase a product through an affiliate link, we may earn a commission at no extra cost to you. See our{' '}
              <a href="/disclosure" className="underline transition-colors" style={{ color: 'var(--gold)' }}>Affiliate Disclosure</a>{' '}
              for full details. Affiliate relationships do not influence our calculator results or data.</p>
            ),
          },
          {
            title: '7. Intellectual Property',
            body: 'The text, design, and code on this Site are owned by DIY Cure Time Calculator and may not be reproduced or redistributed without permission. Calculator results generated from your own inputs are yours to use freely.',
          },
          {
            title: '8. Changes to Terms',
            body: 'We reserve the right to modify these Terms at any time. The "Last updated" date will reflect changes. Continued use of the Site constitutes acceptance of the updated Terms.',
          },
          {
            title: '9. Governing Law',
            body: 'These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
          },
          {
            title: '10. Contact',
            body: null,
            children: (
              <p>For any questions about these Terms, contact:{' '}
              <a href="mailto:diycurecalc@outlook.com" className="underline transition-colors" style={{ color: 'var(--gold)' }}>diycurecalc@outlook.com</a></p>
            ),
          },
        ].map((s) => (
          <section
            key={s.title}
            className="rounded-lg p-5"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
          >
            <h2 className="font-bold mb-3" style={{ color: 'var(--gold-bright)' }}>{s.title}</h2>
            {s.body ? <p>{s.body}</p> : s.children}
          </section>
        ))}
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  )
}
