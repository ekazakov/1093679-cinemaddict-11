import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment-template.js";
import FilmCardComponent from "../components/film-card-template.js";
import {RenderPosition, Mode, DEFAULT_SMILE, Key, SHAKE_ANIMATION_TIMEOUT} from "../utils/const.js";
import {render, remove, replace} from "../utils/render.js";
import FilmCard from "../models/film-card.js";
import Comment from "../models/comment.js";

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

    this._currentSmile = DEFAULT_SMILE;
    this._currentCommentText = ``;
    this.commentComponent = null;
  }

  render(place, filmCard) {
    const filmCardComponent = this._filmCardComponent;
    const filmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(filmCard);
    this._filmDetailsComponent = new FilmDetailsComponent(filmCard, this._currentSmile, this._currentCommentText);


    this._filmCardComponent.setFilmCardClickHandler((evt) => {
      if (evt.target.closest(`IMG`) || evt.target.closest(`A`) || evt.target.closest(`H3`)) {
        this._filmDetailsComponent.rerender();
        render(this._mainElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);

        if (this._mode === Mode.EDIT) {
          this._mode = Mode.DEFAULT;
        }
        this._onViewChange();
        this._mode = Mode.EDIT;
        this._renderComments(filmCard);
        document.addEventListener(`keydown`, this._onEscKeyDown);
      }
    });

    this._filmDetailsComponent.setForm(() =>{
      let comment = this._filmDetailsComponent.getData();
      comment = new Comment(comment.commentToRAW());
      this._onDataChange(this, filmCard, null, comment.commentToSend());
      this.setBlockForm(true);
    });

    this._filmDetailsComponent.setChangeSmile((smile) => {
      this._mode = Mode.EDIT;
      this._currentSmile = smile;
      this._renderComments(filmCard);
    });


    this._filmDetailsComponent.setCloseFilmDetailsBtnHandler(() => {
      remove(this._filmDetailsComponent);
      this._filmDetailsComponent.rerender();
      this._mode = Mode.DEFAULT;
      this._currentSmile = DEFAULT_SMILE;
      this._currentCommentText = ``;
      this._filmDetailsComponent._setCurrentText(``);
      this._filmDetailsComponent.setCurrentSmile(this._currentSmile);
    });

    this._filmDetailsComponent.setBtnAddtoWatchlistHandler(() => {
      this._currentCommentText = this._filmDetailsComponent.getData().commentText;
      let newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isWatchlist = !newFilmCard.isWatchlist;
      this._onDataChange(this, filmCard, newFilmCard);
    });

    this._filmDetailsComponent.setBtnMarkAsWatchedHandler(() => {
      this._currentCommentText = this._filmDetailsComponent.getData().commentText;

      let newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isAlreadyWatched = !newFilmCard.isAlreadyWatched;
      newFilmCard.watchingDate = newFilmCard.isAlreadyWatched ? new Date() : null;
      this._onDataChange(this, filmCard, newFilmCard);
    });

    this._filmDetailsComponent.setBtnFavoriteHandler(() => {
      this._currentCommentText = this._filmDetailsComponent.getData().commentText;

      let newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isFavorite = !newFilmCard.isFavorite;
      this._onDataChange(this, filmCard, newFilmCard);
    });


    this._filmCardComponent.setBtnAddtoWatchlistHandler((evt) => {
      evt.preventDefault();

      let newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isWatchlist = !newFilmCard.isWatchlist;
      this._onDataChange(this, filmCard, newFilmCard);
    });

    this._filmCardComponent.setBtnMarkAsWatchedHandler((evt) => {
      evt.preventDefault();

      let newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isAlreadyWatched = !newFilmCard.isAlreadyWatched;
      newFilmCard.watchingDate = newFilmCard.isAlreadyWatched ? new Date() : null;
      this._onDataChange(this, filmCard, newFilmCard);
    });

    this._filmCardComponent.setBtnFavoriteHandler((evt) => {
      evt.preventDefault();

      let newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isFavorite = !newFilmCard.isFavorite;
      this._onDataChange(this, filmCard, newFilmCard);
    });

    if (filmCardComponent && filmDetailsComponent) {
      replace(this._filmCardComponent, filmCardComponent);
      replace(this._filmDetailsComponent, filmDetailsComponent);
      this._renderComments(filmCard);

    } else {
      render(place, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      remove(this._filmDetailsComponent);
      this._mode = Mode.DEFAULT;

      this._currentSmile = DEFAULT_SMILE;
      this._filmDetailsComponent.setCurrentSmile(this._currentSmile);
    }
  }

  resetDeleteButton() {
    this.commentComponent.resetDeleteButton();
  }

  shakeComment() {
    this.commentComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.commentComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _renderComments(filmCard) {
    filmCard.comments.forEach((comment) => {
      let commentComponent = new CommentComponent(comment);
      commentComponent.setDeleteHandler(() => {
        this.commentComponent = commentComponent;
        this._onDataChange(this, filmCard, null, commentComponent);
      });

      render(this._filmDetailsComponent.getCommentsList(), commentComponent, RenderPosition.BEFOREEND);
    });
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESC;

    if (isEscKey) {
      remove(this._filmDetailsComponent);
      this._mode = Mode.DEFAULT;
      this._currentSmile = DEFAULT_SMILE;
      this._currentCommentText = ``;
      this._filmDetailsComponent.setCurrentSmile(this._currentSmile);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  shake() {
    this._filmDetailsComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this._filmDetailsComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  setErrorComment() {
    this._filmDetailsComponent.getElement().querySelector(`textarea`).style = `border: 3px solid red;`;
  }

  setBlockForm(value) {
    if (value) {
      this._filmDetailsComponent.getElement().querySelectorAll(`form input, form select, form textarea, form button, form label`)
     .forEach((elem) => elem.setAttribute(`disabled`, `disabled`));
      this._filmDetailsComponent.removeAllHandlers();
    } else {
      this._filmDetailsComponent.getElement().querySelectorAll(`form input, form select, form textarea, form button, form label`)
     .forEach((elem) => elem.removeAttribute(`disabled`));
      this._filmDetailsComponent.recoveryAllHandlers();
    }
  }
}
