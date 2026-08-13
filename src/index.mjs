import Icon from "#components/icon.mjs"
import Products from "#components/products.mjs"

const p = Products()

document.querySelector("#products").innerHTML = p
document.querySelector("#anio").innerHTML = new Date().getFullYear()
document.querySelector("#modalUsAction")
  .addEventListener("click", () => {
    const modal = document.querySelector("#modalUs")
    modal.showModal()
  })
document.querySelector("#closeModalUsAction")
  .addEventListener("click", () => {
    const modal = document.querySelector("#modalUs")
    modal.close()
  })
document.querySelector("#modalFilterAction")
  .addEventListener("click", () => {
    const modal = document.querySelector("#modalFilter")
    modal.showModal()
  })
document.querySelector("#closeModalFilterAction")
  .addEventListener("click", () => {
    const modal = document.querySelector("#modalFilter")
    modal.close()
  })