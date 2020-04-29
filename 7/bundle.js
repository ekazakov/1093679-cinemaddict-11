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

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");


class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/comment-template.js":
/*!********************************************!*\
  !*** ./src/components/comment-template.js ***!
  \********************************************/
/*! exports provided: createComentTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createComentTemplate", function() { return createComentTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Comment; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



const createComentTemplate = (commentData) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${commentData.emoji}.png" width="55" height="55" alt="emoji-${commentData.emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentData.commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentData.commentAutor}</span>
          <span class="film-details__comment-day">${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatCommentDate"])(commentData.commentDate)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

class Comment extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(commentData) {
    super();
    this._commentData = commentData;
  }

  getTemplate() {
    return createComentTemplate(this._commentData);
  }
}


/***/ }),

/***/ "./src/components/film-card-template.js":
/*!**********************************************!*\
  !*** ./src/components/film-card-template.js ***!
  \**********************************************/
/*! exports provided: createFilmCardTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmCardTemplate", function() { return createFilmCardTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmCard; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");




const createFilmCardTemplate = (filmCardData) => {
  const {title, rating, productionDate, movieLength, genre, poster, description, commentsNumber} = filmCardData;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatShortDateMovie"])(productionDate)}</span>
        <span class="film-card__duration">${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatTimeLengthMovie"])(movieLength)}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsNumber} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

class FilmCard extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(filmCardData) {
    super();
    this._filmCardData = filmCardData;
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCardData);
  }

  setFilmCardClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/film-details.js":
/*!****************************************!*\
  !*** ./src/components/film-details.js ***!
  \****************************************/
/*! exports provided: createFilmDetails, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmDetails", function() { return createFilmDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmDetails; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");




const createFilmDetails = (filmCardData) => {
  const formatGenre = (genreArr) => {
    let html = ``;
    for (let i = 0; i < genreArr.length; i++) {
      html += `<span class="film-details__genre">${genreArr[i]}</span>`;
    }
    return html;
  };
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${filmCardData.poster} alt="">

              <p class="film-details__age">${filmCardData.ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmCardData.title}</h3>
                  <p class="film-details__title-original">Original: ${filmCardData.originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${filmCardData.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${filmCardData.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${filmCardData.screenwriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${filmCardData.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatFullDateMovie"])(filmCardData.productionDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatTimeLengthMovie"])(filmCardData.movieLength)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${filmCardData.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${filmCardData.genre.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">${formatGenre(filmCardData.genre)}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${filmCardData.description}
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
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCardData.commentsNumber}</span></h3>

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

class FilmDetails extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(filmCardData) {
    super();
    this._filmCardData = filmCardData;
  }

  getTemplate() {
    return createFilmDetails(this._filmCardData);
  }

  setCloseFilmDetailsBtnHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/films-container-template.js":
/*!****************************************************!*\
  !*** ./src/components/films-container-template.js ***!
  \****************************************************/
/*! exports provided: createFilmsContainerTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmsContainerTemplate", function() { return createFilmsContainerTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmsContainer; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


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

class FilmsContainer extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

  getTemplate() {
    return createFilmsContainerTemplate();
  }
}


/***/ }),

/***/ "./src/components/footer-statistics-template.js":
/*!******************************************************!*\
  !*** ./src/components/footer-statistics-template.js ***!
  \******************************************************/
/*! exports provided: createFooterStatisticsTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFooterStatisticsTemplate", function() { return createFooterStatisticsTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FooterStatistics; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createFooterStatisticsTemplate = (FILMS_CARDS_ARR) => {
  return (`<p>${FILMS_CARDS_ARR.length} movies inside</p>`);
};

class FooterStatistics extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filmsCardsArr) {
    super();
    this._filmsCardsArr = filmsCardsArr;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCardsArr);
  }
}


/***/ }),

/***/ "./src/components/generate-data-film-card.js":
/*!***************************************************!*\
  !*** ./src/components/generate-data-film-card.js ***!
  \***************************************************/
