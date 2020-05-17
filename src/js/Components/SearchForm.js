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

  // Конфигурация формы поиска (установка слушателей)
  settings() {
    const input = this._form.querySelector('.search__input');
    input.setCustomValidity('Введите ключевое слово для поиска');
    this._setListeners([
      {
        element: this._form,
        event: 'submit',
        callback: (event)=> {
          event.preventDefault();
          this._searchCards();
        }
      },
      {
        element: input,
        event: 'input',
        callback: ()=> {
          if(input.validity.valueMissing){
            input.setCustomValidity('Введите ключевое слово для поиска');
          }
          else {
            input.setCustomValidity('');
          }
        }
      }
    ])
  }

  // Поиск карточек
  _searchCards() {
    this._renderDuringSearching();

    this._searchCallback(this._form.elements.searching.value)
      .then((res)=> {
        this._renderAfterSearching();
        if (res.totalResults === 0) {
          this._notFound.classList.remove('invisible');
        }
        else {
          this._renderResults(res);
        }
      })
  }

  // Блок с результатами во время запроса к newsapi
  _renderDuringSearching(){
    this._preloader.classList.remove('invisible');
    this._notFound.classList.add('invisible');
    this._resultsSection.classList.add('invisible');
    this._container.innerHTML = '';
    this._form.querySelector('.search__input').setAttribute('disabled', 'disabled');
    this._form.querySelector('.search__button').setAttribute('disabled', 'disabled');
  }

  // Блока с результатами после запроса вне зависимости от результата
  _renderAfterSearching(){
    if(this._resultsElement != null){
      this._resultsElement._clearListeners();
    }
    this._preloader.classList.add('invisible');
    this._form.querySelector('.search__input').removeAttribute('disabled', 'disabled');
    this._form.querySelector('.search__button').removeAttribute('disabled', 'disabled');

  }

  // Блок с результатми при получении ненулевого набора статей
  _renderResults(res){
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
}