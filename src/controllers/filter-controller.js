import {FilterType} from "../utils/const.js";
import FilterComponent from "../components/filters.js";

import {RenderPosition} from "../utils/const.js";
import {render, replace} from "../utils/render.js";
import {getCardsByFilter} from "../utils/filter-cards.js";

export default class FilterController {
  constructor(container, filmCardsModel) {
    this._container = container;
    this._filmCardsModel = filmCardsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._filmCardsModel.setDataChangeHandler(this._dataChangeHandler);

    this._setChangeFilterHandler = null;
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
    this._filterComponent.setClickFiltersHandler(this._filterChangeHandler);
    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
      this._filterComponent.setChange(this._setChangeFilterHandler);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  setChange(handler) {
    this._setChangeFilterHandler = handler;
    this._filterComponent.setChange(this._setChangeFilterHandler);
  }

  _filterChangeHandler(filterType) {
    this._filmCardsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _dataChangeHandler() {
    this.render();
  }
}
