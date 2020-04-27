import AbstractComponent from "./abstract-component.js";

export const createFooterStatisticsTemplate = (FILMS_CARDS_ARR) => {
  return (`<p>${FILMS_CARDS_ARR.length} movies inside</p>`);
};

export default class FooterStatistics extends AbstractComponent {
  constructor(filmsCardsArr) {
    super();
    this._filmsCardsArr = filmsCardsArr;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCardsArr);
  }
}
