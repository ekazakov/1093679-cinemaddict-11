import {createElement} from "../util.js";

export const createFooterStatisticsTemplate = (FILMS_CARDS_ARR) => {
  return (`<p>${FILMS_CARDS_ARR.length} movies inside</p>`);
};

export default class FooterStatistics {
  constructor(filmsCardsArr) {
    this._filmsCardsArr = filmsCardsArr;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCardsArr);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
