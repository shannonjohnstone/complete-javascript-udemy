/*eslint no-console: 0*/

const personFactory = opts => ({
  name: opts.name,
  mass: opts.mass,
  height: opts.height,
  calculateBMI() {
    this.bmi = this.mass / (this.height * this.height);
  },
});

const tom = personFactory({ name: 'Tom', mass: 90, height: 190 });
const ken = personFactory({ name: 'Ken', mass: 60, height: 170 });

const determineHihestBMI = (person1, person2) => {
  const one = person1;
  const two = person2;

  one.calculateBMI();
  two.calculateBMI();

  if (one.bmi > two.bmi) {
    console.log({
      name: one.name,
      bmi: one.bmi,
    });
  } else {
    console.log({
      name: two.name,
      bmi: two.bmi,
    });
  }
};

determineHihestBMI(tom, ken);
