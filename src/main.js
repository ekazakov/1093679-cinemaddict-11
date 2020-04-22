const CARDS_COUNT = 5;
const CARDS_COUNT_FOR_OTHER = 2;

import {FILMS_CARDS_ARR} from "./components/generate-data-film-card.js";

import UserRankHeaderProfileComponent from "./components/user-rank-header-profile.js";
import MainNavMenuComponent from "./components/main-nav-menu-template.js";
import FiltersComponent from "./components/filters-template.js";
import FilmsContainerComponent from "./components/films-container-template.js";
import FilmCardComponent from "./components/film-card-template.js";
import ShowMoreBtnComponent from "./components/show-more-btn-template.js";
import FilmDetailsComponent from "./components/film-details.js";
import CommentComponent from "./components/comment-template.js";
import FooterStatisticsComponent from "./components/footer-statistics-template.js";

import {render} from "./util.js";
import {RenderPosition} from "./const.js";
// ----------statistics-module--------------
// import BigUserRank from "./components/user-rank-template.js";
// import Statistics from "./components/statistics-template.js";
// -----------------------------------------

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, new UserRankHeaderProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MainNavMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);


if (FILMS_CARDS_ARR.length) {
  render(mainElement, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);

  const updateCards = (value, index) => {
    value.index = index;
  };
  FILMS_CARDS_ARR.forEach(updateCards);

  const filmsListContainer = document.querySelector(`.films-list__container`);
  for (let i = 0; i < CARDS_COUNT; i++) {
    render(filmsListContainer, new FilmCardComponent(FILMS_CARDS_ARR[i]).getElement(), RenderPosition.BEFOREEND);
  }

  const filmsList = document.querySelector(`.films-list`);
  render(filmsList, new ShowMoreBtnComponent().getElement(), RenderPosition.BEFOREEND);

  // -------------------------Other - Containers -------------------------------
  let cards = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
  let companareForRatedContainer = (a, b) => {
    return b.rating - a.rating;
  };
  let companareForCommentsContainer = (a, b) => {
    return b.comments.length - a.comments.length;
  };
  cards.sort(companareForRatedContainer);
  const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
  for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
    render(topRatedContainer, new FilmCardComponent(cards[i]).getElement(), RenderPosition.BEFOREEND);
  }

  cards.sort(companareForCommentsContainer);
  const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
  for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
    render(topCommentContainer, new FilmCardComponent(cards[i]).getElement(), RenderPosition.BEFOREEND);
  }

  // --------------------film - details---------------------------
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      const filmDetails = document.querySelector(`.film-details`);
      mainElement.removeChild(filmDetails);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  mainElement.addEventListener(`click`, function (evt) {
    if (evt.target.closest(`IMG`) || evt.target.closest(`.film-card__comments`) || evt.target.closest(`H3`)) {
      let uniqueIndex = evt.target.closest(`ARTICLE`).dataset.index;
      render(mainElement, new FilmDetailsComponent(FILMS_CARDS_ARR[uniqueIndex]).getElement(), RenderPosition.BEFOREEND);

      const commentsList = document.querySelector(`.film-details__comments-list`);
      for (let i = 0; i < FILMS_CARDS_ARR[uniqueIndex].comments.length; i++) {
        render(commentsList, new CommentComponent(FILMS_CARDS_ARR[uniqueIndex].comments[i]).getElement(), RenderPosition.BEFOREEND);
      }

      document.addEventListener(`keydown`, onEscKeyDown);
      const filmDetails = document.querySelector(`.film-details`);
      const filmsDetailsCloseBtn = document.querySelector(`.film-details__close-btn`);
      filmsDetailsCloseBtn.addEventListener(`click`, () => {
        mainElement.removeChild(filmDetails);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    }
  });

  // -------------------------showMoreBtn-----------------------------------------
  let actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
  const showMoreBtn = document.querySelector(`.films-list__show-more`);
  showMoreBtn.addEventListener(`click`, () => {
    actuallyCardsArr.splice(0, 5);
    for (let i = 0; i < CARDS_COUNT; i++) {
      render(filmsListContainer, new FilmCardComponent(actuallyCardsArr[i]).getElement(), RenderPosition.BEFOREEND);
      if (actuallyCardsArr.length === 5) {
        showMoreBtn.classList.add(`visually-hidden`);
      }
    }
  });
  // -------------------------- SORT ---------------------------------------------
  const sort = document.querySelector(`.sort`);
  const defaultSort = document.querySelector(`.sort__button--default`);
  const dateSort = document.querySelector(`.sort__button--date`);
  const ratingSort = document.querySelector(`.sort__button--rating`);
  const ACTIVE_CLASS_FILTER = `sort__button--active`;

  const deleteShowingCards = () => {
    for (let i = 0; i < filmsListContainer.childNodes.length;) {
      if (filmsListContainer.childNodes[0].nodeName === `ARTICLE`) {
        filmsListContainer.childNodes[0].remove();
      }
    }
  };

  const setDateSort = () => {
    actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
    const companare = (a, b) => {
      return b.productionDate - a.productionDate;
    };
    showMoreBtn.classList.remove(`visually-hidden`);
    actuallyCardsArr.sort(companare);
    deleteShowingCards();
    for (let i = 0; i < CARDS_COUNT; i++) {
      render(filmsListContainer, new FilmCardComponent(actuallyCardsArr[i]).getElement(), RenderPosition.BEFOREEND);
    }
  };

  const setDefaultSort = () => {
    actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
    showMoreBtn.classList.remove(`visually-hidden`);
    deleteShowingCards();
    for (let i = 0; i < CARDS_COUNT; i++) {
      render(filmsListContainer, new FilmCardComponent(actuallyCardsArr[i]).getElement(), RenderPosition.BEFOREEND);
    }
  };

  const setRatingSort = () => {
    actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
    const companare = (a, b) => {
      return b.rating - a.rating;
    };
    showMoreBtn.classList.remove(`visually-hidden`);
    actuallyCardsArr.sort(companare);
    deleteShowingCards();
    for (let i = 0; i < CARDS_COUNT; i++) {
      render(filmsListContainer, new FilmCardComponent(actuallyCardsArr[i]).getElement(), RenderPosition.BEFOREEND);
    }
  };

  sort.addEventListener(`click`, (evt) =>{
    if (evt.target.closest(`A`)) {
      defaultSort.classList.remove(ACTIVE_CLASS_FILTER);
      dateSort.classList.remove(ACTIVE_CLASS_FILTER);
      ratingSort.classList.remove(ACTIVE_CLASS_FILTER);
      evt.target.classList.add(ACTIVE_CLASS_FILTER);
    }
  });

  dateSort.addEventListener(`click`, setDateSort);
  defaultSort.addEventListener(`click`, setDefaultSort);
  ratingSort.addEventListener(`click`, setRatingSort);
} else {
  mainElement.insertAdjacentHTML(RenderPosition.BEFOREEND, `<h2 class="films-list__title">There are no movies in our database</h2>`);
}
// ---------------------footer-count-movies--------------------
const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsComponent(FILMS_CARDS_ARR).getElement(), RenderPosition.BEFOREEND);
