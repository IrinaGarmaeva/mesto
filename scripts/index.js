const editProfileButton = document.querySelector('.button_type_edit');
const closeProfileButton = document.querySelector('.popup__button_type_close');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_el_name');
const jobInput = document.querySelector('.popup__input_el_job');
const popup = document.querySelector('.popup');

const userNameElement = document.querySelector('.profile__name');
const userJobElement = document.querySelector('.profile__about');


function handleOpenPopupForm() {
  popup.classList.add('popup_opened');
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}

function handleClosePopupForm() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  userNameElement.textContent = nameInput.value;
  userJobElement.textContent = jobInput.value;
  handleClosePopupForm();
}


editProfileButton.addEventListener('click', handleOpenPopupForm);
closeProfileButton.addEventListener('click', handleClosePopupForm);
popupForm.addEventListener('submit', handleFormSubmit);


