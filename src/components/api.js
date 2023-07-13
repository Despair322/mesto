export default class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me `, {
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._options.baseUrl}/users/me `, {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  like(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  unlike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }


  createCard({ name, link }) {
    return fetch(`${this._options.baseUrl}/cards `, {
      method: 'POST',
      body: JSON.stringify({ name, link }),
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  updateAvatar(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar: link }),
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  dd(){
    Promise.all([this.getUserInfo, this.getInitialCards])
    .then()
    .catch(err=>{console.log(err);})
  }


}


