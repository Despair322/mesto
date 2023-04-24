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


const popupNameElement = document.querySelector("#popup-name");
const popupCardElement = document.querySelector("#popup-card");
const popupPhotoElement = document.querySelector("#popup-photo")

const openPopupAddBtn = document.querySelector(".profile__add");
const openPopupNameBtn = document.querySelector(".profile__edit-name");
const closePopupBtns = document.querySelectorAll(".popup__close");

const formNameElement = popupNameElement.querySelector(".popup__form");
const nameInput = formNameElement.querySelector(".popup__input_type_name");
const jobInput = formNameElement.querySelector(".popup__input_type_profession");
const nameElement = document.querySelector(".profile__name");
const professionElement = document.querySelector(".profile__profession");

const formCardElement = popupCardElement.querySelector(".popup__form");
const titleInput = formCardElement.querySelector(".popup__input_type_title");
const linkInput = formCardElement.querySelector(".popup__input_type_link");

function openPopup(evt) {
  evt.classList.add('popup_opened');
}

const openNamePopup = function () {
  nameInput.value = nameElement.textContent;
  jobInput.value = professionElement.textContent;
  openPopup(popupNameElement)
}

const openCardPopup = function () {
  titleInput.value="";
  linkInput.value="";
  openPopup(popupCardElement);
}

const closePopup = function (evt) {
  evt.target.parentElement.parentNode.classList.remove('popup_opened');
}

openPopupNameBtn.addEventListener('click', openNamePopup);
openPopupAddBtn.addEventListener('click', openCardPopup);
closePopupBtns.forEach(function (item) {
  item.addEventListener('click', closePopup);
});

function handleNameFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  professionElement.textContent = jobInput.value;
  closePopup(evt);
}
formNameElement.addEventListener('submit', handleNameFormSubmit);

const galleryElement = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#photo-card");

function addPhotoToGallery(title = "без названия", src="../images/karachaevsk.jpeg") {
  const newCard = cardTemplate.content.querySelector(".photo-card").cloneNode(true);
  newCard.querySelector(".photo-card__title").textContent = title;
  const photoElement = newCard.querySelector(".photo-card__photo");
  photoElement.src = src;
  photoElement.alt = title;
  photoElement.addEventListener('click', openFullscrinePopup);
  newCard.querySelector(".photo-card__like").addEventListener('click', toggleLike);
  newCard.querySelector(".photo-card__delete").addEventListener('click', deleteCard);
  galleryElement.append(newCard);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addPhotoToGallery(titleInput.value, linkInput.value);
  closePopup(evt);
}

function toggleLike(evt){
  evt.target.classList.toggle("photo-card__like_active");
}

function deleteCard(evt){
  evt.target.parentElement.remove();
}

function openFullscrinePopup(evt) {
  const photoElement = popupPhotoElement.querySelector(".popup__photo");
  photoElement.src = evt.target.src;
  photoElement.alt = evt.target.alt;
  popupPhotoElement.querySelector(".popup__subtitle").textContent = evt.target.parentElement.querySelector(".photo-card__title").textContent;
  openPopup(popupPhotoElement);
}

formCardElement.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(function (item){
  addPhotoToGallery(item.name, item.link);
});
