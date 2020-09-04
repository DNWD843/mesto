/**
 * @module Card
 * @description Класс Card<br>
 * Создает экземпляр элемента (карточки)<br>
 * Принимает в конструктор объект с данными для создания карточки и коллбэками, селекторы элементов карточки, идентификаторы состояния
 * @param {Object} Object  - объект с основными данными карточки и коллбэками
    @param {Object} Object.data - { title, link, id } - объект с данными карточки, необходимыми для ее создания
    @param {String} Object.data.title - название карточки
		@param {String} Object.data.link - ссылка на изображение карточки
		@param {String} Object.data.id - идентификатор карточки
    @param {Function} Object.handleCardClick - обработчик клика по изображению карточки
    @param {Function} Object.handleClickDeleteIcon - обработчик клика по иконке удаления карточки
    @param {Function} Object.setSubmitAction - коллбэк, определяющий функцию-обработчик при подтверждении удаления карточки 
    @param {Function} Object.handleClickLikeIcon - обработчик клика по иконке "лайк"
 * @param {String} cardTemplateSelector - селектор шаблона элемента карточки
 * @param {Object} cardElementsSelectors  - объект, содержащий селекторы элементов карточки
    @param {String} cardElementsSelectors.cardSelector - селектор карточки
    @param {String} cardElementsSelectors.deleteIconSelector - селектор иконки удаления 
    @param {String} cardElementsSelectors.cardImageSelector - селектор изображения карточки
    @param {String} cardElementsSelectors.likeIconSelector - селектор иконки "лайк"
    @param {String} cardElementsSelectors.cardTitleSelector - селектор элемента названия карточки
    @param {String} cardElementsSelectors.isLikedModifier - модификатор, окрашивающий "лайк" в черный цвет, если "лайк" в активном состоянии
    @param {String} cardElementsSelectors.likeCounterSelector - селектор счетчика "лайков"
    @param {String} cardElementsSelectors.delButtonEnabledSelector - селектор активного состояния иконки удаления
 * @param {Boolean} isOwner - идентификатор владельца:<br>&nbsptrue - если пользователь является владельцем карточки,<br>&nbspfalse - если пользователь не является владельцем карточки
 * @param {Boolean} isLiked - идентификатор состояния кнопки "лайк":<br>&nbsptrue - если "лайк" нажат,<br>&nbspfalse - если "лайк" не нажат
 * @param {Number} likesQuantity - число - количество "лайков", поставленных пользователями данной карточке
 */
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
    this._handleClickDeleteIcon = handleClickDeleteIcon;
    this._setSubmitAction = setSubmitAction;
    this._handleClickLikeIcon = handleClickLikeIcon;
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
    this._isLiked = isLiked;
    this._likesQuantity = likesQuantity;
    this._cardId = this._data.id;
  }

  /**
   * @description Приватный метод<br>
   * Возвращает DOM-ноду элемента из шаблона
   * @private
   */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);
    return cardElement;
  }

  /**
   * @description Приватный метод<br>
   * Устанавливает слушатели на элементы карточки:<br>
   * &nbsp клик по изображению<br>
   * &nbsp клик по иконке "лайк"<br>
   * &nbsp клик по иконке "удалить", если это карточка владельца аккаунта <br>
   * @private
   */
  _setEventListeners() {
    //Слушатель на клик по изображению
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
    //Слушатель на клик по иконке "лайк"
    this._likeIcon.addEventListener('click', () => {
      this._handleClickLikeIcon(this._cardId, this._likeIcon, this._likeCounter, this._isLikedModifier, this._isLiked);
      //Меняем состояние идентификатора isLiked карточки на противоположное, т.к. произошло нажатие на "лайк"
      //Это необходимо для корректной отрисовки карточек при обновлении страницы
      this._isLiked = !this._isLiked;
    });
    //Если пользователь является владельцем карточки, то он может ее удалять
    //Поэтому, в этом случае устанавливаем слушатель на клик по иконке "удалить"
    if (this._isOwner) {
      this._deleteIcon.addEventListener('click', () => {
        //коллбэк, который определяет непосредственно действие при подтверждении намерения удалить карточку
        //Подтверждением намерения удалить карточку служит нажатие кнопки "Да" в попапе подтверждения удаления,
        //т.е. событие submit модального окна подтверждения удаления карточки
        this._setSubmitAction(this._cardId, this._element);
        this._handleClickDeleteIcon();
      });
    }
  }

  /**
   * @description Публичный метод<br>
   * Создает и возвращает наполненный контентом элемент карточки с установленными слушателями событий
   * @public
   * @example
   * const cardElementsSelectors = {
   *   cardSelector: '.someSelector',
   *   deleteIconSelector: '.someSelector',
   *   cardImageSelector: '.someSelector',
   *   likeIconSelector: '.someSelector',
   *   cardTitleSelector: '.someSelector',
   *   isLikedModifier: 'someModifier',
   *   likeCounterSelector: '.someSelector',
   *   delButtonEnabledSelector: '.someSelector'
   * };
   * 
   * const card = new Card({
   *   data: someCardData,
   *   handleCardClick: someCallback,
   *   handleClickDeleteIcon: someCallback,
   *   setSubmitAction: someCallback,
   *   handleClickLikeIcon: someCallback
   * },
   *   cardTemplateSelector, cardElementsSelectors, isOwner, isLiked, likesQuantity
   * );
   */
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._likeIcon = this._element.querySelector(this._likeIconSelector);
    this._likeCounter = this._element.querySelector(this._likeCounterSelector);
    this._deleteIcon = this._element.querySelector(this._deleteIconSelector);
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.title;
    this._element.querySelector(this._cardTitleSelector).textContent = this._data.title;
    //Если пользователь не является владельцем карточки, иконка "удалить" ему недоступна
    if (this._isOwner) {
      this._deleteIcon.classList.add(this._delButtonEnabledSelector);
    }
    //Если пользователь "лайкал" карточку, то "лайк" будет отрисован как нажатый
    if (this._isLiked) {
      this._likeIcon.classList.add(this._isLikedModifier);
    }
    //счетчик "лайков" получает актуальное значение количества "лайков"
    this._likeCounter.textContent = this._likesQuantity;

    this._setEventListeners();
    return this._element;
  }
}