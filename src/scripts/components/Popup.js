export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.setEventListeners = this.setEventListeners.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
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
    this._popup.addEventListener('mousedown', (evt) => {
      this._handleClickOnOverlay(evt);
    });

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }
  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('mousedown', (evt) => {
      this._handleClickOnOverlay(evt);
    });
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }
}