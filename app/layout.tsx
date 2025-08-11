import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://katosuite.com'),
  title: 'KatoSuite — AI Lesson Plans, Printables & Reports (EN/FR)',
  description:
    'AI-powered lesson planning, printables, observations, and reports for early childhood educators (EN/FR, Canada).',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KatoSuite',
    url: 'https://katosuite.com',
    inLanguage: ['en-CA', 'fr-CA'],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://katosuite.com/search?q={query}',
      'query-input': 'required name=query',
    },
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://katosuite.com/" />
        <meta name="theme-color" content="#2563EB" />
        <meta name="keywords" content="AI lesson plan generator, preschool, HDLH, ELF, FLIGHT, printables, Canada" />
        <meta property="og:title" content="KatoSuite — AI Lesson Plans, Printables & Reports" />
        <meta property="og:description" content="Create lesson plans in seconds. EN/FR, Canadian frameworks." />
        <meta property="og:image" content="https://katosuite.com/og/katosuite.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }} />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

