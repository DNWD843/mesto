import Popup from './Popup.js';
/**
 * @module PopupConfirm
 * @description Класс PopupConfirm<br>
 * Отвечает за попап подтверждения действия
 * @param {String} popupSelector - селектор попапа подтверждения действия
 * @param {String} closeIconSelector - селектор иконки закрытия попапа
 * @param {String} isOpenedModifier - модификатор открытого состояния попапа
 * @param {String} confirmFormSelector - селектор формы попапа подтверждения действия
 * @extends Popup
 * @see {@link Popup}
 */
export default class PopupConfirm extends Popup {
  constructor(popupSelector, closeIconSelector, isOpenedModifier, confirmFormSelector) {
    super(popupSelector, closeIconSelector, isOpenedModifier);
    this._form = document.forms[confirmFormSelector];
  }

  /**
   * @description Публичный метод<br>
   * Получает коллбэк, содержащий инструкцию, что следует выполнить при сабмите формы попапа подтверждения<br>
   * @public
   * @param {Function} callback  - коллбэк, передаваемый в качестве обработчика слушателю события 'submit'. 
   * При необходимости подтверждения разных действий пользователя в коллбэке будут содержаться разные инструкции
   */
  setSubmitAction(callback) {
    this._submitAction = callback;
  }

  /**
   * @description Публичный метод<br>
   * Устанавливает слушатели событий<br>
   * @public
   */
  setEventListeners() {
    //Вызываем родительский метод setEventListeners
    super.setEventListeners();
    //Дополняем функционал родительского метода
    //Устанавливаем слушатель на событие 'submit' формы попапа подтверждения
    this._form.addEventListener('submit', (evt) => {
      //Отменяем стандартное поведение формы при сабмите 
      evt.preventDefault();
      //Устанавливаем нужное поведение - вызываем полученный коллбэк
      this._submitAction();
    });
  }
}