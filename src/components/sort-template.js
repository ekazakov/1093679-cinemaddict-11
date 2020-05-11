// import AbstractComponent from "./abstract-component.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {SortType} from "../utils/const.js";

const activeButtonClass = `sort__button--active`;
let sortType = SortType.DEFAULT;

export const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--default ${sortType === SortType.DEFAULT ? activeButtonClass : ``}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button sort__button--date ${sortType === SortType.DATE ? activeButtonClass : ``}">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button sort__button--rating ${sortType === SortType.RATING ? activeButtonClass : ``}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Filters extends AbstractSmartComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
    this._handler = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._handler);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) =>{
      evt.preventDefault();
      this._handler = handler;
      if (evt.target.tagName !== `A`) {
        return;
      }
      sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      } else {
        this.rerender();
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
