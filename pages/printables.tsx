import Image from "next/image";
import SEOHead from "../components/SEOHead";
import { altFrom } from "../lib/altText";

export default function PrintablesPage() {
  return (
    <>
      <SEOHead
        title="Printable Worksheets & Coloring Books — Bilingual & Curriculum-Aligned"
        description="Browse hundreds of printable worksheets, coloring pages, and activity packs for preschool and early grades. Available in English and French."
        keywords="printable worksheets, preschool coloring books, bilingual teaching resources, curriculum-aligned printables"
        canonical="https://katosuite.com/printables"
        url="https://katosuite.com/printables"
      />
      <main>
        <Image
          src="/hero/printables.png"
          width={1280}
          height={720}
          alt={altFrom(
            "Grid of printable worksheets including alphabet tracing, numbers, and coloring pages.",
            "Grille de fiches imprimables comprenant le traçage des lettres, des chiffres et des pages à colorier."
          )}
        />
      </main>
    </>
  );
}
