// Global app controller

/* eslint no-undef: 0 */
/* eslint no-console: 0 */

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

// basic state managment object
const state = {};

/**
 * controlSearch
 *
 * function used to invoke search
 */
const controlSearch = async search => {
  searchView.clearResults();
  if (!search.getResults) throw new Error('Search Module Required');

  searchView.clearInput();
  await search.getResults();

  return search.results;
};

// events
document.querySelector('.search').addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = searchView.getInput();

  if (searchQuery) {
    const results = await controlSearch(new Search(searchQuery));
    searchView.renderResults(results);
  }
});
