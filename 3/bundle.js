/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/film-card-template.js":
/*!**********************************************!*\
  !*** ./src/components/film-card-template.js ***!
  \**********************************************/
/*! exports provided: createFilmCardTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmCardTemplate", function() { return createFilmCardTemplate; });
const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">Sagebrush Trail</h3>
      <p class="film-card__rating">3.2</p>
      <p class="film-card__info">
        <span class="film-card__year">1933</span>
        <span class="film-card__duration">54m</span>
        <span class="film-card__genre">Western</span>
      </p>
      <img src="./images/posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>
      <a class="film-card__comments">89 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};


/***/ }),

/***/ "./src/components/film-details.js":
/*!****************************************!*\
  !*** ./src/components/film-details.js ***!
  \****************************************/
/*! exports provided: createFilmDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmDetails", function() { return createFilmDetails; });
const createFilmDetails = () => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">

              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">The Great Flamarion</h3>
                  <p class="film-details__title-original">Original: The Great Flamarion</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">8.9</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">Anthony Mann</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">30 March 1945</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">1h 18m</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">USA</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">Drama</span>
                    <span class="film-details__genre">Film-Noir</span>
                    <span class="film-details__genre">Mystery</span></td>
                </tr>
              </table>

              <p class="film-details__film-description">
                The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">0</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};


/***/ }),

/***/ "./src/components/films-container-template.js":
/*!****************************************************!*\
  !*** ./src/components/films-container-template.js ***!
  \****************************************************/
/*! exports provided: createFilmsContainerTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmsContainerTemplate", function() { return createFilmsContainerTemplate; });
const createFilmsContainerTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
      <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
      </section>
      <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
      </section>
     </section>`
  );
};


/***/ }),

/***/ "./src/components/filters-template.js":
/*!********************************************!*\
  !*** ./src/components/filters-template.js ***!
  \********************************************/
/*! exports provided: createFiltersTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiltersTemplate", function() { return createFiltersTemplate; });
const createFiltersTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


/***/ }),

/***/ "./src/components/main-nav-menu-template.js":
/*!**************************************************!*\
  !*** ./src/components/main-nav-menu-template.js ***!
  \**************************************************/
/*! exports provided: createMainNavMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMainNavMenuTemplate", function() { return createMainNavMenuTemplate; });
const createMainNavMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


/***/ }),

/***/ "./src/components/show-more-btn-template.js":
/*!**************************************************!*\
  !*** ./src/components/show-more-btn-template.js ***!
  \**************************************************/
/*! exports provided: createShowMoreBtnTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShowMoreBtnTemplate", function() { return createShowMoreBtnTemplate; });
const createShowMoreBtnTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


/***/ }),

/***/ "./src/components/statistics-template.js":
/*!***********************************************!*\
  !*** ./src/components/statistics-template.js ***!
  \***********************************************/
/*! exports provided: createStatisticsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStatisticsTemplate", function() { return createStatisticsTemplate; });
const createStatisticsTemplate = () => {
  return (
    `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
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
        <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
      </li>
    </ul>`
  );
};


/***/ }),

/***/ "./src/components/user-rank-template.js":
/*!**********************************************!*\
  !*** ./src/components/user-rank-template.js ***!
  \**********************************************/
/*! exports provided: createUserRankTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUserRankTemplate", function() { return createUserRankTemplate; });
const createUserRankTemplate = () => {
  return (
    `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>`
  );
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_user_rank_template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/user-rank-template.js */ "./src/components/user-rank-template.js");
/* harmony import */ var _components_main_nav_menu_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main-nav-menu-template.js */ "./src/components/main-nav-menu-template.js");
/* harmony import */ var _components_filters_template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/filters-template.js */ "./src/components/filters-template.js");
/* harmony import */ var _components_statistics_template_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/statistics-template.js */ "./src/components/statistics-template.js");
/* harmony import */ var _components_films_container_template_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/films-container-template.js */ "./src/components/films-container-template.js");
/* harmony import */ var _components_film_card_template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/film-card-template.js */ "./src/components/film-card-template.js");
/* harmony import */ var _components_show_more_btn_template_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/show-more-btn-template.js */ "./src/components/show-more-btn-template.js");
/* harmony import */ var _components_film_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/film-details.js */ "./src/components/film-details.js");
const CARDS_COUNT = 5;
const CARDS_COUNT_FOR_OTHER = 2;











const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, Object(_components_user_rank_template_js__WEBPACK_IMPORTED_MODULE_0__["createUserRankTemplate"])(), `beforeend`);
render(mainElement, Object(_components_main_nav_menu_template_js__WEBPACK_IMPORTED_MODULE_1__["createMainNavMenuTemplate"])(), `beforeend`);
render(mainElement, Object(_components_filters_template_js__WEBPACK_IMPORTED_MODULE_2__["createFiltersTemplate"])(), `beforeend`);
render(mainElement, Object(_components_statistics_template_js__WEBPACK_IMPORTED_MODULE_3__["createStatisticsTemplate"])(), `beforeend`);

render(mainElement, Object(_components_films_container_template_js__WEBPACK_IMPORTED_MODULE_4__["createFilmsContainerTemplate"])(), `beforeend`);

const filmsListContainer = document.querySelector(`.films-list__container`);
for (let i = 0; i < CARDS_COUNT; i++) {
  render(filmsListContainer, Object(_components_film_card_template_js__WEBPACK_IMPORTED_MODULE_5__["createFilmCardTemplate"])(), `beforeend`);
}

const filmsContainer = document.querySelector(`.films-list`);
render(filmsContainer, Object(_components_show_more_btn_template_js__WEBPACK_IMPORTED_MODULE_6__["createShowMoreBtnTemplate"])(), `beforeend`);

const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
  render(topRatedContainer, Object(_components_film_card_template_js__WEBPACK_IMPORTED_MODULE_5__["createFilmCardTemplate"])(), `beforeend`);
}

const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
for (let i = 0; i < CARDS_COUNT_FOR_OTHER; i++) {
  render(topCommentContainer, Object(_components_film_card_template_js__WEBPACK_IMPORTED_MODULE_5__["createFilmCardTemplate"])(), `beforeend`);
}

render(mainElement, Object(_components_film_details_js__WEBPACK_IMPORTED_MODULE_7__["createFilmDetails"])(), `beforeend`);
const filmsDetails = document.querySelector(`.film-details`);
filmsDetails.classList.add(`visually-hidden`);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map