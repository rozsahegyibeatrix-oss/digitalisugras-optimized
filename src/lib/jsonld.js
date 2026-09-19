import { SITE_URL, SITE_NAME, ROUTES } from "@/lib/seo";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Real client site URLs, same order as the work.items translations
// (Coupé Barber, Atelier V, Kirembe Adventures, Pai Striking Academy).
const PORTFOLIO_URLS = [
  "coupebarber.com",
  "atelierv.space",
  "kirembeadventures.online",
  "paistrinkingacademy.space",
];

function parsePrice(s) {
  return Number(String(s).replace(/[^\d]/g, ""));
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    email: "digitalisugras@gmail.com",
    areaServed: "HU",
    availableLanguage: ["hu", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "digitalisugras@gmail.com",
      contactType: "customer service",
      areaServed: "HU",
      availableLanguage: ["Hungarian", "English"],
    },
  };
}

function websiteNode(lang) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: lang,
    publisher: { "@id": ORG_ID },
  };
}

function breadcrumbNode(routeKey, lang, label) {
  const homeUrl = `${SITE_URL}${ROUTES.home[lang]}`;
  const pageUrl = `${SITE_URL}${ROUTES[routeKey][lang]}`;
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Főoldal", item: homeUrl },
      { "@type": "ListItem", position: 2, name: label, item: pageUrl },
    ],
  };
}

function serviceNodes(t, lang) {
  return [
    {
      "@type": "Service",
      name: t.offer.title,
      serviceType: lang === "en" ? "Website launch package" : "Weboldal indító csomag",
      provider: { "@id": ORG_ID },
      areaServed: "HU",
      offers: {
        "@type": "Offer",
        price: parsePrice(t.offer.now),
        priceCurrency: "HUF",
        description: t.offer.note,
      },
    },
    ...t.pricing.tiers.map((tier) => ({
      "@type": "Service",
      name: `${tier.name} — ${t.pricing.title}`,
      serviceType: lang === "en" ? "Monthly marketing plan" : "Havi marketing csomag",
      provider: { "@id": ORG_ID },
      areaServed: "HU",
      description: tier.desc,
      offers: {
        "@type": "Offer",
        priceCurrency: "HUF",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: parsePrice(tier.price),
          priceCurrency: "HUF",
          unitText: lang === "en" ? "MONTH" : "HÓ",
        },
      },
    })),
  ];
}

function faqNode(t) {
  return {
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function creativeWorkNodes(t) {
  return t.work.items.map((item, i) => ({
    "@type": "CreativeWork",
    name: item.name,
    about: item.type,
    description: item.desc,
    url: `https://${PORTFOLIO_URLS[i]}`,
    creator: { "@id": ORG_ID },
  }));
}

export function buildJsonLd({ routeKey, lang, t }) {
  const graph = [organizationNode(), websiteNode(lang)];
  if (routeKey !== "home") graph.push(breadcrumbNode(routeKey, lang, t.nav[routeKey]));
  if (routeKey === "home" || routeKey === "pricing") graph.push(...serviceNodes(t, lang));
  if (routeKey === "home" || routeKey === "faq") graph.push(faqNode(t));
  if (routeKey === "home" || routeKey === "work") graph.push(...creativeWorkNodes(t));
  return { "@context": "https://schema.org", "@graph": graph };
}
