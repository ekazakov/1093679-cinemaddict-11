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
    commentsNumber: temp.length, // getRandomInteger(MIN_VALUE_RAITNG, MAX_COMMENTS_COUNT)
    // ---------------------------------
    isWatchlist: false,
    isAlreadyWatched: false,
    isFavorite: false
    // ---------------------------------
  };
  return filmCard;
};
for (let i = 0; i < MAX_CARDS_COUNT; i++) {
  FILMS_CARDS_ARR.push(createDataFilmCard());
}

export {FILMS_CARDS_ARR};
