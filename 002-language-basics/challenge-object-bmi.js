/*eslint no-console: 0*/

const personFactory = opts => ({
  name: opts.name,
  mass: opts.mass,
  height: opts.height,
  calculateBMI() {
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;
  },
});

const determineHihestBMI = (person1, person2) => {
  const one = person1;
  const two = person2;

  if (
    typeof person1.calculateBMI !== 'function' &&
    typeof person2.calculateBMI !== 'function'
  ) {
    throw new Error('person object missing required propeties');
  }

  one.calculateBMI();
  two.calculateBMI();

  const printWinner = winner =>
    console.log({
      name: winner.name,
      bmi: winner.bmi,
    });

  if (one.bmi > two.bmi) return printWinner(one);
  return printWinner(two);
};

determineHihestBMI(
  personFactory({ name: 'Tom', mass: 90, height: 190 }),
  personFactory({ name: 'Ken', mass: 60, height: 170 }),
);
