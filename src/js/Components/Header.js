import BaseComponent from "./BaseComponent";

export default class Header extends BaseComponent {
  constructor(props){
    super(props);
    this._color = props.color;
    this._headerContainer = props.headerContainer;
    this._getUser = props.getUser;
    this._popup = props.popup;
    this._headerButton = props.headerButton;
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
  _quit(name){
    const cookie_date = new Date();
    cookie_date.setTime(cookie_date.getTime() - 1);
    document.cookie = name += "=; expires=" + cookie_date.toGMTString();
    this.render(false);
  }

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

  // Установка начальных конфигураций для header
  headerSettings(){
    const button = this._headerContainer.querySelector('.header__menu-button');

    if(this._color == 'black'){
      this._getUser()
      .then((res)=> {
        if(res){
          this.render(true);
        }
      })
    }
    else {
      this._getUser()
      .then((res)=> {
        this._headerContainer.querySelector('.header__menu_quit-name').textContent = res.name;
      })
    }

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
          this._quit('jwt');
        }
      }
    ])
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