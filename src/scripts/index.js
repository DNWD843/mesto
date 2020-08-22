import './../pages/index.css';
import initialCards from './constants/mocks.js';
import {
  editForm,
  nameInput,
  jobInput,
  placeTitleInput,
  imageLinkInput,
  addForm,
  editButton,
  addButton,
  validationConfig,
  editPopupSelector,
  addPopupSelector,
  viewPopupSelector,
  cardTemplateSelector,
  containerSelector,
  placeImageSelector,
  placeNameSelector,
  userNameSelector,
  userJobSelector,
  closeIconSelector,
  isOpenedModifier,
  cardElementsSelectors,
  formInputSelector
} from './constants/constants.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';

function renderCard({ title, link }) {
  const cardNode = new Card({
      data: { title, link },
      handleCardClick: (CardData) => viewPopup.open(CardData)
    },
    cardTemplateSelector, cardElementsSelectors);
  const cardElement = cardNode.generateCard();
  cardsContainer.addItem(cardElement);
}

const userData = new UserInfo(userNameSelector, userJobSelector);
const formEditValidator = new FormValidator(validationConfig, editForm);
const formAddValidator = new FormValidator(validationConfig, addForm);
const viewPopup = new PopupWithImage(viewPopupSelector, closeIconSelector, isOpenedModifier, placeImageSelector, placeNameSelector);
const editPopup = new PopupWithForm({
    formSubmitCallback: (newData) => {
      userData.setUserInfo({ name: newData[nameInput.name], job: newData[jobInput.name] });
    },
    formElement: editForm,
    formInputSelector: formInputSelector
  },
  editPopupSelector, closeIconSelector, isOpenedModifier);

const addPopup = new PopupWithForm({
    formSubmitCallback: (newData) => {
      renderCard({ title: newData[placeTitleInput.name], link: newData[imageLinkInput.name] });
    },
    formElement: addForm,
    formInputSelector: formInputSelector
  },
  addPopupSelector, closeIconSelector, isOpenedModifier);

const cardsContainer = new Section({
    items: initialCards,
    renderer: ({ title, link }) => {
      renderCard({ title, link });
    }
  },
  containerSelector);

// СЛУШАТЕЛИ НА КНОПКИ
editButton.addEventListener('click', () => {
  const { name, job } = userData.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  editPopup.open();
});

addButton.addEventListener('click', () => addPopup.open());

//запускаем валидацию форм
formEditValidator.enableValidation();
formAddValidator.enableValidation();

viewPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
cardsContainer.render();