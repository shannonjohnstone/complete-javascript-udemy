const enterPressed = e => e.keyCode === 13;
const when = (cond, f) => x => (cond(x) ? f(x) : x);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const getElement = v => document.querySelector(v);

const budgetController = (() => {
  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: [],
      inc: [],
    },
  };

  return {
    // add new item public method
    addItem: (type, des, val) => {
      let newItem;

      // all items for a specific type
      const allItems = data.allItems[type];

      // generate ID base on what already exists
      const ID = allItems[allItems.length - 1].id + 1;

      // create type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // push created type to data
      allItems.push(newItem);
    },
    // get types public method
    getBudgetTypes: {
      EXP: 'exp',
      INC: 'inc',
    },
  };
})();

const UIController = (() => {
  const DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
  };

  return {
    getInput: () => {
      const type = getElement(DOMStrings.inputType).value;
      const description = getElement(DOMStrings.inputDescription).value;
      const value = getElement(DOMStrings.inputValue).value;
      return { type, description, value };
    },
    getDOMStrings: () => DOMStrings,
  };
})();

const controller = ((budgetCtrl, UICtrl) => {
  const contolAddItem = function() {
    const input = UICtrl.getInput();
    console.log(input);
  };

  const setupEventListeners = () => {
    const DOM = UICtrl.getDOMStrings();

    const controlOnEnter = compose(when(enterPressed, contolAddItem));

    document
      .querySelector(DOM.inputBtn)
      .addEventListener('click', contolAddItem);

    document.addEventListener('keypress', controlOnEnter);
  };

  /**
   * - get field input data
   * - add new item to budget controller
   * - add item to UI
   * - calculate budget
   * - display the budget on UI
   */
  return {
    init: () => {
      console.log('Application has started');
      setupEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
