/**
 * @module Popup
 * @description Класс Popup<br>
 * Отвечает за открытие и закрытие модальных окон (попапов)<br>
 * @param {String} popupSelector - селектор попапа
 * @param {String} closeIconSelector - селектор иконки закрытия попапа
 * @param {String} isOpenedModifier - css-модификатор, управляющий видимостью попапа.<br>Присваивается попапу, когда нужно открыть попап.
 */

export default class Popup {
  constructor(popupSelector, closeIconSelector, isOpenedModifier) {
      this._popupSelector = popupSelector;
      this._closeIconSelector = closeIconSelector;
      this.setEventListeners = this.setEventListeners.bind(this);
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this._handleEscClose = this._handleEscClose.bind(this);
      this._handleClickOnOverlay = this._handleClickOnOverlay.bind(this);
      this._popup = document.querySelector(this._popupSelector);
      this._closeIcon = this._popup.querySelector(this._closeIconSelector);
      this._isOpenedModifier = isOpenedModifier;
    }
    /**
     * @description Приватный метод<br>
     * Обработчик нажатия на клавишу Escape<br>
     * Закрывает открытый попап при нажатии на Escape
     * @private
     * @param {Event} evt - событие
     */
  _handleEscClose(evt) {
    //Если нажата клавиша Escape, закрыть попап
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  /**
   * @description Приватный метод<br>
   * Обработчик клика по оверлею<br>
   * Закрывает открытый попап, если произошел клик по оверлею
   * @private
   * @param {Event} evt - событие
   */
  _handleClickOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  /**
   * @description Публичный метод<br>
   * Устанавливает слушатели событий<br>
   * @public
   */
  setEventListeners() {
    //Устанавливает слушатель события 'клик' на иконку закрытия попапа
    this._closeIcon.addEventListener('click', () => {
      //Если клик по иконке закрытия попапа произошел - закрыть попап
      this.close();
    });
  }

  /**
   * @description Публичный метод<br>
   * Открывает попап<br>
   * @public
   */
  open() {
    //Снимаем фокус с кнопки открытия попапа
    document.activeElement.blur();
    //Добавляем попапу модификатор открытого состояния
    this._popup.classList.add(this._isOpenedModifier);
    //Устанавливаем слушатель события "клик по оверлею"
    this._popup.addEventListener('mousedown', this._handleClickOnOverlay);
    //Устанавливаем слушатель события 'нажатие на клавишу Escape'
    document.addEventListener('keydown', this._handleEscClose);
  }

  /**
   * @description Публичный метод<br>
   * Закрывает попап<br>
   * @public
   */
  close() {
    //Удаляем модификатор открытого состояния
    this._popup.classList.remove(this._isOpenedModifier);
    //Снимаем слушатель события "клик по оверлею"
    this._popup.removeEventListener('mousedown', this._handleClickOnOverlay);
    //Снимаем слушатель события 'нажатие на клавишу Escape'
    document.removeEventListener('keydown', this._handleEscClose);
  }
}