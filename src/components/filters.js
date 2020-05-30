import AbstractSmartComponent from "./abstract-smart-component.js";
import {FilterType, FILTER_STATS, ACTIVE_LINK_FILTER, PREFIX_HREF} from "../utils/const.js";

const createFiltersTemplate = (filters, activeFilter) => {
  const createFilters = () => {
    let html = ``;
    filters.slice(1, filters.length).forEach((filter) => {
      html += `<a href="#${filter.name}" class="main-navigation__item ${filter.name === activeFilter ? ACTIVE_LINK_FILTER : ``}">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`;
    });
    return html;
  };

  return `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item ${activeFilter === FilterType.ALL ? ACTIVE_LINK_FILTER : ``}">All movies</a>
          ${createFilters()}
        </div>
        <a href="#stats" class="main-navigation__additional ${activeFilter === FILTER_STATS ? ACTIVE_LINK_FILTER : ``}">Stats</a>
      </nav>`;
};


export default class Filter extends AbstractSmartComponent {
  constructor(filters, activeFilter = FilterType.ALL) {
    super();

    this._filters = filters;
    this._activeFilter = activeFilter;
    this._handler = null;
    this.setChangeHandler = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._activeFilter);
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setClickFiltersHandler(this._handler);
    this.setChange(this.setChangeHandler);
  }

  setClickFiltersHandler(handler) {
    this._handler = handler;

    this.getElement().querySelector(`.main-navigation__items`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        const filterName = evt.target.href.substring(PREFIX_HREF.length);
        this._activeFilter = filterName;
        handler(filterName);
        this.rerender();
      }
    });

    this.getElement().querySelector(`.main-navigation__additional`)
    .addEventListener(`click`, () => {
      const filterName = FILTER_STATS;
      this._activeFilter = filterName;
      this.rerender();
    });
  }

  setChange(handler) {
    this.setChangeHandler = handler;
    this.getElement()
    .addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        const menuItem = evt.target.href.substring(PREFIX_HREF.length);
        handler(menuItem);
      }
    });
  }

}
