// Structured page content (legal, about, how-it-works, FAQ, per-allergen
// explainers). Plain language, 4th–6th-grade reading level. Honesty rules
// enforced in copy: never "safe", never "free of" as a claim; always state the
// limitation and point to the pharmacist. Audited adversarially in M9.

export interface FaqItem {
  q: string;
  a: string;
}
export interface ContentSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}
export interface ContentPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro?: string;
  sections: ContentSection[];
  faq?: FaqItem[];
  updated?: string;
}
export interface AllergenPage extends ContentPage {
  allergenId: string;
}

const UPDATED = "2026-06-15";

// ---------------------------------------------------------------------------
// Shared FAQ (also emitted as FAQPage JSON-LD + visible on /faq and the home page)
// ---------------------------------------------------------------------------
export const FAQ: FaqItem[] = [
  {
    q: "Can FreeOfCheck tell me a medicine is free of an ingredient?",
    a: "No, and no honest tool can. FDA labels list what a product contains, not what it is free of. We can show you when an ingredient is listed (Contains), and when it is not listed on that label — but a missing ingredient is never a guarantee it is absent. Always confirm with your pharmacist, especially for a severe allergy.",
  },
  {
    q: "Where does the information come from?",
    a: "Straight from the official FDA drug label, published by the U.S. National Library of Medicine (DailyMed) and the FDA's openFDA service. Every result links to the exact label it came from, and you can read the original Inactive Ingredients text on tap.",
  },
  {
    q: "Why does it sometimes say 'the label doesn't say'?",
    a: "Some FDA labels — especially for prescription medicines — don't list inactive ingredients in a readable, structured form. When that happens we tell you honestly instead of guessing, and point you to the full label on DailyMed.",
  },
  {
    q: "What does the amber 'source not stated' result mean?",
    a: "Some ingredients can come from more than one source. For example, plain 'starch' can be made from corn (gluten-free) or wheat (not gluten-free), and the FDA does not require the label to say which. When the source is unclear, we mark it amber — uncertain — never green.",
  },
  {
    q: "Do you store my searches?",
    a: "No. There are no accounts, no database, no cookies, no analytics, and no tracking. Your search goes from your browser to our server to the FDA and is never logged against you.",
  },
  {
    q: "Why lead with PEG instead of gluten?",
    a: "PEG (polyethylene glycol) is a hidden ingredient in many tablets and injectables, awareness is low, and reactions can be severe — exactly where a live, label-citing tool helps most. Intentional gluten in U.S. oral medicines is now rare, so gluten is a secondary use.",
  },
  {
    q: "Is this medical advice?",
    a: "No. FreeOfCheck is an educational reference, not medical advice and not a medical device. It explains what a label says; it does not tell you what to take. Always discuss your medicines with your pharmacist or doctor.",
  },
  {
    q: "Does 'not listed' mean the generic version is also free of it?",
    a: "Not necessarily. Generics from different manufacturers often use different inactive ingredients, and formulations change over time. Check the specific product you have, and confirm with the pharmacy that filled it.",
  },
];

// ---------------------------------------------------------------------------
// Marketing / educational
// ---------------------------------------------------------------------------
export const ABOUT: ContentPage = {
  slug: "about",
  title: "About FreeOfCheck",
  metaTitle: "About FreeOfCheck — live, cited FDA ingredient checks",
  metaDescription:
    "FreeOfCheck reads the official FDA drug label so you can see whether a medicine lists an ingredient you want to avoid — PEG, dyes, lactose, soy, or gluten. Free, cited, nothing stored.",
  intro:
    "FreeOfCheck is a free tool that reads the official FDA drug label and tells you, in plain language, whether a medicine lists an ingredient you want to avoid — and shows you the exact label text it found.",
  sections: [
    {
      heading: "What makes it different",
      bullets: [
        "Live FDA-label data — not a list that was last updated years ago.",
        "Every answer cites its exact FDA label passage, shown right on the card.",
        "Per-formulation and per-manufacturer detail, because generics differ.",
        "Many ingredients in one tool — PEG, dyes, lactose, soy, and gluten.",
        "Free, no login, and nothing you type is stored.",
        "Mobile-first plain language a 10-year-old can read.",
      ],
    },
    {
      heading: "Who it's for",
      bullets: [
        "Patients and caregivers checking an over-the-counter medicine for a dye, filler, or allergen.",
        "Pharmacists who want the raw label text and every formulation in one place (turn on Pharmacist view).",
      ],
    },
    {
      heading: "The honest limit we never cross",
      paragraphs: [
        "FDA labels say what a product contains, not what it is free of, and the FDA does not require the source of every ingredient to be named. So we can prove 'Contains', but we never claim a medicine is 'free of' anything. The most we say is 'not listed on this label' — with a clear reminder to confirm with your pharmacist.",
      ],
    },
  ],
};

