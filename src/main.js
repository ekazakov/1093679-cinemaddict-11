import {FILMS_CARDS_ARR} from "./components/generate-data-film-card.js";

import UserRankHeaderProfileComponent from "./components/user-rank-header-profile.js";
import MainNavMenuComponent from "./components/main-nav-menu-template.js";
import FooterStatisticsComponent from "./components/footer-statistics-template.js";
import PageController from "./controllers/page-controller.js";

import {render/* , remove, replace*/} from "./utils/render.js";
import {RenderPosition} from "./utils/const.js";

const NO_FILMS = `<h2 class="films-list__title">There are no movies in our database</h2>`;

// import SortComponent from "./components/sort-template.js";
// import FilmCardComponent from "./components/film-card-template.js";
// import ShowMoreBtnComponent from "./components/show-more-btn-template.js";
// import FilmDetailsComponent from "./components/film-details.js";
// import CommentComponent from "./components/comment-template.js";


// ----------statistics-module--------------
// import BigUserRank from "./components/user-rank-template.js";
// import Statistics from "./components/statistics-template.js";
// -----------------------------------------

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, new UserRankHeaderProfileComponent(), RenderPosition.BEFOREEND); // static
render(mainElement, new MainNavMenuComponent(), RenderPosition.BEFOREEND); // static

const pageControllerComponent = new PageController(FILMS_CARDS_ARR, mainElement);

if (FILMS_CARDS_ARR.length) { console.log(FILMS_CARDS_ARR);
  pageControllerComponent.render();
} else {
  mainElement.insertAdjacentHTML(RenderPosition.BEFOREEND, NO_FILMS);
}

// ---------------------footer-count-movies--------------------
const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsComponent(FILMS_CARDS_ARR), RenderPosition.BEFOREEND);


// ------------------------------render-film-card-------------------------
/* let renderFilmCard = (filmCard) => {
  const filmsListContainer = filmsContainer.getElement().querySelector(`.films-list__container`);
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
    render(mainElement, filmDetailsComponent, RenderPosition.BEFOREEND);

    const commentsList = document.querySelector(`.film-details__comments-list`);
    filmCard.comments.forEach((comment) => {
      render(commentsList, new CommentComponent(comment), RenderPosition.BEFOREEND);
    });

    filmDetailsComponent.setCloseFilmDetailsBtnHandler(() => {
      remove(filmDetailsComponent);
    });
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsListContainer, filmCardComponent, RenderPosition.BEFOREEND);
};
// ---------------------------------------------------------------------
FILMS_CARDS_ARR.slice(0, CARDS_COUNT)
.forEach((filmCard) => {
  renderFilmCard(filmCard);
});
// ---------------show-more-btn ---------------------------------------
const filmsList = filmsContainer.getElement().querySelector(`.films-list`);
const showMoreBtn = new ShowMoreBtnComponent();
render(filmsList, showMoreBtn, RenderPosition.BEFOREEND);

let countShowingFilmCards = CARDS_COUNT;
showMoreBtn.setShowMoreBtnClickHandler(() => {

  let prevFilmCards = countShowingFilmCards;
  countShowingFilmCards = countShowingFilmCards + CARDS_COUNT;

  FILMS_CARDS_ARR.slice(prevFilmCards, countShowingFilmCards)
  .forEach((filmCard) => {
    renderFilmCard(filmCard);

    if (countShowingFilmCards >= FILMS_CARDS_ARR.length) {
      remove(showMoreBtn);
    }
  });
});
// --------------------------SORT----------------------------------------
const filmsListContainer = filmsContainer.getElement().querySelector(`.films-list__container`);
sortComponent.setSortTypeChangeHandler(() => {
  filmsListContainer.innerHTML = ``;
});
// ----------------------------------------------------------------------
// -----------------//new CODE -----------------------------------------
/* if (FILMS_CARDS_ARR.length) {
  const filmsContainer = new FilmsContainerComponent();
  render(mainElement, filmsContainer, RenderPosition.BEFOREEND); // static

  const updateCards = (value, index) => {
    value.index = index;
  };
  FILMS_CARDS_ARR.forEach(updateCards);

  const filmsListContainer = filmsContainer.getElement().querySelector(`.films-list__container`);
  for (let i = 0; i < CARDS_COUNT; i++) {
    render(filmsListContainer, new FilmCardComponent(FILMS_CARDS_ARR[i]), RenderPosition.BEFOREEND);
  }

  const filmsList = filmsContainer.getElement().querySelector(`.films-list`);
  const showMoreBtn = new ShowMoreBtnComponent();
  render(filmsList, showMoreBtn, RenderPosition.BEFOREEND);

  // -------------------------Other - Containers -------------------------------
  let cards = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
  let companareForRatedContainer = (a, b) => {
    return b.rating - a.rating;
  };
  let companareForCommentsContainer = (a, b) => {
    return b.comments.length - a.comments.length;
  };
  cards.sort(companareForRatedContainer);
  const topRatedContainer = filmsContainer.getElement().querySelector(`.films-list--extra .films-list__container`);
  for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
    render(topRatedContainer, new FilmCardComponent(cards[i]), RenderPosition.BEFOREEND);
  }

  cards.sort(companareForCommentsContainer);
  const topCommentContainer = filmsContainer.getElement().querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
  for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
    render(topCommentContainer, new FilmCardComponent(cards[i]), RenderPosition.BEFOREEND);
  }

  // --------------------film - details---------------------------
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      const filmDetails = mainElement.querySelector(`.film-details`);
      mainElement.removeChild(filmDetails);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const a = new FilmCardComponent(FILMS_CARDS_ARR);
  console.log(a);
  /* mainElement.addEventListener(`click`, function (evt) {
    if (evt.target.closest(`IMG`) || evt.target.closest(`.film-card__comments`) || evt.target.closest(`H3`)) {
      let uniqueIndex = evt.target.closest(`ARTICLE`).dataset.index;
      render(mainElement, new FilmDetailsComponent(FILMS_CARDS_ARR[uniqueIndex]), RenderPosition.BEFOREEND);
      const commentsList = document.querySelector(`.film-details__comments-list`);
      for (let i = 0; i < FILMS_CARDS_ARR[uniqueIndex].comments.length; i++) {
        render(commentsList, new CommentComponent(FILMS_CARDS_ARR[uniqueIndex].comments[i]), RenderPosition.BEFOREEND);
      }

      document.addEventListener(`keydown`, onEscKeyDown);
      const filmDetails = mainElement.querySelector(`.film-details`);
      const filmsDetailsCloseBtn = mainElement.querySelector(`.film-details__close-btn`);
      filmsDetailsCloseBtn.addEventListener(`click`, () => {
        mainElement.removeChild(filmDetails);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    }
  });*/


