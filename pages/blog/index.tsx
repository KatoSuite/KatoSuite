import Link from "next/link";
import Image from "next/image";
import SEOHead from "../../components/SEOHead";
import { altFrom } from "../../lib/altText";

const posts = [
  {
    slug: "ai-lesson-plans",
    title: "🤖 Harnessing AI for Preschool Lesson Plans",
    summary: "Use smart prompts to generate HDLH-aligned activities in seconds.",
    category: "AI & Technology",
    readTime: "4 min read",
    image: "/blog/ai-lesson-plans.png",
    altEn: "Teacher leveraging AI to plan a preschool lesson on a laptop.",
    altFr: "Enseignant utilisant l’IA pour planifier une leçon préscolaire sur un ordinateur portable.",
    published: true,
  },
  {
    slug: "child-development-milestones",
    title: "🌱 Understanding Child Development Milestones",
    summary: "Track social, emotional, and cognitive growth from ages 2–6.",
    category: "Child Development",
    readTime: "5 min read",
    image: "/blog/child-milestones.png",
    altEn: "Child stacking blocks while educator records observations.",
    altFr: "Enfant empilant des blocs pendant que l’éducateur prend des observations.",
    published: true,
  },
  {
    slug: "parent-engagement",
    title: "👪 Family Engagement Strategies",
    summary: "Practical ways to involve parents in everyday learning.",
    category: "Parent Engagement",
    readTime: "Coming soon",
    image: "/blog/parent-engagement.png",
    altEn: "Parent and child reading together during a classroom visit.",
    altFr: "Parent et enfant lisant ensemble lors d’une visite en classe.",
    published: false,
  },
  {
    slug: "teaching-tips",
    title: "📚 Top Teaching Tips for Early Educators",
    summary: "Quick wins to keep preschoolers engaged and curious.",
    category: "Teaching Tips",
    readTime: "Coming soon",
    image: "/blog/teaching-tips.png",
    altEn: "Educator leading a circle time with enthusiastic children.",
    altFr: "Éducateur dirigeant un cercle avec des enfants enthousiastes.",
    published: false,
  },
];

export default function BlogIndex() {
  return (
    <>
      <SEOHead
        title="KatoSuite Blog — Teaching Tips & Early Learning Insights"
        description="Explore educational articles on lesson planning, child development, AI in classrooms, and family engagement."
        canonical="https://katosuite.com/blog"
        url="https://katosuite.com/blog"
        keywords="early learning blog, teaching tips, child development, AI in education, parent engagement"
      />
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Insights & Updates</h1>
        <p className="mb-8 text-gray-600">Articles to help you teach, engage families, and leverage AI.</p>
        <form className="max-w-md mx-auto flex gap-2">
          <input type="email" placeholder="Your email" className="flex-1 border rounded-lg px-3 py-2"/>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Subscribe</button>
        </form>
      </section>
      <main className="max-w-5xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-2">
        {posts.map(post => (
          <article key={post.slug} className="border rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-48 w-full">
              <Image
                src={post.image}
                alt={altFrom(post.altEn, post.altFr)}
                fill
                className="object-cover"
              />
              {!post.published && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
              )}
            </div>
            <div className="p-4 flex flex-col h-56">
              <span className="text-sm text-blue-600 font-medium mb-2">{post.category}</span>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 flex-1">{post.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">{post.readTime}</span>
                {post.published ? (
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                    Read More
                  </Link>
                ) : (
                  <button className="text-yellow-600 hover:underline">Notify Me</button>
                )}
              </div>
            </div>
          </article>
        ))}
      </main>
      <section className="bg-gray-50 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay in the loop</h2>
        <p className="mb-8 text-gray-600">Subscribe for new posts and product updates.</p>
        <form className="max-w-md mx-auto flex gap-2">
          <input type="email" placeholder="Your email" className="flex-1 border rounded-lg px-3 py-2"/>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Notify Me</button>
        </form>
      </section>
    </>
  );
}
