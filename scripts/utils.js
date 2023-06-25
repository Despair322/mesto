export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', closeByEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
