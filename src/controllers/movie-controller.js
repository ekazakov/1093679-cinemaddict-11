
import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment-template.js";
import FilmCardComponent from "../components/film-card-template.js";
import {RenderPosition} from "../utils/const.js";
import {render, remove, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class MovieController {
  constructor(mainElement, filmCards, onDataChange, onViewChange) {
    this._mainElement = mainElement;
    this._filmCards = filmCards;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      remove(this._filmDetailsComponent);
      this._filmDetailsComponent();
      this._mode = Mode.DEFAULT;
    }
  }
  // ------------------------------render-film-card-------------------------
  render(place, filmCard) {
    const filmCardComponent = this._filmCardComponent;
    const filmDetailsComponent = this._filmDetailsComponent;

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
        this._onViewChange();
        this._mode = Mode.EDIT;

        filmCard.comments.forEach((comment) => {
          render(this._filmDetailsComponent.getCommentsList(), new CommentComponent(comment), RenderPosition.BEFOREEND);
        });
      }
    });

    this._filmDetailsComponent.setCloseFilmDetailsBtnHandler(() => {
      remove(this._filmDetailsComponent);
      this._filmDetailsComponent.rerender();
      this._mode = Mode.DEFAULT;
    });

    this._filmDetailsComponent.setBtnAddtoWatchlistHandler(() => {
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isWatchlist: !filmCard.isWatchlist,
      }));
    });

    this._filmDetailsComponent.setBtnMarkAsWatchedHandler(() => {
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isAlreadyWatched: !filmCard.isAlreadyWatched,
      }));
    });

    this._filmDetailsComponent.setBtnFavoriteHandler(() =>{
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isFavorite: !filmCard.isFavorite,
      }));
    });

    this._filmDetailsComponent.setChangeSmile();
    document.addEventListener(`keydown`, onEscKeyDown);

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
    // render(place, this._filmCardComponent, RenderPosition.BEFOREEND);
    if (filmCardComponent && filmDetailsComponent) {
      replace(this._filmCardComponent, filmCardComponent);
      replace(this._filmDetailsComponent, filmDetailsComponent);

    } else {
      render(place, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }
}
