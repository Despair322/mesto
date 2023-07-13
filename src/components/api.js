export default class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: 'cd6a00d5-f38c-4bdf-acb8-932af302ac4e'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me `, {
      headers: {
        authorization: 'cd6a00d5-f38c-4bdf-acb8-932af302ac4e'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._options.baseUrl}/users/me `, {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
      headers: {
        authorization: 'cd6a00d5-f38c-4bdf-acb8-932af302ac4e',
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'cd6a00d5-f38c-4bdf-acb8-932af302ac4e',
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  like(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'cd6a00d5-f38c-4bdf-acb8-932af302ac4e',
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  unlike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: 'cd6a00d5-f38c-4bdf-acb8-932af302ac4e',
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  createCard({ name, link }) {
    return fetch(`${this._options.baseUrl}/cards `, {
      method: 'POST',
      body: JSON.stringify({ name, link }),
      headers: {
        authorization: 'cd6a00d5-f38c-4bdf-acb8-932af302ac4e',
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  updateAvatar(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar: link }),
      headers: {
        authorization: 'cd6a00d5-f38c-4bdf-acb8-932af302ac4e',
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}


