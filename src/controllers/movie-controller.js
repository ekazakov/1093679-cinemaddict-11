
import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment-template.js";
import FilmCardComponent from "../components/film-card-template.js";
import {RenderPosition} from "../utils/const.js";
import {render, remove/* , replace*/} from "../utils/render.js";

export default class MovieController {
  constructor(mainElement, filmCards, onDataChange) {
    this._mainElement = mainElement; console.log(mainElement);
    this._filmCards = filmCards;
    this._onDataChange = onDataChange;
  }
  // ------------------------------render-film-card-------------------------
  renderFilmCard(place, filmCard) {
    this._filmCardComponent = new FilmCardComponent(filmCard);
    this._filmDetailsComponent = new FilmDetailsComponent(filmCard);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(this._filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmCardComponent.setFilmCardClickHandler((evt) => {
      if (evt.target.closest(`IMG`) || evt.target.closest(`A`) || evt.target.closest(`H3`)) {
        render(this._mainElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);

        const commentsList = document.querySelector(`.film-details__comments-list`);
        filmCard.comments.forEach((comment) => {
          render(commentsList, new CommentComponent(comment), RenderPosition.BEFOREEND);
        });

        this._filmDetailsComponent.setCloseFilmDetailsBtnHandler(() => {
          remove(this._filmDetailsComponent);
        });

        this._filmDetailsComponent.setBtnAddtoWatchlistHandler(() => {
          this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
            isWatchlist: !filmCard.isWatchlist,
          }));
        });
        this._filmDetailsComponent.setChangeSmile(); // ?
        // this._filmDetailsComponent.setBtnMarkAsWatchedHandler()

        // this._filmDetailsComponent.setBtnFavoriteHandler()
        document.addEventListener(`keydown`, onEscKeyDown);
      }
    });
    // ----------------------------------//---------------------------------------
    this._filmCardComponent.setBtnAddtoWatchlistHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isWatchlist: !filmCard.isWatchlist,
      }));
    });

    this._filmCardComponent.setBtnMarkAsWatchedHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isAlreadyWatched: !filmCard.isAlreadyWatched,
      }));
    });

    this._filmCardComponent.setBtnFavoriteHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isFavorite: !filmCard.isFavorite,
      }));
    });
    // -------------------------------------------------------------------------
    render(place, this._filmCardComponent, RenderPosition.BEFOREEND);
  }
}
