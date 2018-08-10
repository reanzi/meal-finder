import Search from "../models/Search";
import { elements, renderLoader, clearLoader } from "../views/base";
import * as searchView from "../views/searchView";

// state
export const state = {};

/**
 *   ##SEARCH CONTROLLER
 *
 */
export const controlSearch = async () => {
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
      alert("Something went wrong processing results");
      clearLoader();
    }
  }
};
export const navigate = () => {
  elements.searchResPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
      const gotToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResult();
      searchView.renderResults(state.search.result, gotToPage);
      // console.log(gotToPage);
    }
  });
};

// // /**
// //  *   ##RECIPE CONTROLLER
// //  *
// //  */

// const controlRecipe = async () => {
//   //Get ID from the url
//   const id = window.location.hash.replace("#", "");

//   console.log(id);

//   if (id) {
//     // Prepare UI for change

//     // create new recipe Object
//     state.recipe = new Recipe(id);

//     //Get recipe data
//     state.recipe.getRecipe();

//     //Calc serving and time

//     state.recipe.calcTime();
//     state.recipe.calcServings();

//     //render recipe
//     console.log(state.recipe);
//   }
// };

// window.addEventListener("hashchange", controlRecipe);
