import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-dim)' }}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="flex items-center justify-center w-8 h-8 rounded font-black text-sm shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--gold) 0%, #a06518 100%)',
                  color: 'var(--bg-main)',
                  clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                }}
              >
                C
              </div>
              <span className="font-bold text-xs" style={{ color: 'var(--cream)' }}>
                DIY Cure Time<br />Calculator
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--cream-muted)' }}>
              Science-backed cure time estimates adjusted for your real-world conditions.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
              Browse
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--cream-muted)' }}>
              <li><Link href="/category/epoxy" className="hover:text-[--cream] transition-colors">Epoxy</Link></li>
              <li><Link href="/category/silicone-caulk" className="hover:text-[--cream] transition-colors">Caulk & Sealant</Link></li>
              <li><Link href="/category/construction-adhesive" className="hover:text-[--cream] transition-colors">Construction</Link></li>
              <li><Link href="/category/concrete" className="hover:text-[--cream] transition-colors">Concrete</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
              Company
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--cream-muted)' }}>
              <li><Link href="/about" className="hover:text-[--cream] transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-[--cream] transition-colors">Contact</Link></li>
              <li><Link href="/disclosure" className="hover:text-[--cream] transition-colors">Disclosure</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
              Legal
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--cream-muted)' }}>
              <li><Link href="/privacy" className="hover:text-[--cream] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[--cream] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-dim)' }} className="pt-6">
          <p className="text-xs" style={{ color: 'var(--cream-dim)' }}>
            &copy; {year} DIY Cure Time Calculator. Results are estimates only. Always follow manufacturer
            instructions. Not suitable for structural, load-bearing, or safety-critical applications.
          </p>
        </div>
      </div>
    </footer>
  )
}
