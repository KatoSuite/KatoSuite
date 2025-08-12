export type Localized = { en: string; fr: string };
export type PriceMap = { cad: number; usd: number };

export type Plan = {
  id: string;
  tier: 'individual' | 'center';
  name: Localized;
  price: PriceMap;
  features: string[];
  limits?: Record<string, number>;
};

export type Addon = {
  id: string;
  name: Localized;
  price: PriceMap;
};

export type BillingCatalog = {
  currencyDefaults: { cad: 'CAD'; usd: 'USD' };
  plans: Plan[];
  addons: Addon[];
};
