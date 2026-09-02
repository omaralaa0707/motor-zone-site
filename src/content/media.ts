/**
 * Motor Zone are the only dealership in this series who publish the number.
 *
 * Everyone else says "call for price". Motor Zone post an official price, a
 * discount with the old figure struck out, four financing plans with the
 * exact deposit and the exact monthly payment, and the interest rate those
 * plans start from. Everything below is transcribed from those posts.
 *
 * They are also the only one who publishes no photography at all: every post
 * in their feed is designed offer creative with the type set into the
 * artwork. Reproducing that as though it were a photograph would be
 * dishonest, so this site carries no car images. It is made of their numbers,
 * which is what they actually give you.
 */

export type Plan = {
  id: string;
  /** As they write it. */
  model: string;
  /** EGP. */
  deposit: number;
  monthly: number;
};

/** The four plans from their instalment post, exactly as listed. */
export const PLANS: Plan[] = [
  { id: "optra", model: "Chevrolet Optra", deposit: 200_000, monthly: 12_850 },
  { id: "mg5", model: "MG 5", deposit: 240_000, monthly: 16_700 },
  { id: "kaiyi-e5", model: "Kaiyi E5", deposit: 230_000, monthly: 14_300 },
  { id: "kaiyi-x3", model: "Kaiyi X3", deposit: 240_000, monthly: 14_300 },
];

/** The terms attached to that same post. */
export const PLAN_TERMS = {
  interestFrom: 9.9,
  idOnly: true,
  noAdminFees: true,
  freeLicenceYear: true,
} as const;

/** The headline car, with its own separate plan. */
export const HEADLINE = {
  model: "Jetour T2 SUV",
  officialPrice: 1_900_000,
  depositFrom: 500_000,
  monthlyFrom: 32_000,
  perks: ["insurance", "noAdminFees", "immediateDelivery"] as const,
  postUrl: "https://www.instagram.com/p/DcytLhQI0A2/",
};

/** The discount, with both figures as they published them. */
export const DISCOUNT = {
  model: "SEAT Leon",
  was: 1_600_000,
  now: 1_500_000,
  saving: 100_000,
  postUrl: "https://www.instagram.com/p/DcdrlU2trFo/",
};

/** A model they promote on running cost rather than price. */
export const EFFICIENCY = {
  model: "DFSK E5 & E5 Plus",
  year: "2027",
  claims: ["fuelSaving", "freeMaintenance", "safety"] as const,
  postUrl: "https://www.instagram.com/p/DcgXC5VtD-k/",
};

/**
 * Their instalment post gives a deposit and a monthly for each model — but no
 * price and no term. A term cannot honestly be derived from that: it needs the
 * financed balance, and the only price they publish belongs to a different
 * car. Borrowing the Jetour's 1.9M to solve the Optra's term would attribute
 * a figure to a model they never priced, which this project does not do.
 *
 * What *can* be computed from their two numbers alone is the first year's
 * outlay: the deposit plus twelve payments. It needs no price, no rate and no
 * assumption, and the table marks it as computed all the same.
 */
export function firstYearOutlay(deposit: number, monthly: number): number {
  return deposit + monthly * 12;
}

export const PROFILE = {
  instagram: "https://www.instagram.com/motorzone.automotive/",
  facebook: "https://www.facebook.com/MotorZoneAutomotive/",
  maps: "https://maps.app.goo.gl/yTEPdRXp6f8PEue96",
  phone: "01271741111",
  phoneHref: "tel:+201271741111",
  address: "Sayed Zakaria St — Sheraton, Morabaa El-Wozara, next to Al-Siddiq Mosque",
  addressAr: "شارع سيد زكريا – شيراتون – مربع الوزراء – بجوار مسجد الصديق",
  followers: "407",
  posts: "296",
} as const;
