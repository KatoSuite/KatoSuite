export type AltOpts = {
  page?: "home" | "pricing" | "library" | "ai" | "shop" | "observations";
  subject?: string;
  audience?: string;
  context?: string;
  locale?: "en-CA" | "fr-CA";
};

export function getAlt({
  page = "home",
  subject = "educator using KatoSuite",
  audience = "preschool learners",
  context = "AI-powered lesson planning interface",
  locale = "en-CA",
}: AltOpts = {}) {
  const en = `Screenshot of ${subject} for ${audience} — ${context} (${page} page).`;
  const fr = `Capture d’écran de ${subject} pour ${audience} — ${context} (page ${page}).`;
  return locale === "fr-CA" ? fr : en;
}

export function altFrom(
  en: string,
  fr: string,
  locale: "en-CA" | "fr-CA" = "en-CA"
) {
  return locale === "fr-CA" ? fr : en;
}
