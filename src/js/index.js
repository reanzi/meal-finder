// Global app controller
import Search from "./models/Search";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import Recipe from "./models/Recipe";

/**  Global state of the app */
/*- Search Object
/*- Current recipe object
/*- Shopping list object
/*- Liked recipes
*/

// state
const state = {};

/**
 *   ##SEARCH CONTROLLER
 *
 */
const controlSearch = async () => {
  // 1 | Get query from view
  const query = searchView.getInput(); // TODO
  // const query = "pasta"; // TESTING

  if (query) {
    //   2 | New search object and add to state
    state.search = new Search(query);
    // 3 | Prepare UI for results
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.searchRes);

    try {
      // 4 | Search for recipes
      await state.search.getResults();

      // 5 | Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      console.log(err);
      alert("Something wrong with the search...");
      clearLoader();
    }
  }
};

// Event Listerners
elements.searchBtn.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

// //TESTING
// window.addEventListener("load", e => {
//   e.preventDefault();
//   fxn.controlSearch();
// });

elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const gotToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResult();
    searchView.renderResults(state.search.result, gotToPage);
    // console.log(gotToPage);
  }
});

/**
 *   ##RECIPE CONTROLLER
 */

const controlRecipe = async () => {
  //Get ID from the url
  const id = window.location.hash.replace("#", "");

  // console.log(id);

  if (id) {
    // Prepare UI for change
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // create new recipe Object
    state.recipe = new Recipe(id);

    //TESTING
    // window.r = state.recipe;

    try {
      //Get recipe data & parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      //Calc serving and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //render recipe
      // console.log(state.recipe);
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      console.log(error);
      alert("Error Processing the Recipe :) FROM RECIPE CTRL");
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener('load', controlRecipe);

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
