import { jobInput } from "../constants/constants";
export default class Api {
  constructor({ URLs, headers, token }) {
    this._baseURL = URLs.baseURL;
    this._cardsURL = URLs.cardsURL;
    this._userURL = URLs.userURL;
    this._likesURL = URLs.likesURL;
    this._avatarURL = URLs.avatarURL;
    this._headers = headers;
    this._token = token;
  }
  loadUserData() {
    return fetch(this._userURL, {
        headers: {
          authorization: this._token
        },
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  loadCards() {
    return fetch(this._cardsURL, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  addNewCard(item) {
    return fetch(this._cardsURL, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: item.name,
          link: item.link,
        })
      })
      .then((res) => {

        if (res.ok) {
          return res.json();
        }
        return Promise.reject((`Ошибка: ${res.status}`));
      });
  }
  deleteCard(cardId) {
    return fetch(`${this._cardsURL}${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });

  }
  editProfile({ name, job }) {
    return fetch(`${this._userURL}`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: job
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  loadLike(id) {
    return fetch(`${this._likesURL}${id}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  deleteLike(id) {
    return fetch(`${this._likesURL}${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  editAvatar(avatar) {
    return fetch(`${this._avatarURL}`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avatar,
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}