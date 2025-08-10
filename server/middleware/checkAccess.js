import { TIERS } from "../config/tiers";

export function canAccess(user, feature) {
  if (!user) return false;
  if (["pro_plus"].includes(user.plan)) return true;

  const tier = TIERS[user.plan] || { features: [], limits:{} };
  const hasTier = tier.features?.includes("all") || tier.features?.includes(feature);

  const addons = new Set(user.addons || []);
  const hasAddon =
    (feature === "library"     && addons.has("library"))     ||
    (feature === "reports"     && addons.has("reports"))     ||
    (feature === "yearbook"    && addons.has("yearbook"))    ||
    (feature === "extra_seat"  && addons.has("seat"))        ||
    (feature === "children"    && addons.has("child_x3"))    ||
    (feature === "ai"          && addons.has("ai_topup_15"));

  return hasTier || hasAddon;
}

export function childLimit(user) {
  const base = (TIERS[user.plan]?.limits?.children ?? 0);
  const packs = (user.addons || []).filter(a => a === "child_x3").length;
  return base < 0 ? Infinity : base + (packs * 3);
}
