export default (() => {
  let trancatedTitle = [];
  const characterCountOfArray = (...args) => args.join(' ').length;

  const reduceToLimit = limit => (acc, cur, i) => {
    if (characterCountOfArray(acc, cur) <= limit) {
      trancatedTitle = [...acc, cur];
      return trancatedTitle;
    }
    return trancatedTitle;
  };

  const validate = {
    string: (str = '') => !str || typeof str !== 'string',
    limit: lim => !lim || typeof lim !== 'number' || lim < 1,
  };

  return (string, limit) => {
    if (validate.string(string) || validate.limit(limit))
      throw new Error('Invalid string or limit being used.');

    if (string.length < limit) return string;
    const trancate = reduceToLimit(limit);
    const trancatedArray = string.split(' ').reduce(trancate, []);

    return `${trancatedArray.join(' ')} ...`;
  };
})();
