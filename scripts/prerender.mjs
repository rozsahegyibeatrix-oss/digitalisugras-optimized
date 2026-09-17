// Prerenders every SPA route into its own static dist/<route>/index.html
// so AI crawlers (and direct URL hits) get real content, not an empty shell.
// ponytail: route list is hand-kept in sync with src/App.jsx; if routes
// grow past a handful, generate this list from the router instead.
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const viteBin = fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url));

const PORT = 4321;
const ROUTES = [
  "/", "/home", "/munkaink", "/arak", "/gyik",
  "/en", "/en/home", "/en/work", "/en/pricing", "/en/faq",
];

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

    for (const route of ROUTES) {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0" });
      const html = `<!doctype html>\n${await page.content()}`;

      const outDir = route === "/" ? "dist" : path.join("dist", route);
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, "index.html"), html, "utf8");
      console.log(`prerendered ${route} -> ${outDir}/index.html`);
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
