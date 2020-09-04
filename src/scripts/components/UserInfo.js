/**
 * @module UserInfo
 * @description Класс UserInfo<br>
 * Обрабатывает информацию о пользователе<br>
 * Принимает в конструктор параметры для работы с данными пользователя на странице
 * @param {HTMLElement} userProfileNode - DOM-элемент, описывающий профиль пользователя
 * @param {String} userNameSelector - селектор элемента, содержащего имя пользователя 
 * @param {String} userJobSelector - селектор элемента, содержащего информацию о пользователе
 * @param {String} userAvatarSelector - селектор элемента, содержащего аватар пользователя
 * @example
 * const userData = new UserInfo(userProfile, userNameSelector, userJobSelector, userAvatarSelector);
 */
export default class UserInfo {
  constructor(userProfileNode, userNameSelector, userJobSelector, userAvatarSelector) {
    this._userNameElement = userProfileNode.querySelector(userNameSelector);
    this._userJobElement = userProfileNode.querySelector(userJobSelector);
    this._userAvatarElement = userProfileNode.querySelector(userAvatarSelector);
  }

  /**
   * @description Публичный метод<br>Возвращает текущую информацию о пользователе, отображенную на странице
   * @public
   * @returns {Object}
   * {name, job} - объект с информацией о пользователе<br>
   * &nbsp{string} object.name - имя пользователя <br>
   * &nbsp{string} object.job - информация о пользователе
   * @example
   * const currentUserInfo = userData.getUserInfo();
   */
  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent
    };
  }

  /**
   * @description Публичный метод<br>Размещает новые данные пользователя на странице<br>
   * Принимает на вход объект {name, job, avatar} - содержащий новые данные о пользователе
   * @public
   * @param {Object} Object {name, job, avatar}
   * @param {String} Object.name - новое имя пользователя
   * @param {String} Object.job - новая информация о пользователе
   * @param {String} Object.avatar - новая ссылка на аватар
   * @example
   * const newUserInfo = userData.setUserInfo({name, job, avatar});
   */
  setUserInfo({ name, job, avatar }) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
    //Если avatar передан в объекте, то прописываем пользователю новый аватар
    if (avatar) {
      this._userAvatarElement.style.backgroundImage = `url(${avatar})`;
    }
  }
}