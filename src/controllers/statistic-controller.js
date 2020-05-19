/* import StatisticsComponent from "../components/statistic2.js";
import {render, replace} from "../utils/render.js";
import {RenderPosition} from "../utils/const.js";
import {HIDDEN_CLASS} from "../utils/const.js";
import {STATISTICS_MENU} from "../utils/const.js";

const getWatchedMovies = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isAlreadyWatched);
};

const getOnPeriodCards = (filmCards, from, to) => {
  let a = getWatchedMovies(filmCards);
  let b = [];
  a.forEach((filmCard) => {
    if (filmCard.watchingDate <= to && filmCard.watchingDate >= from) {
      b.push(filmCard);
    }
  });
  return b;
};

export default class StatisticController {
  constructor(filmCardsModel, mainElement) {
    this._mainElement = mainElement;
    this._filmCards = filmCardsModel.getFilmCardsAll();

    this._statisticComponent = null;
  }


  render() {
    this._statisticComponent = new StatisticsComponent(this._filmCards);
    render(this._mainElement, this._statisticComponent, RenderPosition.BEFOREEND);
    console.log(this._mainElement.querySelector(`.statistic__filters`));


    this._statisticComponent.setPeriodStatistic(() => {

    });
  }


  hide() {
    this._mainElement.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._mainElement.classList.remove(HIDDEN_CLASS);
    this._statisticComponent.rerender();
  }

}*/
