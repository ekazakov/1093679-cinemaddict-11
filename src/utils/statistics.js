import {RangMap, RangMapWatchedMovies, VALUE_HOUR, GenreMap} from "../utils/const.js";

export const getWatchedMovies = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isAlreadyWatched);
};

export const getRangUser = (filmCards) => {
  const watchedMovies = getWatchedMovies(filmCards).length;
  if (watchedMovies <= RangMapWatchedMovies.NO_RANG) {
    return RangMap.NO_RANG;
  }
  if (watchedMovies <= RangMapWatchedMovies.NOVICE) {
    return RangMap.NOVICE;
  }
  if (watchedMovies >= RangMapWatchedMovies.NOVICE && watchedMovies <= RangMapWatchedMovies.FAN) {
    return RangMap.FAN;
  }
  if (watchedMovies >= RangMapWatchedMovies.MOVIE_BUFF) {
    return RangMap.MOVIE_BUFF;
  }
  return undefined;
};

export const getWatchedMoviesLength = (filmCards, option) => {
  const watchedMovies = getWatchedMovies(filmCards);
  let value = 0;
  watchedMovies.forEach((filmCard) => {
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
  const watchedMovies = getWatchedMovies(filmCards);
  const genreWatchedMovies = [];
  watchedMovies.forEach((filmCard) => {
    filmCard.genre.forEach((genre) => {
      if (genre === options) {
        genreWatchedMovies.push(genre);
      }
    });
  });
  return genreWatchedMovies;
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
  const genreData = getGenreData(filmCards);
  let temp = 0;
  let maxValue = ``;
  for (const key in genreData) {
    if (temp <= genreData[key]) {
      temp = genreData[key];
      maxValue = key;
    }
  }
  return GenreMap[maxValue];
};

export const getPeriodCards = (filmCards, from, to) => {
  const watchedMovies = getWatchedMovies(filmCards);
  const periodCards = [];
  watchedMovies.forEach((filmCard) => {
    if (filmCard.watchingDate <= to && filmCard.watchingDate >= from) {
      periodCards.push(filmCard);
    }
  });
  return periodCards;
};
