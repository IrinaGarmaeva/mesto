//МАССИВ ДАННЫХ ДЛЯ КАРТОЧЕК ==================================================================================================
// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
//   }
// ];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_invalid',
};

const profileAvatar = document.querySelector('.profile__avatar');
const avatarEditButton = document.querySelector('.button_type_edit-avatar');
const profileEditProfileButton = document.querySelector('.button_type_edit-profile');
const popupButtonAddPlace = document.querySelector('.button_type_add');
const profileNameInput = document.querySelector('.popup__input_el_name');
const profileOccupationInput = document.querySelector('.popup__input_el_job');


export { config, profileAvatar, avatarEditButton, profileEditProfileButton,popupButtonAddPlace, profileNameInput, profileOccupationInput };
