// Global app controller

/* eslint no-undef: 0 */
/* eslint no-console: 0 */

import Search from './models/Search';
import Recipe from './models/Recipe';
import searchView from './views/searchView';
import recipeView from './views/recipeView';
import { elements, loader } from './views/base';

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
  loader.init(elements.searchRes, 'loader');
  loader.renderLoader();
  await search.getResults();
  state.results = search.results;
  loader.clearLoader();

  return state.results;
};

// events
document.querySelector('.search').addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = searchView.getInput();

  if (searchQuery) {
    await controlSearch(new Search(searchQuery));
    searchView.renderResults(state.results);
  }
});

elements.searchResPages.addEventListener('click', el => {
  const button = el.target.closest('.btn-inline');
  if (button) {
    searchView.clearResults();
    searchView.renderResults(state.results, parseInt(button.dataset.goto));
  }
});

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, async () => {
    const id = window.location.hash.replace('#', '');
    if (id) {
      const recipe = new Recipe(id);
      recipeView.clear();
      try {
        loader.init(elements.recipeItem, 'loader');
        loader.renderLoader();
        searchView.highlightSelected(
          state.results > 0 ? window.location.hash : null,
        );

        await recipe.fetchRecipe(id);
        state.item = recipe.item;

        loader.clearLoader();
        recipeView.render(state.item);
      } catch (error) {
        throw new Error(error);
      } finally {
        loader.clearLoader();
      }
    }
  }),
);
