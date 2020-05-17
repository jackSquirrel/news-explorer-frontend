import BaseComponent from "./BaseComponent";

export default class SearchForm extends BaseComponent {
  constructor(props) {
    super(props);
    this._form = props.form;
    this._searchCallback = props.searchCallback;
    this._preloader = props.preloader;
    this._notFound = props.notFound;
    this._container = props.container;
    this._addCardsInList = props.resultsList;
    this._resultsSection = props.resultsSection;
    this._getUser = props.getUser;
    this._resultsElement = null;
  }

  settings() {
    this._setListeners([
      {
        element: this._form,
        event: 'submit',
        callback: (event)=> {
          event.preventDefault();
          if(this._form.elements.searching.value == ''){
            this._form.querySelector('.search__input').setCustomValidity('Введите ключевое слово для поиска');
          }
          else {
            this._form.querySelector('.search__input').setCustomValidity('');
            this._searchCards();
          }
        }
      }
    ])
  }

  _searchCards() {
    this._preloader.classList.remove('invisible');
    this._notFound.classList.add('invisible');

    this._searchCallback(this._form.elements.searching.value)
      .then((res)=> {
        console.log(res);
        if(this._resultsElement != null){
          this._resultsElement._clearListeners();
        }
        this._container.innerHTML = '';
        this._preloader.classList.add('invisible');
        this._resultsSection.classList.add('invisible');
        if (res.totalResults === 0) {
          this._notFound.classList.remove('invisible');
        }
        else {
          this._resultsSection.classList.remove('invisible');
          this._getUser()
            .then((result)=>{
              if(result){
                this._resultsElement = this._addCardsInList(res.articles, this._form.elements.searching.value, true);
              }
              else {
                this._resultsElement = this._addCardsInList(res.articles, this._form.elements.searching.value, false);
              }
              this._resultsElement.listSettings();
            })
        }
      })
  }
}