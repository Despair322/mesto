export default class UserInfo {
  constructor(selectors) {
    this._nameElement = document.querySelector(selectors.name);
    this._professionElement = document.querySelector(selectors.profession)
  }

  getUserInfo() {
    const data = {}
    data.name = this._nameElement.textContent;
    data.profession = this._professionElement.textContent;
    return data;
  }

  setUserInfo({name, profession}) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = profession;
  }
}
