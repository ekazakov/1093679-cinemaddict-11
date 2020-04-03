const CARDS_COUNT = 5;
const CARDS_COUNT_FOR_OTHER = 2;

import {createUserRankTemplate} from "./components/user-rank-template.js";
import {createMainNavMenuTemplate} from "./components/main-nav-menu-template.js";
import {createFiltersTemplate} from "./components/filters-template.js";
import {createStatisticsTemplate} from "./components/statistics-template.js";
import {createFilmsContainerTemplate} from "./components/films-container-template.js";
import {createFilmCardTemplate} from "./components/film-card-template.js";
import {createShowMoreBtnTemplate} from "./components/show-more-btn-template.js";
import {createFilmDetails} from "./components/film-details.js";


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
  render(filmsListContainer, createFilmCardTemplate(), `beforeend`);
}

const filmsContainer = document.querySelector(`.films-list`);
render(filmsContainer, createShowMoreBtnTemplate(), `beforeend`);

const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
  render(topRatedContainer, createFilmCardTemplate(), `beforeend`);
}

const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
  render(topCommentContainer, createFilmCardTemplate(), `beforeend`);
}

render(mainElement, createFilmDetails(), `beforeend`);
const filmsDetails = document.querySelector(`.film-details`);
filmsDetails.classList.add(`visually-hidden`);
