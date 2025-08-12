import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Play, ArrowRight, Sparkles, Users, Camera, Globe, Search } from 'lucide-react'

export default function HomePage() {
  const features = [
    { icon: <Sparkles className="h-6 w-6 text-blue-600" />, title: 'KatoKits AI Generator', desc: 'Create lesson plans and printables by age, theme, and domain in seconds. HDLH / ELF / FLIGHT tags.' },
    { icon: <Users className="h-6 w-6 text-purple-600" />, title: 'Child Profiles & Reports', desc: 'Track milestones and generate monthly PDFs for families and admins.' },
    { icon: <Camera className="h-6 w-6 text-green-600" />, title: 'Image → Lesson', desc: 'Upload a worksheet or photo—AI turns it into a multi-domain plan.' },
    { icon: <Globe className="h-6 w-6 text-orange-600" />, title: 'Inclusive & Bilingual', desc: 'EN/FR content, multicultural names/holidays, neurodivergent supports.' },
    { icon: <Search className="h-6 w-6 text-indigo-600" />, title: 'Library & Smart Search', desc: '200+ starter plans plus unlimited AI content, filterable by age & domain.' },
  ]

  const jsonLdSoftware = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'KatoSuite',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description:
      'AI-powered lesson planning, printables, observations, and reports for early childhood educators (EN/FR, Canada).',
    inLanguage: ['en-CA', 'fr-CA'],
    url: 'https://katosuite.com',
    offers: { '@type': 'AggregateOffer', priceCurrency: 'CAD', lowPrice: '0', highPrice: '69.99', offerCount: 8, url: 'https://katosuite.com/pricing' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }} />

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-block mb-4 rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800">🇨🇦 Built for Canadian Educators</p>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
              AI-Powered Learning <span className="text-blue-600">Made Simple</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Create lesson plans, SEL stories, and activities instantly — with EN/FR support and framework tags for HDLH, ELF, and FLIGHT.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/ai" className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center">
                <Play className="mr-2 h-5 w-5" /> Start Creating
              </Link>
              <Link href="/pricing" className="px-6 py-3 rounded-lg border hover:bg-gray-50 inline-flex items-center">
                <ArrowRight className="mr-2 h-5 w-5" /> View Pricing
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Secure Stripe checkout • Cancel anytime • EN/FR</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 border">
            <Image
              src="https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/b317d794-4039-404f-8e7f-d1ae71e5bb08-MVRXCzFmh1zozCnv3WrUwqBWFResmx"
              alt="KatoSuite AI lesson plan generator screenshot"
              width={640}
              height={420}
              className="rounded-lg w-full h-auto"
              priority
            />
            <div className="mt-3 text-xs text-gray-500">Autumn Leaf PDF style • Framework tags • Printable bundles</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Complete Learning Ecosystem</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="border-2 rounded-xl p-5 hover:shadow-md transition">
                <div className="p-2 bg-blue-50 rounded-lg w-fit mb-3" aria-hidden="true">{f.icon}</div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="text-3xl lg:text-4xl font-bold">Ready to save hours each week?</h3>
          <p className="text-blue-100 mt-3">Join educators who plan and report faster with KatoSuite.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai" className="px-6 py-3 rounded-lg bg-white text-blue-700 hover:bg-blue-50 inline-flex items-center">
              <Play className="mr-2 h-5 w-5" /> Try Free Demo
            </Link>
            <Link href="/pricing" className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-blue-700">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

