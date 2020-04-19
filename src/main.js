// const SHOWING_CARDS_COUNT_ON_START = 5;
const CARDS_COUNT = 5;
const CARDS_COUNT_FOR_OTHER = 2;

import {FILMS_CARDS_ARR} from "./components/generate-data-film-card.js";

/* import {createUserRankHeaderProfileTemplate} from "./components/user-rank-header-profile.js";
import {createMainNavMenuTemplate} from "./components/main-nav-menu-template.js";
import {createFiltersTemplate} from "./components/filters-template.js";
import {createFilmsContainerTemplate} from "./components/films-container-template.js";
import {createFilmCardTemplate} from "./components/film-card-template.js";
import {createShowMoreBtnTemplate} from "./components/show-more-btn-template.js";
import {createFilmDetails} from "./components/film-details.js";
import {createComentTemplate} from "./components/comment-template.js";
import {createFooterStatisticsTemplate} from "./components/footer-statistics-template.js";*/
// ----------statistics-module--------------
// import {createBigUserRankTemplate} from "./components/user-rank-template.js";
// import {createStatisticsTemplate} from "./components/statistics-template.js";
// -----------------------------------------
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

/* const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};*/

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const updateCards = (value, index) => {
  value.index = index;
};
FILMS_CARDS_ARR.forEach(updateCards);

render(headerElement, new UserRankHeaderProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MainNavMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);


const filmsListContainer = document.querySelector(`.films-list__container`);
for (let i = 0; i < CARDS_COUNT; i++) {
  render(filmsListContainer, new FilmCardComponent(FILMS_CARDS_ARR[i]).getElement(), RenderPosition.BEFOREEND);
}

const filmsContainer = document.querySelector(`.films-list`);
render(filmsContainer, new ShowMoreBtnComponent().getElement(), RenderPosition.BEFOREEND);


const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
  render(topRatedContainer, new FilmCardComponent(FILMS_CARDS_ARR[i]).getElement(), RenderPosition.BEFOREEND);
}

const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
  render(topCommentContainer, new FilmCardComponent(FILMS_CARDS_ARR[i]).getElement(), RenderPosition.BEFOREEND);
}

// ---------------------footer-count-movies--------------------
const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsComponent(FILMS_CARDS_ARR).getElement(), RenderPosition.BEFOREEND);

// --------------------film - details---------------------------
const onEscKeyDown = (evt) => {
  const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

  if (isEscKey) {
    const filmDetails = document.querySelector(`.film-details`);
    mainElement.removeChild(filmDetails);
    document.removeEventListener(`keydown`, onEscKeyDown);
  }
};


filmsListContainer.addEventListener(`click`, function (evt) {
  if (evt.target.closest(`IMG`) || evt.target.closest(`A`) || evt.target.closest(`H3`)) {
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
    });
  }
});

// -------------------------showMoreBtn-----------------------------------------
let actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
const showMoreBtn = document.querySelector(`.films-list__show-more`);
showMoreBtn.addEventListener(`click`, () => {
  actuallyCardsArr.splice(0, 5);
  for (let i = 0; i < CARDS_COUNT; i++) {
    render(filmsListContainer, new FilmCardComponent(FILMS_CARDS_ARR[i]).getElement(), RenderPosition.BEFOREEND);
    if (actuallyCardsArr.length === 5) {
      showMoreBtn.classList.add(`visually-hidden`);
    }
  }
});


// render(commentsList, new CommentComponent(FILMS_CARDS_ARR[0].comments[0]).getElement(), RenderPosition.BEFOREEND);
/* const arender = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const acreateComentTemplate = (commentData) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${commentData.emoji}.png" width="55" height="55" alt="emoji-${commentData.emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentData.commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentData.commentAutor}</span>
          <span class="film-details__comment-day"></span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};
arender(commentsList, acreateComentTemplate(FILMS_CARDS_ARR[1].comments[0]), `beforeend`);
console.log(FILMS_CARDS_ARR);*/


/* render(headerElement, createUserRankHeaderProfileTemplate(), `beforeend`);
render(mainElement, createMainNavMenuTemplate(), `beforeend`);
render(mainElement, createFiltersTemplate(), `beforeend`);
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
const filmsDetails = document.querySelector(`.film-details`);
filmsDetails.classList.add(`visually-hidden`);

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
ratingSort.addEventListener(`click`, setRatingSort);*/
