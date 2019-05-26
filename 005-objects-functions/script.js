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
