import {formatCommentDate} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

export const createComentTemplate = (commentData) => {
  const formatEmoji = () => {
    if (commentData.emoji) {
      return `<img src="./images/emoji/${commentData.emoji}.png" width="55" height="55" alt="emoji-${commentData.emoji}">`;
    } else {
      return `<div for="add-emoji" class="film-details__add-emoji-label"></div>`;
    }
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
          <button class="film-details__comment-delete" type="button">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractComponent {
  constructor(commentData) {
    super();
    this._commentData = commentData;
  }

  getTemplate() {
    return createComentTemplate(this._commentData);
  }
  remove() {
    super.removeElement();
  }

  setDeleteHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`)
    .addEventListener(`click`, handler);
  }
}
