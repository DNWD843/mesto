import initialCards from './mocks.js';
import {
  photoCards,
  popUpEdit,
  editForm,
  nameInput,
  jobInput,
  editFormCloseButton,
  popUpAdd,
  addForm,
  placeTitleInput,
  imageLinkInput,
  addFormCloseButton,
  editButton,
  userName,
  userJob,
  addButton,
  popUpView,
  popUpViewCloseButton,
  validationConfig
} from './constants.js';
import {
  closePopup,
  openPopup
} from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const formEditValidator = new FormValidator(validationConfig, editForm);
const formAddValidator = new FormValidator(validationConfig, addForm);

//функция добавления карточки на страницу
function addCard(card, container) {
  const cardNode = new Card(card, '.card-template');
  const cardElement = cardNode.generateCard();
  container.prepend(cardElement);
}

// добавление начальных карточек на страницу
initialCards.forEach(initialCard => addCard({ title: initialCard.name, link: initialCard.link }, photoCards));

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

// Обработчик «отправки» формы редактирования профиля
function editFormSubmitHandler() {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popUpEdit);
}

// Обработчик "отправки" формы добавления фото
function addFormSubmitHandler() {
  addCard({ title: placeTitleInput.value, link: imageLinkInput.value }, photoCards);
  closePopup(popUpAdd);
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