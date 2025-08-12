import Image from "next/image";
import SEOHead from "../../components/SEOHead";
import { altFrom } from "../../lib/altText";

export default function AILessonPlans() {
  return (
    <>
      <SEOHead
        title="Harnessing AI for Preschool Lesson Plans"
        description="Discover how educators can use KatoSuite to generate engaging, curriculum-aligned activities in seconds."
        canonical="https://katosuite.com/blog/ai-lesson-plans"
        url="https://katosuite.com/blog/ai-lesson-plans"
        keywords="AI lesson plans, early learning technology, preschool AI tools"
      />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Harnessing AI for Preschool Lesson Plans</h1>
        <Image
          src="/blog/ai-lesson-plans.png"
          width={1280}
          height={720}
          alt={altFrom(
            "Teacher leveraging AI to plan a preschool lesson on a laptop.",
            "Enseignant utilisant l’IA pour planifier une leçon préscolaire sur un ordinateur portable."
          )}
          className="rounded-lg mb-6"
        />
        <p className="mb-4">AI can help educators save time by generating ideas tailored to specific developmental goals and themes. By providing a few keywords or outcomes, KatoSuite drafts lesson objectives, materials, and printable activities.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Effective Prompts</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Specify the age group and learning framework.</li>
          <li>Include desired skills, such as fine motor or language.</li>
          <li>Mention materials you already have to personalize suggestions.</li>
        </ul>
        <p className="mb-8">Experiment with different prompt styles to see which yield the most creative results, and always review AI output for accuracy and inclusivity.</p>
        <section className="bg-gray-50 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">Get updates on new AI features</h3>
          <form className="max-w-md mx-auto flex gap-2">
            <input type="email" placeholder="Your email" className="flex-1 border rounded-lg px-3 py-2"/>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Subscribe</button>
          </form>
        </section>
      </article>
    </>
  );
}
