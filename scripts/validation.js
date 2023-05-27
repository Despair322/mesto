function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  // inputElement.addEventListener('mouseover', )
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function disableButton(buttonElement, config){
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enableButton(buttonElement, config){
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    disableButton(buttonElement, config)
  } else {
    enableButton(buttonElement, config)
  }
}

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!errorElement) return;

  if (!isInputValid) {
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  }
}

function setEventListener(formElement, config) {
  const inputElements = formElement.querySelectorAll(config.inputSelector);
  const buttonSubmitElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(buttonSubmitElement, formElement.checkValidity(), config);

  inputElements.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      toggleButtonState(buttonSubmitElement, formElement.checkValidity(), config);
      checkInputValidity(inputItem, formElement, config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(formItem => {
    setEventListener(formItem, config);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
});

