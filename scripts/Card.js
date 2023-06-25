export class Card {

  constructor(template, data) {
    this._templateSelector = template;
    this._name = data.name;
    this._link = data.link;
  }

  _openPopup() {
    this._popupPhotoElement.classList.add('popup_opened');
    window.addEventListener('keydown', this._closeByEsc);
  }

  _closeByEsc(evt) {
    if (evt.key === "Escape") {
      this._popupPhotoElement.classList.remove('popup_opened');
      window.removeEventListener('keydown', this._closeByEsc);
    }
  }

  _openFullscrinePopup() {
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._photoSubtitleElement.textContent = this._name;
    this._openPopup();
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("photo-card__like_active");
  }

  _deleteCard(evt) {
    evt.target.closest(".photo-card").remove();
  }

  create() {
    const newCard = document.querySelector(this._templateSelector).content.querySelector(".photo-card").cloneNode(true);
    newCard.querySelector(".photo-card__title").textContent = this._name;
    const photoElement = newCard.querySelector(".photo-card__photo");

    this._popupPhotoElement = document.querySelector("#popup-photo");
    this._photoElement = this._popupPhotoElement.querySelector(".popup__photo");
    this._photoSubtitleElement = this._popupPhotoElement.querySelector(".popup__subtitle");
    photoElement.src = this._link;
    photoElement.alt = this._name;
    photoElement.addEventListener('click', () => this._openFullscrinePopup());
    newCard.querySelector(".photo-card__like").addEventListener('click', this._toggleLike);
    newCard.querySelector(".photo-card__delete").addEventListener('click', this._deleteCard);
    return newCard;
  }
}

