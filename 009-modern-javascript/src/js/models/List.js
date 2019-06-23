import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
    console.log(this, 'constructor');
  }

  addItem({ count, unit, ingredient }) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };

    this.items = [...this.items, item];
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}
