import Head from "next/head";
 codex/create-security-middleware-with-helmet-and-cors

export type SEOHeadProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  canonical?: string;
  keywords?: string;
  locale?: "en-CA" | "fr-CA";
  jsonLd?: object | object[];
  noindex?: boolean;
};

export function SEOHead({
  title = "KatoSuite — AI Lesson Plans, Printables & Child Tracking (EN/FR, Canada)",
  description = "Create lesson plans in 30 seconds, export printables, and track child progress. Canadian frameworks (HDLH/ELF/FLIGHT).",
  url = "https://katosuite.com",
  image = "https://katosuite.com/og/katosuite.png",
  canonical = "https://katosuite.com",
  keywords = "AI lesson plans, preschool printables, HDLH, ELF, FLIGHT, SEL activities, Canadian education, bilingual",
  locale = "en-CA",
  jsonLd,
  noindex = false,
}: SEOHeadProps) {
  const ld = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  return (
    <Head>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content="KatoSuite" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Localization / hreflang */}
      <meta httpEquiv="content-language" content="en-CA, fr-CA" />
      <link rel="alternate" href="https://katosuite.com" hrefLang="en-ca" />
      <link rel="alternate" href="https://katosuite.com/fr" hrefLang="fr-ca" />
      <link rel="alternate" href="https://katosuite.com" hrefLang="x-default" />

      {/* Icons / PWA */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#2563eb" />

      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* example font preload (swap to yours) */}
      {/* <link rel="preload" as="font" href="/fonts/inter-var.woff2" type="font/woff2" crossOrigin="anonymous" /> */}

      {/* Structured Data */}
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
    </Head>
  );
}

export default SEOHead;

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
      { "@type": "Offer", "priceCurrency": "CAD", "price": "14.99", "name": "Basic" },
      { "@type": "Offer", "priceCurrency": "CAD", "price": "29.99", "name": "Educator" },
      { "@type": "Offer", "priceCurrency": "CAD", "price": "69.99", "name": "Center Max" }
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
 main
