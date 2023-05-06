export class Card {
  constructor ({data, templateSelector, userId,  handleCardClick, handleLikeClick, handleDeleteIconClick}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._ownerId = data.owner._id;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteIconClick = handleDeleteIconClick;

  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    return cardElement;
  };

  addCardLike() {
    this._buttonLike.classList.add('place__like-button_active');
    this.isLiked = true;
  };

  removeCardLike() {
    this._buttonLike.classList.remove('place__like-button_active');
    this.isLiked = false;
  }

  countLikes(card) {
    this._elementLikesCounter.textContent = card.likes.length;
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId)
  }

  _toggleLike() {
    if (this.isLiked) {
      this.removeCardLike();
    } else {
      this.addCardLike();
    }
  }

  removeCard() {
    this._element.remove();
  }
  
  _setEventListeners() {
   this._buttonLike.addEventListener('click', () => {
    this.handleLikeClick(this);
   });

   this._buttonDeleteBasket.addEventListener('click', () => {
    this.handleDeleteIconClick(this);
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

    this._cardImage.src = this._link;
    this._element.querySelector('.place__name').textContent = this._name;
    this._cardImage.alt = this._name;

    this._toggleLike();
    this._elementLikesCounter = this._element.querySelector('.place__like-button__counter');
    this._elementLikesCounter.textContent = this._likes.length;

    if (this._ownerId !== this._userId) {
      this._buttonDeleteBasket.remove();
    }

    this._setEventListeners();
    return this._element;
  };
};
