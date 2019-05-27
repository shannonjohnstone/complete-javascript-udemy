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
  // some code
})();

const controller = ((budgetCtrl, UICtrl) => {
  const val = budgetCtrl.publicTest(8);

  return {
    publicCalc: function() {
      return val;
    },
  };
})(budgetController, UIController);
