import Image from "next/image";
import SEOHead from "../components/SEOHead";
import { getAlt } from "../lib/altText";

export default function HomePage() {
  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KatoSuite",
    "url": "https://katosuite.com",
    "logo": "https://katosuite.com/og/katosuite.png",
    "sameAs": [
      "https://www.instagram.com/katosuite",
      "https://www.tiktok.com/@katosuite"
    ]
  }];

  return (
    <>
      <SEOHead
        title="KatoSuite — AI Lesson Plans, Printables & Child Progress Tracking (EN/FR)"
        description="Create lesson plans in 30 seconds, export printables, and track child progress with KatoSuite’s AI-powered education platform. Canadian frameworks (HDLH, ELF, FLIGHT) + bilingual resources."
        keywords="AI lesson plans, preschool printables, Canadian education, HDLH, ELF, FLIGHT, SEL, bilingual, early childhood, teacher tools"
        url="https://katosuite.com/"
        canonical="https://katosuite.com/"
        jsonLd={jsonLd}
      />
      <main>
        <Image
          src="/hero/dashboard.png"
          width={1280}
          height={720}
          alt={altFrom(
            "Screenshot of KatoSuite dashboard showing AI lesson generator and printable library.",
            "Capture d’écran du tableau de bord KatoSuite affichant le générateur de leçons IA et la bibliothèque d’imprimables."
          )}
          priority
        />
      </main>
    </>
  );
}
