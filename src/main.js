// const SHOWING_CARDS_COUNT_ON_START = 5;
const CARDS_COUNT = 5;
const CARDS_COUNT_FOR_OTHER = 2;

import {FILMS_CARDS_ARR} from "./components/generate-data-film-card.js";

import {createUserRankTemplate} from "./components/user-rank-template.js";
import {createMainNavMenuTemplate} from "./components/main-nav-menu-template.js";
import {createFiltersTemplate} from "./components/filters-template.js";
import {createStatisticsTemplate} from "./components/statistics-template.js";
import {createFilmsContainerTemplate} from "./components/films-container-template.js";
import {createFilmCardTemplate} from "./components/film-card-template.js";
import {createShowMoreBtnTemplate} from "./components/show-more-btn-template.js";
import {createFilmDetails} from "./components/film-details.js";
import {createComentTemplate} from "./components/comment-template.js";
import {createFooterStatisticsTemplate} from "./components/footer-statistics-template.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, createUserRankTemplate(), `beforeend`);
render(mainElement, createMainNavMenuTemplate(), `beforeend`);
render(mainElement, createFiltersTemplate(), `beforeend`);
render(mainElement, createStatisticsTemplate(), `beforeend`);

render(mainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsListContainer = document.querySelector(`.films-list__container`);
for (let i = 0; i < CARDS_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(FILMS_CARDS_ARR[i]), `beforeend`);
}

const filmsContainer = document.querySelector(`.films-list`);
render(filmsContainer, createShowMoreBtnTemplate(), `beforeend`);

const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
  render(topRatedContainer, createFilmCardTemplate(FILMS_CARDS_ARR[i]), `beforeend`);
}

const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
  render(topCommentContainer, createFilmCardTemplate(FILMS_CARDS_ARR[i]), `beforeend`);
}

// ----------------film-details-------------------------------
render(mainElement, createFilmDetails(FILMS_CARDS_ARR[0]), `beforeend`);
// const filmsDetails = document.querySelector(`.film-details`);
// filmsDetails.classList.add(`visually-hidden`);

// ---------------------comments-list-------------------------------------
const commentsList = document.querySelector(`.film-details__comments-list`);
render(commentsList, createComentTemplate(FILMS_CARDS_ARR[1].comments[0]), `beforeend`);

// ---------------------footer-count-movies--------------------
const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, createFooterStatisticsTemplate(FILMS_CARDS_ARR), `beforeend`);
// ------------------------------------------------------------
let actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
// -------------------------showMoreBtn-----------------------------------------
const showMoreBtn = document.querySelector(`.films-list__show-more`);
showMoreBtn.addEventListener(`click`, () => {
  actuallyCardsArr.splice(0, 5);
  for (let i = 0; i < CARDS_COUNT; i++) {
    render(filmsListContainer, createFilmCardTemplate(actuallyCardsArr[i]), `beforeend`);
    if (actuallyCardsArr.length === 5) {
      showMoreBtn.classList.add(`visually-hidden`);
    }
  }
});
// ----------------------------Sort---------------------------------------
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
    render(filmsListContainer, createFilmCardTemplate(actuallyCardsArr[i]), `beforeend`);
  }
};

const setdefaultSort = () => {
  actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
  showMoreBtn.classList.remove(`visually-hidden`);
  deleteShowingCards();
  for (let i = 0; i < CARDS_COUNT; i++) {
    render(filmsListContainer, createFilmCardTemplate(actuallyCardsArr[i]), `beforeend`);
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
    render(filmsListContainer, createFilmCardTemplate(actuallyCardsArr[i]), `beforeend`);
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
defaultSort.addEventListener(`click`, setdefaultSort);
ratingSort.addEventListener(`click`, setRatingSort);
