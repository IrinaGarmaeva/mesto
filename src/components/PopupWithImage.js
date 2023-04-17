
import { Popup } from './Popup.js';

class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super (popupSelector);
    this._popupImage = this._popup.querySelector('.popup__photo');
    this._popupHeading = this._popup.querySelector('.popup__heading');
  }

  open({name, link}) {
    super.open();
    this._popupImage.src = link;
    this._popupHeading.textContent = name;
    this._popupImage.alt = name;
  }


}

export { PopupWithImage }
