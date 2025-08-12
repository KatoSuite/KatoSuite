import Link from "next/link";

export function KatoHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-gray-900">KatoSuite</Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/ai" className="hover:text-blue-600" aria-label="AI Lesson Planner">AI Lesson Planner</Link>
          <Link href="/printables" className="hover:text-blue-600" aria-label="Printable Worksheets">Printables</Link>
          <Link href="/sel" className="hover:text-blue-600" aria-label="SEL Activities">SEL</Link>
          <Link href="/library" className="hover:text-blue-600" aria-label="Lesson Library">Library</Link>
          <Link href="/pricing" className="hover:text-blue-600" aria-label="Pricing">Pricing</Link>
          <Link href="/blog" className="hover:text-blue-600" aria-label="Blog">Blog</Link>
          <Link href="/about" className="hover:text-blue-600" aria-label="About">About</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="px-3 py-1.5 rounded-lg border">Sign In</Link>
          <Link href="/pricing" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Start Free</Link>
        </div>
      </div>
    </header>
  );
}

export default KatoHeader;
