const CARDS_COUNT = 5;
const CARDS_COUNT_FOR_OTHER = 2;

import SortComponent from "../components/sort-template.js";
import FilmsContainerComponent from "../components/films-container-template.js";
import ShowMoreBtnComponent from "../components/show-more-btn-template.js";
import {RenderPosition} from "../utils/const.js";
import {render, remove} from "../utils/render.js";
import {SortType, HIDDEN_CLASS} from "../utils/const.js";

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

const renderFilmCards = (containerForCards, container, actuallyCardsArr, _onDataChange, _onViewChange) => {
  return actuallyCardsArr.map((filmCard) => {
    const movieController = new MovieController(container, actuallyCardsArr, _onDataChange, _onViewChange);
    movieController.render(containerForCards, filmCard);

    return movieController;
  });
};

export default class PageController {
  constructor(filmCardsModel, mainElement) {
    this._filmCardsModel = filmCardsModel;
    this._mainElement = mainElement;

    this._showedFilmCards = [];
    this._newFilmCards = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._showMoreBtn = new ShowMoreBtnComponent();
    this._sortComponent = new SortComponent();
    this._container = new FilmsContainerComponent();
    this._filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);

    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmCardsModel.setFilterChangeHandler(this._onFilterChange);
    this._countShowingFilmCards = CARDS_COUNT;

    this._filmsElement = this._container._element;
  }
  // --------------------------on-Data-change--------------------------------
  _onDataChange(movieController, oldData, newData, comment = null) {
    if (!newData && !comment.getElement) {
      this._filmCardsModel.addComment(oldData, comment);
      movieController.render(this._filmsListContainer, oldData);

    } else if (!newData && comment) {
      this._filmCardsModel.removeComment(oldData, comment);
      movieController.render(this._filmsListContainer, oldData);

    } else if (newData && oldData && !comment) {
      const isSuccess = this._filmCardsModel.updateFilmCard(oldData.id, newData);

      if (isSuccess) {
        movieController.render(this._filmsListContainer, newData);
      }
    }
  }

  hide() {
    const sort = document.querySelector(`.sort`);
    sort.classList.add(HIDDEN_CLASS);
    this._filmsElement.classList.add(HIDDEN_CLASS);
  }

  show() {
    // this.setHandSortChange(SortType.DEFAULT);
    const sort = document.querySelector(`.sort`);
    sort.classList.remove(HIDDEN_CLASS);
    this._filmsElement.classList.remove(HIDDEN_CLASS);
  }

  _onViewChange() {
    this._showedFilmCards.forEach((it) => it.setDefaultView());
  }

  _updateFilmCards(count) {
    this._removeFilmCards();

    this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, this._filmCardsModel.getFilmCards().slice(0, count), this._onDataChange, this._onViewChange);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);
    this.renderShowMoreBtn();
    if (this._countShowingFilmCards >= this._filmCardsModel.getFilmCards().length) {
      remove(this._showMoreBtn);
    }
  }

  _onFilterChange() {
    this._updateFilmCards(CARDS_COUNT);
  }

  _removeFilmCards() {
    this._showedFilmCards.forEach((movieController) => {
      movieController.destroy();
      this._countShowingFilmCards = [];
    });
  }
  // ---------------show-more-btn ---------------------------------------
  renderShowMoreBtn() {
    const filmsList = this._container.getElement().querySelector(`.films-list`);
    render(filmsList, this._showMoreBtn, RenderPosition.BEFOREEND);
    this._countShowingFilmCards = CARDS_COUNT;
    this._showMoreBtn.setShowMoreBtnClickHandler(() => {

      let prevFilmCards = this._countShowingFilmCards;
      this._countShowingFilmCards = this._countShowingFilmCards + CARDS_COUNT;

      const sortedCards = getSortFilmCards(this._filmCardsModel.getFilmCards(), this._sortComponent.getSortType(), prevFilmCards, this._countShowingFilmCards);

      this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, sortedCards, this._onDataChange, this._onViewChange);
      this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

      if (this._countShowingFilmCards >= this._filmCardsModel.getFilmCards().length) {
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
    this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, this._filmCardsModel.getFilmCardsAll().slice(0, CARDS_COUNT), this._onDataChange, this._onViewChange);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

    this._renderOtherContainers();
  }
  _renderOtherContainers() {
    const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
    const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
    let sortCards = getSortFilmCards(this._filmCardsModel.getFilmCardsAll(), SortType.RATING, 0, CARDS_COUNT_FOR_OTHER);

    this._newFilmCards = renderFilmCards(topRatedContainer, this._mainElement, sortCards, this._onDataChange, this._onViewChange);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

    sortCards = getSortFilmCards(this._filmCardsModel.getFilmCardsAll(), SortType.COMMENT, 0, CARDS_COUNT_FOR_OTHER);

    this._newFilmCards = renderFilmCards(topCommentContainer, this._mainElement, sortCards, this._onDataChange, this._onViewChange);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);
  }
  // -------------------------SORT----------------------------------------------
  _setSortTypeChange() {
    this._sortComponent.setSortTypeChangeHandler((sortType) => {

      const sortedFilmCards = getSortFilmCards(this._filmCardsModel.getFilmCards(), sortType, 0, CARDS_COUNT);
      this._removeFilmCards();
      /* while (this._filmsListContainer.firstChild) {
        this._filmsListContainer.removeChild(this._filmsListContainer.firstChild);
      }*/

      this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, sortedFilmCards, this._onDataChange, this._onViewChange);
      this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

      remove(this._showMoreBtn);
      this.renderShowMoreBtn();
      this._renderOtherContainers();
    });
  }
  setHandSortChange(sortType) {
    this._sortComponent.setSortType(sortType);
    const sortedFilmCards = getSortFilmCards(this._filmCardsModel.getFilmCards(), sortType, 0, CARDS_COUNT);
    this._removeFilmCards();

    this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, sortedFilmCards, this._onDataChange, this._onViewChange);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

    remove(this._showMoreBtn);
    this.renderShowMoreBtn();

    // this._setSortTypeChange();
  }
}
