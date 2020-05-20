import {FilterType} from "../utils/const.js";
import FilterComponent from "../components/filters.js";

import {RenderPosition} from "../utils/const.js";
import {render, /* remove,*/ replace} from "../utils/render.js";
import {getCardsByFilter} from "../utils/filter-cards.js";

export default class FilterController {
  constructor(container, filmCardsModel, menuItem) {
    this._container = container;
    this._filmCardsModel = filmCardsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmCardsModel.setDataChangeHandler(this._onDataChange);

    this._setOnChangeFilterHandler = menuItem;
  }

  render() {
    const container = this._container;
    const filmCardsAll = this._filmCardsModel.getFilmCardsAll();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getCardsByFilter(filmCardsAll, filterType).length,
      };
    });

    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters, this._activeFilterType);
    this._filterComponent.setClickOnFiltersHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }

  }
  _onFilterChange(filterType) {
    this._filmCardsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
  _onDataChange() {
    this.render();
  }

  setOnchange(handler) {
    this._setOnChangeFilterHandler = handler;
    this._filterComponent.setOnchange(this._setOnChangeFilterHandler);
  }
}
