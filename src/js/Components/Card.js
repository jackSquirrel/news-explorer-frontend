import BaseComponent from "./BaseComponent";

export default class Card extends BaseComponent {
  constructor(props) {
    super(props);
    this._keyword = props.keyword;
    this._img = props.img;
    this._link = props.link;
    this._date = props.date.slice(0, 10);
    this._title = props.title;
    this._text = props.text;
    this._source = props.source;
    this._isLoggedIn = props.isLoggedIn;
    this._saveArticle = props.saveArticle || null;
    this._deleteArticle = props.deleteArticle;
    this._getArticles = props.getArticles;
    this._monthFormat = props.monthFormat;
    this._cardId = props.cardId;
    this._container = props.container;
  }

  // Действие при нажатии по иконке
  _saveOrDelete(event) {
    if(event.target.classList.contains('card__save_logged') && !event.target.classList.contains('card__save_marked')){
      this._save(event);
    }
    if(event.target.classList.contains('card__save_logged') && event.target.classList.contains('card__save_marked')){
      this._delete(event);
    }
  }

  // Сохранение статьи
  _save(event){
    this._saveArticle(this._keyword, this._title, this._text, this._date, this._source, this._link, this._img)
      .then((res)=> {
        if(res){
          event.target.classList.add('card__save_marked');
        }
      })
  }

  // Удаление статьи
  _delete(event){
    this._getArticles()
      .then((res)=> {
        const article = res.find((article)=> {
          if(article.link == this._link){
            return article;
          }
        });
        this._deleteArticle(article._id)
          .then((res)=> {
            if(res){
              event.target.classList.remove('card__save_marked');
            }
          })
      })
  }

  // Перевод даты в нужный формат
  _dateFormat(date) {
    let newDate = '';
    if(date[0] == '0'){
      newDate += date[1]
    }
    else {
      newDate += date.slice(-2, )
    }
    newDate += this._monthFormat(date.slice(5, 7)) + date.slice(0, 4);
    return newDate;
  }

  // Разметка иконки карточки
  _renderIcon() {
    if(!this._isLoggedIn) {
      return `<p class="card__unlog">Войдите, чтобы сохранять статьи</p>
      <button class="card__save" type="button"></button>`
    }
    else {
      return `<button class="card__save card__save_logged" type="button"></button>`
    }
  }

  // Разметка карточки со статьей при поиске
  _template() {
    return `<div class="card">
    <div class="card__img" style="background-image: url('${this._img}')">` + this._renderIcon() +
    `</div>
    <p class="card__date">${this._dateFormat(this._date)}</p>
    <h3 class="card__title">${this._title}</h3>
    <p class="card__text">${this._text}</p>
    <p class="card__source">${this._source}</p>
    </div>`
  }

  // DOM разметка карточки
  _create(markup){
    const newTag = document.createElement('div');
    newTag.innerHTML = markup;
    return newTag.firstChild;
  }

  // Конфигурация карточки для авторизированного пользователя
  _loggedConfig() {
    this._getArticles()
        .then((res)=>{
          res.some((article)=> {
            if(article.link == this._link){
              this._element.querySelector('.card__save').classList.add('card__save_marked');
            }
          })
        })
      this._setListeners([
      {
        element: this._element.querySelector('.card__save'),
        event: 'click',
        callback: (event)=> {
          this._saveOrDelete(event);
        }
      }
      ])
  }

  // Конфигурация карточки для неавторизированного пользователя
  _unloggedConfig() {
    this._setListeners([
      {
        element: this._element.querySelector('.card__save'),
        event: 'mouseover',
        callback: ()=> {
          this._element.querySelector('.card__unlog').classList.add('card__unlog_hovered');
        }
      },
      {
        element: this._element.querySelector('.card__save'),
        event: 'mouseout',
        callback: ()=> {
          this._element.querySelector('.card__unlog').classList.remove('card__unlog_hovered');
        }
      }
    ])
  }

  // Конфигурация сохраненной карточки
  _savedConfig() {
    this._setListeners([
      {
        element: this._element.querySelector('.card__trash'),
        event: 'mouseover',
        callback: ()=> {
          this._element.querySelector('.card__rem-saved').classList.add('card__rem-saved_hovered')
        }
      },
      {
        element: this._element.querySelector('.card__trash'),
        event: 'mouseout',
        callback: ()=> {
          this._element.querySelector('.card__rem-saved').classList.remove('card__rem-saved_hovered')
        }
      },
      {
        element: this._element.querySelector('.card__trash'),
        event: 'click',
        callback: ()=> {
          this._deleteArticle(this._cardId);
          this._container.removeChild(this._element);
        }
      }
    ])
  }

  // Отрисовка карточки при поиске и добавление слушаетелей на иконку
  render() {
    this._element = this._create(this._template());
    if(this._isLoggedIn){
      this._loggedConfig();
    }
    else {
      this._unloggedConfig();
    }
    return this._element;
  }

  // Отрисовка сохраеннной карточки и добавление слушателей
  renderSavedCard() {
    this._element = this._create(this._templateSaved());
    this._savedConfig();
    return this._element;
  }

  // Разметка сохраненной карточки
  _templateSaved() {
    return `<div class="card">
    <div class="card__img" style="background-image: url('${this._img}'">
      <p class="card__keyword">${this._keyword}</p>
      <p class="card__rem-saved">Убрать из сохраненных</p>
      <button class="card__trash" type="button"></button>
    </div>
    <p class="card__date">${this._dateFormat(this._date)}</p>
    <h3 class="card__title">${this._title}</h3>
    <p class="card__text">${this._text}</p>
    <p class="card__source">${this._source}</p>
  </div>`
  }
}
