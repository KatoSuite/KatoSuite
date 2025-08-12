export interface Addon {
  id: string;
  title: string;
  price: { cad: number; usd: number };
  description: { en: string; fr: string };
}

export const addons: Addon[] = [
  {
    id: "ai_topup_15",
    title: "AI Top-Up (15)",
    price: { cad: 9.99, usd: 7.99 },
    description: {
      en: "15 extra AI credits",
      fr: "15 crédits IA supplémentaires",
    },
  },
  {
    id: "ai_topup_50",
    title: "AI Top-Up (50)",
    price: { cad: 24.99, usd: 19.99 },
    description: {
      en: "50 extra AI credits",
      fr: "50 crédits IA supplémentaires",
    },
  },
  {
    id: "child_x3",
    title: "3 Extra Children",
    price: { cad: 6.99, usd: 5.49 },
    description: {
      en: "Add three child profiles",
      fr: "Ajouter trois profils d'enfant",
    },
  },
  {
    id: "child_x6",
    title: "6 Extra Children",
    price: { cad: 12.99, usd: 9.99 },
    description: {
      en: "Add six child profiles",
      fr: "Ajouter six profils d'enfant",
    },
  },
  {
    id: "reports",
    title: "Progress Reports",
    price: { cad: 4.99, usd: 3.99 },
    description: {
      en: "Generate detailed progress reports",
      fr: "Générer des rapports de progrès détaillés",
    },
  },
  {
    id: "reports_bulk",
    title: "Bulk Reports",
    price: { cad: 9.99, usd: 7.99 },
    description: {
      en: "Bulk export student reports",
      fr: "Exporter les rapports des élèves en lot",
    },
  },
  {
    id: "yearbook",
    title: "Yearbook Maker",
    price: { cad: 9.99, usd: 7.99 },
    description: {
      en: "Create class yearbooks",
      fr: "Créer des albums de fin d'année",
    },
  },
  {
    id: "seat",
    title: "Extra Educator Seat",
    price: { cad: 7.99, usd: 6.49 },
    description: {
      en: "Add another educator seat",
      fr: "Ajouter un siège éducateur supplémentaire",
    },
  },
  {
    id: "library",
    title: "Lesson Library",
    price: { cad: 9.99, usd: 7.99 },
    description: {
      en: "Unlock printable lesson library",
      fr: "Débloquer la bibliothèque de leçons imprimables",
    },
  },
  {
    id: "observations",
    title: "Observations",
    price: { cad: 5.99, usd: 4.49 },
    description: {
      en: "Track student observations",
      fr: "Suivre les observations des élèves",
    },
  },
  {
    id: "discount_shop",
    title: "Shop Discount",
    price: { cad: 3.99, usd: 2.99 },
    description: {
      en: "Unlock shop discount",
      fr: "Débloquer une réduction pour la boutique",
    },
  },
  {
    id: "family_dash",
    title: "Family Dashboard",
    price: { cad: 4.99, usd: 3.99 },
    description: {
      en: "Family dashboard access",
      fr: "Accès au tableau de bord familial",
    },
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    price: { cad: 11.99, usd: 8.99 },
    description: {
      en: "Advanced analytics tools",
      fr: "Outils d'analyse avancés",
    },
  },
  {
    id: "api_access",
    title: "API Access",
    price: { cad: 19.99, usd: 14.99 },
    description: {
      en: "Developer API access",
      fr: "Accès API développeur",
    },
  },
  {
    id: "branding",
    title: "Custom Branding",
    price: { cad: 14.99, usd: 11.99 },
    description: {
      en: "Remove KatoSuite branding",
      fr: "Supprimer la marque KatoSuite",
    },
  },
];

export default addons;
