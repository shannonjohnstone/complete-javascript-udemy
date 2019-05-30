/*eslint no-undef: 0 */

import * as helpers from './helpers';
import UIController from './ui-controller';
import budgetController from './budget-controller';

global.testing = budgetController.testing;
/**
 * App Controller
 */
const controller = ((budgetCtrl, UICtrl) => {
  const composeWithUpdate = (...fns) => {
    const updateBudget = () => {
      budgetCtrl.calculateTotals();
      const budget = budgetCtrl.getBudget();
      UICtrl.displayTotals(budget);
    };

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

  const ctrlDeleteItem = e => {
    const itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemId) {
      const item = itemId.split('-');
      budgetCtrl.deleteItem(item[0], item[1]);
      UICtrl.deleteListItem(itemId);
    }
  };

  const setupEventListeners = () => {
    const DOM = UICtrl.getDOMStrings();

    // events for adding items
    helpers
      .getElement(DOM.inputBtn)
      .addEventListener('click', composeWithUpdate(contolAddItem));

    document.addEventListener(
      'keypress',
      helpers.compose(
        helpers.when(helpers.enterIsPressed, composeWithUpdate(contolAddItem)),
      ),
    );

    helpers
      .getElement(DOM.container)
      .addEventListener('click', composeWithUpdate(ctrlDeleteItem));

    /**
     * event for listening to input type selection dropdown this will fire a function
     * this will toggle classes and update colors
     */
    helpers
      .getElement(DOM.inputType)
      .addEventListener('change', UICtrl.changeType);
  };

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
