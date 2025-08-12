import Image from "next/image";
import SEOHead from "../components/SEOHead";
import { altFrom } from "../lib/altText";

export default function AIPage() {
  return (
    <>
      <SEOHead
        title="AI Lesson Planner — Create Custom Lesson Plans in 30 Seconds"
        description="Save hours with KatoSuite’s AI lesson planner. Create HDLH/ELF-aligned plans in seconds with bilingual support and printable outputs."
        keywords="AI lesson planner, preschool curriculum builder, Canadian frameworks, bilingual lesson plans"
        canonical="https://katosuite.com/ai"
        url="https://katosuite.com/ai"
      />
      <main>
        <Image
          src="/hero/ai.png"
          width={1280}
          height={720}
          alt={altFrom(
            "Teacher using AI lesson planner to generate a preschool science lesson with printable worksheets.",
            "Enseignant utilisant le planificateur de leçons IA pour générer une leçon de sciences préscolaire avec fiches imprimables."
          )}
        />
      </main>
    </>
  );
}
