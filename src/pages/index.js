import "../pages/index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api.js";
import { Promise } from "core-js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: 'cd6a00d5-f38c-4bdf-acb8-932af302ac4e',
    'Content-Type': 'application/json'
  }
});

const buttonOpenPopupNewCardElement = document.querySelector(".profile__add");
const buttonOpenPopupProfileElement = document.querySelector(".profile__edit-name");
const buttonOpenPopupUpdateAvatarElement = document.querySelector('.profile__edit-photo');


const popupBigImage = new PopupWithImage('#popup-photo');

const userInfo = new UserInfo({
  name: '.profile__name',
  profession: ".profile__profession",
  avatar: '.profile__photo'
});

let gallery;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ ...userData });
    userInfo.setOwner(userData._id);
    gallery = new Section({
      items: cards, renderer: (item) => {
        const card = createCard(item);
        return card;
      }
    }, '.gallery');
    gallery.renderItems();
  })
  .catch(err => { console.log(err); })


function handleApiRequest(apiFun, values, popup) {
  return apiFun(values)
    .then((res) => {
      setTimeout(
        popup.close(), 500);
      return res;
    })
    .catch((err) => {
      return new Error(err);
    });
}

const popupProfile = new PopupWithForm('#popup-name', (evt, values) => {
  evt.preventDefault();
  return handleApiRequest(api.updateUserInfo.bind(api), { name: values.name, about: values.profession }, popupProfile)
    .then(profile => {
      userInfo.setUserInfo(profile)
    })
    .catch((err) => { console.log(err); });
});

const popupAddCard = new PopupWithForm('#popup-card', (evt, values) => {
  evt.preventDefault();
  return handleApiRequest(api.createCard.bind(api), { name: values.title, link: values.link }, popupAddCard)
    .then(card => { gallery.addItem(createCard({ ...card })) })
    .catch(err => { console.log(err); });
});

const popupDelCard = new PopupWithForm('#popup-delete-card', (evt) => {
  evt.preventDefault();
  return handleApiRequest(api.deleteCard.bind(api), popupDelCard.id, popupDelCard)
    .then(() => { popupDelCard.card.removeCard() })
    .catch(err => { console.log(err); });
})

const popupUpdateAvatar = new PopupWithForm('#popup-avatar', (evt, values) => {
  evt.preventDefault();
  return handleApiRequest(api.updateAvatar.bind(api), values.avatarLink, popupUpdateAvatar)
    .then((profile) => { userInfo.setAvatar(profile.avatar) })
    .catch((err) => { console.log(err); });
})

popupUpdateAvatar.setEventListeners();
popupDelCard.setEventListeners();
popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupBigImage.setEventListeners();


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

function resetPopupUpdateAvatar() {
  formValidators['avatar-form'].disableButton();
  formValidators['avatar-form'].resetError();
}

function openProfilePopup() {
  resetPopupProfile();
  popupProfile.open();
}

function openNewCardPopup() {
  resetPopupNewCard();
  popupAddCard.open()
}

function openUpdateAvatarPopup() {
  resetPopupUpdateAvatar();
  popupUpdateAvatar.open();
}

function createCard(item) {
  const cardElement = new Card("#photo-card", item,
    { myId: userInfo.id, myName: userInfo.getName() },
    {
      handleCardClick: function () {
        const data = cardElement.getData();
        popupBigImage.open({ name: data.name, link: data.link })
      },
      handleDeleteCard: function () {
        popupDelCard.id = cardElement.getId();
        popupDelCard.card = cardElement;
        popupDelCard.open();
      },
      handleLike: function () {
        return api.like(cardElement.getId())
          .then(card => card.likes)
          .catch(err => { console.log(err) });
      },
      handleUnlike: function () {
        return api.unlike(cardElement.getId())
          .then(card => card.likes)
          .catch(err => { console.log(err) });
      }
    }
  )
  return cardElement.create();
}

buttonOpenPopupProfileElement.addEventListener('click', openProfilePopup);
buttonOpenPopupNewCardElement.addEventListener('click', openNewCardPopup);
buttonOpenPopupUpdateAvatarElement.addEventListener('click', openUpdateAvatarPopup)

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
