/*eslint no-undef: 0 */

import * as helpers from './helpers';
import UIController from './ui-controller';
import budgetController from './budget-controller';

// HACK: This is to be removed
global.testing = budgetController.testing;

/**
 * App Controller
 * app module used for main application logic
 * used for exposes needed methods
 */
const controller = ((budgetCtrl, UICtrl) => {
  /**
   * composeWithUpdate
   * helper function for composing other function but always updating
   * percentages and budgets
   *
   * @param {Array} fns array of functions to compose
   * @returns {Function}
   */
  const composeWithUpdate = (...fns) => {
    /**
     * updateBudget
     * udpate budgetCtrl module and UICtrl module
     * will update budget calculations and related UI
     */
    const updateBudget = () => {
      budgetCtrl.calculateTotals();
      const budget = budgetCtrl.getBudget();
      UICtrl.displayTotals(budget);
    };

    /**
     * updatePercentages
     * udpate budgetCtrl module and UICtrl module
     * will update percentages calculations and related UI
     */
    const updatePercentages = () => {
      budgetCtrl.calculatePercentage();
      const per = budgetCtrl.getPercentage();
      UICtrl.displayPercentages(per);
    };

    return helpers.compose(
      updatePercentages,
      updateBudget,
      ...fns,
    );
  };

  /**
   * contolAddItem
   * add inc/exp item to data from user input
   */
  const contolAddItem = function() {
    const input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      const newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value,
      );
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();
    }
  };

  /**
   * ctrlDeleteItem
   * delete item from data and UI
   */
  const ctrlDeleteItem = e => {
    const itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemId) {
      const item = itemId.split('-');
      budgetCtrl.deleteItem(item[0], item[1]);
      UICtrl.deleteListItem(itemId);
    }
  };

  /**
   * setupEventListeners
   * group of event listeners for the budget application
   * this set of events are always setup on init
   */
  const setupEventListeners = () => {
    const DOM = UICtrl.getDOMStrings();

    // event for adding and exp/inc item
    helpers
      .getElement(DOM.inputBtn)
      .addEventListener('click', composeWithUpdate(contolAddItem));

    // event for adding and exp/inc item via pressing the enter key
    document.addEventListener(
      'keypress',
      helpers.compose(
        helpers.when(helpers.enterIsPressed, composeWithUpdate(contolAddItem)),
      ),
    );

    // event for deleting an exp/inc item via a click even on the delete icon
    helpers
      .getElement(DOM.container)
      .addEventListener('click', composeWithUpdate(ctrlDeleteItem));

    // event for listening to input type selection dropdown
    helpers
      .getElement(DOM.inputType)
      .addEventListener('change', UICtrl.changeType);
  };

  /**
   * public methods
   */
  return {
    init: () => {
      console.log('Application has started'); // eslint-disable-line
      UICtrl.displayTotals(budgetCtrl.getBudget());
      UICtrl.displayMoth();
      setupEventListeners();
    },
  };
})(budgetController, UIController);

// init
controller.init();
