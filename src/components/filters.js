// import AbstractComponent from "./abstract-component.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {FilterType} from "../utils/const.js";
// import {getCardsByFilter} from "../utils/filter-cards.js";

const activeLinkHtml = `main-navigation__item--active`;

let activeFilter = FilterType.ALL;

/* const createFilterTemplate = (filter) => {
  const {isChecked, count} = filter;
  return `<a href="#history" class="main-navigation__item ${isChecked ? activeLinkHtml : ``}">History <span class="main-navigation__item-count">${count}</span></a>`;
};
export const createFiltersTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${activeFilter === FilterType.ALL ? activeLinkHtml : ``}">All movies</a>
        <a href="#watchlist" class="main-navigation__item ${activeFilter === FilterType.WATCHLIST ? activeLinkHtml : ``}">Watchlist <span class="main-navigation__item-count">0</span></a>
        <a href="#history" class="main-navigation__item ${activeFilter === FilterType.HISTORY ? activeLinkHtml : ``}">History <span class="main-navigation__item-count">0</span></a>
        <a href="#favorites" class="main-navigation__item ${activeFilter === FilterType.FAVORITES ? activeLinkHtml : ``}">Favorites <span class="main-navigation__item-count">0</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};*/
// ${filter.checked ? activeLinkHtml : ``}
const createFiltersTemplate = (filters) => { // console.log(filters);
  const createFilters = () => {
    let html = ``;
    filters.slice(1, filters.length).forEach((filter) => {
      html += `<a href="#${filter.name}" class="main-navigation__item ${filter.name === activeFilter ? activeLinkHtml : ``}">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`;
    });
    return html;
  };

  return `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item ${activeFilter === FilterType.ALL ? activeLinkHtml : ``}">All movies</a>
          ${createFilters()}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`;
};


export default class Filter extends AbstractSmartComponent {
  constructor(filters, activeFilterType) {
    super();

    this._filters = filters;
    this._activeFilter = activeFilterType;
    this._handler = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setClickOnFiltersHandler(this._handler);
  }

  setClickOnFiltersHandler(handler) {
    this._handler = handler;
    this.getElement().querySelector(`.main-navigation__item:nth-of-type(1)`)
    .addEventListener(`click`, () => {
      // let filterName = evt.target.href.substring(hrefPath.length);
      const filterName = FilterType.ALL;
      activeFilter = filterName;
      handler(filterName);
      this.rerender();

    });

    this.getElement().querySelector(`.main-navigation__item:nth-of-type(2)`)
    .addEventListener(`click`, () => {
      const filterName = FilterType.WATCHLIST;
      activeFilter = filterName;
      handler(filterName);
      this.rerender();
    });

    this.getElement().querySelector(`.main-navigation__item:nth-of-type(3)`)
    .addEventListener(`click`, () => {
      const filterName = FilterType.HISTORY;
      activeFilter = filterName;
      handler(filterName);
      this.rerender();
    });

    this.getElement().querySelector(`.main-navigation__item:nth-of-type(4)`)
    .addEventListener(`click`, () => {
      const filterName = FilterType.FAVORITES;
      activeFilter = filterName;
      handler(filterName);
      this.rerender();
    });
  }

}
