/* export const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">Sagebrush Trail</h3>
      <p class="film-card__rating">3.2</p>
      <p class="film-card__info">
        <span class="film-card__year">1933</span>
        <span class="film-card__duration">54m</span>
        <span class="film-card__genre">Western</span>
      </p>
      <img src="./images/posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>
      <a class="film-card__comments">89 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};*/


export const createFilmCardTemplate = (filmCardData) => {
  const {title, rating, yearProduction, movieLength, genre, poster, description, commentsNumber} = filmCardData;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${yearProduction}</span>
        <span class="film-card__duration">${movieLength}</span>
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
