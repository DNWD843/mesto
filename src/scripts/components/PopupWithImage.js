import Popup from './Popup.js';
export default class extends Popup {
  constructor(popupSelector, cardImageSelector, cardTitleSelector) {
    super(popupSelector);
    this._cardImageElement = document.querySelector(cardImageSelector);
    this._cardTitleElement = document.querySelector(cardTitleSelector);
  }

  open({ title, link }) {
    super.open();
    this._cardImageElement.src = link;
    this._cardTitleElement.textContent = title;
  }
}