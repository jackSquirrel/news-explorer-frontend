import Popup from "./Popup";

export default class PopupSignIn extends Popup {
  constructor(props){
    super(props);
    this._validation = props.validation;
    this._openSignUp = props.openSignUp;
    this._signInCallback = props.signInCallback;
    this._headerRender = props.headerRender;
    this._closeHeader = props.closeHeader;
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
        element: this.popupElement.querySelector('.popup__or_reg'),
        event: 'click',
        callback: () => {
          this.close();
          this._openSignUp();
        }
      },
      {
        element: this.popupForm,
        event: 'submit',
        callback: (event)=> { this._signIn(event) }
      },
      {
        element: this._popup,
        event: 'mousedown',
        callback: (event)=> {this._closeByMousedown(event)}
      },
      {
        element: document,
        event: 'keydown',
        callback: (event)=> {this._closeByEsc(event)}
      }
    ]);
  }

  // Конфигурация попапа
  _popupSettings(){
    this._closeHeader();
    this._validation(this.popupForm);
    this._setPopupListeners();
    this.popupElement.querySelector('.popup__button-error').textContent = '';
    this.popupElement.querySelector('.popup__button').setAttribute('disabled', true);
    this.popupElement.querySelector('.popup__button').classList.remove('popup__button_active');
  }

  // Выполнение входа
  _signIn(event) {
    event.preventDefault();
    const error = this.popupElement.querySelector('.popup__button-error');
    this._signInCallback(this.popupForm.elements.email.value, this.popupForm.elements.password.value)
      .then((res)=> {
        if(res.message != 'Вы успешно авторизированы!'){
          error.textContent = res.message;
          error.classList.add('.popup__is-not-valid');
        } else {
          error.textContent = '';
          error.classList.remove('.popup__is-not-valid');
          this.close();
          this._headerRender(true);
        }
      })
  }
}