import "./style.css";
import {popupSignIn, popupSignUp, popupSuccess} from "./js/Constants/popupContent";
import PopupSignUp from "./js/Components/PopupSignUp";
import PopupSignIn from "./js/Components/PopupSignIn";
import Validation from "./js/Components/Validation";
import Api from "./js/Api/MainApi";
import NewsApi from "./js/Api/NewsApi";
import PopupSuccess from "./js/Components/PopupSuccess";
import SearchForm from "./js/Components/SearchForm";
import Header from "./js/Components/Header";
import createNewList from "./js/Utils/createNewList";
import formatDate from "./js/Utils/formatDate";

// ПЕРЕМЕННЫЕ
const signUpButton = document.querySelector('.header__menu_auth');
const popup = document.querySelector('.popup');
const container = document.querySelector('.results__container');
const resultsSection = document.querySelector('.results');
const headerContainer = document.querySelector('.header');
const headerButton = headerContainer.querySelector('.header__menu-button');
const serverUrl = 'https://api.explorenews.gq';

// Взаимодействие с сервером
const api = new Api({
  baseUrl: serverUrl
});

// Взаимодействие с NewsApi
const newsApi = new NewsApi(formatDate);

// Экземпляр header
const header = new Header({
  color: 'black',
  headerContainer,
  popup,
  headerButton,
  quite: ()=> {
    return api.logout();
  },
  getUser: ()=> {
    return api.getUserData();
  }
});

// Валидация введенных данных
const validation = new Validation({
  requiredField: "Это обязательное поле",
  wrongEmail: "Не соответствует формату Email"
});

// Экземпляр попапа для входа
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

// Экземпляр попапа успешной регистрации
const successPopup = new PopupSuccess({
  content: popupSuccess,
  popup,
  openSignIn: () => { signInPopup.open() }
});

// Экземпляр попапа для регистрации
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

// Экземпляр формы для поиска
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

//СЛУШАТЕЛИ СОБЫТИЙ И ВЫЗОВЫ ФУНКЦИЙ
//Открытие попапа по нажатию на кнопку
signUpButton.addEventListener('click', signInPopup.open);

// Орисовка header
header.headerSettings();
// Отрисовка попапа для входа
signInPopup.render();
// Отрисовка попапа успешной регистрации
successPopup.render();
// Отрисовка попапа для регистрации
signUpPopup.render();
// Отрисовка формы для поиска
searchForm.settings();