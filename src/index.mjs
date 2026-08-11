import Icon from "#components/icon.mjs"
import Products from "#components/products.mjs"

const p = Products()

document.querySelector("#products").innerHTML = p
document.querySelector("#anio").innerHTML = new Date().getFullYear()