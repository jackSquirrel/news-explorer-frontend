import Popup from "./Popup";

export default class PopupSignUp extends Popup {
  constructor(props){
    super(props);
    this._validation = props.validation;
    this._openSignIn = props.openSignIn;
    this._signUpCallback = props.signUpCallback;
  }

  _popupSettings(){
    this._validation(this.popupForm);

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

    this.popupElement.querySelector('.popup__button').setAttribute('disabled', true);
    this.popupElement.querySelector('.popup__button').classList.remove('popup__button_active');
  }

  _signUp(event) {
    event.preventDefault();
    this._signUpCallback(this.popupForm.elements.email.value, this.popupForm.elements.name.value, this.popupForm.elements.password.value)
      .then((res)=> {
        console.log('Успех!');
        this.close();
      });
  }
}