const photoCards = document.querySelector('.photo__cards'); //блок куда будем вставлять карточки
const photoCardTemplate = document.querySelector('#photo-card').content; //шаблон

const popUpEdit = document.querySelector('.popup_type_edit-profile');
const editForm = document.forms['edit-profile-form'];
const nameInput = editForm.elements['user-name-input'];
const jobInput = editForm.elements['user-job-input'];
const editFormCloseButton = popUpEdit.querySelector('.button_close_edit-profile');

const popUpAdd = document.querySelector('.popup_type_add-photo');
const addForm = document.forms['add-photo-form'];
const placeTitleInput = addForm.elements['place-title-input'];
const imageLinkInput = addForm.elements['image-link-input'];
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

const overlaysList = Array.from(document.querySelectorAll('.page__overlay'));

//функция открытия попапа
function openPopup(popup) {
  document.activeElement.blur();
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleClickOnOverlay);
  document.addEventListener('keydown', handlePressEscapeButton);
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleClickOnOverlay);
  document.removeEventListener('keydown', handlePressEscapeButton);
}

//обработчик нажатия на Esc
function handlePressEscapeButton(evt) {
  if (evt.key === 'Escape') {
    overlaysList.forEach((overlay) => {
      if (overlay.classList.contains('popup_opened')) {
        closePopup(overlay);
      }
    });
  }
}

//обработчик клика по оверлею
function handleClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Переключатель лайков
function toggleLike(evt) {
  evt.target.classList.toggle('button_like-status_checked');
  evt.target.classList.toggle('button_like-status_not-checked');
}

//Обработчик клика по фото
function handleClickImage(evt) {
  popUpViewPlaceImage.src = evt.target.src;
  const currentCard = evt.target.closest('.card');
  popUpViewPlaceName.textContent = currentCard.querySelector('.card__title').textContent;
  openPopup(popUpView);
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
  openPopup(popUpEdit);
}

// Обработчик клика по кнопке "Добавить фото"
function handleClickAddButton() {
  addForm.reset();
  openPopup(popUpAdd);
}

//функция создания новой карты
function createCard(title, link) {
  const newCard = photoCardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardLikeButton = newCard.querySelector('.button_type_like');
  const newCardDeleteButton = newCard.querySelector('.button_type_delete');
  newCard.querySelector('.card__title').textContent = title;
  newCardImage.src = link;
  newCardImage.alt = title;
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
function editFormSubmitHandler() {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popUpEdit);
  return;
}

// Обработчик "отправки" формы добавления фото
function addFormSubmitHandler() {
  addCard({ title: placeTitleInput.value, link: imageLinkInput.value }, photoCards);
  closePopup(popUpAdd);
  return;
}

// СЛУШАТЕЛИ НА КНОПКИ и ФОРМЫ
editButton.addEventListener('click', handleClickEditButton);

editFormCloseButton.addEventListener('click', () => {
  closePopup(popUpEdit);
});

editForm.addEventListener('submit', editFormSubmitHandler);

addButton.addEventListener('click', handleClickAddButton);

addFormCloseButton.addEventListener('click', () => {
  closePopup(popUpAdd);
});

addForm.addEventListener('submit', addFormSubmitHandler);

popUpViewCloseButton.addEventListener('click', () => {
  closePopup(popUpView);
});