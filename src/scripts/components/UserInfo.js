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

  setUserInfo(userData) {
    this._userNameElement.textContent = userData.name;
    this._userJobElement.textContent = userData.job;
    if (userData.avatar) {
      this._userAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
    }
  }
}