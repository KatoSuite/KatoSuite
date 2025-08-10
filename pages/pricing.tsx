import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const tiers = [
  { key:"free",       name:"Free",       price:"$0",       bullets:["3 AI plans/month","Preview printables","No exports"], cta:"Get Started" },
  { key:"printables", name:"Printables", price:"$7.99",    bullets:["Unlimited printables","Download & print","No AI"],    cta:"Choose Plan" },
  { key:"library",    name:"Library",    price:"$7.99",    bullets:["100+ lessons library","Unlimited exports","No AI"],   cta:"Choose Plan" },
  { key:"basic",      name:"Starter",    price:"$14.99",   bullets:["25 AI plans/month","1 child profile","3 shop credits"], cta:"Start Starter" },
  { key:"educator",   name:"Educator",   price:"$29.99",   bullets:["Unlimited AI","3 child profiles","Reports & observations"], cta:"Start Educator" },
  { key:"pro_plus",   name:"Pro+",       price:"$89.99",   bullets:["All shop & classes","Teams & unlimited profiles","Everything in Educator"], cta:"Start Pro+" }
];

export default function PricingPage(){
  useEffect(()=>{ window.scrollTo(0,0); },[]);
  const checkout = async (key:string) => {
    const res = await fetch("/api/billing/checkout",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ plan:key, addons:[] }) });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Simple, affordable pricing</h1>
      <p className="text-center text-gray-600 mb-10">Annual plans get 2 months free.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.slice(0,3).map(t => (
          <div key={t.key} className="rounded-2xl border p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold">{t.name}</h3>
            <div className="text-3xl font-bold my-2">{t.price}<span className="text-base text-gray-500">/mo</span></div>
            <ul className="text-sm text-gray-700 space-y-2 my-4">
              {t.bullets.map(b => <li key={b}>• {b}</li>)}
            </ul>
            <Button className="w-full" onClick={()=>checkout(t.key)} aria-label={`Select ${t.name}`}>{t.cta}</Button>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {tiers.slice(3).map(t => (
          <div key={t.key} className="rounded-2xl border p-6 bg-white shadow-md relative">
            {t.key==="basic" && <span className="absolute -top-3 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">Most Popular</span>}
            {t.key==="pro_plus" && <span className="absolute -top-3 left-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">Best Value</span>}
            <h3 className="text-xl font-semibold">{t.name}</h3>
            <div className="text-3xl font-bold my-2">{t.price}<span className="text-base text-gray-500">/mo</span></div>
            <ul className="text-sm text-gray-700 space-y-2 my-4">
              {t.bullets.map(b => <li key={b}>• {b}</li>)}
            </ul>
            <Button className="w-full" onClick={()=>checkout(t.key)} aria-label={`Select ${t.name}`}>{t.cta}</Button>
            <div className="text-xs text-gray-500 mt-2">2 months free on annual</div>
          </div>
        ))}
      </div>
    </div>
  );
}
