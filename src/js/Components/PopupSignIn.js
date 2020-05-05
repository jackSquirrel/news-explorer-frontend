import Popup from "./Popup";

export default class PopupSignIn extends Popup {
  constructor(props){
    super(props);
    this._validation = props.validation;
    this._openSignUp = props.openSignUp;
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
      }
    ]);

    this.popupElement.querySelector('.popup__button').setAttribute('disabled', true);
    this.popupElement.querySelector('.popup__button').classList.remove('popup__button_active');
  }
}