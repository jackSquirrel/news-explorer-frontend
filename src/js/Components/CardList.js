import BaseComponent from "./BaseComponent";

export default class CardList extends BaseComponent {
  constructor(props){
    super(props);
    this._cards = props.cards;
    this._keyword = props.keyword || null;
    this._container = props.cardsContainer;
    this._cardCallback = props.cardCallback;
    this._button = props.button || null;
    this._getUserData = props.getUserData || null;
    this._isLoggedIn = props.isLoggedIn || null;
    this._curCard = 0;
  }

  // Добавление карточки в список из API
  _addCard(card){
    this._container.appendChild(this._cardCallback(this._keyword, card.urlToImage, card.url, card.publishedAt, card.title, card.description, card.source.name, this._isLoggedIn, null)
    .render())
  }

  // Добавление карточек в список сохраненных из Базы Данных
  _addCardInSaveList(card){
    this._container.appendChild(this._cardCallback(card.keyword, card.image, card.link, card.date, card.title, card.text, card.source, this._isLoggedIn, card._id)
    .renderSavedCard())
  }

  // Логика конпки "Показать еще"
  _seeMore(){
    this._render();
    if(this._curCard >= this._cards.length){
      this._button.classList.add('invisible');
    }
  }

  // Настройки для отображения карточек в результатах
  listSettings(){
    this._seeMore();
    this._setListeners([
      {
        element: this._button,
        event: 'click',
        callback: () => {
          this._seeMore();
        }
      }
    ])
  }

  // Отрисовка карточек по 3
  _render() {
    let cnt = 0;
    for(let i = this._curCard; i < this._cards.length; i++) {
      this._addCard(this._cards[i]);
      cnt++;
      if(cnt === 3){
        break;
      }
    }
    this._curCard += 3;
  }

  // Отрисовка всех карточек сразу
  renderAll() {
    this._cards.forEach((card)=> {
      this._addCardInSaveList(card)
    })
  }
}