(function() {
  'use strict';

  //найдем элемент попап
  const popUp = document.querySelector('.popup');

  //найдем кнопку Close и вешаем на нее слушатель клика на закрытие
  const closeButton = popUp.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);

  // Находим форму в DOM, она нам пригодится
  const formElement = popUp.querySelector('.popup__form');

  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  formElement.addEventListener('submit', formSubmitHandler);

  //Найдем блок с информацией пользователя
  const userInfo = document.querySelector('.user-info');

  //Находим кнопку Edit и вешаем на нее слушатель клика на открытие
  const editButton = userInfo.querySelector('.user-profile__edit-button');
  editButton.addEventListener('click', openPopup);

  /* ************** ФУНКЦИИ ********************************** */

  // Функция открытия попапа
  function openPopup() {
    popUp.classList.add('popup_opened');
    return;
  }

  //Функция поиска элемента с именем пользователя
  function getUserNameDomElement() {
    let userNameDomElement = userInfo.querySelector('.user-info__user-name');
    return userNameDomElement;
  }

  //Функция получения имени пользователя
  function getUserNameText() {
    let userNameText = getUserNameDomElement().textContent; /*userName.textContent;*/
    return userNameText;
  }

  //Функция поиска элемента с информацией "О себе"
  function getUserJobDomElement() {
    let userJobDomElement = userInfo.querySelector('.user-info__user-job');
    return userJobDomElement;
  }

  //Функция получения информации пользователя"О себе"
  function getUserJobText() {
    let userJobText = getUserJobDomElement().textContent;
    return userJobText;
  }

  //Функция поиска инпута "Имя пользователя"
  function getNameInput() {
    let nameInput = formElement.querySelector('#user-name');
    return nameInput;
  }

  //функция получения данных, введенных в инпут "Имя пользователя"
  function getNameInputValue() {
    let nameInputValue = getNameInput().value;
    return nameInputValue;
  }

  // Функция поиска инпута "О себе"
  function getJobInput() {
    let jobInput = formElement.querySelector('#user-job');
    return jobInput;
  }

  //Функция получения данных, введенных в инпут "О себе"
  function getJobInputValue() {
    let jobInputValue = getJobInput().value;
    return jobInputValue;
  }

  // Функция закрытия попапа
  function closePopup() {
    /* Пользователь решил не сохранять новые данные и нажал "крестик".
    Возможно он что-то пытался вводить и передумал сохранять,
    возможно ничего не вводил. Нам это не важно.*/
    // Закрываем окно
    popUp.classList.remove('popup_opened');

    // Подготовим инпуты к повторному вызову формы
    let nameInputToRestore = getNameInput();
    let jobInputToRestore = getJobInput();

    /* Заменим содержимое инпутов формы на то, что было до вызова попапа.
	 Даже если пользователь что-то вводил, но передумал сохранять - 
	 в полях инпутов восстановятся актуальные данные элементов со страницы */
    nameInputToRestore.value = getUserNameText();
    jobInputToRestore.value = getUserJobText();
    return;
  }


  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет
  function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Выберем элементы, куда должны быть вставлены значения полей
    let userNameElementToRewrite = getUserNameDomElement();
    let userJobElementToRewrite = getUserJobDomElement();

    // Вставим новые значения с помощью textContent
    userNameElementToRewrite.textContent = getNameInputValue();
    userJobElementToRewrite.textContent = getJobInputValue();

    //закрываем попап
    popUp.classList.remove('popup_opened');
    return;
  }
})();