import Popup from './Popup.js';
export default class extends Popup {
  constructor({ formSubmitCallback }, popupSelector) {
    super(popupSelector);
    this._callback = formSubmitCallback;
  }
  _getInputValues() {
    this._obtainedValues = {};
    this._formInputsList = Array.from(this._form.querySelectorAll('.form__input'));
    this._formInputsList.forEach((input) => {
      this._obtainedValues[input.name] = input.value;
    });
    return this._obtainedValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form = this._popup.querySelector('.form');
    this._form.addEventListener('submit', () => {
      this._callback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}