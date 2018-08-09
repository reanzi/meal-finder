import Search from "../models/Search";
import { elements, renderLoader, clearLoader } from "../views/base";
import * as searchView from "../views/searchView";
import Recipe from "../models/Recipe";

// state
const state = {};

/**
 *   ##SEARCH CONTROLLER
 *
 */
export const controlSearch = async () => {
  // 1 | Get query from view
  const query = searchView.getInput(); // TODO

  if (query) {
    //   2 | New search object and add to state
    state.search = new Search(query);
    // 3 | Prepare UI for results
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.searchRes);
    // 4 | Search for recipes
    await state.search.getResults();

    // 5 | Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
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

// /**
//  *   ##RECIPE CONTROLLER
//  *
//  */
const r = new Recipe(46956);
r.getRecipe();
console.log(r);
