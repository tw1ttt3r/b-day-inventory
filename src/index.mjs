import Icon from "#components/icon.mjs"
import Products from "#components/products.mjs"
import { addProduct, changeIcon } from "#components/product.mjs"
import updateFloatingButtonPosition from "#components/floatingButton.mjs"
import { addProductCart, removeProductCart, confirm } from "./core/store.mjs"

const p = Products()

document.querySelector("#products").innerHTML = p
document.querySelector("#cart-confirm-button")
  .addEventListener("click", () => confirm())
window.addProduct = addProduct
window.changeIcon = changeIcon
window.addProductCart = addProductCart
window.removeProductCart = removeProductCart

document.querySelector("#anio").innerHTML = new Date().getFullYear()

const fb = document.querySelector(".floating-button")

fb.addEventListener("click", () => {
    const modal = document.querySelector("#modalCart")
    modal.showModal()
    modal.classList.remove("hidden")
    modal.classList.add("flex")
  })

updateFloatingButtonPosition(fb)
window.addEventListener("resize", () => updateFloatingButtonPosition(fb))
window.addEventListener("scroll", () => updateFloatingButtonPosition(fb), { passive: true })
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => updateFloatingButtonPosition(fb))
  window.visualViewport.addEventListener("scroll", () => updateFloatingButtonPosition(fb))
}

document.querySelector("#modalUsAction")
  .addEventListener("click", () => {
    const modal = document.querySelector("#modalUs")
    modal.showModal()
    modal.classList.remove("hidden")
    modal.classList.add("flex")
  })
document.querySelector("#closeModalUsAction")
  .addEventListener("click", () => {
    const modal = document.querySelector("#modalUs")
    modal.close()
    modal.classList.add("hidden")
    modal.classList.remove("flex")
  })
document.querySelector("#modalFilterAction")
  .addEventListener("click", () => {
    const modal = document.querySelector("#modalFilter")
    modal.showModal()
    modal.classList.remove("hidden")
    modal.classList.add("flex")
  })
document.querySelector("#closeModalFilterAction")
  .addEventListener("click", () => {
    const modal = document.querySelector("#modalFilter")
    modal.close()
    modal.classList.add("hidden")
    modal.classList.remove("flex")
  })
document.querySelector("#closeModalCartAction")
  .addEventListener("click", () => {
    const modal = document.querySelector("#modalCart")
    modal.close()
    modal.classList.add("hidden")
    modal.classList.remove("flex")
  })