// Generates dist/sitemap.xml from the same ROUTES config the site uses,
// so it can't drift from the real page list.
import { writeFile } from "node:fs/promises";
import { ROUTES, SITE_URL } from "../src/lib/seo.js";

const lastmod = new Date().toISOString().slice(0, 10);

const entries = Object.values(ROUTES).flatMap((paths) =>
  Object.values(paths).map((loc) => {
    const alt = (hreflang, p) =>
      `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}${p}"/>`;
    return [
      "  <url>",
      `    <loc>${SITE_URL}${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      alt("hu", paths.hu),
      alt("en", paths.en),
      alt("x-default", paths.hu),
      "  </url>",
    ].join("\n");
  })
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

await writeFile("dist/sitemap.xml", xml, "utf8");
console.log(`sitemap.xml written (${entries.length} urls)`);
