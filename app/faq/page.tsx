export default function FAQPage() {
  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Is there a free plan?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — 3 AI credits/month plus previews.' } },
      { '@type': 'Question', name: 'Can I export PDFs?', acceptedAnswer: { '@type': 'Answer', text: 'Yes on paid plans, with Autumn Leaf formatting.' } },
      { '@type': 'Question', name: 'Do you support English and French?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, EN/FR across the app and many resources.' } },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">FAQ</h1>
          <div className="mt-6 space-y-4">
            <details className="border rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">Is there a free plan?</summary>
              <p className="mt-2 text-gray-700">Yes — 3 AI credits/month plus library previews.</p>
            </details>
            <details className="border rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">Can I export PDFs?</summary>
              <p className="mt-2 text-gray-700">Yes on paid plans, using our Autumn Leaf template.</p>
            </details>
            <details className="border rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">Do you support English and French?</summary>
              <p className="mt-2 text-gray-700">Yes, EN/FR are supported across the app.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  )
}

