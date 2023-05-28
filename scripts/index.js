const popupElements = document.querySelectorAll('.popup');
const popupNameElement = document.querySelector("#popup-name");
const popupCardElement = document.querySelector("#popup-card");
const popupPhotoElement = document.querySelector("#popup-photo");

const popupAddButtonElement = document.querySelector(".profile__add");
const popupNameButtonElement = document.querySelector(".profile__edit-name");
const popupCloseButtonElements = document.querySelectorAll(".popup__close");

const formNameElement = popupNameElement.querySelector(".popup__form");
const nameInputElement = formNameElement.querySelector(".popup__input_type_name");
const nameErrorElement = formNameElement.querySelector(`#${nameInputElement.name}-error`)
const jobInputElement = formNameElement.querySelector(".popup__input_type_profession");
const jobErrorElement = formNameElement.querySelector(`#${jobInputElement.name}-error`)
const nameElement = document.querySelector(".profile__name");
const professionElement = document.querySelector(".profile__profession");
const buttonNameSubmitElement = formNameElement.querySelector(".popup__submit");

const formCardElement = popupCardElement.querySelector(".popup__form");
const titleInputElement = formCardElement.querySelector(".popup__input_type_title");
const titleErrorElement = formCardElement.querySelector(`#${titleInputElement.name}-error`)
const linkInputElement = formCardElement.querySelector(".popup__input_type_link");
const linkErrorElement = formCardElement.querySelector(`#${linkInputElement.name}-error`)
const buttonCardSubmitElement = formCardElement.querySelector(".popup__submit");

const photoElement = popupPhotoElement.querySelector(".popup__photo");
const photoSubtitleElement = popupPhotoElement.querySelector(".popup__subtitle");

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', closeByEsc);
}

function resetNamePopup() {
  nameInputElement.value = nameElement.textContent;
  nameInputElement.classList.remove('popup__input_type_error');
  nameErrorElement.textContent = "";

  jobInputElement.value = professionElement.textContent;
  jobInputElement.classList.remove('popup__input_type_error');
  jobErrorElement.textContent = "";
  disableButton(buttonNameSubmitElement, { inactiveButtonClass: 'popup__submit_disabled' })
}

function resetCardPopup() {
  titleInputElement.value = "";
  titleInputElement.classList.remove('popup__input_type_error');
  titleErrorElement.textContent = "";

  linkInputElement.value = "";
  linkInputElement.classList.remove('popup__input_type_error');
  linkErrorElement.textContent = "";
  disableButton(buttonCardSubmitElement, { inactiveButtonClass: 'popup__submit_disabled' })
}

const openNamePopup = function () {
  resetNamePopup();
  openPopup(popupNameElement)
}

const openCardPopup = function () {
  resetCardPopup();
  openPopup(popupCardElement);
}

const closePopup = function (elem) {
  elem.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeByEsc);
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

popupNameButtonElement.addEventListener('click', openNamePopup);
popupAddButtonElement.addEventListener('click', openCardPopup);
popupCloseButtonElements.forEach(function (item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(popup));
});
popupElements.forEach((popupElement) => {
  popupElement.addEventListener('click', handlePopupCloseOnClick);
})

function handleNameFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInputElement.value;
  professionElement.textContent = jobInputElement.value;
  closePopup(popupNameElement);
}
formNameElement.addEventListener('submit', handleNameFormSubmit);

const galleryElement = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#photo-card");

function createCard(cardObj) {
  const newCard = cardTemplate.content.querySelector(".photo-card").cloneNode(true);
  newCard.querySelector(".photo-card__title").textContent = cardObj.name;
  const photoElement = newCard.querySelector(".photo-card__photo");
  photoElement.src = cardObj.link;
  photoElement.alt = cardObj.name;
  const data = {
    src: cardObj.link,
    alt: cardObj.name,
    title: cardObj.name
  };
  photoElement.addEventListener('click', () => openFullscrinePopup(data));
  newCard.querySelector(".photo-card__like").addEventListener('click', toggleLike);
  newCard.querySelector(".photo-card__delete").addEventListener('click', deleteCard);
  return newCard;
}

function renderCard(card) {
  galleryElement.prepend(card);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(createCard({ name: titleInputElement.value, link: linkInputElement.value }));
  closePopup(popupCardElement);
}

function toggleLike(evt) {
  evt.target.classList.toggle("photo-card__like_active");
}

function deleteCard(evt) {
  evt.target.closest(".photo-card").remove();
}

function openFullscrinePopup(data) {
  photoElement.src = data.src;
  photoElement.alt = data.alt;
  photoSubtitleElement.textContent = data.title;
  openPopup(popupPhotoElement);
}

formCardElement.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(function (item) {
  renderCard(createCard(item));
});

