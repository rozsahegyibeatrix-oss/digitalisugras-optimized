export const SITE_URL = "https://digitalisugras.company";
export const SITE_NAME = "Digitális Ugrás";

// Canonical URL for each page, per language. "home" also has alias URLs
// (/home, /en/home) that canonicalize back to these.
export const ROUTES = {
  home: { hu: "/", en: "/en" },
  work: { hu: "/munkaink", en: "/en/work" },
  pricing: { hu: "/arak", en: "/en/pricing" },
  faq: { hu: "/gyik", en: "/en/faq" },
};

export const SEO = {
  home: {
    hu: {
      title: "Weboldal, hirdetés, tartalom egy hét alatt | Digitális Ugrás",
      description:
        "Magyar kisvállalkozásoknak: honlap, hirdetési csomag és havi tartalom. MI gyorsítja a munkát, ember ellenőrzi az eredményt. Indulj el most.",
    },
    en: {
      title: "Website, ads and content in one week | Digitális Ugrás",
      description:
        "For Hungarian small businesses: a booking-ready website, ad package and monthly content. AI speeds the work, a human checks it. Start now.",
    },
  },
  work: {
    hu: {
      title: "Portfólió — valódi weboldalak, hirdetések | Digitális Ugrás",
      description:
        "Nézd meg élesben futó weboldalainkat és hirdetéseinket: borbélyüzlet, jógastúdió, kitesurf iskola és több valós magyar és nemzetközi ügyfél.",
    },
    en: {
      title: "Portfolio — real websites and ads | Digitális Ugrás",
      description:
        "See our live websites and ads in action: a barbershop, yoga studio, kitesurf school and more real clients across Hungary and beyond.",
    },
  },
  pricing: {
    hu: {
      title: "Árak — fix havi csomagok, bármikor lemondható | Digitális Ugrás",
      description:
        "Indító csomag 89 000 Ft-tól, utána Basic, Standard vagy Pro havi csomag. Átlátható árazás, nincs hosszú távú szerződés, bármikor lemondható.",
    },
    en: {
      title: "Pricing — Monthly Plans, Cancel Anytime | Digitális Ugrás",
      description:
        "Launch package from 89,000 Ft, then Basic, Standard or Pro monthly plans. Transparent pricing, no long-term contract, cancel anytime.",
    },
  },
  faq: {
    hu: {
      title: "GYIK — gyakori kérdések a Digitális Ugrásról",
      description:
        "Válaszok a leggyakoribb kérdésekre: árazás, határidők, hirdetési költségkeret és lemondás. Minden, amit indulás előtt tudnod kell.",
    },
    en: {
      title: "FAQ — frequently asked questions | Digitális Ugrás",
      description:
        "Answers to the most common questions: pricing, timelines, ad budget and cancellation. Everything you need to know before you start.",
    },
  },
};

const ALIASES = { "/home": "home", "/en/home": "home" };

// Path of the same page in another language, or null if pathname isn't a known page.
export function counterpartPath(pathname, toLang) {
  const key =
    ALIASES[pathname] ?? Object.keys(ROUTES).find((k) => Object.values(ROUTES[k]).includes(pathname));
  return key ? ROUTES[key][toLang] : null;
}
