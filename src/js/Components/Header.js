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
    this._headerContainer.classList.add('header__opened');
    this._headerButton.classList.add('header__menu-button_close');
    this._headerButton.classList.remove('header__menu-button_open');
  }

  // Закрыть header на мобильных разрешениях
  headerClose(){
    this._headerContainer.classList.remove('header__opened');
    this._headerButton.classList.remove('header__menu-button_close');
    this._headerButton.classList.add('header__menu-button_open');
  }

  // Установка начальных конфигураций для header
  headerSettings(){
    this._getUser()
      .then((res)=> {
        if(res){
          this.render(true);
        }
      })
    const button = this._headerContainer.querySelector('.header__menu-button');
    this._setListeners([
      {
        element: button,
        event: 'click',
        callback: ()=> {
          if(button.classList.contains('header__menu-button_open')){
            this._headerOpen();
            this._popup.classList.add('popup__opened');
          }
          else {
            this.headerClose();
            this._popup.classList.remove('popup__opened');
          };
        }
      }])
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