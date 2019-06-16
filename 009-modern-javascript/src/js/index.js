// Global app controller
import axios from 'axios';

async function getResults(query) {
  // const API_KEY = 'dcaa1bfe8797a1e7dfddf5adcbe72560';
  const API_KEY = 'XXXdcaa1bfe8797a1e7dfddf5adcbe72560';
  const PROXY = 'https://cors-anywhere.herokuapp.com/';
  try {
    const res = await axios(
      `${PROXY}https://www.food2fork.com/api/search?key=${API_KEY}&q=${query}`,
    );
    console.log(res.data.recipes);
  } catch (error) {
    if (error.response) {
      throw new Error(error.data);
    }
    throw new Error('Unauthorised');
  }
}

getResults('ramen');
