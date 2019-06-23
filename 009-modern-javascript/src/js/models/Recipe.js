import API from './API';
export default class Recipe {
  constructor(id) {
    this.id = id;
    this.item = {};
  }
  async fetchRecipe() {
    try {
      const res = await API.fetchRecipe(this.id);
      this.item.title = res.data.recipe.title; // wrong
      this.item.author = res.data.recipe.author;
      this.item.img = res.data.recipe.img;
      this.item.url = res.data.recipe.url;
      this.item.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      throw new Error(error);
    }
  }
}
