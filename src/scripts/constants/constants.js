export const editForm = document.forms['edit-profile-form'];
export const nameInput = editForm.elements['user-name-input'];
export const jobInput = editForm.elements['user-job-input'];

export const popUpAdd = document.querySelector('.popup_type_add-photo');
export const addForm = document.forms['add-photo-form'];
export const placeTitleInput = addForm.elements['place-title-input'];
export const imageLinkInput = addForm.elements['image-link-input'];

const userProfile = document.querySelector('.user-profile');
export const editButton = userProfile.querySelector('.user-profile__edit-button');
export const addButton = userProfile.querySelector('.user-profile__add-button');

export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'button_type_submit-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};