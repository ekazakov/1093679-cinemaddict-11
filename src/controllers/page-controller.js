import SortComponent from "../components/sort-template.js";
import FilmsContainerComponent from "../components/films-container-template.js";
import ShowMoreBtnComponent from "../components/show-more-btn-template.js";
import {RenderPosition} from "../utils/const.js";
import {render, remove} from "../utils/render.js";
import {SortType, HIDDEN_CLASS, CARDS_COUNT, CARDS_COUNT_FOR_OTHER} from "../utils/const.js";

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

const renderFilmCards = (containerForCards, container, actuallyCardsArr, _dataChangeHandler, _viewChangeHandler) => {
  return actuallyCardsArr.map((filmCard) => {
    const movieController = new MovieController(container, actuallyCardsArr, _dataChangeHandler, _viewChangeHandler);
    movieController.render(containerForCards, filmCard);

    return movieController;
  });
};

export default class PageController {
  constructor(filmCardsModel, mainElement, api) {
    this._filmCardsModel = filmCardsModel;
    this._mainElement = mainElement;
    this._api = api;

    this._showedFilmCards = [];
    this._newFilmCards = null;
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._showMoreBtn = new ShowMoreBtnComponent();
    this._sortComponent = new SortComponent();
    this._container = new FilmsContainerComponent();
    this._filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);

    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._filmCardsModel.setFilterChangeHandler(this._filterChangeHandler);
    this._countShowingFilmCards = CARDS_COUNT;

    this._filmsElement = this._container._element;
  }

  render() {
    render(this._mainElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._mainElement, this._container, RenderPosition.BEFOREEND);

    this._renderShowMoreBtn();
    this._setSortTypeChange();

    this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, this._filmCardsModel.getFilmCardsAll().slice(0, CARDS_COUNT), this._dataChangeHandler, this._viewChangeHandler);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

    this._renderOtherContainers();
  }

  hide() {
    const sort = document.querySelector(`.sort`);
    if (sort) {
      sort.classList.add(HIDDEN_CLASS);
    }
    this._filmsElement.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._setHandSortChange(SortType.DEFAULT);
    const sort = document.querySelector(`.sort`);
    sort.classList.remove(HIDDEN_CLASS);
    this._filmsElement.classList.remove(HIDDEN_CLASS);
  }

  _dataChangeHandler(movieController, oldData, newData, comment = null) {
    if (!newData && !comment.getElement) {
      this._api.addCommentCard(oldData.id, comment)
      .then((filmCard) => {
        const isSuccess = this._filmCardsModel.updateFilmCard(oldData.id, filmCard);

        if (isSuccess) {
          movieController.render(this._filmsListContainer, filmCard);
        }
      })
      .catch(() => {
        movieController.setBlockForm(false);
        movieController.setErrorComment();
        movieController.shake();
      });

    } else if (!newData && comment) {
      this._api.deleteCommentCard(comment.getId())
      .then(() => {
        return this._api.updateFilmCard(oldData.id, oldData);
      })
      .then((filmCard) => {
        return this._api.getFullFilmCard(filmCard, filmCard.id);
      })
      .then((filmCard) => {
        this._filmCardsModel.removeComment(oldData, comment);
        movieController.render(this._filmsListContainer, filmCard);
      })
      .catch(() => {
        movieController.resetDeleteButton();
        movieController.shakeComment();
      });

    } else if (newData && oldData && !comment) {
      this._api.updateFilmCard(oldData.id, newData)
      .then((filmCard) => {
        return this._api.getFullFilmCard(filmCard, filmCard.id);
      })
      .then((filmCard) => {
        const isSuccess = this._filmCardsModel.updateFilmCard(oldData.id, filmCard);

        if (isSuccess) {
          movieController.render(this._filmsListContainer, filmCard);
        }
      })
      .catch(() => {
        movieController.shake();
      });
    }
  }

  _viewChangeHandler() {
    this._showedFilmCards.forEach((it) => it.setDefaultView());
  }

  _updateFilmCards(count) {
    this._removeFilmCards();
    this._renderOtherContainers();
    this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, this._filmCardsModel.getFilmCards().slice(0, count), this._onDataChangeHandler, this._onViewChangeHandler);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);
    this._renderShowMoreBtn();
    if (this._countShowingFilmCards >= this._filmCardsModel.getFilmCards().length) {
      remove(this._showMoreBtn);
    }
  }

  _filterChangeHandler() {
    this._updateFilmCards(CARDS_COUNT);
  }

  _removeFilmCards() {
    this._showedFilmCards.forEach((movieController) => {
      movieController.destroy();
    });
    this._countShowingFilmCards = 0;
    this._countShowingFilmCards = [];
  }

  _renderShowMoreBtn() {
    const filmsList = this._container.getElement().querySelector(`.films-list`);
    if (this._filmCardsModel.getFilmCards().length <= CARDS_COUNT) {
      remove(this._showMoreBtn);
    } else {
      render(filmsList, this._showMoreBtn, RenderPosition.BEFOREEND);
    }
    this._countShowingFilmCards = CARDS_COUNT;
    this._showMoreBtn.setShowMoreBtnClickHandler(() => {

      const prevFilmCards = this._countShowingFilmCards;
      this._countShowingFilmCards = this._countShowingFilmCards + CARDS_COUNT;

      const sortedCards = getSortFilmCards(this._filmCardsModel.getFilmCards(), this._sortComponent.getSortType(), prevFilmCards, this._countShowingFilmCards);

      this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, sortedCards, this._dataChangeHandler, this._viewChangeHandler);
      this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

      if (this._countShowingFilmCards >= this._filmCardsModel.getFilmCards().length) {
        remove(this._showMoreBtn);
      }
    });
  }

  _renderOtherContainers() {
    const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
    const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
    let sortCards = getSortFilmCards(this._filmCardsModel.getFilmCardsAll(), SortType.RATING, 0, CARDS_COUNT_FOR_OTHER);

    this._newFilmCards = renderFilmCards(topRatedContainer, this._mainElement, sortCards, this._dataChangeHandler, this._viewChangeHandler);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

    sortCards = getSortFilmCards(this._filmCardsModel.getFilmCardsAll(), SortType.COMMENT, 0, CARDS_COUNT_FOR_OTHER);

    this._newFilmCards = renderFilmCards(topCommentContainer, this._mainElement, sortCards, this._dataChangeHandler, this._viewChangeHandler);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);
  }

  _setSortTypeChange() {
    this._sortComponent.setSortTypeChangeHandler((sortType) => {

      const sortedFilmCards = getSortFilmCards(this._filmCardsModel.getFilmCards(), sortType, 0, CARDS_COUNT);
      this._removeFilmCards();

      this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, sortedFilmCards, this._dataChangeHandler, this._viewChangeHandler);
      this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

      remove(this._showMoreBtn);
      this._renderShowMoreBtn();
      this._renderOtherContainers();
    });
  }
  _setHandSortChange(sortType) {
    this._sortComponent.setSortType(sortType);
    const sortedFilmCards = getSortFilmCards(this._filmCardsModel.getFilmCards(), sortType, 0, CARDS_COUNT);
    this._removeFilmCards();
    this._renderOtherContainers();
    this._newFilmCards = renderFilmCards(this._filmsListContainer, this._mainElement, sortedFilmCards, this._dataChangeHandler, this._viewChangeHandler);
    this._showedFilmCards = this._showedFilmCards.concat(this._newFilmCards);

    remove(this._showMoreBtn);
    this._renderShowMoreBtn();
  }
}
