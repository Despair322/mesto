import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";
import { initialCards } from "./cards.js";

const popupElements = document.querySelectorAll('.popup');
const popupProfileElement = document.querySelector("#popup-name");
const popupNewCardElement = document.querySelector("#popup-card");

const buttonOpenPopupNewCardElement = document.querySelector(".profile__add");
const buttonOpenPopupProfileElement = document.querySelector(".profile__edit-name");
const buttonClosePopupElements = document.querySelectorAll(".popup__close");

const formProfileElement = popupProfileElement.querySelector(".popup__form");
const inputNameFormProfileElement = formProfileElement.querySelector(".popup__input_type_name");
const inputProfessionFormProfileElement = formProfileElement.querySelector(".popup__input_type_profession");
const nameElement = document.querySelector(".profile__name");
const professionElement = document.querySelector(".profile__profession");

const formNewCardElement = popupNewCardElement.querySelector(".popup__form");
const inputTitleFormNewCardElement = formNewCardElement.querySelector(".popup__input_type_title");
const inputLinkFormNewCardElement = formNewCardElement.querySelector(".popup__input_type_link");

const galleryElement = document.querySelector(".gallery");

function resetPopupProfile() {
  inputNameFormProfileElement.value = nameElement.textContent;
  inputProfessionFormProfileElement.value = professionElement.textContent;
  formProfileValidator.disableButton();
  formProfileValidator.resetError();
}

function resetPopupNewCard() {
  formNewCardElement.reset();
  formNewCardValidator.disableButton();
  formNewCardValidator.resetError();
}

function openProfilePopup() {
  resetPopupProfile();
  openPopup(popupProfileElement)
}

function openNewCardPopup() {
  resetPopupNewCard();
  openPopup(popupNewCardElement);
}

function handlePopupCloseOnClick(evt) {
  if (evt.target === evt.currentTarget)
    closePopup(evt.target);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = inputNameFormProfileElement.value;
  professionElement.textContent = inputProfessionFormProfileElement.value;
  closePopup(popupProfileElement);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(new Card("#photo-card", { name: inputTitleFormNewCardElement.value, link: inputLinkFormNewCardElement.value }).create());
  closePopup(popupNewCardElement);
}

buttonOpenPopupProfileElement.addEventListener('click', openProfilePopup);
buttonOpenPopupNewCardElement.addEventListener('click', openNewCardPopup);
buttonClosePopupElements.forEach(function (popupCloseButtonElement) {
  const popup = popupCloseButtonElement.closest('.popup');
  popupCloseButtonElement.addEventListener('click', () => closePopup(popup));
});
popupElements.forEach((popupElement) => {
  popupElement.addEventListener('click', handlePopupCloseOnClick);
})
formProfileElement.addEventListener('submit', handleProfileFormSubmit);
formNewCardElement.addEventListener('submit', handleNewCardFormSubmit);

function renderCard(card) {
  galleryElement.prepend(card);
}

initialCards.forEach(function (card) {
  renderCard(new Card("#photo-card", card).create());
});

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
