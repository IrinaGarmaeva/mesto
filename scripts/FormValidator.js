

export class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._errorClass = data.errorClass;
    this._inpitErrorClass = data.inpitErrorClass;
    this._formListSelector = data.formSelector;
    this._config = data;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
  };

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`.${input.name}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`.${input.name}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
  };
};

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  disableButton () {
    this._buttonSubmit.setAttribute('disabled', 'disabled');
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
  };

  enableButton () {
    this._buttonSubmit.removeAttribute('disabled');
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton ();
    }
  };

  _setEventListeners() {
    this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
    this._checkInputValidity(input);
    this._toggleButtonState();
  });
});
  };

  clearInputError() {
    this._inputList.forEach(input => {
      this._hideInputError(input);
    });
  }

  enableValidation() {

    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
};
