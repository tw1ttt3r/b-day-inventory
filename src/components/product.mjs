import Property from "#components/property.mjs";

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
        ${
          product.soldout
            ? "<div class=\"absolute top-0 w-full flex justify-end pr-1\"><span class=\"text-red-500\">AGOTADO</span></div>"
            : ""
        }
        
        <img src="${product.image}" alt="${alt}" class="w-full h-full rounded-xl aspect-square" />
        <div class="absolute flex gap-1 bottom-0 text-[10px] bg-gray-50 bg-opacity-25 w-100">
          ${props.map(([k, v]) => Property(k, v)).join("")}
        </div>
      </div>
      <div class="px-1 flex justify-between w-100">
        <p>${product.name}</p>
        <p>${money}</p>
      </div>
    </div>
  `
}

export default Product