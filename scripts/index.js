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
  validationConfig
} from './constants/constants.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';

const userData = new UserInfo('.user-profile__user-name', '.user-profile__user-job');
const formEditValidator = new FormValidator(validationConfig, editForm);
const formAddValidator = new FormValidator(validationConfig, addForm);
const viewPopup = new PopupWithImage('.popup_type_view-photo');
const editPopup = new PopupWithForm({
    formSubmitCallback: (newData) => {
      userData.setUserInfo({ name: newData[nameInput.name], job: newData[jobInput.name] });
      editPopup.close();
    }
  },
  '.popup_type_edit-profile');

const addPopup = new PopupWithForm({
    formSubmitCallback: (newData) => {
      const cardNode = new Card({
          data: { title: newData[placeTitleInput.name], link: newData[imageLinkInput.name] },
          handleCardClick: (evt) => viewPopup.open(evt)
        },
        '#card-template');
      const cardElement = cardNode.generateCard();
      cardsContainer.addItem(cardElement);
      addPopup.close();
    }
  },
  '.popup_type_add-photo');

const cardsContainer = new Section({
    items: initialCards,
    renderer: ({ title, link }) => {
      const cardNode = new Card({
          data: { title, link },
          handleCardClick: (evt) => viewPopup.open(evt)
        },
        '#card-template');
      const cardElement = cardNode.generateCard();
      cardsContainer.addItem(cardElement);
    }
  },
  '.photo__cards');

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

viewPopup.generate();
editPopup.generate();
addPopup.generate();
cardsContainer.render();