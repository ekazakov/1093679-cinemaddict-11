import {formatCommentDate} from "../util.js";
import {createElement} from "../util.js";

export const createComentTemplate = (commentData) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${commentData.emoji}.png" width="55" height="55" alt="emoji-${commentData.emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentData.commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentData.commentAutor}</span>
          <span class="film-details__comment-day">${formatCommentDate(commentData.commentDate)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment {
  constructor(commentData) {
    this._commentData = commentData;
    this._element = null;
  }

  getTemplate() {
    return createComentTemplate(this._commentData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
