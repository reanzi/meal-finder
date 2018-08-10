// import Recipe from "../models/Recipe";
// import { state } from "./searchCtrl";

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

//     //TESTING
//     // window.r = state.recipe;

//     try {
//       //Get recipe data & parse ingredients
//       state.recipe.getRecipe();
//       state.recipe.parseIngredients();

//       //Calc serving and time

//       state.recipe.calcTime();
//       state.recipe.calcServings();

//       //render recipe
//       console.log(state.recipe);
//     } catch (error) {
//       console.log(error);
//       alert("Error Processing the Recipe");
//     }
//   }
// };

// // window.addEventListener("hashchange", controlRecipe);
// // window.addEventListener('load', controlRecipe);

// ["hashchange", "load"].forEach(event =>
//   window.addEventListener(event, controlRecipe)
// );
