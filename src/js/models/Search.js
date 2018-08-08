import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const key = "34205959804fbc9c9d75742a43caf024";
    //   const prox = "https://crossorigin.me/";
    const prox = "https://cors-anywhere.herokuapp.com/"; // handling 'cross-origin'
    try {
      const res = await axios(
        `${prox}http://food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      this.result = res.data.recipes;
      //   console.log(this.result);
    } catch (error) {
      console.log(" Something went wrong " + error);
    }
  }
}

// getResult("tomato pasta");

// search query: http://food2fork.com/api/search
// api key: 34205959804fbc9c9d75742a43caf024
