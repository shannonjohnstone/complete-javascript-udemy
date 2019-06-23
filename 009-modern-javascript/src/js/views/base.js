/* eslint no-undef: 0 */

export const elements = {
  searchForm: document.querySelector('.seach'),
  searchField: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResPages: document.querySelector('.results__pages'),
  resultList: document.querySelector('.results__list'),
  resultLink: document.querySelector('.results__link'),
  resultLinkActive: document.querySelector('.results__link--active'),
  recipeItem: document.querySelector('.recipe'),
  ingredientList: document.querySelector('.recipe__ingredient-list'),
  recipeBtn: document.querySelector('.recipe__btn--add'),
  shopping: document.querySelector('.shopping__list'),
};

export const loader = (() => {
  let parentLocation = '';
  let className = '';

  return {
    init: (parent, classNameIs) => {
      parentLocation = parent;
      className = classNameIs;
    },
    renderLoader: () => {
      if (!parentLocation || !className)
        throw new Error('Loader: not intialated');

      const loader = `
        <div class="${className}">
          <svg>
            <use href="img/icons.svg#icon-cw"></use>
          </svg>
        </div>`;

      parentLocation.insertAdjacentHTML('afterbegin', loader);
    },
    clearLoader: () => {
      if (!className) throw new Error('Loader: not intialated');

      const loader = document.querySelector(`.${className}`);
      if (loader) loader.parentElement.removeChild(loader);
    },
  };
})();
