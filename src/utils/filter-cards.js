import {FilterType} from "./const.js";


export const getWatchListFilmCards = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isWatchlist);
};

export const getHistoryFilmCards = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isAlreadyWatched);
};

export const getFavoritesFilmCards = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isFavorite);
};


export const getCardsByFilter = (filmCards, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return filmCards;
    case FilterType.WATCHLIST:
      return getWatchListFilmCards(filmCards);
    case FilterType.HISTORY:
      return getHistoryFilmCards(filmCards);
    case FilterType.FAVORITES:
      return getFavoritesFilmCards(filmCards);
  }
  return filmCards;
};
