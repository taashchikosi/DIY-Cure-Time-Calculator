import Link from 'next/link'

export default function Header() {
  return (
    <header style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-dim)' }}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="flex items-center justify-center w-9 h-9 rounded font-black text-base shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, #a06518 100%)',
              color: 'var(--bg-main)',
              clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
            }}
          >
            C
          </div>
          <span
            className="font-bold text-sm leading-tight"
            style={{ color: 'var(--cream)' }}
          >
            DIY Cure Time<br />
            <span style={{ color: 'var(--gold)' }}>Calculator</span>
          </span>
        </Link>

        {/* Nav */}
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-5 text-sm" style={{ color: 'var(--cream-muted)' }}>
            <li>
              <Link href="/" className="hover:text-[--cream] transition-colors" style={{}}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[--cream] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[--cream] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/category/construction-adhesive"
                className="hidden sm:inline hover:text-[--cream] transition-colors"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
