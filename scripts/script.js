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


  //Переключатель попапов
  function togglePopup(popup) {
    if (popup.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
    } else { popup.classList.add('popup_opened'); }
  }

  // Переключатель лайков
  function toggleLike(evt) {
    if (evt.target.classList.contains('button_like-status_not-checked')) {
      evt.target.classList.remove('button_like-status_not-checked');
      evt.target.classList.add('button_like-status_checked');
    } else {
      evt.target.classList.remove('button_like-status_checked');
      evt.target.classList.add('button_like-status_not-checked');
    }
  }

  //Обработчик клика по фото
  function handleClickImage(evt) {
    popUpViewPlaceImage.src = evt.target.src;
    const currentCard = evt.target.closest('.card');
    popUpViewPlaceName.textContent = currentCard.querySelector('.card__title').textContent;
    togglePopup(popUpView);
    return;
  }
  // Обработчик клика по лайку
  function handleClickLike(evt) {
    toggleLike(evt);
    return;
  }
  // Обработчик клика по иконке "удалить"
  function handleClickDelete(evt) {
    evt.target.closest('.card').remove();
    return;
  }

  // Обработчик клика по кнопке "Редактировать профиль"
  function handleClickEditButton() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    togglePopup(popUpEdit);
  }

  // Обработчик клика по кнопке 
  function handleClickAddButton() {
    placeTitleInput.value = '';
    imageLinkInput.value = '';
    togglePopup(popUpAdd);
  }
  //функция создания новой карты
  function createCard(title, link) {
    const newCard = photoCardTemplate.cloneNode(true);
    const newCardImage = newCard.querySelector('.card__image');
    const newCardLikeButton = newCard.querySelector('.button_type_like');
    const newCardDeleteButton = newCard.querySelector('.button_type_delete');
    newCard.querySelector('.card__title').textContent = title;
    newCardImage.src = link;
    newCardImage.addEventListener('click', handleClickImage);
    newCardLikeButton.addEventListener('click', handleClickLike);
    newCardDeleteButton.addEventListener('click', handleClickDelete);
    return newCard;
  }
  // Функция добавления новой карты на страницу
  function addCard(card, container) {
    const cardNode = createCard(card.title, card.link);
    container.prepend(cardNode);
    return;
  }
  // добавление начальных карточек на страницу
  initialCards.forEach(initialCard => addCard({ title: initialCard.name, link: initialCard.link }, photoCards));

  // Обработчик «отправки» формы редактирования профиля
  function editFormSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    togglePopup(popUpEdit);
    return;
  }

  // Обработчик "отправки" формы добавления фото
  function addFormSubmitHandler(evt) {
    evt.preventDefault();
    addCard({ title: placeTitleInput.value, link: imageLinkInput.value }, photoCards);
    togglePopup(popUpAdd);
    return;
  }


  // СЛУШАТЕЛИ НА КНОПКИ и ФОРМЫ
  editButton.addEventListener('click', handleClickEditButton);

  editFormCloseButton.addEventListener('click', function() {
    togglePopup(popUpEdit);
  });

  editForm.addEventListener('submit', editFormSubmitHandler);

  addButton.addEventListener('click', handleClickAddButton);

  addFormCloseButton.addEventListener('click', function() {
    togglePopup(popUpAdd);
  });

  addForm.addEventListener('submit', addFormSubmitHandler);

  popUpViewCloseButton.addEventListener('click', function() {
    togglePopup(popUpView);
  });

})();