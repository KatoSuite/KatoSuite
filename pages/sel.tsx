import Image from "next/image";
import SEOHead from "../components/SEOHead";
import { altFrom } from "../lib/altText";

export default function SELPage() {
  return (
    <>
      <SEOHead
        title="SEL Activities for Preschool & Early Childhood"
        description="Promote emotional readiness and empathy with KatoSuite’s SEL activities. Bilingual, inclusive, and developmentally appropriate."
        keywords="SEL preschool activities, emotional readiness worksheets, social emotional learning tools"
        canonical="https://katosuite.com/sel"
        url="https://katosuite.com/sel"
      />
      <main>
        <Image
          src="/hero/sel.png"
          width={1280}
          height={720}
          alt={altFrom(
            "SEL activity page showing emotion cards and classroom discussion prompts.",
            "Page d’activité SEL présentant des cartes d’émotions et des questions de discussion pour la classe."
          )}
        />
      </main>
    </>
  );
}
