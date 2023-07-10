import "../pages/index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";
import { initialCards } from "../utils/cards.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const buttonOpenPopupNewCardElement = document.querySelector(".profile__add");
const buttonOpenPopupProfileElement = document.querySelector(".profile__edit-name");

const bigImagePopup = new PopupWithImage('#popup-photo');
bigImagePopup.setEventListeners();

const userInfo = new UserInfo({
  name: '.profile__name',
  profession: ".profile__profession"
});

const gallery = new Section({
  items: initialCards, renderer: (item) => {
    const card = createCard(item);
    return card;
  }
}, '.gallery');

gallery.renderItems();
const popupProfile = new PopupWithForm('#popup-name', (evt, values)=>{
  evt.preventDefault();
  userInfo.setUserInfo({ name: values.name, profession: values.profession })
  popupProfile.close();
});
popupProfile.setEventListeners();
const popupAddCard = new PopupWithForm('#popup-card', (evt, values)=>{
  evt.preventDefault();
  gallery.addItem(createCard(
    { name: values.title, link: values.link }));
  popupAddCard.close();
});
popupAddCard.setEventListeners();

function resetPopupProfile() {
  const data = userInfo.getUserInfo();
  popupProfile.setInputValues({ name: data.name, profession: data.profession });
  formValidators['profile-form'].disableButton();
  formValidators['profile-form'].resetError();
}

function resetPopupNewCard() {
  formValidators['card-form'].disableButton();
  formValidators['card-form'].resetError();
}

function openProfilePopup() {
  resetPopupProfile();
  popupProfile.open();
}

function openNewCardPopup() {
  resetPopupNewCard();
  popupAddCard.open()
}

function createCard(item) {
  const cardElement = new Card("#photo-card", item, () => {
    const data = cardElement.getData();
    bigImagePopup.open({ name: data.name, link: data.link })
  })
  return cardElement.create();
}

buttonOpenPopupProfileElement.addEventListener('click', openProfilePopup);
buttonOpenPopupNewCardElement.addEventListener('click', openNewCardPopup);

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation()
  })
}

enableValidation(validationConfig);
