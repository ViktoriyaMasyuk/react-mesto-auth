import React from "react";

class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.url}users/me/`, {
      headers: this.headers,
    }).then(this._getResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}cards/`, {
      headers: this.headers,
    }).then(this._getResponse);
  }
  updateUserInfo(body) {
    return fetch(`${this.url}users/me/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(this._getResponse);
  }

  addNewCard(body) {
    return fetch(`${this.url}cards/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(this._getResponse);
  }
  deleteCard(cardId) {
    return fetch(`${this.url}cards/${cardId}/`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResponse);
  }
  setLike(cardId) {
    return fetch(`${this.url}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._getResponse);
  }
  unsetLike(cardId) {
    return fetch(`${this.url}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResponse);
  }
  changeAvatar(data) {
    return fetch(`${this.url}users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then(this._getResponse);
  }
}
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64/",
  headers: {
    authorization: "ade0a831-d345-4d2c-8394-f99ed3b27f1b",
    "Content-Type": "application/json",
  },
});
export default api;
