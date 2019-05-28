const enterIsPressed = e => e.keyCode === 13;
const when = (cond, f) => x => (cond(x) ? f(x) : x);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const getElement = v => document.querySelector(v);
const getElementAll = v => document.querySelectorAll(v);

/**
 * Budget Controller
 */
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
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: 0,
  };

  // all items for a specific type
  const getAllItems = data.allItems;
  const getTotals = data.totals;

  return {
    // add new item public method
    addItem: (type, des, val) => {
      let newItem;

      const allItems = getAllItems[type];

      // generate ID base on what already exists
      const ID = allItems.length > 0 ? allItems[allItems.length - 1].id + 1 : 1;

      // create type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // push created type to data
      allItems.push(newItem);
      return newItem;
    },
    calculateTotals: () => {
      const { inc, exp } = getAllItems;

      const calc = (arr, key) =>
        arr.reduce((val, item) => parseInt(item[key]) + parseInt(val), 0);

      getTotals['exp'] = calc(exp, 'value');
      getTotals['inc'] = calc(inc, 'value');
      data.budget = getTotals['inc'] - getTotals['exp'];
      data.percentage = Math.round((getTotals['exp'] / getTotals['inc']) * 100);
    },
    getBudget: () => {
      const { totals, budget, percentage } = data;
      return { totals, budget, percentage };
    },
    // get types public method
    getBudgetTypes: {
      EXP: 'exp',
      INC: 'inc',
    },
    // testing method, will be removed
    testing: () => {
      console.log(data); // eslint-disable-line
    },
  };
})();

/**
 * UI Controller
 */
const UIController = (() => {
  const DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    expList: '.expenses__list',
    incList: '.income__list',
    budgetIncomeDisplay: '.budget__income--value',
    budgetExpensesDisplay: '.budget__expenses--value',
    budgetTotal: '.budget__value',
    percentage: '.budget__expenses--percentage',
  };

  const HTML = {
    inc: ({ id, description, value }) => {
      return `<div class="item clearfix" id="income-${id}">
          <div class="item__description">${description}</div>
          <div class="right clearfix">
              <div class="item__value">+ ${value}</div>
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
      </div>`;
    },
    exp: ({ id, description, value }) => {
      return `<div class="item clearfix" id="expense-${id}">
        <div class="item__description">${description}</div>
        <div class="right clearfix">
            <div class="item__value">- ${value}</div>
            <div class="item__percentage">21%</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>`;
    },
  };

  return {
    getInput: () => {
      const type = getElement(DOMStrings.inputType).value;
      const description = getElement(DOMStrings.inputDescription).value;
      const value = getElement(DOMStrings.inputValue).value;
      return { type, description, value };
    },
    addListItem: (data, type) => {
      // get expense/income DOM class
      const listClass = DOMStrings[`${type}List`];

      // insert expense/income HTML
      return getElement(listClass).insertAdjacentHTML(
        'beforeend',
        HTML[type](data),
      );
    },
    clearFields: () => {
      // get requiered fields
      const fields = getElementAll(
        `${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`,
      );

      const fieldsArray = Array.from(fields);
      fieldsArray.forEach(item => (item.value = ''));

      fieldsArray[0].focus();
    },
    displayTotals: budget => {
      const resolveBudgetSymbol = budget => {
        let symbol = '';
        if (budget) symbol = budget > 0 ? '+' : '-';
        return `${symbol} ${budget}`;
      };

      const resolvePercentage = percentage => {
        if (percentage) return `${percentage}%`;
        return '---';
      };

      getElement(DOMStrings.budgetIncomeDisplay).textContent =
        budget.totals.inc;
      getElement(DOMStrings.budgetExpensesDisplay).textContent =
        budget.totals.exp;

      getElement(DOMStrings.budgetTotal).textContent = resolveBudgetSymbol(
        budget.budget,
      );

      getElement(DOMStrings.percentage).textContent = resolvePercentage(
        budget.percentage,
      );
    },
    getDOMStrings: () => DOMStrings,
  };
})();

/**
 * App Controller
 */
const controller = ((budgetCtrl, UICtrl) => {
  const updateBudget = () => {
    budgetCtrl.calculateTotals();
    const budget = budgetCtrl.getBudget();

    UICtrl.displayTotals(budget);
  };

  const contolAddItem = function() {
    const input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      const newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value,
      );
      UICtrl.addListItem(newItem, input.type);
      updateBudget();
      UICtrl.clearFields();
    }
  };

  const setupEventListeners = () => {
    const DOM = UICtrl.getDOMStrings();

    // events for adding items
    getElement(DOM.inputBtn).addEventListener('click', contolAddItem);
    document.addEventListener(
      'keypress',
      compose(when(enterIsPressed, contolAddItem)),
    );
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
      UICtrl.displayTotals(budgetCtrl.getBudget());
      setupEventListeners();
    },
  };
})(budgetController, UIController);

// init
controller.init();
