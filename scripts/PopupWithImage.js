import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
    this._photoElement = this._popup.querySelector(".popup__photo");
    this._subtitleElement = this._popup.querySelector(".popup__subtitle");
  }

  open(data){
    this._photoElement.src = data.link;
    this._photoElement.alt = data.name;
    this._subtitleElement.textContent = data.name;
    super.open();
  }
}
