import AbstractSmartComponent from "./abstract-smart-component.js";
import {StatisticsMenu, BAR_HEIGHT, QUANTITY_BAR_HEIGHT, PERIOD_MAP, CHART_OPTIONS} from "../utils/const.js";
import {getWatchedMovies, getRangUser, getWatchedMoviesLength, getGenreData, getTopGenre, getPeriodCards} from "../utils/statistics.js";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderChart = (statisticElement, filmCards) => {

  const statisticCtx = statisticElement;
  statisticCtx.height = BAR_HEIGHT * QUANTITY_BAR_HEIGHT;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
      datasets: [{
        data: [getGenreData(filmCards).SCI_FI, getGenreData(filmCards).ANIMATION, getGenreData(filmCards).FANTASY, getGenreData(filmCards).COMEDY, getGenreData(filmCards).TV_SERIES],
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: CHART_OPTIONS.SIZE
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: CHART_OPTIONS.OFFSET,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: CHART_OPTIONS.PADDING,
            fontSize: CHART_OPTIONS.FONTSIZE
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: CHART_OPTIONS.BARTHICKNESS
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export const createStatisticsTemplate = (actuallyFilmCards, filmCards) => {
  return (
    `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${getRangUser(filmCards)}</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${getWatchedMovies(actuallyFilmCards).length} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${getWatchedMoviesLength(actuallyFilmCards, `hours`)} <span class="statistic__item-description">h</span> ${getWatchedMoviesLength(actuallyFilmCards, `minutes`)} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${actuallyFilmCards.length ? getTopGenre(actuallyFilmCards) : ``}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(filmCards) {
    super();
    this._filmCards = filmCards;
    this._actuallyCards = this._filmCards.slice(0, this._filmCards.length);

    this._setPeriodStatistic();

    this._chart = null;

    this._renderCharts();

    this._nowDate = new Date();
    this._yesterday = new Date();
    this._yesterday.setDate(this._nowDate.getDate() - PERIOD_MAP.TODAY);
    this._sevenDaysDate = new Date();
    this._sevenDaysDate.setDate(this._nowDate.getDate() - PERIOD_MAP.WEEK);
    this._thirtyDaysDate = new Date();
    this._thirtyDaysDate.setDate(this._nowDate.getDate() - PERIOD_MAP.MONTH);
    this._yearDate = new Date();
    this._yearDate.setDate(this._nowDate.getDate() - PERIOD_MAP.YEAR);
  }

  getTemplate() {
    return createStatisticsTemplate(this._actuallyCards, this._filmCards);
  }

  rerender(filmCards = this._filmCards) {
    this._actuallyCards = filmCards;
    super.rerender();
  }

  hide() {
    super.hide(this.getElement());
  }

  show() {
    super.show(this.getElement());
    this.rerender();
  }

  recoveryListeners() {
    this._setPeriodStatistic();
    this._renderCharts();
  }

  _renderCharts() {
    const statisticElement = this.getElement().querySelector(`.statistic__chart`);
    if (this._actuallyCards.length) {
      this._chart = renderChart(statisticElement, this._actuallyCards);
    }
  }

  _resetCharts() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }

  _setPeriodStatistic() {
    const actuallyStatistic = {
      [StatisticsMenu.ALL_TIME]: 0,
      [StatisticsMenu.TODAY]: this._yesterday,
      [StatisticsMenu.WEEK]: this._sevenDaysDate,
      [StatisticsMenu.MONTH]: this._thirtyDaysDate,
      [StatisticsMenu.YEAR]: this._yearDate
    };

    this.getElement().querySelector(`.statistic__filters`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.closest(`INPUT`)) {
        const statisticElement = this.getElement().querySelector(`.statistic__chart`);

        this._actuallyCards = getPeriodCards(this._filmCards, actuallyStatistic[evt.target.id], this._nowDate);

        if (!this._actuallyCards.length) {
          this.rerender([]);
          this._resetCharts();
          document.querySelector(`#${evt.target.id}`).checked = true;
        } else {
          this._resetCharts();
          this.rerender(this._actuallyCards);
          document.querySelector(`#${evt.target.id}`).checked = true;
          this._chart = renderChart(statisticElement, this._actuallyCards);
        }
      }
    });
  }
}
