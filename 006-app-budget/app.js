const enterPressed = e => e.keyCode === 13;
const when = (cond, f) => x => (cond(x) ? f(x) : x);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const getElement = v => document.querySelector(v);

const budgetController = (() => {
  const x = 10;
  const add = a => x + a;

  return {
    publicTest: a => {
      const result = add(a);
      return result;
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
