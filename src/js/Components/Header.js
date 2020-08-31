import BaseComponent from "./BaseComponent";

export default class Header extends BaseComponent {
  constructor(props){
    super(props);
    this._color = props.color;
    this._headerContainer = props.headerContainer;
    this._getUser = props.getUser;
    this._popup = props.popup;
    this._headerButton = props.headerButton;
    this._endSession = props.quite;
  }

  // Логика работы header на мобильных разрешениях
  _headerMenuMobile(button){
    if(button.classList.contains('header__menu-button_open')){
      this._headerOpen();
      this._popup.classList.add('popup__opened');
    }
    else {
      this.headerClose();
      this._popup.classList.remove('popup__opened');
    };
  }

  // Открыть header на мобильных разрешениях
  _headerOpen(){
    if(this._color === 'white'){
      this._headerContainer.classList.remove('header__black')
    }
    this._headerContainer.classList.add('header__opened');
    this._headerButton.classList.add('header__menu-button_close');
    this._headerButton.classList.remove('header__menu-button_open');
  }

  // Закрыть header на мобильных разрешениях
  headerClose(){
    if(this._color === 'white'){
      this._headerContainer.classList.add('header__black')
    }
    this._headerContainer.classList.remove('header__opened');
    this._headerButton.classList.remove('header__menu-button_close');
    this._headerButton.classList.add('header__menu-button_open');
  }

  // Выйти из текущего сеанса
  _quit(){
    this._endSession()
      .then((res)=>{
        if(res){
          if(this._color == 'white'){
            window.location.href = '../index.html';
          }
          else{
            window.location.href = './index.html';
          }
        }
      })
  }

  // Установка начальных конфигураций для header
  headerSettings(){
    if(this._color == 'black'){
      this._unauthorisedSettings()
    }
    else {
      this._authorisedSettings()
    }
    this._setHeaderListeners();
  }

  // Установка слушателей на header
  _setHeaderListeners(){
    const button = this._headerContainer.querySelector('.header__menu-button');
    this._setListeners([
      {
        element: button,
        event: 'click',
        callback: ()=> {
          this._headerMenuMobile(button);
        }
      },
      {
        element: this._headerContainer.querySelector('.header__menu_quit'),
        event: 'click',
        callback: ()=> {
          this._quit();
        }
      }
    ])
  }

  // конфигурация header для НЕавторизированного пользователя
  _unauthorisedSettings(){
    this._getUser()
    .then((res)=> {
      if(res){
        this.render(true);
      }
    })
  }

  // конфигурация header для авторизированного пользователя
  _authorisedSettings(){
    this._getUser()
    .then((res)=> {
      this._headerContainer.querySelector('.header__menu_quit-name').textContent = res.name;
    })
  }

  //Отрисовка header
  render(isLoggedIn){
    const menu = this._headerContainer.querySelector('.header__menu');
    if(isLoggedIn) {
      menu.classList.remove('header__unauthorized');
      menu.classList.add('header__authorized');
      this._getUser()
        .then((res)=>{
          menu.querySelector('.header__menu_quit-name').textContent = res.name;
        })
    }
    else {
      menu.classList.remove('header__authorized');
      menu.classList.add('header__unauthorized');
    }
  }
}