export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.setEventListeners = this.setEventListeners.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOnOverlay = this._handleClickOnOverlay.bind(this);
    this._popup = document.querySelector(this._popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeIcon = this._popup.querySelector('.button_type_close');
    this._closeIcon.addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    document.activeElement.blur();
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('mousedown', this._handleClickOnOverlay);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('mousedown', this._handleClickOnOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}