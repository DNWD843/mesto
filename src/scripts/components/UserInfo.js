export default class UserInfo {
  constructor(userProfileNode, userNameSelector, userJobSelector, userAvatarSelector) {
    this._userNameElement = userProfileNode.querySelector(userNameSelector);
    this._userJobElement = userProfileNode.querySelector(userJobSelector);
    this._userAvatarElement = userProfileNode.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
    if (avatar) {
      this._userAvatarElement.style.backgroundImage = `url(${avatar})`;
    }
  }
}