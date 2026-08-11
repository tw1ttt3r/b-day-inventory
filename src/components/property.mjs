import Icon from "./icon.mjs"

const Property = (prop, value) => {

  const icon = {
    type: "puzzle",
    color: "palette",
    material: "box",
    size: "arrows",
    talla: "list-ol",
    medida: "rulers"
  }

  return `
    <div class="flex gap-0.5 justify-center items-center">
      ${Icon(icon[prop])} 
      <span>${value}</span>
    </div>
  `
}

export default Property