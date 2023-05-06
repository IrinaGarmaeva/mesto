import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
  constructor ({popupSelector, callbackSubmitForm}) {
    super(popupSelector)
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._buttonSubmit = this._form.querySelector('.popup__button');
  }

  renderLoading(isLoading) {
    isLoading
    ? (this._buttonSubmit.textContent = "Сохранение...")
    : (this._buttonSubmit.textContent = "Сохранить")
  }

  _getInputValues() {
    const data = {}
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
      this.close();
  });
}

close() {
  super.close();
  this._form.reset();
}
}


export { PopupWithForm }
