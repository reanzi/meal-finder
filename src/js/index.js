// Global app controller
import Search from "./models/Search";
import { elements } from "./views/base";
import * as fxn from "./function/fns";
import * as searchView from "./views/searchView";

/**  Global state of the app */
/*- Search Object
/*- Current recipe object
/*- Shopping list object
/*- Liked recipes
*/

// Event Listerners
elements.searchBtn.addEventListener("submit", e => {
  e.preventDefault();
  fxn.controlSearch();
});

fxn.navigate();

// elements.searchResPages.addEventListener("click", e => {
//   const btn = e.target.closest(".btn-inline");
//   if (btn) {
//     const gotToPage = parseInt(btn.dataset.goto, 10);
//     searchView.renderResults(state.search.result, gotToPage);
//     console.log(gotToPage);
//   }
// });
