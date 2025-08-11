import Image from "next/image";
import Script from "next/script";
import SEOHead from "../components/SEOHead";
import { altFrom } from "../lib/altText";

export default function PricingPage() {
  return (
    <>
      <SEOHead
        title="KatoSuite Pricing — Affordable AI Tools for Teachers & Schools"
        description="Choose from Starter, Pro, or School plans. Get AI lesson planning, bilingual printables, and progress tracking tools starting at $14.99/month."
        keywords="KatoSuite pricing, education SaaS plans, AI for teachers, bilingual lesson plans, preschool tools"
        canonical="https://katosuite.com/pricing"
        url="https://katosuite.com/pricing"
      />
      <Script id="offer-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "KatoSuite Pricing",
          itemListElement: Object.entries({
            Printables: 7.99,
            Library: 7.99,
            Starter: 14.99,
            Student: 17.99,
            "Home Educator": 21.99,
            Educator: 29.99,
            "Center Max": 69.99,
          }).map(([name, price]) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
              provider: { "@type": "Organization", name: "KatoSuite" },
            },
            price,
            priceCurrency: "CAD",
            availability: "https://schema.org/InStock",
          })),
        })}
      </Script>
      <main>
        <Image
          src="/hero/pricing.png"
          width={1280}
          height={720}
          alt={altFrom(
            "Pricing table showing Starter, Pro, and School plans with features and call-to-action buttons.",
            "Tableau des prix présentant les forfaits Starter, Pro et École avec fonctionnalités et boutons d’appel à l’action."
          )}
        />
      </main>
    </>
  );
}
