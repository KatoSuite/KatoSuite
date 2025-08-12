import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
 codex/add-opengraph-and-twitter-fields
import { DEFAULT_META } from '@/seo/seo-schema'

 main

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  ...DEFAULT_META,
  metadataBase: new URL('https://katosuite.com'),
 codex/add-opengraph-and-twitter-fields

  title: 'KatoSuite — AI Lesson Plans, Printables & Reports (EN/FR)',
  description:
    'AI-powered lesson planning, printables, observations, and reports for early childhood educators (EN/FR, Canada).',
  keywords:
    'AI lesson plan generator, Montessori homeschool lesson plans, plans de leçons Montessori à la maison, preschool, HDLH, ELF, FLIGHT, Canada',
  openGraph: {
    title: 'Montessori Homeschool Lesson Plans | Plans de leçons Montessori à la maison',
    description: 'Create Montessori homeschool lesson plans and printables in seconds. English & French.',
    url: 'https://katosuite.com',
    siteName: 'KatoSuite',
    images: [
      {
        url: 'https://katosuite.com/og/katosuite.png',
        width: 1200,
        height: 630,
        alt: 'KatoSuite Montessori homeschool lesson plans',
      },
    ],
    locale: 'en_CA',
    alternateLocale: ['fr_CA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Montessori Homeschool Lesson Plans | Plans de leçons Montessori à la maison',
    description: 'AI-powered Montessori homeschool lesson plans and printables in English and French.',
    images: ['https://katosuite.com/og/katosuite.png'],
  },
 main
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
        <meta
          name="keywords"
          content="AI lesson plan generator, Montessori homeschool lesson plans, plans de leçons Montessori à la maison, preschool, HDLH, ELF, FLIGHT, Canada"
        />
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

