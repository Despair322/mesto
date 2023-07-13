import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__submit')
    this._submitForm = submitForm;
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

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...'
      this._submitForm(evt, this._getInputValues())
       .then(()=>this.close())
       .catch(err=>{console.log(err);})
       .finally(()=>{
        this._submitButton.textContent = initialText;
       })
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
