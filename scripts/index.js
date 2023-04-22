const popupElement = document.querySelector(".popup");

const openPopupBtn = document.querySelector(".profile__edit-name");
const closePopupBtn = popupElement.querySelector(".popup__close");

const formElement = popupElement.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_profession");

const nameElement = document.querySelector(".profile__name");
const professionElement = document.querySelector(".profile__profession");

const openPopup = function () {
  nameInput.value = nameElement.textContent;
  jobInput.value = professionElement.textContent;
  popupElement.classList.add('popup_opened');
}
const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  professionElement.textContent = jobInput.value;
  togglePopupVisibility();
}
formElement.addEventListener('submit', handleFormSubmit);
