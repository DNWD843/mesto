//функция показа сообщения об ошибке
function showInputError(formElement, inputElement, errorMesage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMesage;
  errorElement.classList.add(errorClass);
}

//функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//функция проверки валидности инпутов в форме
function isInputValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

//фнукция проверки наличия невалидных инпутов
function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  });
}

//функция смены состояния кнопки submit
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

//функция установки слушателей на инпуты форм
function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isInputValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

//функция очистки формы от ошибок, оставшихся после закрытия невалидной формы
/*function prepareForm(form, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const buttonSubmit = form.querySelector(submitButtonSelector);
  formInputs.forEach((input) => {
    hideInputError(form, input, inputErrorClass, errorClass);
  });
  toggleButtonState(formInputs, buttonSubmit, inactiveButtonClass);
}
*/

//функция очистки формы от ошибок, оставшихся после закрытия невалидной формы
//(т.к. валидация формы начнется только после первого нажатия на кнопку пользователем)
function clearErrors(form, inputErrorClass, errorClass, inputSelector) {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  formInputs.forEach((input) => {
    hideInputError(form, input, inputErrorClass, errorClass);
  });
}

//функция актуализации кнопки submit при открытии формы (т.к. валидация формы и контроль состояния 
//кнопки начнутся только после первого нажатия на кнопку пользователем)
function actualizeSubmitButton(form, inputSelector, submitButtonSelector, inactiveButtonClass) {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const buttonSubmit = form.querySelector(submitButtonSelector);
  toggleButtonState(formInputs, buttonSubmit, inactiveButtonClass);
}

//функция запуска проверки валидности форм
function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });

  //чтобы не пугать пользователя наличием ошибок (невалидных полей) сразу после открытия формы но до того,
  //как он что-то успел нажать, очистим формы от возможных ошибок и актуализируем кнопку submit

  // подготовка формы редактирования профиля к новой валидации
  editButton.addEventListener('click', function() {
    /*prepareForm(editForm, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass);*/
    clearErrors(editForm, inputErrorClass, errorClass, inputSelector);
    actualizeSubmitButton(editForm, inputSelector, submitButtonSelector, inactiveButtonClass);
  });

  // подготовка формы добавления фотокарточки к новой валидации
  addButton.addEventListener('click', function() {
    /*prepareForm(addForm, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass);*/
    clearErrors(addForm, inputErrorClass, errorClass, inputSelector);
    actualizeSubmitButton(addForm, inputSelector, submitButtonSelector, inactiveButtonClass);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'button_type_submit-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
});