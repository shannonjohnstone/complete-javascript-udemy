/*eslint no-console: 0*/

const firstName = 'Dustin';
console.log(firstName);

const age = 6;

const fullAge = true;
console.log(fullAge);

let job;
console.log(job);
job = 'Mechanic';
console.log(job);

/**
 * This is an example of a block comment
 */

/**
 * combining a String and a Number
 *
 * in this example this will chantge the Number to a String
 * this is type coercion
 */
console.log(`${firstName} is ${age}, marriage status is ${fullAge}`);
console.log(age + '16');

// Operators
const year = 2018;
const now = 2018;

const ageJohn = 28;
const ageMark = 34;

// Math operators
const yearJohn = year - ageJohn;
const yearMark = year - ageMark;

console.log(yearJohn);
console.log(yearMark);
console.log(now + 2);
console.log(now / 10);

// Logical operators
const johnOlder = yearJohn < yearMark;
console.log(johnOlder);
console.log(typeof johnOlder);
console.log(typeof yearJohn);
let z;
console.log(typeof z);

// Operator precedence
const isFullAge = now - yearJohn >= ageJohn;
console.log(isFullAge);

// we are grouping the addition operator becasue the division is precedence
const average = (ageJohn + ageMark) / 2;
console.log(average);

let x, y;
x = y = (3 + 5) * 4 - 6;
console.log(x, y);

// assigns * 10 to the exiting x value
x *= 10;
console.log(x, y);

// If Else
const civilStatus = 'single';

if (civilStatus === 'married') {
  console.log(`${firstName} is married`);
} else {
  console.log(`${firstName} will hopefully marry soon`);
}
