import Popup from "./Popup";

export default class PopupSignUp extends Popup {
  constructor(props){
    super(props);
    this._validation = props.validation;
    this._openSignIn = props.openSignIn;
    this._signUpCallback = props.signUpCallback;
    this._openSuccess = props.openSuccess;
  }

  // Установка слушателей на попап
  _setPopupListeners(){
    this._setListeners([
      {
        element: this.popupElement.querySelector('.popup__close'),
        event: 'click',
        callback: this.close
      },
      {
        element: this.popupElement.querySelector('.popup__or_enter'),
        event: 'click',
        callback: () => {
          this.close();
          this._openSignIn();
        }
      },
      {
        element: this.popupForm,
        event: 'submit',
        callback: (event)=> { this._signUp(event) }
      }
    ]);
  }

  // Конфигурация попапа
  _popupSettings(){
    this._validation(this.popupForm);
    this._setPopupListeners();
    this.popupElement.querySelector('.popup__button-error').textContent = '';
    this.popupElement.querySelector('.popup__button').setAttribute('disabled', true);
    this.popupElement.querySelector('.popup__button').classList.remove('popup__button_active');
  }

  // Регистрация пользователя
  _signUp(event) {
    event.preventDefault();
    const error = this.popupElement.querySelector('.popup__button-error');
    this._signUpCallback(this.popupForm.elements.email.value, this.popupForm.elements.name.value, this.popupForm.elements.password.value)
      .then((res)=> {
        if(res.message) {
          error.textContent = res.message;
        } else {
          error.textContent = '';
          this.close();
          this._openSuccess();
        }
      });
  }
}