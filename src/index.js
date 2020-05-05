import "./style.css";
import {popupSignIn, popupSignUp, popupSuccess} from "./js/popupContent";
import PopupSignUp from "./js/Components/PopupSignUp";
import PopupSignIn from "./js/Components/PopupSignIn";
import Validation from "./js/Components/Validation";

// ПЕРЕМЕННЫЕ
const signUpButton = document.querySelector('.header__menu_auth');
export const popup = document.querySelector('.popup');

// Валидация введенных данных
const validation = new Validation({
  requiredField: "Это обязательное поле",
  wrongEmail: "Не соответствует формату Email"
});

// Попап для входа
const signInPopup = new PopupSignIn({
  content: popupSignIn,
  popup,
  signUp: () => {
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
  signIn: () => { signInPopup.open() } ,
  validation: (form) => {
    validation.popupFormDefault(form);
  }
});
signUpPopup.render();

//СЛУШАТЕЛИ СОБЫТИЙ И ВЫЗОВЫ ФУНКЦИЙ
//Открытие попапа по нажатию на кнопку
signUpButton.addEventListener('click', signUpPopup.open);