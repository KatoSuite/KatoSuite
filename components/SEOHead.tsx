import Head from "next/head";
import { DEFAULT_META } from "../seo/seo-schema";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  structuredData?: Record<string, any>;
}

export default function SEOHead({ title, description, keywords, structuredData }: Props) {
  const meta = { ...DEFAULT_META, title, description, keywords };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "KatoSuite",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": [
      { "@type": "Offer", "priceCurrency": "CAD", "price": "0", "name": "Free" },
      { "@type": "Offer", "priceCurrency": "CAD", "price": "7.99", "name": "Printables" },
      { "@type": "Offer", "priceCurrency": "CAD", "price": "7.99", "name": "Library" },
      { "@type": "Offer", "priceCurrency": "CAD", "price": "14.99", "name": "Starter" },
      { "@type": "Offer", "priceCurrency": "CAD", "price": "29.99", "name": "Educator" },
      { "@type": "Offer", "priceCurrency": "CAD", "price": "89.99", "name": "Pro+" }
    ],
    "description": "AI lesson planning and early learning toolkit."
  };

  const schema = structuredData || productSchema;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Head>
  );
}
