import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

/**
 * Motor Zone publish prices, discounts, deposits, monthlies and an interest
 * rate — and no photography whatsoever. The shared schema has no vocabulary
 * for money, so this extension carries all of it.
 */
export type ZoneContent = SiteContent & {
  hero: SiteContent["hero"] & {
    dropAlt: string;
    dropHint: string;
    wasLabel: string;
    nowLabel: string;
    savingLabel: string;
    noPhotoNote: string;
  };
  headline: {
    eyebrow: string;
    heading: string;
    intro: string;
    officialPriceLabel: string;
    depositFromLabel: string;
    monthlyFromLabel: string;
    perks: Record<"insurance" | "noAdminFees" | "immediateDelivery", string>;
    viewPost: string;
  };
  plans: {
    eyebrow: string;
    heading: string;
    intro: string;
    columns: { model: string; deposit: string; monthly: string; firstYear: string };
    interestLabel: string;
    termsList: string[];
    derivedNote: string;
    currency: string;
    viewPost: string;
  };
  efficiency: {
    eyebrow: string;
    heading: string;
    intro: string;
    claims: Record<"fuelSaving" | "freeMaintenance" | "safety", string>;
    viewPost: string;
  };
  shop: {
    eyebrow: string;
    heading: string;
    body: string[];
    followersLabel: string;
    postsLabel: string;
    cta: string;
    instagramCta: string;
  };
};

export function useZone() {
  return useContent() as ZoneContent;
}
