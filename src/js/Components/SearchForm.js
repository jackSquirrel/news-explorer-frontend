import BaseComponent from "./BaseComponent";

export default class SearchForm extends BaseComponent {
  constructor(props) {
    super(props);
    this._form = props.form;
    this._searchCallback = props.searchCallback;
    this._preloader = props.preloader;
    this._notFound = props.notFound;
    this._container = props.container;
    this._addCardCallback = props.addCardCallback;
  }

  settings() {
    this._setListeners([
      {
        element: this._form,
        event: 'submit',
        callback: (event)=> {this._searchCards(event)}
      }
    ])
  }

  _searchCards(event) {
    event.preventDefault();
    this._preloader.classList.remove('invisible');
    this._notFound.classList.add('invisible');

    this._searchCallback(this._form.elements.searching.value)
      .then((res)=> {
        this._preloader.classList.add('invisible');
          console.log(res);
        if (res.totalResults === 0) {
          this._notFound.classList.remove('invisible');
        } else {
          res.articles.forEach((card)=> {
            this._container.appendChild(this._addCardCallback(card.urlToImage, card.publishedAt, card.title, card.description, card.source.name).render());
          })
        }
      })
  }
}