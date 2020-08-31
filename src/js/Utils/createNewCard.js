import Card from "../../js/Components/Card";
import Api from "../Api/MainApi";
import monthFormat from "./monthFormat";

const container = document.querySelector('.results__container') || null;
const serverUrl = 'https://api.explorenews.gq';
const api = new Api({
  baseUrl: serverUrl
})

// Создание экземпляра карточки со статьей
export default function createNewCard(keyword, img, link, date, title, text, source, isLoggedIn, cardId){
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