import * as helpers from './helpers';

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
    test: () => {},
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
      const type = helpers.getElement(DOMStrings.inputType).value;
      const description = helpers.getElement(DOMStrings.inputDescription).value;
      const value = helpers.getElement(DOMStrings.inputValue).value;
      return { type, description, value };
    },
    addListItem: (data, type) => {
      // get expense/income DOM class
      const listClass = DOMStrings[`${type}List`];

      // insert expense/income HTML
      return helpers
        .getElement(listClass)
        .insertAdjacentHTML('beforeend', HTML[type](data));
    },
    clearFields: () => {
      // get requiered fields
      const fields = helpers.getElementAll(
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

      helpers.getElement(DOMStrings.budgetIncomeDisplay).textContent =
        budget.totals.inc;
      helpers.getElement(DOMStrings.budgetExpensesDisplay).textContent =
        budget.totals.exp;

      helpers.getElement(
        DOMStrings.budgetTotal,
      ).textContent = resolveBudgetSymbol(budget.budget);

      helpers.getElement(DOMStrings.percentage).textContent = resolvePercentage(
        budget.percentage,
      );
    },
    getDOMStrings: () => DOMStrings,
  };
})();

export default UIController;
