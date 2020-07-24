export const photoCards = document.querySelector('.photo__cards'); //блок куда будем вставлять карточки

export const popUpEdit = document.querySelector('.popup_type_edit-profile');
export const editForm = document.forms['edit-profile-form'];
export const nameInput = editForm.elements['user-name-input'];
export const jobInput = editForm.elements['user-job-input'];
export const editFormCloseButton = popUpEdit.querySelector('.button_close_edit-profile');

export const popUpAdd = document.querySelector('.popup_type_add-photo');
export const addForm = document.forms['add-photo-form'];
export const placeTitleInput = addForm.elements['place-title-input'];
export const imageLinkInput = addForm.elements['image-link-input'];
export const addFormCloseButton = popUpAdd.querySelector('.button_close_add-photo');

const userProfile = document.querySelector('.user-profile');
export const editButton = userProfile.querySelector('.user-profile__edit-button');
export const userName = userProfile.querySelector('.user-profile__user-name');
export const userJob = userProfile.querySelector('.user-profile__user-job');
export const addButton = userProfile.querySelector('.user-profile__add-button');

export const popUpView = document.querySelector('.popup_type_view-photo');
export const popUpViewPlaceImage = popUpView.querySelector('.popup__place-image');
export const popUpViewPlaceName = popUpView.querySelector('.popup__place-name');
export const popUpViewCloseButton = popUpView.querySelector('.popup__close-photo-button');

export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'button_type_submit-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};