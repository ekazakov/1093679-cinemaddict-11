/* import AbstractSmartComponent from "./abstract-smart-component.js";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {VALUE_HOUR, STATISTICS_MENU} from "../utils/const.js";


const renderChart = (statisticElement, filmCards) => {

  // const myChart =
  const BAR_HEIGHT = 50;
  let statisticCtx = statisticElement;
  statisticCtx.height = BAR_HEIGHT * 5;
  // statisticCtx.height = BAR_HEIGHT * 5;
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
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
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

const getWatchedMovies = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isAlreadyWatched);
};

const rangMap = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie buff`,
};

const getRangUser = (filmCards) => {
  let a = getWatchedMovies(filmCards).length;
  if (a <= 10) {
    return rangMap.NOVICE;
  }
  if (a >= 10 && a <= 20) {
    return rangMap.FAN;
  }
  if (a >= 21) {
    return rangMap.MOVIE_BUFF;
  }
  return undefined;
};

const getWatchedMoviesLength = (filmCards, option) => {
  let a = getWatchedMovies(filmCards);
  let value = 0;
  a.forEach((filmCard) => {
    value += filmCard.movieLength;
  });

  let hours = 0;
  let minutes = 0;
  for (let i = 0; i < value; i++) {
    if (value >= VALUE_HOUR) {
      hours++;
      value -= VALUE_HOUR;
    } else {
      minutes = value;
      break;
    }
  }
  if (option === `hours`) {
    return `${hours}`;
  }
  if (option === `minutes`) {
    return `${minutes}`;
  }
  return undefined;
};

const getGenreOnWatchedMovies = (filmCards, options) => {
  let a = getWatchedMovies(filmCards);
  let b = [];
  a.forEach((filmCard) => {
    filmCard.genre.forEach((genre) => {
      if (genre === options) {
        b.push(genre);
      }
    });
  });
  return b;
};

const genreMap = {
  SCI_FI: `Sci-Fi`,
  ANIMATION: `Animation`,
  FANTASY: `Fantasy`,
  COMEDY: `Comedy`,
  TV_SERIES: `TV Series`
};

const getGenreData = (filmCards) => {
  const genreData = {
    SCI_FI: getGenreOnWatchedMovies(filmCards, genreMap.SCI_FI).length,
    ANIMATION: getGenreOnWatchedMovies(filmCards, genreMap.ANIMATION).length,
    FANTASY: getGenreOnWatchedMovies(filmCards, genreMap.FANTASY).length,
    COMEDY: getGenreOnWatchedMovies(filmCards, genreMap.COMEDY).length,
    TV_SERIES: getGenreOnWatchedMovies(filmCards, genreMap.TV_SERIES).length
  };
  return genreData;
};

const getTopGenre = (filmCards) => {
  const a = getGenreData(filmCards);
  let b = 0;
  let c = ``;
  for (let key in a) {
    if (b <= a[key]) {
      b = a[key];
      c = key;
    }
  }
  return genreMap[c];
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

export const createStatisticsTemplate = (filmCards) => {

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
            <p class="statistic__item-text">${getWatchedMovies(filmCards).length} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${getWatchedMoviesLength(filmCards, `hours`)} <span class="statistic__item-description">h</span> ${getWatchedMoviesLength(filmCards, `minutes`)} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${filmCards.length ? getTopGenre(filmCards) : ``}</p>
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

    this.setPeriodStatistic();

    this._chart = null;

    // this._renderCharts();

    this._nowDate = new Date();
    this._yesterday = new Date();
    this._yesterday.setDate(this._nowDate.getDate() - 1);
    this._sevenDaysDate = new Date();
    this._sevenDaysDate.setDate(this._nowDate.getDate() - 7);
    this._thirtyDaysDate = new Date();
    this._thirtyDaysDate.setDate(this._nowDate.getDate() - 30);
    this._yearDate = new Date();
    this._yearDate.setDate(this._nowDate.getDate() - 365);


  }

  getTemplate() {
    return createStatisticsTemplate(this._actuallyCards);
  }

  /* hide() {
    super.hide(this.getElement());
  }*/

/* show() {
    super.show(this.getElement());
    this.rerender();
  }*/

/*  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setPeriodStatistic();
    this._renderCharts();
  }

  _renderCharts() {
    const statisticElement = this.getElement().querySelector(`.statistic__chart`);
    this._chart = renderChart(statisticElement, this._filmCards);
  }

  _resetCharts() {
    this._chart.destroy();
    this._chart = null;
  }

  setPeriodStatistic() {

    this.getElement().querySelector(`.statistic__filters`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.closest(`INPUT`)) {
        const statisticElement = this.getElement().querySelector(`.statistic__chart`);

        if (evt.target.id === STATISTICS_MENU.ALL_TIME) {
          let b = getOnPeriodCards(this._filmCards, 0, this._nowDate);
          this._actuallyCards = b;
          this._resetCharts();
          this.rerender();
          this._chart = renderChart(statisticElement, this._actuallyCards); console.log(this._actuallyCards);
        }
        if (evt.target.id === STATISTICS_MENU.TODAY) {
          let b = getOnPeriodCards(this._filmCards, this._yesterday, this._nowDate);
          this._actuallyCards = b;
          this._resetCharts();
          this._chart = renderChart(statisticElement, b);
          this.rerender();
        }
        if (evt.target.id === STATISTICS_MENU.WEEK) {
          let b = getOnPeriodCards(this._filmCards, this._sevenDaysDate, this._nowDate);
          this._actuallyCards = b;
          this._resetCharts();
          this._chart = renderChart(statisticElement, b);
          this.rerender();
        }
        if (evt.target.id === STATISTICS_MENU.MONTH) {
          let b = getOnPeriodCards(this._filmCards, this._thirtyDaysDate, this._nowDate);
          this._actuallyCards = b;
          this._resetCharts();
          this._chart = renderChart(statisticElement, b);
          this.rerender();
        }
        if (evt.target.id === STATISTICS_MENU.YEAR) {
          let b = getOnPeriodCards(this._filmCards, this._yearDate, this._nowDate);
          this._actuallyCards = b;
          this._resetCharts();
          this.rerender();
          this._chart = renderChart(statisticElement, this._actuallyCards); console.log(b);
        }
      }
    });
  }

}*/
