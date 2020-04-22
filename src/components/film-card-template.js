import {formatShortDateMovie} from "../util.js";
import {formatTimeLengthMovie} from "../util.js";
import {createElement} from "../util.js";

export const createFilmCardTemplate = (filmCardData) => {
  const {title, rating, productionDate, movieLength, genre, poster, description, commentsNumber} = filmCardData;
  return (
    `<article class="film-card" data-index=${filmCardData.index}>
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatShortDateMovie(productionDate)}</span>
        <span class="film-card__duration">${formatTimeLengthMovie(movieLength)}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsNumber} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard {
  constructor(filmCardData) {
    this._filmCardData = filmCardData;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCardData);
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
