export const createComentTemplate = (filmCardData) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${filmCardData.comments.emoji}.png" width="55" height="55" alt="emoji-${filmCardData.comments.emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${filmCardData.comments.commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${filmCardData.comments.commentAutor}</span>
          <span class="film-details__comment-day">2019/12/31 23:59</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};
