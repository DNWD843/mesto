import Popup from './Popup.js';

/**
 * @module PopupWithForm
 * @description Класс PopupWithForm<br>
 * Отвечает за попап с формой<br>
 * Для каждой формы создается свой экземпляр класса PopupWithForm
 * @param {Object} Object - объект с основными параметрами
 * @param {Function} Object.formSubmitCallback - коллбэк сабмита формы
 * @param {HTMLElement} Object.formElement - DOM-элемент формы
 * @param {String} Object.formInputSelector - селектор инпута формы, общий для всех инпутов формы
 * @param {String} popupSelector - селектор попапа
 * @param {String} closeIconSelector - селектор иконки закрытия попапа
 * @param {String} isOpenedModifier - css-модификатор открытого состояния попапа
 * @extends Popup
 * @see {@link Popup}
 */
export default class PopupWithForm extends Popup {
  constructor({ formSubmitCallback, formElement, formInputSelector }, popupSelector, closeIconSelector, isOpenedModifier) {
    super(popupSelector, closeIconSelector, isOpenedModifier);
    this._callback = formSubmitCallback;
    this._form = formElement;
    this._formInputSelector = formInputSelector;
  }

  /**
   * @description Приватный метод<br>
   * Собирает значения инпутов формы и возвращает их в виде объекта, в котором ключами к значению инпутов
   * служат имена инпутов - значения атрибута name инпутов<br>
   * {input.name: input.value, input.name: input.value};
   * @private
   * @returns {Object} - объект со значениями инпутов
   */
  _getInputValues() {
    this._obtainedValues = {};
    this._formInputsList = Array.from(this._form.querySelectorAll(this._formInputSelector));
    this._formInputsList.forEach((input) => {
      this._obtainedValues[input.name] = input.value;
    });
    //Возвращает объект со значениями инпутов
    return this._obtainedValues;
  }

  /**
   * @description Публичный метод<br>
   * Устанавливает слушатели событий 
   * @public
   */
  setEventListeners() {
    //Вызываем родительский метод
    super.setEventListeners();
    //Дополняем родительский метод установкой слушателя на submit формы
    this._form.addEventListener('submit', () => {
      //Вызываем полученный колбэк сабмита и передаем ему результат приватного метода _getInputValues
      // - объект со значениями инпутов формы
      this._callback(this._getInputValues());
    });
  }

  /**
   * @description Публичный метод<br>
   * Закрывает попап
   * @public
   */
  close() {
    //Вызываем родительский метод
    super.close();
    //Дополняем родительский метод сбросом формы после закрытия попапа
    this._form.reset();
  }
}