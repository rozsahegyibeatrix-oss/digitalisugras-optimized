# SEO TODO — needs a human or a real value

Ordered by impact.

## 1. Vercel build (done, keep in mind)

Deployed 2026-09-19. The first production build failed because headless Chrome can't start on
Vercel's Linux image; fixed by using `@sparticuz/chromium` when `process.env.VERCEL` is set
(`scripts/prerender.mjs`). Verified live: real HTML at `/`, all 10 pages + `/robots.txt`,
`/sitemap.xml`, `/llms.txt` return 200, unknown URLs return 404, security headers present,
`/arak/` redirects to `/arak`.

- If a future build fails, open the deployment in Vercel and read the log; the prerender step is the likeliest place.
- Vercel skips a production build when the same commit was already built as a preview.
  To force one, push a new commit to `main`.
- The test branch `vercel-build-fix` can be deleted on GitHub.
- Not yet checked: `www.digitalisugras.company` (redirect is configured; the www domain must be added in Vercel for it to work).

## 2. Search Console + Bing Webmaster (you must do this)

1. https://search.google.com/search-console -> Add property -> **Domain** ->
   `digitalisugras.company` -> add the TXT record at your DNS provider. (If DNS
   is hard: choose URL prefix `https://digitalisugras.company/` and use the HTML tag; paste the
   tag into `index.html` `<head>` and redeploy.)
2. Sitemaps -> submit `https://digitalisugras.company/sitemap.xml`.
3. URL inspection -> request indexing for `/`, `/en`, `/arak`, `/gyik`, `/munkaink`.
4. Google removed the international-targeting setting; hreflang in the pages covers it.
5. https://www.bing.com/webmasters -> **Import from Google Search Console** (fastest), then submit the sitemap.
6. Watch Pages -> "Page indexing" for a week; `/home` and `/en/home` should show "Alternate page with proper canonical tag" (expected).

No verification token is in the repo: I would have had to invent one.

## 3. Real values I did not invent

| Missing | Used for |
|---|---|
| Social profile URLs (Facebook, Instagram, LinkedIn...) | Organization `sameAs` in `src/lib/jsonld.js` |
| Phone number, street address, opening hours | `LocalBusiness` upgrade / Google Business Profile |
| Founding year, VAT/company number | Organization `foundingDate`, `vatID` |
| Raster logo PNG, at least 112x112 | Organization `logo` (currently `favicon.svg`) |

## 4. Content decisions

- **More FAQs.** 5 real questions exist; 8-12 works better for AI answers.
  Add real ones (both languages) in `src/lib/i18n.jsx` `faq.items`; the schema follows automatically.
- **FAQ page h1** is "Mielőtt indulsz" / "Before you leap": no keyword. Suggest "GYIK — mielőtt indulsz".
- **Text under 16px** (mono labels 11px, captions and body `text-sm` 14px): kept to avoid restyling the site. Say if you want it raised.
- **Video posters:** export one frame per portfolio video to `public/assets/portfolio/` and I will wire them in.
- **Titles/descriptions** run 44-63 / 130-140 chars, a little under the 140-160 target on descriptions. Fine, tweak in `src/lib/seo.js`.
- **Launch-offer counter** ("12 of 50 spots claimed") is hardcoded in `i18n.jsx`; keep it true, and the same
  numbers are in `llms.txt` prices (update both if prices change).

## 5. Assets over 300 KB (flagged, not touched)

`public/assets/testimonials/toth-bence.jpg` 594 KB, `nagy-eva.jpg` 563 KB, `kovacs-zsolt.jpg` 541 KB.
They display at 40x40px, so a resize would save ~1.6 MB of transfer. Say the word and I will do it.
The portfolio MP4s (250-740 KB) are lazy-loaded.

## 6. Performance follow-up

Mobile TBT rose slightly (see report). Option if it matters after real-world measurement:
switch `createRoot` to hydration. Deferred: it needs the framer-motion initial states to
match the prerendered DOM, and I could not verify that safely.

## 7. Ongoing

- `llms.txt` and `robots.txt` are static files in `public/`; `sitemap.xml` regenerates on every build.
- New page: add it to `ROUTES`/`SEO` in `src/lib/seo.js`, and `src/App.jsx`. Sitemap, OG image and prerender pick it up.
- Google Business Profile and citation consistency: see `BACKLINK_STRATEGY.md`.
