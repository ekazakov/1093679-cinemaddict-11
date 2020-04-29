import {formatShortDateMovie} from "../utils/common.js";
import {formatTimeLengthMovie} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

export const createFilmCardTemplate = (filmCardData) => {
  const {title, rating, productionDate, movieLength, genre, poster, description, commentsNumber} = filmCardData;
  return (
    `<article class="film-card">
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

export default class FilmCard extends AbstractComponent {
  constructor(filmCardData) {
    super();
    this._filmCardData = filmCardData;
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCardData);
  }

  setFilmCardClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
