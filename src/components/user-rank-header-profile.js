import AbstractComponent from "./abstract-component.js";
import {getRangUser} from "../utils/statistics.js";

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
