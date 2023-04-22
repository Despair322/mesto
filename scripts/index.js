const popupElement = document.querySelector(".popup");

const openPopupBtn = document.querySelector(".profile__edit-name");
const closePopupBtn = popupElement.querySelector(".popup__close");
const togglePopupVisibility = function () {
  popupElement.classList.toggle('popup_is-opened');
}
openPopupBtn.addEventListener('click', togglePopupVisibility);
closePopupBtn.addEventListener('click', togglePopupVisibility);

const formElement = popupElement.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__name");
const jobInput = formElement.querySelector(".popup__profession");

const nameElement = document.querySelector(".profile__name");
const professionElement = document.querySelector(".profile__profession");

nameInput.value = nameElement.textContent;
jobInput.value = professionElement.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  professionElement.textContent = jobInput.value;
  togglePopupVisibility();
}
formElement.addEventListener('submit', handleFormSubmit);
