import {FilterType} from "./const.js";


export const getOnWatchListFilmCards = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isWatchlist);
};

export const getOnHistoryFilmCards = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isAlreadyWatched);
};

export const getOnFavoritesFilmCards = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isFavorite);
};


export const getCardsByFilter = (filmCards, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return filmCards;
    case FilterType.WATCHLIST:
      return getOnWatchListFilmCards(filmCards);
    case FilterType.HISTORY:
      return getOnHistoryFilmCards(filmCards);
    case FilterType.FAVORITES:
      return getOnFavoritesFilmCards(filmCards);
  }
  return filmCards;
};
