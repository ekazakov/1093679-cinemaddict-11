const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const filtersData = {
  watchlist: getRandomInteger(0, 10),
  history: getRandomInteger(0, 10),
  favorites: getRandomInteger(0, 10)
};

export {filtersData};
