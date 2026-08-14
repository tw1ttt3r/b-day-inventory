/**
 * One-shot generator for social/SEO raster assets.
 * Usage: node scripts/generate-seo-assets.mjs
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const products = JSON.parse(
  readFileSync(resolve(root, "definition/products.json"), "utf8"),
);
const heroPath = resolve(root, "public", products.elements[0].image);
const logoPath = resolve(root, "public", "DIAB-B.svg");

const W = 1200;
const H = 630;
const bg = { r: 250, g: 248, b: 245, alpha: 1 };
const productSize = 480;

const productBuf = await sharp(heroPath)
  .resize(productSize, productSize, { fit: "cover" })
  .png()
  .toBuffer();

const logoBuf = await sharp(logoPath)
  .resize({
    width: 220,
    height: 260,
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

const svgText = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="80" y="420" font-family="Georgia, serif" font-size="64" fill="#1d1d1b">Día B</text>
  <text x="80" y="470" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#4a4a48">Catálogo de joyería</text>
</svg>
`);

await sharp({
  create: { width: W, height: H, channels: 3, background: bg },
})
  .composite([
    { input: logoBuf, left: 80, top: 100 },
    { input: svgText, left: 0, top: 0 },
    {
      input: productBuf,
      left: W - productSize - 80,
      top: Math.round((H - productSize) / 2),
    },
  ])
  .jpeg({ quality: 88 })
  .toFile(resolve(root, "public/DIAB-B.svg"));

const iconSize = 180;
const iconPad = 24;
const iconLogo = await sharp(logoPath)
  .resize(iconSize - iconPad * 2, iconSize - iconPad * 2, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: iconSize,
    height: iconSize,
    channels: 3,
    background: { r: 250, g: 248, b: 245 },
  },
})
  .composite([{ input: iconLogo, gravity: "centre" }])
  .png()
  .toFile(resolve(root, "public/apple-touch-icon.png"));

console.log("Wrote public/DIAB-B.svg and public/apple-touch-icon.png");
