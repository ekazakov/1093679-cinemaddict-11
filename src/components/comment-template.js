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
          <span class="film-details__comment-day">${commentData.commentDate.toISOString().substr(0, 10)} ${commentData.commentDate.toISOString().substr(11, 5)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

/* export const createComentTemplate = (commentData) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${commentData.emoji}.png" width="55" height="55" alt="emoji-${commentData.emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentData.commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentData.commentAutor}</span>
          <span class="film-details__comment-day">2019/12/31 23:59</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};*/
