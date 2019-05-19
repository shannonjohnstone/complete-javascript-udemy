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

/*************************************************
 * this keyword
 */
sectionLog('this keyword');
// console.log(this);
function calculateAgeWithThis(year) {
  console.log(2019 - year);
  console.log(this, calculateAgeWithThis);
}
calculateAgeWithThis(1984);

const dustin = {
  name: 'Dustin',
  yearOfBirth: 1990,
  calculateAge: function() {
    console.log(2019 - this.yearOfBirth);
    // this refers to the dustin object as it was the object that executed the caluculateAge method
    console.log(this, 'dustin');

    /**
     * this in innerFunction will endup referencing the `Window` object
     * this is because the rule says `a regualer function will reference the global context
     * and this is a regular function that is not call from a object
     */
    // function innerFunction() {
    //   console.log(this, 'innerFunction');
    // }
    // innerFunction();
  },
};

dustin.calculateAge();

const mike = {
  name: 'Mike',
  yearOfBirth: 1980,
};

/**
 * The fact that the this keyword only gets assigned a value when its executed
 * means we can use the same calculateAge metohd from the dustin object even tho
 * its already called
 */
mike.calculateAge = dustin.calculateAge;

mike.calculateAge();
