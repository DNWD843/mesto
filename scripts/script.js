(function() {
  'use strict';

  // ***************************************************************************  
  // ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ 
  const popUp = document.querySelector('.popup');
  const closeButton = popUp.querySelector('.popup__close-button');

  const formElement = popUp.querySelector('.popup__form');
  const nameInput = formElement.querySelector('.edit-form__input_type_name');
  const jobInput = formElement.querySelector('.edit-form__input_type_job');

  const userInfo = document.querySelector('.user-profile__user-info');
  const editButton = userInfo.querySelector('.user-profile__edit-button');
  const userName = userInfo.querySelector('.user-profile__user-name');
  const userJob = userInfo.querySelector('.user-profile__user-job');


  // Функция открытия попапа
  function openPopup() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    popUp.classList.add('popup_opened');
    return;
  }

  // Функция закрытия попапа
  function closePopup() {
    popUp.classList.remove('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    return;
  }

  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
    return;
  }

  editButton.addEventListener('click', openPopup);
  closeButton.addEventListener('click', closePopup);
  formElement.addEventListener('submit', formSubmitHandler);

  // *********************************************************************************
  //КНОПКА ЛАЙК
  const photoCards = document.querySelector('.photo__cards');
  const likeButtons = photoCards.querySelectorAll('.button_type_like');

  function toggleLike(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains('button_like-status_not-checked')) {
      eventTarget.classList.remove('button_like-status_not-checked');
      eventTarget.classList.add('button_like-status_checked');
    } else {
      eventTarget.classList.remove('button_like-status_checked');
      eventTarget.classList.add('button_like-status_not-checked');
    }
  }
  likeButtons.forEach(button => button.addEventListener('click', toggleLike));
  // ************************************************************************************




})();