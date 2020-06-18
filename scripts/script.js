(function() {
  'use strict';

  //найдем элемент попап
  const popUp = document.querySelector('.popup');

  //найдем кнопку Close и вешаем на нее слушатель клика на закрытие
  const closeButton = popUp.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);

  // Находим форму и прикрепляем обработчик к форме
  const formElement = popUp.querySelector('.popup__form');
  formElement.addEventListener('submit', formSubmitHandler);

  //Найдем блок с информацией пользователя
  const userInfo = document.querySelector('.user-profile__user-info');

  //Находим кнопку Edit и вешаем на нее слушатель клика на открытие
  const editButton = userInfo.querySelector('.user-profile__edit-button');
  editButton.addEventListener('click', openPopup);

  // Имя пользователя
  const userName = userInfo.querySelector('.user-profile__user-name');

  // О себе
  const userJob = userInfo.querySelector('.user-profile__user-job');

  // инпут Имя пользователя
  const nameInput = formElement.querySelector('.edit-form__input_type_name');

  // инпут О себе
  const jobInput = formElement.querySelector('.edit-form__input_type_job');

  /* ************** ФУНКЦИИ ********************************** */

  // Функция открытия попапа
  function openPopup() {
    //Наполняем инпуты актуальным содержимым
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    //открываем окно
    popUp.classList.add('popup_opened');
    return;
  }

  // Функция закрытия попапа
  function closePopup() {
    // Закрываем окно
    popUp.classList.remove('popup_opened');
    //приводим инпуты в исходное состояние
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    return;
  }

  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // отправляем на страницу внесенные правки
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    //вызываем функцию закрытия окна
    closePopup();
    return;
  }
})();