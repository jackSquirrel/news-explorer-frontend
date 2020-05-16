import BaseComponent from "./BaseComponent";

export default class Card extends BaseComponent {
  constructor(props) {
    super(props);
    this._keyword = props.keyword;
    this._img = props.img;
    this._link = props.link;
    this._date = props.date;
    this._title = props.title;
    this._text = props.text;
    this._source = props.source;
    this._isLoggedIn = props.isLoggedIn;
    this._saveArticle = props.saveArticle;
    this._deleteArticle = props.deleteArticle;
    this._getArticles = props.getArticles;
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

  // Разметка иконки карточки
  _renderIcon() {
    if(!this._isLoggedIn) {
      return `<p class="card__unlog">Войдите, чтобы сохранять статьи</p>
      <button class="card__save" type="button" disabled></button>`
    }
    else {
      return `<button class="card__save card__save_logged" type="button"></button>`
    }
  }

  // Разметка карточки со статьей
  _template() {
    return `<div class="card">
    <div class="card__img" style="background-image: url('${this._img}')">` + this._renderIcon() +
    `</div>
    <p class="card__date">${this._date}</p>
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

  // Отрисовка карточки и добавление слушаетелей на иконку
  render() {
    this._element = this._create(this._template());
    if(this._isLoggedIn){
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
    return this._element;
  }
}