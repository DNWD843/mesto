//функция показа сообщения об ошибке
function showInputError(formElement, inputElement, errorMesage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMesage;
  errorElement.classList.add('form__input-error_active');
}

//функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

//функция проверки валидности инпутов в форме
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
//фнукция проверки наличия невалидных инпутов
function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  });
}

//функция смены состояния кнопки submit
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_type_submit-inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('button_type_submit-inactive');
    buttonElement.removeAttribute('disabled');
  }
}
//функция установки слушателей на инпуты форм
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

//функция запуска проверки валидности форм
function enableValidation() {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();