import "./style.css";
import {popupSignIn, popupSignUp, popupSuccess} from "./js/popupContent";
import PopupSignUp from "./js/Components/PopupSignUp";
import PopupSignIn from "./js/Components/PopupSignIn";
import Validation from "./js/Components/Validation";
import Api from "./js/Api/MainApi";

// ПЕРЕМЕННЫЕ
const signUpButton = document.querySelector('.header__menu_auth');
const popup = document.querySelector('.popup');
const serverUrl = NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000';

// Взаимодействие с сервером
const api = new Api({
  baseUrl: serverUrl
});

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
  }
});
signInPopup.render();

// Попап для регистрации
const signUpPopup = new PopupSignUp({
  content: popupSignUp,
  popup,
  openSignIn: () => { signInPopup.open() } ,
  validation: (form) => {
    validation.popupFormDefault(form);
  },
  signUpCallback: () => {
    return api.signup(email, name, password);
  }
});
signUpPopup.render();

//СЛУШАТЕЛИ СОБЫТИЙ И ВЫЗОВЫ ФУНКЦИЙ
//Открытие попапа по нажатию на кнопку
signUpButton.addEventListener('click', signUpPopup.open);