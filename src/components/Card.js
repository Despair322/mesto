export class Card {

  constructor(template, data, { myId, myName }, { handleCardClick, handleDeleteCard, handleLike, handleUnlike }) {
    this._templateSelector = template;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._isOwner = data.owner._id === myId ? true : false;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike
  }

  _toggleLike(apiState) {
    if (apiState) {
      if (this._likeButton.classList.contains('photo-card__like_active')) {
        this._handleUnlike()
          .then((likes) => {
            this._likeButton.classList.toggle("photo-card__like_active");
            this._likeCounter.innerHTML = likes.length;
          })
          .catch(err => { console.log(err); });
      }
      else {
        this._handleLike()
          .then((likes) => {
            this._likeButton.classList.toggle("photo-card__like_active");
            this._likeCounter.innerHTML = likes.length;
          })
          .catch(err => { console.log(err); });
      }
    }else{
      this._likeButton.classList.toggle("photo-card__like_active");
    }

  }

  _deleteCard() {
    this._handleDeleteCard();
  }

  removeCard() {
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
    this._deleteButton = this._newCard.querySelector('.photo-card__delete');
    if (!this._isOwner)
      this._deleteButton.classList.add('photo-card__delete_hidden');
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._likeButton = this._newCard.querySelector(".photo-card__like");
    this._likeCounter = this._newCard.querySelector('.photo-card__like-counter');
    this._likeCounter.innerHTML = this._likes.length;
    if (this._likes.find(like => like._id === this._myId))
      this._toggleLike(false)
  }

  getData() {
    const data = {};
    data.name = this._name;
    data.link = this._link;
    return data;
  }

  getId() {
    return this._id;
  }

  _setEventListeners() {
    this._photoElement.addEventListener('click', this._handleCardClick.bind(this));
    this._likeButton.addEventListener('click', () => { this._toggleLike(true) });
    if (this._isOwner)
      this._deleteButton.addEventListener('click', () => { this._deleteCard() });
  }

  create() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._newCard;
  }
}

