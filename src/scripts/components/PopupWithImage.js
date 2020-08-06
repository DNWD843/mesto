import Popup from './Popup.js';
export default class extends Popup {
  open(evt) {
    document.querySelector('.popup__place-image').src = evt.target.src;
    document.querySelector('.popup__place-name').textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
    super.open();
  }
}