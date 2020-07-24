import Card from './Card.js';
import initialCards from './mocks.js';
import FormValidator from './FormValidator.js';

const photoCards = document.querySelector('.photo__cards'); //блок куда будем вставлять карточки

const popUpEdit = document.querySelector('.popup_type_edit-profile');
export const editForm = document.forms['edit-profile-form'];
const nameInput = editForm.elements['user-name-input'];
const jobInput = editForm.elements['user-job-input'];
const editFormCloseButton = popUpEdit.querySelector('.button_close_edit-profile');

const popUpAdd = document.querySelector('.popup_type_add-photo');
export const addForm = document.forms['add-photo-form'];
const placeTitleInput = addForm.elements['place-title-input'];
const imageLinkInput = addForm.elements['image-link-input'];
const addFormCloseButton = popUpAdd.querySelector('.button_close_add-photo');

const userProfile = document.querySelector('.user-profile');
const editButton = userProfile.querySelector('.user-profile__edit-button');
const userName = userProfile.querySelector('.user-profile__user-name');
const userJob = userProfile.querySelector('.user-profile__user-job');
const addButton = userProfile.querySelector('.user-profile__add-button');

export const popUpView = document.querySelector('.popup_type_view-photo');
export const popUpViewPlaceImage = popUpView.querySelector('.popup__place-image');
export const popUpViewPlaceName = popUpView.querySelector('.popup__place-name');
const popUpViewCloseButton = popUpView.querySelector('.popup__close-photo-button');

const overlaysList = Array.from(document.querySelectorAll('.page__overlay'));

const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'button_type_submit-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

const formEditValidator = new FormValidator(validationConfig, editForm);
const formAddValidator = new FormValidator(validationConfig, addForm);

//функция открытия попапа
export function openPopup(popup) {
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

//функция добавления карточки на страницу
function addCard(card, container) {
  const cardNode = new Card(card, '.card-template');
  const cardElement = cardNode.generateCard();
  container.prepend(cardElement);

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

//запускаем валидацию форм
formEditValidator.enableValidation();
formAddValidator.enableValidation();