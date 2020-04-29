const CARDS_COUNT = 5;
const CARDS_COUNT_FOR_OTHER = 2;

import SortComponent from "../components/sort-template.js";
import FilmsContainerComponent from "../components/films-container-template.js";
import FilmDetailsComponent from "../components/film-details.js";
import FilmCardComponent from "../components/film-card-template.js";
import CommentComponent from "../components/comment-template.js";
import ShowMoreBtnComponent from "../components/show-more-btn-template.js";

import {RenderPosition} from "../utils/const.js";
import {render, remove/* , replace*/} from "../utils/render.js";
import {SortType} from "../utils/const.js";


const getSortFilmCards = (filmCards, sortType, start, end) => {
  let sortedCards = [];
  const showingCards = filmCards.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedCards = showingCards;
      break;

    case SortType.DATE:
      sortedCards = showingCards.sort((a, b) => b.productionDate - a.productionDate);
      break;

    case SortType.RATING:
      sortedCards = showingCards.sort((a, b) => b.rating - a.rating);
      break;

    case SortType.COMMENT:
      sortedCards = showingCards.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }
  return sortedCards.slice(start, end);
};


export default class PageController {
  constructor(filmCards, mainElement) {
    this._filmCards = filmCards;
    this._mainElement = mainElement;
  }
  // ------------------------------render-film-card-------------------------
  renderFilmCard(place, filmCard) {
    // const filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);
    const filmCardComponent = new FilmCardComponent(filmCard);
    const filmDetailsComponent = new FilmDetailsComponent(filmCard);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCardComponent.setFilmCardClickHandler(() => {
      render(this._mainElement, filmDetailsComponent, RenderPosition.BEFOREEND);

      const commentsList = document.querySelector(`.film-details__comments-list`);
      filmCard.comments.forEach((comment) => {
        render(commentsList, new CommentComponent(comment), RenderPosition.BEFOREEND);
      });

      filmDetailsComponent.setCloseFilmDetailsBtnHandler(() => {
        remove(filmDetailsComponent);
      });
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    render(place, filmCardComponent, RenderPosition.BEFOREEND);
  }
  // ----------------------------main--render-----------------------------------
  render() {

    this._showMoreBtn = new ShowMoreBtnComponent();
    this._sortComponent = new SortComponent();
    this._container = new FilmsContainerComponent();

    render(this._mainElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._mainElement, this._container, RenderPosition.BEFOREEND);

    // -------------------------SORT----------------------------------------------
    let countShowingFilmCards = CARDS_COUNT;
    const filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      countShowingFilmCards = CARDS_COUNT;
      const sortedFilmCards = getSortFilmCards(this._filmCards, sortType, 0, CARDS_COUNT);

      // filmsListContainer.innerHTML = ``;
      while (filmsListContainer.firstChild) {
        filmsListContainer.removeChild(filmsListContainer.firstChild);
      }

      renderFilmCards(sortedFilmCards);
      remove(this._showMoreBtn);
      renderShowMoreBtn();
    });
    // ---------------show-more-btn ---------------------------------------
    const renderShowMoreBtn = () => {
      const filmsList = this._container.getElement().querySelector(`.films-list`);
      render(filmsList, this._showMoreBtn, RenderPosition.BEFOREEND);
      countShowingFilmCards = CARDS_COUNT;
      this._showMoreBtn.setShowMoreBtnClickHandler(() => {

        let prevFilmCards = countShowingFilmCards;
        countShowingFilmCards = countShowingFilmCards + CARDS_COUNT;

        const sortedCards = getSortFilmCards(this._filmCards, this._sortComponent.getSortType(), prevFilmCards, countShowingFilmCards);
        renderFilmCards(sortedCards);

        if (countShowingFilmCards >= this._filmCards.length) {
          remove(this._showMoreBtn);
        }
      });
    };
    // -------------------------------------------------------------------------
    const renderFilmCards = (actuallyCardsArr) => {
      actuallyCardsArr.slice()
      .forEach((filmCard) => {
        this.renderFilmCard(filmsListContainer, filmCard);
      });
    };
    renderShowMoreBtn();
    // -------------------------base-5-cards-render-----------------------------
    this._filmCards.slice(0, CARDS_COUNT)
    .forEach((filmCard) => {
      this.renderFilmCard(filmsListContainer, filmCard);
    });
    // -----------------------------OTHER_CONTAINERS------------------------
    const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
    const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
    let sortCards = getSortFilmCards(this._filmCards, SortType.RATING, 0, CARDS_COUNT_FOR_OTHER);
    sortCards.forEach((filmCard) => {
      this.renderFilmCard(topRatedContainer, filmCard);
    });
    sortCards = getSortFilmCards(this._filmCards, SortType.COMMENT, 0, CARDS_COUNT_FOR_OTHER);
    sortCards.forEach((filmCard) => {
      this.renderFilmCard(topCommentContainer, filmCard);
    });
  }
}
