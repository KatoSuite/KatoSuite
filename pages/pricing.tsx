import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const tiers = [
  { key:"free",       name:"Free",       price:"$0",       bullets:["3 AI plans/month","Preview printables","No exports"], cta:"Get Started" },
  { key:"printables", name:"Printables", price:"$7.99",    bullets:["Unlimited printables","Download & print","No AI"],    cta:"Choose Plan" },
  { key:"library",    name:"Library",    price:"$7.99",    bullets:["100+ lessons library","Unlimited exports","No AI"],   cta:"Choose Plan" },
  { key:"basic",      name:"Basic",      price:"$14.99",   bullets:["25 AI plans/month","1 child profile","3 shop credits"], cta:"Choose Basic" },
  { key:"student",    name:"Student",    price:"$17.99",   bullets:["Unlimited AI & printables","2 child profiles","10% shop discount"], cta:"Choose Student" },
  { key:"home",       name:"Home",       price:"$21.99",   bullets:["Unlimited AI & printables","3 child profiles","Family dashboard"], cta:"Choose Home" },
  { key:"educator",   name:"Educator",   price:"$29.99",   bullets:["Unlimited AI","3 child profiles","Reports & observations"], cta:"Start Educator" },
  { key:"katocares",  name:"KatoCares",  price:"$12.99",   bullets:["25 AI plans/month","Unlimited printables","1 child profile"], cta:"Apply Now" },
  { key:"center_pro", name:"Center Pro", price:"$39.99",   bullets:["Unlimited AI","10 child profiles","Team access"], cta:"Start Center Pro" },
  { key:"center_max", name:"Center Max", price:"$69.99",   bullets:["Unlimited AI & children","Advanced analytics","Custom branding"], cta:"Start Center Max" }
];

export default function PricingPage(){
  useEffect(()=>{ window.scrollTo(0,0); },[]);
  const checkout = async (key:string) => {
    const res = await fetch("/api/billing/checkout",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ plan:key, addons:[] }) });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const rows = [] as typeof tiers[];
  for (let i=0;i<tiers.length;i+=3) rows.push(tiers.slice(i,i+3));

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Simple, affordable pricing</h1>
      <p className="text-center text-gray-600 mb-10">Annual plans get 2 months free.</p>
      {rows.map((row,idx)=>(
        <div key={idx} className={`grid md:grid-cols-3 gap-6 ${idx>0?"mt-6":""}`}>
          {row.map(t => (
            <div key={t.key} className="rounded-2xl border p-6 bg-white shadow-sm relative">
              {t.key==="basic" && <span className="absolute -top-3 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">Most Popular</span>}
              {t.key==="center_max" && <span className="absolute -top-3 left-4 bg-purple-600 text-white text-xs px-2 py-1 rounded">Best for Centers</span>}
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
      ))}
    </div>
  );
}
