
import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment-template.js";
import FilmCardComponent from "../components/film-card-template.js";
import {RenderPosition, Mode} from "../utils/const.js";
import {render, remove, replace} from "../utils/render.js";


export default class MovieController {
  constructor(mainElement, filmCards, onDataChange, onViewChange) {
    this._mainElement = mainElement;
    this._filmCards = filmCards;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._comments = [];
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      remove(this._filmDetailsComponent);
      this._mode = Mode.DEFAULT;
    }
  }
  _renderComments(filmCard) {
    filmCard.comments.forEach((comment) => {
      let commentComponent = new CommentComponent(comment);
      this._comments.push(commentComponent);
      render(this._filmDetailsComponent.getCommentsList(), commentComponent, RenderPosition.BEFOREEND);
    });
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(this._filmDetailsComponent);
      this._mode = Mode.DEFAULT;
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
  // ------------------------------render-film-card-------------------------
  render(place, filmCard) {
    const filmCardComponent = this._filmCardComponent;
    const filmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(filmCard);
    this._filmDetailsComponent = new FilmDetailsComponent(filmCard);


    this._filmCardComponent.setFilmCardClickHandler((evt) => {
      if (evt.target.closest(`IMG`) || evt.target.closest(`A`) || evt.target.closest(`H3`)) {
        render(this._mainElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
        this._onViewChange();
        this._mode = Mode.EDIT;

        this._renderComments(filmCard);
        document.addEventListener(`keydown`, this._onEscKeyDown);

        this._comments.forEach((commentComponent) => {
          commentComponent.setDeleteHandler(() => {
            this._onDataChange(this, filmCard, null, commentComponent);
            console.log(commentComponent.getElement());
          });
        });
      }
    });

    // this._filmDetailsComponent.setChangeForm(() => {
      // this._filmDetailsComponent._setSubmitForm();
      this._filmDetailsComponent._setForm(() =>{
        console.log(`asdasd`);
        let a = this._filmDetailsComponent.getData();
        console.log(a);
        console.log(`yes`);
        this._onDataChange(this, filmCard, null, a);
      });


    this._filmDetailsComponent.setChangeSmile(() => {
      this._mode = Mode.EDIT;
      this._renderComments(filmCard);
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
    if (filmCardComponent && filmDetailsComponent) {
      replace(this._filmCardComponent, filmCardComponent);
      replace(this._filmDetailsComponent, filmDetailsComponent);
      this._renderComments(filmCard);

      this._comments.forEach((commentComponent) => {
        commentComponent.setDeleteHandler(() => {
          this._onDataChange(this, filmCard, null, commentComponent);
        });
      });

    } else {
      render(place, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }
}
