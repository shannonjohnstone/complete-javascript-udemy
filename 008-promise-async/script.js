console.log('Async Started');

(() => {
  console.log('Promise');

  const fetchCars = new Promise((resolve, reject) => {
    setTimeout(() => resolve(['Toyota', 'Mazda', 'Volkswagon']), 3000);
  });

  fetchCars.then(console.log);
})();

(() => {
  console.log('Async/await');
  const fetchIDs = new Promise((resolve, reject) => {
    setTimeout(() => resolve([0, 1, 2]), 1500);
  });

  const fetchCars = new Promise((resolve, reject) => {
    setTimeout(() => resolve(['Toyota', 'Mazda', 'Volkswagon']), 3000);
  });

  async function cars() {
    const ids = await fetchIDs;
    const cars = await fetchCars;

    return cars[ids[2]];
  }

  const car = cars();
  car.then(console.log);
})();
