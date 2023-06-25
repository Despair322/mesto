export class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._formElement = form;
  }

  _showError(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  disableButton() {
    this._buttonSubmitElement.disabled = true;
    this._buttonSubmitElement.classList.add(this._config.inactiveButtonClass);
  }

  _enableButton() {
    this._buttonSubmitElement.disabled = false;
    this._buttonSubmitElement.classList.remove(this._config.inactiveButtonClass);
  }

  _toggleButtonState(isActive) {
    if (!isActive) {
      this.disableButton()
    } else {
      this._enableButton()
    }
  }

  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    if (!errorElement) return;

    if (!isInputValid) {
      this._showError(inputElement, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    }
  }

  _setEventListeners() {
    const inputElements = this._formElement.querySelectorAll(this._config.inputSelector);
    this._buttonSubmitElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(this._formElement.checkValidity());

    inputElements.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._toggleButtonState(this._formElement.checkValidity());
        this._checkInputValidity(inputItem);
      });
    });
  }


  enableValidation() {
    this._setEventListeners();
  }
}
