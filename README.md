# Digitális Ugrás — website

Static marketing site (React + Vite + Tailwind). No backend, no login — just a
single public page with a portfolio, pricing, FAQ and a lead-form modal that
opens the visitor's email client.

## Before your first build

Drop your portfolio screenshots and videos into `public/assets/portfolio/`
using these filenames (or edit the paths in
`src/components/sections/Portfolio.jsx` to match whatever you name them):

- `coupe-screenshot.webp`, `coupe-video.mp4`
- `atelier-screenshot.webp`, `atelier-video.mp4`
- `kirembe-screenshot.webp`, `kirembe-video.mp4`
- `pai-screenshot.webp`, `pai-video.mp4`

**Keep new media optimized before dropping it in** — these are shown at a few
hundred pixels wide (a laptop-mockup screenshot and a ~150px phone-mockup
video), so full-resolution exports are pure waste:
- Screenshots: convert to WebP, ~1400px wide max, quality ~80 (`cwebp -q 80 -resize 1400 0 in.png -o out.webp`).
- Videos: downscale + re-encode, drop audio (they're muted anyway):
  `ffmpeg -i in.mp4 -vf "scale=480:-2" -c:v libx264 -crf 30 -an -movflags +faststart out.mp4`.

  Doing this cut the sample media from 27MB to ~2MB with no visible quality loss
  at the sizes these actually render at.

Also replace `public/favicon.svg` with your own icon (any file works — just
keep the name, or update the `<link rel="icon">` in `index.html`).

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
```

Output goes to `dist/` — that folder is the entire site. Upload it as-is to
any static host: Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, your own
server, etc. No environment variables or backend setup needed.

## Project layout

- `src/pages/Home.jsx` — the whole page, assembled from the sections below
- `src/components/sections/` — Hero, Benefits, Pricing, FAQ, etc.
- `src/components/showcase/` — the little device-frame mockups in the portfolio
- `src/lib/i18n.jsx` — Hungarian/English copy and the language switcher
- `src/components/LeadFormModal.jsx` — the "get in touch" form (opens a mailto link, no server involved)
