import ListProductsCart from "#components/listProductsCart.mjs"
import { phone } from "#core/vars.mjs"

const store = {
  products: []
}

const renderProducts = () => {
  const b = document.querySelector("#cart-confirm-button")
  b.disabled = !store.products.length
  document.querySelector("#products-container")
    .innerHTML = !!store.products.length
      ? ListProductsCart(store.products)
      : "<i class=\"bi bi-cart-x text-5xl\"></i>";
}

export const addProductCart = (product) => {
  const productCount = store.products
    .filter((p) => p.name === product.name)
    .length

  if (productCount >= 2) {
    return false
  }

  store.products.push(product)
  renderProducts()

  return true
}

export const removeProductCart = (product) => {
  store.products = store.products
    .reduce((acc, p) => {
      if (product !== p.name) {
        acc = [...acc, p]
      }
      return acc
    }, [])
  renderProducts()
}

export const removeAllProductsCart = () => {
  store.products = []

  renderProducts()
}

export const confirm = () => {
  const sparkleEmoji = "\u2728\uFE0F"
  const mensaje = [
    `¡Hola, DÍA B! ${sparkleEmoji}`,
    "Quiero realizar el siguiente pedido:",
    ...store.products.map((p) => `- ${p.name}`)
  ].join("\n")

  const waUrl = new URL("https://api.whatsapp.com/send")
  waUrl.searchParams.set("phone", String(phone))
  waUrl.searchParams.set("text", mensaje)
  window.open(waUrl.toString(), "_blank");

  removeAllProductsCart()
}

export default store;