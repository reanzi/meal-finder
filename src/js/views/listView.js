import { elements } from "./base";

export const renderItem = item => {
  const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${
    item.count
  }" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
  // one is added after the other
  elements.shopping.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) item.parentElement.removeChild(item);
};

export const disableList = id => {
  const list = document.querySelector(`[data-itemid="${id}"]`);
  list.classList.add("disabled");
};
export const enableList = id => {
  const list = document.querySelector(`[data-itemid="${id}"]`);
  list.classList.remove("disabled");
};
