# Dia B — Inventario

Catálogo web de productos (bisutería y accesorios) para el inventario de **Dia B**. La app renderiza una lista de artículos a partir de un JSON, con imagen, nombre, precio y propiedades (tipo, color, talla, material, etc.).

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

Otros scripts:

| Comando         | Descripción                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Servidor de desarrollo               |
| `pnpm build`    | Build de producción en `dist/`       |
| `pnpm preview`  | Vista previa del build de producción |

## Estructura

```
b-day-inventory/
├── definition/
│   └── products.json    # Catálogo de productos
├── public/              # Imágenes y assets estáticos
├── src/
│   ├── components/      # UI (products, product, property, icon)
│   ├── index.mjs        # Entrada de la app
│   └── style.css        # Tailwind + Bootstrap Icons
├── index.html
└── vite.config.js
```

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

| Campo        | Descripción                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| `image`      | Nombre del archivo en `public/`                                             |
| `name`       | Nombre visible                                                              |
| `price`      | Precio en MXN (se formatea con `Intl.NumberFormat`)                         |
| `properties` | Atributos mostrados sobre la imagen; las claves se mapean a iconos          |

Propiedades con icono: `type`, `color`, `material`, `size`, `talla`, `medida`.

### Agregar un producto

1. Coloca la imagen en `public/` (por ejemplo `.webp`).
2. Añade una entrada en `definition/products.json` con la ruta relativa del archivo (solo el nombre, sin carpeta).
3. Recarga la app en desarrollo.

## Licencia

ISC
