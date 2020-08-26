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
    this._closeIcon.addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    document.activeElement.blur();
    this._popup.classList.add(this._isOpenedModifier);
    this._popup.addEventListener('mousedown', this._handleClickOnOverlay);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._isOpenedModifier);
    this._popup.removeEventListener('mousedown', this._handleClickOnOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}