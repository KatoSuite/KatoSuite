'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lightbulb } from 'lucide-react'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/ai', label: 'AI' },
  { href: '/library', label: 'Library' },
  { href: '/observations', label: 'Tracking' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/shop', label: 'Shop' },
  { href: '/guides', label: 'Guides' },
  { href: '/blog', label: 'Blog' },
]

export default function Header() {
  const pathname = usePathname()
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="KatoSuite Home">
          <Lightbulb className="h-7 w-7 text-blue-600" />
          <div>
            <p className="text-sm font-semibold leading-tight">KatoSuite</p>
            <p className="text-[11px] text-gray-500 -mt-0.5">AI Learning Platform</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition
                ${isActive(n.href) ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'}
              `}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50"
            aria-label="Sign in to KatoSuite"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            aria-label="Open dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  )
}

