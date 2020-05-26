import StatisticsComponent from "../components/statistics-template.js";
import {render} from "../utils/render.js";
import {RenderPosition} from "../utils/const.js";
import {HIDDEN_CLASS} from "../utils/const.js";


export default class StatisticController {
  constructor(filmCardsModel, mainElement) {
    this._mainElement = mainElement;
    this._filmCardsModel = filmCardsModel;
    this._statisticComponent = null;
  }

  render() {
    this._statisticComponent = new StatisticsComponent(this._filmCardsModel.getFilmCardsAll());
    render(this._mainElement, this._statisticComponent, RenderPosition.BEFOREEND);
  }

  hide() {
    this._statisticComponent.getElement().classList.add(HIDDEN_CLASS);
  }

  show() {
    this._statisticComponent.rerender();
    this._statisticComponent.getElement().classList.remove(HIDDEN_CLASS);
  }
}
