import { useEffect } from "react";
import { SITE_URL, SITE_NAME, ROUTES, SEO } from "@/lib/seo";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, hreflang, href) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Sets title/description/canonical/hreflang/OG/Twitter tags for the current
// page. Runs client-side, but the prerender script snapshots the DOM after
// this effect settles, so the tags land in the static HTML too.
export function useSEO(routeKey, lang) {
  useEffect(() => {
    const copy = SEO[routeKey][lang];
    const paths = ROUTES[routeKey];
    const canonical = `${SITE_URL}${paths[lang]}`;
    const ogImage = `${SITE_URL}/assets/og/${routeKey}-${lang}.jpg`;

    document.documentElement.lang = lang;
    document.title = copy.title;
    upsertMeta("name", "description", copy.description);
    upsertLink("canonical", null, canonical);
    upsertLink("alternate", "hu", `${SITE_URL}${paths.hu}`);
    upsertLink("alternate", "en", `${SITE_URL}${paths.en}`);
    upsertLink("alternate", "x-default", `${SITE_URL}${paths.hu}`);

    upsertMeta("property", "og:title", copy.title);
    upsertMeta("property", "og:description", copy.description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", lang === "en" ? "en_US" : "hu_HU");
    upsertMeta("property", "og:locale:alternate", lang === "en" ? "hu_HU" : "en_US");
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:image:alt", copy.title);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", copy.title);
    upsertMeta("name", "twitter:description", copy.description);
    upsertMeta("name", "twitter:image", ogImage);
  }, [routeKey, lang]);
}
