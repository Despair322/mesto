export class Card {

  constructor(template, data, handleCardClick) {
    this._templateSelector = template;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._popupFullImageElement = document.querySelector("#popup-photo");
    this._popupPhotoElement = this._popupFullImageElement.querySelector(".popup__photo");
    this._popupSubtitleElement = this._popupFullImageElement.querySelector(".popup__subtitle");
  }

  _toggleLike() {
    this._likeButton.classList.toggle("photo-card__like_active");
  }

  _deleteCard() {
    this._newCard.remove();
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".photo-card")
      .cloneNode(true);
    return template;
  }

  _setData() {
    this._newCard.querySelector(".photo-card__title").textContent = this._name;
    this._photoElement = this._newCard.querySelector(".photo-card__photo");
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
  }

  _setEventListeners() {
    this._photoElement.addEventListener('click', this._handleCardClick.bind(this));
    this._likeButton = this._newCard.querySelector(".photo-card__like");
    this._likeButton.addEventListener('click', () => { this._toggleLike() });
    this._newCard.querySelector(".photo-card__delete").addEventListener('click', () => { this._deleteCard() });
  }

  create() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._newCard;
  }
}

