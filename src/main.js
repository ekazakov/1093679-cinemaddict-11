import {FILMS_CARDS_ARR} from "./components/generate-data-film-card.js";

import UserRankHeaderProfileComponent from "./components/user-rank-header-profile.js";
// import FiltersComponent from "./components/filters.js";
import FilterController from "./controllers/filter-controller.js";
import FooterStatisticsComponent from "./components/footer-statistics-template.js";
import PageController from "./controllers/page-controller.js";


import {render} from "./utils/render.js";
import {RenderPosition} from "./utils/const.js";

import FilmCardsModel from "./models/film-cards.js";

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

const filmCardsModel = new FilmCardsModel();
filmCardsModel.setFilmCards(FILMS_CARDS_ARR);

render(headerElement, new UserRankHeaderProfileComponent(), RenderPosition.BEFOREEND);

const filterController = new FilterController(mainElement, filmCardsModel);
filterController.render();

const pageControllerComponent = new PageController(filmCardsModel, mainElement);
console.log(FILMS_CARDS_ARR);
if (FILMS_CARDS_ARR.length) {
  pageControllerComponent.render();
} else {
  mainElement.insertAdjacentHTML(RenderPosition.BEFOREEND, NO_FILMS);
}

// ---------------------footer-count-movies--------------------
const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsComponent(FILMS_CARDS_ARR), RenderPosition.BEFOREEND);
