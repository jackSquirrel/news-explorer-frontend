export default class Card {
  constructor(props) {
    this._img = props.img;
    this._date = props.date;
    this._title = props.title;
    this._text = props.text;
    this._source = props.source;
  }

  _template() {
    return `<div class="card">
    <div class="card__img" style="background-image: url('${this._img}')">
      <p class="card__unlog invisible">Войдите, чтобы сохранять статьи</p>
      <button class="card__save card__save_unsaved" type="button"></button>
    </div>
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

  render() {
    this._element = this._create(this._template());
    return this._element;
  }
}