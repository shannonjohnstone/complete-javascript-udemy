const box5 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    document.querySelector('.green').addEventListener('click', () => {
      console.log({ position: this.position, color: this.color });
    });
  },
};
box5.clickMe();

(() => {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.myFreinds5 = function(friends) {
    // const arr = friends.map(
    //     function(el) {
    //       return `${this.name} is friends with ${el}`;
    //     }.bind(this),
    //   );

    const arr = friends.map(el => {
      return `${this.name} is friends with ${el}`;
    });
    console.log(arr);
  };

  const friends = ['Dustin', 'Zag'];
  new Person('Shannon').myFreinds5(friends);
})();

(() => {
  const boxes = document.querySelectorAll('.box');

  const boxesArray = Array.from(boxes);

  for (const cur of boxesArray) {
    if (cur.innerHTML === 'Blue') continue;
    else cur.innerHTML = 'I have been changed to Blue!';
  }
})();

(() => {
  console.log('ES6 Ages');
  const ages = [12, 17, 8, 21, 18, 14];

  console.log(ages.findIndex(cur => cur >= 18));
  console.log(ages.find(cur => cur >= 18));
})();

(() => {
  console.log('Spread');
  function addFourAges(a, b, c, d) {
    return a + b + c + d;
  }
  const sum1 = addFourAges(18, 38, 12, 21);
  console.log(sum1, 'sum1');

  const ages = [18, 38, 12, 21];
  const sum2 = addFourAges.apply(null, ages);
  console.log(sum2, 'sum2');

  const sum3 = addFourAges(...ages);
  console.log(sum3, 'sum3');
})();

(() => {
  console.log('Rest parameters');
  function isFullAge(limit, ...args) {
    args.forEach(cur => console.log(2019 - cur >= limit, '@@ isFullAge'));
  }
  isFullAge(18, 1990, 1999, 1980, 2002);
})();

(() => {
  console.log('Default parameters');
  // ES5
  //   function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
  //     this.firstName = firstName;
  //     this.lastName = lastName || 'Smith';
  //     this.yearOfBirth = yearOfBirth;
  //     this.nationality = nationality || 'Australian';
  //   }

  // ES6
  function SmithPerson(
    firstName,
    yearOfBirth,
    lastName = 'Smith',
    nationality = 'Australian',
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
  }

  const dan = new SmithPerson('Dan', 1990);
  const ken = new SmithPerson('Ken', 1980, 'Frank', 'English');

  console.log(dan);
  console.log(ken);
})();

(() => {
  console.log('Maps');
  const question = new Map();

  question.set(
    'question',
    'What is the name of the latest major JavaScript version?',
  );
  question.set(1, 'ES5');
  question.set(2, 'ES6');
  question.set(3, 'ES2015');
  question.set(4, 'ES7');
  question.set('correct', 3);
  question.set(true, 'Correct answer');
  question.set(false, 'Wrong, please try again');
  console.log(question);
})();

(() => {
  console.log('Classes');

  class Person {
    constructor(firstName, yearOfBirth, job) {
      this.firstName = firstName;
      this.yearOfBirth = yearOfBirth;
      this.job = job;
    }
    calcAge() {
      const age = new Date().getFullYear - this.yearOfBirth;
      console.log({ age });
    }
    static greeting() {
      console.log(`Hey there, my name is ${this.firstName}`);
    }
  }

  const zag = new Person('Zag', 2019, 'Deer Hunter');
  console.log(zag);
  zag.calcAge();
  Person.greeting();
})();

(() => {
  console.log('Class/subclasses ES5');

  function Person(name, yearOfBirth, job) {
    console.log(name, '@@ person');
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  Person.prototype.calculateAge = function() {
    const age = new Date.getFullYear() - this.yearOfBirth;
    console.log(age);
  };

  const Athlete = function(name, yearOfBirth, job, olympicGames, medals) {
    // function constructors, create a new object and bind the this context
    // doing Person.call(this, name, yearOfBirth, job); will pass the newly created `this` context
    // from Athlete into Person
    Person.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
  };

  // this attaches the Person prototype chain to Athlete
  Athlete.prototype = Object.create(Person.prototype);

  const runner = new Athlete('Bolt', 1990, 'Runner', [200], ['gold']);
  console.log(runner);
})();

(() => {
  console.log('Classes/subclasses ES6');

  class Person {
    constructor(firstName, yearOfBirth, job) {
      this.firstName = firstName;
      this.yearOfBirth = yearOfBirth;
      this.job = job;
    }
    calcAge() {
      const age = new Date().getFullYear - this.yearOfBirth;
      console.log({ age });
    }
    static greeting() {
      console.log(`Hey there, my name is ${this.firstName}`);
    }
  }

  const zag = new Person('Zag', 2019, 'Deer Hunter');

  class Athlete extends Person {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
      super(name, yearOfBirth, job);
      this.olympicGames = olympicGames;
      this.medals = medals;
    }
  }

  const kathy = new Athlete('Kathy', 1970, 'Spinter', 'Sydney', 1);
  console.log(kathy);
})();
