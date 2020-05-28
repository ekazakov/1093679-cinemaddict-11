import FilmCard from "./models/film-card.js";
import Comment from "./models/comment.js";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getFilmCards() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
    .then(checkStatus)
    .then((response) => response.json())
    .then(FilmCard.parseFilmCards);
  }


  getFullFilmCard(filmCard, indexCard) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${indexCard}`, {headers})
    .then(checkStatus)
    .then((response) => response.json())
    .then((response) => {
      filmCard.comments = Comment.parseComments(response);
      return filmCard;
    });
  }


  addCommentCard(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${id}`, {
      method: `POST`,
      body: JSON.stringify(data),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then((response) => {
        let filmCard = FilmCard.parseFilmCard(response.movie);
        filmCard.comments = Comment.parseComments(response.comments);
        return filmCard;
      });
  }

  deleteCommentCard(id) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${id}`, {
      method: `DELETE`,
      headers,
    })
      .then(checkStatus);
  }

  updateFilmCard(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data.filmCardToRAW()),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(FilmCard.parseFilmCard);
  }
};

export default API;
