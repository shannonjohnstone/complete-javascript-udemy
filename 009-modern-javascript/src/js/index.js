// Global app controller

/* eslint no-undef: 0 */
/* eslint no-console: 0 */

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import searchView from './views/searchView';
import recipeView from './views/recipeView';
import listView from './views/listView';
import likeView from './views/likeView';
import { elements, loader } from './views/base';
import Likes from './models/Likes';

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
    likeView.toggleLikeMenu(state.like && state.like.total());
    if (id) {
      const recipe = new Recipe(id);
      recipeView.clear();
      try {
        loader.init(elements.recipeItem, 'loader');
        loader.renderLoader();
        searchView.highlightSelected(state.results > 0 ? id : null);

        await recipe.fetchRecipe(id);
        state.item = recipe.item;
        state.item.id = id;

        loader.clearLoader();
        recipeView.render(state.item, state.like && state.like.isLiked(id));
      } catch (error) {
        throw new Error(error);
      } finally {
        loader.clearLoader();
      }
    }
  }),
);

const controlList = () => {
  if (!state.list) state.list = new List();

  state.item.ingredients.map(state.list.addItem.bind(state.list));
  state.list.items.forEach(listView.render);
};

const controlLike = () => {
  if (!state.like) state.like = new Likes();
  const id = state.item.id;

  if (!state.like.isLiked(id)) {
    state.like.add(state.item);
    likeView.toggleLike(true);
    likeView.render(state.item);
  } else {
    state.like.delete(id);
    likeView.toggleLike(false);
    likeView.remove(state.item.id);
  }
  likeView.toggleLikeMenu(state.like.total());
};

elements.shopping.addEventListener('click', el => {
  const id = el.target.closest('.shopping__item').dataset.itemid;

  if (el.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  }
});

elements.recipeItem.addEventListener('click', el => {
  if (el.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  } else if (el.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});
