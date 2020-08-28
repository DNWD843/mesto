import './../pages/index.css';

import {
  editForm,
  nameInput,
  jobInput,
  placeTitleInput,
  imageLinkInput,
  avatarInput,
  addForm,
  userProfile,
  editButton,
  addButton,
  editAvatarForm,
  editAvatarButton,
  validationConfig,
  editPopupSelector,
  addPopupSelector,
  editAvatarPopupSelector,
  viewPopupSelector,
  confirmPopupSelector,
  cardTemplateSelector,
  containerSelector,
  placeImageSelector,
  placeNameSelector,
  userNameSelector,
  userJobSelector,
  userAvatarSelector,
  closeIconSelector,
  isOpenedModifier,
  confirmFormSelector,
  cardElementsSelectors,
  formInputSelector,
  myIdentifier,
  editFormSubmitButton,
  editAvatarFormSubmitButton,
  addFormSubmitButton
} from './constants/constants.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import Api from './components/Api.js';
import PopupConfirm from './components/PopupConfirm.js';

function preloader(submitButton, isLoading) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = submitButton.value;
  }
}

const api = new Api({
  URLs: {
    baseURL: 'https://mesto.nomoreparties.co/v1/cohort-14/',
    cardsURL: 'https://mesto.nomoreparties.co/v1/cohort-14/cards/',
    userURL: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
    likesURL: 'https://mesto.nomoreparties.co/v1/cohort-14/cards/likes/',
    avatarURL: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me/avatar'
  },
  headers: {
    "authorization": '85abb6e6-ccb0-45c7-b6e8-4ffe1f5da546'
  },
  token: '85abb6e6-ccb0-45c7-b6e8-4ffe1f5da546'
});

const confirmPopup = new PopupConfirm(confirmPopupSelector, closeIconSelector, isOpenedModifier, confirmFormSelector);
const userData = new UserInfo(userProfile, userNameSelector, userJobSelector, userAvatarSelector);
const formEditValidator = new FormValidator(validationConfig, editForm);
const formAddValidator = new FormValidator(validationConfig, addForm);
const formEditAvatarValidator = new FormValidator(validationConfig, editAvatarForm);
const viewPopup = new PopupWithImage(viewPopupSelector, closeIconSelector, isOpenedModifier, placeImageSelector, placeNameSelector);

const editPopup = new PopupWithForm({
    formSubmitCallback: (newData) => {
      preloader(editFormSubmitButton, true);
      api.editProfile({ name: newData[nameInput.name], job: newData[jobInput.name] })
        .then((resData) => {
          const { name, about: job } = resData;
          userData.setUserInfo({ name, job });
        })
        .catch((err) => { console.log(err); })
        .finally(() => {
          editPopup.close();
          preloader(editFormSubmitButton, false);
        });
    },
    formElement: editForm,
    formInputSelector: formInputSelector
  },
  editPopupSelector, closeIconSelector, isOpenedModifier);

const editAvatarPopup = new PopupWithForm({
    formSubmitCallback: (newAvatar) => {
      preloader(editAvatarFormSubmitButton, true);
      api.editAvatar(newAvatar[avatarInput.name])
        .then((res) => {
          const { name, about: job, avatar } = res;
          userData.setUserInfo({ name, job, avatar });
        })
        .catch((err) => { console.log(err); })
        .finally(() => {
          editAvatarPopup.close();
          preloader(editAvatarFormSubmitButton, false);
        });
    },
    formElement: editAvatarForm,
    formInputSelector: formInputSelector
  },
  editAvatarPopupSelector, closeIconSelector, isOpenedModifier);

function createCard(item) {
  let isOwner = false;
  let likesQuantity = item.likesArray.length;
  if (myIdentifier.id === item.owner._id) {
    isOwner = true;
  }

  let isLiked = item.likesArray.some((owner) => owner._id === myIdentifier.id);

  const cardNode = new Card({
      data: item,
      handleCardClick: (CardData) => viewPopup.open(CardData),
      handleClickDeleteIcon: () => confirmPopup.open(),
      setSubmitAction: (id, card) => confirmPopup.setSubmitAction(() => {
        //console.log(id, card);
        api.deleteCard(id)
          .then((res) => {
            card.remove();
            card = null;
          })
          .catch((err) => { console.log(err); })
          .finally(() => {
            confirmPopup.close();
          });
      }),
      handleClickLikeIcon: (id, likeIcon, likeCounter, isLikedModifier, likeChecked) => {
        if (likeChecked) {
          //console.log('likeChecked: ' + likeChecked + '  удаляю лайк');
          api.deleteLike(id)
            .then((res) => {
              likeIcon
                .classList
                .remove(isLikedModifier);
              likeCounter.textContent = res.likes.length;
            })
            .catch((err) => { console.log(err); });
        } else {
          //console.log('likeChecked: ' + likeChecked + '  добавляю лайк');
          api.loadLike(id)
            .then((res) => {
              likeIcon
                .classList
                .add(isLikedModifier);
              likeCounter.textContent = res.likes.length;
            })
            .catch((err) => { console.log(err); });
        }
      }
    },
    cardTemplateSelector,
    cardElementsSelectors,
    isOwner, isLiked, likesQuantity);

  const cardElement = cardNode.generateCard();
  return cardElement;
}

Promise.all([api.loadUserData(), api.loadCards()])
  .then(([currentUserData, cardData]) => {
    myIdentifier.id = currentUserData._id;
    const { name, about: job, avatar } = currentUserData;
    console.log(job);
    userData.setUserInfo({ name, job, avatar });

    const cardsContainer = new Section({
        items: cardData,
        renderer: (cardDataItem) => {
          const { name: title, link: link, owner: owner, _id: id, likes: likesArray } = cardDataItem;
          const card = createCard({ title, link, owner, id, likesArray });
          cardsContainer.addItem(card);
        }
      },
      containerSelector);

    const addPopup = new PopupWithForm({
        formSubmitCallback: (newCardData) => {
          preloader(addFormSubmitButton, true);
          api.addNewCard({ name: newCardData[placeTitleInput.name], link: newCardData[imageLinkInput.name] })
            .then((obtainedNewCardData) => {
              const { name: title, link: link, owner: owner, _id: id, likes: likesArray } = obtainedNewCardData;
              const card = createCard({ title, link, owner, id, likesArray });
              cardsContainer.addItem(card);
            })
            .catch((err) => { console.log(err); })
            .finally(() => {
              addPopup.close();
              preloader(addFormSubmitButton, false);
            });

        },
        formElement: addForm,
        formInputSelector: formInputSelector
      },
      addPopupSelector, closeIconSelector, isOpenedModifier);

    addPopup.setEventListeners();
    addButton.addEventListener('click', () => addPopup.open());

    cardsContainer.render();
  })
  .catch((err) => { console.log(err); });

// СЛУШАТЕЛИ НА КНОПКИ
editButton.addEventListener('click', () => {
  const { name, job } = userData.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  editPopup.open();
});

editAvatarButton.addEventListener('click', () => {
  editAvatarPopup.open();
});

//запускаем валидацию форм
formEditValidator.enableValidation();
formAddValidator.enableValidation();
formEditAvatarValidator.enableValidation();

viewPopup.setEventListeners();
editPopup.setEventListeners();
confirmPopup.setEventListeners();
editAvatarPopup.setEventListeners();