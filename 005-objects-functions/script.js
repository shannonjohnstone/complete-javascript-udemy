/*eslint no-console: 0*/

const sectionLog = title => {
  console.log('\n****************************************');
  console.log(title, '\n');
};

sectionLog('Function Constructor');

const Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person.prototype.calculateAge = function() {
  const year = new Date().getFullYear();
  return year - this.yearOfBirth;
};

const zag = new Person('Zag', 2019, null);
const dustin = new Person('Dustin', 2016, 'Deer Hunter');
console.log({ zag, age: zag.calculateAge() });
console.log({ dustin, age: dustin.calculateAge() });

sectionLog('Object.create');

const personProto = {
  calculateAge: function() {
    const year = new Date().getFullYear();
    return year - this.yearOfBirth;
  },
};

const tom = Object.create(personProto, {
  name: { value: 'Tom' },
  yearOfBirth: { value: 1990 },
  job: { value: 'Bus Driver' },
});

console.log({ tom });

sectionLog('Primitive vs Object');

let a = 23;
let b = a;
a = 10;

console.log({ a, b });

const obj1 = { name: 'Jack', age: 20 };
const obj2 = obj1;
obj1.age = 40;

console.log({ obj1, obj2 });

sectionLog('Functions');

const years = [1990, 1965, 1930, 2005, 1984];

function arrayCalc(arr, fn) {
  let arrRes = [];
  for (let index = 0; index < arr.length; index++) {
    arrRes.push(fn(arr[index]));
  }
  return arrRes;
}

function calculateAge(el) {
  return new Date().getFullYear() - el;
}

console.log(arrayCalc(years, calculateAge));

sectionLog('Functions returning functions');

function interviewQuestions(job) {
  if (job === 'designer') {
    return function(name) {
      console.log(`${name}, can you pleas explain UX design?`);
    };
  }
  if (job === 'teacher') {
    return function(name) {
      console.log(`${name}, please is explain which is your stongest subject?`);
    };
  }
}

const teacher = interviewQuestions('teacher');
teacher('Brad');
teacher('Frankie');

const designer = interviewQuestions('designer');
designer('Sally');
designer('Kathy');

sectionLog('IIFE');

(function(goodluck) {
  const score = Math.random() * 10;
  console.log(score >= 5 - goodluck);
})(2);

sectionLog('Bind, Call, Apply');

const victor = {
  name: 'Victor',
  age: 26,
  job: 'teacher',
  presentation: function(type, time) {
    const grettingType = type === 'formal' ? 'Hello and' : 'Hey,';
    const greeting = `${type && grettingType} ${time && time}, my name is ${
      this.name
    }, I'm ${this.age} and a ${this.job}`;

    console.log(greeting);
  },
};

const emily = {
  name: 'Emily',
  age: 29,
  job: 'nurse',
};

victor.presentation('formal', 'afternoon');
victor.presentation('friendly', 'afternoon');
victor.presentation.call(emily, 'friendly', 'afternoon');
victor.presentation.apply(emily, ['formal', 'morning']);
const newEmily = victor.presentation.bind(emily, 'formal');

newEmily('afternoon');
