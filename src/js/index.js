// Global app controller
import axios from "axios";

async function getResult(query) {
  const key = "34205959804fbc9c9d75742a43caf024";
  //   const prox = "https://crossorigin.me/";
  const prox = "https://cors-anywhere.herokuapp.com/"; // handling 'cross-origin'
  try {
    const res = await axios(
      `${prox}http://food2fork.com/api/search?key=${key}&q=${query}`
    );
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error) {
    console.log(" Something went wrong " + error);
  }
}
getResult("pizza");

// search query: http://food2fork.com/api/search
// api key: 34205959804fbc9c9d75742a43caf024
