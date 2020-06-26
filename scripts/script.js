(function() {
  'use strict';

  // ***************************************************************************  
  // ДОБАВЛЯЕМ НАЧАЛЬНЫЕ 6 КАРТОЧЕК, ИСПОЛЬЗУЯ ШАБЛОН
  const initialCards = [{
      name: 'Центральный ЗАГС',
      link: './images/zags.jpg',
    },
    {
      name: 'Набережная р.Казанка',
      link: './images/red-bull.jpg',
    },
    {
      name: 'Мечеть Кул-Шариф',
      link: './images/kul-sharif.jpg',
    },
    {
      name: 'Дворец земледельцев',
      link: './images/palace-of-farmers.jpg',
    },
    {
      name: 'Казанский кремль',
      link: './images/kremlin.jpg',
    },
    {
      name: 'Казань',
      link: './images/kazan.jpg',
    },
  ];
  const photoCards = document.querySelector('.photo__cards');
  const photoCardTemplate = document.querySelector('#photo-card').content;
  initialCards.forEach(function(initialCard) {
    const initPhotoCard = photoCardTemplate.cloneNode(true);
    initPhotoCard.querySelector('.card__image').src = initialCard.link;
    initPhotoCard.querySelector('.card__title').textContent = initialCard.name;
    photoCards.prepend(initPhotoCard);
  });

  // ************************************************************************************
  // РАБОТА С ФОРМАМИ РЕДАКТИРОВАНИЯ ПРОФИЛЯ И ДОБАВЛЕНИЯ ФОТО
  const popUpEdit = document.querySelector('.popup_type_edit-profile');
  const editForm = popUpEdit.querySelector('.form_type_edit');
  const nameInput = editForm.querySelector('.form__input_type_name');
  const jobInput = editForm.querySelector('.form__input_type_job');
  const editFormCloseButton = popUpEdit.querySelector('.button_close_edit-profile');

  const popUpAdd = document.querySelector('.popup_type_add-photo');
  const addForm = popUpAdd.querySelector('.form_type_add');
  const placeTitleInput = addForm.querySelector('.form__input_type_place-title');
  const imageLinkInput = addForm.querySelector('.form__input_type_image-link');
  const addFormCloseButton = popUpAdd.querySelector('.button_close_add-photo');

  const userProfile = document.querySelector('.user-profile');
  const editButton = userProfile.querySelector('.user-profile__edit-button');
  const userName = userProfile.querySelector('.user-profile__user-name');
  const userJob = userProfile.querySelector('.user-profile__user-job');
  const addButton = userProfile.querySelector('.user-profile__add-button');

  const popupsList = Array.from(document.querySelectorAll('.popup'));

  // Функция открытия попапа
  function openPopup(evt) {
    switch (evt.target.name) {
      case 'edit-profile-button':
        nameInput.value = userName.textContent;
        jobInput.value = userJob.textContent;
        popUpEdit.classList.add('popup_opened');
        break;
      case 'add-photo-button':
        placeTitleInput.value = '';
        imageLinkInput.value = '';
        popUpAdd.classList.add('popup_opened');
        break;
    }
  }

  // Функция закрытия попапа
  function closePopup() {
    popupsList.forEach(function(popup) {
      if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
      }
    });
    return;
  }

  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function editFormSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
  }

  function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const newPhotoCard = photoCardTemplate.cloneNode(true);
    newPhotoCard.querySelector('.card__image').src = `${imageLinkInput.value}`;
    newPhotoCard.querySelector('.card__title').textContent = `${placeTitleInput.value}`;
    photoCards.prepend(newPhotoCard);
    closePopup();
  }

  editButton.addEventListener('click', openPopup);
  editFormCloseButton.addEventListener('click', closePopup);
  editForm.addEventListener('submit', editFormSubmitHandler);

  addButton.addEventListener('click', openPopup);
  addFormCloseButton.addEventListener('click', closePopup);
  addForm.addEventListener('submit', addFormSubmitHandler);

  // ************************************************************************************
  //КНОПКИ ЛАЙК и DELETE
  photoCards.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('button_type_like')) {
      if (evt.target.classList.contains('button_like-status_not-checked')) {
        evt.target.classList.remove('button_like-status_not-checked');
        evt.target.classList.add('button_like-status_checked');
      } else {
        evt.target.classList.remove('button_like-status_checked');
        evt.target.classList.add('button_like-status_not-checked');
      }
    } else if (evt.target.classList.contains('button_type_delete')) {
      evt.target.closest('.card').remove();
    }
    return;
  });
  // ***********************************************************************************






})();