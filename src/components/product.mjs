import Property from "#components/property.mjs";

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const Product = (product) => {
  const props = Object.entries(product.properties);
  const name = escapeHtml(product.name);
  const money = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(Number(product.price));

  return `
    <article class="flex flex-col items-center w-full">
      <div class="relative flex content-center items-center w-100 h-100">
        ${
          product.soldout
            ? "<div class=\"absolute top-0 w-full flex justify-end pr-1\"><span class=\"text-red-500\">AGOTADO</span></div>"
            : ""
        }
        <img src="${escapeHtml(product.image)}" alt="${name}" class="w-full h-full rounded-xl aspect-square" />
        <div class="absolute flex gap-1 bottom-0 text-[10px] bg-gray-50 bg-opacity-25 w-100 color-custom-olive-light">
          ${props.map(([k, v]) => Property(k, v)).join("")}
        </div>
      </div>
      <div class="px-1 flex justify-between w-100 color-custom-dark">
        <h2 class="text-base font-normal m-0">${name}</h2>
        <p>${money}</p>
      </div>
    </article>
  `;
};

export default Product;
