/* eslint no-undef: 0 */

export const elements = {
  searchForm: document.querySelector('.seach'),
  searchField: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  resultList: document.querySelector('.results__list'),
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
