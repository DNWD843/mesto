export default class {
  constructor(config, FormNode) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = FormNode;
  }

  //метод вывода сообщения об ошибке
  _showInputError(inputElement, errorMesage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMesage;
    errorElement.classList.add(this._errorClass);
  }

  //метод скрытия сообщения об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //метод проверки валидности инпутов в форме
  _isInputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //метод проверки наличия невалидных инпутов
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //метод смены состояния кнопки submit
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  //метод сброса валидации
  _resetValidation(inputList, buttonElement) {
    inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState(inputList, buttonElement);
  }

  //метод установки слушателей 
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    const openFormButton = document.querySelector(`#${this._formElement.name}-button`);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isInputValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    openFormButton.addEventListener('click', () => {
      this._resetValidation(inputList, buttonElement);
    });
  }

  //метод запуска проверки валидности форм
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}