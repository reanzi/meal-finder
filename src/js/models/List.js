import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  //   CRUD Operations
  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }
  deleteItem(id) {
    //   finding the index
    const index = this.items.findIndex(el => el.id === id);
    console.log(index);
    const meal = this.items.findIndex(el => el.id === id).title;
    console.log(meal);

    /**
     * we will use splice, which remove the item and mutate (change) the array
     *  while, slice return the item without mutating the original
     *
     * splice(1,1) ; (1 ->index(start), 1 -> (elements to take/ remove))
     * [2, 4, 8]  splice(1,1) --> 4
     * [2, 4, 8]  splice(1,2) --> 4,8
     *
     * slice(1,1) ; (1 ->(start index), 1 -> (stop index) not included)
     * [2, 4, 8]  slice(1,1) --> nothing
     * [2, 4, 8]  slice(1,2) --> 4
     *
     *
     * ex splice | [2, 4, 8]  splice(1,1) -> return 4, and the mutate original array to [2, 8]
     * ex slice | [2, 4, 8]  slice(1,2) -> return 4, and not mutate original array remain [2, 4, 8]
     */

    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}
