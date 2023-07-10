import "../pages/index.css";

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./cards.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

const popupProfileElement = document.querySelector("#popup-name");
const popupNewCardElement = document.querySelector("#popup-card");

const buttonOpenPopupNewCardElement = document.querySelector(".profile__add");
const buttonOpenPopupProfileElement = document.querySelector(".profile__edit-name");

const formProfileElement = popupProfileElement.querySelector(".popup__form");
const inputNameFormProfileElement = formProfileElement.querySelector(".popup__input_type_name");
const inputProfessionFormProfileElement = formProfileElement.querySelector(".popup__input_type_profession");

const formNewCardElement = popupNewCardElement.querySelector(".popup__form");

const bigImagePopup = new PopupWithImage('#popup-photo');
bigImagePopup.setEventListeners();
function handleCardClick() {
  bigImagePopup.open({name: this._name, link: this._link});
}
function handleProfilePopupSubmit(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo({ name: values.name, profession: values.profession })
  this.close();
}
function handleAddCardPopupSubmit(evt, values) {
  evt.preventDefault();
  gallery.addItem(new Card("#photo-card",
    { name: values.title, link: values.link },
    handleCardClick).create());
  this.close();
}

const userInfo = new UserInfo({
  name: '.profile__name',
  profession: ".profile__profession"
});

const gallery = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card("#photo-card", item, handleCardClick).create();
    return card;
  }
}, '.gallery');

gallery.renderItems();
const popupProfile = new PopupWithForm('#popup-name', handleProfilePopupSubmit);
popupProfile.setEventListeners();
const popupAddCard = new PopupWithForm('#popup-card', handleAddCardPopupSubmit);
popupAddCard.setEventListeners();

function resetPopupProfile() {
  const data = userInfo.getUserInfo();
  inputNameFormProfileElement.value = data.name;
  inputProfessionFormProfileElement.value = data.profession;
  formProfileValidator.disableButton();
  formProfileValidator.resetError();
}

function resetPopupNewCard() {
  formNewCardValidator.disableButton();
  formNewCardValidator.resetError();
}

function openProfilePopup() {
  resetPopupProfile();
  popupProfile.open();
}

function openNewCardPopup() {
  resetPopupNewCard();
  popupAddCard.open()
}

buttonOpenPopupProfileElement.addEventListener('click', openProfilePopup);
buttonOpenPopupNewCardElement.addEventListener('click', openNewCardPopup);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
};
const formProfileValidator = new FormValidator(validationConfig, formProfileElement);
formProfileValidator.enableValidation();
const formNewCardValidator = new FormValidator(validationConfig, formNewCardElement);
formNewCardValidator.enableValidation();
