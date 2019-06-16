// Global app controller

/* eslint no-undef: 0 */
/* eslint no-console: 0 */

import Search from './models/Search';

// basic state managment object
const state = {};

/**
 * controlSearch
 *
 * function used to invoke search
 */
const controlSearch = async search => {
  if (!search.getResults) throw new Error('Search Module Required');

  await search.getResults();
  return search.results;
};

// events
document.querySelector('.search').addEventListener('submit', async e => {
  e.preventDefault();

  const searchQuery = document.querySelector('.search__field').value;
  if (searchQuery) {
    const res = await controlSearch(new Search(searchQuery));
    console.log(res);
  }
});
