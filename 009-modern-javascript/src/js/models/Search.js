import API from './API';
/**
 * Search
 *
 * Class for encapulating search food2fork search logic
 */
export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResults() {
    try {
      const res = await API.fetchRecipes(this.query);
      this.results = res.data.recipes;
    } catch (error) {
      console.log(error); // eslint-disable-line
      if (error.response) {
        throw new Error(error.data);
      }
      throw new Error('Unauthorised');
    }
  }
}
