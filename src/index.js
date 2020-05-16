import "./style.css";
import {popupSignIn, popupSignUp, popupSuccess} from "./js/popupContent";
import PopupSignUp from "./js/Components/PopupSignUp";
import PopupSignIn from "./js/Components/PopupSignIn";
import Validation from "./js/Components/Validation";
import Api from "./js/Api/MainApi";
import NewsApi from "./js/Api/NewsApi";
import PopupSuccess from "./js/Components/PopupSuccess";
import SearchForm from "./js/Components/SearchForm";
import Card from "./js/Components/Card";
import CardList from "./js/Components/CardList";
import Header from "./js/Components/Header";

// ПЕРЕМЕННЫЕ
const signUpButton = document.querySelector('.header__menu_auth');
const popup = document.querySelector('.popup');
const serverUrl = 'https://api.explorenews.gq';
const container = document.querySelector('.results__container');
const resultsSection = document.querySelector('.results');
const headerContainer = document.querySelector('.header');
const headerButton = headerContainer.querySelector('.header__menu-button');
const buttonSeeMore = document.querySelector('.results__see-more')

// Взаимодействие с сервером
const api = new Api({
  baseUrl: serverUrl
});

// Отрисовка header
const header = new Header({
  color: 'black',
  headerContainer,
  popup,
  headerButton,
  getUser: ()=> {
    return api.getUserData();
  }
});
header.headerSettings();

// Взаимодействие с NewsApi
const newsApi = new NewsApi();

// Валидация введенных данных
const validation = new Validation({
  requiredField: "Это обязательное поле",
  wrongEmail: "Не соответствует формату Email"
});

// Попап для входа
const signInPopup = new PopupSignIn({
  content: popupSignIn,
  popup,
  closeHeader: () => {
    header.headerClose();
  },
  openSignUp: () => {
    signUpPopup.open()
  },
  validation: (form) => {
    validation.popupFormDefault(form);
  },
  signInCallback: (email, password)=> {
    return api.signin(email, password);
  },
  headerRender: (isLoggedIn)=> {
    header.render(isLoggedIn);
  }
});
signInPopup.render();

// Попап успешной регистрации
const successPopup = new PopupSuccess({
  content: popupSuccess,
  popup,
  openSignIn: () => { signInPopup.open() }
});
successPopup.render();

// Попап для регистрации
const signUpPopup = new PopupSignUp({
  content: popupSignUp,
  popup,
  openSignIn: () => { signInPopup.open() },
  openSuccess: () => { successPopup.open() },
  validation: (form) => {
    validation.popupFormDefault(form);
  },
  signUpCallback: (email, name, password) => {
    return api.signup(email, name, password);
  }
});
signUpPopup.render();

// Форма для поиска
const searchForm = new SearchForm({
  form: document.querySelector('.search__field'),
  preloader: document.querySelector('.preloader'),
  notFound: document.querySelector('.not-found'),
  container,
  resultsSection,
  searchCallback: (word) => {
    return newsApi.getNews(word)
  },
  getUser: ()=> {
    return api.getUserData()
  },
  resultsList: createNewList
});
searchForm.settings();

// ФУНКЦИИ
// Создание экземпляра карточки со статьей
function createNewCard(keyword, img, link, date, title, text, source, isLoggedIn){
  return new Card({
    keyword,
    img,
    link,
    date,
    title,
    text,
    source,
    isLoggedIn,
    monthFormat,
    saveArticle: (keyword, title, text, date, source, link, image)=> {
      return api.saveArticle(keyword, title, text, date, source, link, image);
    },
    deleteArticle: (articleId)=> {
      return api.deleteArticle(articleId);
    },
    getArticles: ()=> {
      return api.getArticles();
    }
  })
}

// Создание экземпляра блока с результатами поиска карточек
function createNewList(cards, keyword, isLoggedIn){
  return new CardList({
    cards,
    keyword,
    isLoggedIn,
    button: buttonSeeMore,
    cardsContainer: container,
    getUserData: () => {
      return api.getUserData();
    },
    cardCallback: createNewCard
  });
}

// Перевод месяца в русскоязычный формат
function monthFormat(month){
  if(month == '01'){
    return ' января, '
  }
  if(month == '02'){
    return ' февраля, '
  }
  if(month == '03'){
    return ' марта, '
  }
  if(month == '04'){
    return ' апреля, '
  }
  if(month == '05'){
    return ' мая, '
  }
  if(month == '06'){
    return ' июня, '
  }
  if(month == '07'){
    return ' июля, '
  }
  if(month == '08'){
    return ' августа, '
  }
  if(month == '09'){
    return ' сентября, '
  }
  if(month == '10'){
    return ' октября, '
  }
  if(month == '11'){
    return ' ноября, '
  }
  if(month == '12'){
    return ' декабря, '
  }
}
//СЛУШАТЕЛИ СОБЫТИЙ И ВЫЗОВЫ ФУНКЦИЙ
//Открытие попапа по нажатию на кнопку
signUpButton.addEventListener('click', signInPopup.open);