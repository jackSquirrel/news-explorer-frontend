import createNewCard from "./createNewCard";
import CardList from "./js/Components/CardList";
import Api from "../Api/MainApi";

const button = document.querySelector('.results__see-more');
const container = document.querySelector('.results__container');
const serverUrl = 'https://api.explorenews.gq';
const api = new Api({
  baseUrl: serverUrl
});

// Создание экземпляра класса результатов
export default function createNewList(cards, keyword, isLoggedIn){
  return new CardList({
    cards,
    keyword,
    isLoggedIn,
    button,
    cardsContainer: container,
    getUserData: () => {
      return api.getUserData();
    },
    cardCallback: createNewCard
  });
}