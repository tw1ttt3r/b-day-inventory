import { escapeHtml, getMoney } from "#core/common.mjs";

const ProductCart = (product) => {
  const name = escapeHtml(product.name);
  const removeHandler = `removeProductCart(${JSON.stringify(product.name)})`;

  return `
    <div class="flex justify-between gap-1">
      <div class="h-6 w-6">
        <img src="${escapeHtml(product.image)}" alt="${name}" class="w-full h-full rounded-xl aspect-square" />
      </div>
      <div>${name}</div>
      <div>${getMoney(product.price)}</div>
      <div>
        <button type="button" onclick='${removeHandler}'>
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `;
};

export default ProductCart;
