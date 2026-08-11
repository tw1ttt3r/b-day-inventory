import products from "#definitions/products.json"
import Product from "#components/product.mjs";

const Products = () => {
  return `
    <section class="flex flex-col gap-4 py-1">
      ${
        products.elements.map((p) => Product(p)).join("")
      }
    </section>
  `;
}

export default Products