import Popup from "./Popup.js";

export default class PopupWithButtons extends Popup {
  constructor(selector, handleClick, buttonName) {
    super(selector);
    this._button = this._popup.getElementById(buttonName);
    this._handleClick = handleClick;
  }

  setEventListeners() {
    this._button.addEventListener('click', handleClick(data))
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
