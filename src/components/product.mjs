import Property from "./property.mjs";

const Product = (product) => {

  const alt = product.image.split(".")[0];
  const props = Object.entries(product.properties);
  const money = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(Number(product.price));

  return `
    <div class="flex flex-col items-center w-full">
      <div class="relative flex content-center items-center w-100 h-100">
        <img src="${product.image}" alt="${alt}" class="w-full h-full rounded-xl aspect-square" />
        <div class="absolute flex gap-1 bottom-0 text-xs bg-gray-50 bg-opacity-25 w-full">
          ${props.map(([k, v]) => Property(k, v)).join("")}
        </div>
      </div>
      <div class="px-1 flex justify-around w-full">
        <p>${product.name}</p>
        <p>${money}</p>
      </div>
    </div>
  `
}

export default Product