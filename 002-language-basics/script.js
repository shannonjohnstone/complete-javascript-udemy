/*eslint no-console: 0*/

const sectionLog = title => {
  console.log('');
  console.log('****************************************');
  console.log(title);
  console.log('');
};

sectionLog('Variables');
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

/*************************************************
 * Operators
 */
sectionLog('Operators');
const year = 2018;
const now = 2018;

const ageJohn = 28;
const ageMark = 34;

/*************************************************
 * Math operators
 */
sectionLog('Math operators');
const yearJohn = year - ageJohn;
const yearMark = year - ageMark;

console.log(yearJohn);
console.log(yearMark);
console.log(now + 2);
console.log(now / 10);

/*************************************************
 * Logical operators
 */
sectionLog('Logical operators');
const johnOlder = yearJohn < yearMark;
console.log(johnOlder);
console.log(typeof johnOlder);
console.log(typeof yearJohn);
let z;
console.log(typeof z);

/*************************************************
 * Operator precedence
 */
sectionLog('Operator precedence');
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

/*************************************************
 * if else
 */
sectionLog('if/else');
const civilStatus = 'single';

if (civilStatus === 'married') {
  console.log(`${firstName} is married`);
} else {
  console.log(`${firstName} will hopefully marry soon`);
}

/*************************************************
 * booleans
 */
sectionLog('Boolean');
if (fullAge) {
  console.log('fullAge is true');
}

/*************************************************
 * Ternary operator and switch statment
 */
sectionLog('Ternary operator and switch statment');
fullAge
  ? console.log('Ternary: fullAge is true')
  : console.log('Ternary: fullAge is false');

switch (job) {
  case 'Mechanic':
    console.log('Job is Mechanic');
    break;
  case 'Techher':
    console.log('Job is Techher');
    break;
  default:
    console.log('Job not supplied');
    break;
}

/*************************************************
 * Truthy/Falsy
 *
 * falsy: undefined, null, 0, '', NaN
 * truthy: everythng that is not falsy
 */
sectionLog('Truthy/Falsy');
const checkHeight = height => {
  if (height || height === 0) console.log('Varible is defined');
  else console.log('Variable is NOT defined');
};

let height;
checkHeight(height);
height = 0;
checkHeight(height);
height = 1;
checkHeight(height);

/*************************************************
 * Functions
 */
sectionLog('Functions');

function calculateAge(birthYear) {
  return 2019 - birthYear;
}

const calculatedAge = calculateAge(1984);
console.log({ calculatedAge });

/*************************************************
 * Arrays
 */
sectionLog('Arrays');

const names = ['Dustin', 'Zag', 'Barnie'];
console.log(names, 'names');
console.log(names.length, 'names length');
console.log(names[names.length - 1], 'last item in array');
console.log(names[1], ': names 1');
console.log(names[1], ': names 1');
names.push('Ruby');
console.log(names, 'names');

const dustin = ['Dustin', 5, 'Dog'];
console.log(dustin, 'dustin array');
console.log(dustin.indexOf(5), 'dustin.indexOf(5)');
console.log(dustin.indexOf('cat'), 'dustin.indexOf(cat)');
