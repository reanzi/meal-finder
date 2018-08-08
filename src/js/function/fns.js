import Search from "../models/Search";
// import { elements } from "../views/dom";
import * as searchView from "../views/searchView";

// state
const state = {};

// functions
export const controlSearch = async () => {
  // 1 | Get query from view
  const query = searchView.getInput(); // TODO

  if (query) {
    //   2 | New search object and add to state
    state.search = new Search(query);
    // 3 | Prepare UI for results
    searchView.clearInput();
    searchView.clearResult();
    // 4 | Search for recipes
    await state.search.getResults();

    // 5 | Render results on UI
    searchView.renderResults(state.search.result);
  }
};
