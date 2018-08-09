import { elements } from "./dom";
// import * as fxn from "../function/fns";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResult = () => {
  elements.searchResList.innerHTML = "";
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

export const renderResults = recipes => {
  //   console.log(recipes);
  recipes.forEach(renderRecipe);
};
