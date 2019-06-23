import axios from 'axios';
import * as config from '../config.js';

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
export default ((config, data) => {
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

  return {
    fetchRecipes: async query => {
      if (config.TEST) {
        const res = await mockRequest(data['recipes'])();
        return res;
      } else {
        return await axios(`${config.RECIPES_URL}&q=${query}`);
      }
    },
    fetchRecipe: async id => {
      if (config.TEST) {
        return await mockRequest(data['recipe'])();
      } else {
        return await axios(`${config.RECIPE_URL}&rId=${id}`);
      }
    },
  };
})(config, config.TEST ? require('./__mock__/data.json') : null);
