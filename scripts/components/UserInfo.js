export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
  }

  getUserInfo() {
    this._userNameElement = document.querySelector(this._userNameSelector);
    this._userJobElement = document.querySelector(this._userJobSelector);

    return {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent
    };
  }

  setUserInfo({ name, job }) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
  }
}