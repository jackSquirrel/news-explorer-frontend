export default class MainApi {
  constructor(){

  }

  getNews(word) {
    return fetch(`http://newsapi.org/v2/everything?q=${word}&from=${new Date(((Math.floor(Date.now() / 1000)) - 604800)*1000)}&to=${new Date()}&apiKey=11f0b883a812400d934eac006a37e236&pageSize=100`, {
      method: 'GET',
    })
    .then((res)=> {
      if(res.ok){
        return res.json();
      }
    })
    .catch((err)=> {
      console.log('Ошибка' + err)
    })
  }
}