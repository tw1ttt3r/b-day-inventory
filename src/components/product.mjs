import Property from "#components/property.mjs";
import Icon from "#components/icon.mjs";
import { addProductCart } from "#core/store.mjs";
import { escapeHtml, getMoney } from "#core/common.mjs";
import { time } from "#core/vars.mjs";

export const addProduct = (product) => {
  addProductCart(product);
};

export const changeIcon = (button) => {
  const icon = button.querySelector("i");
  if (!icon) return;

  icon.classList.remove("bi-plus-circle");
  icon.classList.add("bi-check2");

  const previousTimer = Number(button.dataset.iconResetTimer);
  if (previousTimer) {
    clearTimeout(previousTimer);
  }

  const timeoutId = window.setTimeout(() => {
    icon.classList.remove("bi-check2");
    icon.classList.add("bi-plus-circle");
    delete button.dataset.iconResetTimer;
  }, time);

  button.dataset.iconResetTimer = String(timeoutId);
};

const Product = (product) => {
  const props = Object.entries(product.properties);
  const name = escapeHtml(product.name);
  const money = getMoney(product.price);
  const addHandler = `changeIcon(this);addProduct(${JSON.stringify(product)})`;

  return `
    <article class="flex flex-col items-center w-full">
      <div class="relative flex content-center items-center w-100 h-100">
        <button type="button" onclick='${addHandler}' class="absolute bg-gray-50 rounded-full top-2 right-2 border-0 flex justify-center items-center h-7 w-7 cursor-pointer ${ product.soldout ? "hidden" : ""}">
          ${Icon("plus-circle")}
        </button>
        ${
          product.soldout
            ? "<div class=\"absolute top-2 right-1 w-full flex justify-end pr-1\"><span class=\"text-white bg-red-500 rounded px-1 text-[8px]\">AGOTADO</span></div>"
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
