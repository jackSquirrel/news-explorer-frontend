import Popup from "./Popup";

export default class PopupSuccess extends Popup {
  constructor(props){
    super(props);
    this._openSignIn = props.openSignIn;
  }

  // Конфигурация попапа
  _popupSettings() {
    this._setListeners([
      {
        element: this.popupElement.querySelector('.popup__close'),
        event: 'click',
        callback: this.close
      },
      {
        element: this.popupElement.querySelector('.popup__or_succes'),
        event: 'click',
        callback: () => {
          this.close();
          this._openSignIn();
        }
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
    ])
  }
}