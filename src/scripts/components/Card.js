export default class Card {
  constructor({
    data,
    handleCardClick
  }, cardSelector) {
    this._data = data;
    this._handleCardClick = handleCardClick;
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

  _handleClickLike() {
    this._likeIcon
      .classList
      .toggle('button_like-status_checked');
  }

  _handleClickDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardClick);

    this._likeIcon.addEventListener('click', () => {
      this._handleClickLike();
    });

    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._handleClickDelete();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeIcon = this._element.querySelector('.button_type_like');
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.title;
    this._element.querySelector('.card__title').textContent = this._data.title;
    this._setEventListeners();

    return this._element;
  }
}