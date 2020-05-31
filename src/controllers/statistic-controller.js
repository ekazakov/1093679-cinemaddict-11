import StatisticsComponent from "../components/statistics-template.js";
import {render, replace} from "../utils/render.js";
import {RenderPosition} from "../utils/const.js";
import {HIDDEN_CLASS} from "../utils/const.js";


export default class StatisticController {
  constructor(filmCardsModel, mainElement) {
    this._mainElement = mainElement;
    this._filmCardsModel = filmCardsModel;
    this._statisticComponent = null;

    this.actuallyCards = null;
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filmCardsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const oldComponent = this._statisticComponent;
    if (oldComponent) {
      this._statisticComponent = new StatisticsComponent(this.actuallyCards);
      replace(this._statisticComponent, oldComponent);
    } else {
      this._statisticComponent = new StatisticsComponent(this._filmCardsModel.getFilmCardsAll());
      render(this._mainElement, this._statisticComponent, RenderPosition.BEFOREEND);
    }
  }

  hide() {
    this._statisticComponent.getElement().classList.add(HIDDEN_CLASS);
  }

  show() {
    this._statisticComponent.rerender();
    this._statisticComponent.getElement().classList.remove(HIDDEN_CLASS);
  }

  _dataChangeHandler() {
    this.actuallyCards = this._filmCardsModel.getFilmCardsAll();
    this.render();
    this.hide();
  }
}
