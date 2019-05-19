/*eslint no-console: 0*/

const calculateTips = cb => billTotal => {
  let percentage;

  if (billTotal < 50) {
    percentage = 0.2;
  } else if (billTotal >= 50 && billTotal < 200) {
    percentage = 0.15;
  } else {
    percentage = 0.1;
  }

  const total = percentage + billTotal;

  if (cb && typeof cb === 'function') cb(total);
  return total;
};

const calculateTotal = cb => (billTotal, tip) => {
  const total = billTotal + tip;
  if (cb && typeof cb === 'function') cb(total);
  return total;
};

const calculate = (_calculateTips, _calculateTotals) => total => {
  const tip = _calculateTips(total);
  const calculatedTotal = _calculateTotals(total, tip);
  return calculatedTotal;
};

let tips = [];
let totals = [];

const storeTips = v => {
  tips = [...tips, v];
};

const storeTotals = v => {
  totals = [...totals, v];
};

const run = calculate(calculateTips(storeTips), calculateTotal(storeTotals));

run(20);
run(400);
run(150);

console.log({ tips });
console.log({ totals });
