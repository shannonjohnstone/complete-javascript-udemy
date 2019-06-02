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
