import {RangMap, VALUE_HOUR, GenreMap} from "../utils/const.js";

export const getWatchedMovies = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isAlreadyWatched);
};

export const getRangUser = (filmCards) => {
  const a = getWatchedMovies(filmCards).length;
  if (a <= 0) {
    return RangMap.NO_RANG;
  }
  if (a <= 10) {
    return RangMap.NOVICE;
  }
  if (a >= 10 && a <= 20) {
    return RangMap.FAN;
  }
  if (a >= 21) {
    return RangMap.MOVIE_BUFF;
  }
  return undefined;
};

export const getWatchedMoviesLength = (filmCards, option) => {
  const a = getWatchedMovies(filmCards);
  let value = 0;
  a.forEach((filmCard) => {
    value += filmCard.movieLength;
  });

  let hours = 0;
  let minutes = 0;
  for (let i = 0; i < value; i++) {
    if (value >= VALUE_HOUR) {
      hours++;
      value -= VALUE_HOUR;
    } else {
      minutes = value;
      break;
    }
  }
  if (option === `hours`) {
    return `${hours}`;
  }
  if (option === `minutes`) {
    return `${minutes}`;
  }
  return undefined;
};

export const getGenreOnWatchedMovies = (filmCards, options) => {
  const a = getWatchedMovies(filmCards);
  const b = [];
  a.forEach((filmCard) => {
    filmCard.genre.forEach((genre) => {
      if (genre === options) {
        b.push(genre);
      }
    });
  });
  return b;
};

export const getGenreData = (filmCards) => {
  const genreData = {
    SCI_FI: getGenreOnWatchedMovies(filmCards, GenreMap.SCI_FI).length,
    ANIMATION: getGenreOnWatchedMovies(filmCards, GenreMap.ANIMATION).length,
    FANTASY: getGenreOnWatchedMovies(filmCards, GenreMap.FANTASY).length,
    COMEDY: getGenreOnWatchedMovies(filmCards, GenreMap.COMEDY).length,
    TV_SERIES: getGenreOnWatchedMovies(filmCards, GenreMap.TV_SERIES).length
  };
  return genreData;
};

export const getTopGenre = (filmCards) => {
  const a = getGenreData(filmCards);
  let b = 0;
  let c = ``;
  for (const key in a) {
    if (b <= a[key]) {
      b = a[key];
      c = key;
    }
  }
  return GenreMap[c];
};

export const getOnPeriodCards = (filmCards, from, to) => {
  const a = getWatchedMovies(filmCards);
  const b = [];
  a.forEach((filmCard) => {
    if (filmCard.watchingDate <= to && filmCard.watchingDate >= from) {
      b.push(filmCard);
    }
  });
  return b;
};
