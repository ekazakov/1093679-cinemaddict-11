import {formatShortDateMovie, formatTimeLengthMovie, getFormatDescription} from "../utils/common.js";
import {ACTIVE_BTN_CLASS} from "../utils/const.js";
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
        <span class="film-card__genre">${genre.slice(0, 1)}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${getFormatDescription(description)}</p>
      <a class="film-card__comments">${commentsNumber} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${filmCardData.isWatchlist ? ACTIVE_BTN_CLASS : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${filmCardData.isAlreadyWatched ? ACTIVE_BTN_CLASS : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${filmCardData.isFavorite ? ACTIVE_BTN_CLASS : ``}">Mark as favorite</button>
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

  setBtnAddtoWatchlistHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, handler);
  }

  setBtnMarkAsWatchedHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, handler);
  }

  setBtnFavoriteHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, handler);
  }
}
