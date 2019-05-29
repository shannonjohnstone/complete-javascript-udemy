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
    deleteItem: (type, id) => {
      getAllItems[type] = getAllItems[type].filter(
        item => parseInt(item.id) !== parseInt(id),
      );
      return id;
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

export default budgetController;
