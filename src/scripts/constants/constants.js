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

export const editPopupSelector = '.popup_type_edit-profile';
export const addPopupSelector = '.popup_type_add-photo';
export const viewPopupSelector = '.popup_type_view-photo';
export const cardTemplateSelector = '#card-template';
export const containerSelector = '.photo__cards';
export const placeImageSelector = '.popup__place-image';
export const placeNameSelector = '.popup__place-name';
export const userNameSelector = '.user-profile__user-name';
export const userJobSelector = '.user-profile__user-job';
export const closeIconSelector = '.button_type_close';
export const isOpenedModifier = 'popup_opened';

export const cardElementsSelectors = {
  cardSelector: '.card',
  deleteIconSelector: '.button_type_delete',
  cardImageSelector: '.card__image',
  likeIconSelector: '.button_type_like',
  cardTitleSelector: '.card__title',
  isLikedModifier: 'button_like-status_checked'
};