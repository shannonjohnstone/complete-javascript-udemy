import { elements } from './base';
import trancate from '../utils/trancate';

/**
 * renderRecipes
 */
const renderRecipes = (element => {
  return recipe => {
    const markup = `
      <li>
          <a class="results__link" href="#${recipe.recipe_id}">
              <figure class="results__fig">
                  <img src="${recipe.image_url}" alt="Test">
              </figure>
              <div class="results__data">
                  <h4 class="results__name">${trancate(recipe.title, 17)}</h4>
                  <p class="results__author">${recipe.publisher}</p>
              </div>
          </a>
      </li>`;

    element.insertAdjacentHTML('beforeend', markup);
  };
})(elements.resultList);

/**
 * Buttons
 */
const buttons = (elements => {
  const types = {
    next: 'next',
    prev: 'prev',
  };

  const initButton = (page, type) => {
    return `
      <button class="btn-inline results__btn--${type}" data-goto=${
      type === types.prev ? page - 1 : page + 1
    }>
          <span> Page ${type === types.prev ? page - 1 : page + 1}</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${
                type === types.prev ? 'left' : 'right'
              }"></use>
          </svg>
      </button>`;
  };

  return {
    render: (page, numResults, resPerPage) => {
      const pages = Math.ceil(numResults / resPerPage);

      let button;
      if (page === 1 && pages > 1) {
        button = initButton(page, types.next);
      } else if (page < pages) {
        button = `
          ${initButton(page, types.prev)}
          ${initButton(page, types.next)}
        `;
      } else if (page === pages && pages > 1) {
        button = initButton(page, types.prev);
      }

      elements.searchResPages.insertAdjacentHTML('afterbegin', button);
    },
  };
})(elements);

export default ((document, elements, buttons) => ({
  getInput: () => elements.searchField.value,
  highlightSelected: id => {
    if (id) {
      Array.from(
        document.querySelectorAll(`.${elements.resultLink}`) || [],
      ).forEach(el => el.classList.remove(elements.resultLinkActive));

      document
        .querySelector(`a[href*="${id}"]`)
        .classList.add(elements.resultLinkActive);
    }
  },
  /**
   * clearing
   */
  clearInput: () => {
    elements.searchField.value = '';
  },

  clearResults: () => {
    elements.resultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
  },

  /**
   * render results
   * @param {Array} recipes
   * @param {Number} page
   * @param {Number} resPerPage
   */
  renderResults: (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipes);

    buttons.render(page, recipes.length, resPerPage);
  },
}))(document, elements, buttons);
