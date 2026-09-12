import type { ZoneContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: ZoneContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Motor Zone",
    shortName: "MZ",
    // Their bio, word for word.
    tagline: "Where quality meets trust",
  },

  nav: [
    { label: "The offer", href: "#headline" },
    { label: "The plans", href: "#plans" },
    { label: "Running costs", href: "#efficiency" },
    { label: "The shop", href: "#shop" },
  ],

  hero: {
    eyebrow: "Sheraton, Cairo",
    headline: "They tell you the price",
    sub: "Every other dealership in this series says “call for details”. Motor Zone post the official price, the discount with the old figure still showing, the exact deposit, the exact monthly payment, and the rate it starts from. This page is made of those numbers.",
    primaryCta: "Call the shop",
    secondaryCta: "See the plans",
    dropAlt: "A SEAT Leon's price falling from 1,600,000 to 1,500,000 Egyptian pounds.",
    dropHint: "Tap the figure to run it again.",
    wasLabel: "Was",
    nowLabel: "Now",
    savingLabel: "Saving",
    noPhotoNote:
      "Motor Zone publish no photographs — every post is designed offer artwork with the type set into it. Rather than reproduce that as if it were photography, this page carries none, and uses only what they wrote.",
  },

  about: {
    heading: "Motor Zone",
    body: [
      "A shop on Sayed Zakaria Street in Sheraton, Heliopolis, next to Al-Siddiq Mosque, selling new Chinese and European models on finance.",
    ],
  },

  services: { heading: "The plans", items: [] },
  gallery: { heading: "The plans", items: [] },

  headline: {
    eyebrow: "The one with a price on it",
    heading: "Jetour T2, at the official price",
    intro:
      "They give the list price and then the whole plan underneath it: what to put down, what to pay each month, and what is included. Nothing here is derived — these four figures are theirs.",
    officialPriceLabel: "Official price",
    depositFromLabel: "Deposit from",
    monthlyFromLabel: "Monthly from",
    perks: {
      insurance: "Insurance included for the length of the plan",
      noAdminFees: "No administrative fees",
      immediateDelivery: "Immediate delivery",
    },
    viewPost: "See the post",
  },

  plans: {
    eyebrow: "Four plans, side by side",
    heading: "What they publish, and what it implies",
    intro:
      "They give a deposit and a monthly for four models, and the rate those plans start from — but no price and no term. Without a price a term cannot honestly be worked out, and the only price they publish belongs to a different car. So the one computed column here is the first year's outlay: the deposit plus twelve payments, which needs nothing they did not give.",
    columns: {
      model: "Model",
      deposit: "Deposit",
      monthly: "Monthly",
      firstYear: "First year, computed",
    },
    interestLabel: "Interest from",
    termsList: [
      "With a photograph of your ID card only",
      "No administrative fees",
      "One year's licence included",
    ],
    derivedNote:
      "The last column is computed, not published — deposit plus twelve monthly payments, and nothing else. No price, rate or term is assumed anywhere on this page. Borrowing the Jetour's price to solve a term for the Optra would attribute a figure to a car they never priced, so it is not done.",
    currency: "EGP",
    viewPost: "See the post",
  },

  efficiency: {
    eyebrow: "Sold on running cost",
    heading: "The one they price by the tank",
    intro:
      "Not every car on their feed is sold on its sticker. The DFSK E5 is sold on what it costs afterwards, and the claims are theirs.",
    claims: {
      fuelSaving: "Highest saving in energy and fuel",
      freeMaintenance: "Free maintenance",
      safety: "Safety and comfort with no compromise",
    },
    viewPost: "See the post",
  },

  shop: {
    eyebrow: "The shop",
    heading: "One street, one number",
    body: [
      "Their address is written as a set of directions rather than a postcode: Sayed Zakaria Street, in Sheraton, at the Ministers' Square, next to Al-Siddiq Mosque. One phone number handles everything.",
      "With 407 followers and 296 posts, this is a small operation that publishes more hard information than dealerships twenty times its size.",
    ],
    followersLabel: "Followers",
    postsLabel: "Posts",
    cta: "Open in Maps",
    instagramCta: "Instagram",
  },

  contact: {
    heading: "Talk to them",
    addressLabel: "Address",
    address: PROFILE.address,
    phoneLabel: "Call",
    phones: [PROFILE.phone],
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "Call the shop",
  },

  footer: {
    rights: "© Motor Zone. All rights reserved.",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
