const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_invalid',
}

// функция показа ошибки =================================================================
function showInputError (form, input, errorMessage, config) {
const errorElement = form.querySelector(`.${input.name}-error`);
input.classList.add('config.inputErrorClass');
errorElement.textContent = errorMessage;
errorElement.classList.add(config.errorClass); // errorElement.classList.add('popup__input-error_active');
}

// функция скрытия ошибки =================================================================
function hideInputError (form, input, config) {
const errorElement = form.querySelector(`.${input.name}-error`);
input.classList.remove('config.inputErrorClass');
errorElement.classList.remove(config.errorClass);
errorElement.textContent = '';
}

// функция проверки валидности полей =================================================================
function checkInputValidity (form, input, config) {
if (!input.validity.valid) {
  showInputError(form, input, input.validationMessage, config);
} else {
  hideInputError(form, input, config);
}
};

//функция проверки наличия невалидного поля =================================================================
function hasInvalidInput (inputList) {
return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
};

// Функции для блокировки/разблокировки/переключения кнопок =================================================================
function disableButton (buttonElement, config) {
buttonElement.setAttribute('disabled', 'disabled');
// buttonElement.classList.add('popup__button_disabled');
buttonElement.classList.add(config.inactiveButtonClass);
}

function enableButton (buttonElement, config) {
buttonElement.removeAttribute('disabled');
buttonElement.classList.remove(config.inactiveButtonClass); // button.classList.remove('popup__button_disabled');
}

function toggleButtonState (inputList, buttonElement, config) {
if (hasInvalidInput(inputList)) {
  disableButton(buttonElement, config);
} else {
  enableButton (buttonElement, config);
}
};

// функция наложения обработчиков на поля форм =================================================================
function setEventListeners (form, config) {
const inputList = Array.from(form.querySelectorAll(config.inputSelector));
const buttonElement = form.querySelector(config.submitButtonSelector);
inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(form, inputElement, config);
    toggleButtonState(inputList, buttonElement, config);
  });
});
}

// Функция запуска валидации форм==================================================================
function enableValidation (config) {
const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((form) => {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
    setEventListeners(form, config);
  });


};


enableValidation(config);


function clearInputError (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(input => {
    hideInputError(form, input, config)
  });
}
