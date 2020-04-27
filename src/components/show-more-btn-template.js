import AbstractComponent from "./abstract-component.js";

export const createShowMoreBtnTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreBtn extends AbstractComponent {

  getTemplate() {
    return createShowMoreBtnTemplate();
  }

  setShowMoreBtnClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
