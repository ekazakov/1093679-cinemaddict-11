// import AbstractComponent from "./abstract-component.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {FilterType} from "../utils/const.js";


const activeLinkHtml = `main-navigation__item--active`;

const createFiltersTemplate = (filters, activeFilter) => {
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
        <a href="#stats" class="main-navigation__additional ${activeFilter === `stats` ? activeLinkHtml : ``}">Stats</a>
      </nav>`;
};


export default class Filter extends AbstractSmartComponent {
  constructor(filters, activeFilter = FilterType.ALL) {
    super();

    this._filters = filters;
    this._activeFilter = activeFilter;
    this._handler = null;
    this.setOnchangeHandler = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._activeFilter);
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setClickOnFiltersHandler(this._handler);
    this.setOnchange(this.setOnchangeHandler);
  }

  setClickOnFiltersHandler(handler) {
    this._handler = handler;

    this.getElement().querySelector(`.main-navigation__item:nth-of-type(1)`)
    .addEventListener(`click`, () => {
      const filterName = FilterType.ALL;
      this._activeFilter = filterName;
      handler(filterName);
      this.rerender();

    });

    this.getElement().querySelector(`.main-navigation__item:nth-of-type(2)`)
    .addEventListener(`click`, () => {
      const filterName = FilterType.WATCHLIST;
      this._activeFilter = filterName;
      handler(filterName);
      this.rerender();
    });

    this.getElement().querySelector(`.main-navigation__item:nth-of-type(3)`)
    .addEventListener(`click`, () => {
      const filterName = FilterType.HISTORY;
      this._activeFilter = filterName;
      handler(filterName);
      this.rerender();
    });

    this.getElement().querySelector(`.main-navigation__item:nth-of-type(4)`)
    .addEventListener(`click`, () => {
      const filterName = FilterType.FAVORITES;
      this._activeFilter = filterName;
      handler(filterName);
      this.rerender();
    });

    this.getElement().querySelector(`.main-navigation__additional`)
    .addEventListener(`click`, () => {
      const filterName = `stats`;
      this._activeFilter = filterName;
      this.rerender();
    });
  }

  setOnchange(handler) {
    this.setOnchangeHandler = handler;
    this.getElement()
    .addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        const prefixHref = `http://localhost:8080/#`;
        let menuItem = evt.target.href.substring(prefixHref.length);
        handler(menuItem);
      }
    });
  }

}
