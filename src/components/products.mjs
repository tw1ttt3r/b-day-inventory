import products from "../../definition/products.json"
import Product from "./product.mjs";

const Products = () => {
  return `
    <section class="flex flex-col gap-2 py-1">
      ${
        products.elements.map((p) => Product(p)).join("")
      }
    </section>
  `;
}

export default Products