import Popup from './Popup.js';

/**
 * @module PopupWithImage
 * @description Класс PopupWithImage<br>
 * Отвечает за открытие и закрытие попапа с полноразмерным изображением
 * @param {String} popupSelector - селектор попапа
 * @param {String} closeIconSelector - селектор иконки закрытия попапа
 * @param {String} isOpenedModifier - css-модификатор открытого состояния попапа
 * @param {String} cardImageSelector - селектор изображения карточки
 * @param {String} cardTitleSelector - селектор элемента названия карточки
 * @extends Popup
 * @see {@link Popup}
 */
export default class PopupWithImage extends Popup {
  constructor(popupSelector, closeIconSelector, isOpenedModifier, cardImageSelector, cardTitleSelector) {
    super(popupSelector, closeIconSelector, isOpenedModifier);
    this._cardImageElement = document.querySelector(cardImageSelector);
    this._cardTitleElement = document.querySelector(cardTitleSelector);
  }

  /**
   * @description Публичный метод<br>
   * Открывает попап с полноразмерным изображением<br>
   * Метод принимает аргументом объект с данными изображения карточки
   * @param {Object} Object - объект с данными изображения карточки
   * @param {String} Object.title - название карточки
   * @param {String} Object.link - ссылка на изображение
   */
  open({ title, link }) {
    //Вызываем родительский метод
    super.open();
    //Присваиваем полученную ссылку элемнту изображения попапа
    this._cardImageElement.src = link;
    //Присваиваем полученное название элементу названия попапа
    this._cardTitleElement.textContent = title;
  }
}