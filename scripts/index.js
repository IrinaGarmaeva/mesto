
const editProfileButton = document.querySelector('.button_type_edit');
const closeEditProfileButton = document.querySelector('.popup__close-button_type_profile');
const popupProfileForm = document.querySelector('.popup__profile-form');
const profileNameInput = document.querySelector('.popup__input_el_name');
const profileJobInput = document.querySelector('.popup__input_el_job');
const popupProfile = document.querySelector('#edit-profile');
const popup = document.querySelector('.popup');

const userNameElement = document.querySelector('.profile__name');
const userJobElement = document.querySelector('.profile__about');

// Переменны для попапа добавления/удаления карточек====================================================================================
const popupPlace = document.querySelector('#add-place');
const popupPlaceForm = document.querySelector('.popup__place-form');
const closeAddPlaceButton = document.querySelector('.popup__close-button_type_place');
const placeNameInput = document.querySelector('.popup__input_el_place-name');
const placeLinkInput = document.querySelector('.popup__input_el_place-link');
const placeNameElement = document.querySelector('.place__name');
const placeLinkElement = document.querySelector('.place__image');
const addPlaceButton = document.querySelector('.button_type_add');
const popupImage = document.querySelector('#open-image');
const popupPhoto = document.querySelector('.popup__photo');
const popupImageHeading = document.querySelector('.popup__heading');
const popupCloseImageButton = document.querySelector('.popup__close-button_type_image');
console.log(popupPhoto);


// ПЕРЕМЕННЫЕ ДЛЯ ШАБЛОНА КАРТОЧЕК
const cardTemplate = document.querySelector('#cardTemplate').content;

// УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ ПОПАПА
function handleOpenPopup (element) {
  element.classList.add('popup_opened');
}

//handleOpenPopupForm
// Функция ОТКРЫТИЯ ПОПАПА ПРОФИЛЯ =============================================================================================
function handleOpenPopupProfile() {
  handleOpenPopup (popupProfile);
  profileNameInput.value = userNameElement.textContent;
  profileJobInput.value = userJobElement.textContent;
};
editProfileButton.addEventListener('click', handleOpenPopupProfile);

// Функция ЗАКРЫТИЯ ПОПАПА ====================================================================================================
function handleClosePopupForm() {
  popup.classList.remove('popup_opened');
};
closeEditProfileButton.addEventListener('click', handleClosePopupForm);

// Функция ОТПРАВКИ ФОРМЫ ПРОФИЛЯ =============================================================================================
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userNameElement.textContent = profileNameInput.value;
  userJobElement.textContent = profileJobInput.value;
  handleClosePopupForm();
};
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);


// МАССИВ ДАННЫХ ДЛЯ КАРТОЧЕК ==================================================================================================
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: ''
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: ''
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: ''
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: ''
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: ''
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'hgjgbm'
  }
];

// Функция СОЗДАНИЯ КАРТОЧКИ=======================================================================================================
const placesContainer = document.querySelector('.places');
console.log(placesContainer);

function createNewCard (newName, newLink, newAlt) {
  const userCard = cardTemplate.cloneNode('true');

  const cardHeading = userCard.querySelector('.place__name');
  const cardImage = userCard.querySelector('.place__photo');
  cardHeading.textContent = newName;
  cardImage.setAttribute('src', newLink);
  cardImage.setAttribute('alt', newAlt);

  // добавление лайка
  const likeButton = userCard.querySelector('.place__like-button');
  function addLikeButton () {
    likeButton.classList.toggle('place__like-button_active');
  };
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
    handleOpenPopup(popupImage);
    popupPhoto.setAttribute('src', newLink);
    popupPhoto.setAttribute('alt', newAlt);
    popupImageHeading.textContent = newName;
  }

  cardImage.addEventListener('click', popupOpenImage);
  popupCloseImageButton.addEventListener('click', handleCloseImagePopup);

  console.log(userCard);
  return userCard;
};

initialCards.forEach(function(card) {
  placesContainer.append(createNewCard(card.name, card.link, card.alt));
});

//ФУНКЦИЯ  ОТКРЫТИЯ/ЗАКРЫТИЯ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ
function handleOpenAddPlacePopupForm() {
  popupPlace.classList.add('popup_opened');
};

function handleCloseAddPlacePopupForm() {
  popupPlace.classList.remove('popup_opened');
};

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ==================================================================================================

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

function handleCloseImagePopup() {
  popupImage.classList.remove('popup_opened')
}

// СЛУШАТЕЛИ ДЛЯ ДЕЙСТВИЙ С КАРТОЧКОЙ
addPlaceButton.addEventListener('click', handleOpenAddPlacePopupForm);
closeAddPlaceButton.addEventListener('click',handleCloseAddPlacePopupForm);
popupPlaceForm.addEventListener('submit', handleFormPlaceSubmit);

