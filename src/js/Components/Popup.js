import BaseComponent from "./BaseComponent";

export default class Popup extends BaseComponent {
  constructor(props) {
    super();
    this._popup = props.popup;
    this._content = props.content;
    this.popupElement = null;
    this.popupForm = null;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  // Создание Попапа
  _setContent(content) {
    const newTag = document.createElement('div');
    newTag.innerHTML = content;
    return newTag;
  }

  //Закрытие по нажатию на фон
  _closeByMousedown(event){
    if(event.target.classList.contains('popup')){
      this.close();
    }
  }

  _closeByEsc(event){
    const key = event.key;
    if(key == 'Escape'){
      this.close();
    }
  }

  //Закртытие Попапа
  close() {
    this._clearListeners();
    this._popup.removeChild(this.popupElement);
    this._popup.classList.remove('popup__opened');
  }

  //Открытие Попапа
  open() {
    this._popup.classList.add('popup__opened');
    this._popup.appendChild(this.popupElement);
    this._popupSettings();
  }

  //Загрузка Попапа
  render() {
    this.popupElement = this._setContent(this._content);
    this.popupForm = this.popupElement.querySelector('.popup__form') || null;
    return this.popupElement;
  }
}