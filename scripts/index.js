import { initialCards, config } from './consts.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';



const profileEditButton = document.querySelector('.button_type_edit');
const popupProfileForm = document.querySelector('.popup__profile-form');
const profileNameInput = document.querySelector('.popup__input_el_name');
const profileJobInput = document.querySelector('.popup__input_el_job');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupList = document.querySelectorAll('.popup');
const formList = document.querySelectorAll('.popup__form');
const userNameElement = document.querySelector('.profile__name');
const userJobElement = document.querySelector('.profile__about');
const placesContainer = document.querySelector('.places');
const popupPlace = document.querySelector('.popup_type_add-place');
const popupPlaceForm = document.querySelector('.popup__place-form');
const placeNameInput = document.querySelector('.popup__input_el_place-name');
const placeLinkInput = document.querySelector('.popup__input_el_place-link');
const popupButtonAddPlace = document.querySelector('.button_type_add');


// УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ/ЗАКРЫТИЯ ПОПАПА=================================================================
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  // clearInputError (popup, config);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

// Функция ОТКРЫТИЯ ПОПАПА ПРОФИЛЯ ====================================================================================
function handleOpenPopupProfile() {
  openPopup(popupProfile);
  new FormValidator(config, popupProfileForm).clearInputError();
  profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;
};

profileEditButton.addEventListener('click', handleOpenPopupProfile);

// Функция ОТПРАВКИ ФОРМЫ ПРОФИЛЯ ======================================================================================
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent = profileJobInput.value;
  closePopup(popupProfile);
  evt.target.reset();
};

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

//ФУНКЦИЯ  ОТКРЫТИЯ/СОХРАНЕНИЯ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ===============================================================
function handleOpenAddPlacePopupForm(evt) {
  openPopup(popupPlace);
  new FormValidator(config, popupPlaceForm).clearInputError();
  new FormValidator(config, popupPlaceForm).disableButton();
  // disableButton(popupSubmitPlaceButton, config);
  popupPlaceForm.reset();
};

function handleFormPlaceSubmit(evt) {
  evt.preventDefault();

  const userCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
    alt: placeNameInput.value
  };

  const cardNew = new Card(userCard, '#cardTemplate');
  const cardNewElement = cardNew.generateCard();
  placesContainer.prepend(cardNewElement);
  closePopup(popupPlace);
  evt.target.reset();
};

popupButtonAddPlace.addEventListener('click', handleOpenAddPlacePopupForm);
popupPlaceForm.addEventListener('submit', handleFormPlaceSubmit);


//Закрытие попапов по нажатию на кнопку закрытия(крестик)=================================================================
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
buttonsClosePopup.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click',() => {
    closePopup(popup);
});
});

// Функция закрытия попапа при нажатии на Escape =========================================================================
function closePopupByEscape (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}

// Функция закрытия попапа кликом на оверлей
// function closePopupByOverlayClick (popupList) {
//   popupList.forEach((popup) => {
//     popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup);
//     }
//   });
//   });
// }

// вариант 2 Функции закрытия попапа кликом на оверлей ==================================================================
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
  }
});
});

initialCards.forEach((item) => {
  const card = new Card(item, '#cardTemplate');
  const cardElement = card.generateCard();

  placesContainer.prepend(cardElement);
});

formList.forEach(form => {
  const formValidated = new FormValidator(config, form)
  formValidated.enableValidation();
});

