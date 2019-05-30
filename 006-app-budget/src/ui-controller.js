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
    percentageItem: '.item__percentage',
    container: '.container',
  };

  const HTML = {
    inc: ({ id, description, value }) => {
      return `<div class="item clearfix" id="inc-${id}">
            <div class="item__description">${description}</div>
            <div class="right clearfix">
                <div class="item__value">${value}</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`;
    },
    exp: ({ id, description, value }) => {
      return `<div class="item clearfix" id="exp-${id}">
          <div class="item__description">${description}</div>
          <div class="right clearfix">
              <div class="item__value">${value}</div>
              <div class="item__percentage">21%</div>
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
      </div>`;
    },
  };

  const formatPrice = (num, type) => {
    let _num = Math.abs(num).toFixed(2);
    let _numSplit = _num.split('.');
    let int = _numSplit[0];
    if (int.length > 3) {
      int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`;
    }

    let dec = _numSplit[1];

    return `${type === 'exp' ? '-' : '+'} ${int}.${dec}`;
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
        .insertAdjacentHTML(
          'beforeend',
          HTML[type]({ ...data, value: formatPrice(data.value) }),
        );
    },
    deleteListItem: id => {
      const child = document.getElementById(id);
      child.parentNode.removeChild(child);
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
      const resolvePercentage = percentage => {
        if (percentage) return `${percentage}%`;
        return '---';
      };

      helpers.getElement(DOMStrings.budgetIncomeDisplay).textContent =
        budget.totals.inc;
      helpers.getElement(DOMStrings.budgetExpensesDisplay).textContent =
        budget.totals.exp;

      helpers.getElement(DOMStrings.budgetTotal).textContent = formatPrice(
        budget.budget,
      );

      helpers.getElement(DOMStrings.percentage).textContent = resolvePercentage(
        budget.percentage,
      );
    },
    displayPercentages: percentages => {
      const fields = Array.from(
        helpers.getElementAll(DOMStrings.percentageItem),
      );

      fields.forEach((current, i) => {
        current.textContent = percentages[i] > 0 ? `${percentages[i]}%` : '---';
      });
    },
    getDOMStrings: () => DOMStrings,
  };
})();

module.exports = UIController;
