export default function ContactPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-3">Contact</h1>
        <p className="text-gray-600 mb-6">Questions? Reach us at <a className="text-blue-700 underline" href="mailto:hello@katosuite.com">hello@katosuite.com</a></p>
        <form className="grid gap-3">
          <input className="border rounded-md px-3 py-2" placeholder="Name" />
          <input className="border rounded-md px-3 py-2" placeholder="Email" type="email" />
          <textarea className="border rounded-md px-3 py-2 min-h-[120px]" placeholder="Message" />
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Send</button>
        </form>
      </div>
    </section>
  )
}

