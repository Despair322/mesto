import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupElements = document.querySelectorAll('.popup');
const popupNameElement = document.querySelector("#popup-name");
const popupCardElement = document.querySelector("#popup-card");

const popupAddButtonElement = document.querySelector(".profile__add");
const popupNameButtonElement = document.querySelector(".profile__edit-name");
const popupCloseButtonElements = document.querySelectorAll(".popup__close");

const formNameElement = popupNameElement.querySelector(".popup__form");
const nameInputElement = formNameElement.querySelector(".popup__input_type_name");
const jobInputElement = formNameElement.querySelector(".popup__input_type_profession");
const nameElement = document.querySelector(".profile__name");
const professionElement = document.querySelector(".profile__profession");

const formCardElement = popupCardElement.querySelector(".popup__form");
const titleInputElement = formCardElement.querySelector(".popup__input_type_title");
const linkInputElement = formCardElement.querySelector(".popup__input_type_link");

const galleryElement = document.querySelector(".gallery");

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeByEsc);
}

function resetNamePopup() {
  nameInputElement.value = nameElement.textContent;
  jobInputElement.value = professionElement.textContent;
  nameFormValidator.disableButton();
}

function resetCardPopup() {
  titleInputElement.value = "";
  linkInputElement.value = "";
  cardFormValidator.disableButton();
}

function openNamePopup() {
  resetNamePopup();
  openPopup(popupNameElement)
}

function openCardPopup() {
  resetCardPopup();
  openPopup(popupCardElement);
}

function handlePopupCloseOnClick(evt) {
  if (evt.target === evt.currentTarget)
    closePopup(evt.target);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleNameFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInputElement.value;
  professionElement.textContent = jobInputElement.value;
  closePopup(popupNameElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(new Card("#photo-card", { name: titleInputElement.value, link: linkInputElement.value }).create());
  closePopup(popupCardElement);
}

popupNameButtonElement.addEventListener('click', openNamePopup);
popupAddButtonElement.addEventListener('click', openCardPopup);
popupCloseButtonElements.forEach(function (item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(popup));
});
popupElements.forEach((popupElement) => {
  popupElement.addEventListener('click', handlePopupCloseOnClick);
})
formNameElement.addEventListener('submit', handleNameFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);

function renderCard(card) {
  galleryElement.prepend(card);
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
initialCards.forEach(function (item) {
  renderCard(new Card("#photo-card", item).create());
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
};
const nameFormValidator = new FormValidator(validationConfig, formNameElement);
nameFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, formCardElement);
cardFormValidator.enableValidation();
