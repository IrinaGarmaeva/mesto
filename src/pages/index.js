import './index.css';

import {
  config,
  profileAvatar,
  avatarEditButton,
  profileEditProfileButton,
  popupButtonAddPlace,
  profileNameInput,
  profileOccupationInput
} from '../utils/consts.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';

let userId;

// создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '1ddaccfd-6cdb-4497-bcf7-c6a054674d3b',
    'Content-Type': 'application/json'
}
});


//отрисовка данных пользователя и карточек с сервера
Promise.all([api.getUserData(), api.getInitialCards()]).then(([userProfile, cards]) => {
  console.log(userProfile);
  userInfo.setUserInfo({newUserName: userProfile.name, newUserOccupation: userProfile.about});
  userInfo.setUserAvatar(userProfile.avatar);
  userId = userProfile._id;
  cardList.renderItems(cards);
})


// создание экземпляра класса userInfo
const userInfo = new UserInfo({userNameSelector: '.profile__name' , userOccupationSelector: '.profile__about', avatarSelector: '.profile__avatar'});

// создание экземпляра класса попапа редактирования профиля
const popupEditProfile = new PopupWithForm({popupSelector: '.popup_type_edit-profile', callbackSubmitForm: (inputValues) => {
  const {
    'popup-username': name,
    'popup-job': occupation,
  } = inputValues;

  api.editUserData({newName: name, newAbout: occupation})
  .then(() => userInfo.setUserInfo({newUserName: name, newUserOccupation: occupation}))
  .catch(error => console.log("Ошибка редактирования информации о пользователе:", error))
}});

popupEditProfile.setEventListeners();

profileEditProfileButton.addEventListener('click', () => {
  popupEditProfile.open();
  const {name: profileNameTextContent, occupation:  profileOccupationTextContent } = userInfo.getUserInfo();
  profileNameInput.value = profileNameTextContent;
  profileOccupationInput.value = profileOccupationTextContent;
  formValidators['profile-form'].clearInputError();
  formValidators['profile-form'].enableButton();
});


// создание экземпляра класса попапа добавления карточки
const popupAddPlace = new PopupWithForm({popupSelector: '.popup_type_add-place', callbackSubmitForm: (inputValues) => {
  const {
    'card-name': name,
    'card-link': link,
  } = inputValues;
  api.addNewCard({newName: name, newLink: link})
  .then(() => createCard({name, link}))
  .catch(error => console.log("Ошибка добавления новой карточки:", error))
}
});

popupAddPlace.setEventListeners();

popupButtonAddPlace.addEventListener('click', () => {
  popupAddPlace.open();

  formValidators['place-form'].clearInputError();
  formValidators['place-form'].disableButton();
})

// создание экземпляра класса для попапа с картинкой

const popupWithImage = new PopupWithImage('.popup_type_open-image');
popupWithImage.setEventListeners();

// создание экземпляра класса секшен для массива карточек

const cardList = new Section({renderer: createCard}, '.places');



// создание карточек==============

function createCard(item) {
  const card = new Card(item, '#cardTemplate', () => {
    popupWithImage.open({
      name: item.name,
      link: item.link,
    });
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// запуск валидации форм=======
const formValidators = {}
console.log(formValidators);

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(config);

// создание экземпляра класса попапа изменения аватара
const popupEditAvatar = new PopupWithForm({popupSelector: '.popup_type_update-avatar', callbackSubmitForm: (inputValue) => {
  const {
    'avatar-link': link,
  } = inputValue;
  api.setUserAvatar({link: link})
  .then((res) => userInfo.setUserAvatar(res.avatar))
  .catch(error => console.log("Ошибка редактирования аватара пользователя:", error))
}})

popupEditAvatar.setEventListeners();

// слушатель для кнопки редактирования аватара
avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open();

  formValidators['avatar-form'].clearInputError();
  formValidators['avatar-form'].disableButton();
});


