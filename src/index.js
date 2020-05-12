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

// ПЕРЕМЕННЫЕ
const signUpButton = document.querySelector('.header__menu_auth');
const popup = document.querySelector('.popup');
const serverUrl = 'https://api.explorenews.gq';
const container = document.querySelector('.results__container');

// Взаимодействие с сервером
const api = new Api({
  baseUrl: serverUrl
});

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
  openSignUp: () => {
    signUpPopup.open()
  },
  validation: (form) => {
    validation.popupFormDefault(form);
  },
  signInCallback: (email, password)=> {
    return api.signin(email, password);
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
  container: document.querySelector('.results__container'),
  searchCallback: (word) => { return newsApi.getNews(word) },
  addCardCallback: (img, date, title, text, source) => {
    return new Card({img, date, title, text, source})
  }
});
searchForm.settings();

//СЛУШАТЕЛИ СОБЫТИЙ И ВЫЗОВЫ ФУНКЦИЙ
//Открытие попапа по нажатию на кнопку
signUpButton.addEventListener('click', signInPopup.open);