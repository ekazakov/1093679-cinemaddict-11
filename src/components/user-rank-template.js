import {createElement} from "../util.js";

export const createBigUserRankTemplate = () => {
  return (
    `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>`
  );
};

export default class BigUserRank {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBigUserRankTemplate();
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
