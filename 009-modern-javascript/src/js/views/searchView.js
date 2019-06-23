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

export const clearResults = () => (elements.resultList.innerHTML = '');

export const getInput = () => elements.searchField.value;

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipes(elements.resultList));
};
