import Popup from './Popup.js';
export default class extends Popup {
  constructor({ formSubmitCallback, formSelector, formInputSelector }, popupSelector, closeIconSelector, isOpenedModifier) {
    super(popupSelector, closeIconSelector, isOpenedModifier);
    this._callback = formSubmitCallback;
    this._formSelector = formSelector;
    this._formInputSelector = formInputSelector;
  }
  _getInputValues() {
    this._obtainedValues = {};
    this._formInputsList = Array.from(this._form.querySelectorAll(this._formInputSelector));
    this._formInputsList.forEach((input) => {
      this._obtainedValues[input.name] = input.value;
    });
    return this._obtainedValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector(this._formSelector);
    this._form.addEventListener('submit', () => {
      this._callback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}