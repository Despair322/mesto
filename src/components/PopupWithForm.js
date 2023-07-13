import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm, submitButtonTexts) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__submit')
    this._submitForm = submitForm;
    this._submitButtonTexts = submitButtonTexts;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  updateSubmitText(state) {
    this._submitButton.innerHTML = this._submitButtonTexts[state]
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => { this._submitForm(evt, this._getInputValues()) });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
