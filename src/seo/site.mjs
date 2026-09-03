import { url } from "#core/vars.mjs";

/** Site metadata for SEO (meta tags, Open Graph, JSON-LD). */

export const site = {
  name: "Día B",
  title: "Día B — Catálogo de joyería y accesorios",
  description:
    "Catálogo de Día B: anillos, aretes, collares, pulseras y tobilleras. Joyería con mucho amor.",
  locale: "es_MX",
  language: "es",
  defaultUrl: url,
  ogImagePath: "/DIAB-B.png",
  themeColor: "#1d1d1b",
  twitterCard: "summary_large_image",
};

/**
 * @param {string | undefined} envUrl
 * @returns {string} Canonical site origin without trailing slash
 */
export function resolveSiteUrl(envUrl) {
  const raw = (envUrl || site.defaultUrl).trim();
  return raw.replace(/\/$/, "");
}

/**
 * @param {string} baseUrl
 * @param {string} path
 */
export function absoluteUrl(baseUrl, path) {
  const base = baseUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
