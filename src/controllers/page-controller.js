const CARDS_COUNT = 5;
const CARDS_COUNT_FOR_OTHER = 2;

import SortComponent from "../components/sort-template.js";
import FilmsContainerComponent from "../components/films-container-template.js";
import ShowMoreBtnComponent from "../components/show-more-btn-template.js";

import {RenderPosition} from "../utils/const.js";
import {render, remove/* , replace*/} from "../utils/render.js";
import {SortType} from "../utils/const.js";

import MovieController from "./movie-controller.js";

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

const renderFilmCards = (containerForCards, container, actuallyCardsArr, _onDataChange) => {
  actuallyCardsArr.map((filmCard) => {
    const movieController = new MovieController(container, actuallyCardsArr, _onDataChange);
    movieController.renderFilmCard(containerForCards, filmCard);

    return movieController;
  });
};

export default class PageController {
  constructor(filmCards, mainElement) {
    this._filmCards = filmCards;
    this._mainElement = mainElement;

    this._onDataChange = this._onDataChange.bind(this);
    this._showMoreBtn = new ShowMoreBtnComponent();
    this._sortComponent = new SortComponent();
    this._container = new FilmsContainerComponent();
    this._filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);
  }
  // --------------------------on-Data-change--------------------------------
  _onDataChange(movieController, oldData, newData) {
    const index = this._filmCards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._filmCards = [].concat(this._filmCards.slice(0, index), newData, this._filmCards.slice(index + 1)); console.log(this._filmCards);

    movieController.renderFilmCard(this._filmsListContainer, this._filmCards[index]);
  }

  /* renderFilmCards(actuallyCardsArr) {
    const filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);
    actuallyCardsArr.slice()
    .forEach((filmCard) => {
      this.movieController.renderFilmCard(filmsListContainer, filmCard);
    });
  }*/

  // ---------------show-more-btn ---------------------------------------
  renderShowMoreBtn() {
    const filmsList = this._container.getElement().querySelector(`.films-list`);
    render(filmsList, this._showMoreBtn, RenderPosition.BEFOREEND);
    let countShowingFilmCards = CARDS_COUNT;
    this._showMoreBtn.setShowMoreBtnClickHandler(() => {

      let prevFilmCards = countShowingFilmCards;
      countShowingFilmCards = countShowingFilmCards + CARDS_COUNT;

      const sortedCards = getSortFilmCards(this._filmCards, this._sortComponent.getSortType(), prevFilmCards, countShowingFilmCards);

      renderFilmCards(this._filmsListContainer, this._mainElement, sortedCards, this._onDataChange);

      if (countShowingFilmCards >= this._filmCards.length) {
        remove(this._showMoreBtn);
      }
    });
  }

  render() {
    render(this._mainElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._mainElement, this._container, RenderPosition.BEFOREEND);

    this.renderShowMoreBtn();
    this._setSortTypeChange();
    // -------------------------base-5-cards-render-----------------------------
    /* this._filmCards.slice(0, CARDS_COUNT)
    .forEach((filmCard) => {
      this.movieController.renderFilmCard(filmsListContainer, filmCard);
    });*/
    // const renderFilmCards = (containerForCards, container, actuallyCardsArr, _onDataChange) => {
    renderFilmCards(this._filmsListContainer, this._mainElement, this._filmCards.slice(0, CARDS_COUNT), this._onDataChange); console.log(this._mainElement);
    // -----------------------------OTHER_CONTAINERS------------------------
    const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
    const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
    let sortCards = getSortFilmCards(this._filmCards, SortType.RATING, 0, CARDS_COUNT_FOR_OTHER);
    // sortCards.forEach((filmCard) => {
    // this.movieController.renderFilmCard(topRatedContainer, filmCard);
    renderFilmCards(topRatedContainer, this._mainElement, sortCards, this._onDataChange);
    // });
    sortCards = getSortFilmCards(this._filmCards, SortType.COMMENT, 0, CARDS_COUNT_FOR_OTHER);
    // sortCards.forEach((filmCard) => {
    // this.movieController.renderFilmCard(topCommentContainer, filmCard);
    renderFilmCards(topCommentContainer, this._mainElement, sortCards, this._onDataChange);
    // });
  }
  // -------------------------SORT----------------------------------------------
  _setSortTypeChange() {
    let countShowingFilmCards = CARDS_COUNT;
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      countShowingFilmCards = CARDS_COUNT;
      const sortedFilmCards = getSortFilmCards(this._filmCards, sortType, 0, CARDS_COUNT);

      while (this._filmsListContainer.firstChild) {
        this._filmsListContainer.removeChild(this._filmsListContainer.firstChild);
      }
      // const renderFilmCards = (containerForCards, container, actuallyCardsArr, _onDataChange) => {
      renderFilmCards(this._filmsListContainer, this._mainElement, sortedFilmCards, this._onDataChange);
      remove(this._showMoreBtn);
      this.renderShowMoreBtn();
    });
  }
}
