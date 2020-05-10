import "../images/back.svg";

const popupSignIn = `
<div class="popup__content">
  <img src="./images/back.svg" alt="close" class="popup__close">
  <h3 class="popup__title">Вход</h3>
  <form class="popup__form" name="new" novalidate>
    <p class="popup__input-title">Email</p>
    <input type="email" name="email" class="popup__input popup__input_type_email" placeholder="Введите почту" required>
    <!-- popup__is-not-valid - для активации ошибки -->
    <span id = "email" class="popup__error"></span>
    <p class="popup__input-title">Пароль</p>
    <input type="password" name="password" class="popup__input popup__input_type_password" placeholder="Введите пароль" required>
    <span id = "password" class = "popup__error"></span>
    <span id = "entry" class = "popup__button-error"></span>
    <!-- popup__button_active - стили активной кнопки -->
    <button type="submit" name="entry" class="popup__button" disabled>Войти</button>
    <p class="popup__or">или <button type="button" class="popup__or_reg">Зарегистрироваться</button></p>
  </form>`;

const popupSignUp = `
<div class="popup__content">
  <img src="./images/back.svg" alt="close" class="popup__close">
  <h3 class="popup__title">Регистрация</h3>
  <form class="popup__form" name="new" novalidate>
    <p class="popup__input-title">Email</p>
    <input type="email" name="email" class="popup__input popup__input_type_email" placeholder="Введите почту" required>
    <!-- popup__is-not-valid - для активации ошибки -->
    <span id = "email" class="popup__error"></span>
    <p class="popup__input-title">Пароль</p>
    <input type="password" name="password" class="popup__input popup__input_type_password" placeholder="Введите пароль" required>
    <span id = "password" class = "popup__error"></span>
    <p class="popup__input-title">Имя</p>
    <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Введите имя" required>
    <span id = "name" class = "popup__button-error"></span>
    <!-- popup__button_active - стили активной кнопки -->
    <span id = "reg" class = "popup__button-error"></span>
    <button type="submit" name="reg" class="popup__button" disabled>Зарегистрироваться</button>
    <p class="popup__or">или <button type="button" class="popup__or_enter">Войти</button></p>
  </form>
</div>`;

const popupSuccess = `
<div class="popup__content">
  <img src="./images/back.svg" alt="close" class="popup__close">
  <h3 class="popup__title popup__title_succes">Пользователь успешно зарегистрирован!</h3>
  <button type="button" class="popup__or_succes">Выполнить вход</button>
</div>`;

export {
  popupSignIn,
  popupSignUp,
  popupSuccess
};