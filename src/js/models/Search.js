import axios from "axios";
import { key, proxy } from "../passkeys";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(
        `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      // console.log(res);
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch (error) {
      console.log(" Something went wrong " + error);
    }
  }
}

// getResult("tomato pasta");

// search query: http://food2fork.com/api/search
// api key: 34205959804fbc9c9d75742a43caf024
