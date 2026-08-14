import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnv } from "vite";
import { absoluteUrl, resolveSiteUrl, site } from "./site.mjs";

/**
 * Escape text for HTML attribute / text node contexts.
 * @param {string} value
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {string} root
 */
function loadProducts(root) {
  const raw = readFileSync(resolve(root, "definition/products.json"), "utf8");
  return JSON.parse(raw);
}

/**
 * @param {string} baseUrl
 * @param {{ elements: Array<Record<string, unknown>> }} products
 */
function buildJsonLd(baseUrl, products) {
  const store = {
    "@type": "Store",
    "@id": `${baseUrl}/#store`,
    name: site.name,
    url: baseUrl,
    description: site.description,
    image: absoluteUrl(baseUrl, site.ogImagePath),
  };

  const itemListElement = products.elements.map((product, index) => {
    const image = absoluteUrl(baseUrl, `/${product.image}`);
    const availability = product.soldout
      ? "https://schema.org/SoldOut"
      : "https://schema.org/InStock";

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image,
        category: product.properties?.type,
        brand: {
          "@type": "Brand",
          name: site.name,
        },
        offers: {
          "@type": "Offer",
          url: baseUrl,
          priceCurrency: "MXN",
          price: String(product.price),
          availability,
        },
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      store,
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: site.name,
        url: baseUrl,
        description: site.description,
        inLanguage: site.language,
        publisher: { "@id": `${baseUrl}/#store` },
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/#catalog`,
        name: `Catálogo ${site.name}`,
        numberOfItems: products.elements.length,
        itemListElement,
      },
    ],
  };
}

/**
 * @param {string} baseUrl
 */
function buildHeadTags(baseUrl) {
  const title = escapeHtml(site.title);
  const description = escapeHtml(site.description);
  const ogImage = absoluteUrl(baseUrl, site.ogImagePath);
  const canonical = baseUrl;

  return `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="${escapeHtml(site.themeColor)}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${escapeHtml(site.name)}">
    <meta property="og:locale" content="${escapeHtml(site.locale)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${escapeHtml(ogImage)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${escapeHtml(site.name)}">

    <meta name="twitter:card" content="${escapeHtml(site.twitterCard)}">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${escapeHtml(ogImage)}">
  `.trim();
}

/**
 * @param {string} baseUrl
 */
function buildRobotsTxt(baseUrl) {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}

/**
 * @param {string} baseUrl
 */
function buildSitemapXml(baseUrl) {
  const lastmod = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

/**
 * Writes robots.txt and sitemap.xml into public/ (copied to dist by Vite).
 * @param {string} root
 * @param {string} baseUrl
 */
function writeSeoFiles(root, baseUrl) {
  const publicDir = resolve(root, "public");
  writeFileSync(resolve(publicDir, "robots.txt"), buildRobotsTxt(baseUrl));
  writeFileSync(resolve(publicDir, "sitemap.xml"), buildSitemapXml(baseUrl));
}

/**
 * Vite plugin: injects SEO meta + JSON-LD and keeps robots/sitemap in sync.
 * @returns {import('vite').Plugin}
 */
export function seoPlugin() {
  let root = process.cwd();
  let baseUrl = site.defaultUrl;

  return {
    name: "dia-b-seo",
    configResolved(config) {
      root = config.root;
      const env = loadEnv(config.mode, root, "");
      baseUrl = resolveSiteUrl(env.VITE_SITE_URL || process.env.VITE_SITE_URL);
    },
    buildStart() {
      writeSeoFiles(root, baseUrl);
    },
    configureServer() {
      writeSeoFiles(root, baseUrl);
    },
    transformIndexHtml(html) {
      const products = loadProducts(root);
      const jsonLd = buildJsonLd(baseUrl, products);
      const headTags = buildHeadTags(baseUrl);
      const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

      let next = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${site.language}"`);

      // Replace the static title; plugin tags include the canonical title.
      next = next.replace(/<title>[^<]*<\/title>\s*/i, "");

      next = next.replace(
        /<\/head>/i,
        `    ${headTags}\n    ${jsonLdScript}\n  </head>`,
      );

      return next;
    },
  };
}
