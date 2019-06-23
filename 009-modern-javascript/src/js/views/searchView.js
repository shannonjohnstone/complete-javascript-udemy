import { elements } from './base';
import trancate from '../utils/trancate';

const renderRecipes = element => recipe => {
  const markup = `
    <li>
        <a class="results__link results__link--active" href="#${
          recipe.recipe_id
        }">
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

export const clearInput = () => {
  elements.searchField.value = '';
};

export const clearResults = () => {
  elements.resultList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const getInput = () => elements.searchField.value;

const createButton = (page, type) => {
  return `
    <button class="btn-inline results__btn--${type}" data-goto=${
    type === 'prev' ? page - 1 : page + 1
  }>
        <span> Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type === 'prev' ? 'left' : 'right'
            }"></use>
        </svg>
    </button>`;
};

export const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipes(elements.resultList));

  renderButtons(page, recipes.length, resPerPage);
};
