import Popup from "./Popup";

export default class PopupSignIn extends Popup {
  constructor(props){
    super(props);
    this._validation = props.validation;
    this._openSignUp = props.openSignUp;
    this._signInCallback = props.signInCallback;
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
      }
    ]);

    this.popupElement.querySelector('.popup__button').setAttribute('disabled', true);
    this.popupElement.querySelector('.popup__button').classList.remove('popup__button_active');
  }

  _signIn(event) {
    event.preventDefault();
    this._signInCallback(this.popupForm.elements.email.value, this.popupForm.elements.password.value)
      .then(()=> {
        this.close();
        console.log('success!');
      })
  }
}