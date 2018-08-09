// Global app controller
import Search from "./models/Search";
import { elements } from "./views/base";
import * as fxn from "./function/fns";

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

// const search = new Search("pizza");
// console.log(search);
// search.getResult();
