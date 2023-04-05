
import { handleCardClick } from "./index.js";

export class Card {
  constructor (data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    return cardElement;
  };

  _handleCardLike() {
    this._buttonLike.classList.toggle('place__like-button_active');
  };

  _handleDeleteCard() {
    this._element.remove();
  };


  // _handleOpenImage() {
  //   this._popupOpenedImage.classList.add('popup_opened');
  //   this._popupImage.src = this._link;
  //   this._popupHeading.textContent = this._name;
  //   this._popupImage.alt = this._name;
  // }

  _setEventListeners() {
   this._buttonLike.addEventListener('click', () => {
    this._handleCardLike();
   });

   this._buttonDeleteBasket.addEventListener('click', () => {
    this._handleDeleteCard();
   });

   this._cardImage.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
   });
  };

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.place__like-button');
    this._buttonDeleteBasket = this._element.querySelector('.place__delete-button');
    this._cardImage = this._element.querySelector('.place__photo');
    this._popupOpenedImage = document.querySelector('.popup_type_open-image');
    this._popupImage = this._popupOpenedImage.querySelector('.popup__photo');
    this._popupHeading =this._popupOpenedImage.querySelector('.popup__heading');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._element.querySelector('.place__name').textContent = this._name;
    this._cardImage.alt = this._name;

    return this._element;
  };
};
