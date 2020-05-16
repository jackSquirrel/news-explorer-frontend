import "./index.css";
import Api from "../js/Api/MainApi";
import CardList from "../js/Components/CardList";
import Card from "../js/Components/Card";
import Header from "../js/Components/Header";

const serverUrl = 'https://api.explorenews.gq';
const container = document.querySelector('.results__container');
const headerContainer = document.querySelector('.header');
const headerButton = headerContainer.querySelector('.header__menu-button');
const popup = document.querySelector('.popup');

const api = new Api({
  baseUrl: serverUrl
});

const header = new Header({
  color: 'white',
  headerContainer,
  headerButton,
  popup,
  getUser: ()=> {
    return api.getUserData();
  }
});
header.headerSettings();

api.getArticles()
  .then((res) => {
    const cardList = new CardList({
      cards: res,
      cardsContainer: container,
      cardCallback: createNewCard
    })
    cardList.renderAll();
  })

function createNewCard(keyword, img, link, date, title, text, source, isLoggedIn, cardId){
  return new Card({
    keyword,
    img,
    link,
    date,
    title,
    text,
    source,
    isLoggedIn,
    cardId,
    container,
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