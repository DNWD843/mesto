<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> 7f51fd88894c385bcef447a1835bb2f13ebad69f
(function() {
  'use strict';

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
  const photoCards = document.querySelector('.photo__cards'); //блок куда будем вставлять карточки
  const photoCardTemplate = document.querySelector('#photo-card').content; //шаблон

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

  const popUpView = document.querySelector('.popup_type_view-photo');
  const popUpViewPlaceImage = popUpView.querySelector('.popup__place-image');
  const popUpViewPlaceName = popUpView.querySelector('.popup__place-name');
  const popUpViewCloseButton = popUpView.querySelector('.popup__close-photo-button');

  function handleClickImage(evt) {
    openPopup(evt);
    return;
  }

  function handleClickLike(evt) {
    if (evt.target.classList.contains('button_like-status_not-checked')) {
      evt.target.classList.remove('button_like-status_not-checked');
      evt.target.classList.add('button_like-status_checked');
    } else {
      evt.target.classList.remove('button_like-status_checked');
      evt.target.classList.add('button_like-status_not-checked');
    }
    return;
  }

  function handleClickDelete(evt) {
    evt.target.closest('.card').remove();
    return;
  }

  initialCards.forEach(function(initialCard) {
    const initPhotoCard = photoCardTemplate.cloneNode(true);
    const initPhotoCardImage = initPhotoCard.querySelector('.card__image');
    const initPhotoCardLike = initPhotoCard.querySelector('.button_type_like');
    const initPhotoCardDelete = initPhotoCard.querySelector('.button_type_delete');

    initPhotoCardImage.src = initialCard.link;
    initPhotoCard.querySelector('.card__title').textContent = initialCard.name;

    initPhotoCardImage.addEventListener('click', handleClickImage);
    initPhotoCardLike.addEventListener('click', handleClickLike);
    initPhotoCardDelete.addEventListener('click', handleClickDelete);

    photoCards.prepend(initPhotoCard);
    return;
  });

  // Функция открытия попапов
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
      case 'photo':
        popUpViewPlaceImage.src = evt.target.src;
        const currentCard = evt.target.closest('.card');
        popUpViewPlaceName.textContent = currentCard.querySelector('.card__title').textContent;
        popUpView.classList.add('popup_opened');
        break;
    }
    return;
  }

  // Функция закрытия попапа
  function closePopup(Popup) {
    Popup.classList.remove('popup_opened');
    return;
  }

  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function editFormSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popUpEdit);
    return;
  }

  function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const newPhotoCard = photoCardTemplate.cloneNode(true);
    const newPhotoCardImage = newPhotoCard.querySelector('.card__image');
    const newPhotoCardLike = newPhotoCard.querySelector('.button_type_like');
    const newPhotoCardDelete = newPhotoCard.querySelector('.button_type_delete');

    newPhotoCardImage.src = `${imageLinkInput.value}`;
    newPhotoCard.querySelector('.card__title').textContent = `${placeTitleInput.value}`;

    newPhotoCardImage.addEventListener('click', handleClickImage);
    newPhotoCardLike.addEventListener('click', handleClickLike);
    newPhotoCardDelete.addEventListener('click', handleClickDelete);

    photoCards.prepend(newPhotoCard);
    closePopup(popUpAdd);
    return;
  }

  editButton.addEventListener('click', openPopup);
  editFormCloseButton.addEventListener('click', function() {
    closePopup(popUpEdit);
  });
  editForm.addEventListener('submit', editFormSubmitHandler);

  addButton.addEventListener('click', openPopup);
  addFormCloseButton.addEventListener('click', function() {
    closePopup(popUpAdd);
  });
  addForm.addEventListener('submit', addFormSubmitHandler);

  popUpViewCloseButton.addEventListener('click', function() {
    closePopup(popUpView);
  });

<<<<<<< HEAD
=======
>>>>>>> develop
>>>>>>> 7f51fd88894c385bcef447a1835bb2f13ebad69f
})();