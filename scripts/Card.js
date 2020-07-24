import { popUpView, popUpViewPlaceImage, popUpViewPlaceName } from './constants.js';
import { openPopup } from './utils.js';
export default class {
  constructor(data, cardSelector) {
    this._name = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleClickImage() {
    popUpViewPlaceImage.src = this._link;
    popUpViewPlaceName.textContent = this._name;
    openPopup(popUpView);
  }

  _handleClickLike() {
    this._element
      .querySelector('.button_type_like')
      .classList
      .toggle('button_like-status_checked');
  }

  _handleClickDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleClickImage();
    });
    this._element.querySelector('.button_type_like').addEventListener('click', () => {
      this._handleClickLike();
    });
    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._handleClickDelete();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}