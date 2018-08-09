import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResult = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};
// limiting the length of title
/* example; 'pasta with tomato and spinach' => splitted by space gives 5 words
initial = 0;
1st > acc: 0, acc + cur.length(5) = 5 / newTitle = ['pasta']
2nd > acc: 5, acc + cur.length(5) = 9 / newTitle = ['pasta', 'with']
3rd > acc: 9, acc + cur.length(5) = 15 / newTitle = ['pasta', 'with', 'tomato']
4th > acc: 15, acc + cur.length(5) = 18 / newTitle = ['pasta', 'with', 'tomato', 'and'] (and is not passed)


*/
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0); //0 is initial value of accumulator(acc)
    // return results
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

// const recipe = fxn.renderRecipe(recipe);
const renderRecipe = recipe => {
  const markup = `
        <li>
            <a class="results__link results__link--active" href="#${
              recipe.recipe_id
            }">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )} ...</h4>
                    <p class="results__author">${recipe.publisher} </p>
                </div>
            </a>
        </li>
    `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

//create btn fxn
// type: prev or next
const createBtns = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
            <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${
                  type === "prev" ? "left" : "right"
                }"></use>
            </svg>
        </button>
`;
// render the prev & next buttons
const renderBtns = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    //only btn to go to next page
    button = createBtns(page, "next");
  } else if (page < pages) {
    //both btn
    button = `
        ${createBtns(page, "prev")}
        ${createBtns(page, "next")}
        `;
  } else if (page === pages && pages > 1) {
    //only btn to go to prev page
    button = createBtns(page, "prev");
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render result of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  //   render pagination buttons
  renderBtns(page, recipes.length, resPerPage);
};
