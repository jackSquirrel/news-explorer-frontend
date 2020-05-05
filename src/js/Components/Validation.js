export default class Validation {
  constructor(messages){
    this._requiredField = messages.requiredField;
    this._wrongEmail = messages.wrongEmail;
  }

  popupFormDefault(form) {
    Array.from(form.elements).forEach(element => {
      element.value = '';
    });

    form.addEventListener('input', () => {
      this._validButton(form);
    });

    this._resetError(form);
    this._setEventListeners(form);
  }

  // все ли поля проходят валидацию
  _validButton(form) {
    const button = form.querySelector('.popup__button');
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    let isButtonActive = true;

    inputList.forEach((input) => {
      if (!this._checkElementValidity(input)) isButtonActive = false;
    });

    if (!isButtonActive) {
      this._disableButton(button);
    } else {
      this._activeButton(button);
    }
  }

  // Неактивная кнопка submit
  _disableButton(button) {
    button.classList.remove('popup__button_active');
    button.setAttribute('disabled', 'disabled');
  }

  // Активная кнопка submit
  _activeButton(button) {
    button.classList.add('popup__button_active');
    button.removeAttribute('disabled');
  }

  // Является ли элемент попапа валидным
  _checkElementValidity(element) {
    if (element.validity.valid) {
      return true;
    }
    return false;
  }

  //сбрасывание ошибок
  _resetError(form) {
    const errorList = Array.from(form.querySelectorAll(".popup__error"));
    errorList.forEach((error) => {
      error.classList.remove('popup__is-not-valid');
      error.textContent = '';
    })
  }

  //устанавливаем  слушатели ввода на все поля
  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(".popup__input"));

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._elementValidity(form, input);
      });
    });
  }

    //вывод текста ошибки при неправильных действиях пользователя
    _elementValidity(form, inputElement) {
      const error = form.querySelector(`#${inputElement.name}`);

      if (inputElement.validity.valueMissing) {
        error.classList.add('popup__is-not-valid');
        error.textContent = this._requiredField;
      } else if (inputElement.validity.typeMismatch) {
        error.classList.add('popup__is-not-valid');
        error.textContent = this._wrongEmail;
      } else {
        error.classList.remove('popup__is-not-valid');
        error.textContent = "";
      }
    }
}