// -------------------------showMoreBtn-----------------------------------------
/* let actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
  showMoreBtn.setShowMoreBtnClickHandler(() => {
    actuallyCardsArr.splice(0, CARDS_COUNT);
    for (let i = 0; i < CARDS_COUNT; i++) {
      render(filmsListContainer, new FilmCardComponent(actuallyCardsArr[i]), RenderPosition.BEFOREEND);
      if (actuallyCardsArr.length === CARDS_COUNT) {
        remove(showMoreBtn);
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
    render(filmsList, showMoreBtn, RenderPosition.BEFOREEND);
    actuallyCardsArr.sort(companare);
    deleteShowingCards();
    for (let i = 0; i < CARDS_COUNT; i++) {
      render(filmsListContainer, new FilmCardComponent(actuallyCardsArr[i]), RenderPosition.BEFOREEND);
    }
  };

  const setDefaultSort = () => {
    actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
    render(filmsList, showMoreBtn, RenderPosition.BEFOREEND);
    deleteShowingCards();
    for (let i = 0; i < CARDS_COUNT; i++) {
      render(filmsListContainer, new FilmCardComponent(actuallyCardsArr[i]), RenderPosition.BEFOREEND);
    }
  };

  const setRatingSort = () => {
    actuallyCardsArr = FILMS_CARDS_ARR.slice(0, FILMS_CARDS_ARR.length);
    const companare = (a, b) => {
      return b.rating - a.rating;
    };
    render(filmsList, showMoreBtn, RenderPosition.BEFOREEND);
    actuallyCardsArr.sort(companare);
    deleteShowingCards();
    for (let i = 0; i < CARDS_COUNT; i++) {
      render(filmsListContainer, new FilmCardComponent(actuallyCardsArr[i]), RenderPosition.BEFOREEND);
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
render(footerStatistics, new FooterStatisticsComponent(FILMS_CARDS_ARR), RenderPosition.BEFOREEND);*/
