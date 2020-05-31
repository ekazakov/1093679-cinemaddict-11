import UserRankHeaderProfileComponent from "./components/user-rank-header-profile.js";
import FilterController from "./controllers/filter-controller.js";
import FooterStatisticsComponent from "./components/footer-statistics-template.js";
import PageController from "./controllers/page-controller.js";
import {render} from "./utils/render.js";
import {RenderPosition, MenuItem, AUTHORIZATION, NO_FILMS, LOADING, LOADING_ERROR} from "./utils/const.js";
import FilmCardsModel from "./models/film-cards.js";
import StatisticController from "./controllers/statistic-controller.js";
import Api from "./api.js";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const api = new Api(AUTHORIZATION);
const filmCardsModel = new FilmCardsModel();

const filterController = new FilterController(mainElement, filmCardsModel);
filterController.render();

const pageController = new PageController(filmCardsModel, mainElement, api);
const statisticController = new StatisticController(filmCardsModel, mainElement);

mainElement.insertAdjacentHTML(RenderPosition.BEFOREEND, LOADING);
const loading = mainElement.querySelector(`.films-list__title`);

api.getFilmCards()
.then((filmCards) => {
  const fullFilmCards = [];
  filmCards.forEach((filmCard, index) => {
    const fullFilmCard = api.getFullFilmCard(filmCard, index);
    fullFilmCards.push(fullFilmCard);
  });

  return Promise.all(fullFilmCards)
  .then(() => {
    loading.remove();
    filmCardsModel.setFilmCards(filmCards);

    if (filmCards.length) {
      const userRankProfile = new UserRankHeaderProfileComponent(filmCardsModel);
      render(headerElement, userRankProfile, RenderPosition.BEFOREEND);

      pageController.render();
      statisticController.render();
      statisticController.hide();

      const footerStatistics = document.querySelector(`.footer__statistics`);
      render(footerStatistics, new FooterStatisticsComponent(filmCardsModel.getFilmCardsAll()), RenderPosition.BEFOREEND);

    } else {
      mainElement.insertAdjacentHTML(RenderPosition.BEFOREEND, NO_FILMS);
    }
  });
})
.catch(() => {
  loading.remove();
  mainElement.insertAdjacentHTML(RenderPosition.BEFOREEND, LOADING_ERROR);
});

filterController.setChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.ALL:
      statisticController.hide();
      pageController.show();
      break;
    case MenuItem.WATCHLIST:
      statisticController.hide();
      pageController.show();
      break;
    case MenuItem.HISTORY:
      statisticController.hide();
      pageController.show();
      break;
    case MenuItem.FAVORITES:
      statisticController.hide();
      pageController.show();
      break;
    case MenuItem.STATISTICS:
      statisticController.show();
      pageController.hide();
  }
});
