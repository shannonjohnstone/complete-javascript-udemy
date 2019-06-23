import { elements } from './base';
import trancate from '../utils/trancate';

export default (elements => {
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
    remove: id => {
      const item = document.querySelector(`a[href*="#${id}"]`);
      item.parentElement.removeChild(item);
    },
  };
})(elements);
