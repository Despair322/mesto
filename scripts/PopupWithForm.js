import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form')
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues
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
