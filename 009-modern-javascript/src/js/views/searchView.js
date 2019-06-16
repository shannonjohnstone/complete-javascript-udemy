import { elements } from './base';

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
                <h4 class="results__name">${recipe.title}</h4>
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
export const renderResults = recipes => {
  recipes.forEach(renderRecipes(elements.resultList));
};

// publisher": "Steamy Kitchen",
//         "f2f_url": "http://food2fork.com/view/48287",
//         "title": "Miso Ramen Recipe",
//         "source_url": "http://www.steamykitchen.com/15145-miso-ramen-recipe.html",
//         "recipe_id": "48287",
//         "image_url": "http://static.food2fork.com/misoramenrecipefeature20913200x1504d20.jpg",
//         "social_rank": 99.98892418245549,
//         "publisher_url": "http://www.steamykitchen.com"