/*! exports provided: FILMS_CARDS_ARR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILMS_CARDS_ARR", function() { return FILMS_CARDS_ARR; });
const FILMS_CARDS_ARR = [];
const MAX_CARDS_COUNT = 25;
const MIN_VALUE_RAITNG = 1;
const MAX_VALUE_RAITING = 10;
const MAX_COMMENTS_COUNT = 5;
const MAX_MOVIE_LENGTH = 200;
const MAX_GENRE_COUNT = 4;
const MOVIE_TITLES = [`The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`];
const MOVIES_POSTERS = [`made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`];
const MOVIE_DESCRIPTION = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];
const MOVIE_GENRE = [`Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`];
// ---------------------------------------------------
const COUNTRY = [`USA`,
  `Canada`,
  `Germany`,
  `Britain`,
  `Australia`];
const NAMES = [`Anthony Mann`,
  `Anne Wigton`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth`,
  `Dan Duryea`];
const AGE_RATING = [`18+`,
  `16+`,
  `8+`,
  `10+`];
const EMOJI_SRC = [`angry`,
  `puke`,
  `sleeping`,
  `smile`];

const START_TIME = 946684800000; // `01 January 2000 00:00 UTC`
const END_TIME = 1586735940000; // `12 aprel 2020 23:59 UTC`
// ---------------------------------------------------
const getRandomRaitingMovie = (min, max) => {
  let a = Math.random() * (max - min) + min;
  return a.toFixed(min);
};
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const getArrayRandElement = (arr) => {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};


const commentDataTemplate = () => {
  let comments = {
    emoji: getArrayRandElement(EMOJI_SRC),
    commentText: getArrayRandElement(MOVIE_DESCRIPTION),
    commentAutor: getArrayRandElement(NAMES),
    commentDate: new Date(getRandomInteger(START_TIME, END_TIME))
  };
  return comments;
};

const generateRandomCommentsArr = () => {
  let commentsArr = [];
  let temp = getRandomInteger(MIN_VALUE_RAITNG, MAX_COMMENTS_COUNT);
  if (temp) {
    for (let i = 0; i < temp; i++) {
      commentsArr.push(commentDataTemplate());
    }
  }
  return commentsArr;
};

const generateRandomGenreArr = () => {
  let genreArr = [];
  let temp = getRandomInteger(MIN_VALUE_RAITNG, MAX_GENRE_COUNT);
  if (temp) {
    for (let i = 0; i < temp; i++) {
      genreArr.push(getArrayRandElement(MOVIE_GENRE));
    }
  }
  return genreArr;
};


const createDataFilmCard = () => {
  let temp = generateRandomCommentsArr();
  const filmCard = {
    poster: `./images/posters/${getArrayRandElement(MOVIES_POSTERS)}`,
    title: getArrayRandElement(MOVIE_TITLES),
    rating: getRandomRaitingMovie(MIN_VALUE_RAITNG, MAX_VALUE_RAITING),
    movieLength: getRandomInteger(MIN_VALUE_RAITNG, MAX_MOVIE_LENGTH),
    genre: generateRandomGenreArr(),
    description: getArrayRandElement(MOVIE_DESCRIPTION),
    // ---------------full-description------------------
    productionDate: new Date(getRandomInteger(START_TIME, END_TIME)),
    originalTitle: getArrayRandElement(MOVIE_TITLES),
    director: getArrayRandElement(NAMES),
    screenwriters: getArrayRandElement(NAMES),
    actors: getArrayRandElement(NAMES),
    country: getArrayRandElement(COUNTRY),
    ageRating: getArrayRandElement(AGE_RATING),
    comments: temp,
    commentsNumber: temp.length // getRandomInteger(MIN_VALUE_RAITNG, MAX_COMMENTS_COUNT)
    // ---------------------------------
  };
  return filmCard;
};
for (let i = 0; i < MAX_CARDS_COUNT; i++) {
  FILMS_CARDS_ARR.push(createDataFilmCard());
}




/***/ }),

