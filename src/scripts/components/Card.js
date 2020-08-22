export default class Card {
  constructor({
    data,
    handleCardClick,
  }, cardTemplateSelector, cardElementsSelectors, isOwner) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardSelector = cardElementsSelectors.cardSelector;
    this._deleteIconSelector = cardElementsSelectors.deleteIconSelector;
    this._cardImageSelector = cardElementsSelectors.cardImageSelector;
    this._likeIconSelector = cardElementsSelectors.likeIconSelector;
    this._cardTitleSelector = cardElementsSelectors.cardTitleSelector;
    this._isLikedModifier = cardElementsSelectors.isLikedModifier;
    this._isOwner = isOwner;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _handleClickLike() {
    this._likeIcon
      .classList
      .toggle(this._isLikedModifier);
  }

  _handleClickDelete() {
    this._element.remove();
    this._element = null;
  }
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });

    this._likeIcon.addEventListener('click', () => {
      this._handleClickLike();
    });
    if (this._isOwner) {
      this._deleteIcon.addEventListener('click', () => {
        this._handleClickDelete();
      });
    }



  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._likeIcon = this._element.querySelector(this._likeIconSelector);
    this._deleteIcon = this._element.querySelector(this._deleteIconSelector);
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.title;
    this._element.querySelector(this._cardTitleSelector).textContent = this._data.title;
    if (this._isOwner) {
      this._deleteIcon.classList.add('card__delete-button_enabled');
    }
    this._setEventListeners();

    return this._element;
  }
}