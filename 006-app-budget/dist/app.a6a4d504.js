// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementAll = exports.getElement = exports.compose = exports.when = exports.enterIsPressed = void 0;

var enterIsPressed = function enterIsPressed(e) {
  return e.keyCode === 13;
};

exports.enterIsPressed = enterIsPressed;

var when = function when(cond, f) {
  return function (x) {
    return cond(x) ? f(x) : x;
  };
};

exports.when = when;

var compose = function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (x) {
    return fns.reduceRight(function (v, f) {
      return f(v);
    }, x);
  };
};

exports.compose = compose;

var getElement = function getElement(v) {
  return document.querySelector(v);
};

exports.getElement = getElement;

var getElementAll = function getElementAll(v) {
  return document.querySelectorAll(v);
};

exports.getElementAll = getElementAll;
},{}],"src/ui-controller.js":[function(require,module,exports) {
"use strict";

var helpers = _interopRequireWildcard(require("./helpers"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * UI Controller
 */
var UIController = function () {
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    expList: '.expenses__list',
    incList: '.income__list',
    budgetIncomeDisplay: '.budget__income--value',
    budgetExpensesDisplay: '.budget__expenses--value',
    budgetTotal: '.budget__value',
    percentage: '.budget__expenses--percentage'
  };
  var HTML = {
    inc: function inc(_ref) {
      var id = _ref.id,
          description = _ref.description,
          value = _ref.value;
      return "<div class=\"item clearfix\" id=\"income-".concat(id, "\">\n            <div class=\"item__description\">").concat(description, "</div>\n            <div class=\"right clearfix\">\n                <div class=\"item__value\">+ ").concat(value, "</div>\n                <div class=\"item__delete\">\n                    <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\n                </div>\n            </div>\n        </div>");
    },
    exp: function exp(_ref2) {
      var id = _ref2.id,
          description = _ref2.description,
          value = _ref2.value;
      return "<div class=\"item clearfix\" id=\"expense-".concat(id, "\">\n          <div class=\"item__description\">").concat(description, "</div>\n          <div class=\"right clearfix\">\n              <div class=\"item__value\">- ").concat(value, "</div>\n              <div class=\"item__percentage\">21%</div>\n              <div class=\"item__delete\">\n                  <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\n              </div>\n          </div>\n      </div>");
    }
  };
  return {
    getInput: function getInput() {
      var type = helpers.getElement(DOMStrings.inputType).value;
      var description = helpers.getElement(DOMStrings.inputDescription).value;
      var value = helpers.getElement(DOMStrings.inputValue).value;
      return {
        type: type,
        description: description,
        value: value
      };
    },
    addListItem: function addListItem(data, type) {
      // get expense/income DOM class
      var listClass = DOMStrings["".concat(type, "List")]; // insert expense/income HTML

      return helpers.getElement(listClass).insertAdjacentHTML('beforeend', HTML[type](data));
    },
    clearFields: function clearFields() {
      // get requiered fields
      var fields = helpers.getElementAll("".concat(DOMStrings.inputDescription, ", ").concat(DOMStrings.inputValue));
      var fieldsArray = Array.from(fields);
      fieldsArray.forEach(function (item) {
        return item.value = '';
      });
      fieldsArray[0].focus();
    },
    displayTotals: function displayTotals(budget) {
      var resolveBudgetSymbol = function resolveBudgetSymbol(budget) {
        var symbol = '';
        if (budget) symbol = budget > 0 ? '+' : '-';
        return "".concat(symbol, " ").concat(budget);
      };

      var resolvePercentage = function resolvePercentage(percentage) {
        if (percentage) return "".concat(percentage, "%");
        return '---';
      };

      helpers.getElement(DOMStrings.budgetIncomeDisplay).textContent = budget.totals.inc;
      helpers.getElement(DOMStrings.budgetExpensesDisplay).textContent = budget.totals.exp;
      helpers.getElement(DOMStrings.budgetTotal).textContent = resolveBudgetSymbol(budget.budget);
      helpers.getElement(DOMStrings.percentage).textContent = resolvePercentage(budget.percentage);
    },
    getDOMStrings: function getDOMStrings() {
      return DOMStrings;
    }
  };
}();

module.exports = UIController;
},{"./helpers":"src/helpers.js"}],"src/budget-controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Budget Controller
 */
var budgetController = function () {
  var Expense = function Expense(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function Income(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: 0
  }; // all items for a specific type

  var getAllItems = data.allItems;
  var getTotals = data.totals;
  return {
    // add new item public method
    addItem: function addItem(type, des, val) {
      var newItem;
      var allItems = getAllItems[type]; // generate ID base on what already exists

      var ID = allItems.length > 0 ? allItems[allItems.length - 1].id + 1 : 1; // create type

      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      } // push created type to data


      allItems.push(newItem);
      return newItem;
    },
    calculateTotals: function calculateTotals() {
      var inc = getAllItems.inc,
          exp = getAllItems.exp;

      var calc = function calc(arr, key) {
        return arr.reduce(function (val, item) {
          return parseInt(item[key]) + parseInt(val);
        }, 0);
      };

      getTotals['exp'] = calc(exp, 'value');
      getTotals['inc'] = calc(inc, 'value');
      data.budget = getTotals['inc'] - getTotals['exp'];
      data.percentage = Math.round(getTotals['exp'] / getTotals['inc'] * 100);
    },
    getBudget: function getBudget() {
      var totals = data.totals,
          budget = data.budget,
          percentage = data.percentage;
      return {
        totals: totals,
        budget: budget,
        percentage: percentage
      };
    },
    // get types public method
    getBudgetTypes: {
      EXP: 'exp',
      INC: 'inc'
    },
    // testing method, will be removed
    testing: function testing() {
      console.log(data); // eslint-disable-line
    }
  };
}();

var _default = budgetController;
exports.default = _default;
},{}],"src/app.js":[function(require,module,exports) {
"use strict";

var helpers = _interopRequireWildcard(require("./helpers"));

var _uiController = _interopRequireDefault(require("./ui-controller"));

var _budgetController = _interopRequireDefault(require("./budget-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * App Controller
 */
var controller = function (budgetCtrl, UICtrl) {
  var updateBudget = function updateBudget() {
    budgetCtrl.calculateTotals();
    var budget = budgetCtrl.getBudget();
    UICtrl.displayTotals(budget);
  };

  var contolAddItem = function contolAddItem() {
    var input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      UICtrl.addListItem(newItem, input.type);
      updateBudget();
      UICtrl.clearFields();
    }
  };

  var setupEventListeners = function setupEventListeners() {
    var DOM = UICtrl.getDOMStrings(); // events for adding items

    helpers.getElement(DOM.inputBtn).addEventListener('click', contolAddItem);
    document.addEventListener('keypress', helpers.compose(helpers.when(helpers.enterIsPressed, contolAddItem)));
  };
  /**
   * - get field input data
   * - add new item to budget controller
   * - add item to UI
   * - calculate budget
   * - display the budget on UI
   */


  return {
    init: function init() {
      console.log('Application has started');
      UICtrl.displayTotals(budgetCtrl.getBudget());
      setupEventListeners();
    }
  };
}(_budgetController.default, _uiController.default); // init


controller.init();
},{"./helpers":"src/helpers.js","./ui-controller":"src/ui-controller.js","./budget-controller":"src/budget-controller.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53601" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map