

const profileEditButton = document.querySelector('.button_type_edit');
const popupCloseProfileEditButton = document.querySelector('.popup__close-button_type_profile');
const popupProfileForm = document.querySelector('.popup__profile-form');
const profileNameInput = document.querySelector('.popup__input_el_name');
const profileJobInput = document.querySelector('.popup__input_el_job');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupContainer = document.querySelector('.popup__container');
const popupForm = document.querySelector('.popup__form');
const popupSubmitPlaceButton = document.querySelector('.popup__button_type_place');
const popupSubmitProfileButton = document.querySelector('.popup__button_type_profile');
const popupList = document.querySelectorAll('.popup');


const userNameElement = document.querySelector('.profile__name');
const userJobElement = document.querySelector('.profile__about');

// Переменны для попапа добавления/удаления карточек====================================================================================
const popupPlace = document.querySelector('.popup_type_add-place');
const popupPlaceForm = document.querySelector('.popup__place-form');
const popupButtonCloseAddPlace = document.querySelector('.popup__close-button_type_place');
const placeNameInput = document.querySelector('.popup__input_el_place-name');
const placeLinkInput = document.querySelector('.popup__input_el_place-link');
const placeNameElement = document.querySelector('.place__name');
const placeLinkElement = document.querySelector('.place__image');
const popupButtonAddPlace = document.querySelector('.button_type_add');
const popupImage = document.querySelector('.popup_type_open-image');
const popupPhoto = document.querySelector('.popup__photo');
const popupImageHeading = document.querySelector('.popup__heading');
const popupCloseImageButton = document.querySelector('.popup__close-button_type_image');


// ПЕРЕМЕННЫЕ ДЛЯ ШАБЛОНА КАРТОЧЕК
const cardTemplate = document.querySelector('#cardTemplate');

// УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ/ЗАКРЫТИЯ ПОПАПА
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  // clearInputError (popup, config);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

// Функция ОТКРЫТИЯ ПОПАПА ПРОФИЛЯ =============================================================================================
function handleOpenPopupProfile() {
  openPopup(popupProfile);
  profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;
};

profileEditButton.addEventListener('click', handleOpenPopupProfile);

// Функция ЗАКРЫТИЯ ПОПАПА ПРОФИЛЯ ===========================================================================
function handleClosePopupProfileForm() {
  closePopup(popupProfile);
};

popupCloseProfileEditButton.addEventListener('click', handleClosePopupProfileForm);

// Функция ОТПРАВКИ ФОРМЫ ПРОФИЛЯ ===========================================================
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent = profileJobInput.value;
  handleClosePopupProfileForm ();
  evt.target.reset();
};

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

//ФУНКЦИЯ  ОТКРЫТИЯ/ЗАКРЫТИЯ/СОХРАНЕНИЯ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ
function handleOpenAddPlacePopupForm(evt) {
  openPopup(popupPlace);
  clearInputError (popupPlace, config);
  disableButton(popupSubmitPlaceButton, config);
  popupPlaceForm.reset();
};

function handleCloseAddPlacePopupForm() {
  closePopup(popupPlace);
};

function handleFormPlaceSubmit(evt) {
  evt.preventDefault();

  const userCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
    alt: placeNameInput.value
  };
  placesContainer.prepend(createNewCard(userCard.name, userCard.link, userCard.alt));
  handleCloseAddPlacePopupForm();
  evt.target.reset();
};

popupButtonAddPlace.addEventListener('click', handleOpenAddPlacePopupForm);
popupButtonCloseAddPlace.addEventListener('click', handleCloseAddPlacePopupForm);
popupPlaceForm.addEventListener('submit', handleFormPlaceSubmit);

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА КАРТИНКИ==========================================================
function handleCloseImagePopup() {
  closePopup(popupImage);
};

//добавление лайка
function addLikeButton (button) {
  button.classList.toggle('place__like-button_active');
};


// Функция СОЗДАНИЯ КАРТОЧКИ====================================================================
const placesContainer = document.querySelector('.places');

function createNewCard (newName, newLink) {
  const userCard = cardTemplate.content.cloneNode('true');

  const cardHeading = userCard.querySelector('.place__name');
  const cardImage = userCard.querySelector('.place__photo');
  cardHeading.textContent = newName;
  cardImage.setAttribute('src', newLink);
  cardImage.setAttribute('alt', newName);

  // добавление лайка
  const likeButton = userCard.querySelector('.place__like-button');
  // function addLikeButton () {
  //   likeButton.classList.toggle('place__like-button_active');
  // };
  
  likeButton.addEventListener('click', addLikeButton);

  // добавление корзины(кнопки удаления карточки)
  const deleteButton = userCard.querySelector('.place__delete-button');

  function handleDeleteButton () {
    const deleteCard = deleteButton.closest('.place');
    deleteCard.remove();
  };
  deleteButton.addEventListener('click', handleDeleteButton);

  // открытие попапа картинки
  function popupOpenImage () {
    openPopup(popupImage);
    popupPhoto.setAttribute('src', newLink);
    popupPhoto.setAttribute('alt', newName);
    popupImageHeading.textContent = newName;
  };

  cardImage.addEventListener('click', popupOpenImage);
  popupCloseImageButton.addEventListener('click', handleCloseImagePopup);

  return userCard;
};

initialCards.forEach(function(card) {
  placesContainer.append(createNewCard(card.name, card.link));
});


// Функция закрытия попапа при нажатии на Escape
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

// вариант 2 Функции закрытия попапа кликом на оверлей
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
  }
});
})


