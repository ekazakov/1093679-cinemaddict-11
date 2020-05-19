import AbstractComponent from "./abstract-component.js";

const rangMap = {
  NO_RANG: ``,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie buff`,
};
// от 1 до 10 — novice;
// от 11 до 20 — fan;
// от 21 и выше — movie buff;

const getWatchedMovies = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isAlreadyWatched);
};

const getRangUser = (filmCards) => {
  let a = getWatchedMovies(filmCards).length;
  if (a <= 0) {
    return rangMap.NO_RANG;
  }
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

export const createUserRankHeaderProfileTemplate = (filmCards) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getRangUser(filmCards)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRankHeaderProfile extends AbstractComponent {
  constructor(filmCardsModel) {
    super();
    this._filmCards = filmCardsModel.getFilmCardsAll();
  }

  getTemplate() {
    return createUserRankHeaderProfileTemplate(this._filmCards);
  }
}
