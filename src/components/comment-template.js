import AbstractSmartComponent from "./abstract-smart-component.js";
import {formatCommentDate} from "../utils/common.js";
import {DeletingBtnText} from "../utils/const.js";

export const createComentTemplate = (commentData, buttonData) => {
  const formatEmoji = () => {
    return `<img src="./images/emoji/${commentData.emoji}.png" width="55" height="55" alt="emoji-${commentData.emoji}">`;
  };

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        ${formatEmoji()}
      </span>
      <div>
        <p class="film-details__comment-text">${commentData.commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentData.commentAutor}</span>
          <span class="film-details__comment-day">${formatCommentDate(commentData.commentDate)}</span>
          <button class="film-details__comment-delete" type="button">${buttonData}</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractSmartComponent {
  constructor(commentData) {
    super();
    this.commentData = commentData;
    this.textDataButton = DeletingBtnText.DELETE;
    this.deleteHandler = null;
  }

  getTemplate() {
    return createComentTemplate(this.commentData, this.textDataButton);
  }

  setDeletingBtn() {
    this.textDataButton = DeletingBtnText.DELETING;
    this.rerender();
    this.getElement()
     .querySelector(`.film-details__comment-delete`)
     .setAttribute(`disabled`, `disabled`);
  }

  remove() {
    super.removeElement();
  }

  recoveryListeners() {
    this.setDeleteHandler(this.deleteHandler);
  }

  rerender() {
    super.rerender();
  }

  getId() {
    return this.commentData.id;
  }

  resetDeleteButton() {
    this.textDataButton = DeletingBtnText.DELETE;
    this.rerender();
    this.getElement()
     .querySelector(`.film-details__comment-delete`)
     .removeAttribute(`disabled`);
  }

  setDeleteHandler(handler) {
    this.deleteHandler = handler;
    this.getElement().querySelector(`.film-details__comment-delete`)
    .addEventListener(`click`, this.deleteHandler);
  }
}
