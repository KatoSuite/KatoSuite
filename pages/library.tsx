import Image from "next/image";
import SEOHead from "../components/SEOHead";
import { altFrom } from "../lib/altText";

export default function LibraryPage() {
  return (
    <>
      <SEOHead
        title="Lesson Library — Pre-Made Themes, Units, and Bundles"
        description="Instant access to pre-made lesson plans and activity bundles on trending themes. Fully editable and bilingual."
        keywords="lesson library, pre-made preschool themes, unit plans, bilingual lesson bundles"
        canonical="https://katosuite.com/library"
        url="https://katosuite.com/library"
      />
      <main>
        <Image
          src="/hero/library.png"
          width={1280}
          height={720}
          alt={altFrom(
            "List of pre-made lesson plans including seasonal, STEM, and literacy themes.",
            "Liste de plans de leçons préétablis comprenant des thèmes saisonniers, STEM et littératie."
          )}
        />
      </main>
    </>
  );
}