export const HOW_IT_WORKS: ContentPage = {
  slug: "how-it-works",
  title: "How FreeOfCheck works",
  metaTitle: "How FreeOfCheck works — reading the FDA label",
  metaDescription:
    "Type a medicine, pick an ingredient to avoid, and FreeOfCheck reads the official FDA label's Inactive Ingredients section and shows you the exact text. Here's how.",
  intro: "Three steps, no signup, nothing stored.",
  sections: [
    {
      heading: "1. Type a medicine",
      paragraphs: [
        "Enter a brand name or the active ingredient (for example, 'ibuprofen'). We look it up in the FDA's official label database.",
      ],
    },
    {
      heading: "2. Pick what to avoid",
      paragraphs: [
        "Choose a common ingredient — PEG, a dye, lactose, soy, or gluten — or type your own. You can switch ingredients instantly without searching again.",
      ],
    },
    {
      heading: "3. Read the label",
      paragraphs: [
        "We search each label's Inactive Ingredients section for the ingredient you named, then show a clear result per formulation: Contains it, Not listed on this label, Possibly contains (source not stated), or The label doesn't say. Tap any card to read the exact FDA text and open the full label on DailyMed.",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Legal
// ---------------------------------------------------------------------------
export const DISCLAIMER_PAGE: ContentPage = {
  slug: "disclaimer",
  title: "Medical disclaimer",
  metaTitle: "Medical disclaimer — FreeOfCheck",
  metaDescription:
    "FreeOfCheck is an educational reference, not medical advice and not a medical device. FDA label data can be incomplete; always confirm with your pharmacist.",
  updated: UPDATED,
  sections: [
    {
      paragraphs: [
        "Educational reference only. Not medical advice and not a medical device. Inactive-ingredient data comes directly from FDA labels (openFDA / DailyMed) and may be incomplete — the FDA does not require manufacturers to disclose the source of every ingredient, so a missing allergen is not a guarantee of absence. Always confirm with the manufacturer and your pharmacist before relying on this — especially for severe allergies or anaphylaxis risk.",
      ],
    },
    {
      heading: "We explain; we don't decide",
      paragraphs: [
        "FreeOfCheck reports what an FDA label says and links you to the source. It never tells you which medicine to take or whether a product is right for you. Those decisions belong to you and your healthcare professional.",
      ],
    },
    {
      heading: "If you have a severe allergy",
      paragraphs: [
        "Do not rely on this tool alone. Contact the manufacturer and your pharmacist to confirm a product's ingredients and how it is made before taking it. In an emergency, call your local emergency number.",
      ],
    },
  ],
};

export const PRIVACY_PAGE: ContentPage = {
  slug: "privacy",
  title: "Privacy policy",
  metaTitle: "Privacy policy — FreeOfCheck stores nothing",
  metaDescription:
    "We store nothing. No accounts, no database, no cookies, no analytics, no tracking. Your search goes from your browser to our server to the FDA and is never logged.",
  updated: UPDATED,
  sections: [
    {
      paragraphs: [
        "We store nothing. No accounts, no database, no cookies, no analytics, no tracking. Your search goes from your browser to our server to the FDA and is never logged against you.",
      ],
    },
    {
      heading: "What happens to your search",
      paragraphs: [
        "When you check a medicine, your browser sends the medicine name to our server. Our server asks the FDA's public label service for that medicine's labels and sends the result back to you. We may keep a short-lived, anonymous copy of public FDA label data in memory to make repeat lookups fast — this is public drug data, never anything that identifies you, and it is not written to disk.",
      ],
    },
    {
      heading: "No tracking",
      paragraphs: [
        "There are no third-party analytics or advertising scripts. We do not set cookies. If we ever add privacy-respecting, anonymous error monitoring to keep the site reliable, it will be scrubbed of anything you type.",
      ],
    },
    {
      heading: "Feedback you send us",
      paragraphs: [
        "If you email us feedback, we receive whatever you choose to write. Please do not include personal health information.",
      ],
    },
  ],
};

export const TERMS_PAGE: ContentPage = {
  slug: "terms",
  title: "Terms of use",
  metaTitle: "Terms of use — FreeOfCheck",
  metaDescription: "The terms for using FreeOfCheck, a free educational reference for FDA drug-label ingredients.",
  updated: UPDATED,
  sections: [
    {
      heading: "Acceptance",
      paragraphs: [
        "By using FreeOfCheck you agree to these terms. If you do not agree, please do not use the service.",
      ],
    },
    {
      heading: "Educational use only",
      paragraphs: [
        "FreeOfCheck is provided for general educational information about FDA drug-label ingredients. It is not medical advice, not a medical device, and not a substitute for a qualified healthcare professional. See our Medical disclaimer.",
      ],
    },
    {
      heading: "No warranty",
      paragraphs: [
        "The service is provided 'as is' and 'as available', without warranties of any kind. FDA label data may be incomplete, out of date, or contain errors from the source. We do not warrant that results are accurate, complete, or current.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, FreeOfCheck and its maintainers are not liable for any harm arising from use of, or reliance on, the service or its results. Always confirm with the manufacturer and your pharmacist.",
      ],
    },
    {
      heading: "Sources and trademarks",
      paragraphs: [
        "Drug-label data is provided by the FDA (openFDA) and the U.S. National Library of Medicine (DailyMed). Product and brand names belong to their respective owners and are used here only to identify the products you search for.",
      ],
    },
  ],
};

export const ACCESSIBILITY_PAGE: ContentPage = {
  slug: "accessibility",
  title: "Accessibility statement",
  metaTitle: "Accessibility statement — FreeOfCheck",
  metaDescription:
    "FreeOfCheck commits to WCAG 2.2 AA: results are conveyed by icon, text, and color; large tap targets; keyboard and screen-reader support.",
  updated: UPDATED,
  sections: [
    {
      paragraphs: [
        "We want FreeOfCheck to work for everyone, and we aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.",
      ],
    },
    {
      heading: "What we do",
      bullets: [
        "Every result is shown with an icon, words, and color — never color alone — so it works for color-blind users.",
        "Tap targets are large (at least 44×44 pixels) and clearly focusable with a keyboard.",
        "Result counts are announced to screen readers as soon as they load.",
        "Text stays at least 16px so phones don't zoom unexpectedly, and we respect 'reduce motion' settings.",
      ],
    },
    {
      heading: "Tell us",
      paragraphs: [
        "If you hit an accessibility barrier, please let us know through our feedback page so we can fix it.",
      ],
    },
  ],
};

export const WHY_NOT_SAFE_PAGE: ContentPage = {
  slug: "why-not-safe",
  title: "Why we can't tell you a medicine is “safe” for you",
  metaTitle: "Why a label can't prove a medicine is free of an allergen",
  metaDescription:
    "FDA labels list what a product contains, not what it is free of — and the source of single ingredients isn't always named. Here's why 'not listed' is not a guarantee.",
  intro:
    "It's the most important thing to understand about checking medicine ingredients — and it's why we never use the word 'safe'.",
  sections: [
    {
      heading: "Labels list what's in, not what's out",
      paragraphs: [
        "An FDA drug label tells you the ingredients a product contains. It does not promise that anything is absent. So we can prove 'Contains' when an ingredient is listed — but 'not listed' only means we didn't find it in that label's text, not that it's truly absent.",
      ],
    },
    {
      heading: "Sources aren't always named",
      paragraphs: [
        "The FDA does not require manufacturers to state the source of every single ingredient. Plain 'starch' might be made from corn (gluten-free) or, rarely, wheat — and the label may not say which. When the source is unclear, we mark the result amber ('source not stated'), never green.",
      ],
    },
    {
      heading: "Formulations change and generics differ",
      paragraphs: [
        "Manufacturers reformulate products, and two generics of the same medicine can use different fillers and dyes. A result for one product is not a promise about a different brand, lot, or a future version.",
      ],
    },
    {
      heading: "So what should you do?",
      paragraphs: [
        "Use FreeOfCheck to get oriented fast and to read the exact label. Then, for anything that matters to your health — especially a severe allergy — confirm with the manufacturer and your pharmacist before you take it.",
      ],
    },
  ],
};

export const FEEDBACK_PAGE: ContentPage = {
  slug: "feedback",
  title: "Send feedback",
  metaTitle: "Feedback — FreeOfCheck",
  metaDescription: "Found a problem or have a suggestion? Tell us. Please don't include personal health information.",
  intro:
    "Spotted a wrong result, a broken link, or have an idea? We'd love to hear it. Please do not include any personal health information (your name, what you take, or your conditions).",
  sections: [
    {
      heading: "Email",
      paragraphs: ["Write to us at the address on the button below. Keep it to the issue, with no health details."],
    },
    {
      heading: "Report on GitHub",
      paragraphs: [
        "If you use GitHub, you can open a public issue. Don't post anything you wouldn't want public — no personal health information.",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Per-allergen SEO landing pages (/peg /lactose /gluten /dye-free /soy)
// ---------------------------------------------------------------------------
export const ALLERGEN_PAGES: AllergenPage[] = [
  {
    slug: "peg",
    allergenId: "peg",
    title: "Check a medicine for PEG (polyethylene glycol)",
    metaTitle: "Is your medicine PEG-free? Check the FDA label | FreeOfCheck",
    metaDescription:
      "Check whether an FDA drug label lists PEG (polyethylene glycol, macrogol, or a polyoxyl PEG-derivative). Free, cited, nothing stored. We show 'Contains' or 'not listed' — never 'free of'.",
    intro:
      "PEG (polyethylene glycol, also called macrogol) is one of the most common hidden ingredients in tablets, capsules, laxatives, and injectables. Awareness is low and reactions can be serious, so it's worth checking.",
    sections: [
      {
        heading: "What is PEG?",
        paragraphs: [
          "Polyethylene glycol is used as a binder, coating, solvent, and laxative. On labels it can appear as 'polyethylene glycol', 'PEG' followed by a number (like PEG 3350), 'macrogol', or as a PEG-derivative such as 'polyoxyl 35 castor oil'.",
        ],
      },
      {
        heading: "What we check",
        paragraphs: [
          "We read the FDA label's Inactive Ingredients section and look for PEG and its common aliases, including polyoxyl PEG-derivatives. We show you the exact text we found.",
        ],
      },
      {
        heading: "The honest limit",
        paragraphs: [
          "We can show when PEG is listed, and when it is not listed on a label — but a missing ingredient is not a guarantee. For a true PEG allergy, confirm with the manufacturer and your pharmacist before taking anything.",
        ],
      },
    ],
  },
  {
    slug: "lactose",
    allergenId: "lactose",
    title: "Check a medicine for lactose",
    metaTitle: "Is your medicine lactose-free? Check the FDA label | FreeOfCheck",
    metaDescription:
      "Check whether an FDA drug label lists lactose (a common tablet/capsule filler). Free, cited, nothing stored. We show 'Contains' or 'not listed' — never 'free of'.",
    intro:
      "Lactose (milk sugar) is a very common filler in tablets and capsules. If you are highly lactose-intolerant or avoiding dairy, it's worth knowing when it's on the label.",
    sections: [
      {
        heading: "What we check",
        paragraphs: [
          "We look for lactose and its forms (lactose monohydrate, anhydrous lactose, spray-dried lactose, and common trade names) in the FDA label's Inactive Ingredients section. We carefully avoid look-alike words such as 'galactose' and 'lactobacillus'.",
        ],
      },
      {
        heading: "The honest limit",
        paragraphs: [
          "We can show when lactose is listed and when it is not listed on a label, but absence from a label is not a guarantee. Generics differ by manufacturer — confirm the exact product with your pharmacist.",
        ],
      },
    ],
  },
  {
    slug: "gluten",
    allergenId: "gluten",
    title: "Check a medicine for gluten",
    metaTitle: "Is your medicine gluten-free? Check the FDA label | FreeOfCheck",
    metaDescription:
      "Check whether an FDA drug label lists gluten sources or unsourced starch. We mark uncertain starch amber, never green. Free, cited, nothing stored.",
    intro:
      "Intentional gluten in U.S. oral medicines is now rare, but uncertainty remains because the source of an ingredient like 'starch' is not always named.",
    sections: [
      {
        heading: "Why gluten is tricky",
        paragraphs: [
          "Plain 'starch' can come from corn (gluten-free) or, rarely, wheat — and the FDA does not require the label to say which. When the source is unclear, we show an amber 'source not stated' result, never a reassuring green.",
        ],
      },
      {
        heading: "What we check",
        paragraphs: [
          "We flag wheat and gluten as 'Contains', and we treat unsourced starch, modified starch, barley, rye, and malt as uncertain (amber). If the label names a gluten-free source — like 'corn starch' — we don't raise a false alarm.",
        ],
      },
      {
        heading: "The honest limit",
        paragraphs: [
          "For celiac disease or a serious wheat allergy, do not rely on a label alone. Confirm with the manufacturer and your pharmacist.",
        ],
      },
    ],
  },
  {
    slug: "dye-free",
    allergenId: "yellow5",
    title: "Check a medicine for dyes (Yellow 5, Red 40, and more)",
    metaTitle: "Is your medicine dye-free? Check the FDA label | FreeOfCheck",
    metaDescription:
      "Check whether an FDA drug label lists synthetic dyes like FD&C Yellow No. 5 (tartrazine), Red 40, or Yellow 6 — including aluminum lakes. Free, cited, nothing stored.",
    intro:
      "Synthetic color additives such as FD&C Yellow No. 5 (tartrazine), Red 40, and Yellow 6 appear in many tablets, chewables, and liquids. Some people prefer or need to avoid them.",
    sections: [
      {
        heading: "What we check",
        paragraphs: [
          "Pick a specific dye (Yellow 5 is selected here) or type another. We read the FDA label's Inactive Ingredients section and match the dye and its forms, including aluminum lake variants and the FD&C and E-number names.",
        ],
      },
      {
        heading: "The honest limit",
        paragraphs: [
          "We can show when a dye is listed and when it is not listed on a label, but a missing dye is not a guarantee. Colors vary by formulation and manufacturer — check the specific product you have.",
        ],
      },
    ],
  },
  {
    slug: "soy",
    allergenId: "soy",
    title: "Check a medicine for soy",
    metaTitle: "Is your medicine soy-free? Check the FDA label | FreeOfCheck",
    metaDescription:
      "Check whether an FDA drug label lists soy ingredients like soybean oil or soy lecithin. Bare 'lecithin' with no stated source is marked uncertain. Free, cited, nothing stored.",
    intro:
      "Soy shows up in medicines mainly as soybean oil (in some injectables and softgels) and soy lecithin. For a soy allergy, it's worth checking.",
    sections: [
      {
        heading: "What we check",
        paragraphs: [
          "We look for soy, soya, soybean, soybean oil, and soy lecithin in the FDA label. When a label lists plain 'lecithin' without saying the source, we mark it amber, because lecithin is often soy-derived.",
        ],
      },
      {
        heading: "The honest limit",
        paragraphs: [
          "We can show when soy is listed and when it is not listed, but absence from a label is not a guarantee. For a soy allergy, confirm with the manufacturer and your pharmacist.",
        ],
      },
    ],
  },
];

export const ALL_CONTENT_PAGES: ContentPage[] = [
  ABOUT,
  HOW_IT_WORKS,
  WHY_NOT_SAFE_PAGE,
  DISCLAIMER_PAGE,
  PRIVACY_PAGE,
  TERMS_PAGE,
  ACCESSIBILITY_PAGE,
  FEEDBACK_PAGE,
];

export const FEEDBACK_EMAIL = "feedback@freeofcheck.com";
export const GITHUB_REPO_URL = "https://github.com/sunnybamrah/freeofcheck";
