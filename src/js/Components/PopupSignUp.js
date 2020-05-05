import Popup from "./Popup";

export default class PopupSignUp extends Popup {
  constructor(props){
    super(props);
    this._validation = props.validation;
    this._signIn = props.signIn;
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
          this._signIn();
        }
      }
    ]);

    this.popupElement.querySelector('.popup__button').setAttribute('disabled', true);
    this.popupElement.querySelector('.popup__button').classList.remove('popup__button_active');
  }
}