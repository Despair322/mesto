export class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._formElement = form;

    this._inputList = this._formElement.querySelectorAll(this._config.inputSelector);
    this._buttonSubmitElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _getErrorElement(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    return errorElement;
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._config.inputErrorClass);
    if (!errorElement) return;
    errorElement.textContent = errorMessage;
  }

  _hideError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._config.inputErrorClass);
    if (!errorElement) return;
    errorElement.textContent = "";
  }

  disableButton() {
    this._buttonSubmitElement.disabled = true;
    this._buttonSubmitElement.classList.add(this._config.inactiveButtonClass);
  }

  _enableButton() {
    this._buttonSubmitElement.disabled = false;
    this._buttonSubmitElement.classList.remove(this._config.inactiveButtonClass);
  }

  _toggleButtonState() {
    if (!this._formElement.checkValidity()) {
      this.disableButton()
    } else {
      this._enableButton()
    }
  }

  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    if (!isInputValid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputItem);
      });
    });
  }

  resetError() {
    this._inputList.forEach((inputItem) => {
      this._hideError(inputItem);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
