import axios from 'axios';
import data from './__mock__/data.json';

/**
 * mockRequest
 *
 * Mock request for resolving mock data
 * Reason: food2fork API only gets 50 request on free API key
 *
 * @param {Array} _data
 * @returns {Array}
 */
const mockRequest = _data => async () => {
  const res = new Promise(resolve => {
    setTimeout(async () => {
      return resolve(_data);
    }, 500);
  });

  return res;
};

/**
 * request
 * Fucntion for making request
 *
 * Currently this method will check if its `test` or not and make a real API request or mock data
 * Reason: food2fork API free API key is limited to 50 requests a day
 *
 * @param {Boolean} test
 * @param {Array} data
 */
const request = (test, data) => async query => {
  // const API_KEY = 'dcaa1bfe8797a1e7dfddf5adcbe72560'; // sj
  const API_KEY = 'e42fdbc7dd265a0b6ce95faf5a5536ac'; //sj84
  const PROXY = 'https://cors-anywhere.herokuapp.com/';

  if (test) {
    const res = await mockRequest(data)();
    return res;
  } else {
    const res = await axios(
      `${PROXY}https://www.food2fork.com/api/search?key=${API_KEY}&q=${query}`,
    );
    return res.data.recipes;
  }
};

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
      this.results = await request(true, data)(this.query);
    } catch (error) {
      if (error.response) {
        throw new Error(error.data);
      }
      throw new Error('Unauthorised');
    }
  }
}
