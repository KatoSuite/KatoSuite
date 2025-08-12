import SEOHead from "../components/SEOHead";

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About KatoSuite"
        description="Learn more about KatoSuite's mission to support educators with AI tools and bilingual resources."
        canonical="https://katosuite.com/about"
        url="https://katosuite.com/about"
      />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">About KatoSuite</h1>
        <p>KatoSuite helps educators create lesson plans, printables, and track child progress.</p>
      </main>
    </>
  );
}