/***/ "./src/components/main-nav-menu-template.js":
/*!**************************************************!*\
  !*** ./src/components/main-nav-menu-template.js ***!
  \**************************************************/
/*! exports provided: createMainNavMenuTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMainNavMenuTemplate", function() { return createMainNavMenuTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainNavMenu; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


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

class MainNavMenu extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

  getTemplate() {
    return createMainNavMenuTemplate();
  }
}


/***/ }),

/***/ "./src/components/show-more-btn-template.js":
/*!**************************************************!*\
  !*** ./src/components/show-more-btn-template.js ***!
  \**************************************************/
/*! exports provided: createShowMoreBtnTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShowMoreBtnTemplate", function() { return createShowMoreBtnTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShowMoreBtn; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createShowMoreBtnTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ShowMoreBtn extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

  getTemplate() {
    return createShowMoreBtnTemplate();
  }

  setShowMoreBtnClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/sort-template.js":
/*!*****************************************!*\
  !*** ./src/components/sort-template.js ***!
  \*****************************************/
/*! exports provided: createSortTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSortTemplate", function() { return createSortTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filters; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");
/* harmony import */ var _utils_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/const.js */ "./src/utils/const.js");



const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${_utils_const_js__WEBPACK_IMPORTED_MODULE_1__["SortType"].DEFAULT}" class="sort__button sort__button--default sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${_utils_const_js__WEBPACK_IMPORTED_MODULE_1__["SortType"].DATE}" class="sort__button sort__button--date">Sort by date</a></li>
      <li><a href="#" data-sort-type="${_utils_const_js__WEBPACK_IMPORTED_MODULE_1__["SortType"].RATING}" class="sort__button sort__button--rating">Sort by rating</a></li>
    </ul>`
  );
};

class Filters extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._currenSortType = _utils_const_js__WEBPACK_IMPORTED_MODULE_1__["SortType"].DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) =>{
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}


/***/ }),

/***/ "./src/components/user-rank-header-profile.js":
/*!****************************************************!*\
  !*** ./src/components/user-rank-header-profile.js ***!
  \****************************************************/
/*! exports provided: createUserRankHeaderProfileTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUserRankHeaderProfileTemplate", function() { return createUserRankHeaderProfileTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserRankHeaderProfile; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createUserRankHeaderProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class UserRankHeaderProfile extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

  getTemplate() {
    return createUserRankHeaderProfileTemplate();
  }
}


/***/ }),

/***/ "./src/controllers/page-controller.js":
/*!********************************************!*\
  !*** ./src/controllers/page-controller.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageController; });
/* harmony import */ var _components_sort_template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/sort-template.js */ "./src/components/sort-template.js");
/* harmony import */ var _components_films_container_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/films-container-template.js */ "./src/components/films-container-template.js");
/* harmony import */ var _components_film_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/film-details.js */ "./src/components/film-details.js");
/* harmony import */ var _components_film_card_template_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/film-card-template.js */ "./src/components/film-card-template.js");
/* harmony import */ var _components_comment_template_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/comment-template.js */ "./src/components/comment-template.js");
/* harmony import */ var _components_show_more_btn_template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/show-more-btn-template.js */ "./src/components/show-more-btn-template.js");
/* harmony import */ var _utils_const_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/const.js */ "./src/utils/const.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
const CARDS_COUNT = 5;
const CARDS_COUNT_FOR_OTHER = 2;













const getSortFilmCards = (filmCards, sortType, start, end) => {
  let sortedCards = [];
  const showingCards = filmCards.slice();

  switch (sortType) {
    case _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].DEFAULT:
      sortedCards = showingCards;
      break;

    case _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].DATE:
      sortedCards = showingCards.sort((a, b) => b.productionDate - a.productionDate);
      break;

    case _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].RATING:
      sortedCards = showingCards.sort((a, b) => b.rating - a.rating);
      break;

    case _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].COMMENT:
      sortedCards = showingCards.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }
  return sortedCards.slice(start, end);
};


class PageController {
  constructor(filmCards, mainElement) {
    this._filmCards = filmCards;
    this._mainElement = mainElement;
  }
  // ------------------------------render-film-card-------------------------
  renderFilmCard(place, filmCard) {
    // const filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);
    const filmCardComponent = new _components_film_card_template_js__WEBPACK_IMPORTED_MODULE_3__["default"](filmCard);
    const filmDetailsComponent = new _components_film_details_js__WEBPACK_IMPORTED_MODULE_2__["default"](filmCard);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["remove"])(filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCardComponent.setFilmCardClickHandler(() => {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(this._mainElement, filmDetailsComponent, _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);

      const commentsList = document.querySelector(`.film-details__comments-list`);
      filmCard.comments.forEach((comment) => {
        Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(commentsList, new _components_comment_template_js__WEBPACK_IMPORTED_MODULE_4__["default"](comment), _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
      });

      filmDetailsComponent.setCloseFilmDetailsBtnHandler(() => {
        Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["remove"])(filmDetailsComponent);
      });
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(place, filmCardComponent, _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
  }
  // ----------------------------main--render-----------------------------------
  render() {

    this._showMoreBtn = new _components_show_more_btn_template_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this._sortComponent = new _components_sort_template_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._container = new _components_films_container_template_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(this._mainElement, this._sortComponent, _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(this._mainElement, this._container, _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);

    // -------------------------SORT----------------------------------------------
    let countShowingFilmCards = CARDS_COUNT;
    const filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      countShowingFilmCards = CARDS_COUNT;
      const sortedFilmCards = getSortFilmCards(this._filmCards, sortType, 0, CARDS_COUNT);

      // filmsListContainer.innerHTML = ``;
      while (filmsListContainer.firstChild) {
        filmsListContainer.removeChild(filmsListContainer.firstChild);
      }

      renderFilmCards(sortedFilmCards);
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["remove"])(this._showMoreBtn);
      renderShowMoreBtn();
    });
    // ---------------show-more-btn ---------------------------------------
    const renderShowMoreBtn = () => {
      const filmsList = this._container.getElement().querySelector(`.films-list`);
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(filmsList, this._showMoreBtn, _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
      countShowingFilmCards = CARDS_COUNT;
      this._showMoreBtn.setShowMoreBtnClickHandler(() => {

        let prevFilmCards = countShowingFilmCards;
        countShowingFilmCards = countShowingFilmCards + CARDS_COUNT;

        const sortedCards = getSortFilmCards(this._filmCards, this._sortComponent.getSortType(), prevFilmCards, countShowingFilmCards);
        renderFilmCards(sortedCards);

        if (countShowingFilmCards >= this._filmCards.length) {
          Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["remove"])(this._showMoreBtn);
        }
      });
    };
    // -------------------------------------------------------------------------
    const renderFilmCards = (actuallyCardsArr) => {
      actuallyCardsArr.slice()
      .forEach((filmCard) => {
        this.renderFilmCard(filmsListContainer, filmCard);
      });
    };
    renderShowMoreBtn();
    // -------------------------base-5-cards-render-----------------------------
    this._filmCards.slice(0, CARDS_COUNT)
    .forEach((filmCard) => {
      this.renderFilmCard(filmsListContainer, filmCard);
    });
    // -----------------------------OTHER_CONTAINERS------------------------
    const topRatedContainer = document.querySelector(`.films-list--extra .films-list__container`);
    const topCommentContainer = document.querySelector(`.films-list--extra:nth-of-type(3) .films-list__container`);
    let sortCards = getSortFilmCards(this._filmCards, _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].RATING, 0, CARDS_COUNT_FOR_OTHER);
    sortCards.forEach((filmCard) => {
      this.renderFilmCard(topRatedContainer, filmCard);
    });
    sortCards = getSortFilmCards(this._filmCards, _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["SortType"].COMMENT, 0, CARDS_COUNT_FOR_OTHER);
    sortCards.forEach((filmCard) => {
      this.renderFilmCard(topCommentContainer, filmCard);
    });
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_generate_data_film_card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/generate-data-film-card.js */ "./src/components/generate-data-film-card.js");
/* harmony import */ var _components_user_rank_header_profile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/user-rank-header-profile.js */ "./src/components/user-rank-header-profile.js");
/* harmony import */ var _components_main_nav_menu_template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/main-nav-menu-template.js */ "./src/components/main-nav-menu-template.js");
/* harmony import */ var _components_footer_statistics_template_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/footer-statistics-template.js */ "./src/components/footer-statistics-template.js");
/* harmony import */ var _controllers_page_controller_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controllers/page-controller.js */ "./src/controllers/page-controller.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _utils_const_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/const.js */ "./src/utils/const.js");










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


Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_5__["render"])(headerElement, new _components_user_rank_header_profile_js__WEBPACK_IMPORTED_MODULE_1__["default"](), _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND); // static
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_5__["render"])(mainElement, new _components_main_nav_menu_template_js__WEBPACK_IMPORTED_MODULE_2__["default"](), _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND); // static

const pageControllerComponent = new _controllers_page_controller_js__WEBPACK_IMPORTED_MODULE_4__["default"](_components_generate_data_film_card_js__WEBPACK_IMPORTED_MODULE_0__["FILMS_CARDS_ARR"], mainElement);

if (_components_generate_data_film_card_js__WEBPACK_IMPORTED_MODULE_0__["FILMS_CARDS_ARR"].length) {
  pageControllerComponent.render();
} else {
  mainElement.insertAdjacentHTML(_utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND, NO_FILMS);
}

// ---------------------footer-count-movies--------------------
const footerStatistics = document.querySelector(`.footer__statistics`);
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_5__["render"])(footerStatistics, new _components_footer_statistics_template_js__WEBPACK_IMPORTED_MODULE_3__["default"](_components_generate_data_film_card_js__WEBPACK_IMPORTED_MODULE_0__["FILMS_CARDS_ARR"]), _utils_const_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);


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


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: formatCommentDate, formatShortDateMovie, formatFullDateMovie, formatTimeLengthMovie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatCommentDate", function() { return formatCommentDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatShortDateMovie", function() { return formatShortDateMovie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatFullDateMovie", function() { return formatFullDateMovie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTimeLengthMovie", function() { return formatTimeLengthMovie; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/utils/const.js");



const formatCommentDate = (dateObj) => {
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : String(value);
  };
  return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()} ${formatTime(dateObj.getHours())}:${formatTime(dateObj.getMinutes())}`;
};

