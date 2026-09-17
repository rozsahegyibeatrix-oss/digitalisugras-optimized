# SEO / AI-Visibility Audit — digitalisugras.company

Date: 2026-09-13
Scope: production site (https://digitalisugras.company/) + source repo
(`digitalisugras-optimized`, Vite + React SPA, deployed on Vercel).

## Stack (Phase -1)

- **Framework:** Vite 6 + React 18, client-rendered SPA. No SSR/SSG.
- **Routing:** `react-router-dom`, but only one real route is registered
  (`/` → `Home.jsx`, `*` → 404). The whole site is one page.
- **Language:** `src/lib/i18n.jsx` holds full `hu` and `en` translation
  dictionaries, but the language is a **client-side JS toggle** — there is
  no `/en` URL, no `hreflang`, no separate route per language.
- **Head management:** none. `index.html` has only `<title>Digitális
  Ugrás</title>` — no meta description, no OG/Twitter tags, no canonical,
  no JSON-LD, no react-helmet/@unhead equivalent.
- **Host:** Vercel (`vercel.json`: `npm run build` → `dist/`).
- **Serverless functions:** `api/checkout.js` (Stripe), `api/lead.js`
  (lead capture) — out of scope for this audit, not touched.
- **Content sections (in `Home.jsx`):** Hero, LaunchOffer, Portfolio,
  Testimonials, HowItWorks, Benefits, Trust, Pricing, FAQ, Footer — all
  real content, all currently client-rendered only.

## Finding #1 — the site is invisible to non-JS crawlers (highest priority)

`curl` on both the local production build and the live URL returns the
same 482-byte shell:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Digitális Ugrás</title>
    <script type="module" crossorigin src="/assets/index-*.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-*.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

No headline, no offer, no pricing, no FAQ text — nothing. GPTBot,
ClaudeBot, PerplexityBot, and most classic crawlers that don't execute JS
see an empty page. This is the single biggest lever for AI visibility and
drives the Phase 1 plan below.

Also note: `<html lang="en">` while the default/visible content is
Hungarian — mismatched today regardless of the JS-rendering issue.

## Finding #2 — no crawler access / discovery files

- `robots.txt` → 404
- `sitemap.xml` → 404
- `llms.txt` → doesn't exist

Nothing tells AI crawlers they're welcome, and there's no machine-readable
summary of the business.

## Finding #3 — no metadata beyond `<title>`

- No `meta description`
- No canonical
- No Open Graph / Twitter card (so shared links have no preview)
- No `hreflang` (moot until HU/EN become real routes)
- Single generic `<title>` for the whole site regardless of section

## Finding #4 — no structured data

Zero JSON-LD. No `Organization`, no `Service`, no `FAQPage` (despite the
site literally having an FAQ section with real Q&A content — this is the
highest-leverage schema to add per Phase 3).

## Finding #5 — single-page architecture limits indexable surface

Portfolio, Pricing, FAQ, How-it-works are all sections on one URL. Real
routes for each (in Phase 1) directly increases the number of citable,
linkable pages.

## Finding #6 — oversized assets

Three testimonial photos exceed the 300 KB threshold:

| File | Size |
|---|---|
| `public/assets/testimonials/toth-bence.jpg` | 593 KB |
| `public/assets/testimonials/nagy-eva.jpg` | 563 KB |
| `public/assets/testimonials/kovacs-zsolt.jpg` | 541 KB |

Per the hard rules, these are **flagged, not touched** — re-encoding
without being asked is out of scope.

## Finding #7 — build health

`npm run build` passes clean: 108.95 KB gzipped JS, 7.14 KB gzipped CSS.
Initial bundle is well under the 150 KB gzip budget, so Phase 6
(code-splitting) is low priority — good baseline already.

## Lighthouse baseline

Not captured numerically this pass — the `chrome-devtools` MCP tool
(needed for headless Lighthouse) failed to connect (timeout) and the
sandboxed browser pane can't reach `localhost`. The live site renders
correctly in-browser (spot-checked visually), and the JS bundle size
above is a reasonable proxy for load performance. Will attempt a real
Lighthouse run in Phase 6 if the tool becomes available; not a blocker
for Phases 1–5.

## Priority fix order

1. **Phase 1 — prerendering + real routes.** Fixes Finding #1 and #5 at
   once; everything downstream (metadata, schema, sitemap) needs real
   routes to attach to.
2. **Phase 4 — robots.txt / sitemap.xml / llms.txt.** Cheap, high
   leverage, unblocks crawler access once there's content to crawl.
3. **Phase 2 — per-route metadata** (title/description/canonical/OG).
4. **Phase 3 — JSON-LD**, especially `FAQPage` (content already exists)
   and `Organization`.
5. **Phase 5 — headings/alt text/slugs**, checked in for the record but
   low individual impact until routes exist.
6. **Phase 6/7 — Core Web Vitals / HTTPS / mobile** — already solid
   baseline, verify after the above land.
7. **Phase 8 — human-only actions** (Search Console, backlinks) written
   up last as instructions/assets, not executed.

## Plan for Phase 1 (proposed)

- Lightest prerender option for a plain Vite+React SPA with no server
  framework: a small **Puppeteer post-build script** (`vite-plugin-
  prerender`/`react-snap` route-based, or hand-rolled) that builds once,
  then for each route boots a headless render and writes the resulting
  HTML to `dist/<route>/index.html`. Framework-native SSG isn't available
  (no Next/Astro here) and full migration is out of scope — a post-build
  prerender step is the standard fix for this exact stack.
- Real routes to introduce, one per current section with real content
  (Hungarian slugs, HU is the default language per current site):
  `/` (home/hero+offer), `/munkaink` (portfolio), `/arak` (pricing),
  `/gyik` (FAQ) — exact split to confirm before implementing, since it
  changes URLs the live site doesn't currently have.
- HU/EN: split into `/` (HU, default) + `/en/...` mirrors, replacing the
  JS-only toggle with real links + `hreflang`, per hard rule 5 (every
  added string must exist in both languages — dictionaries already do).

**Stopping here per skill instructions — this audit and plan need your
sign-off before I touch any code.** Specifically I want confirmation on:

1. The route split above (home / portfolio / pricing / FAQ) — good, or do
   you want different pages?
2. OK to add `/en/...` URL routes for English (replacing the current
   toggle) rather than leaving language as a pure JS toggle?
3. Puppeteer-based post-build prerendering — OK to add `puppeteer` as a
   new devDependency for this (it's the standard lightweight fix for a
   plain Vite SPA with no SSR framework)?
