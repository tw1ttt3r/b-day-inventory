import products from "#definitions/products.json"
import Product from "#components/product.mjs";

const Products = () => {
  return `
    <section class="flex flex-col gap-4 py-1" aria-label="Catálogo de productos">
      ${
        products.elements.map((p) => Product(p)).join("")
      }
    </section>
  `;
}

export default Products