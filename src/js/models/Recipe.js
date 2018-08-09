import axios from "axios";
import { key, proxy } from "../passkeys";

export default class Recipe {
  constructor(id) {
    // expected fields
    this.id = id;
    this.title;
    this.author;
    this.img;
    this.url;
    this.ingredients;
    this.time;
    this.servings;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;

      //   console.log(res);
    } catch (error) {
      console.log(error);
      alert("Something went wrong :(");
    }
  }

  // calculate cooking time
  calcTime() {
    // Assuming that we need 15min for every 3 ingredients
    // const numIng = this.ingredients.length; // gives undefined
    const numIng = 23; // manual
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
