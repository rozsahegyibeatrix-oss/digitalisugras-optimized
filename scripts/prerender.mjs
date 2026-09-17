// Prerenders every SPA route into its own static dist/<route>/index.html
// so AI crawlers (and direct URL hits) get real content, not an empty shell.
// Also captures a 1200x630 OG image per page type/language from the real
// rendered page, since there's no separate design asset to draw from.
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { ROUTES } from "../src/lib/seo.js";

const viteBin = fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url));
const PORT = 4321;

const PAGES = Object.entries(ROUTES).flatMap(([routeKey, byLang]) =>
  Object.entries(byLang).map(([lang, urlPath]) => ({ routeKey, lang, urlPath }))
);
// Alias URLs that render the same "home" content (kept as real pages per
// the site's existing / and /home, /en and /en/home structure).
const ALIASES = [
  { routeKey: "home", lang: "hu", urlPath: "/home" },
  { routeKey: "home", lang: "en", urlPath: "/en/home" },
];
const ALL_PAGES = [...PAGES, ...ALIASES];

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`preview server at ${url} did not start in time`);
}

async function main() {
  const server = spawn(process.execPath, [viteBin, "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "inherit",
  });

  try {
    await waitForServer(`http://localhost:${PORT}/`);

    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    const ogDone = new Set();
    await mkdir("dist/assets/og", { recursive: true });

    for (const { routeKey, lang, urlPath } of ALL_PAGES) {
      await page.goto(`http://localhost:${PORT}${urlPath}`, { waitUntil: "networkidle0" });

      const ogKey = `${routeKey}-${lang}`;
      if (!ogDone.has(ogKey)) {
        await page.screenshot({ path: `dist/assets/og/${ogKey}.jpg`, type: "jpeg", quality: 82 });
        ogDone.add(ogKey);
        console.log(`og image ${ogKey} -> dist/assets/og/${ogKey}.jpg`);
      }

      const html = `<!doctype html>\n${await page.content()}`;
      const outDir = urlPath === "/" ? "dist" : path.join("dist", urlPath);
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, "index.html"), html, "utf8");
      console.log(`prerendered ${urlPath} -> ${outDir}/index.html`);
    }

    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
