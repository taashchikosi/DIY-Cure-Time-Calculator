import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <Link href="/" className="text-lg font-semibold text-zinc-900 hover:text-zinc-700">
          DIY Cure Time Calculator
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-4 text-sm text-zinc-600">
            <li>
              <Link href="/" className="hover:text-zinc-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-zinc-900">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-zinc-900">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/disclosure" className="hover:text-zinc-900">
                Disclosure
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
