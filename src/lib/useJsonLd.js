import { useEffect } from "react";
import { buildJsonLd } from "@/lib/jsonld";

// Same client-side-then-prerendered approach as useSEO: the script tag
// lands in the DOM here, and the prerender snapshot bakes it into the
// static HTML.
export function useJsonLd(routeKey, lang, t) {
  useEffect(() => {
    const data = buildJsonLd({ routeKey, lang, t });
    let el = document.getElementById("ld-json");
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = "ld-json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }, [routeKey, lang, t]);
}
