'use client'

import { useState } from 'react'
import { addons } from './data'

const plans = [
  { id: 'free', name: 'Free', price: 0, desc: '3 AI credits/month, previews' },
  { id: 'printables', name: 'Printables', price: 7.99, desc: 'Unlimited worksheets & coloring pages' },
  { id: 'library', name: 'Library', price: 7.99, desc: '100+ lessons, unlimited exports' },
  { id: 'basic', name: 'Starter', price: 14.99, desc: '25 AI credits, 1 child profile' },
  { id: 'student', name: 'Student', price: 17.99, desc: 'Unlimited AI, 2 profiles' },
  { id: 'home', name: 'Home Educator', price: 21.99, desc: 'Unlimited AI, 3 profiles, family dashboard' },
  { id: 'educator', name: 'Educator', price: 29.99, desc: 'Reports, observations, 3 profiles' },
  { id: 'center-max', name: 'Center Max', price: 69.99, desc: 'Teams, analytics, API, unlimited children' },
]

const jsonLdPricing = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'KatoSuite Plans',
  itemListElement: plans.map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: p.price,
    priceCurrency: 'CAD',
    description: p.desc,
  })),
  addOn: addons.map((a) => ({
    '@type': 'Offer',
    name: a.title,
    price: a.price.cad,
    priceCurrency: 'CAD',
    description: a.description.en,
  })),
}

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const checkout = async (plan: string) => {
    try {
      setLoading(plan)
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'stripe', plan, addons: [] }),
      })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
    } finally {
      setLoading(null)
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPricing) }}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">Simple, transparent pricing</h1>
        <p className="text-center text-gray-600 mb-10">Secure Stripe checkout • Cancel anytime</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.id} className="border rounded-xl p-6 hover:shadow-md transition flex flex-col">
              <div className="text-sm font-semibold text-blue-700">{p.name}</div>
              <div className="mt-2 text-3xl font-extrabold">
                {p.price === 0 ? 'Free' : `$${p.price.toFixed(2)} CAD`}
              </div>
              <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
              <ul className="mt-4 text-sm text-gray-700 space-y-1">
                <li>• EN/FR support</li>
                <li>• PDF exports (paid)</li>
                <li>• Library previews (free)</li>
              </ul>
              <button
                onClick={() => checkout(p.id)}
                disabled={!!loading}
                className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading === p.id ? 'Redirecting…' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
      </section>
    </>
  )
}

