export default function LibraryPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Library</h1>
        <p className="text-gray-600 mb-6">200+ starter plans + your AI-generated content. Filter by age, domain, and theme.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-xl p-5">
            <div className="text-sm text-gray-500">Science & Nature</div>
            <h3 className="font-semibold">Ocean Animals (3–4)</h3>
          </div>
          <div className="border rounded-xl p-5">
            <div className="text-sm text-gray-500">Sensory</div>
            <h3 className="font-semibold">Fall Leaves Sensory (2–3)</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

