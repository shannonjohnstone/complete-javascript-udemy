/*eslint no-console: 0*/
console.log('Init: Working behind the scenes');

const sectionLog = title => {
  console.log('\n****************************************');
  console.log(title, '\n');
};

/*************************************************
 * Hoisting
 */
sectionLog('Hoisting');

calculateAge(1984);
function calculateAge(year) {
  console.log(2019 - year);
}

// console.log(retirement(1984));
// const retirement = year => console.log(65 - (2019 - year));

console.log(age);
var age = 24;
console.log(age);

/*************************************************
 * Scope
 */
sectionLog('Scope');

const a = 'Hello!';
first();

function first() {
  const b = 'Hi!';
  second();

  function second() {
    const c = 'Hey!';
    console.log(a + b + c, 'log from second()');
    third();
  }
}

function third() {
  const d = 'John';
  // this will not be able to reference b and c as they are in differnt scope
  //   console.log(a + b + c + d, 'log from third()');
  console.log(a + d, 'log from third()');
}
