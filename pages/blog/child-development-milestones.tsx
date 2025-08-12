import Image from "next/image";
import SEOHead from "../../components/SEOHead";
import { altFrom } from "../../lib/altText";

export default function ChildDevelopmentMilestones() {
  return (
    <>
      <SEOHead
        title="Understanding Child Development Milestones"
        description="Learn how to observe and document key milestones across domains using KatoSuite."
        canonical="https://katosuite.com/blog/child-development-milestones"
        url="https://katosuite.com/blog/child-development-milestones"
        keywords="child development milestones, observation tracking, early childhood education"
      />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Understanding Child Development Milestones</h1>
        <Image
          src="/blog/child-milestones.png"
          width={1280}
          height={720}
          alt={altFrom(
            "Child stacking blocks while educator records observations.",
            "Enfant empilant des blocs pendant que l’éducateur prend des observations."
          )}
          className="rounded-lg mb-6"
        />
        <p className="mb-4">Tracking development helps educators tailor activities and communicate progress with families. KatoSuite offers observation templates aligned with HDLH, ELF, and FLIGHT frameworks.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Domains to Watch</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Social and emotional</li>
          <li>Language and communication</li>
          <li>Physical coordination</li>
        </ul>
        <p className="mb-8">Use concise notes and photo evidence to build a holistic picture of each child’s growth.</p>
        <section className="bg-gray-50 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">Join our educator newsletter</h3>
          <form className="max-w-md mx-auto flex gap-2">
            <input type="email" placeholder="Your email" className="flex-1 border rounded-lg px-3 py-2"/>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Subscribe</button>
          </form>
        </section>
      </article>
    </>
  );
}
