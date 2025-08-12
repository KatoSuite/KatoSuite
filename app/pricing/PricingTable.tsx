"use client"

import { useEffect, useMemo, useState } from 'react'

interface Plan {
  id: string
  name: string
  price: string
  features: string[]
}

const plans: Plan[] = [
  { id: 'free', name: 'Free', price: '$0', features: ['3 AI plans/month', 'Preview printables', 'No exports'] },
  { id: 'printables', name: 'Printables', price: '$7.99', features: ['Unlimited printables', 'Download & print', 'No AI'] },
  { id: 'library', name: 'Library', price: '$7.99', features: ['100+ lessons library', 'Unlimited exports', 'No AI'] },
  { id: 'basic', name: 'Basic', price: '$14.99', features: ['25 AI plans/month', '1 child profile', '3 shop credits'] },
  { id: 'student', name: 'Student', price: '$17.99', features: ['Unlimited AI & printables', '2 child profiles', '10% shop discount'] },
  { id: 'home', name: 'Home', price: '$21.99', features: ['Unlimited AI & printables', '3 child profiles', 'Family dashboard'] },
  { id: 'educator', name: 'Educator', price: '$29.99', features: ['Unlimited AI', '3 child profiles', 'Reports & observations'] },
  { id: 'center_pro', name: 'Center Pro', price: '$39.99', features: ['Unlimited AI', '10 child profiles', 'Team access'] },
  { id: 'center_max', name: 'Center Max', price: '$69.99', features: ['Unlimited AI & children', 'Advanced analytics', 'Custom branding'] },
]

export default function PricingTable() {
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState(query)

  // Debounce user input for a smoother filtering experience
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  const filteredPlans = useMemo(() => {
    const lower = debounced.toLowerCase()
    return plans.filter((plan) => {
      const searchTarget = `${plan.id} ${plan.name} ${plan.features.join(' ')}`.toLowerCase()
      return searchTarget.includes(lower)
    })
  }, [debounced])

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Search plans..."
        className="border rounded px-3 py-2 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="border rounded-xl p-6 flex flex-col">
            <div className="text-sm font-semibold text-blue-700">{plan.name}</div>
            <div className="mt-2 text-3xl font-extrabold">{plan.price}<span className="text-base text-gray-500">/mo</span></div>
            <ul className="mt-4 text-sm text-gray-700 space-y-1 flex-1">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
