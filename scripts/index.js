const card = {
  name: "Без названия",
  link: "./images/no-image.png"
};

const popupElements = document.querySelectorAll('.popup');
const popupNameElement = document.querySelector("#popup-name");
const popupCardElement = document.querySelector("#popup-card");
const popupPhotoElement = document.querySelector("#popup-photo");
let activePopupElement = null;

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

const photoElement = popupPhotoElement.querySelector(".popup__photo");
const photoSubtitleElement = popupPhotoElement.querySelector(".popup__subtitle");

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  activePopupElement = popupElement;
}

const openNamePopup = function () {
  nameInputElement.value = nameElement.textContent;
  jobInputElement.value = professionElement.textContent;
  openPopup(popupNameElement)
}

const openCardPopup = function () {
  titleInputElement.value = "";
  linkInputElement.value = "";
  openPopup(popupCardElement);
}

const closePopup = function (elem) {
  elem.classList.remove('popup_opened');
  activePopupElement = "";
}

function handlePopupClose(evt) {
  closePopup(evt.target.closest(".popup"))
}

function handlePopupCloseOnClick(evt) {
  if (evt.target === evt.currentTarget)
    handlePopupClose(evt);
}

function handlePopupCloseOnKeyPress(evt) {
  if (activePopupElement !== null && evt.key === "Escape")
    closePopup(activePopupElement);
}

popupNameButtonElement.addEventListener('click', openNamePopup);
popupAddButtonElement.addEventListener('click', openCardPopup);
popupCloseButtonElements.forEach(function (item) {
  item.addEventListener('click', handlePopupClose);
});
[...popupElements].forEach((popupElement) => {
  popupElement.addEventListener('click', handlePopupCloseOnClick);
})
window.addEventListener('keydown', handlePopupCloseOnKeyPress);

function handleNameFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInputElement.value;
  professionElement.textContent = jobInputElement.value;
  closePopup(evt.target.closest(".popup"));
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
  card.name = titleInputElement.value.length > 0 ? titleInputElement.value : "Без названия";
  card.link = linkInputElement.value.length > 0 ? linkInputElement.value : "./images/no-image.png";
  renderCard(createCard(card));
  closePopup(evt.target.closest(".popup"));
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
  card.name = item.name;
  card.link = item.link;
  renderCard(createCard(item));
});

