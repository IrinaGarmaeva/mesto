import { Popup } from './Popup.js'

class PopupWithSubmit extends Popup {
  constructor({popupSelctor}){
    super(popupSelctor);
    
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm();
      this.close();
  });
}
}


export { PopupWithSubmit };
