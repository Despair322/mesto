const card = {
  name: "Без названия",
  link: "./images/no-image.png"
};

const popupNameElement = document.querySelector("#popup-name");
const popupCardElement = document.querySelector("#popup-card");
const popupPhotoElement = document.querySelector("#popup-photo")

const popupAddBtn = document.querySelector(".profile__add");
const popupNameBtn = document.querySelector(".profile__edit-name");
const popupCloseBtns = document.querySelectorAll(".popup__close");

const formNameElement = popupNameElement.querySelector(".popup__form");
const nameInput = formNameElement.querySelector(".popup__input_type_name");
const jobInput = formNameElement.querySelector(".popup__input_type_profession");
const nameElement = document.querySelector(".profile__name");
const professionElement = document.querySelector(".profile__profession");

const formCardElement = popupCardElement.querySelector(".popup__form");
const titleInput = formCardElement.querySelector(".popup__input_type_title");
const linkInput = formCardElement.querySelector(".popup__input_type_link");

const photoElement = popupPhotoElement.querySelector(".popup__photo");
const photoSubtitleElement = popupPhotoElement.querySelector(".popup__subtitle");

function openPopup(evt) {
  evt.classList.add('popup_opened');
}

const openNamePopup = function () {
  nameInput.value = nameElement.textContent;
  jobInput.value = professionElement.textContent;
  openPopup(popupNameElement)
}

const openCardPopup = function () {
  titleInput.value = "";
  linkInput.value = "";
  openPopup(popupCardElement);
}

const closePopup = function (elem) {
  elem.classList.remove('popup_opened');
}

function handlePopupClose(evt) {
  closePopup(evt.target.closest(".popup"))
}

popupNameBtn.addEventListener('click', openNamePopup);
popupAddBtn.addEventListener('click', openCardPopup);
popupCloseBtns.forEach(function (item) {
  item.addEventListener('click', handlePopupClose);
});

function handleNameFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  professionElement.textContent = jobInput.value;
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
  card.name = titleInput.value.length > 0 ? titleInput.value : "Без названия";
  card.link = linkInput.value.length > 0 ? linkInput.value : "./images/no-image.png";
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
