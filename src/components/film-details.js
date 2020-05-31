import {formatFullDateMovie} from "../utils/common.js";
import {formatTimeLengthMovie} from "../utils/common.js";
import {Key, DEFAULT_SMILE} from "../utils/const.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {encode} from "he";
import Comment from "../models/comment.js";


export const createFilmDetails = (filmCardData, templatePictureSmile, commentText) => {
  const formatGenre = (genreArr) => {
    let html = ``;
    genreArr.forEach((genreItem) => {
      html += `<span class="film-details__genre">${genreItem}</span>`;
    });
    return html;
  };

  const formatSmile = () => {
    if (!templatePictureSmile) {
      templatePictureSmile = DEFAULT_SMILE;
    }
    return `<img src="images/emoji/${templatePictureSmile}.png" width="55" height="55" alt="emoji-${templatePictureSmile}">`;
  };

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${filmCardData.poster} alt="">

              <p class="film-details__age">${filmCardData.ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmCardData.title}</h3>
                  <p class="film-details__title-original">Original: ${filmCardData.originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${filmCardData.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${filmCardData.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${filmCardData.screenwriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${filmCardData.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatFullDateMovie(filmCardData.productionDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatTimeLengthMovie(filmCardData.movieLength)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${filmCardData.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${filmCardData.genre.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">${formatGenre(filmCardData.genre)}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${filmCardData.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${filmCardData.isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${filmCardData.isAlreadyWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${filmCardData.isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCardData.commentsNumber}</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${formatSmile()}</div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText}</textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                    <label class="film-details__emoji-label" for="emoji-smile">
                      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                    </label>

                    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                      <label class="film-details__emoji-label" for="emoji-puke">
                        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
                    </div>
                  </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

const parseFromData = (formData, activeSmile) => {
  const commentText = encode(formData.get(`comment`));
  return new Comment({
    "comment": commentText,
    "date": new Date().toISOString(),
    "emotion": activeSmile ? activeSmile : DEFAULT_SMILE,
  });
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmCardData, currentSmile, commentText) {
    super();
    this._filmCardData = filmCardData;
    this._closeHandler = null;
    this._watchlistHandlerBtn = null;
    this._watchedHandlerBtn = null;
    this._favoriteHandlerBtn = null;
    this._smileHandler = null;
    this._templatePictureSmile = currentSmile;
    this._currentCommentText = commentText;
    this._subscribeEvents();

    this._submitHandler = null;
    this._setSubmitForm();
    this.resetCommentError();
  }

  getTemplate() {
    return createFilmDetails(this._filmCardData, this._templatePictureSmile, this._currentCommentText);
  }

  getCommentsList() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  getData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);
    return parseFromData(formData, this._templatePictureSmile);
  }

  setChangeSmile(handler) {
    this._smileHandler = handler;
  }

  setCurrentSmile(smile) {
    this._templatePictureSmile = smile;
  }

  setCurrentText(text) {
    this._currentCommentText = text;
  }

  setForm(handler) {
    this._submitHandler = handler;
  }

  recoveryListeners() {
    this.setCloseFilmDetailsBtnHandler(this._closeHandler);
    this.setBtnAddtoWatchlistHandler(this._watchlistHandlerBtn);
    this.setBtnMarkAsWatchedHandler(this._watchedHandlerBtn);
    this.setBtnFavoriteHandler(this._favoriteHandlerBtn);
    this._subscribeEvents();
    this._setSubmitForm();
  }

  rerender() {
    super.rerender();
  }

  setCloseFilmDetailsBtnHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);
    this._closeHandler = handler;
  }
  setBtnAddtoWatchlistHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, handler);
    this._watchlistHandlerBtn = handler;
  }
  setBtnMarkAsWatchedHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, handler);
    this._watchedHandlerBtn = handler;
  }
  setBtnFavoriteHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, handler);
    this._favoriteHandlerBtn = handler;
  }

  removeAllHandlers() {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .removeEventListener(`click`, this._watchlistHandlerBtn);
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .removeEventListener(`click`, this._watchedHandlerBtn);
    this.getElement().querySelector(`.film-details__control-label--favorite`)
    .removeEventListener(`click`, this._favoriteHandlerBtn);
    this.getElement().querySelector(`.film-details__close-btn`)
    .removeEventListener(`click`, this._closeHandler);
  }
  recoveryAllHandlers() {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, this._watchlistHandlerBtn);
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, this._watchedHandlerBtn);
    this.getElement().querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, this._favoriteHandlerBtn);
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, this._closeHandler);
  }

  _subscribeEvents() {
    this.getElement().querySelector(`.film-details__emoji-list`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.closest(`INPUT`)) {

        this._templatePictureSmile = evt.target.value;
        this._currentCommentText = this.getData().commentText;
        this.rerender();
        this._smileHandler(this._templatePictureSmile);
        this.setCurrentText(this._currentCommentText);
      }
    });
  }

  _setSubmitForm() {
    this.getElement().querySelector(`form`)
    .addEventListener(`keydown`, (evt) => {
      if (evt.ctrlKey && evt.key === Key.ENTER) {
        this._submitHandler();
      }
    });
  }

  resetCommentError() {
    this.getElement().querySelector(`.film-details__comment-input`)
    .addEventListener(`click`, () => {
      this.getElement().querySelector(`.film-details__comment-input`).style = ``;
    });
  }
}
