# Dia B — Inventario

Catálogo web de productos (joyería y accesorios) para el inventario de **Día B**. La app renderiza una lista de artículos a partir de un JSON, con imagen, nombre, precio y propiedades (tipo, color, talla, material, etc.).

## Stack

- [Vite](https://vite.dev/) — build y servidor de desarrollo
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- JavaScript (ES modules), sin framework

## Requisitos

- Node.js
- [pnpm](https://pnpm.io/) (el proyecto declara `pnpm` como package manager)

## Uso

```bash
pnpm install
pnpm dev
```

Copia [`.env.example`](.env.example) a `.env` y ajusta la URL canónica si tu dominio no es `https://diab.mx`:

```bash
cp .env.example .env
```

Otros scripts:

| Comando            | Descripción                                      |
| ------------------ | ------------------------------------------------ |
| `pnpm dev`         | Servidor de desarrollo                           |
| `pnpm build`       | Build de producción en `dist/`                   |
| `pnpm preview`     | Vista previa del build de producción             |
| `pnpm seo:assets`  | Regenera `og-image.jpg` y `apple-touch-icon.png` |

## Estructura

```
b-day-inventory/
├── definition/
│   └── products.json    # Catálogo de productos
├── public/              # Imágenes, robots.txt, sitemap, OG assets
├── scripts/
│   └── generate-seo-assets.mjs
├── src/
│   ├── components/      # UI (products, product, property, icon)
│   ├── seo/             # Metadata + plugin Vite de SEO
│   ├── index.mjs        # Entrada de la app
│   └── style.css        # Tailwind + Bootstrap Icons
├── index.html
└── vite.config.js
```

## SEO

El plugin en [`src/seo/vite-plugin-seo.mjs`](src/seo/vite-plugin-seo.mjs) inyecta en cada build/dev:

- Meta description, robots, canonical, theme-color
- Open Graph y Twitter Card
- JSON-LD (`Store`, `WebSite`, `ItemList` de productos desde `products.json`)
- `public/robots.txt` y `public/sitemap.xml` con la URL canónica

Configuración de marca y textos: [`src/seo/site.mjs`](src/seo/site.mjs).

Variable de entorno:

| Variable         | Default            | Uso                                      |
| ---------------- | ------------------ | ---------------------------------------- |
| `VITE_SITE_URL`  | `https://diab.mx`  | Canonical, OG, sitemap y URLs en JSON-LD |

### Checklist post-deploy

1. Confirmar `VITE_SITE_URL` apunta al dominio real antes del build.
2. Validar preview social (Facebook Sharing Debugger / Twitter Card Validator).
3. Enviar `sitemap.xml` en Google Search Console.
4. Si cambias logo o producto hero: `pnpm seo:assets`.

## Catálogo de productos

Los productos viven en [`definition/products.json`](definition/products.json). Cada elemento sigue esta forma:

```json
{
  "image": "nombre-archivo.webp",
  "name": "Nombre del producto",
  "price": "0.00",
  "properties": {
    "type": "Anillo",
    "color": "Dorado",
    "talla": "Ajustable",
    "material": "Acero Inoxidable"
  }
}
```

### Campos

| Campo        | Descripción                                                        |
| ------------ | ------------------------------------------------------------------ |
| `image`      | Nombre del archivo en `public/`                                    |
| `name`       | Nombre visible                                                     |
| `price`      | Precio en MXN (se formatea con `Intl.NumberFormat`)                |
| `properties` | Atributos mostrados sobre la imagen; las claves se mapean a iconos |
| `soldout`    | Opcional; marca agotado en UI y en JSON-LD                         |

Propiedades con icono: `type`, `color`, `material`, `size`, `talla`, `medida`.

### Agregar un producto

1. Coloca la imagen en `public/` (por ejemplo `.webp`).
2. Añade una entrada en `definition/products.json` con la ruta relativa del archivo (solo el nombre, sin carpeta).
3. Recarga la app en desarrollo.

## Licencia

ISC
