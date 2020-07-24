//функция открытия попапа
export function openPopup(popup) {
  document.activeElement.blur();
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleClickOnOverlay);
  document.addEventListener('keydown', handlePressEscapeButton);
}

//функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleClickOnOverlay);
  document.removeEventListener('keydown', handlePressEscapeButton);
}

//обработчик нажатия на Esc
function handlePressEscapeButton(evt) {
  const overlaysList = Array.from(document.querySelectorAll('.page__overlay'));
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