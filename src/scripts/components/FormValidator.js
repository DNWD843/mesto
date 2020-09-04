/**
 * @module FormValidator
 * @description Класс FormValidator<br>
 * Определяет логику валидации форм в модальных окнах приложения<br>
 * Для каждой формы создается свой экземпляр класса FormValidator<br>
 * Класс имеет один публичный метод, запускающий валидацию - enableValidation()<br>
 * Класс принимает в конструктор объект настроек config и DOM-ноду формы, для которой необходимо запустить валидацию
 * @param {Object} config - объект настроек валидации, содержит селекторы элементов и классы, необходимые для валидации
 * @param {String} config.inputSelector - селектор инпута формы, общий для всех инпутов
 * @param {String} config.submitButtonSelector - селектор кнопки отправки формы (submit)
 * @param {String} config.inactiveButtonClass - css класс, устанавливающй неактивное состояние кнопки submit
 * @param {String} config.inputErrorClass - css класс, устанавливающй невалидное состояние инпута
 * @param {String} config.errorClass - css класс, устанавливающй активное состояние элемента, содержащего текст ошибки
 * @param {HTMLElement} formNode - DOM-нода формы, для которой необходимо запустить валидацию
 */

export default class FormValidator {
  constructor(config, formNode) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formNode;
  }

  /**
   * @description Приватный метод<br>
   * Метод вывода сообщения об ошибке
   * @private
   * @param {HTMLElement} inputElement - инпут формы (один из нескольких или единственный)
   * @param {String} errorMesage - сообщение об ошибке
   */
  _showInputError(inputElement, errorMesage) {
    //DOM-элемент, содержащий текст ошибки, ищется и сохраняется в локальную переменную
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    //проверяемый инпут не прошел валидацию и ему добавляется класс, устанавливающий стиль для невалидного инпута
    inputElement.classList.add(this._inputErrorClass);
    //в DOM-элемент, содержащий текст ошибки, записывается текст ошибки
    errorElement.textContent = errorMesage;
    //DOM-элементу, содержащему текст ошибки, добавляется класс, устанавливающий стиль для отображения ошибки
    errorElement.classList.add(this._errorClass);
  }

  /**
   * @description Приватный метод<br>
   * Метод скрытия сообщения об ошибке
   * @private
   * @param {HTMLElement} inputElement - инпут формы (один из нескольких или единственный)
   */

  _hideInputError(inputElement) {
    //DOM-элемент, содержащий текст ошибки, ищется и сохраняется в локальную переменную
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    //проверяемый инпут прошел валидацию и у него удаляется класс, устанавливающий стиль для невалидного инпута
    inputElement.classList.remove(this._inputErrorClass);
    //у DOM-элемента, содержащего текст ошибки, удаляется класс, устанавливающий стиль для отображения ошибки
    errorElement.classList.remove(this._errorClass);
    //в DOM-элементе, содержащем текст ошибки, стирается текст ошибки - записывается пустая строка
    errorElement.textContent = '';
  }

  /**
   * @description Приватный метод<br>
   * Метод проверки валидности инпутов в форме<br>
   * Метод как бы отвечает на вопрос: этот инпут валиден?<br>
   * &nbsp Если да, то для этого инпута вызывается приватный метод скрытия ошибок _hideInputError<br>
   * &nbsp Если нет, то для этого инпута вызывается приватный метод отображения ошибок _showInputError<br>
   * @private 
   * @param {HTMLElement} inputElement - инпут формы (один из нескольких или единственный)
   */
  //
  _isInputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /**
   * @description Приватный метод<br>
   * Метод проверки наличия невалидных инпутов в форме<br>
   * Метод перебирает все инпуты формы и проверяет каждый на валидность<br>
   * Метод как бы отвечает на вопрос: в этой форме есть хотя бы один невалидный инпут?<br>
   * Возвращает true, если в форме есть хотя бы один невалидный инпут<br>
   * Возвращает false, если в форме нет ни одного невалидного инпута
   * @private 
   */
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      //Валидность инпута определяем по состоянию свойства validity объекта ValidityState
      return !inputElement.validity.valid;
    });
  }

  /**
   * @description Приватный метод<br>
   * Изменяет состояние кнопки отправки формы (submit) в зависимости от валидности или невалидности инпутов формы<br>
   * Если форма содержит хотя бы один невалидный инпут, кнопка submit становится неактивной
   * @private
   * @param {Array} inputList - массив инпутов формы
   * @param {HTMLElement} buttonElement - DOM-элемент кнопки отправки формы (submit) 
   */
  _toggleButtonState(inputList, buttonElement) {
    //Проврка наличия хотя бы одного невалидного инпута в форме
    if (this._hasInvalidInput(inputList)) {
      //Если хотя бы один невалидный инпут есть, кнопка submit становится неактивной
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      //Если все инпуты формы валидны, кнопка submit становится активной
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  /**
   * @description Приватный метод<br>
   * Метод сброса валидации<br>
   * Если пользователь заполнял форму, но передумал отправлять данные и закрыл ее, то, несмотря на очистку инпутов при открытии форм,<br>
   * в форме остаются ошибки и стили невалидных инпутов.<br>
   * Метод _resetValidation очищает форму от ошибок и невалидных стилей, оставшихся после предыдущего сеанса работы пользователя с формой
   * @private
   * @param {Array} inputList - массив инпутов формы
   * @param {HTMLElement} buttonElement - DOM-элемент кнопки отправки формы (submit)
   */
  _resetValidation(inputList, buttonElement) {
    inputList.forEach((input) => {
      //Для очистки формы от ошибок и невалидных стилей используется метод _hideInputError класса FormValidator 
      this._hideInputError(input);
    });
    //Для установки состяния кнопки submit в соответствии с текущим состоянием формы используется метод _toggleButtonState класса FormValidator
    this._toggleButtonState(inputList, buttonElement);
  }

  /**
   * @description Приватный метод<br>
   * Метод установки слушателей
   * @private
   */
  // 
  _setEventListeners() {
    //Массив инпутов формы
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    //Элемент кнопки submit
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    //Элемент кнопки, открывающей форму. 
    //Каждая форма открывается своей кнопкой. Поиск элемента кнопки производится по ее id.
    //id кнопки состоит из id формы, которую он открывает, и слова button, добавленного через дефис.
    //id формы, в свою очередь, имеет значение равное значению атрибута name этой же формы. 
    //Это позволяет создать шаблон для поиска кнопки, открывающей конкретную форму, 
    //хотя кнопка и форма не имеют никакого родства в DOM. 
    //Пример:
    //Форма в модальном окне:
    //<form class="form ..." name="add-photo-form">
    //Кнопка в блоке user-profile:
    //<button type="button" class="button ..." name="add-photo-form-button" id="add-photo-form-button">
    //Для корректной работы валидации при добавлении новых форм, необходимо придерживаться указанного порядка
    //присваивания значений атрибутов name и id в формах и открывающих их кнопках.
    const openFormButton = document.querySelector(`#${this._formElement.name}-button`);
    //Актуализируем кнопку submit  в соответствии с состоянием формы 
    this._toggleButtonState(inputList, buttonElement);
    //Перебираем все инпуты формы
    inputList.forEach((inputElement) => {
      //Устанавливаем слушатели посимвольного ввода на каждый инпут
      inputElement.addEventListener('input', () => {
        //Проверяем валидность инпута после ввода/удаления каждого символа
        this._isInputValid(inputElement);
        //Актуализируем кнопку submit формы в зависимости от валидности инпута
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    //Слушатель клика по кнопке открытия формы
    openFormButton.addEventListener('click', () => {
      //Сбрасываем "остатки" прошлой валидации перед открытием формы
      this._resetValidation(inputList, buttonElement);
    });
  }

  /**
   * @description Публичный метод<br>
   * Включает валидацию формы<br>
   * Включение валидации производится один раз.<br>
   * Далее валидация осуществляется постоянно при взаимодействии пользователя с формой
   * @public
   * @example
   * const config = {
   *  inputSelector: '.someSelector', 
   *  submitButtonSelector: '.someSelector',
   *  inactiveButtonClass: 'someClass',
   *  inputErrorClass: 'someClass',
   *  errorClass: 'someClass',
   * };
   * const editForm = document.querySelector('.someFormSelector');
   * const editFormValidator = new FormValidator(config, editForm);
   * editFormValidator.enableValidation();
   */
  enableValidation() {
    //Отменяем стандартное поведение формы при сабмите
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    //Устанавливаем слушатели событий
    this._setEventListeners();
  }
}