import "./index.css";
import Api from "../js/Api/MainApi";
import CardList from "../js/Components/CardList";
import Header from "../js/Components/Header";
import renderKeywords from "../js/Utils/renderKeywords";
import sortKeywords from "../js/Utils/sortKeywords";
import createNewCard from "../js/Utils/createNewCard";

// ПЕРЕМЕННЫЕ
const serverUrl = 'https://api.explorenews.gq';
const container = document.querySelector('.results__container');
const headerContainer = document.querySelector('.header');
const headerButton = headerContainer.querySelector('.header__menu-button');
const popup = document.querySelector('.popup');
const articlesCount = document.querySelector('.articles__length');
const userName = document.querySelector('.articles__name');

// Взаимодействие с сервером
const api = new Api({
  baseUrl: serverUrl
});

// Экземпляр Header
const header = new Header({
  color: 'white',
  headerContainer,
  headerButton,
  popup,
  getUser: ()=> {
    return api.getUserData();
  },
  quite: ()=> {
    return api.logout();
  },
});

// ВЫЗОВ ФУНКЦИЙ И МЕТОДОВ
// Добавление настроек Header
header.headerSettings();

// Получение данных пользователя и их обработка
api.getUserData()
  .then((res) => {
    if(res){
      userName.textContent = res.name;
    }
    else {
      window.location.href = '../index.html';
    }
  })

// Получение списка статей и их отрисовка
api.getArticles()
  .then((res) => {
    articlesCount.textContent = res.length;
    let keywords = [];
    res.forEach((article)=> {
      keywords.push(article.keyword)
    });
    const sortedKeywords = sortKeywords(keywords);
    renderKeywords(sortedKeywords);

    const cardList = new CardList({
      cards: res,
      cardsContainer: container,
      cardCallback: createNewCard
    })
    cardList.renderAll();
  })