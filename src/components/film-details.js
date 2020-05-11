import {formatFullDateMovie} from "../utils/common.js";
import {formatTimeLengthMovie} from "../utils/common.js";
// import AbstractComponent from "./abstract-component.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

// let templatePictureSmile = ``;
const checkedTemplate = `checked`;

export const createFilmDetails = (filmCardData, templatePictureSmile) => {
  const formatGenre = (genreArr) => {
    let html = ``;
    for (let i = 0; i < genreArr.length; i++) {
      html += `<span class="film-details__genre">${genreArr[i]}</span>`;
    }
    return html;
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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${filmCardData.isWatchlist ? checkedTemplate : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${filmCardData.isAlreadyWatched ? checkedTemplate : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${filmCardData.isFavorite ? checkedTemplate : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCardData.commentsNumber}</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${templatePictureSmile ? templatePictureSmile : ``}</div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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


export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmCardData) {
    super();
    this._filmCardData = filmCardData;

    this._submitHandler = null;
    this._submitHandlerForBtnOne = null;
    this._submitHandlerForBtntwo = null;
    this._submitHandlerForBtnthree = null;

    this._smileHandler = null;
    this._subscribeOnEvents = this._subscribeOnEvents;
    this._subscribeOnEvents();
    this._templatePictureSmile = ``;
  }

  getTemplate() {
    return createFilmDetails(this._filmCardData, this._templatePictureSmile);
  }

  recoveryListeners() {
    this.setCloseFilmDetailsBtnHandler(this._submitHandler);

    this.setBtnAddtoWatchlistHandler(this._submitHandlerForBtnOne);
    this.setBtnMarkAsWatchedHandler(this._submitHandlerForBtntwo);
    this.setBtnFavoriteHandler(this._submitHandlerForBtnthree);

    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  getCommentsList() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  setCloseFilmDetailsBtnHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);

    this._submitHandler = handler;
  }


  setBtnAddtoWatchlistHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, handler);

    this._submitHandlerForBtnOne = handler;
  }


  setBtnMarkAsWatchedHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, handler);

    this._submitHandlerForBtntwo = handler;
  }

  setBtnFavoriteHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, handler);

    this._submitHandlerForBtnthree = handler;
  }

  /* setChangeSmile() {
    this.getElement().querySelector(`.film-details__emoji-list`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.closest(`INPUT`)) {
        templatePictureSmile = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-${evt.target.value}">`;
        this.rerender();
      }
    });
  }*/
  /* setChangeSmile(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`)
    .addEventListener(`click`, handler);
  }*/
  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__emoji-list`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.closest(`INPUT`)) {
        this._templatePictureSmile = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-${evt.target.value}">`;
        this.rerender();
        this._smileHandler(); // а как мы смогли вызвать свойство обьекта ?
      }//  Т.е. если круглые скобки инициируют вызов ф-ции, содержимое this.smilehandler может быть вызвано как ф-ция НО и может просто хранить значения ?
    });// как тогда содержимое из this может выполнится если все описания в другом файле ?
  } // тоесть там хранится ссылка на конкретный участок кода ? wait... what...

  setChangeSmile(handler) {
    this._smileHandler = handler;
  }
}