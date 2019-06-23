export default class Likes {
  constructor() {
    this.likes = [];
  }

  add({ id, title, publisher, image_url }) {
    const like = { id, title, publisher, image_url };
    this.likes = [...this.likes, like];
    return like;
  }

  delete(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
  }

  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  total() {
    return this.likes.length;
  }
}
