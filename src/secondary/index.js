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
const articlesCount = document.querySelector('.articles__length');
const userName = document.querySelector('.articles__name');
const keywordsContainer = document.querySelector('.keywords');

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
  },
  quite: ()=> {
    return api.logout();
  },
});
header.headerSettings();

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

api.getUserData()
  .then((res) => {
    if(res){
      userName.textContent = res.name;
    }
    else {
      window.location.href = 'http://localhost:8081'
    }
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

function sortKeywords(keywords) {
  let keywordList = [];
  for(let i = 0; i < keywords.length; i++){
    if(!keywordList.find((keyword)=>{
      if(keywords[i] === keyword.name){
        keyword.num++;
        return true;
      }
      return false
    })){
      keywordList.push({name: keywords[i], num: 1})
    }
  }

  keywordList.sort((a, b) => a.num < b.num ? 1 : -1);
  return keywordList;
}

function renderKeywords(keywords) {
  if(keywords.length == 1){
    keywordsContainer.textContent = keywords[0].name;
  }
  if(keywords.length == 2){
    keywordsContainer.textContent = keywords[0].name + ' и ' + keywords[1].name;
  }
  if(keywords.length == 3){
    keywordsContainer.textContent = keywords[0].name + ', ' + keywords[1].name + ' и ' + keywords[2].name;
  }
  if(keywords.length > 3){
    keywordsContainer.textContent = keywords[0].name + ', ' + keywords[1].name + ` и ${keywords.length - 2} другим`;
  }
}