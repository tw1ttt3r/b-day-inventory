import ProductCart from "#components/productCart.mjs";

const ListProductsCart = (products) => {
  return `
    <section class="flex flex-col gap-1">
      ${
        products.map((p) => ProductCart(p)).join("")
      }
    </section>
  `
}

export default ListProductsCart