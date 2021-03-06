// Global app controller
import Search from "./models/Search";
import { elements, renderLoader, clearLoader } from "./views/base";
import List from "./models/List";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likeView from "./views/likeView";
import Recipe from "./models/Recipe";
import Likes from "./models/Likes";

/**  Global state of the app */
/*- Search Object
/*- Current recipe object
/*- Shopping list object
/*- Liked recipes
*/

// state
const state = {};
window.state = state; // For testing
//////   **********    CONTROLLERS   *************   /////////
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

// Event Delegation; b'se initially the target element is not in the DOM
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

    //Highlight Selected Item
    if (state.search) searchView.highlightSelected(id); // if there's a search result

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
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
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

/**
 * LIST CONTROLLER
 */
// state.likes = new Likes(); //for testing
// likeView.toggleLikeMenu(state.likes.getNumLikes());
// // const likes = state.likes.getNumLikes().length;
const controlList = () => {
  // Controll a new List if there is nono yet
  if (!state.list) state.list = new List();

  // add each ingredients to the List & UI

  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

/**
 *   ## LIKES CONTROLLER
 */
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  // User has not liked the recipe yet
  if (!state.likes.isLiked(currentID)) {
    //add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    //Toggle the like btn
    likeView.toggleLikeBtn(true);

    //add the like to the UI list
    likeView.renderLikes(newLike);

    // User Liked current recipe
  } else {
    //remove like to from the state
    state.likes.deleteLike(currentID);
    //Toggle the like btn
    likeView.toggleLikeBtn(false);
    //remove the like to from the UI list
    likeView.deleteLike(currentID);
  }
  likeView.toggleLikeMenu(state.likes.getNumLikes());
  elements.badge.innerHTML = state.likes.getNumLikes();
};

//////   **********    Events Delegations    *************   ///////////
// Event Deligation:  Handling delete and update list events
elements.shopping.addEventListener("click", e => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  // Handle Delete btn
  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    // delete from state
    state.list.deleteItem(id);

    // delete from UI
    listView.deleteItem(id);

    // Handle the Count update
  } else if (e.target.matches(".shopping__count-value")) {
    // read the value from the UI & update state
    let val = parseFloat(e.target.value, 10);
    if (val >= 0) {
      state.list.updateCount(id, val);
      listView.enableList(id);
    } else {
      // alert("Negative values are not accepted");
      listView.disableList(id);
    }
  }
});

// Restoring the liked Recipes on page Load
window.addEventListener("load", () => {
  state.likes = new Likes();

  // restore from localStorage
  state.likes.readStorage();

  // Toggle like menu Btn
  likeView.toggleLikeMenu(state.likes.getNumLikes());
  // const allLike = state.likes.getNumLikes();
  // console.log(allLike);

  // Render the existing likes
  elements.badge.innerHTML = state.likes.getNumLikes();
  state.likes.likes.forEach(like => likeView.renderLikes(like));
});

// Event Deligation:  Handling recipe btn clicks
elements.recipe.addEventListener("click", e => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    //Decrease is clicked if
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    //Increase is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    // Call Like Controller
    controlLike();
  }

  // console.log(state.recipe);
});

window.l = new List();
