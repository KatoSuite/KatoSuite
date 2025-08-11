export default function ShopPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-3">Kit Shop</h1>
        <p className="text-gray-600 mb-6">Build hands-on learning kits that match your digital plans.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-xl p-5">
            <div className="text-sm text-gray-500">Bundle</div>
            <h3 className="font-semibold">Autumn Storytelling Pack</h3>
            <p className="text-sm text-gray-600 mt-1">$39.99 CAD</p>
          </div>
        </div>
      </div>
    </section>
  )
}

