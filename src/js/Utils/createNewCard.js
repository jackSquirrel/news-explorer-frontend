import Card from "../../js/Components/Card";
import Api from "../Api/MainApi";
import monthFormat from "./monthFormat";

const serverUrl = 'https://api.explorenews.gq';
const api = new Api({
  baseUrl: serverUrl
})

// Создание экземпляра карточки со статьей
export default function createNewCard(keyword, img, link, date, title, text, source, isLoggedIn){
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