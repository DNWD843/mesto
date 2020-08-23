import Popup from './Popup.js';


export default class PopupConfirm extends Popup {
  constructor(popupSelector, closeIconSelector, isOpenedModifier, confirmFormSelector) {
    super(popupSelector, closeIconSelector, isOpenedModifier);
    this._form = document.forms[confirmFormSelector];
  }

  setSubmitAction(callback) {
    this._submitAction = callback;

  }


  setEventListeners() {

    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAction();
    });
  }
}