// Global app controller
import Search from "./models/Search";
import * as fxn from "./function/fns";

/**  Global state of the app */
/*- Search Object
/*- Current recipe object
/*- Shopping list object
/*- Liked recipes
*/

// DOM variables
const searchBtn = document.querySelector(".search");

// Event Listerners
searchBtn.addEventListener("submit", e => {
  e.preventDefault();
  fxn.controlSearch();
});

// const search = new Search("pizza");
// console.log(search);
// search.getResult();
