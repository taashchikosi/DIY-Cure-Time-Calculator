import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <nav aria-label="Footer navigation" className="mb-4">
          <ul className="flex flex-wrap gap-4 text-sm text-zinc-500">
            <li>
              <Link href="/privacy" className="hover:text-zinc-800">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-zinc-800">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-zinc-800">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-zinc-800">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/disclosure" className="hover:text-zinc-800">
                Affiliate Disclosure
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-xs text-zinc-400">
          &copy; {year} DIY Cure Time Calculator. Results are estimates only. Always follow
          manufacturer instructions. Not suitable for structural, load-bearing, or safety-critical
          applications.
        </p>
      </div>
    </footer>
  )
}
