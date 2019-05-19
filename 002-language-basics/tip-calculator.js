/*eslint no-console: 0*/

function calculateTips(billTotal, tipsArray) {
  let percentage;

  if (billTotal < 50) {
    percentage = 0.2;
  } else if (billTotal >= 50 && billTotal < 200) {
    percentage = 0.15;
  } else {
    percentage = 0.1;
  }

  const total = percentage + billTotal;
  tipsArray.push(total);
  return total;
}

function calculateTotal(billTotal, tip, totalsArray) {
  const total = billTotal + tip;
  totalsArray.push(total);
  return total;
}

const calculate = (tips, totals) => total => {
  const tip = calculateTips(total, tips);
  calculateTotal(total, tip, totals);
};

const tips = [];
const totals = [];

const run = calculate(tips, totals);

run(20);
run(400);
run(150);

console.log({ tips });
console.log({ totals });
