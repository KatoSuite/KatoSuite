import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="text-lg font-semibold">KatoSuite</div>
          <p className="text-gray-400 text-sm">AI tools for early childhood educators. Built in Canada (EN/FR).</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Platform</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/ai" className="hover:text-white">AI Generator</Link></li>
            <li><Link href="/library" className="hover:text-white">Library</Link></li>
            <li><Link href="/observations" className="hover:text-white">Child Tracking</Link></li>
            <li><Link href="/shop" className="hover:text-white">Kit Shop</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>

        <div className="text-sm text-gray-300 space-y-2">
          <div>Payments by Stripe • Cancel anytime</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
          <div className="pt-4 flex gap-3">
            <Link href="/" aria-label="English">🇨🇦 English</Link>
            <Link href="/fr" aria-label="Français">🇫🇷 Français</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 text-xs text-gray-400 flex justify-between">
          <span>© 2025 KatoSuite</span>
          <span>Purple • Blue • Orange • Green</span>
        </div>
      </div>
    </footer>
  )
}

