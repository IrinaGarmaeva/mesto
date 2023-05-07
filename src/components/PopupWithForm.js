import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
  constructor ({popupSelector, callbackSubmitForm}) {
    super(popupSelector)
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._buttonSubmit = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    const data = {}
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  // setInputValues(data) {
  //   this._inputList.forEach((input) => {
  //     input.value = data[input.name];
  //   });
  // }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const initialText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = 'Сохранение...';

      this._callbackSubmitForm(this._getInputValues())
      .then(() => this.close())
      .finally(() => {
        this._buttonSubmit.textContent = initialText;
      })
  });
}
}


export { PopupWithForm }
