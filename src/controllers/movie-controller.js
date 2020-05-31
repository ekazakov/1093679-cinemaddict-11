import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment-template.js";
import FilmCardComponent from "../components/film-card-template.js";
import {RenderPosition, Mode, DEFAULT_SMILE, Key, SHAKE_ANIMATION_TIMEOUT} from "../utils/const.js";
import {render, remove, replace} from "../utils/render.js";
import FilmCard from "../models/film-card.js";
import Comment from "../models/comment.js";

export default class MovieController {
  constructor(mainElement, filmCards, dataChangeHandler, viewChangeHandler) {
    this._mainElement = mainElement;
    this._filmCards = filmCards;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;
    this._escKeyDown = this._escKeyDown.bind(this);

    this._currentSmile = DEFAULT_SMILE;
    this._currentCommentText = ``;
    this.commentComponent = null;
  }

  setErrorComment() {
    this._filmDetailsComponent.getElement().querySelector(`textarea`).style = `border: 3px solid red;`;
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      remove(this._filmDetailsComponent);
      this._mode = Mode.DEFAULT;

      this._currentSmile = DEFAULT_SMILE;
      this._filmDetailsComponent.setCurrentSmile(this._currentSmile);
    }
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
        this._viewChangeHandler();
        this._mode = Mode.EDIT;
        this._renderComments(filmCard);
        document.addEventListener(`keydown`, this._escKeyDown);
      }
    });

    this._addHandlersForComponent(filmCard);

    if (filmCardComponent && filmDetailsComponent) {
      replace(this._filmCardComponent, filmCardComponent);
      replace(this._filmDetailsComponent, filmDetailsComponent);
      this._renderComments(filmCard);

    } else {
      render(place, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  shake() {
    this._filmDetailsComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this._filmDetailsComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  resetDeleteButton() {
    this.commentComponent.resetDeleteButton();
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shakeComment() {
    this.commentComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.commentComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _addHandlersForComponent(filmCard) {
    this._filmDetailsComponent.setForm(() =>{
      let comment = this._filmDetailsComponent.getData();
      comment = new Comment(comment.commentToRAW());
      this._dataChangeHandler(this, filmCard, null, comment.commentToSend());
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
      this._filmDetailsComponent.setCurrentText(``);
      this._filmDetailsComponent.setCurrentSmile(this._currentSmile);
    });

    this._filmDetailsComponent.setBtnAddtoWatchlistHandler(() => {
      this._currentCommentText = this._filmDetailsComponent.getData().commentText;
      const newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isWatchlist = !newFilmCard.isWatchlist;
      this._dataChangeHandler(this, filmCard, newFilmCard);
    });

    this._filmDetailsComponent.setBtnMarkAsWatchedHandler(() => {
      this._currentCommentText = this._filmDetailsComponent.getData().commentText;
      const newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isAlreadyWatched = !newFilmCard.isAlreadyWatched;
      newFilmCard.watchingDate = newFilmCard.isAlreadyWatched ? new Date() : null;
      this._dataChangeHandler(this, filmCard, newFilmCard);
    });

    this._filmDetailsComponent.setBtnFavoriteHandler(() => {
      this._currentCommentText = this._filmDetailsComponent.getData().commentText;
      const newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isFavorite = !newFilmCard.isFavorite;
      this._dataChangeHandler(this, filmCard, newFilmCard);
    });


    this._filmCardComponent.setBtnAddtoWatchlistHandler((evt) => {
      evt.preventDefault();
      const newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isWatchlist = !newFilmCard.isWatchlist;
      this._dataChangeHandler(this, filmCard, newFilmCard);
    });

    this._filmCardComponent.setBtnMarkAsWatchedHandler((evt) => {
      evt.preventDefault();
      const newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isAlreadyWatched = !newFilmCard.isAlreadyWatched;
      newFilmCard.watchingDate = newFilmCard.isAlreadyWatched ? new Date() : null;
      this._dataChangeHandler(this, filmCard, newFilmCard);
    });

    this._filmCardComponent.setBtnFavoriteHandler((evt) => {
      evt.preventDefault();
      const newFilmCard = FilmCard.clone(filmCard);
      newFilmCard.isFavorite = !newFilmCard.isFavorite;
      this._dataChangeHandler(this, filmCard, newFilmCard);
    });
  }

  _renderComments(filmCard) {
    filmCard.comments.forEach((comment) => {
      const commentComponent = new CommentComponent(comment);
      commentComponent.setDeleteHandler(() => {
        this.commentComponent = commentComponent;
        commentComponent.setDeletingBtn();
        this._dataChangeHandler(this, filmCard, null, commentComponent);
      });

      render(this._filmDetailsComponent.getCommentsList(), commentComponent, RenderPosition.BEFOREEND);
    });
  }

  _escKeyDown(evt) {
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
}
