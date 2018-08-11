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

      // console.log(res.data.recipe.ingredients.length);
      this.ingredients = res.data.recipe.ingredients;
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;

      // console.log(this.ingredients.length); // here it works
    } catch (error) {
      console.log(error);
      alert("Something went wrong :( FROM RECIPE");
    }
  }
  // calculate cooking time
  calcTime() {
    // console.log(this.ingredients);
    // Assuming that we need 15min for every 3 ingredients
    const numIng = this.ingredients.length;
    // const numIng = 23; // manual
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    // var that = this;
    const unitsLong = [
      "tablespoons",
      "Tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cup",
      "cups",
      "cans",
      "pound"
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "cup",
      "cup",
      "cup",
      "pound"
    ];
    const units = [...unitsShort, "kg", "g"];

    const newIngredients = this.ingredients.map(el => {
      // 1 | Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2 | Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // 3 | Parse Ingredients into CountQueuingStrategy, unit an ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2)); //finding the index of unit

      let objIng;
      if (unitIndex > -1) {
        //there is a unit
        /**
         * ex.  4 1/2 cups, arrCount is [4, 1/2]
         * ex. 4 cups, arrCount is [4]
         */
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" ")
        };
      } else if (parseInt(arrIng[0], 10)) {
        //there ia no unit, but 1st element is number in 1st position
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" ")
        };
      } else if (unitIndex === -1) {
        //there is no unit and no number in 1st position
        objIng = {
          count: 1,
          unit: "",
          ingredient
        };
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }

  updateServings(type) {
    //Servings
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

    //Ingredients
    this.ingredients.forEach(ing => {
      // ing.count = ing.count * (newServings / this.servings);
      ing.count *= newServings / this.servings;
    });
    this.servings = newServings;
  }
}
