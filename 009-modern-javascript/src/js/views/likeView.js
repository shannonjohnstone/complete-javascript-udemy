import { elements } from './base';
import trancate from '../utils/trancate';

export default ((document, elements) => {
  // icon-heart
  // icon-heart-outlined
  return {
    render: item => {
      const markup = `
        <li>
            <a class="likes__link" href="#${item.id}">
                <figure class="likes__fig">
                    <img src="${item.image_url}" alt="${item.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${trancate(item.title, 17)}</h4>
                    <p class="likes__author">${item.publisher}</p>
                </div>
            </a>
        </li>`;

      elements.likeList.insertAdjacentHTML('beforeend', markup);
    },
    toggleLike: isLiked => {
      const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
      document
        .querySelector('.recipe__love use')
        .setAttribute('href', `img/icons.svg#${iconString}`);
    },
    remove: id => {
      const item = document.querySelector(`a[href*="#${id}"]`);
      item.parentElement.removeChild(item);
    },
    toggleLikeMenu: total => {
      elements.likesMenu.style.visibility = total > 0 ? 'visible' : 'hidden';
    },
  };
})(document, elements);
