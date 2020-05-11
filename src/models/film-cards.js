import {getCardsByFilter} from "../utils/filter-cards.js";
import {FilterType} from "../utils/const.js";

export default class FilmCards {
  constructor() {
    this._filmCards = [];
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._activeFilterType = FilterType.ALL; console.log(this._activeFilterType);
  }


  getFilmCardsAll() {
    return this._filmCards;
  }

  getFilmCards() {
    let a = getCardsByFilter(this._filmCards, this._activeFilterType); console.log(a);
    return getCardsByFilter(this._filmCards, this._activeFilterType);
    // return this._filmCards;
  }

  setFilmCards(filmCards) {
    this._filmCards = Array.from(filmCards);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilmCard(id, filmCard) {
    const index = this._filmCards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }
    this._filmCards = [].concat(this._filmCards.slice(0, index), filmCard, this._filmCards.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) { console.log(handler);
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }


}
