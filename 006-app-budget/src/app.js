import * as helpers from './helpers';
import UIController from './ui-controller';
import budgetController from './budget-controller';

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
    helpers.getElement(DOM.inputBtn).addEventListener('click', contolAddItem);
    document.addEventListener(
      'keypress',
      helpers.compose(helpers.when(helpers.enterIsPressed, contolAddItem)),
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
