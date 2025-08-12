'use client'

import { useMemo, useState } from 'react'
import catalog from '../../server/billing/products.json'
import type { BillingCatalog, Plan, Addon } from '../../types/billing'
import { formatMoney, Curr } from '../../lib/currency'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing & Plans | KatoSuite',
  description:
    'Montessori homeschool & AI lesson plans with bilingual printables. Monthly plans in CAD and USD.',
  openGraph: {
    title: 'Montessori homeschool lesson plans | Plans de leçons Montessori à la maison',
    description:
      'AI-generated Montessori lesson plans and printables in English and French.',
    images: [
      {
        url: 'https://katosuite.com/og/katosuite.png',
        alt: 'KatoSuite Montessori homeschool lesson plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Montessori homeschool lesson plans | Plans de leçons Montessori à la maison',
    description:
      'AI Montessori homeschool lesson plans and printables in English and French.',
    images: ['https://katosuite.com/og/katosuite.png'],
  },
}

const data = catalog as BillingCatalog

export default function PricingPage() {
  const [curr, setCurr] = useState<Curr>('cad')
  const [q, setQ] = useState('')

  const plans = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return data.plans
    return data.plans.filter((p) =>
      [p.id, p.name.en, p.name.fr, ...(p.features || [])]
        .join(' ')
        .toLowerCase()
        .includes(term)
    )
  }, [q])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'KatoSuite – Montessori Homeschool & AI Lesson Plans',
    description:
      'AI lesson plan generator, Montessori homeschool curriculum, printable worksheets. Plans in CAD and USD.',
    brand: { '@type': 'Brand', name: 'KatoSuite' },
    offers: [
      {
        '@type': 'AggregateOffer',
        priceCurrency: curr.toUpperCase(),
        lowPrice: '0',
        highPrice: String(Math.max(...data.plans.map((p) => p.price[curr]))),
        offerCount: String(data.plans.length),
        url: 'https://katosuite.com/pricing',
        availability: 'https://schema.org/InStock',
      },
    ],
    keywords: [
      'AI lesson plan generator',
      'Montessori homeschool lesson plans',
      'printable worksheets for teachers',
      'bilingual preschool printables',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Pricing & Plans</h1>
          <div className="flex gap-3">
            <select
              value={curr}
              onChange={(e) => setCurr(e.target.value as Curr)}
              className="border rounded-md px-3 py-2"
            >
              <option value="cad">CAD</option>
              <option value="usd">USD</option>
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search plans / IDs / features"
              className="border rounded-md px-3 py-2 w-64"
            />
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((p: Plan) => (
            <article
              key={p.id}
              className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="text-xs text-slate-500 mb-1">ID: {p.id}</div>
              <h2 className="text-xl font-semibold">{p.name.en}</h2>
              <div className="mt-2 text-2xl font-bold">
                {formatMoney(p.price[curr], curr)}{' '}
                <span className="text-sm font-normal">/month</span>
              </div>
              <ul className="mt-3 space-y-1 text-sm">
                {p.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="mt-12 mb-4 text-2xl font-bold">Add-Ons</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.addons as Addon[]).map((a) => (
            <article key={a.id} className="rounded-2xl border p-5 shadow-sm">
              <div className="text-xs text-slate-500 mb-1">ID: {a.id}</div>
              <h4 className="text-lg font-semibold">{a.name.en}</h4>
              <div className="mt-2 text-lg font-bold">
                {formatMoney(a.price[curr], curr)}{' '}
                <span className="text-sm font-normal">/month</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