const formatShortDateMovie = (dateObj) => {
  return `${dateObj.getFullYear()}`;
};

const formatFullDateMovie = (dateObj) => {
  return `${dateObj.getDate()} ${_const_js__WEBPACK_IMPORTED_MODULE_0__["MONTH_NAMES"][dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};


const formatTimeLengthMovie = (value) => {
  let hours = 0;
  let minutes = 0;
  for (let i = 0; i < value; i++) {
    if (value >= _const_js__WEBPACK_IMPORTED_MODULE_0__["VALUE_HOUR"]) {
      hours++;
      value -= _const_js__WEBPACK_IMPORTED_MODULE_0__["VALUE_HOUR"];
    } else {
      minutes = value;
      break;
    }
  }
  if (!hours && minutes) {
    return `${minutes}m`;
  }
  if (hours && !minutes) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
};


/***/ }),

/***/ "./src/utils/const.js":
/*!****************************!*\
  !*** ./src/utils/const.js ***!
  \****************************/
/*! exports provided: MONTH_NAMES, VALUE_HOUR, RenderPosition, SortType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH_NAMES", function() { return MONTH_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALUE_HOUR", function() { return VALUE_HOUR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortType", function() { return SortType; });
const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const VALUE_HOUR = 60;
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: createElement, render, replace, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/utils/const.js");


const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.insertAdjacentHTML(_const_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND, template);

  return newElement.firstChild;
};
const render = (container, component, place) => {
  switch (place) {
    case _const_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case _const_js__WEBPACK_IMPORTED_MODULE_0__["RenderPosition"].BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map