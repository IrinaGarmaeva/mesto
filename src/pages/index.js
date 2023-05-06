import './index.css';

import {
  config,
  profileAvatar,
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
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';

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
  popupEditProfile.renderLoading(true);
  api.editUserData({newName: name, newAbout: occupation})
  .then(() => userInfo.setUserInfo({newUserName: name, newUserOccupation: occupation}))
  .catch(error => console.log("Ошибка редактирования информации о пользователе:", error))
}});

popupEditProfile.setEventListeners();

profileEditProfileButton.addEventListener('click', () => {
  popupEditProfile.open();
  popupEditProfile.renderLoading(false);
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
  popupAddPlace.renderLoading(true);
  api.addNewCard({newName: name, newLink: link})
  .then((card) => createCard(card))
  .catch(error => console.log("Ошибка добавления новой карточки:", error))
}
});

popupAddPlace.setEventListeners();

popupButtonAddPlace.addEventListener('click', () => {
  popupAddPlace.open();
  popupAddPlace.renderLoading(false);
  formValidators['place-form'].clearInputError();
  formValidators['place-form'].disableButton();
})

// создание экземпляра класса для попапа с картинкой

const popupWithImage = new PopupWithImage('.popup_type_open-image');
popupWithImage.setEventListeners();

// создание экземпляра класса попапа изменения аватара
const popupEditAvatar = new PopupWithForm({popupSelector: '.popup_type_update-avatar', callbackSubmitForm: (inputValue) => {
  const {
    'avatar-link': link,
  } = inputValue;
  popupEditAvatar.renderLoading(true);
  api.setUserAvatar({link: link})
  .then((res) => userInfo.setUserAvatar(res.avatar))
  .catch(error => console.log("Ошибка редактирования аватара пользователя:", error))
}})

popupEditAvatar.setEventListeners();

profileAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  popupEditAvatar.renderLoading(false);
  formValidators['avatar-form'].clearInputError();
  formValidators['avatar-form'].disableButton();
});

// создание экземпляра класса PopupWithConfirm
const popupWithConfirm = new PopupWithConfirm({popupSelector: '.popup_type_confirm'});
popupWithConfirm.setEventListeners();

function handleDeleteIconClick(card) {
  popupWithConfirm.open();
  function submitFormConfirm () {
    api.deleteCard(card.cardId)
    .then(() => {
      card.removeCard();
      popupWithConfirm.close();
    })
    .catch((error) => console.log("Ошибка удаления карточки:", error))
  }

  popupWithConfirm.setSubmitAction(submitFormConfirm);
};

// создание экземпляра класса Section для массива карточек

const cardList = new Section({renderer: createCard}, '.places');

// функция создания карточек==============

function createCard(item) {
  const card = new Card({
    data: item,
    templateSelector: '#cardTemplate',
    userId: userId,
    handleCardClick: () => {
      popupWithImage.open({
        name: item.name,
        link: item.link,
      });
    },
    handleLikeClick,
    handleDeleteIconClick,
});
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// запуск валидации форм=======
const formValidators = {}

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


function handleLikeClick(card) {
  if (card.isLiked) {
    api.deleteLike(card.cardId)
    .then((res) => {
      card.removeCardLike();
      card.countLikes(res);
    })
    .catch((error) => console.log("Ошибка удаления лайка:", error))
  } else {
    api.putLike(card.cardId)
    .then((res) => {
      card.addCardLike();
      card.countLikes(res);
    })
    .catch((error) => console.log("Ошибка постановки лайка:", error))
  }
  }

