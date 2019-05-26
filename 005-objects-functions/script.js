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
