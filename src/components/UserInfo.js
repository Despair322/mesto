export default class UserInfo {
  constructor(selectors) {
    this._nameElement = document.querySelector(selectors.name);
    this._professionElement = document.querySelector(selectors.profession)
    this._avatar = document.querySelector(selectors.avatar)
  }

  getUserInfo() {
    const data = {}
    data.name = this._nameElement.textContent;
    data.profession = this._professionElement.textContent;
    data.avatar = this._avatar.url;
    return data;
  }

  getName() {
    return this._nameElement.textContent;
  }

  setOwner(id) {
    if (!this.id) {
      this.id = id;
    }
    else {
      throw new Error('Пользователь уже установлен');
    }
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = about;
    this.setAvatar(avatar);
  }
}
