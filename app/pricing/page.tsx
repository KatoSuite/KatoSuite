'use client'

import { useState } from 'react'
import { addons } from './data'

const plans = [
  {
    id: 'free',
    name: { en: 'Free', fr: 'Gratuit' },
    price: { cad: 0, usd: 0 },
    desc: { en: '3 AI credits/month, previews', fr: '3 crédits IA/mois, aperçus' },
  },
  {
    id: 'printables',
    name: { en: 'Printables', fr: 'Imprimables' },
    price: { cad: 7.99, usd: 6.39 },
    desc: {
      en: 'Unlimited worksheets & coloring pages',
      fr: 'Feuilles d\'exercices et pages à colorier illimitées',
    },
  },
  {
    id: 'library',
    name: { en: 'Library', fr: 'Bibliothèque' },
    price: { cad: 7.99, usd: 6.39 },
    desc: {
      en: '100+ lessons, unlimited exports',
      fr: '100+ leçons, exportations illimitées',
    },
  },
  {
    id: 'basic',
    name: { en: 'Starter', fr: 'Démarrage' },
    price: { cad: 14.99, usd: 11.99 },
    desc: { en: '25 AI credits, 1 child profile', fr: '25 crédits IA, 1 profil enfant' },
  },
  {
    id: 'student',
    name: { en: 'Student', fr: 'Étudiant' },
    price: { cad: 17.99, usd: 14.39 },
    desc: { en: 'Unlimited AI, 2 profiles', fr: 'IA illimitée, 2 profils' },
  },
  {
    id: 'home',
    name: { en: 'Home Educator', fr: 'Éducateur à domicile' },
    price: { cad: 21.99, usd: 17.59 },
    desc: {
      en: 'Unlimited AI, 3 profiles, family dashboard',
      fr: 'IA illimitée, 3 profils, tableau de bord familial',
    },
  },
  {
    id: 'educator',
    name: { en: 'Educator', fr: 'Éducateur' },
    price: { cad: 29.99, usd: 23.99 },
    desc: { en: 'Reports, observations, 3 profiles', fr: 'Rapports, observations, 3 profils' },
  },
  {
    id: 'center-max',
    name: { en: 'Center Max', fr: 'Centre Max' },
    price: { cad: 69.99, usd: 55.99 },
    desc: {
      en: 'Teams, analytics, API, unlimited children',
      fr: 'Équipes, analyses, API, enfants illimités',
    },
  },
]

const addonNamesFr: Record<string, string> = {
  'ai_topup_15': 'Recharge IA (15)',
  'ai_topup_50': 'Recharge IA (50)',
  'child_x3': '3 enfants supplémentaires',
  'child_x6': '6 enfants supplémentaires',
  'reports': 'Rapports de progrès',
  'reports_bulk': 'Rapports en lot',
  'yearbook': "Créateur d'album de fin d'année",
  'seat': "Siège d'éducateur supplémentaire",
  'library': 'Bibliothèque de leçons',
  'observations': 'Observations',
  'discount_shop': 'Rabais boutique',
  'family_dash': 'Tableau de bord familial',
  'analytics': 'Analytique avancée',
  'api_access': 'Accès API',
  'branding': 'Image de marque personnalisée',
}

const jsonLdPricing = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'KatoSuite Plans',
  itemListElement: [
    ...plans.map((p) => ({
      '@type': 'Offer',
      url: `https://katosuite.com/pricing#${p.id}`,
      name: [
        { '@language': 'en', '@value': p.name.en },
        { '@language': 'fr', '@value': p.name.fr },
      ],
      description: [
        { '@language': 'en', '@value': p.desc.en },
        { '@language': 'fr', '@value': p.desc.fr },
      ],
      priceSpecification: [
        { '@type': 'PriceSpecification', price: p.price.cad, priceCurrency: 'CAD' },
        { '@type': 'PriceSpecification', price: p.price.usd, priceCurrency: 'USD' },
      ],
    })),
    ...addons.map((a) => ({
      '@type': 'Offer',
      url: `https://katosuite.com/pricing#${a.id}`,
      name: [
        { '@language': 'en', '@value': a.title },
        { '@language': 'fr', '@value': addonNamesFr[a.id] || a.title },
      ],
      description: [
        { '@language': 'en', '@value': a.description.en },
        { '@language': 'fr', '@value': a.description.fr },
      ],
      priceSpecification: [
        { '@type': 'PriceSpecification', price: a.price.cad, priceCurrency: 'CAD' },
        { '@type': 'PriceSpecification', price: a.price.usd, priceCurrency: 'USD' },
      ],
    })),
  ],
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
              <div className="text-sm font-semibold text-blue-700">{p.name.en}</div>
              <div className="mt-2 text-3xl font-extrabold">
                {p.price.cad === 0 ? 'Free' : `$${p.price.cad.toFixed(2)} CAD`}
              </div>
              <p className="text-sm text-gray-600 mt-2">{p.desc.en}</p>
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

