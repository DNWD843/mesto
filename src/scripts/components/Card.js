export default class Card {
  constructor({
    data,
    handleCardClick,
    handleClickDeleteIcon,
    setSubmitAction,
    handleClickLikeIcon
  }, cardTemplateSelector, cardElementsSelectors, isOwner, isLiked, likesQuantity) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardSelector = cardElementsSelectors.cardSelector;
    this._deleteIconSelector = cardElementsSelectors.deleteIconSelector;
    this._cardImageSelector = cardElementsSelectors.cardImageSelector;
    this._likeIconSelector = cardElementsSelectors.likeIconSelector;
    this._cardTitleSelector = cardElementsSelectors.cardTitleSelector;
    this._isLikedModifier = cardElementsSelectors.isLikedModifier;
    this._likeCounterSelector = cardElementsSelectors.likeCounterSelector;
    this._delButtonEnabledSelector = cardElementsSelectors.delButtonEnabledSelector;
    this._isOwner = isOwner;
    this._cardId = this._data.id;
    this._handleClickDeleteIcon = handleClickDeleteIcon;
    this._setSubmitAction = setSubmitAction;
    this._handleClickLikeIcon = handleClickLikeIcon;
    this._isLiked = isLiked;
    this._likesQuantity = likesQuantity;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });

    this._likeIcon.addEventListener('click', () => {
      this._handleClickLikeIcon(this._cardId, this._likeIcon, this._likeCounter, this._isLikedModifier, this._isLiked);
      this._isLiked = !this._isLiked;
    });

    if (this._isOwner) {
      this._deleteIcon.addEventListener('click', () => {
        this._setSubmitAction(this._cardId, this._element);
        this._handleClickDeleteIcon();
      });
    }

  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._likeIcon = this._element.querySelector(this._likeIconSelector);
    this._likeCounter = this._element.querySelector(this._likeCounterSelector);
    this._deleteIcon = this._element.querySelector(this._deleteIconSelector);
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.title;
    this._element.querySelector(this._cardTitleSelector).textContent = this._data.title;
    if (this._isOwner) {
      this._deleteIcon.classList.add(this._delButtonEnabledSelector);
    }
    if (this._isLiked) {
      this._likeIcon.classList.add(this._isLikedModifier);
    }
    this._likeCounter.textContent = this._likesQuantity;

    this._setEventListeners();
    return this._element;
  }

}