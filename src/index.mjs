import Icon from "#components/icon.mjs"
import Products from "#components/products.mjs"

const p = Products()

document.querySelector("#products").innerHTML = p
document.querySelector("#anio").innerHTML = new Date().getFullYear()
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